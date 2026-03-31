import { ListGroup } from "react-bootstrap";

function DraftHistory() {
  const drafts = [
    {
      id: 1,
      version: 1,
      content: "Initial draft with project structure and feature module.",
    },
    {
      id: 2,
      version: 2,
      content: "Updated implementation draft with improved UI flow.",
    },
  ];

  return (
    <div>
      <h4>Draft History</h4>

      <ListGroup>
        {drafts.map((draft) => (
          <ListGroup.Item key={draft.id}>
            <strong>Version {draft.version}:</strong> {draft.content}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default DraftHistory;
