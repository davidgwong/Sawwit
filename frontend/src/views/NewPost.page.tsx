import { Container, TextInput, Textarea } from "@mantine/core";

const NewPostPage = () => {
  return (
    <Container>
      <TextInput
        label="Title"
        description="Title of new post"
        placeholder="Title of new post"
      />
      <TextInput
        label="subgroup"
        description="subgroup of new post"
        placeholder="subgroup of new post"
      />
      <TextInput
        label="Link"
        description="Link of new post"
        placeholder="Link of new post"
      />
      <Textarea
        label="Description"
        description="Description of new post"
        placeholder="Description of new post"
      />
    </Container>
  );
};

export default NewPostPage;
