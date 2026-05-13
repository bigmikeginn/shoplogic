import { useEffect, useMemo, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../utils/firebaseConfig';
import useFirebaseAuth from './useFirebaseAuth';

export const TRIAL_DAYS = 14;
const MS_PER_DAY = 24 * 60 * 60 * 1000;

function toDate(value) {
  if (!value) return null;
  if (typeof value.toDate === 'function') return value.toDate();
  if (value instanceof Date) return value;
  return null;
}

export function useEntitlement() {
  const { user } = useFirebaseAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return undefined;
    }

    setLoading(true);
    const unsubscribe = onSnapshot(
      doc(db, 'users', user.uid),
      (snap) => {
        setProfile(snap.exists() ? snap.data() : null);
        setLoading(false);
      },
      () => {
        setProfile(null);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, [user?.uid]);

  return useMemo(() => {
    if (!user) {
      return { loading: false, status: 'unauthenticated', isPremium: false, daysLeftInTrial: null };
    }
    if (loading || !profile) {
      return { loading: true, status: 'loading', isPremium: false, daysLeftInTrial: null };
    }
    if (profile.hasPurchased) {
      return { loading: false, status: 'purchased', isPremium: true, daysLeftInTrial: null };
    }

    const trialStart = toDate(profile.trialStartedAt) || toDate(profile.createdAt);
    if (!trialStart) {
      // Profile exists but no timestamps yet — server timestamps haven't synced.
      // Optimistically treat as trial so the user is never locked out during signup.
      return { loading: false, status: 'trial', isPremium: true, daysLeftInTrial: TRIAL_DAYS };
    }

    const elapsed = Date.now() - trialStart.getTime();
    const daysLeft = Math.max(0, Math.ceil((TRIAL_DAYS * MS_PER_DAY - elapsed) / MS_PER_DAY));

    if (daysLeft > 0) {
      return { loading: false, status: 'trial', isPremium: true, daysLeftInTrial: daysLeft };
    }
    return { loading: false, status: 'expired', isPremium: false, daysLeftInTrial: 0 };
  }, [user, loading, profile]);
}

export default useEntitlement;
