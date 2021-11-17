import { buildAllQuestions } from "./questionBuilder";
import { DATABASE } from "./dataBase";
import { CheckBoxLogic } from "./classes/checkBoxLogic";
import { RadioLogic } from "./classes/radioLogic";
import { SelectTagLogic } from "./classes/selectLogic";
import "../css/home.css";
export const FORMVIEWVER = {
    init: async() =>{
        console.log("INIT FORM")
        let db = new DATABASE();
        let eventos = await db.obtenerDocumento("Cuestionarios","v2jcJkXSc91tIupi2JYR")
         let cuestionario = eventos.newForm
    
        //  .newEvent333.fichasRegistro['2f3e3e68-a3f4-4a84-9c1c-80e167ae5a1d']
        
        buildAllQuestions(cuestionario);

        let checkBoxList = document.querySelectorAll("input[type='checkbox']")
        let checkBoxLogic = new CheckBoxLogic();
        checkBoxLogic.changeSelectedCheckBox(checkBoxList)
    
        //En lugar de enviar los radios, seleccionar todos los tipo de preguntas que tienen radios y seleccionar el div que los encierra
    
        let radioWrapperList = document.querySelectorAll("[data-questiontype=complexRadioInput]");
        console.log(radioWrapperList)
        radioWrapperList.forEach(wrapper => {
          let radioWrapperLogic = new RadioLogic();
          radioWrapperLogic.changeSelectedRadio(wrapper)
    
        });
    
        let selectWrapperList = document.querySelectorAll("[data-questiontype=complexDropDown]");
        selectWrapperList.forEach(wrapper => {
          let selectLogic = new SelectTagLogic();
          selectLogic.changeSelectedOption(wrapper)
        })
    
        let selectList = document.querySelectorAll("select");
        selectList.forEach(select => {
          select.dispatchEvent(new Event("change"));
    
        })
    
        let radiotList = document.querySelectorAll("input[type='radio']");
        radiotList.forEach(radio => {
          radio.dispatchEvent(new Event("change"));
         
    
        })
    }
}