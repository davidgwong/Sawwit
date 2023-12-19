import {
  Paper,
  Text,
  Divider,
  Anchor,
  Group,
  TextInput,
  Button,
} from "@mantine/core";
import ConfirmDelete from "./ConfirmDelete";
import { useDisclosure } from "@mantine/hooks";
import { useUser } from "../store/store";
import { useForm } from "@mantine/form";
import { useState } from "react";
import axios from "axios";
import DOMAIN from "../services/endpoint";

const CommentCard = ({ comment }: { comment: any }) => {
  const { userId } = useUser();
  const [opened, { open, close }] = useDisclosure(false);
  const [editState, setEditState] = useState(false);
  const [commentDescription, setCommentDescription] = useState(
    comment.description
  );
  const form = useForm({
    initialValues: {
      comment: commentDescription,
    },
  });

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const editCommentResponse = await axios.post(
        `${DOMAIN}/comments/edit/` + comment.id,
        {
          description: form.values.comment,
        }
      );
      setCommentDescription(editCommentResponse.data.description);
      setEditState(false);
    } catch (err) {}
  };

  const handleEditCancel = () => {
    setEditState(false);
  };

  return (
    <Paper key={comment.id}>
      {editState ? (
        <form onSubmit={handleEditSubmit}>
          <TextInput mb="sm" {...form.getInputProps("comment")} />{" "}
          <Button variant="default" type="submit" mr="sm">
            Update comment
          </Button>
          <Button variant="default" onClick={handleEditCancel}>
            Cancel
          </Button>
        </form>
      ) : (
        <Text>{commentDescription}</Text>
      )}

      <Group gap="xs">
        <Text>
          Commented by <strong>{comment.creator.uname}</strong> on{" "}
          {new Date(comment.timestamp).toString()}
        </Text>
        {userId === comment.creator.id ? (
          <>
            <Divider orientation="vertical" />
            <Anchor onClick={() => setEditState(true)}>Edit</Anchor>
            <Divider orientation="vertical" />
            <Anchor onClick={open}>Delete</Anchor>
            <ConfirmDelete
              typeId={comment.id}
              opened={opened}
              openClose={{ open, close }}
              type="comment"
            />
          </>
        ) : (
          <></>
        )}
      </Group>
      <Divider my="sm" />
    </Paper>
  );
};

export default CommentCard;
