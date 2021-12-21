export class SelectTagLogic {
  currentOption;
  lastSelectedOption;
  selectList;
  inputList;
  extra;
  constructor() {}

  changeSelectedOption = (selectWrapper) => {
    this.selectList = selectWrapper.querySelectorAll("select");
    this.inputList = selectWrapper.querySelectorAll(".extra");

    this.selectList.forEach((select) => {
      select.addEventListener("change", (e) => {
   
        this.getCurrentSelectedOption(e.target);

        if (this.lastSelectedOption == null) {
          this.lastSelectedOption = e.target.options[0];
        }

        if (this.currentOption.dataset.escompleja == "true") {
          this.changeRquired(true);
        } else {
          this.changeRquired(false);
        }
        this.lastSelectedOption.dataset.esrespuesta = false;
        this.currentOption.dataset.esrespuesta = true;
        this.lastSelectedOption = this.currentOption;
      });
    });
  };

  getCurrentSelectedOption = (selectTag) => {
 
    this.currentOption = selectTag.options[selectTag.selectedIndex];
    
  };

  changeRquired = (required) => {
    this.inputList.forEach((input) => {
      input.required = required;
      input.disabled = !required;
      input.querySelectorAll("input").forEach(element => {  
        element.dataset.esrespuesta=required
      });
      if (!required) {
    
        
        input.style.display = "none";
      } else input.style.display = "block";
    });
  };
}
