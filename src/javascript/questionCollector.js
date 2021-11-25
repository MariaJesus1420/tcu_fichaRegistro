import { Opcion } from "./classes/Opcion";
export async function collectAllQuestions() {
  let allQuestionsArray = document.querySelectorAll(".item");
  let optionsArray = [];
  let listaPreguntas = [];
  let listaOpciones = [];

  let questionType = "";
  let questionText = "";

  allQuestionsArray.forEach((question) => {
    optionsArray = question.querySelectorAll("[data-esrespuesta]");
    let indexFinal = optionsArray.length - 1;
    questionType = question.dataset.questiontype;
    questionText = question.querySelector("label").innerText;

   
    let opcion ={
      valor: "",
      tipo: ""
    }

    listaOpciones.push({

    })
    listaPreguntas.push({
      textoPregunta: questionText,
      tipoPregunta: questionType,
      listaOpciones: listaOpciones,
    });
  });
  return listaPreguntas;
}
