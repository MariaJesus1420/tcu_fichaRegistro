import { v4 as uuidv4 } from "uuid";
import { Opcion } from "./Opcion";
export class Item {
  _htmlItem;
  _optionList;
  _answersList;

  htmlContents;
  htmlContents_Data;
  htmlFormGroup;

  _questionType;
  _htmlQuestionContent;
  _isQuestionMaker;

  constructor(
    questionType,
    questionText,
    optionsList,
    answersList,
    isQuestionMaker
  ) {
    this._isQuestionMaker = isQuestionMaker;
    this._optionList = optionsList;
    this._answersList = answersList;
    this._questionType = questionType;
    this._htmlItem = document.createElement("div");
    this._htmlItem.classList.add("item", "container");
    this._htmlItem.dataset.questiontype = questionType;
    let titulo;

    titulo = this.titleMaker(isQuestionMaker, questionText);
    this.htmlQuestionContent = document.createElement("div");
    this.htmlQuestionContent.classList.add("form-group", "questionContent");
    this.htmlQuestionContent.append(titulo);
    this.htmlContents = document.createElement("div");
    this.htmlContents.classList.add("contents", "row");
    this.htmlContents_Data = document.createElement("div");
    this.htmlContents_Data.classList.add("contents-data");
    this.htmlFormGroup = document.createElement("div");
    this.htmlFormGroup.classList.add("form-group","text-wrap");

    this.htmlFormGroup.append();
  }

  async createContents(hasAnswers) {}

  titleMaker(isQuestionMaker, questionText) {
    let titulo;
    if (isQuestionMaker) {
      titulo = this.generateInput("", undefined, false, questionText);
      titulo.classList.add("tituloInput");
    } else {
      titulo = document.createElement("label");
      titulo.classList.add("text-break")
      titulo.innerText = questionText;
    }

    return titulo;
  }

  get isQuestionMaker() {
    return this._isQuestionMaker;
  }

  set htmlQuestionContent(htmlQuestionContent) {
    this._htmlQuestionContent = htmlQuestionContent;
  }

  get htmlQuestionContent() {
    return this._htmlQuestionContent;
  }

  get questionType() {
    return this._questionType;
  }

  set questionType(questionType) {
    this._questionType = questionType;
  }

  generateItem() {
    this.htmlFormGroup.append(this.htmlQuestionContent);
    this.htmlContents_Data.append(this.htmlFormGroup);
    this.htmlContents.append(this.htmlContents_Data);
    this._htmlItem.append(this.htmlContents);
    let moveQuestionButton = document.createElement("div");
    let icon = document.createElement("span");
    icon.classList.add("fas", "fa-arrows-alt", "fa-lg", "my-handle");
    moveQuestionButton.append(icon);
    moveQuestionButton.classList.add("col-1");

    moveQuestionButton.classList.add("my-handle");
    if(this.isQuestionMaker){
      this.htmlContents.prepend(moveQuestionButton);
    }
   
  }

  get htmlItem() {
    return this._htmlItem;
  }

  itemQuestionMaker() {
    let questionSelector = this.generateSelect("", false);
    questionSelector.classList.add("questionSelector");
    let deleteQuestionButton = this.generateButtonWithIcon("btn-danger", [
      "bi",
      "bi-trash",
    ]);

    deleteQuestionButton.addEventListener("click", () => {
      deleteQuestionButton.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
    });
    this.generateSelectOptions(questionSelector);
    let selectorWrapper = document.createElement("div");
    selectorWrapper.classList.add("selectorWrapper");
    selectorWrapper.append(questionSelector);
    selectorWrapper.append(deleteQuestionButton);

    this.htmlFormGroup.prepend(selectorWrapper);
    return questionSelector;
  }

  generateButtonWithIcon(boostrapClassColor, iconClass) {
    let button = document.createElement("button");
    button.classList.add("btn", boostrapClassColor);
    button.type = "button";
    let buttonIcon = document.createElement("i");
    iconClass.forEach((element) => {
      buttonIcon.classList.add(element);
    });

    button.append(buttonIcon);
    return button;
  }

