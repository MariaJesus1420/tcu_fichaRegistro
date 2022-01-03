import { Item } from "./Item";
import { v4 as uuidv4 } from "uuid";
export class ComplexRadioInput extends Item {
  constructor(questionType, questionText, optionsList, answersList) {
    console.log(answersList);
    super(questionType, questionText, optionsList, answersList);
  }

  async createContents(hasAnswers) {
    let extraOptions = [];
    let value = 0;
    let radioOptions = this.findAllOptionTypes(this.optionsList, "radio");
    let disabled = true;
    let optionElements = [];
    if (hasAnswers) {
      value = this.answersList[0].valor;
    } else {
      disabled = false;
    }
    let radioWrapper = document.createElement("div");
    radioWrapper.classList.add("custom-control", "custom-radio");
    this.htmlFormGroup.append(radioWrapper);
    let groupName = uuidv4();
    let label;

    radioOptions.forEach((dbRadio, index) => {
      let radio = this.generateRadio(dbRadio, disabled);

      label = this.generateLabel(radio.id, dbRadio.textoOpcion);
      radio.name = groupName;

      optionElements.push(radio);
      radioWrapper.append(radio);
      radioWrapper.append(label);
      radioWrapper.append(document.createElement("br"));
    });
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

    this.htmlFormGroup.append(this.createExtra(extraOptions));
  }
}
