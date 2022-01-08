import "../css/questionMaker.css";
import "../css/home.css";
export const QUESTIONMAKER = {
    init: async ()=>{
        $("#btnAgregarPregunta").click(()=>{
            console.log("asd")
            let questionSelector = document.createElement("div")
            questionSelector.classList.add("item")
            questionSelector.innerText = "HOLAS"
            let mainContent = $(".mainContent")
            
            mainContent.prepend(questionSelector)
        })
    }
}