import "../css/home.css";
import "../css/questionMaker.css";

import { SimpleTextInput } from "./Classes/SimpleTextInput";
import { Opcion } from "./Classes/Opcion";
import { LocationSelector } from "./Classes/LocationSelector";
import { SimpleTextArea } from "./Classes/SimpleTextArea";
import { ComplexDropDown } from "./Classes/ComplexDropDown";
import { SimpleCheckBox } from "./Classes/SimpleCheckBox";
import { ComplexRadioInput } from "./Classes/ComplexRadioInput";
import Sortable from "sortablejs";

export const QUESTIONMAKER = {
  init: async () => {
    let container = document.getElementById("itemsContainer");
    let sortable = Sortable.create(container, {
      ghostClass: 'ghost',
      handle: ".my-handle"
    });

    $("#btnAgregarPregunta").click(async () => {
      let optionList = [];
      let opcion1 = new Opcion(
        false,
        "",
        false,
        false,
        "input",
        "Esto es el pisapapeles para la respuesta"
      );

      let opcion2 = new Opcion(
        false,
        "",
        false,
        false,
        "checkbox",
        "Esto es el pisapapeles para la respuesta"
      );

      let opcion3 = new Opcion(
        false,
        "",
        false,
        false,
        "radio",
        "Esto es el pisapapeles para la respuesta"
      );
      optionList.push(opcion1);
      optionList.push(opcion2);
      optionList.push(opcion3);
      let item = new SimpleTextInput(
        "simpleTextInput",
        "Titulo de la pregunta",
        optionList,
        [],
        true
      );

      item.createContents();
      item.generateItem();
      let questionSelector = item.itemQuestionMaker();
      questionSelector.addEventListener("change", async (e) => {
        let newItem;

        switch (e.target.value) {
          case "simpleTextInput":
            {
              newItem = new SimpleTextInput(
                "simpleTextInput",
                "Titulo de la pregunta",
                optionList,
                [],
                true
              );
            }
            break;
          case "simpleTextArea":
            {
              newItem = new SimpleTextArea(
                "simpleTextInput",
                "Titulo de la pregunta",
                optionList,
                [],
                true
              );
            }
            break;
          case "complexDropDown":
            {
              let option1 = new Opcion(
                false,
                "Opcion 1",
                false,
                false,
                "option",
                "Opcion 1"
              );

              let option2 = new Opcion(
                false,
                "Opcion 2",
                false,
                true,
                "option",
                "Opcion 2"
              );

              let newOptionList = [];
              newOptionList.push(option1);
              newOptionList.push(option2);

              newItem = new ComplexDropDown(
                "complexDropDown",
                "Titulo de la pregunta",
                newOptionList,
                [],
                true
              );
            }
            break;

          case "complexRadioInput":
            {
              newItem = new ComplexRadioInput(
                "simpleCheckBox",
                "Titulo de la pregunta",
                optionList,
                [],
                true
              );
            }
            break;
          case "simpleCheckBox":
            {
              newItem = new SimpleCheckBox(
                "simpleCheckBox",
                "Titulo de la pregunta",
                optionList,
                [],
                true
              );
            }
            break;
          case "location":
            {
              newItem = new LocationSelector(
                "location",
                "Titulo de la pregunta",
                optionList,
                [],
                true
              );
            }
            break;
          default:
            break;
        }
        e.target.parentElement.parentElement.parentElement.parentElement.parentElement.dataset.questiontype =
          e.target.value;
        await newItem.createContents();
        item.htmlItem
          .querySelector(".questionContent")
          .replaceWith(newItem.htmlQuestionContent);
      });

      $("#itemsContainer").append(item.htmlItem);
    });

    const formChecker = () => {
      let allItems = document.querySelector(".item");
      for (const item of allItems) {
        switch (item.dataset.questiontype) {
          case "simpleTextInput":
            {
            }
            break;
          case "simpleTextArea":
            {
            }
            break;
          case "complexDropDown":
            {
            }
            break;

          case "complexRadioInput":
            {
            }
            break;
          case "simpleCheckBox":
            {
            }
            break;
          case "location":
            {
            }
            break;
          default:
            break;
        }
      }
    };
  },
};
