import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

function CreateProjectForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    if (!title || !description) {
      setMessage("Please fill in all fields.");
      return;
    }

    setMessage(`Project "${title}" created locally (mock UI).`);
    setTitle("");
    setDescription("");
  };

  return (
    <Form onSubmit={submitHandler}>
      {message && <Alert variant="info">{message}</Alert>}

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

      <Button type="submit" variant="primary">
        Create Project
      </Button>
    </Form>
  );
}

export default CreateProjectForm;
