import { useState } from "react";
import Navigation from "./components/Navigation";
import ProjectDashboard from "./components/ProjectDashboard";
import ProjectDetail from "./components/ProjectDetail";
import TeamOverview from "./components/TeamOverview";

export default function App() {
  const [view, setView] = useState("projects"); // "projects" | "project-detail" | "team"
  const [currentProject, setCurrentProject] = useState(null);

  return (
    <div className="min-h-screen">
      <Navigation
        currentView={view}
        onNavigate={(v) => { setView(v); if (v !== "project-detail") setCurrentProject(null); }}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {view === "projects" && (
          <ProjectDashboard
            onSelectProject={(p) => { setCurrentProject(p); setView("project-detail"); }}
          />
        )}
        {view === "project-detail" && currentProject && (
          <ProjectDetail
            project={currentProject}
            onBack={() => { setCurrentProject(null); setView("projects"); }}
            onProjectUpdated={setCurrentProject}
          />
        )}
        {view === "team" && <TeamOverview />}
      </main>
    </div>
  );
}
