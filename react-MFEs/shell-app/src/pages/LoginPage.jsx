import { Form, Button, Card } from "react-bootstrap";

function LoginPage() {
  return (
    <Card className="p-4 mx-auto" style={{ maxWidth: "500px" }}>
      <h2 className="mb-3">Login</h2>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter password" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Card>
  );
}

export default LoginPage;
