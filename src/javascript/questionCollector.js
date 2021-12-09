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

    optionsArray.forEach((option) => {
      if (option.dataset.esrespuesta == "true") {
      
        let valor;

        switch (option.dataset.tipoopcion) {
          case "input":
            valor = option.value;
            break;
          case "checkbox":
            valor = option.checked;
            break;
          case "option":
            valor = option.value;
            break;
          case "textArea":
            valor = option.value
            break;
          case "radio":
            valor= option.checked
            break;
          default:
            break;
        }

        let opcion = {
          valor: valor,
          tipo: option.dataset.tipoopcion,
        };

        console.log(opcion)
        listaOpciones.push(opcion);
      }
    });

 
    listaPreguntas.push({
      textoPregunta: questionText,
      tipoPregunta: questionType,
      listaOpciones: listaOpciones,
    });
  });
  return listaPreguntas;
}
