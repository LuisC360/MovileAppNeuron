import firebase from 'firebase';

const config={
    apiKey: "AIzaSyAKPf4g06xtvozWdiy07FBQ6-BTxcaR-Qo",
    authDomain: "databasemobile-f58e0.firebaseapp.com",
    databaseURL: "https://databasemobile-f58e0.firebaseio.com",
    projectId: "databasemobile-f58e0",
    storageBucket: "databasemobile-f58e0.appspot.com",
    messagingSenderId: "977586236271",
    appId: "1:977586236271:web:39e3ebb66ebd9030bb569a"
}

firebase.initializeApp(config);

export default firebase;