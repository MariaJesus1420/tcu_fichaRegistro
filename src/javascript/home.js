import { locations } from "./locations";
import "../css/home.css";
import { DATABASE } from "./dataBase";
export const HOME = {
  init: async () => {
    let selectProvincias = document.querySelector("#selectProvincia");
    let selectCantones = document.querySelector("#selectCanton");
    let selectDistritos = document.querySelector("#selectDistrito");

    let provincia;

    const loadOptions = async () => {
      let data = await locations.getProvincias();
      locations.loadData(selectProvincias, data);
      data = await locations.getCantones(1);
      locations.loadData(selectCantones, data);
      data = await locations.getDistritos(1, 1);
      locations.loadData(selectDistritos, data);
    };

    await loadOptions();

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

    let eventoSeleccionado;
    const generateCalendar = (eventList) => {
      var calendarEl = document.getElementById("calendar");
      var calendar = new FullCalendar.Calendar(calendarEl, {
        eventClick: function (info) {
          eventoSeleccionado = info.event;
         
          $("#lblNombreEvento").text("Titulo del evento : "+eventoSeleccionado.title);
          $("#lblDescripcion").text("Descripcion del evento : "+eventoSeleccionado.extendedProps.descripcion);
          $("#lblOrganizacion").text("Organizacion que participa : "+eventoSeleccionado.extendedProps.organizacion);
         
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


         

          options ={hour:"numeric",minute:"numeric",hourCycle:"h12"}
          $("#lblHoraInicio").text(
            "Hora de inicio : " +
              new Date(eventoSeleccionado.start).toLocaleString(
                "es-CR",
                options
              )
          );

          $("#lblHoraFin").text(
            "Hora de finalizacion : " +
              new Date(eventoSeleccionado.end).toLocaleString(
                "es-CR",
                options
              )
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

    selectProvincias.addEventListener("change", async (event) => {
      provincia = event.target.value;

      let data = await locations.getCantones(provincia);
      locations.loadData(selectCantones, data);
    });

    selectCantones.addEventListener("change", async (event) => {
      let canton = event.target.value;

      let data = await locations.getDistritos(provincia, canton);

      locations.loadData(selectDistritos, data);
    });

    let calendarObj;
    var myModalEl = document.getElementById("myModal");
    var myModal = new bootstrap.Modal(document.getElementById("myModal"), {
      keyboard: false,
    });



    let db = new DATABASE();

    $("#btnGuardarForm").click(async (e) =>{
      e.preventDefault();
      let fichaRegistro = {
        nombreInformante : $("#formNombreInformante").val(),
        edad: $("#formEdad").val(),
        locacion: [$("#selectProvincia").val(),$("#selectCanton").val(), $("#selectDistrito").val()],
        evento: $("#formSeleccionEvento").val(),
        otroEvento: $("#formInputOtro").val(),
        patrimonio: $("#formSeleccionEvento2").val(),
        otroPatrimonio: $("#formInputOtro2").val(),
        descManifestacionPatrimonial : $("#textDescripcionManifestacion").val(),
        opcionImportancia : [$("#si1").val(), $("#no1").val()],
        porqueContexto: $("#textPorqueContexto").val(),
        opcionAprendido :[ $("#si2").val(),$("#no2").val() ],
       explicacionTraspaso : $("#textPorqueTraspaso").val(),
        explicacionDisponilidad: $("#textDisponibilidad").val(),
        importancia:[$("#checkVigente").val(), $("#checkVulnerable").val(), $("#checkMemoria").val() ],
        nombreEstudiante : $("#nombreEstudiante").val()
      }
      console.log(fichaRegistro);
      await db.addFichaRegistro("newEvent333","2021",fichaRegistro,"otroiddd");
      
    })
    $("#btnAddEvent").click(async (e) => {
      console.log("btn");
      let event = {
        id: "newEvent333",
        start: "2021-09-09T12:30:00",
        end: "2021-09-09T23:30:00",
        title: "Este es un evento de prueba",
      };
      await db.addEvent(event, "2021", "dg2g");
      let doc = await db.obtenerDocumento("Events", "2021");
      console.log(
        new Date(getFirstProperty(doc).end.seconds * 1000).toISOString()
      );
      var calendarEl = document.getElementById("calendar");
      calendarObj.addEvent(event);
    });

    $("#btnSeleccion").click(async (e) => {
      console.log("CLICK");
      e.preventDefault();
      let eventsDB = await db.obtenerDocumento("Events", "2021");

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
