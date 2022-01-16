import { Item } from "./Item";
import { Opcion } from "./Opcion";

export class ComplexDropDown extends Item {
  constructor(
    questionType,
    questionText,
    optionsList,
    answersList,
    isQuestionmaker
  ) {
    super(
      questionType,
      questionText,
      optionsList,
      answersList,
      isQuestionmaker
    );
  }

  questionMaker(selectWrapper, select) {
    if (this.isQuestionMaker) {
      let optionInputWrapper = document.createElement("div");
      optionInputWrapper.classList.add("col-md-10", "optionInputWrapper");

      let optionInput = this.generateInput("", undefined,false,"Texto de la opcion");
      optionInputWrapper.append(optionInput);

      let buttonsWrapper = document.createElement("div");
      buttonsWrapper.classList.add("buttonsWrapper");

      let saveButton = document.createElement("button");
      saveButton.classList.add("btn", "btn-success");
      let saveButtonIcon = document.createElement("i");
      saveButtonIcon.classList.add("fas", "fa-check");
      saveButton.append(saveButtonIcon);

      saveButton.addEventListener("click",()=>{
        let newValue = optionInput.value
        select.options[select.selectedIndex].text=newValue
      })

      select.addEventListener("change",()=>{
        optionInput.value = select.options[select.selectedIndex].text
      })
      buttonsWrapper.append(saveButton);

      let selectColWrapper = document.createElement("div");
      selectColWrapper.classList.add("col-md-10", "selectColWrapper");

      optionInputWrapper.append(buttonsWrapper);
      selectWrapper.prepend(optionInputWrapper);

      selectColWrapper.append(select);

      selectWrapper.append(selectColWrapper);

      let newDeleteButtonsWrapper = document.createElement("div");

      newDeleteButtonsWrapper.classList.add(
        "col-md-2",
        "newDeleteButtonsWrapper"
      );

      let deleteButton = this.generateButtonWithIcon("btn-outline-danger", [
        "bi",
        "bi-trash",
      ]);
      let addButton = this.generateButtonWithIcon("btn-outline-success", [
        "bi",
        "bi-plus-lg",
      ]);

      deleteButton.addEventListener("click", () => {
        select.options[select.selectedIndex].remove();
        select.dispatchEvent(new Event("change"));
      });
      addButton.addEventListener("click", () => {
        let option1 = new Opcion(false, "", false, false, "option", "Opcion 1");
        let index = select.options.length;
        let result = this.generateOptions(
          index,
          `Opcion ${index + 1}`,
          option1
        );

        select.options[index] = result;
        select.selectedIndex= index
        select.dispatchEvent(new Event("change"));
      });
      newDeleteButtonsWrapper.append(addButton, deleteButton);
      selectWrapper.append(newDeleteButtonsWrapper);
    } else {
      selectWrapper.append(select);
    }

    return selectWrapper;
  }

  async createContents(hasAnswers) {
    let selectedIndexValue = 0;
    let inputValue = "";
    let disabled = true;
    let indexFinal = this.optionsList.length - 1;

    if (hasAnswers) {
      selectedIndexValue = this.answersList[0].valor;
      if (this.answersList[1] != undefined) {
        inputValue = this.answersList[1].valor;
      }
    } else {
      disabled = false;
    }
    let optionElements = [];

    let extraOptions = [];
    let select = this.generateSelect(
      this.optionsList[indexFinal].textoOpcion,
      disabled
    );

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

    let selectWrapper = document.createElement("div");
    selectWrapper.classList.add("inputArea", "row", "g-0");
    selectWrapper.id = "inputArea";

    selectWrapper = this.questionMaker(selectWrapper, select);
    this.htmlQuestionContent.append(selectWrapper);
  }
}
