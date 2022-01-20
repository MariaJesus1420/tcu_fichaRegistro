export class Modals {
  id;
  usuario;
  cuestionarioId;
  respuestaId;

  constructor(id, usuario, cuestionarioId, respuestaId) {
    this.id = id;
    this.usuario = usuario;
    this.cuestionarioId = cuestionarioId;
    this.respuestaId = respuestaId;
  }

  generateModal() {
    let trBody = document.createElement("tr");
    trBody.classList.add("tr-body");
    let tdUserId = document.createElement("td");
    tdUserId.innerText = this.id;
    tdUserId.classList.add("td-userId");
    let tdUserName = document.createElement("td");
    tdUserName.innerText = "Anonimo";
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

    trBody.append(tdUserId);
    trBody.append(tdUserName);
    trBody.append(tdUserAction);

    console.log("card respuestID", this.respuestaId);
    btnVer.addEventListener("click", (e) => {
      e.preventDefault();
      sessionStorage.setItem("cuestionarioId", this.cuestionarioId);
      sessionStorage.setItem("respuestaId", this.respuestaId);
      location.href = "formViewver.html";
    });
    return trBody;
  }
}
