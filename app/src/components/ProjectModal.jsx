import { useState, useEffect } from 'react';

export default function ProjectModal({ project, onSave, onClose }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (project) {
      setName(project.name || '');
      setDescription(project.description || '');
    }
  }, [project]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsLoading(true);
    try {
      await onSave(name, description);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="max-w-md w-full p-8 rounded-lg border border-[var(--border-light)] bg-[var(--bg-primary)]">
        <h2 className="text-2xl font-bold mb-6">
          {project ? 'Edit Project' : 'New Project'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Project Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Kitchen Cabinet Order"
              className="w-full px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[var(--border-light)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)]"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description (optional)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add notes about this project..."
              className="w-full px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[var(--border-light)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] resize-none"
              rows="3"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={!name.trim() || isLoading}
              className="flex-1 py-3 font-semibold rounded-lg bg-gradient-to-br from-[var(--accent)] to-orange-600 text-gray-900 hover:shadow-xl hover:shadow-[var(--accent)]/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? 'Saving...' : 'Save'}
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
