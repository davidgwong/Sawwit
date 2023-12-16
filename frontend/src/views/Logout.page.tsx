import { Container } from "@mantine/core";
import axios from "axios";
import DOMAIN from "../services/endpoint";
import { useUser } from "../store/store";
import { useEffect } from "react";

const LogoutPage = () => {

  const {
    username,
    userId,
    isAuthenticated,
    setUsername,
    setUserId,
    setAuthenticated,
  } = useUser();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        const res = await axios.post(`${DOMAIN}/auth/logout`);
        console.log(
          "handle logout:"
        );
        console.log(res);
        setUsername(null);
        setUserId(null);
        setAuthenticated(false);
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
