import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";
import { http } from "../lib/api";

export default function ProjectDashboard({ onSelectProject }) {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  async function load() {
    const data = await http("/projects");
    setProjects(data);
  }
  useEffect(() => { load(); }, []);

  async function createProject(name) {
    await http("/projects", { method: "POST", body: { name, status: "Planning", progress: 0 } });
    setShowForm(false);
    load();
  }

  async function updateProject(id, patch) {
    await http(`/projects/${id}`, { method: "PUT", body: patch });
    setShowForm(false);
    setEditing(null);
    load();
  }

  async function deleteProject(id) {
    await http(`/projects/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Projects</h1>
        </div>
        <button
          onClick={() => { setEditing(null); setShowForm(true); }}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity font-medium"
        >
          <Plus className="w-4 h-4" />
          New Project
        </button>
      </div>

      {showForm && (
        <ProjectForm
          initialName={editing?.name || ""}
          onCancel={() => { setShowForm(false); setEditing(null); }}
          onSubmit={(name) => editing ? updateProject(editing._id, { name }) : createProject(name)}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((p) => (
          <ProjectCard
            key={p._id}
            project={{
              id: p._id,
              name: p.name,
              status: p.status || (p.progress === 100 ? "Completed" : p.progress > 0 ? "In Progress" : "Planning"),
              progress: p.progress || 0,
              // these two are best-effort; will be exact in detail page
              taskCount: p.taskCount || 0,
              completedTaskCount: p.completedTaskCount || 0,
            }}
            onSelect={() => onSelectProject(p)}
            onEdit={() => { setEditing(p); setShowForm(true); }}
            onDelete={() => deleteProject(p._id)}
            onUpdateProgress={(val) => updateProject(p._id, { progress: val })}
          />
        ))}
      </div>

      {!projects.length && !showForm && (
        <div className="text-center py-12 bg-secondary rounded-lg">
          <p className="text-muted-foreground">No projects yet. Create your first project to get started.</p>
        </div>
      )}
    </div>
  );
}
