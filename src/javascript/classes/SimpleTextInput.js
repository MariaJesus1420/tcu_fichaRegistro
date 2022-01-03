import { Item } from "./Item";

export class SimpleTextInput extends Item {
  constructor(questionType, questionText, optionsList, answersList) {

    super(questionType, questionText, optionsList, answersList);
  }

 async createContents(hasAnswers) {
    let value= ""
    if(hasAnswers){
        value =this.answersList[0].valor
    }else{
      input.disabled=false;
    }
    let input = this.generateInput(
      value,
      this.optionsList[0].placeholder,
      this.optionsList[0]
    );
    this.htmlFormGroup.append(input);
  }
}
