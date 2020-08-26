import * as firebase from 'firebase';
import firestore from 'firebase/firestore'


const config = {
  apiKey: "AIzaSyCK0cH9ERs-sKyzne9mc8L5AKKpMYabCV4",
   authDomain: "fekra-c24e7.firebaseapp.com",
   databaseURL: "https://fekra-c24e7.firebaseio.com",
   projectId: "fekra-c24e7",
   storageBucket: "fekra-c24e7.appspot.com",
   messagingSenderId: "112883431514",
   appId: "1:112883431514:web:f2bafcd823195dfeaac063"
};


export const firebaseApp=firebase.initializeApp(config);
