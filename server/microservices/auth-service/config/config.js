import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

//--------------------------------------------------
// Configuration for projects-service (2026)
// Session-based authentication (NO JWT)
//--------------------------------------------------

export const config = {
  // MongoDB for users + session store
  db: process.env.MONGO_URI,

  // Session secret (used by express-session)
  SESSION_SECRET: process.env.SESSION_SECRET || "lab3_secret",

  // Service port
  port: process.env.PROJECTS_PORT || 4001,
};

//--------------------------------------------------
// Development-only logging
//--------------------------------------------------

if (process.env.NODE_ENV !== "projects") {
  console.log("🔐Projects Service using SESSION-BASED authentication");
  console.log(`🚀Projects Microservice running on port:${config.port}`);
}
