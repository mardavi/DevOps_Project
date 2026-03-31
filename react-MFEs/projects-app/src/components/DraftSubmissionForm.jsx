import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

function DraftSubmissionForm() {
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    if (!content) {
      setMessage("Please enter draft content.");
      return;
    }

    setMessage("Draft submitted locally (mock UI).");
    setContent("");
  };

  return (
    <div>
      <h4>Submit Draft</h4>

      <Form onSubmit={submitHandler}>
        {message && <Alert variant="warning">{message}</Alert>}

        <Form.Group className="mb-3">
          <Form.Label>Draft Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Enter implementation draft"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Group>

        <Button type="submit" variant="dark">
          Submit Draft
        </Button>
      </Form>
    </div>
  );
}

export default DraftSubmissionForm;
