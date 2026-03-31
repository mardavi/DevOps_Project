import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { CREATE_PROJECT, GET_PROJECTS_BY_USER } from "../graphql/projects";

function CreateProjectForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const [createProject, { loading, error }] = useMutation(CREATE_PROJECT, {
    refetchQueries: [{ query: GET_PROJECTS_BY_USER }],
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      await createProject({
        variables: {
          title,
          description,
        },
      });

      setMessage(`Project "${title}" created.`);
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form onSubmit={submitHandler}>
      {message && <Alert variant="info">{message}</Alert>}
      {error && <Alert variant="danger">{error.message}</Alert>}

      <Form.Group className="mb-3">
        <Form.Label>Project Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter project title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter project description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Button type="submit" variant="primary" disabled={loading}>
        {loading ? <Spinner size="sm" animation="border" /> : "Create Project"}
      </Button>
    </Form>
  );
}

export default CreateProjectForm;
