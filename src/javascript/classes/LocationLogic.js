import { locations } from "../locations";
export class LocationLogic {
  provincia;

  constructor() {}

  loadOptions = async (selectProvincias, selectCantones, selectDistritos) => {
    let data = await locations.getProvincias();
    locations.loadData(selectProvincias, data);
    data = await locations.getCantones(1);
    locations.loadData(selectCantones, data);
    data = await locations.getDistritos(1, 1);
    locations.loadData(selectDistritos, data);

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
  };
}
