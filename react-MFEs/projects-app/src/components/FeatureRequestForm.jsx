// import { useState } from "react";
// import { Form, Button, Alert } from "react-bootstrap";

// function FeatureRequestForm() {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [message, setMessage] = useState("");

//   const submitHandler = (e) => {
//     e.preventDefault();

//     if (!title || !description) {
//       setMessage("Please fill in all feature fields.");
//       return;
//     }

//     setMessage(`Feature "${title}" added locally (mock UI).`);
//     setTitle("");
//     setDescription("");
//   };

//   return (
//     <div>
//       <h4>Add Feature Request</h4>

//       <Form onSubmit={submitHandler}>
//         {message && <Alert variant="success">{message}</Alert>}

//         <Form.Group className="mb-3">
//           <Form.Label>Feature Title</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter feature title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//         </Form.Group>

//         <Form.Group className="mb-3">
//           <Form.Label>Description</Form.Label>
//           <Form.Control
//             as="textarea"
//             rows={2}
//             placeholder="Enter feature description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </Form.Group>

//         <Button type="submit" variant="secondary">
//           Add Feature
//         </Button>
//       </Form>
//     </div>
//   );
// }

// export default FeatureRequestForm;

import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { ADD_FEATURE_REQUEST } from "../graphql/projects";

function FeatureRequestForm({ projectId }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const [addFeatureRequest, { loading, error }] =
    useMutation(ADD_FEATURE_REQUEST);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      setMessage("Please fill in all feature fields.");
      return;
    }

    try {
      await addFeatureRequest({
        variables: {
          projectId,
          title,
          description,
        },
      });

      setMessage(`Feature "${title}" added.`);
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h4>Add Feature Request</h4>

      <Form onSubmit={submitHandler}>
        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error.message}</Alert>}

        <Form.Group className="mb-3">
          <Form.Label>Feature Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter feature title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="Enter feature description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Button type="submit" variant="secondary" disabled={loading}>
          {loading ? <Spinner size="sm" animation="border" /> : "Add Feature"}
        </Button>
      </Form>
    </div>
  );
}

export default FeatureRequestForm;
