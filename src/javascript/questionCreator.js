import { ComplexDropDown } from "./Classes/ComplexDropDown";
import { ComplexRadioInput } from "./Classes/ComplexRadioInput";
import { LocationSelector } from "./Classes/LocationSelector";
import { SimpleCheckBox } from "./Classes/SimpleCheckBox";
import { SimpleTextArea } from "./Classes/SimpleTextArea";
import { SimpleTextInput } from "./Classes/SimpleTextInput";

export async function generateQuestions(cuestionario, respuestaId) {
  let allQuestionsArray = cuestionario.listaPreguntas.reverse();

  let answersArray =
    cuestionario.Respuestas[respuestaId].listaPreguntas.reverse();

  let optionsArray = [];
  for (const [index, question] of allQuestionsArray.entries()) {
    let currentAnswer = answersArray[index];

    optionsArray = question.listaOpciones;

    let item;

    switch (question.tipoPregunta) {
      case "simpleTextInput":
        {
          item = new SimpleTextInput(
            question.tipoPregunta,
            question.textoPregunta,
            optionsArray,
            currentAnswer.listaOpciones
          );

          item.createContents(true);
       
        }
        break;
      case "simpleTextArea":
        {
          item = new SimpleTextArea(
            question.tipoPregunta,
            question.textoPregunta,
            optionsArray,
            currentAnswer.listaOpciones
          );

          item.createContents(true);
        }
        break;
      case "complexDropDown":
        {
          item = new ComplexDropDown(
            question.tipoPregunta,
            question.textoPregunta,
            optionsArray,
            currentAnswer.listaOpciones
          );

          item.createContents(true);
        }
        break;

      case "complexRadioInput":
        {
          item = new ComplexRadioInput(
            question.tipoPregunta,
            question.textoPregunta,
            optionsArray,
            currentAnswer.listaOpciones
          );

          item.createContents(true);
        }
        break;
      case "simpleCheckbox":
        {
          item = new SimpleCheckBox(
            question.tipoPregunta,
            question.textoPregunta,
            optionsArray,
            currentAnswer.listaOpciones
          );

          item.createContents(true);
        }
        break;
      case "location":
        {
          item = new LocationSelector(
            question.tipoPregunta,
            question.textoPregunta,
            optionsArray,
            currentAnswer.listaOpciones
          );

          item.createContents(true);
        }
        break;
      default:
        break;
    }
    document.querySelector("#mainForm").prepend(item.htmlItem);

  }
}
