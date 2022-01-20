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

        let db = new DATABASE();
        let cuestionarioId = sessionStorage.getItem("cuestionarioId")
        console.log(cuestionarioId)
    
        let cuestionarioPreview =  JSON.parse(sessionStorage.getItem("cuestionarioPreview"))
      
       

        if(cuestionarioPreview){
          generateQuestions(cuestionarioPreview)
        }else{
          let cuestionario = await db.obtenerDocumento("Cuestionarios",cuestionarioId)
          let respuestaId = sessionStorage.getItem("respuestaId")
          let form = document.querySelector("#form")
          console.log(cuestionario)
          generateQuestions(cuestionario, respuestaId)
          let titulo = document.createElement("h1")
          titulo.innerText= cuestionario.titulo
          titulo.classList.add("text-center")
          let descripcion = document.createElement("label")
          descripcion.innerText= cuestionario.descripcion
          descripcion.classList.add("text-center")
          form.prepend(descripcion)
          form.prepend(titulo)
          

          if (!respuestaId){
            let button = document.createElement("button");
            button.classList.add("btn", "btn-secondary")
            button.id= "enviarRespuestas"
            button.innerText="Enviar respuestas"

            $('.seccionBotones').append(button)
            $('.enviarRespuestas').click(async (e) => {
              e.preventDefault();
              let respuestas = await collectAllQuestions();
              await db.addAnwsers(cuestionarioId,uuidv4(),respuestas)
              $('#successSave').modal('show');
              $("#closeSave").click(()=>{
                $('#successSave').modal('hide');
                location.href ="index.html";
              })
            });
          }else{
            $('.enviarRespuestas').remove();
            let buttonVolver = document.createElement("a");
            buttonVolver.classList.add("btn", "btn-secondary")
            buttonVolver.id= "volver"
            buttonVolver.innerText="Volver"

            $('.seccionBotones').append(buttonVolver)
            $("#volver").click(()=>{
              location.href ="index.html";
            })


          }
        }
        
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