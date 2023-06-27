import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomai,
  projectId: import.meta.env.VITE_projectI,
  storageBucket: import.meta.env.VITE_storageBucke,
  messagingSenderId: import.meta.env.VITE_messagingSenderI,
  appId: import.meta.env.VITE_appId,
};

// };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;
