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
