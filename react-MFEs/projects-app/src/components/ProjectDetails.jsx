// import { Card } from "react-bootstrap";
// import FeatureRequestForm from "./FeatureRequestForm";
// import DraftSubmissionForm from "./DraftSubmissionForm";
// import DraftHistory from "./DraftHistory";

// function ProjectDetails({ project }) {
//   return (
//     <Card className="p-3">
//       <h3>{project.title}</h3>
//       <p>{project.description}</p>
//       <p>
//         <strong>Owner:</strong> {project.owner}
//       </p>

//       <hr />
//       <FeatureRequestForm />

//       <hr />
//       <DraftSubmissionForm />

//       <hr />
//       <DraftHistory />
//     </Card>
//   );
// }

// export default ProjectDetails;

import { Card } from "react-bootstrap";
import FeatureRequestForm from "./FeatureRequestForm";
import DraftSubmissionForm from "./DraftSubmissionForm";
import DraftHistory from "./DraftHistory";

function ProjectDetails({ project }) {
  return (
    <Card className="p-3">
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <p>
        <strong>Owner:</strong> {project.owner}
      </p>

      <hr />
      <FeatureRequestForm projectId={project.id} />

      <hr />
      <DraftSubmissionForm />

      <hr />
      <DraftHistory />
    </Card>
  );
}

export default ProjectDetails;
