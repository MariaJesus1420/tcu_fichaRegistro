import { Item } from "./Item";
import { Opcion } from "./Opcion";

export class SimpleCheckBox extends Item {
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

  generateSingleCheckbox(checkBoxWrapper, dbCheckBox, disabled,checkBoxElements,checkboxArea) {

    let elementsWrapper = document.createElement("div")
    elementsWrapper.classList.add("elementsWrapper","row","g-0")

    let delButtonWrapper = document.createElement("div");
    delButtonWrapper.classList.add("col-1","simpleCheckBoxDeleteButtonWrapper")
    let delButton = this.generateButtonWithIcon("btn-danger",["bi","bi-trash"])
    delButtonWrapper.append(delButton)
    delButton.addEventListener("click",()=>{
      let elementsCount = delButton.parentElement.parentElement.parentElement.querySelectorAll(".elementsWrapper")
      if(elementsCount.length > 1){
        delButton.parentElement.parentElement.remove()
      }
     
    })

    let checkBox = this.generateCheckBox(dbCheckBox, disabled);

    let opcion = new Opcion(
      false,
      "",
      false,
      false,
      "checkbox",
      "Texto de la opcion"
    );
    let inputCheck = this.generateInput("",opcion,disabled);
    inputCheck.htmlFor = checkBox.id;
   
    
    if (this.isQuestionMaker) {
      checkBoxWrapper.append(inputCheck);
    } else {
      let label = this.generateLabel(checkBox.id, dbCheckBox.textoOpcion);
      checkBoxWrapper.append(checkBox);
      checkBoxWrapper.append(label);
      
    }
    checkBoxElements.push(checkBox)
    
    elementsWrapper.append(checkBoxWrapper)
    if(this.isQuestionMaker){
      elementsWrapper.append(delButtonWrapper)
    }
    checkboxArea.append(elementsWrapper)
   
  }

  generateCheckboxOptions(disabled, checkBoxElements,checkboxArea) {

    let  checkBoxOptions = this.findAllOptionTypes(this.optionsList, "input");
    if(checkBoxOptions){
      checkBoxOptions = this.findAllOptionTypes(this.optionsList, "checkbox");
    }

    checkBoxOptions.forEach((dbCheckBox, index) => {
      let checkBoxWrapper = document.createElement("div");
      
      checkBoxWrapper.classList.add("form-check","col-11");
      if(this.isQuestionMaker){
        checkBoxWrapper.classList.add("form-check-maker");
      }
      this.generateSingleCheckbox(checkBoxWrapper,dbCheckBox,disabled,checkBoxElements,checkboxArea)

      
    });
  }

  createContents(hasAnswers) {
    let value = 0;

    let inputArea = document.createElement("div");
    inputArea.classList.add("row","g-0", "inputArea");

    let checkboxArea = document.createElement("div");
    checkboxArea.classList.add("row","g-0", "checkboxArea");
    
    inputArea.append(checkboxArea)
    

    let disabled = true;
   
    if (hasAnswers) {
      value = this.answersList[0].valor;
    } else {
      disabled = false;
    }
    let checkBoxElements = [];
    this.generateCheckboxOptions(disabled, checkBoxElements, checkboxArea);

    if (hasAnswers) {
      this.answersList.forEach((opcion) => {
        if (opcion.tipo == "checkbox") {
          checkBoxElements[opcion.contador].checked = opcion.valor;
        }
      });
    }

    let addButtonWrapper = document.createElement("div");
    addButtonWrapper.classList.add("col-1","simpleCheckBoxAddButtonWrapper");
    

    let addButton = this.generateButtonWithIcon("btn-outline-success", [
      "bi",
      "bi-plus-lg",
    ]);

    addButton.addEventListener("click",()=>{
      let checkBoxWrapper = document.createElement("div");
      checkBoxWrapper.classList.add("form-check","col-11","form-check-maker")
      this.generateSingleCheckbox(checkBoxWrapper,null,disabled,checkBoxElements,checkboxArea)

    })

    if(this.isQuestionMaker){
      addButtonWrapper.append(addButton);
      inputArea.prepend(addButtonWrapper);
    }


   
    this.htmlQuestionContent.append(inputArea);
  }
}
