import { Row, Col, Card } from "react-bootstrap";
import CreateProjectForm from "./CreateProjectForm";
import ProjectDetails from "./ProjectDetails";

function ProjectsDashboard() {
  const mockProject = {
    id: "1",
    title: "DevPilot Platform",
    description: "A collaboration platform for developers.",
    owner: "Percy",
  };

  return (
    <>
      <h2 className="mb-4">Projects App</h2>

      <Row className="g-4">
        <Col md={4}>
          <Card className="p-3">
            <h4>Create Project</h4>
            <CreateProjectForm />
          </Card>
        </Col>

        <Col md={8}>
          <ProjectDetails project={mockProject} />
        </Col>
      </Row>
    </>
  );
}

export default ProjectsDashboard;
