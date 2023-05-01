import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD-fMdcfpwnswrK2eITee7biyQnUj_kMp0",
    authDomain: "ebay-e0a66.firebaseapp.com",
    projectId: "ebay-e0a66",
    storageBucket: "ebay-e0a66.appspot.com",
    messagingSenderId: "729999691315",
    appId: "1:729999691315:web:ff29e0005478c6e307dd46",
    measurementId: "G-RPWDZSS9CP"
};

const app = initializeApp(firebaseConfig);
console.log(app)

export const auth = getAuth()