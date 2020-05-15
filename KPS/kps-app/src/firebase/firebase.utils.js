import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const Config = {
    apiKey: "AIzaSyCjQO5JqM9mc0zrpKi2gAOH_jqi6-fqvBc",
    authDomain: "kps-db.firebaseapp.com",
    databaseURL: "https://kps-db.firebaseio.com",
    projectId: "kps-db",
    storageBucket: "kps-db.appspot.com",
    messagingSenderId: "778677415904",
    appId: "1:778677415904:web:25de080dd87dddf3f84585",
    measurementId: "G-E0NTJ0Q3GD"
};
firebase.initializeApp(Config);


export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = firebase.auth.GoogleAuthProvider();
provider.setCustomParmeters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
