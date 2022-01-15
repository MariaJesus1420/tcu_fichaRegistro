export class RadioLogic {
  currentRadio;
  lastSelectedRadio;
  radioList;
  textAreaList;
  constructor() {}

  changeSelectedRadio = (radioWrapper) => {
    this.radioList = radioWrapper.querySelectorAll("input[type='radio']");
    this.textAreaList = radioWrapper.querySelectorAll(".extra");
    this.radioList.forEach((radio) => {
      radio.addEventListener("change", (e) => {
        this.currentRadio = e.target;
        if (this.lastSelectedRadio != null) {
          if (this.lastSelectedRadio.checkde == false) {
            this.lastSelectedRadio.dataset.esrespuesta = false;
          }
        }
        if (this.currentRadio.checked == true) {
          this.currentRadio.dataset.esrespuesta = true;
          if (this.currentRadio.dataset.escompleja == "true") {
            console.log("WORKING?");
      
          } else {
            
          }
        } else {
          this.currentRadio.dataset.esrespuesta = false;
        }

        //Hay que decicidr como marcar la opcion que va a hacer triger a la otra

        this.lastSelectedRadio = this.currentRadio;
      });
    });
  };

  changeRquired = (required) => {
    this.textAreaList.forEach((textArea) => {
      textArea.required = required;
      textArea.disabled = !required;
      textArea.querySelectorAll("textarea").forEach((element) => {
        element.dataset.esrespuesta = required;
      });
      if (!required) {
        textArea.value = "";
        textArea.style.display = "none";
      } else textArea.style.display = "block";
    });
  };
}
