import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { Form, Button, Card, Alert, Spinner } from "react-bootstrap";
import { CREATE_PROJECT_MUTATION } from "../graphql/mutations";

function CreateProjectForm({ onCreated }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const [createProject, { loading }] = useMutation(CREATE_PROJECT_MUTATION, {
    onCompleted: (data) => {
      setForm({ title: "", description: "" });
      setErrorMessage("");
      onCreated(data.createProject);
    },
    onError: (error) => {
      setErrorMessage(error.message || "Failed to create project");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!form.title.trim() || !form.description.trim()) {
      setErrorMessage("Title and description are required.");
      return;
    }

    await createProject({
      variables: {
        title: form.title.trim(),
        description: form.description.trim(),
      },
    });
  };

  return (
    <Card className="mb-3 border">
      <Card.Body>
        <h5 className="mb-3">Create Project</h5>

        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Control
              name="title"
              placeholder="Project title"
              value={form.title}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={2}
              name="description"
              placeholder="Project description"
              value={form.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <Spinner size="sm" className="me-2" />
                Creating...
              </>
            ) : (
              "Create"
            )}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default CreateProjectForm;
