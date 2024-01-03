import {
  Paper,
  Text,
  Divider,
  Anchor,
  Group,
  Button,
  Textarea,
  Box,
  LoadingOverlay,
} from "@mantine/core";
import ConfirmDeleteComment from "./ConfirmDeleteComment";
import { useDisclosure } from "@mantine/hooks";
import { useUser } from "../store/store";
import { useForm } from "@mantine/form";
import { useState } from "react";
import axios from "axios";
import DOMAIN from "../services/endpoint";

const CommentCard = ({
  comment,
  setPostComments,
}: {
  comment: Comment;
  setPostComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}) => {
  const { userId } = useUser();
  const [opened, { open, close }] = useDisclosure(false);
  const [editState, setEditState] = useState(false);
  const [updatingComment, setUpdatingComment] = useState(false);
  const [commentContent, setCommentContent] = useState(comment.content);
  const form = useForm({
    initialValues: {
      comment: commentContent,
    },
  });

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setUpdatingComment(true);
      const editCommentResponse = await axios.post(
        `${DOMAIN}/comments/edit/` + comment._id,
        {
          content: form.values.comment,
        }
      );
      setCommentContent(editCommentResponse.data.content);
      setEditState(false);
    } catch (err) {
    } finally {
      setUpdatingComment(false);
    }
  };

  const handleEditCancel = () => {
    setEditState(false);
  };

  return (
    <Paper key={comment._id}>
      {editState ? (
        <Box pos="relative">
          <LoadingOverlay visible={updatingComment} zIndex={1000} />
          <form onSubmit={handleEditSubmit}>
            <Textarea
              mb="sm"
              {...form.getInputProps("comment")}
              disabled={updatingComment}
              autosize
            />{" "}
            <Button
              variant="default"
              type="submit"
              mr="sm"
              disabled={updatingComment}
            >
              Update comment
            </Button>
            <Button
              variant="default"
              onClick={handleEditCancel}
              disabled={updatingComment}
            >
              Cancel
            </Button>
          </form>
        </Box>
      ) : (
        <Text my="sm" style={{ whiteSpace: "pre-line" }}>
          {commentContent}
        </Text>
      )}

      <Group gap={5}>
        <Text c="dimmed" size="sm">
          Commented by <strong>{comment.creator_username}</strong> on{" "}
          {new Date(comment.timestamp).toString()}
        </Text>
        {userId === comment.creator_id ? (
          <>
            <Text c="dimmed" size="sm">
              |
            </Text>
            <Anchor size="sm" onClick={() => setEditState(true)}>
              Edit
            </Anchor>
            <Text c="dimmed" size="sm">
              |
            </Text>
            <Anchor size="sm" onClick={open}>
              Delete
            </Anchor>
            <ConfirmDeleteComment
              commentId={comment._id}
              opened={opened}
              openClose={{ open, close }}
              postId={comment.post_id}
              setPostComments={setPostComments}
            />
          </>
        ) : (
          <></>
        )}
      </Group>
      <Divider my="xs" />
    </Paper>
  );
};

export default CommentCard;
