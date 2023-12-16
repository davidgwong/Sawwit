import { Container } from "@mantine/core";
import axios from "axios";
import DOMAIN from "../services/endpoint";
import { Link, useLoaderData } from "react-router-dom";

const SubgroupsPage = () => {
  const subgroups = useLoaderData() as any;
  return (
    <Container size={420} my={40}>
      <h1>Subgroups page</h1>

      {subgroups.subs.map((sub: any) => (
        <Container key={sub}>
          <Link to={"/subgroups/" + sub}>subgroup.{sub}</Link>
        </Container>
      ))}
    </Container>
  );
};

export const subgroupsLoader = async () => {
  const res = await axios.get(`${DOMAIN}/subs/list`);
  return res.data;
};

export default SubgroupsPage;
