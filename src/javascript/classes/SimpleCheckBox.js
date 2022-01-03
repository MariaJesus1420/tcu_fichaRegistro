import { Item } from "./Item";

export class SimpleCheckBox extends Item {
  constructor(questionType, questionText, optionsList, answersList) {

    super(questionType, questionText, optionsList, answersList);
  }

  createContents(hasAnswers) {
    let label;
    let checkBoxWrapper = document.createElement("div");
    checkBoxWrapper.classList.add("form-check");

    let checkBoxElements = [];
    this.optionsList.forEach((dbCheckBox, index) => {
      let checkBox = this.generateCheckBox(dbCheckBox);

      label = this.generateLabel(checkBox.id, dbCheckBox.textoOpcion);

      checkBoxElements.push(checkBox);
      checkBoxWrapper.append(checkBox);
      checkBoxWrapper.append(label);
      checkBoxWrapper.append(document.createElement("br"));
    });

    this.answersList.forEach((opcion) => {
      if (opcion.tipo == "checkbox") {
        checkBoxElements[opcion.contador].checked = opcion.valor;
      }
    });
    this.htmlFormGroup.append(checkBoxWrapper);
  }
}