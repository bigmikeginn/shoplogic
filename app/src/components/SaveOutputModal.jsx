import { useState, useEffect } from 'react';
import useProjects from '../hooks/useProjects';
import useOutputs from '../hooks/useOutputs';

export default function SaveOutputModal({
  toolId,
  toolName,
  inputs = {},
  result = {},
  onClose,
  onSuccess,
}) {
  const { projects, loading: projectsLoading } = useProjects();
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [notes, setNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  const { saveOutput } = useOutputs(selectedProjectId);

  useEffect(() => {
    if (projects.length === 0) {
      setSelectedProjectId('');
      return;
    }

    const hasSelection = projects.some((project) => project.id === selectedProjectId);
    if (!hasSelection) {
      setSelectedProjectId(projects[0].id);
    }
  }, [projects, selectedProjectId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!selectedProjectId) {
      setError('Choose a project before saving.');
      return;
    }

    setIsSaving(true);

    try {
      await saveOutput(toolId, toolName, {
        inputs,
        result,
        notes,
      });
      onSuccess?.();
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to save output');
    } finally {
      setIsSaving(false);
    }
  };

  if (projectsLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className="max-w-md w-full p-8 rounded-lg border border-[var(--border-light)] bg-[var(--bg-primary)]">
          <p className="text-[var(--text-muted)]">Loading projects...</p>
        </div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className="max-w-md w-full p-8 rounded-lg border border-[var(--border-light)] bg-[var(--bg-primary)]">
          <h2 className="text-2xl font-bold mb-4">No Projects</h2>
          <p className="text-[var(--text-secondary)] mb-6">
            Create a project first to save your calculations.
          </p>
          <button
            onClick={onClose}
            className="w-full py-2 px-4 rounded-lg border border-[var(--border-light)] text-[var(--text-primary)] hover:bg-[rgba(255,255,255,0.05)] transition-all"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="max-w-md w-full p-8 rounded-lg border border-[var(--border-light)] bg-[var(--bg-primary)]">
        <h2 className="text-2xl font-bold mb-6">Save to Project</h2>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Project</label>
            <select
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[var(--border-light)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
            >
              {projects.map((project) => (
                <option key={project.id} value={project.id} className="bg-[var(--bg-primary)]">
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Notes (optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add your own notes about this calculation..."
              className="w-full px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[var(--border-light)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] resize-none"
              rows="3"
            />
          </div>

          <div className="p-3 rounded-lg bg-[rgba(251,191,36,0.08)] border border-[rgba(251,191,36,0.2)] text-sm text-[var(--text-secondary)]">
            <p className="font-medium text-[var(--accent)] mb-1">Saving:</p>
            <ul className="space-y-1 text-xs">
              <li>✓ Tool: {toolName}</li>
              <li>✓ Project: {projects.find((p) => p.id === selectedProjectId)?.name ?? 'Select a project'}</li>
              <li>✓ Inputs and result</li>
              <li>✓ Your notes</li>
            </ul>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={isSaving || !selectedProjectId}
              className="flex-1 py-3 font-semibold rounded-lg bg-gradient-to-br from-[var(--accent)] to-orange-600 text-gray-900 hover:shadow-xl hover:shadow-[var(--accent)]/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 font-semibold rounded-lg border border-[var(--border-light)] text-[var(--text-primary)] hover:bg-[rgba(255,255,255,0.05)] transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
