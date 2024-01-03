import {
  Anchor,
  Box,
  Button,
  Center,
  Group,
  LoadingOverlay,
  Modal,
  Text,
} from "@mantine/core";
import axios from "axios";
import { useState } from "react";
import DOMAIN from "../services/endpoint";
import { useUser } from "../store/store";

type OpenClose = {
  open: () => void;
  close: () => void;
};

type Props = {
  commentId: string;
  opened: boolean;
  openClose: OpenClose;
  postId: string;
  setPostComments: React.Dispatch<React.SetStateAction<Comment[]>>;
};

const ConfirmDelete = ({
  commentId,
  opened,
  openClose,
  postId,
  setPostComments,
}: Props) => {
  const [responseData, setResponseData] = useState("");
  const [confirmState, setConfirmState] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const { setAuthenticated, setUsername, setUserId } = useUser();
  const [errorUnauthorized, setErrorUnauthorized] = useState(false);
  const [updatedComments, setUpdatedComments] = useState([] as Comment[]);
  const [getSuccess, setGetSuccess] = useState(false);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      const res = await axios.post(endpoint);
      setResponseData(res.data.message);
      const requestData = {
        postId: postId,
      };
      const queryParams = new URLSearchParams(requestData).toString();

      const updatedComments = await axios.get(
        `${DOMAIN}/comments/?${queryParams}`
      );
      setUpdatedComments(updatedComments.data as Comment[]);
      setGetSuccess(true);
      setConfirmState(false);
    } catch (err: any) {
      if (err.request.status === 401) {
        setErrorUnauthorized(true);
      }
      setResponseData(err.response.data.message);
      setConfirmState(false);
    } finally {
      setDeleting(false);
    }
  };

  const handleClose = () => {
    setConfirmState(true);
    setResponseData("");
    openClose.close();
    if (errorUnauthorized) {
      setAuthenticated(false);
      setUserId(null);
      setUsername(null);
    }
    if (getSuccess) {
      setPostComments(updatedComments);
      setGetSuccess(false);
    }
  };

  const deleteConfirm = (
    <>
      <Center><Text my="md">Are you sure you want to delete this comment?</Text></Center>
      <Center>
        <Group>
          <Button onClick={handleDelete} disabled={deleting}>
            Yes
          </Button>
          <Button onClick={handleClose} disabled={deleting}>
            No
          </Button>
        </Group>
      </Center>
    </>
  );

  const deleteResponse = (
    <>
      <Center>
        <Text my="md">{responseData}</Text>
      </Center>
      <Center>
        <Anchor onClick={handleClose} my="md">Click here to go back to post.</Anchor>
      </Center>
    </>
  );

  const endpoint = `${DOMAIN}/comments/delete/${commentId}`;

  return (
    <>
      <Modal
        opened={opened}
        onClose={handleClose}
        closeOnClickOutside={false}
        closeOnEscape={false}
        withCloseButton={false}
        centered
      >
        <Box pos="relative">
          <LoadingOverlay visible={deleting} zIndex={1000} />
          {confirmState ? deleteConfirm : deleteResponse}
        </Box>
      </Modal>
    </>
  );
};

export default ConfirmDelete;
