import { locations } from "./locations";
import "../css/home.css";
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

    $("#btnAddEvent").click((e) => {
      console.log("btn");
      let event = {
        id: "newEvent2",
        start: "2021-09-08T11:30:00",
        end: "2021-09-08T23:30:00",
        title: "Este es un evento de prueba",
        
      };
      var calendarEl = document.getElementById("calendar");
      calendarObj.addEvent(event);
    });
    $("#btnSeleccion").click((e) => {
      console.log("CLICK");
      e.preventDefault();
      myModal.show();

      myModalEl.addEventListener("shown.bs.modal", function (event) {
        // do something...
        var calendarEl = document.getElementById("calendar");
        var calendar = new FullCalendar.Calendar(calendarEl, {
          eventClick: function (info) {
            console.log(info.event.id);
            myModal.hide();
          },
          eventOverlap:false,
          themeSystem: "bootstrap",
          height: 600,
          navLinks: false,
          locale: "es",
          aspectRatio: 1.35,
          expandRows: true,
          initialView: "timeGridWeek",
          headerToolbar: {
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
            dayGridWeek: {},
          },
        });
        calendar.render();

        calendarObj = calendar;
      });
    });
  },
};
