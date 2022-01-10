export class Opcion {
  _esDefault;
  _textoOpcion;
  _esRespuesta;
  _esCompleja;
  _tipoOpcion;
  _placeHolder;
  constructor(esDefault = false, textoOpcion, esRespuesta = false, esCompleja = false, tipoOpcion,placeHolder) {
    this._esDefault = esDefault;
    this._textoOpcion = textoOpcion;
    this._esRespuesta = esRespuesta;
    this._esCompleja = esCompleja;
    this._tipoOpcion = tipoOpcion;
    this._placeHolder = placeHolder
  }

  get esDefault() {
    return this._esDefault;
  }
  get textoOpcion() {
    return this._textoOpcion;
  }

  get esRespuesta() {
    return this._esRespuesta;
  }

  get esCompleja() {
    return this._esCompleja;
  }
  get tipoOpcion() {
    return this._tipoOpcion;
  }

  get placeHolder(){
    return this._placeHolder
  }

  set esDefault(esDefault){
    this._esDefault = esDefault
  }

  set textoOpcion(textoOpcion){
      this._textoOpcion = textoOpcion
  }

  set esRespuesta(esRespuesta){
      this._esRespuesta= esRespuesta
  }

  set esCompleja(esCompleja){
      this._esCompleja = esCompleja  
  }

  set tipoOpcion(tipoOpcion){
      this._tipoOpcion = tipoOpcion
  }

}
