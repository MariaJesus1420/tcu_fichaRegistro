import { v4 as uuidv4 } from "uuid";
import { LocationLogic } from "./Classes/LocationLogic";
export async function buildAllQuestions(
  cuestionario,
  answerId,
  isQuestionBuilder
) {
  let allQuestionsArray = cuestionario.listaPreguntas.reverse();

  let answersArray = cuestionario.Respuestas[answerId].listaPreguntas.reverse();

  console.log("questiosn are ", allQuestionsArray);
  console.log("answers are", answersArray);
  let optionsArray = [];

  for (const [index, question] of allQuestionsArray.entries()) {
    let currentAnswer = answersArray[index];

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
            currentAnswer.listaOpciones[0].valor,
            optionsArray[indexFinal].placeholder,
            optionsArray[indexFinal]
          );
          form_group.append(input);
        }
        break;
      case "simpleTextArea":
        {
          let textArea = generateTextArea(
            currentAnswer.listaOpciones[0].valor,
            optionsArray[indexFinal].placeholder,
            optionsArray[indexFinal]
          );
          form_group.append(textArea);
        }
        break;
      case "complexDropDown":
        {
          let optionElements = [];

          let extraOptions = [];
          let select = generateSelect(optionsArray[indexFinal].textoOpcion);

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
          select.selectedIndex = currentAnswer.listaOpciones[0].valor;
          form_group.append(select);
          let dbInputDropwdown = findOptionType(optionsArray, "input");
          let input = generateInput(
            dbInputDropwdown.textoOpcion,
            dbInputDropwdown.placeHolder,
            dbInputDropwdown
          );
          if (currentAnswer.listaOpciones[1] != undefined) {
            input.value = currentAnswer.listaOpciones[1].valor;
          }
          extraOptions.push(input);

          form_group.append(createExtra(extraOptions));
        }
        break;

      case "complexRadioInput":
        {
          let extraOptions = [];
          let radioOptions = findAllOptionTypes(optionsArray, "radio");

          let optionElements = [];

          let radioWrapper = document.createElement("div");
          radioWrapper.classList.add("custom-control", "custom-radio");
          form_group.append(radioWrapper);
          let groupName = uuidv4();
          let label;

          radioOptions.forEach((dbRadio, index) => {
            let radio = generateRadio(dbRadio);

            label = generateLabel(radio.id, dbRadio.textoOpcion);
            radio.name = groupName;

            optionElements.push(radio);
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
            optionElements.push(textArea);
            extraOptions.push(textArea);
          });

          currentAnswer.listaOpciones.forEach((opcion) => {
            if (opcion.tipo == "radio") {
              optionElements[opcion.contador].checked = opcion.valor;
            } else {
              if (opcion.tipo == "textArea") {
                optionElements[opcion.contador].value = opcion.valor;
              }
            }
          });
          form_group.append(createExtra(extraOptions));
        }
        break;
      case "simpleCheckbox":
        {
          let label;
          let checkBoxWrapper = document.createElement("div");
          checkBoxWrapper.classList.add("form-check");

          let checkBoxElements = [];
          optionsArray.forEach((dbCheckBox, index) => {
            let checkBox = generateCheckBox(dbCheckBox);

            label = generateLabel(checkBox.id, dbCheckBox.textoOpcion);

            checkBoxElements.push(checkBox);
            checkBoxWrapper.append(checkBox);
            checkBoxWrapper.append(label);
            checkBoxWrapper.append(document.createElement("br"));
          });

          currentAnswer.listaOpciones.forEach((opcion) => {
            if (opcion.tipo == "checkbox") {
              checkBoxElements[opcion.contador].checked = opcion.valor;
            }
          });
          form_group.append(checkBoxWrapper);
        }
        break;
      case "location":
        {
          let selectProvincia = generateSelect(optionsArray[0]);
          let selectCanton = generateSelect(optionsArray[1]);
          let selectDistrito = generateSelect(optionsArray[2]);

          selectProvincia.id = "provincias";
          selectCanton.id = "cantones";
          selectDistrito.id = "distritos";
          let locationLogic = new LocationLogic();

          let locationWrapper = document.createElement("div");
          locationWrapper.classList.add("form-location");

          await locationLogic.loadOptions(
            selectProvincia,
            selectCanton,
            selectDistrito
          );
          selectProvincia.value = currentAnswer.listaOpciones[0].valor;

          await locationLogic.selectProvinciasFunction(
            selectProvincia.value,
            selectCanton
          );

          selectCanton.value = currentAnswer.listaOpciones[1].valor;

          await locationLogic.selectCantonesFunction(
            selectCanton.value,
            selectDistrito
          );

          console.log("Updated select canton");
          selectDistrito.value = currentAnswer.listaOpciones[2].valor;

          console.log(selectCanton.value);
          locationWrapper.append(selectProvincia);
          locationWrapper.append(selectCanton);
          locationWrapper.append(selectDistrito);
          form_group.append(locationWrapper);
        }
        break;
      default:
        break;
    }

    contents_data.append(form_group);
    contents.append(contents_data);
    item.append(contents);
    document.querySelector("#mainForm").prepend(item);
  }
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
  htmlElement.dataset.esrespuesta = dbElement.esRespuesta;
  htmlElement.dataset.esdefault = dbElement.esDefault;
  htmlElement.dataset.escompleja = dbElement.esCompleja;
  htmlElement.dataset.tipoopcion = dbElement.tipoOpcion;
  htmlElement.dataset.textoopcion = dbElement.textoOpcion;
  htmlElement.dataset.placeholder = dbElement.placeholder;
};
