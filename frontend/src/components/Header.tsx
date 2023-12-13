import { useState } from "react";
import { Container, Burger, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./Header.module.css";
import { Link, useLocation } from "react-router-dom";

const links = [
  { link: "/", label: "Home" },
  { link: "/subgroups", label: "Subgroups" },
  { link: "/newpost", label: "New Post" },
  { link: "/login", label: "Login" },
  { link: "/logout", label: "Logout" },
  { link: "/signup", label: "Sign Up" },
];

export default function Header() {
  const location = useLocation();
  const [opened, { toggle }] = useDisclosure(true);
  const [active, setActive] = useState(location.pathname);

  const items = links.map((link, index) => (
    <Link
      key={index}
      to={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={() => {
        setActive(link.link);
      }}
    >
      {link.label}
    </Link>
  ));

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <Group><img className={classes.icon} src="./public/sawwit.svg" /> <b>Sawwit</b></Group>
        <Group gap={5} visibleFrom="xs">
          {items}
        </Group>
        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  );
}
