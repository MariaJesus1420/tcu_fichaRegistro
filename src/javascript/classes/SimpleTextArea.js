import { Item } from "./Item";

export class SimpleTextArea extends Item {
  constructor(questionType, questionText, optionsList, answersList) {
    console.log(answersList);
    super(questionType, questionText, optionsList, answersList);
  }

  createContents(hasAnswers) {
    let value = "";
    if (hasAnswers) {
      value = this.answersList[0].valor;
    }else{
      textArea.disabled=false;
    }
    let textArea = this.generateTextArea(
      value,
      this.optionsList[0].placeholder,
      this.optionsList[0]
    );
    this.htmlFormGroup.append(textArea);
  }
}
