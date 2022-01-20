export const FirebaseINIT = async () => {
  console.log("Firing initial config firebase")
  const firebaseConfig = {
    apiKey: "AIzaSyAgg0nJjChQ2R7TrmiRKT-wGcCVGM5ct7Y",
    authDomain: "tcu-374-486-7712e.firebaseapp.com",
    projectId: "tcu-374-486-7712e",
    storageBucket: "tcu-374-486-7712e.appspot.com",
    messagingSenderId: "725202363337",
    appId: "1:725202363337:web:74d3e3d1da770c0f0e7e18",
  };

  await firebase.initializeApp(firebaseConfig);
};
