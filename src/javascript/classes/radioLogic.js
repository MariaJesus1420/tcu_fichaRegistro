export class RadioLogic {
  currentRadio;
  lastSelectedRadio;
  radioList;
  textAreaList;
  constructor() {}

  changeSelectedRadio = (radioWrapper) => {
    this.radioList = radioWrapper.querySelectorAll("input[type='radio']");
    this.textAreaList = radioWrapper.querySelectorAll("textarea");
    this.radioList.forEach((radio) => {
      radio.addEventListener("change", (e) => {
        this.currentRadio = e.target;
        if (this.lastSelectedRadio != null) {
          this.lastSelectedRadio.dataset.esrespuesta = false;
        }
        
        this.currentRadio.dataset.esrespuesta = true;
      //Hay que decicidr como marcar la opcion que va a hacer triger a la otra
        if (this.currentRadio.dataset.escompleja == "true") {
          this.changeRquired(true);
        } else {
          this.changeRquired(false);
        }
        this.lastSelectedRadio = this.currentRadio;
      });
    });
  };


  changeRquired = (required) => {
    this.textAreaList.forEach((textArea) => {
      textArea.required = required;
      textArea.disabled = !required;
      if(!required){
          console.log("delete text")
          textArea.value= "";
          textArea.style.display ="none"
      }else
      textArea.style.display ="block"
    });
  };
}
