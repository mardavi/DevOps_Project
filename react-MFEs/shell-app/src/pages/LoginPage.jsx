// import { Form, Button, Card } from "react-bootstrap";

// function LoginPage() {
//   return (
//     <Card className="p-4 mx-auto" style={{ maxWidth: "500px" }}>
//       <h2 className="mb-3">Login</h2>

//       <Form>
//         <Form.Group className="mb-3">
//           <Form.Label>Email</Form.Label>
//           <Form.Control type="email" placeholder="Enter email" />
//         </Form.Group>

//         <Form.Group className="mb-3">
//           <Form.Label>Password</Form.Label>
//           <Form.Control type="password" placeholder="Enter password" />
//         </Form.Group>

//         <Button variant="primary" type="submit">
//           Login
//         </Button>
//       </Form>
//     </Card>
//   );
// }

// export default LoginPage;

import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { Form, Button, Card, Alert, Spinner } from "react-bootstrap";
import { LOGIN_USER, GET_CURRENT_USER } from "../graphql/auth";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const [loginUser, { loading, error }] = useMutation(LOGIN_USER, {
    refetchQueries: [{ query: GET_CURRENT_USER }],
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const { data } = await loginUser({
        variables: {
          email,
          password,
        },
      });

      if (data?.login) {
        setMessage(`Welcome back, ${data.login.username}.`);
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card className="p-4 mx-auto" style={{ maxWidth: "500px" }}>
      <h2 className="mb-3">Login</h2>

      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error.message}</Alert>}

      <Form onSubmit={submitHandler}>
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

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? <Spinner size="sm" animation="border" /> : "Login"}
        </Button>
      </Form>
    </Card>
  );
}

export default LoginPage;
