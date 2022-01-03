import { Item } from "./Item";

export class ComplexDropDown extends Item {
  constructor(questionType, questionText, optionsList, answersList) {
    
    super(questionType, questionText, optionsList, answersList);
  }

  async createContents(hasAnswers) {
    let selectedIndexValue = 0;
    let inputValue = "";

    let indexFinal = this.optionsList.length - 1;

    if (hasAnswers) {
      selectedIndexValue = this.answersList[0].valor;
      if (this.answersList[1]!= undefined) {
        inputValue = this.answersList[1].valor;
      }
    }
    let optionElements = [];

    let extraOptions = [];
    let select = this.generateSelect(this.optionsList[indexFinal].textoOpcion);

    for (let index = 0; index < this.optionsList.length; index++) {
      if (this.optionsList[index].tipoOpcion == "option") {
        let result = this.generateOptions(
          index,
          this.optionsList[index].textoOpcion,
          this.optionsList[index]
        );

        select.options[index] = result;
      }
    }
    select.selectedIndex = selectedIndexValue;
    this.htmlFormGroup.append(select);
    let dbInputDropwdown = this.findOptionType(this.optionsList, "input");
    let input = this.generateInput(
      dbInputDropwdown.textoOpcion,
      dbInputDropwdown.placeHolder,
      dbInputDropwdown
    );

    input.value = inputValue;

    extraOptions.push(input);

    this.htmlFormGroup.append(this.createExtra(extraOptions));
  }
}
