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
        if (this.currentRadio.dataset.compleja == "true") {
          this.changeRquired(true);
        } else {
          this.changeRquired(false);
        }
        this.lastSelectedRadio = this.currentRadio;
      });
    });
  };

  findSelected = () => {
    this.radioList.forEach((radio) => {
      if (radio.checked == true) {
        return radio;
      }
    });
    return null;
  };

  changeRquired = (required) => {
    this.textAreaList.forEach((textArea) => {
      textArea.required = required;
      textArea.disabled = !required;
      if(!required){
          console.log("delete text")
          textArea.value= "";
      }
    });
  };
}
