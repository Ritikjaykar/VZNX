import { useEffect, useState } from "react";
import { http } from "../lib/api";

export default function TeamOverview() {
  const [team, setTeam] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [memberName, setMemberName] = useState("");
  const [memberRole, setMemberRole] = useState("");

  async function load() {
    const data = await http("/team");
    setTeam(data);
  }

  useEffect(() => { load(); }, []);

  async function addMember(e) {
    e.preventDefault();
    if (!memberName.trim()) return;
    await http("/team", { method: "POST", body: { name: memberName.trim(), role: memberRole.trim() } });
    setMemberName("");
    setMemberRole("");
    setShowForm(false);
    load();
  }

  async function deleteMember(id) {
    await http(`/team/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Team</h1>
          <p className="text-muted-foreground mt-1">View team members and their workload</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity font-medium"
        >
          {showForm ? "Cancel" : "Add Member"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={addMember} className="bg-secondary border border-border rounded-lg p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                value={memberName}
                onChange={(e) => setMemberName(e.target.value)}
                placeholder="Team member name"
                className="w-full px-3 py-2 border border-border rounded-md bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Role</label>
              <input
                value={memberRole}
                onChange={(e) => setMemberRole(e.target.value)}
                placeholder="e.g., Architect"
                className="w-full px-3 py-2 border border-border rounded-md bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity">
              Add
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {team.map((m) => {
          const cap = Math.min(m.capacity || 0, 100);
          const tasks = m.tasks || 0;
          const color = cap <= 37.5 ? "bg-green-500" : cap <= 75 ? "bg-amber-500" : "bg-red-500";

          return (
            <div key={m._id} className="bg-card border border-border rounded-lg p-5">
              <div className="mb-4 flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{m.name}</h3>
                  <p className="text-sm text-muted-foreground">{m.role || ""}</p>
                </div>
                <button
                  onClick={() => deleteMember(m._id)}
                  className="text-red-600 hover:bg-red-100 rounded-md px-2 py-1 text-sm"
                >
                  Delete
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Workload</span>
                    <span className="text-sm font-medium">{tasks} tasks</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className={`h-2 rounded-full transition-all ${color}`} style={{ width: `${cap}%` }} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {!team.length && (
        <div className="text-center py-12 bg-secondary rounded-lg">
          <p className="text-muted-foreground">No team members yet.</p>
        </div>
      )}
    </div>
  );
}
