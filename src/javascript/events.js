import { locations } from "./locations";
import "../css/home.css";
import { DATABASE } from "./dataBase";

export const EVENTS ={
    init: async () =>{
        console.log("HOLA");



        $("#btnAddEvent").click(async (e) => {
            console.log("btn");
            let event = {
              id: "777777777777",
              start:$("#fechaHoraInicial").val(),
              end:$("#fechaHoraFinal").val(),
              title: $("#nombreEvento").val()
            };
            await db.addEvent(event, "2021", "fffff");
            let doc = await db.obtenerDocumento("Events", "2021");
            console.log(
              new Date(getFirstProperty(doc).end.seconds * 1000).toISOString()
            );
            var calendarEl = document.getElementById("calendar");
            calendarObj.addEvent(event);
          });
      
    }
}