const getProvincias = async() => {
    let response = await fetch('https://ubicaciones.paginasweb.cr/provincias.json');
    return response.json();
}

const getCantones = async(provincia) => {
    let response = await fetch("https://ubicaciones.paginasweb.cr/provincia/" + provincia + "/cantones.json")
    return response.json();
}

const getDistritos = async(provincia, canton) => {
    let response = await fetch("https://ubicaciones.paginasweb.cr/provincia/" + provincia + "/canton/" + canton + "/distritos.json");
    return response.json();

}

const loadData = (selectControl, data) => {
    let firstOption = document.createElement("option");
    firstOption.selected = true;
    firstOption.innerText = "Provincia";
    selectControl.append(firstOption);
    let objectData = Object.entries(data);

    for (let index = 0; index < objectData.length; index++) {

        let option = document.createElement("option");
        option.value = objectData[index][0];
        option.innerText = objectData[index][1];
        selectControl.append(option);
    }


}