  generateSelectOptions(select) {
    let questionTypesList = {
      simpleTextInput: "Texto corto",
      simpleCheckbox: "Selección Múliple",
      complexRadioInput: "Selección Única",
      location: "Ubicación",
      simpleTextArea: "Texto largo",
      complexDropDown: "Lista desplegable",
    };

    let opList = [];
    for (var key in questionTypesList) {
      let opt = document.createElement("option");
      opt.value = key;
      opt.innerHTML = questionTypesList[key];
      opList.push(opt);
    }

    opList.forEach((option, index) => {
      select.options[index] = option;
    });
    return opList;
  }

  get optionsList() {
    return this._optionList;
  }

  get answersList() {
    return this._answersList;
  }

  createExtra = (options) => {
    let extraDiv = document.createElement("div");
    extraDiv.classList.add("extra");
    options = options.reverse();
    let optionsWrapper = document.createElement("div");
    optionsWrapper.classList.add("form-group");

    options.forEach((option) => {
      option.classList.add("extra-element");
      optionsWrapper.prepend(option);
    });

    extraDiv.append(optionsWrapper);
    return extraDiv;
  };
  findAllOptionTypes = (optionArray, optionTypes) => {
    let result = [];
    optionArray.forEach((option) => {
      if (option.tipoOpcion == optionTypes) {
        result.push(option);
      }
    });
    return result;
  };

  findOptionType = (optionArray, optionType) => {
    let result;
    optionArray.forEach((option) => {
      if (option.tipoOpcion == optionType) {
        result = option;
      }
    });
    return result;
  };

  generateCheckBox = (dbCheckBox, disabled) => {
    let checkBox = document.createElement("input");
    this.setProperties(checkBox, dbCheckBox);
    checkBox.type = "checkbox";
    checkBox.id = uuidv4();
    checkBox.classList.add("form-check-input");
    checkBox.disabled = disabled;
    return checkBox;
  };

  generateInput = (value, dbInput, disabled, placeholder) => {
    let input = document.createElement("input");
    if (dbInput) {
      this.setProperties(input, dbInput);
      input.placeholder = dbInput.placeHolder;
    } else {
      input.placeholder = placeholder;
    }

    input.type = "text";
    input.required = true;

    input.disabled = disabled;
    input.classList.add("form-control");
    input.value = value;

    return input;
  };

  generateLabel = (id, text) => {
    let label = document.createElement("label");
    label.classList.add("custom-control-label","text-break");
    label.htmlFor = id;
    label.innerHTML = text;
    label.disabled = true;
    return label;
  };

  generateRadio = (dbRadio, disabled) => {
    let radio = document.createElement("input");
    radio.type = "radio";
    this.setProperties(radio, dbRadio);
    radio.classList.add("form-check-input");
    radio.id = uuidv4();
    radio.disabled = disabled;
    return radio;
  };

  generateSelect = (value, disabled) => {
    let select = document.createElement("select");
    select.required = true;
    select.classList.add("form-select");
    select.value = value;
    select.disabled = disabled;
    return select;
  };

  generateOptions = (value, text, dbOption) => {
    let option = document.createElement("option");
    this.setProperties(option, dbOption);
    option.text = text;
    option.value = value;

    return option;
  };
  generateTextArea = (value, placeHolder, dbTextArea, disabled) => {
    let textArea = document.createElement("textArea");
    this.setProperties(textArea, dbTextArea);
    textArea.required = true;
    textArea.placeholder = placeHolder;
    textArea.classList.add("form-control");
    textArea.value = value;
    textArea.disabled = disabled;
    textArea.rows = "3";
    return textArea;
  };

  setProperties = (htmlElement, dbElement) => {
    if (dbElement) {
      htmlElement.dataset.esrespuesta = dbElement.esRespuesta;
      htmlElement.dataset.esdefault = dbElement.esDefault;
      htmlElement.dataset.escompleja = dbElement.esCompleja;
      htmlElement.dataset.tipoopcion = dbElement.tipoOpcion;
      htmlElement.dataset.textoopcion = dbElement.textoOpcion;
      htmlElement.dataset.placeholder = dbElement.placeholder;
    }
  };
}
