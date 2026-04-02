import { Card, ListGroup, Badge } from "react-bootstrap";

function DraftHistory({ drafts }) {
  return (
    <Card className="mt-3 border">
      <Card.Body>
        <div className="d-flex justify-content-between mb-3">
          <h5 className="mb-0">Draft History</h5>
          <Badge bg="secondary">{drafts.length}</Badge>
        </div>

        {drafts.length === 0 ? (
          <p className="text-muted">No drafts yet.</p>
        ) : (
          <ListGroup>
            {drafts.map((draft) => (
              <ListGroup.Item key={draft.id}>
                <div className="fw-bold">Version {draft.version ?? 1}</div>
                <div className="small text-muted mb-1">
                  {draft.author || "Unknown"}
                </div>
                <div>{draft.content}</div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Card.Body>
    </Card>
  );
}

export default DraftHistory;
