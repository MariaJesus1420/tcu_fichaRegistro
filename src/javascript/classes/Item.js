import { v4 as uuidv4 } from "uuid";
export class Item {
  _htmlItem;
  _optionList;
  _answersList;

  htmlContents;
  htmlContents_Data;
  htmlFormGroup;
  constructor(questionType, questionText, optionsList,answersList) {
    this._optionList = optionsList;
    this._answersList = answersList;


    this._htmlItem = document.createElement("div");
    this._htmlItem.classList.add("item", "container");
    this._htmlItem.dataset.questiontype = questionType;

    this.htmlContents = document.createElement("div");
    this.htmlContents.classList.add("contents", "row");
    this.htmlContents_Data = document.createElement("div");
    this.htmlContents_Data.classList.add("contents-data");
    this.htmlFormGroup = document.createElement("div");
    this.htmlFormGroup.classList.add("form-group");
    let titulo = document.createElement("label");
    titulo.innerText = questionText;
    this.htmlFormGroup.append(titulo);
 
  }

 async createContents(hasAnswers) {}

  get htmlItem() {
    this.htmlContents_Data.append(this.htmlFormGroup);
    this.htmlContents.append(this.htmlContents_Data);
    this._htmlItem.append(this.htmlContents);
    return this._htmlItem;
  }

  get optionsList(){
    return this._optionList
  }

  get answersList(){
    return this._answersList
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

  generateCheckBox = (dbCheckBox) => {
    let checkBox = document.createElement("input");
    this.setProperties(checkBox, dbCheckBox);
    checkBox.type = "checkbox";
    checkBox.id = uuidv4();
    checkBox.classList.add("form-check-input");

    return checkBox;
  };

  generateInput = (value, placeHolder, dbInput) => {
    let input = document.createElement("input");
    this.setProperties(input, dbInput);
    input.type = "text";
    input.required = true;
    input.placeholder = placeHolder;

    input.classList.add("form-control");
    input.value = value;

    return input;
  };

  generateLabel = (id, text) => {
    let label = document.createElement("label");
    label.classList.add("custom-control-label");
    label.htmlFor = id;
    label.innerHTML = text;
    return label;
  };

  generateRadio = (dbRadio) => {
    let radio = document.createElement("input");
    radio.type = "radio";
    this.setProperties(radio, dbRadio);
    radio.classList.add("custom-control-input");
    radio.id = uuidv4();
    return radio;
  };

  generateSelect = (value) => {
    let select = document.createElement("select");
    select.required = true;
    select.classList.add("form-select");
    select.value = value;

    return select;
  };

  generateOptions = (value, text, dbOption) => {
    let option = document.createElement("option");
    this.setProperties(option, dbOption);
    option.text = text;
    option.value = value;

    return option;
  };
  generateTextArea = (value, placeHolder, dbTextArea) => {
    let textArea = document.createElement("textArea");
    this.setProperties(textArea, dbTextArea);
    textArea.required = true;
    textArea.placeholder = placeHolder;
    textArea.classList.add("form-control");
    textArea.value = value;
    //  textArea.disabled = true;
    textArea.rows = "3";
    return textArea;
  };

  setProperties = (htmlElement, dbElement) => {
    htmlElement.dataset.esrespuesta = dbElement.esRespuesta;
    htmlElement.dataset.esdefault = dbElement.esDefault;
    htmlElement.dataset.escompleja = dbElement.esCompleja;
    htmlElement.dataset.tipoopcion = dbElement.tipoOpcion;
    htmlElement.dataset.textoopcion = dbElement.textoOpcion;
    htmlElement.dataset.placeholder = dbElement.placeholder;
  };
}
