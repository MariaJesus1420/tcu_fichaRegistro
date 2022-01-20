import { DATABASE } from "./DataBase";

export class CuestionarioLoader{
    constructor(){

    }

    async loadCuestionarios  (year,eventoId){
        let db = new DATABASE();
        let cuestionarios =  await db.obtenerTodos("Cuestionarios")
        console.log(cuestionarios);
        let tbody = document.createElement("tbody")
        cuestionarios.forEach((cuestionario,index) => {
            let trBody = document.createElement("tr");
            trBody.classList.add("tr-body");

            let tdNumeral = document.createElement("td")
            tdNumeral.innerText = index+1
            tdNumeral.classList.add("td-numeral")
            let tdTitulo = document.createElement("td");
            tdTitulo.innerText = cuestionario.data.titulo;
            tdTitulo.classList.add("td-titulo");
    
    
            let tdDescripcion = document.createElement("td");
            tdDescripcion.innerText = cuestionario.data.descripcion;
            tdDescripcion.classList.add("td-descripcion");
    
            let tdFecha = document.createElement("td")
            tdFecha.innerText = "Hoy"
            tdFecha.classList.add("td-fecha")
    
            let tdUserAction = document.createElement("td");
            tdUserAction.classList.add("text-end");
            let divBtn = document.createElement("div");
            divBtn.classList.add("btn-group");
            let btnVer = document.createElement("button");
            btnVer.classList.add("btn", "btn-success");
            let iVer = document.createElement("i");
            iVer.classList.add("bi", "bi-eye-fill");
            let btnAgregar = document.createElement("button");
            btnAgregar.classList.add("btn", "btn-primary");
            let iAgregar = document.createElement("i");
            iAgregar.classList.add("fas", "fa-check");
        
            btnVer.append(iVer);
            btnAgregar.append(iAgregar);

            btnAgregar.addEventListener("click",async(e)=>{
                await db.addFormToEvent(year,eventoId,cuestionario.id)
                $('#modalCuestionarioSelect').modal('hide')
                $('#successAdd').modal('show')
                $("#closeAdd").click(()=>{
                    $('#successSave').modal('hide');
                    location.href ="index.html";
                  })
            })

            divBtn.append(btnVer);
            divBtn.append(btnAgregar);
            tdUserAction.append(divBtn);
        
            trBody.append(tdNumeral);
            trBody.append(tdTitulo);
            trBody.append(tdDescripcion);
            trBody.append(tdFecha);
            trBody.append(tdUserAction);
            tbody.append(trBody)
        });
      return tbody
    }
}