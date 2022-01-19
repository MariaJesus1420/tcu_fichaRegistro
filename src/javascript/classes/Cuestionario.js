export class Cuestionario{

    titulo;
    descripcion;
    listaPreguntas;


    constructor(listaPreguntas, titulo, descripcion){
        this.listaPreguntas = listaPreguntas
        this.titulo=titulo;
        this.descripcion=descripcion
    } 

    preguntasDb() {
        let listaPreguntas = [];
        this.listaPreguntas.forEach((element) => {
          listaPreguntas.push({
            textoPregunta: element.textoPregunta,
            tipoPregunta: element.tipoPregunta,
            listaOpciones: element.opcionesDb(),
          });
        });
        return listaPreguntas;
      }
}
