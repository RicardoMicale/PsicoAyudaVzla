// import { initializeApp, getApps, getApp } from "firebase/app";
// import type { FirebaseApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import type { Auth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import type { Firestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// import type { Analytics } from "firebase/analytics";
// import { Voluntario, GrupoApoyo } from "../models";

// // Configuración de Firebase del proyecto del usuario
// const firebaseConfig = {
//   apiKey: "AIzaSyCyZ16hLo0rQLaZr4IpPjokx6QLW54W1TE",
//   authDomain: "psicoayudavzla-6e666.firebaseapp.com",
//   projectId: "psicoayudavzla-6e666",
//   storageBucket: "psicoayudavzla-6e666.firebasestorage.app",
//   messagingSenderId: "263477162648",
//   appId: "1:263477162648:web:f1af1f2fefbd66d28296ed",
//   measurementId: "G-ZH47FQFZQD"
// };

// // Determina si Firebase está configurado adecuadamente
// export const isFirebaseConfigured = true;

// export let app: FirebaseApp | undefined;
// export let auth: Auth | undefined;
// export let db: Firestore | undefined;
// export let analytics: Analytics | undefined;

// try {
//   app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
//   auth = getAuth(app);
//   db = getFirestore(app);
//   if (typeof window !== "undefined") {
//     analytics = getAnalytics(app);
//   }
// } catch (error) {
//   console.error("Error al inicializar Firebase Real:", error);
// }
