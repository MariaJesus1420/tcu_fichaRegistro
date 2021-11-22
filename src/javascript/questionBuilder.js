import { v4 as uuidv4 } from "uuid";
import { LocationLogic } from "./classes/LocationLogic";
export function buildAllQuestions(cuestionario) {
  let allQuestionsArray = cuestionario.listaPreguntas.reverse();

  let optionsArray = [];

  allQuestionsArray.forEach((question) => {
    optionsArray = question.listaOpciones;
    let indexFinal = optionsArray.length - 1;
    let item = document.createElement("div");
    item.classList.add("item", "container");
    item.dataset.questiontype = question.tipoPregunta;

    let contents = document.createElement("div");
    contents.classList.add("contents", "row");
    let contents_data = document.createElement("div");
    contents_data.classList.add("contents-data");
    let form_group = document.createElement("div");
    form_group.classList.add("form-group");
    let titulo = document.createElement("label");
    titulo.innerText = question.textoPregunta;

    form_group.append(titulo);
    switch (question.tipoPregunta) {
      case "simpleTextInput":
        {
          let input = generateInput(
            optionsArray[indexFinal].textoOpcion,
            optionsArray[indexFinal].placeholder,
            optionsArray[indexFinal]
          );
          form_group.append(input);
        }
        break;
      case "simpleTextArea":
        {
          let textArea = generateTextArea(
            optionsArray[indexFinal].textoOpcion,
            optionsArray[indexFinal].placeholder,
            optionsArray[indexFinal]
          );
          form_group.append(textArea);
        }
        break;
      case "complexDropDown":
        {
          let extraOptions = [];
          let select = generateSelect(
            optionsArray[indexFinal].textoOpcion);

          for (let index = 0; index < optionsArray.length; index++) {
            if (optionsArray[index].tipoOpcion == "option") {
              let result = generateOptions(
                index,
                optionsArray[index].textoOpcion,
                optionsArray[index]
              );
              select.options[index] = result;
            }
          }
          form_group.append(select);
          let dbInputDropwdown = findOptionType(optionsArray, "input");
          let input = generateInput(
            dbInputDropwdown.textoOpcion,
            dbInputDropwdown.placeHolder,
            dbInputDropwdown
          );

          extraOptions.push(input);

          form_group.append(createExtra(extraOptions));
        }
        break;

      case "complexRadioInput":
        {
          let extraOptions = [];
          let radioOptions = findAllOptionTypes(optionsArray, "radio");
          let radioWrapper = document.createElement("div");
          radioWrapper.classList.add("custom-control", "custom-radio");
          form_group.append(radioWrapper);
          let groupName = uuidv4();
          let label;
          radioOptions.forEach((dbRadio) => {
            let radio = generateRadio(dbRadio);
            label = generateLabel(radio.id, dbRadio.textoOpcion);
            radio.name = groupName;
            radioWrapper.append(radio);
            radioWrapper.append(label);
            radioWrapper.append(document.createElement("br"));
          });
          let dbTextArea = findAllOptionTypes(optionsArray, "textArea");
          dbTextArea.forEach((option) => {
            let textArea = generateTextArea(
              option.textoOpcion,
              option.placeholder,
              option
            );
            extraOptions.push(textArea);
          });

          form_group.append(createExtra(extraOptions));
        }
        break;
      case "simpleCheckbox":
        {
          let label;
          let checkBoxWrapper = document.createElement("div");
          checkBoxWrapper.classList.add("form-check");

          optionsArray.forEach((dbCheckBox) => {
            console.log(dbCheckBox)
            let checkBox = generateCheckBox(dbCheckBox);
            label = generateLabel(checkBox.id, dbCheckBox.textoOpcion);
            checkBoxWrapper.append(checkBox);
            checkBoxWrapper.append(label);
            checkBoxWrapper.append(document.createElement("br"));
          });
          form_group.append(checkBoxWrapper);
        }
        break;
        case "location":
          {
            let selectProvincia = generateSelect(optionsArray[0])
            let selectCanton = generateSelect(optionsArray[1])
            let selectDistrito = generateSelect(optionsArray[2])
            let locationLogic = new LocationLogic();
            
            let locationWrapper = document.createElement("div")
            locationWrapper.classList.add("form-location")
            
            locationLogic.loadOptions(selectProvincia,selectCanton,selectDistrito)
            locationWrapper.append(selectProvincia)
            locationWrapper.append(selectCanton)
            locationWrapper.append(selectDistrito)
            form_group.append(locationWrapper)
          }
          break;
      default:
        break;
    }

    contents_data.append(form_group);
    contents.append(contents_data);
    item.append(contents);
    document.querySelector("#mainForm").prepend(item);
  });
}

const createExtra = (options) => {
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
const findAllOptionTypes = (optionArray, optionTypes) => {
  let result = [];
  optionArray.forEach((option) => {
    if (option.tipoOpcion == optionTypes) {
      result.push(option);
    }
  });
  return result;
};

const findOptionType = (optionArray, optionType) => {
  let result;
  optionArray.forEach((option) => {
    if (option.tipoOpcion == optionType) {
      result = option;
    }
  });
  return result;
};

const generateCheckBox = (dbCheckBox) => {
  let checkBox = document.createElement("input");
  setProperties(checkBox, dbCheckBox);
  checkBox.type = "checkbox";
  checkBox.id = uuidv4();
  checkBox.classList.add("form-check-input");
  checkBox.checked = dbCheckBox.esRespuesta;

  return checkBox;
};

const generateInput = (value, placeHolder, dbInput) => {
  let input = document.createElement("input");
  setProperties(input, dbInput);
  input.type = "text";
  input.required = true;
  input.placeholder = placeHolder;

  input.classList.add("form-control");
  input.value = value;

  return input;
};

const generateLabel = (id, text) => {
  let label = document.createElement("label");
  label.classList.add("custom-control-label");
  label.htmlFor = id;
  label.innerHTML = text;
  return label;
};

const generateRadio = (dbRadio) => {
  let radio = document.createElement("input");
  radio.type = "radio";
  setProperties(radio, dbRadio);
  radio.classList.add("custom-control-input");
  radio.id = uuidv4();
  return radio;
};

const generateSelect = (value) => {
  let select = document.createElement("select");
  select.required = true;
  select.classList.add("form-select");
  select.value = value;

  return select;
};

const generateOptions = (value, text, dbOption) => {
  let option = document.createElement("option");
  setProperties(option, dbOption);
  option.text = text;
  option.value = value;

  return option;
};
const generateTextArea = (value, placeHolder, dbTextArea) => {
  let textArea = document.createElement("textArea");
  setProperties(textArea, dbTextArea);
  textArea.required = true;
  textArea.placeholder = placeHolder;
  textArea.classList.add("form-control");
  textArea.value = value;
  //  textArea.disabled = true;
  textArea.rows = "3";
  return textArea;
};

const setProperties = (htmlElement, dbElement) => {
  htmlElement.dataset.esrepuesta = dbElement.esRespuesta;
  htmlElement.dataset.esdefault = dbElement.esDefault;
  htmlElement.dataset.escompleja = dbElement.esCompleja;
  htmlElement.dataset.tipoopcion = dbElement.tipoOpcion;
  htmlElement.dataset.textoopcion = dbElement.textoOpcion;
  htmlElement.dataset.placeholder = dbElement.placeholder;
};
