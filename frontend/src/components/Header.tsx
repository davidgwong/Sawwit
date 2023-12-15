import { useEffect } from "react";
import { Container, Burger, Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./Header.module.css";
import { NavLink } from "react-router-dom";
import DOMAIN from "../services/endpoint";
import axios from "axios";
import { useAuthenticated, useUser } from "../store/store";

const generalLinks = [
  { link: "/", label: "Home" },
  { link: "/subgroups", label: "Subgroups" },
];

const loggedInLinks = [
  { link: "/newpost", label: "New Post" },
  { link: "/logout", label: "Logout" },
];

const loggedOutLinks = [
  { link: "/login", label: "Login" },
  { link: "/register", label: "Register" },
];

export default function Header() {
  const [opened, { toggle }] = useDisclosure(true);

  const { username, setUsername } = useUser();
  const { isAuthenticated, setAuthenticated } = useAuthenticated();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${DOMAIN}/auth`);
        setUsername(res.data.username);
        setAuthenticated(res.data.isAuthenticated);
      } catch (err) {
        console.log("error");
      }
    };

    checkAuth();
  }, []);

  const links = isAuthenticated
    ? generalLinks.concat(loggedInLinks)
    : generalLinks.concat(loggedOutLinks);

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
        {isAuthenticated ? (
          <Text>Welcome {username}</Text>
        ) : (
          <Text>Not logged in.</Text>
        )}
        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  );
}
