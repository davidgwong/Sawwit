import { Container } from "@mantine/core";
import axios from "axios";
import DOMAIN from "../services/endpoint";
import { useNavigate } from "react-router-dom";
import { useAuthenticated, useUser } from "../store/store";
import { useEffect } from "react";

const LogoutPage = () => {
  const navigate = useNavigate();

  const { username, setUsername } = useUser();
  const { isAuthenticated, setAuthenticated } = useAuthenticated();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        const res = await axios.get(`${DOMAIN}/auth/logout`);
        console.log(
          "handle login res username: " +
            res.data.username +
            " res authenticated: " +
            res.data.authenticated
        );
        setUsername(res.data.username);
        setAuthenticated(res.data.isAuthenticated);
      } catch (err) {
        console.log("error");
      }
    };

    handleLogout();
  }, []);

  return (
    <Container size={420} my={40}>
      <p>Logout page</p>
    </Container>
  );
};

export default LogoutPage;
