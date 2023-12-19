import { Anchor, Container } from "@mantine/core";
import axios from "axios";
import DOMAIN from "../services/endpoint";
import { useLoaderData, useNavigate } from "react-router-dom";

const SubgroupsPage = () => {
  const subgroups = useLoaderData() as any;
  const navigate = useNavigate();
  return (
    <Container size={420} my={40}>
      <h1>Subgroups page</h1>

      {subgroups.subs.map((sub: any) => (
        <Container key={sub}>
          <Anchor onClick={() => navigate("/subgroups/" + sub)}>
            subgroup.{sub}
          </Anchor>
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
