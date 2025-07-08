import { createRoot } from "react-dom/client";
import { Suspense, lazy } from "react";
import "./style.css";
import { LoadingPage } from "./pages/LoadingPage"; // استبدل بالمسار الصحيح

// تحميل App ديناميكيًا
const App = lazy(() => import("./App"));

const rootElement = document.getElementById("root");

createRoot(rootElement).render(
  <Suspense fallback={<LoadingPage />}>
    <App />
  </Suspense>
);
