export class Opcion {
  esDefault;
  textoOpcion;
  esRespuesta;
  esCompleja;
  tipoOpcion;
  placeHolder;
  constructor(esDefault = false, textoOpcion="", esRespuesta = false, esCompleja = false, tipoOpcion="",placeHolder="") {
    this.esDefault = esDefault;
    this.textoOpcion = textoOpcion;
    this.esRespuesta = esRespuesta;
    this.esCompleja = esCompleja;
    this.tipoOpcion = tipoOpcion;
    this.placeHolder = placeHolder
  }

  
}
