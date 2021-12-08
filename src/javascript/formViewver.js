import { buildAllQuestions } from "./questionBuilder";
import { DATABASE } from "./classes/DataBase";
import { CheckBoxLogic } from "./classes/CheckBoxLogic";
import { RadioLogic } from "./classes/RadioLogic";
import { SelectTagLogic } from "./classes/SelectLogic";
import "../css/home.css";
export const FORMVIEWVER = {
    init: async() =>{
        console.log("INIT FORM")
        let db = new DATABASE();
        let cuestionarioId = sessionStorage.getItem("cuestionarioId")
        let cuestionario = await db.obtenerDocumento("Cuestionarios",'F63qRfCjdgxjALMUVRN5')
    
        //  .newEvent333.fichasRegistro['2f3e3e68-a3f4-4a84-9c1c-80e167ae5a1d']

       db.getAnswers(cuestionarioId);
        
        buildAllQuestions(cuestionario);

        let checkBoxList = document.querySelectorAll("input[type='checkbox']")
        let checkBoxLogic = new CheckBoxLogic();
        checkBoxLogic.changeSelectedCheckBox(checkBoxList)
    
        //En lugar de enviar los radios, seleccionar todos los tipo de preguntas que tienen radios y seleccionar el div que los encierra
    
        let radioWrapperList = document.querySelectorAll("[data-questiontype=complexRadioInput]");
      
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