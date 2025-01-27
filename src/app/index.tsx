import "./styles/index.scss";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import { AppRouter } from "./routes";

const firebaseConfig = {
	apiKey: "AIzaSyCLTU-0_Wy1W_yvLHHJgdSl9ObHaf3ZJCk",
	authDomain: "to-do-4f5bf.firebaseapp.com",
	projectId: "to-do-4f5bf",
	storageBucket: "to-do-4f5bf.appspot.com",
	messagingSenderId: "740160248572",
	appId: "1:740160248572:web:3f675c185d53831dff9579",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

const App = () => <AppRouter />;

export default App;
