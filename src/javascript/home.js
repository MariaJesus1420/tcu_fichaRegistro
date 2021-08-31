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

    loadOptions();

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

    console.log("START CALENDAR");

    console.log("CALENDAR");
    var calendarEl = document.getElementById("calendar");
    var calendar = new FullCalendar.Calendar(calendarEl, {
      views: {
        dayGrid: {
          // options apply to dayGridMonth, dayGridWeek, and dayGridDay views
        },
        timeGrid: {
          // options apply to timeGridWeek and timeGridDay views
        },
        week: {
          // options apply to dayGridWeek and timeGridWeek views
        },
        day: {
          // options apply to dayGridDay and timeGridDay views
        },
      },
    });
    calendar.render();
    console.log("calendar rendered");

    console.log("FINISH CALENDAR");
  },
};
