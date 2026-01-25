import {
    initializeApp
} from "firebase/app";
import {
    getFirestore
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA0eITENNkFei0bswAc0dn2Odznkua3rOs",
    authDomain: "clientes-app-ab5a0.firebaseapp.com",
    projectId: "clientes-app-ab5a0",
    storageBucket: "clientes-app-ab5a0.firebasestorage.app",
    messagingSenderId: "333241082509",
    appId: "1:333241082509:web:88edf5f3957f2f8170b8c4"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
export const db = getFirestore(app);
