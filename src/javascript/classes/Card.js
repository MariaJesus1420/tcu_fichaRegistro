import { Modals } from "./Modals";

export class Card {
  title;
  description;
  href;

  constructor(title, description, href) {
    this.title = title;
    this.description = description;
    this.href = href;
  }

  generateCard(cuestionario, cuestionarioDB) {
    let cardWrapper = document.createElement("div");
    cardWrapper.classList.add("col-lg-4");
    let card = document.createElement("div");
    card.classList.add("card", "cuestionarioCard");
    let card_body = document.createElement("div");
    card_body.classList.add("card-body");
    let card_tittle = document.createElement("h5");
    card_tittle.classList.add("card-tittle","text-center");
    let card_text = document.createElement("p");
    card_text.classList.add("card-text","text-center");
    let href = document.createElement("a");
    let participantes = document.createElement("a");
    participantes.innerText = "Respuestas";
    participantes.classList.add("btn", "btn-success","col-5");
    href.innerText = "Completar";
    href.classList.add("btn", "btn-primary","col-5");

    card_text.innerText = this.description;
    card_tittle.innerText = this.title;
    href.href = href;
    card.append(card_body);
    let cardBodyBtns = document.createElement("div");
    cardBodyBtns.classList.add("card-body-btns");

    card_body.append(card_tittle);
    card_body.append(card_text);

    cardBodyBtns.append(href);
    participantes.addEventListener("click",()=>{
      let cuestionariosWrapper = document.querySelectorAll("#respuestasWrapper");
      let table = document.querySelector(".table table-hover table-striped table-sm");
      
      let id=0;
      console.log("CLICK RESPUESTAS")
      $('#modalEvent').modal('hide');
      cuestionariosWrapper.forEach(table => table.append(new Modals(id,cuestionarioDB.usuario).generateModal()), id++);
      $('#modalRespuestas').modal('show');
      
      
      $("#btnVolverRespuestas").click(()=>{
      
        $('#modalRespuestas').modal('hide');
        // cuestionariosWrapper.forEach(table => table.remove());
        $('#modalEvent').modal('show');
      })
    })
    cardBodyBtns.append(participantes);
    card_body.append(cardBodyBtns);

    cardWrapper.append(card);

    href.addEventListener("click", (e) => {
      e.preventDefault();
      sessionStorage.cuestionarioId = this.href;
      location.href = "formViewver.html";
    });
    return cardWrapper;
  }

}
