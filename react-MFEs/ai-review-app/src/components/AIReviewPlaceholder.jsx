import { useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";

function AIReviewPlaceholder() {
  const [draftText, setDraftText] = useState("");
  const [showResult, setShowResult] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    setShowResult(true);
  };

  return (
    <Card className="p-4 shadow-sm">
      <h2 className="mb-3">AI Review App</h2>
      <p className="text-muted">
        This is a placeholder for future AI-supported code and draft review.
      </p>

      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3">
          <Form.Label>Paste draft or implementation notes</Form.Label>
          <Form.Control
            as="textarea"
            rows={6}
            placeholder="Enter draft content for future AI review..."
            value={draftText}
            onChange={(e) => setDraftText(e.target.value)}
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          Generate Mock Review
        </Button>
      </Form>

      {showResult && (
        <Alert variant="info" className="mt-4">
          <h5>Mock AI Review Result</h5>
          <p className="mb-1">
            Strength: Clear intent and organized structure.
          </p>
          <p className="mb-1">
            Suggestion: Add more technical implementation detail.
          </p>
          <p className="mb-0">
            Status: Ready for future Agentic RAG integration.
          </p>
        </Alert>
      )}
    </Card>
  );
}

export default AIReviewPlaceholder;
