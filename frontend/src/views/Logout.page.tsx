import { Anchor, Center, Container, Loader, Text } from "@mantine/core";
import axios from "axios";
import DOMAIN from "../services/endpoint";
import { useUser } from "../store/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
  const { setUsername, setUserId, setAuthenticated, isAuthenticated } =
    useUser();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        setLoading(true);
        await axios.post(`${DOMAIN}/auth/logout`);
        setUsername(null);
        setUserId(null);
        setAuthenticated(false);
      } catch (err) {
        console.log("error");
      } finally {
        setLoading(false);
      }
    };
    if (isAuthenticated) handleLogout();
  }, []);

  return (
    <Container size={420} my={40}>
      {loading ? (
        <Center>
          <Loader />
        </Center>
      ) : (
        <>
          <Center>
            <Text>You are now logged out.</Text>
          </Center>
          <Center>
            <Anchor my="md" onClick={() => navigate("/")}>
              Click here to go back to post.
            </Anchor>
          </Center>
        </>
      )}
    </Container>
  );
};

export default LogoutPage;
