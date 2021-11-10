import { buildAllQuestions } from "./questionBuilder";
import { DATABASE } from "./dataBase";
import "../css/home.css";
export const FORMVIEWVER = {
    init: async() =>{
        console.log("INIT FORM")
        let db = new DATABASE();
        let eventos = await db.obtenerDocumento("Cuestionarios","v2jcJkXSc91tIupi2JYR")
         let cuestionario = eventos.newForm
         console.log(cuestionario)
        //  .newEvent333.fichasRegistro['2f3e3e68-a3f4-4a84-9c1c-80e167ae5a1d']
        
        buildAllQuestions(cuestionario);
    }
}