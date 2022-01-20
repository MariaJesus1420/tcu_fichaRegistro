export class DATABASE {
  db = firebase.firestore();
  constructor() { }

  async addEvent(event, year, id) {
    event.start = new Date(event.start);
    event.end = new Date(event.end);
    this.db
      .collection("Events")
      .doc(year)
      .update({
        [id]: event,
      })
      .then((docRef) => {
        console.log("Document written with ID: ");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  async addFormToEvent(year, eventoId, cuestionarioId) {
    let eventPath = `${eventoId}.cuestionarios`;
    this.db
      .collection("Events")
      .doc(year)
      .update({ [eventPath]: firebase.firestore.FieldValue.arrayUnion(cuestionarioId) })
      .then((docRef) => {
        console.log("Document written");
      })
      .catch((error) => {
        console.log("Error while writing document, ", error);
      });
  }

  async deleteFormFromEvent(year, eventoId, cuestionarioId) {
    let eventPath = `${eventoId}.cuestionarios`;
    this.db
      .collection("Events")
      .doc(year)
      .update({ [eventPath]: firebase.firestore.FieldValue.arrayRemove(cuestionarioId) })
      .then((docRef) => {
        console.log("Document deleted");
      })
      .catch((error) => {
        console.log("Error while deleting document, ", error);
      });
  }
  async addAnwsers(cuestionario, id, respuestas) {
    let userAnswerPath = `Respuestas.${id}.listaPreguntas`;
    this.db
      .collection("Cuestionarios")
      .doc(cuestionario)
      .update({
        [userAnswerPath]: respuestas,
      })
      .then((docRef) => {
        console.log("Document written with ID: ");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  async getAnswers(respuestas, id) {
    let respuestaUser = `Respuestas.${id}`;
    this.db
      .collection("Cuestionarios")
      .doc(id)
      .update({
        [respuestaUser]: respuestas,
      })
      .then((docRef) => {
        console.log("Document written with ID: ");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  async addForm(cuestionario) {
    this.db
      .collection("Cuestionarios")
      .add(cuestionario)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  async obtenerDocumento(coleccion, documento) {
    var docRef = this.db.collection(coleccion).doc(documento);
    let result;

    await docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          result = doc.data();
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
    return result;
  }
  async obtenerTodos(coleccion) {
    let docRef = this.db.collection(coleccion);
    let result = [];

    await docRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        result.push(
          {
            data: doc.data(),
            id: doc.id
          }
        );
      });
    });
    return result;
  }

  async addFichaRegistro(eventoId, year, fichaRegistro, fichaRegistroId) {
    let eventoPath = `${eventoId}.fichasRegistro.${fichaRegistroId}`;
    console.log(fichaRegistro);
    this.db
      .collection("Events")
      .doc(year)
      .update({
        [eventoPath]: fichaRegistro,
      })
      .then((docRef) => {
        console.log("Document written with ID: ");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }
}
