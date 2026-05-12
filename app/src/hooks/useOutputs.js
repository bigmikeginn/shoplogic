import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import useFirebaseAuth from './useFirebaseAuth';
import { db } from '../utils/firebaseConfig';

function formatFirestoreError(error, fallbackMessage) {
  const message = error?.message ? error.message.replace(/^Firebase:\s*/i, '') : '';
  return message || fallbackMessage;
}

function requireAuthAndProject(user, projectId) {
  if (!user?.uid) {
    throw new Error('You must be signed in to manage project outputs.');
  }

  if (!projectId) {
    throw new Error('Project ID is required to manage outputs.');
  }
}

function normalizeTags(toolId, tags = []) {
  return Array.from(
    new Set(
      [toolId, ...tags]
        .map((tag) => (typeof tag === 'string' ? tag.trim() : ''))
        .filter(Boolean)
    )
  );
}

export function useOutputs(projectId) {
  const { user } = useFirebaseAuth();
  const [outputs, setOutputs] = useState([]);
  const [loading, setLoading] = useState(Boolean(projectId));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.uid || !projectId) {
      setOutputs([]);
      setLoading(false);
      setError(null);
      return undefined;
    }

    setLoading(true);
    setError(null);

    const outputsQuery = query(
      collection(db, 'projects', projectId, 'outputs'),
      where('userId', '==', user.uid),
      orderBy('updatedAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      outputsQuery,
      (snapshot) => {
        const nextOutputs = snapshot.docs.map((outputDoc) => ({
          id: outputDoc.id,
          ...outputDoc.data(),
        }));

        setOutputs(nextOutputs);
        setLoading(false);
      },
      (err) => {
        setError(
          formatFirestoreError(
            err,
            'Unable to load saved outputs right now. Please refresh and try again.'
          )
        );
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [projectId, user?.uid]);

  const getOutputs = useCallback(() => outputs, [outputs]);

  const saveOutput = useCallback(
    async (toolId, toolName, payload = {}) => {
      requireAuthAndProject(user, projectId);

      const trimmedToolId = toolId?.trim();
      const trimmedToolName = toolName?.trim();

      if (!trimmedToolId || !trimmedToolName) {
        throw new Error('Tool ID and tool name are required to save an output.');
      }

      try {
        const outputRef = await addDoc(collection(db, 'projects', projectId, 'outputs'), {
          userId: user.uid,
          toolId: trimmedToolId,
          toolName: trimmedToolName,
          inputs: payload.inputs ?? {},
          result: payload.result ?? {},
          userNotes: payload.notes?.trim() ?? '',
          tags: normalizeTags(trimmedToolId, payload.tags ?? []),
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });

        await updateDoc(doc(db, 'projects', projectId), {
          updatedAt: serverTimestamp(),
        });

        return outputRef.id;
      } catch (err) {
        const message = formatFirestoreError(
          err,
          'Unable to save this output right now. Please try again.'
        );
        setError(message);
        throw new Error(message);
      }
    },
    [projectId, user]
  );

  const updateOutput = useCallback(
    async (outputId, updates = {}) => {
      requireAuthAndProject(user, projectId);

      if (!outputId) {
        throw new Error('Output ID is required to update a saved output.');
      }

      const nextData = {};

      if (typeof updates.notes === 'string') {
        nextData.userNotes = updates.notes.trim();
      }

      if (Array.isArray(updates.tags)) {
        nextData.tags = normalizeTags('', updates.tags).filter(Boolean);
      }

      if (Object.keys(nextData).length === 0) {
        return;
      }

      nextData.updatedAt = serverTimestamp();

      try {
        await updateDoc(doc(db, 'projects', projectId, 'outputs', outputId), nextData);
        await updateDoc(doc(db, 'projects', projectId), {
          updatedAt: serverTimestamp(),
        });
      } catch (err) {
        const message = formatFirestoreError(
          err,
          'Unable to update this saved output right now. Please try again.'
        );
        setError(message);
        throw new Error(message);
      }
    },
    [projectId, user]
  );

  const deleteOutput = useCallback(
    async (outputId) => {
      requireAuthAndProject(user, projectId);

      if (!outputId) {
        throw new Error('Output ID is required to delete a saved output.');
      }

      try {
        await deleteDoc(doc(db, 'projects', projectId, 'outputs', outputId));
        await updateDoc(doc(db, 'projects', projectId), {
          updatedAt: serverTimestamp(),
        });
      } catch (err) {
        const message = formatFirestoreError(
          err,
          'Unable to delete this saved output right now. Please try again.'
        );
        setError(message);
        throw new Error(message);
      }
    },
    [projectId, user]
  );

  return useMemo(
    () => ({
      outputs,
      loading,
      error,
      getOutputs,
      saveOutput,
      updateOutput,
      deleteOutput,
    }),
    [deleteOutput, error, getOutputs, loading, outputs, saveOutput, updateOutput]
  );
}

export default useOutputs;
