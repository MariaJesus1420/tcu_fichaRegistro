export async function collectAllQuestions() {
  let allQuestionsArray = document.querySelectorAll(".item");
  let optionsArray = [];
  let listaPreguntas = [];

  let questionType = "";
  let questionText = "";

  allQuestionsArray.forEach((question) => {
    optionsArray = question.querySelectorAll("[data-esrespuesta]");
    let indexFinal = optionsArray.length - 1;

    questionType = question.dataset.questiontype;

    questionText = question.querySelector("label").innerText;

    let listaOpciones = [];
    switch (questionType) {
      case "complexDropDown":
        for (let index = 0; index < optionsArray.length - 1; index++) {
          listaOpciones.push({
            texto: optionsArray[index].innerText,
            esRespuesta: optionsArray[index].dataset.esrespuesta,
          });
        }

        if (optionsArray[indexFinal - 1].dataset.esrespuesta == "true") {
          //La respuesta es OTRO

          listaOpciones.push({
            texto: optionsArray[indexFinal].value,
            esRespuesta: optionsArray[indexFinal].dataset.esrespuesta,
            esRespuestaAlternativa: true,
          });
        }

        break;
      case "simpleTextInput":
        listaOpciones.push({
          texto: optionsArray[indexFinal].value,
          esRespuesta: optionsArray[indexFinal].dataset.esrespuesta,
          textoPregunta: questionText,
        });

        break;
      case "simpleTextArea":
        listaOpciones.push({
            texto: optionsArray[indexFinal].value,
            esRespuesta: optionsArray[indexFinal].dataset.esrespuesta,
            textoPregunta: questionText,
          });
        break;
      default:
        break;
    }

    listaPreguntas.push({
      textoPregunta: questionText,
      tipoPregunta: questionType,
      listaOpciones: listaOpciones,
    });
  });
  return listaPreguntas;
}
