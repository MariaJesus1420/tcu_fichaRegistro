export async function collectAllQuestions() {
    let allQuestionsArray = document.querySelectorAll(".item");
    let allOptionsArray = [];
    let listaPreguntas = [];

    let questionType = "";
    let questionText = "";

    allQuestionsArray.forEach((question) => {
        allOptionsArray = question.querySelectorAll("[data-esrespuesta]");
        let indexFinal = allOptionsArray.length - 1

        questionType = question.dataset.questiontype;

        questionText = question.querySelector("label").innerText;

        let listaOpciones = [];
        switch (questionType) {
            case "complexDropDown":
                let esOtro = false;
                let selectTag = question.querySelector("select");


                for (let index = 0; index < allOptionsArray.length - 1; index++) {
                    listaOpciones.push({
                        texto: allOptionsArray[index].innerText,
                        esRespuesta: allOptionsArray[index].dataset.esrespuesta,
                    })

                }

                if (allOptionsArray[indexFinal - 1].dataset.esrespuesta == "true") {
                    //La respuesta es OTRO

                    listaOpciones.push({
                        texto: allOptionsArray[indexFinal].value,
                        esRespuesta: allOptionsArray[indexFinal].dataset.esrespuesta,
                        esRespuestaAlternativa: true,
                    });

                }


                break;
            case "simpleTextInput":
                let inputElement = question.querySelector("input");

                listaOpciones.push({
                    texto: inputElement.value,
                    esRespuesta: inputElement.dataset.esrespuesta,
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
    console.log(listaPreguntas);
}