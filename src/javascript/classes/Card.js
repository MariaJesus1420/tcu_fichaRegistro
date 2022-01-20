import { Modals } from "./Modals";
import { DATABASE } from "./DataBase";

export class Card {
  title;
  description;
  href;
  listaRespuestas;

  constructor(title, description, href, listaRespuestas) {
    this.title = title;
    this.description = description;
    this.href = href;
    this.listaRespuestas = listaRespuestas
  }

  async generateCard(year, eventoId, cuestionarioDB, cuestionarioId) {
    let db = new DATABASE();
    let cardWrapper = document.createElement("div");
    cardWrapper.classList.add("col-xl-4");
    let card = document.createElement("div");
    card.classList.add("card", "cuestionarioCard");
    let btnEliminar = document.createElement("button")
    btnEliminar.classList.add("btn", "btn-danger")
    let iEliminar = document.createElement("i")
    iEliminar.classList.add("bi", "bi-trash")
    btnEliminar.append(iEliminar)
    card.append(btnEliminar)
    btnEliminar.addEventListener("click", async (e) => {
      await db.deleteFormFromEvent(year, eventoId, cuestionarioId)
      e.target.parentElement.parentElement.remove();
    })
    let card_body = document.createElement("div");
    card_body.classList.add("card-body");
    let card_tittle = document.createElement("h5");
    card_tittle.classList.add("card-tittle", "text-center");
    let card_text = document.createElement("p");
    card_text.classList.add("card-text", "text-center");
    let href = document.createElement("a");
    let participantes = document.createElement("a");
    participantes.innerText = "Respuestas";
    participantes.classList.add("btn", "btn-success", "col-5");
    href.innerText = "Completar";
    href.classList.add("btn", "btn-primary", "col-5");

    card_text.innerText = this.description;
    card_tittle.innerText = this.title;
    href.href = this.href;
    card.append(card_body);
    let cardBodyBtns = document.createElement("div");
    cardBodyBtns.classList.add("card-body-btns");

    card_body.append(card_tittle);
    card_body.append(card_text);

    cardBodyBtns.append(href);
    participantes.addEventListener("click", () => {
      let cuestionariosWrapper = document.querySelector("#respuestasWrapper");
      let tbody = cuestionariosWrapper.querySelector("tbody")
      let div = document.querySelector(".modal-superior");
      let id = 1;

      $('#modalEvent').modal('hide');
      if (this.listaRespuestas != null) {
        Object.entries(this.listaRespuestas).forEach((respuesta) => {
          console.log("respuesta", respuesta)
          tbody.append(new Modals(id, cuestionarioDB.usuario, this.href, respuesta[0]).generateModal());
          id++;
          $('#modalRespuestas').modal('show');
      })
      }else{
        $('#noAnswer').modal('show');
        $("#closeAnswer").click(()=>{
          $('#noAnswer').modal('hide');
        })
      }
    })
    $("#btnVolverRespuestas").click(() => {
      let div = document.querySelectorAll(".modal-superior tbody tr");
      console.log(div)
      $('#modalRespuestas').modal('hide');
      div.forEach(div2 => div2.remove());
      $('#modalEvent').modal('show');
    })
    cardBodyBtns.append(participantes);
    card_body.append(cardBodyBtns);

    cardWrapper.append(card);

    href.addEventListener("click", (e) => {
      e.preventDefault();
      sessionStorage.setItem("cuestionarioId", this.href);
      location.href = "formViewver.html";
      sessionStorage.removeItem("cuestionarioPreview");
      sessionStorage.removeItem("respuestaId");

    });
    return cardWrapper;
  }

}
