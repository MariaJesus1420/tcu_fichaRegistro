export function buildAllQuestions(cuestionario) {
  let allQuestionsArray = cuestionario.listaPreguntas.reverse();
  
  let optionsArray = [];

  allQuestionsArray.forEach((question) => {
    optionsArray = question.listaOpciones;
    let indexFinal = optionsArray.length - 1
    let item = document.createElement("div");
    item.classList.add("item", "container");
    item.dataset.questiontype = question.tipoPregunta;
    
    let contents = document.createElement("div");
    contents.classList.add("contents", "row");
    let contents_data = document.createElement("div");
    contents_data.classList.add("contents-data");
    let form_group = document.createElement("div");
    form_group.classList.add("form-group");
    let titulo = document.createElement("label");
    titulo.innerText = question.textoPregunta;
    form_group.append(titulo);
    switch (question.tipoPregunta) {
      case "simpleTextInput":
      let input =generateInput(optionsArray[indexFinal].texto,"loca")
      form_group.append(input)
      break;
      case "simpleTextArea":
      let textArea = generateTextArea(optionsArray[indexFinal].texto,"textArea")  
      form_group.append(textArea)
      break;
      default:
        break;
    }


   
    contents_data.append(form_group);
    contents.append(contents_data);
    item.append(contents);
    document.querySelector("#mainForm").prepend(item);
  });
}

const generateInput =(value,placeHolder) =>{
  let input = document.createElement("input")
  input.type = "text";
  input.required = true
  input.placeholder = placeHolder
  input.classList.add("form-control")
  input.value = value
  input.disabled=  true

  return input
}


const generateTextArea =(value,placeHolder) =>{
  let textArea = document.createElement("textArea")

  textArea.required = true
  textArea.placeholder = placeHolder
  textArea.classList.add("form-control")
  textArea.value = value
  textArea.disabled=  true
  textArea.rows="3" 
  return textArea
}
