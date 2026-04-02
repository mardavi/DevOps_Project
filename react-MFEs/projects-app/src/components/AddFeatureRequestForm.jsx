import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { Form, Button, Card, Alert, Spinner } from "react-bootstrap";
import { ADD_FEATURE_REQUEST_MUTATION } from "../graphql/mutations";

function AddFeatureRequestForm({ projectId, onCreated }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "open",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const [addFeatureRequest, { loading }] = useMutation(
    ADD_FEATURE_REQUEST_MUTATION,
    {
      onCompleted: (data) => {
        setForm({
          title: "",
          description: "",
          status: "open",
        });
        setErrorMessage("");
        onCreated(data.addFeatureRequest);
      },
      onError: (error) => {
        setErrorMessage(error.message || "Failed to add feature request");
      },
    },
  );

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

    if (!projectId) {
      setErrorMessage("Select a project first.");
      return;
    }

    if (!form.title.trim() || !form.description.trim()) {
      setErrorMessage("Title and description are required.");
      return;
    }

    await addFeatureRequest({
      variables: {
        projectId,
        title: form.title.trim(),
        description: form.description.trim(),
        status: form.status,
      },
    });
  };

  return (
    <Card className="mt-3 border">
      <Card.Body>
        <h5 className="mb-3">Add Feature Request</h5>

        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Control
              name="title"
              placeholder="Feature title"
              value={form.title}
              onChange={handleChange}
              disabled={!projectId}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Control
              as="textarea"
              rows={2}
              name="description"
              placeholder="Feature description"
              value={form.description}
              onChange={handleChange}
              disabled={!projectId}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Select
              name="status"
              value={form.status}
              onChange={handleChange}
              disabled={!projectId}
            >
              <option value="open">open</option>
              <option value="in progress">in progress</option>
              <option value="completed">completed</option>
            </Form.Select>
          </Form.Group>

          <Button type="submit" disabled={loading || !projectId}>
            {loading ? (
              <>
                <Spinner size="sm" className="me-2" />
                Adding...
              </>
            ) : (
              "Add Feature Request"
            )}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default AddFeatureRequestForm;
