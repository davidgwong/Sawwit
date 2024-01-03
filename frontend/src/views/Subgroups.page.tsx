import { Anchor, Center, Container, Loader, Title } from "@mantine/core";
import axios, { AxiosResponse } from "axios";
import DOMAIN from "../services/endpoint";
import {
  Await,
  defer,
  useAsyncValue,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { Suspense } from "react";

const SubgroupsList = () => {
  const res = useAsyncValue() as AxiosResponse;
  const navigate = useNavigate();

  return res.data.subgroups.map((subgroup: any) => (
    <Container key={subgroup._id}>
      <Anchor onClick={() => navigate("/subgroups/" + subgroup._id)}>
        subgroup.{subgroup._id} ({subgroup.count}{" "}
        {subgroup.count == 1 ? "post" : "posts"})
      </Anchor>
    </Container>
  ));
};

const SubgroupsPage = () => {
  const loaderData = useLoaderData() as any;
  return (
    <Container size={420} my={40}>
      <Title order={2} my="sm">
        Subgroups
      </Title>

      <Suspense
        fallback={
          <Center>
            <Loader />
          </Center>
        }
      >
        <Await resolve={loaderData.res} errorElement={<p>Error...</p>}>
          <SubgroupsList />
        </Await>
      </Suspense>
    </Container>
  );
};

export const subgroupsLoader = () => {
  const resPromise = axios.get(`${DOMAIN}/subgroups/list`);
  return defer({ res: resPromise });
};

export default SubgroupsPage;
