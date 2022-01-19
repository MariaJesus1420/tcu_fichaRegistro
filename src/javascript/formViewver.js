import { buildAllQuestions } from "./questionBuilder";
import { DATABASE } from "./Classes/DataBase";
import { CheckBoxLogic } from "./Classes/CheckBoxLogic";
import { RadioLogic } from "./Classes/RadioLogic";
import { SelectTagLogic } from "./Classes/SelectLogic";
import { v4 as uuidv4 } from "uuid";
import "../css/home.css";
import { collectAllQuestions } from "./questionCollector";
import { generateQuestions } from "./questionCreator";
import { Cuestionario } from "./classes/Cuestionario";
export const FORMVIEWVER = {
    init: async() =>{
      window.onbeforeunload = function() {
        sessionStorage.removeItem("cuestionarioId");
      };
        let db = new DATABASE();
        let cuestionarioId = sessionStorage.getItem("cuestionarioId")
        console.log(cuestionarioId)
    
        let cuestionarioPreview =  JSON.parse(sessionStorage.getItem("cuestionarioPreview"))
      
        //  .newEvent333.fichasRegistro['2f3e3e68-a3f4-4a84-9c1c-80e167ae5a1d']

        if(cuestionarioPreview){
          generateQuestions(cuestionarioPreview)
        }else{
          let cuestionario = await db.obtenerDocumento("Cuestionarios",cuestionarioId)
          let respuestaId = sessionStorage.getItem("respuestaId")
          console.log(cuestionario)
          generateQuestions(cuestionario, respuestaId)
        }
        
       // buildAllQuestions(cuestionario,"1eeff9dc-02ff-4890-925e-1887332007c5");
        
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

        

        $("#btnGuardarForm").click(async (e) => {
          let respuestas = await collectAllQuestions();
          await db.addAnwsers(cuestionarioId,uuidv4(),respuestas)
        });
    }
}