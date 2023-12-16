import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  TextInput,
  Title,
  Text,
} from "@mantine/core";
import classes from "./Register.page.module.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import DOMAIN from "../services/endpoint";
import axios from "axios";

const RegisterPage = () => {
  const form = useForm({
    initialValues: {
      uname: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const handleRegister = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${DOMAIN}/auth/login`, form.values);
      console.log(
        "handle login res username: " +
          res.data.username +
          " res authenticated: " +
          res.data.isAuthenticated
      );
      navigate("/");
    } catch (err) {}
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
      Sign up and start posting on Sawwit!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
      Already have an account?{" "}
        <Anchor
          size="sm"
          component="button"
          onClick={() => navigate("/login")}
        >
          Log in here
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleRegister}>
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

export default RegisterPage;
