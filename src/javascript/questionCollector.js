
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

    if (questionType == "location") {
      console.log("location");
      let selectIds = ["provincias", "cantones", "distritos"];
      selectIds.forEach((id) => {
        let select = question.querySelector(`#${id}`);
        let opcion = {
          valor: select.value,
          tipo: "option",
        };
        listaOpciones.push(opcion);
      });
    } else {
      optionsArray.forEach((option,index) => {
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
              valor = option.value;
              break;
            case "radio":
              valor = option.checked;
              
              break;
            default:
              break;
          }

          let opcion = {
            valor: valor,
            tipo: option.dataset.tipoopcion,
            contador: index
          };

          listaOpciones.push(opcion);
        }
      });
    }

    listaPreguntas.push({
      textoPregunta: questionText,
      tipoPregunta: questionType,
      listaOpciones: listaOpciones,
    });
    listaOpciones = [];
  });
  console.log(listaPreguntas);
  return listaPreguntas;
}
