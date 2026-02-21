import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

function App() {
  return (
    <div
      style={{ fontFamily: "sans-serif", padding: "2rem", textAlign: "center" }}
    >
      <h1 style={{ color: "#ff6b6b" }}>Succesfully app developed</h1>
      <p style={{ color: "#555" }}>
        Your app is running! Start editing <code>src/main.tsx</code>
      </p>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
