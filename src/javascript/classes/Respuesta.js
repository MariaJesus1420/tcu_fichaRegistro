import { DATABASE } from "./classes/DataBase";

export class Respuesta {

userId;
listaPreguntas;
listaRespuestas;
allAnswerArray = document.querySelectorAll(".form-group");



constructor(userId,listaDePreguntas,listaRespuestas){
    this.userId=userId
    this.listaDePreguntas = listaDePreguntas
    this.listaRespuestas=listaRespuestas
} 


opcion ={
    valor: "",
    tipo: ""
  }
  
}

allAnswerArray.forEach((answer) => {
    questionText = question.querySelector("input").innerText;
})