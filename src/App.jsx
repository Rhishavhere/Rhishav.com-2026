import "./styles/fonts.css";
import "./styles/variables.css";
import "./styles/reset.css";
import "./styles/global.css";
import "./styles/scrollbar.css";

import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import SmoothScroll from "./components/smooth-scroll/SmoothScroll";
import LoadingPage from "./components/loading/LoadingPage";
import HomePage from "./pages/home/HomePage";

const AboutPage = lazy(() => import("./pages/about/AboutPage"));
const ManifestPage = lazy(() => import("./pages/manifest/ManifestPage"));
const ManifestArticle = lazy(
  () => import("./pages/manifest/article/ManifestArticle"),
);
const ProjectsPage = lazy(() => import("./pages/projects/ProjectsPage"));
const WorkPage = lazy(() => import("./pages/project/WorkPage"));
const ContactPage = lazy(() => import("./pages/contact/ContactPage"));
const NotFoundPage = lazy(() => import("./pages/not-found/NotFoundPage"));

function App() {
  return (
    <SmoothScroll>
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about-me" element={<AboutPage />} />
          <Route path="/manifest" element={<ManifestPage />} />
          <Route path="/manifest/:slug" element={<ManifestArticle />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<WorkPage />} />
          <Route path="/contact-me" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </SmoothScroll>
  );
}

export default App;
