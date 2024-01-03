import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
  LoadingOverlay,
  Box,
  Alert,
} from "@mantine/core";
import classes from "./Login.page.module.css";
import DOMAIN from "../services/endpoint";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { useUser } from "../store/store";
import { FormEvent, useState } from "react";

const LoginPage = () => {
  const { setUsername, setUserId, setAuthenticated } = useUser();
  const [loading, setLoading] = useState(false);
  const [loginAttempt, setLoginAttempt] = useState({
    attempted: false,
    message: "",
  });

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await axios.post(`${DOMAIN}/auth/login`, form.values);
      setUsername(res.data.username);
      setUserId(res.data.userId);
      setAuthenticated(res.data.isAuthenticated);
      navigate("/");
    } catch (err) {
      setLoginAttempt({
        attempted: true,
        message: "Username or password is invalid. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor
          size="sm"
          component="button"
          onClick={() => navigate("/register")}
        >
          Create account
        </Anchor>
      </Text>

      {loginAttempt.attempted ? (
        <Alert variant="light" color="red" mt={30}>
          {loginAttempt.message}
        </Alert>
      ) : (
        <></>
      )}

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Box pos="relative">
          <LoadingOverlay visible={loading} zIndex={1000} />
          <form onSubmit={handleLogin}>
            <TextInput
              label="Username"
              placeholder="Your username"
              disabled={loading}
              required
              {...form.getInputProps("username")}
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              disabled={loading}
              required
              mt="md"
              {...form.getInputProps("password")}
            />
            <Button type="submit" fullWidth mt="xl" disabled={loading}>
              Sign in
            </Button>
          </form>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
