import { Card, Container, Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";

function App() {
  const [draftText, setDraftText] = useState("");
  const [showMockResult, setShowMockResult] = useState(false);

  const handleReview = (e) => {
    e.preventDefault();
    setShowMockResult(true);
  };

  return (
    <Container className="py-4">
      <Card className="shadow-sm">
        <Card.Body>
          <h1 className="mb-3">AI Review App</h1>
          <p className="text-muted mb-4">
            Placeholder remote for future AI-assisted review workflows.
          </p>

          <Form onSubmit={handleReview}>
            <Form.Group className="mb-3">
              <Form.Label>Paste draft content for future review</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                placeholder="Example: add your implementation notes or draft here..."
                value={draftText}
                onChange={(e) => setDraftText(e.target.value)}
              />
            </Form.Group>

            <Button type="submit">Run Mock Review</Button>
          </Form>

          {showMockResult && (
            <Alert variant="info" className="mt-4 mb-0">
              <div className="fw-bold mb-2">Mock Review Result</div>
              <div>
                This is a placeholder for the future AI review pipeline. In the
                final version, this area can show quality checks, suggestions,
                and review feedback for submitted drafts.
              </div>
            </Alert>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default App;
