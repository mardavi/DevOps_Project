// import { useEffect, useState, lazy, Suspense } from "react";
// import { gql } from "@apollo/client";
// import { useApolloClient, useMutation } from "@apollo/client/react";
// import { Container, Card, Spinner, Alert } from "react-bootstrap";
// import ShellNavbar from "./components/ShellNavbar.jsx";

// const AuthApp = lazy(() => import("authApp/App"));
// const ProjectsApp = lazy(() => import("projectsApp/App"));

// const CURRENT_USER_QUERY = gql`
//   query CurrentUser {
//     currentUser {
//       id
//       username
//       email
//       role
//     }
//   }
// `;

// const LOGOUT_MUTATION = gql`
//   mutation Logout {
//     logout
//   }
// `;

// function App() {
//   const client = useApolloClient();

//   const [checkingAuth, setCheckingAuth] = useState(true);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [authError, setAuthError] = useState("");
//   const [activeView, setActiveView] = useState("projects");

//   const [logout, { loading: logoutLoading }] = useMutation(LOGOUT_MUTATION, {
//     onCompleted: async () => {
//       await checkAuth();
//       window.dispatchEvent(new Event("auth-changed"));
//     },
//     onError: async () => {
//       await checkAuth();
//     },
//   });

//   const checkAuth = async () => {
//     setCheckingAuth(true);
//     setAuthError("");

//     try {
//       const { data } = await client.query({
//         query: CURRENT_USER_QUERY,
//         fetchPolicy: "network-only",
//       });

//       setCurrentUser(data?.currentUser || null);
//     } catch (error) {
//       setCurrentUser(null);
//       setAuthError(error.message || "Failed to check authentication.");
//     } finally {
//       setCheckingAuth(false);
//     }
//   };

//   useEffect(() => {
//     checkAuth();

//     const handler = () => {
//       checkAuth();
//     };

//     window.addEventListener("auth-changed", handler);

//     return () => {
//       window.removeEventListener("auth-changed", handler);
//     };
//   }, []);

//   const handleLogout = async () => {
//     await logout();
//   };

//   if (checkingAuth) {
//     return (
//       <Container className="py-5">
//         <Card className="shadow-sm">
//           <Card.Body className="d-flex align-items-center gap-2">
//             <Spinner animation="border" size="sm" />
//             <span>Checking authentication...</span>
//           </Card.Body>
//         </Card>
//       </Container>
//     );
//   }

//   if (!currentUser) {
//     return (
//       <Container className="py-5">
//         <Card className="shadow-sm">
//           <Card.Body>
//             <h1 className="mb-3">DevPilot 2026 Shell App</h1>
//             <p className="text-muted mb-4">
//               Shell is loading the auth remote because no active session was
//               found.
//             </p>

//             {authError && <Alert variant="warning">{authError}</Alert>}

//             <Suspense
//               fallback={
//                 <div className="d-flex align-items-center gap-2">
//                   <Spinner animation="border" size="sm" />
//                   <span>Loading auth app...</span>
//                 </div>
//               }
//             >
//               <AuthApp />
//             </Suspense>
//           </Card.Body>
//         </Card>
//       </Container>
//     );
//   }

//   return (
//     <>
//       <ShellNavbar
//         user={currentUser}
//         onLogout={handleLogout}
//         logoutLoading={logoutLoading}
//         activeView={activeView}
//         onChangeView={setActiveView}
//       />

//       <Container className="pb-5">
//         <Suspense
//           fallback={
//             <Card className="shadow-sm">
//               <Card.Body className="d-flex align-items-center gap-2">
//                 <Spinner animation="border" size="sm" />
//                 <span>Loading remote app...</span>
//               </Card.Body>
//             </Card>
//           }
//         >
//           {activeView === "projects" && <ProjectsApp />}

//           {activeView === "ai-review" && (
//             <Card className="shadow-sm">
//               <Card.Body>
//                 <h2 className="mb-3">AI Review Placeholder</h2>
//                 <p className="text-muted mb-0">
//                   This placeholder shows where the future AI-assisted review
//                   workflow will be integrated.
//                 </p>
//               </Card.Body>
//             </Card>
//           )}
//         </Suspense>
//       </Container>
//     </>
//   );
// }

// export default App;

import { useEffect, useState, lazy, Suspense } from "react";
import { gql } from "@apollo/client";
import { useApolloClient, useMutation } from "@apollo/client/react";
import { Container, Card, Spinner, Alert } from "react-bootstrap";
import ShellNavbar from "./components/ShellNavbar.jsx";

const AuthApp = lazy(() => import("authApp/App"));
const ProjectsApp = lazy(() => import("projectsApp/App"));
const AiReviewApp = lazy(() => import("aiReviewApp/App"));

const CURRENT_USER_QUERY = gql`
  query CurrentUser {
    currentUser {
      id
      username
      email
      role
    }
  }
`;

const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout
  }
`;

function App() {
  const client = useApolloClient();

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [authError, setAuthError] = useState("");
  const [activeView, setActiveView] = useState("projects");

  const [logout, { loading: logoutLoading }] = useMutation(LOGOUT_MUTATION, {
    onCompleted: async () => {
      await checkAuth();
      window.dispatchEvent(new Event("auth-changed"));
    },
    onError: async () => {
      await checkAuth();
    },
  });

  const checkAuth = async () => {
    setCheckingAuth(true);
    setAuthError("");

    try {
      const { data } = await client.query({
        query: CURRENT_USER_QUERY,
        fetchPolicy: "network-only",
      });

      setCurrentUser(data?.currentUser || null);
    } catch (error) {
      setCurrentUser(null);
      setAuthError(error.message || "Failed to check authentication.");
    } finally {
      setCheckingAuth(false);
    }
  };

  useEffect(() => {
    checkAuth();

    const handler = () => {
      checkAuth();
    };

    window.addEventListener("auth-changed", handler);

    return () => {
      window.removeEventListener("auth-changed", handler);
    };
  }, []);

  const handleLogout = async () => {
    await logout();
  };

  if (checkingAuth) {
    return (
      <Container className="py-5">
        <Card className="shadow-sm">
          <Card.Body className="d-flex align-items-center gap-2">
            <Spinner animation="border" size="sm" />
            <span>Checking authentication...</span>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  if (!currentUser) {
    return (
      <Container className="py-5">
        <Card className="shadow-sm">
          <Card.Body>
            <h1 className="mb-3">DevPilot 2026 Shell App</h1>
            <p className="text-muted mb-4">
              Shell is loading the auth remote because no active session was
              found.
            </p>

            {authError && <Alert variant="warning">{authError}</Alert>}

            <Suspense
              fallback={
                <div className="d-flex align-items-center gap-2">
                  <Spinner animation="border" size="sm" />
                  <span>Loading auth app...</span>
                </div>
              }
            >
              <AuthApp />
            </Suspense>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <>
      <ShellNavbar
        user={currentUser}
        onLogout={handleLogout}
        logoutLoading={logoutLoading}
        activeView={activeView}
        onChangeView={setActiveView}
      />

      <Container className="pb-5">
        <Suspense
          fallback={
            <Card className="shadow-sm">
              <Card.Body className="d-flex align-items-center gap-2">
                <Spinner animation="border" size="sm" />
                <span>Loading remote app...</span>
              </Card.Body>
            </Card>
          }
        >
          {activeView === "projects" && <ProjectsApp />}
          {activeView === "ai-review" && <AiReviewApp />}
        </Suspense>
      </Container>
    </>
  );
}

export default App;
