import { Divider, Text } from "@mantine/core";

export default function Footer() {
  return (
    <>
      <Divider mt={50} mb="sm" />
      <Text size="xs" c="dimmed" ta="center">
        Sawwit, the Face Page of the Internet.
      </Text>
      <Text size="xs" c="dimmed" ta="center">
        Ⓚ 2023 All rights reversed.{" "}
      </Text>
    </>
  );
}
