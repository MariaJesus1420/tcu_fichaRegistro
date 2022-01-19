export class Modals {
  id;
  usuario;
  cuestionarioId;
  respuestaId;
  

  constructor(id, usuario,cuestionarioId, respuestaId) {
    this.id = id;
    this.usuario = usuario;
    this.cuestionarioId=cuestionarioId;
    this.respuestaId=respuestaId;
  }

  generateModal() {
    // let div = document.createElement("div");
    // div.classList.add("modal-superior");
    // let div2 = document.createElement("div");
    // div2.classList.add("modal-superior-segundo");
    // let table = document.createElement("table");
    // table.classList.add("table", "table-hover", "table-striped", "table-sm");
    // let thead = document.createElement("thead");
    // thead.classList.add("table-tittle");
    // let trThead = document.createElement("tr");
    // trThead.classList.add("tr-thead");
    // let thId = document.createElement("th");
    // thId.innerText="ID";
    // thId.classList.add("th-id");
    // let thUser = document.createElement("th");
    // thUser.innerText="Usuario";
    // thUser.classList.add("th-user");
    // let thAction = document.createElement("th");
    // thAction.classList.add("text-end");
    // thAction.innerText="Accion";
    // let tbody = document.createElement("tbody");
    // tbody.classList.add("table-body");
    let trBody = document.createElement("tr");
    trBody.classList.add("tr-body");
    let tdUserId = document.createElement("td");
    tdUserId.innerText=this.id;
    tdUserId.classList.add("td-userId");
    let tdUserName = document.createElement("td");
    tdUserName.innerText=this.usuario;
    tdUserName.classList.add("td-userName");
    let tdUserAction = document.createElement("td");
    tdUserAction.classList.add("text-end");
    let divBtn = document.createElement("div");
    divBtn.classList.add("btn-group");
    let btnVer = document.createElement("button");
    btnVer.classList.add("btn", "btn-success");
    let iVer = document.createElement("i");
    iVer.classList.add("bi", "bi-eye-fill");
    let btnDelete = document.createElement("button");
    btnDelete.classList.add("btn", "btn-danger");
    let iDelete = document.createElement("i");
    iDelete.classList.add("bi", "bi-x");
  
    btnVer.append(iVer);
    btnDelete.append(iDelete);
    divBtn.append(btnVer);
    divBtn.append(btnDelete);
    tdUserAction.append(divBtn);

    // trThead.append(thId);
    // trThead.append(thUser);
    // trThead.append(thAction);
    trBody.append(tdUserId);
    trBody.append(tdUserName);
    trBody.append(tdUserAction);
    // thead.append(trThead);
    // tbody.append(trBody);
    // table.append(thead);
    // table.append(tbody);
    // div2.append(table);
    // div.append(div2);

    console.log("card respuestID", this.respuestaId)
   btnVer.addEventListener("click", (e) => {
    e.preventDefault();
    sessionStorage.setItem("cuestionarioId", this.cuestionarioId);
    sessionStorage.setItem("respuestaId", this.respuestaId);
    location.href = "formViewver.html";
  });
    return trBody;

  }



}
