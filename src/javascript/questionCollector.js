export async function collectAllQuestions() {
    let allQuestionsArray = document.querySelectorAll(".item");
    let allQuestionsOptions = [];
    let listaPreguntas = [];

    let questionType = "";
    let questionText = "";

    allQuestionsArray.forEach((question) => {
        allQuestionsOptions = question.querySelectorAll("[data-esrespuesta]");
        let indexFinal = allQuestionsOptions.length - 1

        questionType = question.dataset.questiontype;

        questionText = question.querySelector("label").innerText;

        let listaOpciones = [];
        switch (questionType) {
            case "complexDropDown":
                let esOtro = false;
                let selectTag = question.querySelector("select");


                for (let index = 0; index < allQuestionsOptions.length - 1; index++) {
                    listaOpciones.push({
                        texto: allQuestionsOptions[index].innerText,
                        esRespuesta: allQuestionsOptions[index].dataset.esrespuesta,
                    })

                }

                if (allQuestionsOptions[indexFinal - 1].dataset.esrespuesta == "true") {
                    //La respuesta es OTRO

                    listaOpciones.push({
                        texto: allQuestionsOptions[indexFinal].value,
                        esRespuesta: allQuestionsOptions[indexFinal].dataset.esrespuesta,
                        esRespuestaAlternativa: true,
                    });

                }


                break;
            case "simpleTextInput":
                listaOpciones.push({
                    texto: allQuestionsOptions[indexFinal].value,
                    esRespuesta: allQuestionsOptions[indexFinal].dataset.esrespuesta,
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