//firebase config key setup

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


//your we app's firebase configuration
const firebaseConfig = {

    apiKey: "AIzaSyBYeZ2o7-jkB82N4G4atKFayjALBklRLao",
    authDomain: "private-notes01.firebaseapp.com",
    projectId: "private-notes01",
    storageBucket: "private-notes01.appspot.com",
    messagingSenderId: "830002258157",
    appId: "1:830002258157:web:2fe74af1d4a9e058432ce4",
    measurementId: "G-YD9J427ZCD"
  
  };
  

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export{firebase};