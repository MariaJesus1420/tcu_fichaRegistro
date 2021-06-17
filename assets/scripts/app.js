let selectProvincias = document.querySelector("#selectProvincias");
let selectCantones = document.querySelector("#selectCantones");
let selectDistritos = document.querySelector("#selectDistritos");

let provincia;

const loadOptions = async() => {

    loadData(selectProvincias, await getProvincias());
    let value = event.target.value;
    loadData(selectCantones, await getCantones(value));
    provincia = event.target.value;
}

selectProvincias.addEventListener("change", (event) => {
    let value = event.target.value;
    loadData(selectCantones, await getCantones(value));
    provincia = event.target.value;
})

selectCantones.addEventListener("change", (event) => {
    let value = event.target.value;
    loadData(selectDistritos, await getDistritos(provincia, value));
})



loadOptions();