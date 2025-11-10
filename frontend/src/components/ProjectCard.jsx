import { MoreVertical, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function ProjectCard({ project, onSelect, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);

  const statusClass = {
    Planning: "bg-blue-50 text-blue-700",
    "In Progress": "bg-amber-50 text-amber-700",
    Completed: "bg-green-50 text-green-700",
  }[project.status] || "bg-blue-50 text-blue-700";

  return (
    <div className="bg-card border border-border rounded-lg p-5 shadow-card hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-lg flex-1 line-clamp-2">{project.name}</h3>
        <div className="relative">
          <button onClick={() => setOpen(!open)} className="p-1 hover:bg-secondary rounded text-muted-foreground">
            <MoreVertical className="w-4 h-4" />
          </button>
          {open && (
            <div className="absolute right-0 top-8 bg-card border border-border rounded-md shadow-lg z-10">
              <button onClick={() => { onEdit(); setOpen(false); }} className="block w-full text-left px-4 py-2 text-sm hover:bg-secondary first:rounded-t-md">
                Edit
              </button>
              <button onClick={() => { onDelete(); setOpen(false); }} className="block w-full text-left px-4 py-2 text-sm hover:bg-secondary text-red-600 last:rounded-b-md">
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusClass}`}>{project.status}</span>
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs text-muted-foreground font-medium">Progress</span>
            <span className="text-xs font-semibold">{project.progress}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-accent h-2 rounded-full transition-all" style={{ width: `${project.progress}%` }} />
          </div>
        </div>
        <div className="flex justify-between text-xs text-muted-foreground pt-1">
          <span>{project.completedTaskCount} of {project.taskCount} tasks</span>
        </div>
      </div>

      <button
        onClick={onSelect}
        className="w-full mt-4 flex items-center justify-center gap-2 text-sm font-medium text-primary hover:opacity-80 transition-colors"
      >
        View Tasks
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
