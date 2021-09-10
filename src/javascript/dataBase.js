export const DATABASE = {
  db: () => {
    firebase.firestore();
  },
  addEvent: async (event, year, id) => {
    db.collection("cities")
      .update({
        [id]: event,
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  },
};
