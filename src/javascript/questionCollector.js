export async function collectAllQuestions() {
  let allQuestionsArray = document.querySelectorAll(".item");
  let listaPreguntas = [];
  
  let questionType = "";
  let questionText =""
  allQuestionsArray.forEach((question) => {
    questionType = question.dataset.questiontype;
    questionText = question.querySelector("label").innerText
  
    let listaOpciones = [];
    switch (questionType) {
      case "complexDropDown":
        let selectTag = question.querySelector("select");
        let optionsTags = selectTag.querySelectorAll("option");
        optionsTags.forEach((option) => {
            
          listaOpciones.push({
              texto : option.innerText,
              esRespuesta: option.dataset.esrespuesta
          })
        });
        console.log(listaOpciones);
        break;

      default:
        break;
    }

    listaPreguntas.push({
        textoPregunta:questionText,
        tipoPregunta: questionType,
        listaOpciones: listaOpciones
    })
    console.log(listaPreguntas);
  });
}
