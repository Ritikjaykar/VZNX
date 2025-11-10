import { BarChart3, Users, FolderOpen } from "lucide-react";

export default function Navigation({ currentView, onNavigate }) {
  const tab = (active) =>
    active ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground";

  return (
    <nav className="border-b border-border bg-card sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <FolderOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold">VZNX Studio</span>
          </div>

          <div className="flex items-center gap-1 ml-auto">
            <button
              onClick={() => onNavigate("projects")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                currentView === "projects" || currentView === "project-detail" ? tab(true) : tab(false)
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              Projects
            </button>
            <button
              onClick={() => onNavigate("team")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                currentView === "team" ? tab(true) : tab(false)
              }`}
            >
              <Users className="w-4 h-4" />
              Team
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
