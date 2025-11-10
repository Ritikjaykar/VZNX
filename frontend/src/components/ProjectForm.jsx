import { useState } from "react";
import { X } from "lucide-react";

export default function ProjectForm({ onSubmit, onCancel, initialName = "" }) {
  const [name, setName] = useState(initialName);

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); if (name.trim()) onSubmit(name.trim()); }}
      className="bg-secondary border border-border rounded-lg p-4 space-y-4"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{initialName ? "Edit Project" : "Create New Project"}</h3>
        <button type="button" onClick={onCancel} className="p-1 hover:bg-muted rounded">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Project Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter project name"
          className="w-full px-3 py-2 border border-border rounded-md bg-card placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="flex gap-2 justify-end">
        <button type="button" onClick={onCancel} className="px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted rounded-md">
          Cancel
        </button>
        <button type="submit" className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:opacity-90">
          {initialName ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
}
