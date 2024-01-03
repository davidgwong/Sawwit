import {
  Anchor,
  Button,
  Container,
  Paper,
  PasswordInput,
  TextInput,
  Title,
  Text,
  Alert,
  Box,
  LoadingOverlay,
} from "@mantine/core";
import classes from "./Register.page.module.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import DOMAIN from "../services/endpoint";
import axios from "axios";
import { FormEvent, useState } from "react";

const RegisterPage = () => {
  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const [registerAttempt, setRegisterAttempt] = useState({
    attempted: false,
    success: false,
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${DOMAIN}/users/`, form.values);
      setRegisterAttempt({
        attempted: true,
        success: true,
        message: res.data,
      });
      form.reset();
    } catch (err: any) {
      console.log(err);
      setRegisterAttempt({
        attempted: true,
        success: false,
        message: err.response.data,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Sign up and start posting on Sawwit!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Already have an account?{" "}
        <Anchor size="sm" component="button" onClick={() => navigate("/login")}>
          Log in here
        </Anchor>
      </Text>
      <br />

      {registerAttempt.attempted ? (
        registerAttempt.success ? (
          <Alert variant="light" color="green">
            <Text size="sm" ta="center">
              Successfully registered.{" "}
              <Anchor
                size="sm"
                component="button"
                onClick={() => navigate("/login")}
              >
                Please log in here.
              </Anchor>
            </Text>
          </Alert>
        ) : (
          <Alert variant="light" color="red">
            {registerAttempt.message}
          </Alert>
        )
      ) : (
        <></>
      )}

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Box pos="relative">
          <LoadingOverlay visible={loading} zIndex={1000} />
          <form onSubmit={handleRegister}>
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
              Register
            </Button>
          </form>
        </Box>
      </Paper>
    </Container>
  );
};

export default RegisterPage;
