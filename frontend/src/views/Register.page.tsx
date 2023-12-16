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
} from "@mantine/core";
import classes from "./Register.page.module.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import DOMAIN from "../services/endpoint";
import axios from "axios";
import { useState } from "react";

const RegisterPage = () => {
  const form = useForm({
    initialValues: {
      uname: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const [registerAttempt, setRegisterAttempt] = useState({
    attempted: false,
    success: false,
    message: "",
  });

  const handleRegister = async (e: any) => {
    e.preventDefault();
    try {
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
          <Button type="submit" fullWidth mt="xl">
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default RegisterPage;
