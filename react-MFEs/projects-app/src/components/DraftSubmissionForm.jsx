// import { useState } from "react";
// import { Form, Button, Alert } from "react-bootstrap";

// function DraftSubmissionForm() {
//   const [content, setContent] = useState("");
//   const [message, setMessage] = useState("");

//   const submitHandler = (e) => {
//     e.preventDefault();

//     if (!content) {
//       setMessage("Please enter draft content.");
//       return;
//     }

//     setMessage("Draft submitted locally (mock UI).");
//     setContent("");
//   };

//   return (
//     <div>
//       <h4>Submit Draft</h4>

//       <Form onSubmit={submitHandler}>
//         {message && <Alert variant="warning">{message}</Alert>}

//         <Form.Group className="mb-3">
//           <Form.Label>Draft Content</Form.Label>
//           <Form.Control
//             as="textarea"
//             rows={4}
//             placeholder="Enter implementation draft"
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//           />
//         </Form.Group>

//         <Button type="submit" variant="dark">
//           Submit Draft
//         </Button>
//       </Form>
//     </div>
//   );
// }

// export default DraftSubmissionForm;

import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { SUBMIT_DRAFT } from "../graphql/projects";

function DraftSubmissionForm() {
  const [featureId, setFeatureId] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  const [submitDraft, { loading, error }] = useMutation(SUBMIT_DRAFT);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!featureId || !content) {
      setMessage("Please enter feature ID and draft content.");
      return;
    }

    try {
      await submitDraft({
        variables: {
          featureId,
          content,
        },
      });

      setMessage("Draft submitted.");
      setFeatureId("");
      setContent("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h4>Submit Draft</h4>

      <Alert variant="secondary">
        For now, enter a feature ID manually. Later, this can be replaced with a
        feature picker dropdown.
      </Alert>

      <Form onSubmit={submitHandler}>
        {message && <Alert variant="warning">{message}</Alert>}
        {error && <Alert variant="danger">{error.message}</Alert>}

        <Form.Group className="mb-3">
          <Form.Label>Feature ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter feature ID"
            value={featureId}
            onChange={(e) => setFeatureId(e.target.value)}
          />
        </Form.Group>

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

        <Button type="submit" variant="dark" disabled={loading}>
          {loading ? <Spinner size="sm" animation="border" /> : "Submit Draft"}
        </Button>
      </Form>
    </div>
  );
}

export default DraftSubmissionForm;
