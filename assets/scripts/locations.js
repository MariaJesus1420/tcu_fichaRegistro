const getLocationData = async() => {
    await fetch('https://ubicaciones.paginasweb.cr/provincias.json')
        .then(response => response.json())
        .then(data => console.log(data));
    return data;
}

const loadData = (selectControl, data) => {
    let firstOption = document.createElement("option");
    firstOption.selected = true;
    firstOption.innerText = "Provincia";
    selectControl.append(firstOption);
    for (let index = 0; index < data.length; index++) {
        let option = document.createElement("option");
        option.value = index + 1;
        option.innerText = data[index + 1];
        selectControl.append(option);
    }
    return selectControl;

}

getLocationData();