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



    var myModalEl = document.getElementById("myModal");
    var myModal = new bootstrap.Modal(document.getElementById('myModal'), {
      keyboard: false
    })
    $("#btnSeleccion").click((e) => {
      console.log("CLICK");
      e.preventDefault();
     myModal.show()
     
      myModalEl.addEventListener("shown.bs.modal", function (event) {
        // do something...
        var calendarEl = document.getElementById("calendar");
        var calendar = new FullCalendar.Calendar(calendarEl, {
          height: 500,
          aspectRatio: 1.35,
          expandRows: true,
        });
        calendar.render();
      });
    });
  },
};
