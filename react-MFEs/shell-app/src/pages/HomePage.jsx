import { useQuery } from "@apollo/client/react";
import { Alert, Spinner } from "react-bootstrap";
import { GET_CURRENT_USER } from "../graphql/auth";

function HomePage() {
  const { data, loading, error } = useQuery(GET_CURRENT_USER, {
    fetchPolicy: "network-only",
  });

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return (
      <Alert variant="warning">
        Could not load current user. This may be normal if the gateway or auth
        service is not ready yet.
      </Alert>
    );
  }

  return (
    <div>
      <h1>Welcome to DevPilot 2026</h1>
      <p>This is the Shell App for the micro frontend project.</p>

      {data?.currentUser ? (
        <Alert variant="success">
          Logged in as <strong>{data.currentUser.username}</strong>{" "}
          ({data.currentUser.role})
        </Alert>
      ) : (
        <Alert variant="secondary">No user is currently logged in.</Alert>
      )}
    </div>
  );
}

export default HomePage;