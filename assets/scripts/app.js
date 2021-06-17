let selectProvincias = document.querySelector("#selectProvincias");
let selectCantones = document.querySelector("#selectCantones");
let selectDistritos = document.querySelector("#selectDistritos");

let provincia;

const loadOptions = async() => {

    loadData(selectProvincias, await getProvincias());
}

selectProvincias.addEventListener("change", (event) => {
    loadData(selectCantones, await getCantones(event.target.value));
    provincia = event.target.value;
})

selectCantones.addEventListener("change", (event) => {
    loadData(selectDistritos, await getDistritos(provincia, event.target.value));
})

loadOptions();