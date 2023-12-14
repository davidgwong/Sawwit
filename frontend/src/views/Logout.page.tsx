import { Container } from "@mantine/core";
import axios from "axios";
import DOMAIN from "../services/endpoint";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${DOMAIN}/auth/logout`);
      navigate("/");
    } catch (err) {}
  };

  handleLogout();

  return (
    <Container size={420} my={40}>
      <p>Logout page</p>
    </Container>
  );
};

export default LogoutPage;
