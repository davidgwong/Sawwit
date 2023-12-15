import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import classes from "./Login.page.module.css";
import DOMAIN from "../services/endpoint";
import axios from "axios";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { useAuthenticated, useUser } from "../store/store";

const LoginPage = () => {
  const loginData = useLoaderData() as any;

  const { username, setUsername } = useUser();
  const { isAuthenticated, setAuthenticated } = useAuthenticated();

  const form = useForm({
    initialValues: {
      uname: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${DOMAIN}/auth/login`, form.values);
      console.log("handle login res username: " + res.data.username + " res authenticated: " + res.data.isAuthenticated);
      setUsername(res.data.username);
      setAuthenticated(res.data.isAuthenticated);
      navigate("/");
    } catch (err) {}
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor size="sm" component="button" onClick={() => navigate("/register")}>
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleLogin}>
          <TextInput
            label="Username"
            placeholder="Your username"
            required
            {...form.getInputProps("uname")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            {...form.getInputProps("password")}
          />
          <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button type="submit" fullWidth mt="xl">
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export const loginLoader = async () => {
  const res = await axios.get(`${DOMAIN}/auth/login`);
  console.log(res.data);
  return res.data;
};

export default LoginPage;
