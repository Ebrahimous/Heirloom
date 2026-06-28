import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInAnonymously } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? 'AIzaSyA5ABh6y8Ffd7BVDD96MCKiVmtQN-nJ9-I',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? 'heirloom-48ead.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? 'heirloom-48ead',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? 'heirloom-48ead.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? '572313471725',
  appId: import.meta.env.VITE_FIREBASE_APP_ID ?? '1:572313471725:web:14f50f0c437fffad8c9ae4',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export async function signInAsGuest() {
  return signInAnonymously(auth);
}
