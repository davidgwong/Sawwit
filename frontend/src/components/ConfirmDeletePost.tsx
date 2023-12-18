import { Button, Center, Group, Modal, Space } from "@mantine/core";
import { Link } from "react-router-dom";

type OpenClose = {
  open: () => void;
  close: () => void;
};

type Props = {
  postId: number;
  opened: boolean;
  openClose: OpenClose;
};

const ConfirmDeletePost = ({ postId, opened, openClose }: Props) => {
  return (
    <>
      <Modal opened={opened} onClose={openClose.close}>
        <Center>Are you sure you want to delete this post?</Center>
        <Space h="xl" />
        <Center>
          <Group>
            <Link to={"/posts/delete/" + postId}>Yes</Link>
            <Button>No</Button>
          </Group>
        </Center>
      </Modal>
    </>
  );
};

export default ConfirmDeletePost;
