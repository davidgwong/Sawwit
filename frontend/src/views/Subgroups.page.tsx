import { Anchor, Container } from "@mantine/core";
import axios from "axios";
import DOMAIN from "../services/endpoint";
import { useLoaderData, useNavigate } from "react-router-dom";

const SubgroupsPage = () => {
  const loaderData = useLoaderData() as any;
  const navigate = useNavigate();
  return (
    <Container size={420} my={40}>
      <h1>Subgroups page</h1>

      {loaderData.subgroups.map((subgroup: any) => (
        <Container key={subgroup._id}>
          <Anchor onClick={() => navigate("/subgroups/" + subgroup._id)}>
            subgroup.{subgroup._id} ({subgroup.count}{" "}
            {subgroup.count == 1 ? "post" : "posts"})
          </Anchor>
        </Container>
      ))}
    </Container>
  );
};

export const subgroupsLoader = async () => {
  const res = await axios.get(`${DOMAIN}/subgroups/list`);
  return res.data;
};

export default SubgroupsPage;
