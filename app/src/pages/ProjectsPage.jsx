import { useState } from 'react';
import useProjects from '../hooks/useProjects';
import useFirebaseAuth from '../hooks/useFirebaseAuth';
import ProjectModal from '../components/ProjectModal';

export default function ProjectsPage({ onSelectProject, onLogout }) {
  const { projects, loading, error, createProject, updateProject, deleteProject } = useProjects();
  const { user } = useFirebaseAuth();
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const handleCreateProject = async (name, description) => {
    try {
      await createProject(name, description);
      setShowModal(false);
    } catch (err) {
      // Error is handled by the hook
    }
  };

  const handleUpdateProject = async (projectId, name, description) => {
    try {
      await updateProject(projectId, { name, description });
      setEditingProject(null);
    } catch (err) {
      // Error is handled by the hook
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (window.confirm('Delete this project? This cannot be undone.')) {
      try {
        await deleteProject(projectId);
      } catch (err) {
        // Error is handled by the hook
      }
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-radial from-[color-mix(in_srgb,var(--accent)_3%,transparent)] via-transparent to-transparent opacity-50" />
        <div id="cf-texture" className="absolute inset-0" />
      </div>

      {/* Header */}
      <header className="relative z-10 sticky top-0 backdrop-blur-md bg-[rgba(18,19,24,0.9)] border-b border-[var(--border-light)]">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Projects</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-[var(--text-muted)]">{user?.email}</span>
            <button
              onClick={onLogout}
              className="px-4 py-2 text-sm font-semibold rounded-lg border border-[var(--border-light)] text-[var(--text-primary)] hover:bg-[rgba(255,255,255,0.05)] transition-all"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        {/* Create button */}
        <div className="mb-8 flex gap-3">
          <button
            onClick={() => {
              setEditingProject(null);
              setShowModal(true);
            }}
            className="px-6 py-3 font-semibold rounded-lg bg-gradient-to-br from-[var(--accent)] to-orange-600 text-gray-900 hover:shadow-xl hover:shadow-[var(--accent)]/50 transition-all"
          >
            + New Project
          </button>
        </div>

        {/* Error state */}
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[var(--border-light)] animate-pulse" />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && projects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-[var(--text-muted)] mb-4">No projects yet</p>
            <button
              onClick={() => {
                setEditingProject(null);
                setShowModal(true);
              }}
              className="px-6 py-3 font-semibold rounded-lg bg-gradient-to-br from-[var(--accent)] to-orange-600 text-gray-900 hover:shadow-xl hover:shadow-[var(--accent)]/50 transition-all"
            >
              Create your first project
            </button>
          </div>
        )}

        {/* Projects grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="p-5 rounded-lg border border-[var(--border-light)] bg-[rgba(255,255,255,0.02)] hover:border-[var(--accent)] hover:bg-[rgba(251,191,36,0.05)] hover:shadow-lg hover:shadow-[var(--accent)]/10 transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                  {project.name}
                </h3>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingProject(project);
                      setShowModal(true);
                    }}
                    className="p-2 rounded hover:bg-[rgba(255,255,255,0.05)]"
                    title="Edit"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteProject(project.id);
                    }}
                    className="p-2 rounded hover:bg-red-500/10"
                    title="Delete"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              {project.description && (
                <p className="text-sm text-[var(--text-secondary)] mb-4">{project.description}</p>
              )}

              <button
                onClick={() => onSelectProject(project.id)}
                className="w-full py-2 px-4 rounded-lg text-sm font-semibold bg-[rgba(251,191,36,0.15)] text-[var(--accent)] hover:bg-[rgba(251,191,36,0.25)] transition-all"
              >
                View Outputs →
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* Project Modal */}
      {showModal && (
        <ProjectModal
          project={editingProject}
          onSave={editingProject ? (name, desc) => handleUpdateProject(editingProject.id, name, desc) : handleCreateProject}
          onClose={() => {
            setShowModal(false);
            setEditingProject(null);
          }}
        />
      )}
    </div>
  );
}
