import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

function FeatureRequestForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    if (!title || !description) {
      setMessage("Please fill in all feature fields.");
      return;
    }

    setMessage(`Feature "${title}" added locally (mock UI).`);
    setTitle("");
    setDescription("");
  };

  return (
    <div>
      <h4>Add Feature Request</h4>

      <Form onSubmit={submitHandler}>
        {message && <Alert variant="success">{message}</Alert>}

        <Form.Group className="mb-3">
          <Form.Label>Feature Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter feature title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="Enter feature description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Button type="submit" variant="secondary">
          Add Feature
        </Button>
      </Form>
    </div>
  );
}

export default FeatureRequestForm;
