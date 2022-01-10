import { Item } from "./Item";

export class SimpleCheckBox extends Item {
  constructor(questionType, questionText, optionsList, answersList) {
    super(questionType, questionText, optionsList, answersList);
  }

  createContents(hasAnswers) {
    let label;
    let value = 0;
    let checkBoxWrapper = document.createElement("div");

    let disabled = true
    checkBoxWrapper.classList.add("form-check");
    if (hasAnswers) {
      value = this.answersList[0].valor;
    } else {
      disabled = false
    }
    let checkBoxElements = [];
    this.optionsList.forEach((dbCheckBox, index) => {
      let checkBox = this.generateCheckBox(dbCheckBox,disabled);

      label = this.generateLabel(checkBox.id, dbCheckBox.textoOpcion);

      checkBoxElements.push(checkBox);
      checkBoxWrapper.append(checkBox);
      checkBoxWrapper.append(label);
      checkBoxWrapper.append(document.createElement("br"));
    });

    if (hasAnswers) {
      this.answersList.forEach((opcion) => {
        if (opcion.tipo == "checkbox") {
          checkBoxElements[opcion.contador].checked = opcion.valor;
        }
      });
    }

    this.htmlQuestionContent.append(checkBoxWrapper);
  }
}
