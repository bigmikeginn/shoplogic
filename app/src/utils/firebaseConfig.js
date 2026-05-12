import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const REQUIRED_ENV_VARS = {
  VITE_FIREBASE_API_KEY: import.meta.env.VITE_FIREBASE_API_KEY,
  VITE_FIREBASE_AUTH_DOMAIN: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  VITE_FIREBASE_PROJECT_ID: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  VITE_FIREBASE_STORAGE_BUCKET: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  VITE_FIREBASE_MESSAGING_SENDER_ID: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  VITE_FIREBASE_APP_ID: import.meta.env.VITE_FIREBASE_APP_ID,
};

const missingEnvVars = Object.entries(REQUIRED_ENV_VARS)
  .filter(([, value]) => !value)
  .map(([key]) => key);

if (missingEnvVars.length > 0) {
  throw new Error(
    `Firebase configuration is incomplete. Add these Vite env vars: ${missingEnvVars.join(', ')}.`
  );
}

const firebaseConfig = {
  apiKey: REQUIRED_ENV_VARS.VITE_FIREBASE_API_KEY,
  authDomain: REQUIRED_ENV_VARS.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: REQUIRED_ENV_VARS.VITE_FIREBASE_PROJECT_ID,
  storageBucket: REQUIRED_ENV_VARS.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: REQUIRED_ENV_VARS.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: REQUIRED_ENV_VARS.VITE_FIREBASE_APP_ID,
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
