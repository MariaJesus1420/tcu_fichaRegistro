import { ComplexDropDown } from "./Classes/ComplexDropDown";
import { ComplexRadioInput } from "./Classes/ComplexRadioInput";
import { LocationSelector } from "./Classes/LocationSelector";
import { SimpleCheckBox } from "./Classes/SimpleCheckBox";
import { SimpleTextArea } from "./Classes/SimpleTextArea";
import { SimpleTextInput } from "./Classes/SimpleTextInput";

export async function generateQuestions(cuestionario, respuestaId) {
  let allQuestionsArray = cuestionario.listaPreguntas.reverse();
  let answersArray = [];
  if (respuestaId) {
    answersArray =
      cuestionario.Respuestas[respuestaId].listaPreguntas.reverse();
  }

  let optionsArray = [];
  let answersList = [];
  for (const [index, question] of allQuestionsArray.entries()) {
    let currentAnswer = answersArray[index];
    if (respuestaId) {
      answersList = currentAnswer.listaOpciones;
    }
    optionsArray = question.listaOpciones;

    let item;

    switch (question.tipoPregunta) {
      case "simpleTextInput":
        {
          item = new SimpleTextInput(
            question.tipoPregunta,
            question.textoPregunta,
            optionsArray,
            answersList
          );

          
        }
        break;
      case "simpleTextArea":
        {
          item = new SimpleTextArea(
            question.tipoPregunta,
            question.textoPregunta,
            optionsArray,
            answersList
          );

   
        }
        break;
      case "complexDropDown":
        {
          item = new ComplexDropDown(
            question.tipoPregunta,
            question.textoPregunta,
            optionsArray,
            answersList
          );

         
        }
        break;

      case "complexRadioInput":
        {
          item = new ComplexRadioInput(
            question.tipoPregunta,
            question.textoPregunta,
            optionsArray,
            answersList
          );

    
        }
        break;
      case "simpleCheckbox":
        {
          item = new SimpleCheckBox(
            question.tipoPregunta,
            question.textoPregunta,
            optionsArray,
            answersList
          );

        }
        break;
      case "location":
        {
          item = new LocationSelector(
            question.tipoPregunta,
            question.textoPregunta,
            optionsArray,
            answersList
          );

        }
        break;
      default:
        break;
    }
    item.createContents(respuestaId);
    item.generateItem()
    document.querySelector("#mainForm").prepend(item.htmlItem);
  }
}
