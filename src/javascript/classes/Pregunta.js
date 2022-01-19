export class Pregunta{
    textoPregunta;
    tipoPregunta;
    listaOpciones;
    
    constructor(textoPregunta,tipoPregunta,listaOpciones){
        this.textoPregunta =textoPregunta
        this.tipoPregunta = tipoPregunta
        this.listaOpciones = listaOpciones

    }

    opcionesDb(){
        let listaOpciones =[]
        this.listaOpciones.forEach(element => {
            listaOpciones.push({
                esDefault : element.esDefault,
                textoOpcion :element.textoOpcion,
                esRespuesta :element.esRespuesta ,
                esCompleja : element.esCompleja,
                tipoOpcion : element.tipoOpcion,
                placeHolder : element.placeHolder,
            })
        });

        return listaOpciones
    }

}