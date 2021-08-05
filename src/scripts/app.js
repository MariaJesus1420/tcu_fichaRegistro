let selectProvincias = document.querySelector("#selectProvincia");
let selectCantones = document.querySelector("#selectCanton");
let selectDistritos = document.querySelector("#selectDistrito");

let provincia;

const loadOptions = async() => {
    let data = await getProvincias();
    loadData(selectProvincias, data);
    data = await getCantones(1);
    loadData(selectCantones, data);
    data = await getDistritos(1, 1);
    loadData(selectDistritos, data);
}



loadOptions();


selectProvincias.addEventListener('change', async(event) => {
    console.log("ready");

    provincia = event.target.value;

    let data = await getCantones(provincia);
    loadData(selectCantones, data);

});

selectCantones.addEventListener('change', async(event) => {
    let canton = event.target.value;

    let data = await getDistritos(provincia, canton);

    loadData(selectDistritos, data);

});