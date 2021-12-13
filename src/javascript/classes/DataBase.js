export class DATABASE {
  db = firebase.firestore();
  constructor() {}

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


  async addAnwsers(cuestionario, id,respuestas) {
    let userAnswerPath = `Respuestas.${id}.listaPreguntas`
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
    let respuestaUser = `Respuestas.${id}`
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
    this.db.collection("Cuestionarios").add(
      cuestionario
  )
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

  async addFichaRegistro(eventoId,year, fichaRegistro,fichaRegistroId) {
    let eventoPath = `${eventoId}.fichasRegistro.${fichaRegistroId}`
    console.log(fichaRegistro)
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
      })
      
      
      
  }

  
}
