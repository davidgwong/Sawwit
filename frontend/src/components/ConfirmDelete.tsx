import {
  Anchor,
  Button,
  Center,
  Group,
  Modal,
  Space,
  Text,
} from "@mantine/core";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DOMAIN from "../services/endpoint";

type OpenClose = {
  open: () => void;
  close: () => void;
};

type Props = {
  typeId: number;
  opened: boolean;
  openClose: OpenClose;
  type: "post" | "comment";
};

const ConfirmDelete = ({ typeId, opened, openClose, type }: Props) => {
  const [responseData, setResponseData] = useState("");
  const [confirmState, setConfirmState] = useState(true);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const res = await axios.post(endpoint);
      setResponseData(res.data.message);
      setConfirmState(false);
    } catch (err: any) {
      setResponseData(err.response.data.message);
      setConfirmState(false);
    }
  };

  const handleClose = () => {
    if (!confirmState) type === "post" ? navigate("/") : navigate(0);
    openClose.close();
  };

  const deleteConfirm = (
    <>
      <Center>Are you sure you want to delete this {type}?</Center>
      <Space h="xl" />
      <Center>
        <Group>
          <Button onClick={handleDelete}>Yes</Button>
          <Button onClick={openClose.close}>No</Button>
        </Group>
      </Center>
    </>
  );

  const deleteResponse = (
    <>
      <Center>
        <Text>{responseData}</Text>
      </Center>
      <Center>
        {type === "post" ? (
          <Anchor onClick={() => navigate("/")}>
            Click here to go back to home.
          </Anchor>
        ) : (
          <Anchor onClick={() => navigate(0)}>
            Click here to go back to post.
          </Anchor>
        )}
      </Center>
      <Space h="lg" />
    </>
  );

  const endpoint =
    type === "post"
      ? `${DOMAIN}/posts/delete/${typeId}`
      : `${DOMAIN}/comments/delete/${typeId}`;

  return (
    <>
      <Modal opened={opened} onClose={handleClose}>
        {confirmState ? deleteConfirm : deleteResponse}
      </Modal>
    </>
  );
};

export default ConfirmDelete;
