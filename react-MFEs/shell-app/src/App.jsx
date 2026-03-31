// import { Container, Navbar, Nav } from "react-bootstrap";
// import { Routes, Route, Link } from "react-router-dom";
// import HomePage from "./pages/HomePage";
// import LoginPage from "./pages/LoginPage";
// import RegisterPage from "./pages/RegisterPage";

// function App() {
//   return (
//     <>
//       <Navbar bg="dark" variant="dark" expand="lg">
//         <Container>
//           <Navbar.Brand as={Link} to="/">
//             DevPilot 2026
//           </Navbar.Brand>

//           <Navbar.Toggle aria-controls="main-navbar" />
//           <Navbar.Collapse id="main-navbar">
//             <Nav className="ms-auto">
//               <Nav.Link as={Link} to="/">
//                 Home
//               </Nav.Link>
//               <Nav.Link as={Link} to="/login">
//                 Login
//               </Nav.Link>
//               <Nav.Link as={Link} to="/register">
//                 Register
//               </Nav.Link>
//               <Nav.Link as={Link} to="/projects">
//                 Projects
//               </Nav.Link>
//               <Nav.Link as={Link} to="/ai-review">
//                 AI Review
//               </Nav.Link>
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>

//       <Container className="py-4">
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/register" element={<RegisterPage />} />
//           <Route
//             path="/projects"
//             element={<h2>Projects remote will load here</h2>}
//           />
//           <Route
//             path="/ai-review"
//             element={<h2>AI Review remote will load here</h2>}
//           />
//         </Routes>
//       </Container>
//     </>
//   );
// }

// export default App;

import { lazy, Suspense } from "react";
import { Container, Navbar, Nav, Spinner } from "react-bootstrap";
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const ProjectsApp = lazy(() => import("projects_app/ProjectsApp"));
const AIReviewApp = lazy(() => import("ai_review_app/AIReviewApp"));

function App() {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            DevPilot 2026
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/register">
                Register
              </Nav.Link>
              <Nav.Link as={Link} to="/projects">
                Projects
              </Nav.Link>
              <Nav.Link as={Link} to="/ai-review">
                AI Review
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="py-4">
        <Suspense fallback={<Spinner animation="border" />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/projects" element={<ProjectsApp />} />
            <Route path="/ai-review" element={<AIReviewApp />} />
          </Routes>
        </Suspense>
      </Container>
    </>
  );
}

export default App;
