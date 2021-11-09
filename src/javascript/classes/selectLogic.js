export class SelectTagLogic {
  currentOption;
  lastSelectedOption;
  selectList;
  inputList;
  constructor() {}

  changeSelectedOption = (selectWrapper) => {
    this.selectList = selectWrapper.querySelectorAll("select");
    this.inputList = selectWrapper.querySelectorAll("input");

    this.selectList.forEach((select) => {
      select.addEventListener("change", (e) => {
        console.log(e)
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
      if (!required) {
        console.log("delete text");
        input.value = "";
        input.style.display = "none";
      } else input.style.display = "block";
    });
  };
}
