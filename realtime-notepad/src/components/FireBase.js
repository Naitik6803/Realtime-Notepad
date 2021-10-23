import firebase from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAFJDSa7yFZHPoKz8bdznIw5F01gCWO-ss",
    authDomain: "whatsapp-clone-zaid.firebaseapp.com",
    projectId: "whatsapp-clone-zaid",
    storageBucket: "whatsapp-clone-zaid.appspot.com",
    messagingSenderId: "695493940311",
    appId: "1:695493940311:web:2714da9f59d45f2c7dff12",
    measurementId: "G-YVYYVQ8XQ5"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage=firebase.storage();
const database=firebase.database();

export { auth, provider,storage,database };
export default db;
