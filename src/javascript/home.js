
import "../css/home.css";
import "../css/events.css";
import { DATABASE } from "./Classes/DataBase";
import { v4 as uuidv4 } from "uuid";
import { Card } from "./Classes/Card";




export const HOME = {
  init: async () => {

    const generateEventsList = (eventsDB) => {
      let eventsList = [];

      console.log(Object.values(eventsDB));
      let eventsDBArray = Object.values(eventsDB);
      for (let index = 0; index < eventsDBArray.length; index++) {
        eventsList.push({
          id: eventsDBArray[index].id,
          descripcion: eventsDBArray[index].descripcion,
          organizacion: eventsDBArray[index].organizacion,
          start: new Date(
            eventsDBArray[index].start.seconds * 1000
          ).toISOString(),
          end: new Date(eventsDBArray[index].end.seconds * 1000).toISOString(),
          title: eventsDBArray[index].title,
        });
      }

      return eventsList;
    };

    const eventoClick = async (info) => {
      let cuestionariosWrapper = document.querySelector("#cuestionariosWrapper")
      let clickedEvent = info.event
      let db = new DATABASE()
      let eventListDB = await db.obtenerDocumento("Events", "2021")
      let id = clickedEvent.id

      let modalEvent = new bootstrap.Modal(document.getElementById("modalEvent"), {
        keyboard: false,
      });

      modalEvent.show()
      for (let index = 0; index < eventListDB[id].cuestionarios.length; index++) {
        let cuestionario = eventListDB[id].cuestionarios[index];
        let cuestionarioDB = await db.obtenerDocumento("Cuestionarios", cuestionario)
        console.log(cuestionarioDB)
        let object = {
          listaPreguntas: cuestionarioDB.listaPreguntas,
          descripcion: cuestionarioDB.descripcion,
          titulo: "Ficha de Registro"
        }
        //    await db.addForm(object);
        cuestionariosWrapper.append(new Card("Cuestionario sobre patrimonio", cuestionarioDB.descripcion, cuestionario).generateCard())
      }
    }

    modalEvent.addEventListener('hidden.bs.modal', function (event) {
      let cuestionariosWrapper = document.querySelectorAll(".col-lg-4")
      let cuestionarioCard = document.querySelector(".cuestionarioCard")
      cuestionariosWrapper.forEach(cuestionarioCard => cuestionarioCard.remove())

      console.log('removed')
    })
    
    let eventoSeleccionado;
    const generateCalendar = (eventList) => {
      var calendarEl = document.getElementById("calendar");
      console.log("Generando calendario");
      var calendar = new FullCalendar.Calendar(calendarEl, {
        eventClick: eventoClick,
        events: eventList,
        eventOverlap: false,
        themeSystem: "bootstrap",
        height: 600,
        navLinks: true,
        locale: "es",
        aspectRatio: 2,
        expandRows: false,

        initialView: "listMonth",
        buttonText: {
          listMonth: "Lista"
        },
        footerToolbar: {
          start: "today",
          end: "prev,next",
        },
        headerToolbar: {
          left: "title",
          end: "dayGridMonth listMonth",

        },
        eventTimeFormat: {
          hour: "numeric",
          minute: "2-digit",
          meridiem: "short",
        },
        views: {
          timeGridWeek: {
            displayEventTime: true,
          },
          dayGridMonth: {
            displayEventEnd: true,
          },
        },
      });
      calendar.render();
      return calendar;
    };

    function getFirstProperty(obj) {
      return obj[Object.keys(obj)[0]];
    }

    let calendarObj;
    var myModalEl = document.getElementById("myModal");
    var myModal = new bootstrap.Modal(document.getElementById("myModal"), {
      keyboard: false,
    });

    let db = new DATABASE();



    $("#btnGuardarForm").click(async (e) => {
      let listaPreguntas = await collectAllQuestions();
      let cuestionario = cuestionarioBuilder(listaPreguntas);
      e.preventDefault()

      console.log(cuestionario);

      await db.addFichaRegistro("newEvent333", "2021", cuestionario, uuidv4());
    });
    let eventsDB = await db.obtenerDocumento("Events", "2021");
    calendarObj = generateCalendar(generateEventsList(eventsDB));



    $("#btnVerEventos").click(async (e) => {

      e.preventDefault();
      let eventsDB = await db.obtenerDocumento("Events", "2021");
      console.log(eventsDB)
      myModal.show();

      myModalEl.addEventListener("shown.bs.modal", function (event) {
        // do something...

        $("#calendar").css({ visibility: "hidden" });
        calendarObj = generateCalendar(generateEventsList(eventsDB));
        $("#calendar").css({ visibility: "visible" });
        $("#datosEvento").show();
        $("#infoGeneral").hide();
      });
    });

    $("#btnVolver").click(async (e) => {
      $("#infoGeneral").show();
    });
  },
};
