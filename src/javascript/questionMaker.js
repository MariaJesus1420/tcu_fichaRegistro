import "../css/home.css";
import "../css/questionMaker.css";

import { SimpleTextInput } from "./Classes/SimpleTextInput";
import { Opcion } from "./Classes/Opcion";
import { LocationSelector } from "./Classes/LocationSelector";
import { SimpleTextArea } from "./Classes/SimpleTextArea";
import { ComplexDropDown } from "./Classes/ComplexDropDown";
export const QUESTIONMAKER = {
  init: async () => {
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

      optionList.push(opcion1);
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

              let option3 = new Opcion(
                false,
                "",
                false,
                false,
                "input",
                "Campo para la opcion extra"
              );
              optionList = []
              optionList.push(option1)
              optionList.push(option2)
              optionList.push(option3)
              
              newItem = new ComplexDropDown(
                "complexDropDown",
                "Titulo de la pregunta",
                optionList,
                [],
                true
              );

            }
            break;

          case "complexRadioInput":
            {
            }
            break;
          case "simpleCheckbox":
            {
            }
            break;
          case "location":
            {
              newItem = new LocationSelector(
                "simpleTextInput",
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
        await newItem.createContents();
        item.htmlItem
          .querySelector(".questionContent")
          .replaceWith(newItem.htmlQuestionContent);
      });

      $("#mainContent").prepend(item.htmlItem);
    });
  },
};
