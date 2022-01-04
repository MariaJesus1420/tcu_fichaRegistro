export class Modals {
  id;
  usuario;
  action;

  constructor(id, usuario) {
    this.id = id;
    this.usuario = usuario;
  }

  generateModal() {
    let div = document.createElement("div");
    div.classList.add("modal-superior");
    let table = document.createElement("table");
    table.classList.add("table", "table-hover", "table-striped", "table-sm");
    let thead = document.createElement("thead");
    thead.classList.add("table-tittle");
    let trThead = document.createElement("tr");
    trThead.classList.add("tr-thead");
    let thId = document.createElement("th");
    thId.innerText="ID";
    thId.classList.add("th-id");
    let thUser = document.createElement("th");
    thUser.innerText="Usuario";
    thUser.classList.add("th-user");
    let thAction = document.createElement("th");
    thAction.classList.add("text-end");
    thAction.innerText="Accion";
    let tbody = document.createElement("tbody");
    tbody.classList.add("table-body");
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

    trThead.append(thId);
    trThead.append(thUser);
    trThead.append(thAction);
    trBody.append(tdUserId);
    trBody.append(tdUserName);
    trBody.append(tdUserAction);
    thead.append(trThead);
    tbody.append(trBody);
    table.append(thead);
    table.append(tbody);
   // div.append(table);

   btnVer.addEventListener("click", (e) => {
    e.preventDefault();
    sessionStorage.cuestionarioId = this.action;
    location.href = "formViewver.html";
  });
    return table;

  }



}
