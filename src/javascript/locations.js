export const locations = {
    getProvincias: async () => {
      let response = await fetch(
        "https://ubicaciones.paginasweb.cr/provincias.json"
      );
      return response.json();
    },
  
    getCantones: async (provincia) => {
      let response = await fetch(
        "https://ubicaciones.paginasweb.cr/provincia/" +
          provincia +
          "/cantones.json"
      );
  
      return response.json();
    },
  
    getDistritos: async (provincia, canton) => {
      let response = await fetch(
        "https://ubicaciones.paginasweb.cr/provincia/" +
          provincia +
          "/canton/" +
          canton +
          "/distritos.json"
      );
      return response.json();
    },
  
    loadData: (selectControl, data) => {
      let objectData = Object.entries(data);
      while (selectControl.firstChild) {
        selectControl.removeChild(selectControl.firstChild);
      }
      for (let index = 0; index < objectData.length; index++) {
        let option = document.createElement("option");
        option.value = objectData[index][0];
        option.innerText = objectData[index][1];
        if (index === 0) {
          option.selected = true;
        }
        selectControl.append(option);
      }
    },
  };
  