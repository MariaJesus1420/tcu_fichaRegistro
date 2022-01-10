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
      await this.selectProvinciasFunction(event.target.value, selectCantones);
    });

    selectCantones.addEventListener("change", async (event) => {
      await this.selectCantonesFunction(event.target.value, selectDistritos);
    });
  };

  selectProvinciasFunction = async (provincia, selectCantones) => {
    this.provincia = provincia;

    let data = await locations.getCantones(this.provincia);
    locations.loadData(selectCantones, data);
    
  };

  selectCantonesFunction = async (canton, selectDistritos) => {
 
    let data = await locations.getDistritos(this.provincia, canton);
    locations.loadData(selectDistritos, data);

  };
}
