export class selectTagLogic {
  currentOption;
  lastSelectedOption;
  constructor() {}

  changeSelectedOption = (selectTag) => {
    selectTag.addEventListener("change", () => {
      this.getCurrentSelectedOption(selectTag);

      if (this.lastSelectedOption == null) {
        this.lastSelectedOption = selectTag.options[0];
      }

      this.lastSelectedOption.dataset.esrespuesta = false;
      this.currentOption.dataset.esrespuesta = true;
      this.lastSelectedOption = this.currentOption;
    });
  };

  getCurrentSelectedOption = (selectTag) => {
    this.currentOption = selectTag.options[selectTag.selectedIndex];
  };
}

export class CheckBoxLogic{
  constructor(){}

  changeSelectedCheckBox = (checkBoxList)=>{
    checkBoxList.forEach(checkBox => {
      checkBox.addEventListener("change",(e)=>{
        console.log("click")
        if(e.target.checked == true){
          e.target.dataset.esrespuesta = true
        }else{
          e.target.dataset.esrespuesta = false
        }
      })
    });
  }
}

//Modificar esto para que aplique la logica para cada div que encierra los input y no todos los radios
export class radioLogic {
  currentRadio;
  lastSelectedRadio;
  radioList;
  constructor() {
 
  }

  changeSelectedRadio = (radioWrapper) => {
    this.radioList = radioWrapper.querySelectorAll("input[type='radio']");
    this.radioList.forEach((radio) => {
      console.log(radio)
      radio.addEventListener("change", (e) => {
        console.log("HOLA")
        this.currentRadio = e.target;
        if (this.lastSelectedRadio != null) {
          this.lastSelectedRadio.dataset.esrespuesta = false;
        }
        this.currentRadio.dataset.esrespuesta = true;
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
}
