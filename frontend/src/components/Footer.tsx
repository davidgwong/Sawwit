import { Divider, Space, Text } from "@mantine/core";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <Divider mt={50} mb="sm" />
      <Text size="xs" c="dimmed" ta="center">
        Sawwit, the Face Page of the Internet.
      </Text>
      <Text size="xs" c="dimmed" ta="center">
        Ⓚ {currentYear} All rights reversed.{" "}
      </Text>
      <Space h="md" />
    </>
  );
}
