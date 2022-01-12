import { Item } from "./Item";
import { v4 as uuidv4 } from "uuid";
export class ComplexRadioInput extends Item {
  constructor(
    questionType,
    questionText,
    optionsList,
    answersList,
    isQuestionMaker
  ) {
    super(
      questionType,
      questionText,
      optionsList,
      answersList,
      isQuestionMaker
    );
  }

  generateSingleRadio(
    radioWrapper,
    dbRadio,
    disabled,
    optionElements,
    radioArea,
    groupName
  ) {
    let elementsWrapper = document.createElement("div");
    elementsWrapper.classList.add("elementsWrapper", "row", "g-0");

    let delButtonWrapper = document.createElement("div");
    delButtonWrapper.classList.add(
      "col-1",
      "complexRadioInputDelButtonWrapper"
    );
    let delButton = this.generateButtonWithIcon("btn-danger", [
      "bi",
      "bi-trash",
    ]);
    delButtonWrapper.append(delButton);
    delButton.addEventListener("click",()=>{
      delButton.parentElement.parentElement.remove()
    })
    let label;
    let radio = this.generateRadio(dbRadio, disabled);
    let inputRadio = this.generateInput("", "Texto de la opcion");
    inputRadio.htmlFor = radio.id;
    radio.name = groupName;
   
    if(this.isQuestionMaker){
      radioWrapper.append(inputRadio);
    }else{
      label = this.generateLabel(radio.id, dbRadio.textoOpcion);
      radioWrapper.append(radio);
      radioWrapper.append(label);

    }
 
   

    optionElements.push(radio);
    
  

    elementsWrapper.append(radioWrapper);
    if (this.isQuestionMaker) {
      elementsWrapper.append(delButtonWrapper);
    }
    radioArea.append(elementsWrapper);
  }

  generateRadioOptions(
    disabled,
    optionElements,
    radioArea,
    radioOptions,
    groupName
  ) {
    radioOptions.forEach((dbRadio, index) => {
      let radioWrapper = document.createElement("div");
      radioWrapper.classList.add("custom-control", "custom-radio", "col-11");
      this.generateSingleRadio(
        radioWrapper,
        dbRadio,
        disabled,
        optionElements,
        radioArea,
        groupName
      );
    });
  }

  async createContents(hasAnswers) {
    let extraOptions = [];
    let value = 0;
    let radioOptions = this.findAllOptionTypes(this.optionsList, "radio");
    let disabled = true;
    let optionElements = [];

    let inputArea = document.createElement("div");
    inputArea.classList.add("row", "g-0", "inputArea");

    let radioArea = document.createElement("div");
    radioArea.classList.add("row", "g-0", "radioArea");

    inputArea.append(radioArea);

    let groupName = uuidv4();

    let addButtonWrapper = document.createElement("div");
    addButtonWrapper.classList.add(
      "col-1",
      "complexRadioInputAddButtonWrapper"
    );

    let addButton = this.generateButtonWithIcon("btn-outline-success", [
      "bi",
      "bi-plus-lg",
    ]);

    addButton.addEventListener("click", () => {
      let radioWrapper = document.createElement("div");
      radioWrapper.classList.add( "col-11","custom-radio");
      this.generateSingleRadio(
        radioWrapper,
        null,
        disabled,
        optionElements,
        radioArea,
        groupName
      );
    });

    if (hasAnswers) {
      value = this.answersList[0].valor;
    } else {
      disabled = false;
    }

    this.generateRadioOptions(
      disabled,
      optionElements,
      radioArea,
      radioOptions,
      groupName
    );

    this.htmlQuestionContent.append(inputArea);

    let dbTextArea = this.findAllOptionTypes(this.optionsList, "textArea");
    dbTextArea.forEach((option) => {
      let textArea = this.generateTextArea(
        option.textoOpcion,
        option.placeholder,
        option,
        disabled
      );
      optionElements.push(textArea);
      extraOptions.push(textArea);
    });

    if (hasAnswers) {
      this.answersList.forEach((opcion) => {
        if (opcion.tipo == "radio") {
          optionElements[opcion.contador].checked = opcion.valor;
        } else {
          if (opcion.tipo == "textArea") {
            optionElements[opcion.contador].value = opcion.valor;
          }
        }
      });
    }

    if (this.isQuestionMaker) {
      addButtonWrapper.append(addButton);
      inputArea.prepend(addButtonWrapper);
    }

    this.htmlQuestionContent.append(this.createExtra(extraOptions));
  }
}
