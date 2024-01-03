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
import { useNavigate } from "react-router-dom";
import DOMAIN from "../services/endpoint";
import { useGetPostTrigger, useUser } from "../store/store";

type OpenClose = {
  open: () => void;
  close: () => void;
};

type Props = {
  typeId: number;
  opened: boolean;
  openClose: OpenClose;
};

const ConfirmDeletePost = ({ typeId, opened, openClose }: Props) => {
  const [responseData, setResponseData] = useState("");
  const [confirmState, setConfirmState] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [getSuccess, setGetSuccess] = useState(false);
  const [errorUnauthorized, setErrorUnauthorized] = useState(false);
  const { setAuthenticated, setUsername, setUserId } = useUser();
  const { getPostTrigger, flipPostTrigger} = useGetPostTrigger();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      setDeleting(true);
      const res = await axios.post(endpoint);
      setResponseData(res.data.message);
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
      setGetSuccess(false);
      flipPostTrigger(!getPostTrigger);
    }
    navigate("/");
  };

  const deleteConfirm = (
    <>
      <Center><Text my="md">Are you sure you want to delete this post?</Text></Center>
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
      <Anchor onClick={handleClose} my="md">Click here to go back to home.</Anchor>
    </Center>
  </>
  );

  const endpoint =`${DOMAIN}/posts/delete/${typeId}`;

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

export default ConfirmDeletePost;
