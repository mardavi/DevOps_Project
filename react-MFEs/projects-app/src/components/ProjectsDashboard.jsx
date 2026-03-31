import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import {
  Row,
  Col,
  Card,
  ListGroup,
  Alert,
  Spinner,
  Button,
} from "react-bootstrap";
import { GET_PROJECTS_BY_USER } from "../graphql/projects";
import CreateProjectForm from "./CreateProjectForm";
import ProjectDetails from "./ProjectDetails";

function ProjectsDashboard() {
  const [selectedProject, setSelectedProject] = useState(null);

  const { data, loading, error } = useQuery(GET_PROJECTS_BY_USER, {
    fetchPolicy: "network-only",
  });

  const projects = data?.projectsByUser || [];

  return (
    <>
      <h2 className="mb-4">Projects App</h2>

      <Row className="g-4">
        <Col md={4}>
          <Card className="p-3 mb-4">
            <h4>Create Project</h4>
            <CreateProjectForm />
          </Card>

          <Card className="p-3">
            <h4>My Projects</h4>

            {loading && <Spinner animation="border" size="sm" />}
            {error && (
              <Alert variant="warning" className="mt-2">
                Could not load projects yet. This is expected until the gateway
                is running.
              </Alert>
            )}

            {!loading && !error && projects.length === 0 && (
              <Alert variant="secondary" className="mt-2">
                No projects found yet.
              </Alert>
            )}

            {!loading && !error && projects.length > 0 && (
              <ListGroup className="mt-2">
                {projects.map((project) => (
                  <ListGroup.Item
                    key={project.id}
                    action
                    active={selectedProject?.id === project.id}
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="fw-bold">{project.title}</div>
                    <small>{project.description}</small>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Card>
        </Col>

        <Col md={8}>
          {selectedProject ? (
            <ProjectDetails project={selectedProject} />
          ) : (
            <Card className="p-4 text-center">
              <h4>No project selected</h4>
              <p className="mb-0">
                Choose a project from the left to view details.
              </p>
            </Card>
          )}
        </Col>
      </Row>
    </>
  );
}

export default ProjectsDashboard;
