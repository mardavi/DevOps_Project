import { Card, ListGroup, Badge } from "react-bootstrap";

function FeatureRequestList({ features, selectedFeatureId, onSelectFeature }) {
  return (
    <Card className="mt-3 border">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">Feature Requests</h5>
          <Badge bg="secondary">{features.length}</Badge>
        </div>

        {features.length === 0 ? (
          <p className="text-muted mb-0">
            No feature requests yet for this project.
          </p>
        ) : (
          <ListGroup>
            {features.map((feature) => (
              <ListGroup.Item
                key={feature.id}
                action
                active={selectedFeatureId === feature.id}
                onClick={() => onSelectFeature(feature.id)}
                className="py-3"
              >
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <div className="fw-bold">{feature.title}</div>
                    <div className="small text-muted">
                      {feature.description.length > 90
                        ? `${feature.description.slice(0, 90)}...`
                        : feature.description}
                    </div>
                  </div>

                  <Badge
                    bg={feature.status === "completed" ? "success" : "warning"}
                  >
                    {feature.status || "open"}
                  </Badge>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Card.Body>
    </Card>
  );
}

export default FeatureRequestList;
