import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore';
import useFirebaseAuth from './useFirebaseAuth';
import { db } from '../utils/firebaseConfig';

function formatFirestoreError(error, fallbackMessage) {
  const message = error?.message ? error.message.replace(/^Firebase:\s*/i, '') : '';
  return message || fallbackMessage;
}

function requireUser(user) {
  if (!user?.uid) {
    throw new Error('You must be signed in to manage projects.');
  }
}

export function useProjects() {
  const { user } = useFirebaseAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.uid) {
      setProjects([]);
      setLoading(false);
      setError(null);
      return undefined;
    }

    setLoading(true);
    setError(null);

    const projectsQuery = query(
      collection(db, 'projects'),
      where('userId', '==', user.uid),
      orderBy('updatedAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      projectsQuery,
      (snapshot) => {
        const nextProjects = snapshot.docs.map((projectDoc) => ({
          id: projectDoc.id,
          ...projectDoc.data(),
        }));

        setProjects(nextProjects);
        setLoading(false);
      },
      (err) => {
        setError(
          formatFirestoreError(
            err,
            'Unable to load projects right now. Please refresh and try again.'
          )
        );
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [user?.uid]);

  const getProjects = useCallback(() => projects, [projects]);

  const createProject = useCallback(
    async (name, description = '') => {
      requireUser(user);

      const trimmedName = name?.trim();
      const trimmedDescription = description?.trim() ?? '';

      if (!trimmedName) {
        throw new Error('Project name is required.');
      }

      try {
        const projectRef = await addDoc(collection(db, 'projects'), {
          userId: user.uid,
          name: trimmedName,
          description: trimmedDescription,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });

        return projectRef.id;
      } catch (err) {
        const message = formatFirestoreError(
          err,
          'Unable to create this project right now. Please try again.'
        );
        setError(message);
        throw new Error(message);
      }
    },
    [user]
  );

  const updateProject = useCallback(
    async (projectId, updates = {}) => {
      requireUser(user);

      if (!projectId) {
        throw new Error('Project ID is required to update a project.');
      }

      const nextData = {};

      if (typeof updates.name === 'string') {
        const trimmedName = updates.name.trim();

        if (!trimmedName) {
          throw new Error('Project name cannot be empty.');
        }

        nextData.name = trimmedName;
      }

      if (typeof updates.description === 'string') {
        nextData.description = updates.description.trim();
      }

      if (Object.keys(nextData).length === 0) {
        return;
      }

      nextData.updatedAt = serverTimestamp();

      try {
        await updateDoc(doc(db, 'projects', projectId), nextData);
      } catch (err) {
        const message = formatFirestoreError(
          err,
          'Unable to update this project right now. Please try again.'
        );
        setError(message);
        throw new Error(message);
      }
    },
    [user]
  );

  const deleteProject = useCallback(
    async (projectId) => {
      requireUser(user);

      if (!projectId) {
        throw new Error('Project ID is required to delete a project.');
      }

      try {
        const outputsRef = collection(db, 'projects', projectId, 'outputs');
        const outputSnapshot = await getDocs(outputsRef);

        if (!outputSnapshot.empty) {
          const batch = writeBatch(db);
          outputSnapshot.docs.forEach((outputDoc) => batch.delete(outputDoc.ref));
          batch.delete(doc(db, 'projects', projectId));
          await batch.commit();
          return;
        }

        await deleteDoc(doc(db, 'projects', projectId));
      } catch (err) {
        const message = formatFirestoreError(
          err,
          'Unable to delete this project right now. Please try again.'
        );
        setError(message);
        throw new Error(message);
      }
    },
    [user]
  );

  return useMemo(
    () => ({
      projects,
      loading,
      error,
      getProjects,
      createProject,
      updateProject,
      deleteProject,
    }),
    [createProject, deleteProject, error, getProjects, loading, projects, updateProject]
  );
}

export default useProjects;
