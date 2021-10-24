export async function collectAllQuestions() {
  let allQuestionsArray = document.querySelectorAll(".item");
  let listaPreguntas = [];

  let questionType = "";
  let questionText = "";
  allQuestionsArray.forEach((question) => {
    questionType = question.dataset.questiontype;

    questionText = question.querySelector("label").innerText;

    let listaOpciones = [];
    switch (questionType) {
      case "complexDropDown":
        let selectTag = question.querySelector("select");
        let optionsTags = selectTag.querySelectorAll("option");
        optionsTags.forEach((option) => {
          if (
            option.dataset.esrespuesta == "true" &&
            option.innerText == "Otro"
          ) {

            let  respuestaAlternativaTexto =question.querySelector("input").value
            listaOpciones.push({
              texto: respuestaAlternativaTexto,
              esRespuesta: option.dataset.esrespuesta,
              esRespuestaAlternativa: true,
            });
          } else {
            listaOpciones.push({
              texto: option.innerText,
              esRespuesta: option.dataset.esrespuesta,
            });
          }
        });

        break;
        case "SimpleTextInput":
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
  console.log(listaPreguntas);
}
