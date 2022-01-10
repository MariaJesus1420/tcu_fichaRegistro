import { locations } from "./locations";
import "../css/home.css";
import { DATABASE } from "./Classes/DataBase";
import { v4 as uuidv4 } from "uuid";

export const EVENTS ={
    init: async () =>{

        let db = new DATABASE();

        $("#btnAddEvent").click(async (e) => {
            console.log("btn");
            let event = {
              id: uuidv4(),
              start:$("#fechaHoraInicial").val(),
              end:$("#fechaHoraFinal").val(),
              title: $("#nombreEvento").val(),
              descripcion : $("#descipcion").val()

            };
            await db.addEvent(event, "2021", event.id);
            $('#succes').modal('show');
          
          });
      
    }
}