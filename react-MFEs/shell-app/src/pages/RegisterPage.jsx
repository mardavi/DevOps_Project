// import { Form, Button, Card } from "react-bootstrap";

// function RegisterPage() {
//   return (
//     <Card className="p-4 mx-auto" style={{ maxWidth: "500px" }}>
//       <h2 className="mb-3">Register</h2>

//       <Form>
//         <Form.Group className="mb-3">
//           <Form.Label>Username</Form.Label>
//           <Form.Control type="text" placeholder="Enter username" />
//         </Form.Group>

//         <Form.Group className="mb-3">
//           <Form.Label>Email</Form.Label>
//           <Form.Control type="email" placeholder="Enter email" />
//         </Form.Group>

//         <Form.Group className="mb-3">
//           <Form.Label>Password</Form.Label>
//           <Form.Control type="password" placeholder="Enter password" />
//         </Form.Group>

//         <Button variant="success" type="submit">
//           Register
//         </Button>
//       </Form>
//     </Card>
//   );
// }

// export default RegisterPage;

import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { Form, Button, Card, Alert, Spinner } from "react-bootstrap";
import { REGISTER_USER, GET_CURRENT_USER } from "../graphql/auth";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const [registerUser, { loading, error }] = useMutation(REGISTER_USER, {
    refetchQueries: [{ query: GET_CURRENT_USER }],
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const { data } = await registerUser({
        variables: {
          username,
          email,
          password,
          role: "developer",
        },
      });

      if (data?.register) {
        setMessage(`User ${data.register.username} registered successfully.`);
        setUsername("");
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card className="p-4 mx-auto" style={{ maxWidth: "500px" }}>
      <h2 className="mb-3">Register</h2>

      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error.message}</Alert>}

      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="success" type="submit" disabled={loading}>
          {loading ? <Spinner size="sm" animation="border" /> : "Register"}
        </Button>
      </Form>
    </Card>
  );
}

export default RegisterPage;
