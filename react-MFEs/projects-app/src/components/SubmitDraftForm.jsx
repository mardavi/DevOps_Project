import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { Card, Form, Button, Alert, Spinner } from "react-bootstrap";
import { SUBMIT_DRAFT_MUTATION } from "../graphql/mutations";

function SubmitDraftForm({ featureId, onCreated }) {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const [submitDraft, { loading }] = useMutation(SUBMIT_DRAFT_MUTATION, {
    onCompleted: (data) => {
      setContent("");
      setError("");
      onCreated(data.submitDraft);
    },
    onError: (err) => {
      setError(err.message || "Failed to submit draft");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!featureId) {
      setError("Select a feature first.");
      return;
    }

    if (!content.trim()) {
      setError("Draft content is required.");
      return;
    }

    await submitDraft({
      variables: {
        featureId,
        content: content.trim(),
        version: 1,
      },
    });
  };

  return (
    <Card className="mt-3 border">
      <Card.Body>
        <h5 className="mb-3">Submit Draft</h5>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Draft content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={!featureId}
            className="mb-3"
          />

          <Button type="submit" disabled={!featureId || loading}>
            {loading ? (
              <>
                <Spinner size="sm" className="me-2" />
                Submitting...
              </>
            ) : (
              "Submit Draft"
            )}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default SubmitDraftForm;
