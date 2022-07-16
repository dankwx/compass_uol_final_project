import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCwdfAA-auqdn5CV31grhBFCZCD7nnMkJA',
  authDomain: 'auth-compass-uol-final-project.firebaseapp.com',
  projectId: 'auth-compass-uol-final-project',
  storageBucket: 'auth-compass-uol-final-project.appspot.com',
  messagingSenderId: '165048601260',
  appId: '1:165048601260:web:b83e17bde3ff62bc11ed09',
  measurementId: 'G-GHEBWH1QK2',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
