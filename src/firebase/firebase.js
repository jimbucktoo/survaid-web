import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCt7XxcQPI05jAlxVsovgnhdiOmU-aAbhs",
    authDomain: "survaidapp-583db.firebaseapp.com",
    projectId: "survaidapp-583db",
    databaseURL: "https://survaidapp-583db-default-rtdb.firebaseio.com/",
    storageBucket: "survaidapp-583db.appspot.com",
    messagingSenderId: "859396729135",
    appId: "1:859396729135:web:46178c376b627f402319da"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
