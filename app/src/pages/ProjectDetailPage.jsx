import { useState, useEffect } from 'react';
import useOutputs from '../hooks/useOutputs';
import useProjects from '../hooks/useProjects';

export default function ProjectDetailPage({ projectId, onBack, onOpenTools }) {
  const { projects } = useProjects();
  const { outputs, loading, error, updateOutput, deleteOutput } = useOutputs(projectId);
  const [expandedId, setExpandedId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editNotes, setEditNotes] = useState('');

  const project = projects.find((p) => p.id === projectId);

  const handleSaveNotes = async (outputId, notes) => {
    try {
      await updateOutput(outputId, { notes });
      setEditingId(null);
    } catch (err) {
      // Error handled by hook
    }
  };

  const handleDeleteOutput = async (outputId) => {
    if (window.confirm('Delete this saved output?')) {
      try {
        await deleteOutput(outputId);
      } catch (err) {
        // Error handled by hook
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
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button
            onClick={onBack}
            className="mb-3 text-[var(--accent)] hover:text-orange-400 transition-colors"
          >
            ← Back to Projects
          </button>
          <h1 className="text-2xl font-bold">{project?.name || 'Project'}</h1>
          {project?.description && (
            <p className="text-sm text-[var(--text-muted)] mt-1">{project.description}</p>
          )}
        </div>
      </header>

      <main className="relative z-10 max-w-4xl mx-auto px-4 py-8">
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
              <div key={i} className="h-32 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[var(--border-light)] animate-pulse" />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && outputs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-[var(--text-muted)] mb-4">No saved outputs yet</p>
            <p className="text-sm text-[var(--text-muted)]">Run a calculator tool and save the results to this project</p>
            <button
              onClick={onOpenTools}
              className="mt-4 px-6 py-3 font-semibold rounded-lg bg-gradient-to-br from-[var(--accent)] to-orange-600 text-gray-900 hover:shadow-xl hover:shadow-[var(--accent)]/50 transition-all"
            >
              Open Tools
            </button>
          </div>
        )}

        {/* Outputs list */}
        <div className="space-y-3">
          {outputs.map((output) => (
            <div
              key={output.id}
              className="p-5 rounded-lg border border-[var(--border-light)] bg-[rgba(255,255,255,0.02)] hover:border-[var(--accent)] hover:bg-[rgba(251,191,36,0.05)] transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <button
                  onClick={() => setExpandedId(expandedId === output.id ? null : output.id)}
                  className="flex-1 text-left"
                >
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors">
                    {output.toolName}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] mt-1">
                    Saved {new Date(output.createdAt?.toDate?.() || output.createdAt).toLocaleDateString()}
                  </p>
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingId(output.id);
                      setEditNotes(output.userNotes || '');
                    }}
                    className="p-2 rounded hover:bg-[rgba(255,255,255,0.05)]"
                    title="Edit notes"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDeleteOutput(output.id)}
                    className="p-2 rounded hover:bg-red-500/10"
                    title="Delete"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              {/* User notes section */}
              {editingId === output.id ? (
                <div className="mb-4 space-y-3">
                  <textarea
                    value={editNotes}
                    onChange={(e) => setEditNotes(e.target.value)}
                    placeholder="Add notes about this calculation..."
                    className="w-full px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[var(--border-light)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)]"
                    rows="3"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSaveNotes(output.id, editNotes)}
                      className="flex-1 py-2 px-4 rounded-lg text-sm font-semibold bg-[var(--accent)] text-gray-900 hover:shadow-lg transition-all"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="flex-1 py-2 px-4 rounded-lg text-sm font-semibold border border-[var(--border-light)] text-[var(--text-primary)] hover:bg-[rgba(255,255,255,0.05)] transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : output.userNotes ? (
                <div className="mb-4 p-3 rounded-lg bg-[rgba(251,191,36,0.05)] border border-[rgba(251,191,36,0.2)]">
                  <p className="text-sm text-[var(--text-secondary)]">{output.userNotes}</p>
                </div>
              ) : null}

              {/* Expandable inputs/results */}
              {expandedId === output.id && (
                <div className="mt-4 space-y-4 border-t border-[var(--border-light)] pt-4">
                  {Object.keys(output.inputs || {}).length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-[var(--accent)] mb-2">Inputs</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm text-[var(--text-secondary)]">
                        {Object.entries(output.inputs).map(([key, value]) => (
                          <div key={key}>
                            <span className="font-medium">{key}:</span> {String(value)}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {Object.keys(output.result || {}).length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-[var(--accent)] mb-2">Result</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm text-[var(--text-secondary)]">
                        {Object.entries(output.result).map(([key, value]) => (
                          <div key={key}>
                            <span className="font-medium">{key}:</span> {String(value)}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
