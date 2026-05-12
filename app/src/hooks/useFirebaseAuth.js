import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db } from '../utils/firebaseConfig';

function formatFirebaseError(error, fallbackMessage) {
  const message = error?.message ? error.message.replace(/^Firebase:\s*/i, '') : '';
  return message || fallbackMessage;
}

async function upsertUserProfile(user) {
  const profileRef = doc(db, 'users', user.uid);

  await setDoc(
    profileRef,
    {
      email: user.email ?? '',
      displayName: user.displayName ?? '',
      preferredUnits: 'imperial',
      theme: 'dark',
      trialStartedAt: serverTimestamp(),
      hasPurchased: false,
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    },
    { merge: true }
  );
}

export function useFirebaseAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const signUp = useCallback(async (email, password) => {
    setError(null);

    try {
      const credentials = await createUserWithEmailAndPassword(auth, email, password);
      await upsertUserProfile(credentials.user);
      return credentials.user;
    } catch (err) {
      const message = formatFirebaseError(
        err,
        'Unable to create your account right now. Please try again.'
      );
      setError(message);
      throw new Error(message);
    }
  }, []);

  const signIn = useCallback(async (email, password) => {
    setError(null);

    try {
      const credentials = await signInWithEmailAndPassword(auth, email, password);
      return credentials.user;
    } catch (err) {
      const message = formatFirebaseError(
        err,
        'Unable to sign you in right now. Please check your email and password.'
      );
      setError(message);
      throw new Error(message);
    }
  }, []);

  const signOut = useCallback(async () => {
    setError(null);

    try {
      await firebaseSignOut(auth);
    } catch (err) {
      const message = formatFirebaseError(err, 'Unable to sign out right now. Please try again.');
      setError(message);
      throw new Error(message);
    }
  }, []);

  const resetPassword = useCallback(async (email) => {
    setError(null);

    try {
      await sendPasswordResetEmail(auth, email);
    } catch (err) {
      const message = formatFirebaseError(
        err,
        'Unable to send a password reset email right now. Please try again.'
      );
      setError(message);
      throw new Error(message);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      },
      (err) => {
        const message = formatFirebaseError(
          err,
          'Unable to verify your session right now. Please refresh and try again.'
        );
        setError(message);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  return useMemo(
    () => ({
      user,
      loading,
      error,
      signUp,
      signIn,
      signOut,
      resetPassword,
      clearError,
    }),
    [clearError, error, loading, resetPassword, signIn, signOut, signUp, user]
  );
}

export default useFirebaseAuth;
