
import "../css/home.css";
import "../css/events.css";
import { DATABASE } from "./dataBase";
import { v4 as uuidv4 } from "uuid";




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

    const eventoClick = (info)=>{
      let cuestionariosWrapper = document.querySelector("#cuestionariosWrapper")
      let clickedEvent = info.event
      let db = new DATABASE()
      let eventListDB=db.obtenerDocumento("Events","2021")
      console.log(eventListDB[clickedEvent.id])
    }

    let eventoSeleccionado;
    const generateCalendar = (eventList) => {
      var calendarEl = document.getElementById("calendar");
      console.log("Generando calendario");
      var calendar = new FullCalendar.Calendar(calendarEl, {
        eventClick: function (info) {
          eventoSeleccionado = info.event;
          console.log( eventoSeleccionado.title)
          $("#lblNombreEvento").text(
            "Titulo del evento : " + eventoSeleccionado.title
          );
          $("#lblDescripcion").text(
            "Descripcion del evento : " +
            eventoSeleccionado.extendedProps.descripcion
          );
          $("#lblOrganizacion").text(
            "Organizacion que participa : " +
            eventoSeleccionado.extendedProps.organizacion
          );

          let options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          };

          $("#lblFecha").text(
            "Fecha del evento : " +
            new Date(eventoSeleccionado.start).toLocaleString(
              "es-CR",
              options
            )
          );

          options = { hour: "numeric", minute: "numeric", hourCycle: "h12" };
          $("#lblHoraInicio").text(
            "Hora de inicio : " +
            new Date(eventoSeleccionado.start).toLocaleString(
              "es-CR",
              options
            )
          );

          $("#lblHoraFin").text(
            "Hora de finalizacion : " +
            new Date(eventoSeleccionado.end).toLocaleString("es-CR", options)
          );
          myModal.hide();
        },
        events: eventList,
        eventOverlap: false,
        themeSystem: "bootstrap",
        height: 600,
        navLinks: true,
        locale: "es",
        aspectRatio: 1.35,
        expandRows: true,
        initialView: "listMonth",

        footerToolbar: {
          end: "listMonth",
        },
        headerToolbar: {
          start: "title",
          center: "today",
          end: "dayGridMonth timeGridWeek prev,next",
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
