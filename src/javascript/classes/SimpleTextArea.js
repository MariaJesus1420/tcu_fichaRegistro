import { Item } from "./Item";

export class SimpleTextArea extends Item {
  constructor(questionType, questionText, optionsList, answersList) {
    console.log(answersList);
    super(questionType, questionText, optionsList, answersList);
  }

  createContents(hasAnswers) {
    let value = "";
    let disabled = true;
    if (hasAnswers) {
      value = this.answersList[0].valor;
    } else {
      disabled = false;
    }
    let textArea = this.generateTextArea(
      value,
      this.optionsList[0].placeholder,
      this.optionsList[0],
      disabled
    );
    this.htmlFormGroup.append(textArea);
  }
}
