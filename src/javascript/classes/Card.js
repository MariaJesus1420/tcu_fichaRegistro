export class Card {
  title;
  description;
  href;

  constructor(title,description,href) {
    this.title = title
    this.description = description
    this.href=href
  }

  generateCard() {
    let cardWrapper = document.createElement("div")
    cardWrapper.classList.add("col-sm-4")
    let card = document.createElement("div");
    card.classList.add("card","cuestionarioCard");
    let card_body = document.createElement("div");
    card_body.classList.add("card-body");
    let card_tittle = document.createElement("h5");
    card_tittle.classList.add("card-tittle");
    let card_text = document.createElement("p");
    card_text.classList.add("card-text");
    let href = document.createElement("a");
    href.innerText="Tomar cuestionario"
    href.classList.add("btn","btn-primary");

    card_text.innerText = this.description
    card_tittle.innerText = this.title
    href.href= href
    card.append(card_body);
    card_body.append(card_tittle);
    card_body.append(card_text);
    card_body.append(href);
    cardWrapper.append(card)

    href.addEventListener("click",(e)=>{
      e.preventDefault();
      sessionStorage.cuestionarioId = this.href
      location.href = 'formViewver.html';
    })
    return cardWrapper;
  }
}
