import { Modals } from "./Modals";

export class Card {
  title;
  description;
  href;
  listaRespuestas;

  constructor(title, description, href, listaRespuestas) {
    this.title = title;
    this.description = description;
    this.href = href;
    this.listaRespuestas=listaRespuestas
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
    href.href = this.href;
    card.append(card_body);
    let cardBodyBtns = document.createElement("div");
    cardBodyBtns.classList.add("card-body-btns");

    card_body.append(card_tittle);
    card_body.append(card_text);

    cardBodyBtns.append(href);
    participantes.addEventListener("click",()=>{
      let cuestionariosWrapper = document.querySelectorAll("#respuestasWrapper");
      let div = document.querySelector(".modal-superior");
      let id=1;
      console.log("CLICK RESPUESTAS")
      $('#modalEvent').modal('hide');
      cuestionariosWrapper.forEach((div, index) =>{
        console.log("entro al div");
        div.append(new Modals(id,cuestionarioDB.usuario, this.href, Object.entries(this.listaRespuestas)[index][0]).generateModal());
        id++;
      })
      console.log("respuesas",Object.entries(this.listaRespuestas))
      $('#modalRespuestas').modal('show');
    })
    $("#btnVolverRespuestas").click(()=>{
      let div = document.querySelectorAll(".modal-superior");
      let div2 = document.querySelector(".modal-superior-segundo");
      $('#modalRespuestas').modal('hide');
      div.forEach(div2 => div2.remove());
      $('#modalEvent').modal('show');
    })
    cardBodyBtns.append(participantes);
    card_body.append(cardBodyBtns);

    cardWrapper.append(card);

    href.addEventListener("click", (e) => {
      e.preventDefault();
      sessionStorage.setItem("cuestionarioId",this.href);
      location.href = "formViewver.html";
      sessionStorage.removeItem("cuestionarioPreview");
      sessionStorage.removeItem("respuestaId");
    });
    return cardWrapper;
  }

}
