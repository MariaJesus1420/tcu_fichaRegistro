export class Pregunta{
    _textoPregunta;
    _tipoPregunta;
    _listaDeOpciones;
    
    constructor(textoPregunta,tipoPregunta,listaDeOpciones){
        this._textoPregunta =textoPregunta
        this._tipoPregunta = tipoPregunta
        this._listaDeOpciones = listaDeOpciones

    }

    get textoPregunta(){
        return this._textoPregunta
    }

    get tipoPregunta (){
        return this._tipoPregunta
    }

    get listaDeOpciones (){
        return this._listaDeOpciones
    }

    set textoPregunta(textoPregunta){
        this._textoPregunta = textoPregunta
    }

    set tipoPregunta(tipoPregunta){
        this._tipoPregunta = tipoPregunta
    }

    set listaDeOpciones(listaDeOpciones){
        this._listaDeOpciones = listaDeOpciones
    }
}