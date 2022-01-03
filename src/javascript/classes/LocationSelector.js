import { Item } from "./Item";
import { LocationLogic } from "./LocationLogic";
export class LocationSelector extends Item {
  constructor(questionType, questionText, optionsList, answersList) {
    super(questionType, questionText, optionsList, answersList);
  }

  async createContents(hasAnswers) {
    let selectProvincia = this.generateSelect(this.optionsList[0]);
    let selectCanton = this.generateSelect(this.optionsList[1]);
    let selectDistrito = this.generateSelect(this.optionsList[2]);

    selectProvincia.id = "provincias";
    selectCanton.id = "cantones";
    selectDistrito.id = "distritos";
    let locationLogic = new LocationLogic();

    let locationWrapper = document.createElement("div");
    locationWrapper.classList.add("form-location");

    await locationLogic.loadOptions(
      selectProvincia,
      selectCanton,
      selectDistrito
    );
    selectProvincia.value = this.answersList[0].valor;

    await locationLogic.selectProvinciasFunction(
      selectProvincia.value,
      selectCanton
    );

    selectCanton.value = this.answersList[1].valor;

    await locationLogic.selectCantonesFunction(
      selectCanton.value,
      selectDistrito
    );

    selectDistrito.value = this.answersList[2].valor;

    locationWrapper.append(selectProvincia);
    locationWrapper.append(selectCanton);
    locationWrapper.append(selectDistrito);
    this.htmlFormGroup.append(locationWrapper);
  }
}
