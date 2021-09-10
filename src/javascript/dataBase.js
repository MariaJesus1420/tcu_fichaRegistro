export const DATABASE = {
  db: firebase.firestore(),
  addEvent: async (event, year, id) => {
    db.collection("Events")
      .doc(year)
      .update({
        [id]: event,
      })
      .then(() => {})
      .catch((error) => {});
  },
};
