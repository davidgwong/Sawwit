import { useState } from "react";
import { Container, Burger, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./Header.module.css";
import { NavLink, useLocation } from "react-router-dom";

const links = [
  { link: "/", label: "Home" },
  { link: "/subgroups", label: "Subgroups" },
  { link: "/newpost", label: "New Post" },
  { link: "/login", label: "Login" },
  { link: "/logout", label: "Logout" },
  { link: "/register", label: "Register" },
];

export default function Header() {
  const [opened, { toggle }] = useDisclosure(true);

  const items = links.map((link, index) => (
    <NavLink
      key={index}
      to={link.link}
      className={({ isActive }: { isActive: boolean }) =>
        isActive ? `${classes.link} ${classes.active}` : classes.link
      }
    >
      {link.label}
    </NavLink>
  ));

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <Group>
          <img className={classes.icon} src="./sawwit.svg" /> <b>Sawwit</b>
        </Group>
        <Group gap={5} visibleFrom="xs">
          {items}
        </Group>
        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  );
}
