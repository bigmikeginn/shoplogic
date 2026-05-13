import { useEffect, useMemo, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import useFirebaseAuth from './useFirebaseAuth';
import { db } from '../utils/firebaseConfig';

const TRIAL_LENGTH_DAYS = 14;
const DAY_IN_MS = 24 * 60 * 60 * 1000;

function formatFirestoreError(error, fallbackMessage) {
  const message = error?.message ? error.message.replace(/^Firebase:\s*/i, '') : '';
  return message || fallbackMessage;
}

function toDate(value) {
  if (!value) return null;
  if (typeof value?.toDate === 'function') return value.toDate();
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export default function useEntitlement() {
  const { user } = useFirebaseAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(Boolean(user));
  const [error, setError] = useState(null);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = window.setInterval(() => {
      setNow(Date.now());
    }, 60 * 1000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!user?.uid) {
      setProfile(null);
      setLoading(false);
      setError(null);
      return undefined;
    }

    setLoading(true);
    setError(null);

    const unsubscribe = onSnapshot(
      doc(db, 'users', user.uid),
      (snapshot) => {
        setProfile(snapshot.exists() ? snapshot.data() : null);
        setLoading(false);
      },
      (err) => {
        setError(
          formatFirestoreError(
            err,
            'Unable to verify your premium access right now. Please refresh and try again.'
          )
        );
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [user?.uid]);

  return useMemo(() => {
    const trialStartedAt = toDate(profile?.createdAt);
    const trialEndsAt = trialStartedAt ? new Date(trialStartedAt.getTime() + TRIAL_LENGTH_DAYS * DAY_IN_MS) : null;
    const isPremium = profile?.isPremium === true;
    const hasActiveTrial = Boolean(
      trialEndsAt && trialEndsAt.getTime() > now && !isPremium
    );
    const trialDaysLeft = hasActiveTrial
      ? Math.max(1, Math.ceil((trialEndsAt.getTime() - now) / DAY_IN_MS))
      : 0;
    const canUsePremiumFeatures = isPremium || hasActiveTrial;

    let status = 'signed_out';
    if (user?.uid) {
      if (loading) {
        status = 'loading';
      } else if (isPremium) {
        status = 'premium';
      } else if (hasActiveTrial) {
        status = 'trial';
      } else {
        status = 'expired';
      }
    }

    return {
      loading,
      error,
      profile,
      status,
      isPremium,
      hasActiveTrial,
      canUsePremiumFeatures,
      trialDaysLeft,
      trialEndsAt,
      trialLengthDays: TRIAL_LENGTH_DAYS,
    };
  }, [error, loading, now, profile, user?.uid]);
}
