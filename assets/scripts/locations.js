const getLocationData = async() => {
    fetch('https://ubicaciones.paginasweb.cr/provincias.json')
        .then(response => response.json())
        .then(data => console.log(data));
}