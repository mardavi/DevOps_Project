// import { ListGroup } from "react-bootstrap";

// function DraftHistory() {
//   const drafts = [
//     {
//       id: 1,
//       version: 1,
//       content: "Initial draft with project structure and feature module.",
//     },
//     {
//       id: 2,
//       version: 2,
//       content: "Updated implementation draft with improved UI flow.",
//     },
//   ];

//   return (
//     <div>
//       <h4>Draft History</h4>

//       <ListGroup>
//         {drafts.map((draft) => (
//           <ListGroup.Item key={draft.id}>
//             <strong>Version {draft.version}:</strong> {draft.content}
//           </ListGroup.Item>
//         ))}
//       </ListGroup>
//     </div>
//   );
// }

// export default DraftHistory;

import { useState } from "react";
import { useLazyQuery } from "@apollo/client/react";
import { Button, Form, ListGroup, Alert, Spinner } from "react-bootstrap";
import { GET_DRAFTS_BY_FEATURE } from "../graphql/projects";

function DraftHistory() {
  const [featureId, setFeatureId] = useState("");

  const [loadDrafts, { data, loading, error }] = useLazyQuery(
    GET_DRAFTS_BY_FEATURE,
  );

  const drafts = data?.draftsByFeature || [];

  const submitHandler = (e) => {
    e.preventDefault();

    if (!featureId) {
      return;
    }

    loadDrafts({
      variables: { featureId },
    });
  };

  return (
    <div>
      <h4>Draft History</h4>

      <Alert variant="secondary">
        For now, enter a feature ID manually to view its drafts. Later, this can
        be connected to a selected feature.
      </Alert>

      <Form onSubmit={submitHandler} className="mb-3">
        <Form.Group className="mb-3">
          <Form.Label>Feature ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter feature ID"
            value={featureId}
            onChange={(e) => setFeatureId(e.target.value)}
          />
        </Form.Group>

        <Button type="submit" variant="outline-primary">
          Load Drafts
        </Button>
      </Form>

      {loading && <Spinner animation="border" size="sm" />}
      {error && <Alert variant="danger">{error.message}</Alert>}

      {!loading && !error && drafts.length > 0 && (
        <ListGroup>
          {drafts.map((draft) => (
            <ListGroup.Item key={draft.id}>
              <strong>Version {draft.version}:</strong> {draft.content}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}

      {!loading && !error && data && drafts.length === 0 && (
        <Alert variant="secondary">No drafts found for this feature.</Alert>
      )}
    </div>
  );
}

export default DraftHistory;
