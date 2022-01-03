import { Item } from "./Item";
import { LocationLogic } from "./LocationLogic";
export class LocationSelector extends Item {
  constructor(questionType, questionText, optionsList, answersList) {
    super(questionType, questionText, optionsList, answersList);
  }

  async createContents(hasAnswers) {
    let provinciaValue = 1
    let cantonValue = 1
    let distritoValue = 1

    let disabled = true
    if(hasAnswers){
      provinciaValue = this.answersList[0].valor;
      cantonValue = this.answersList[1].valor;
      distritoValue = this.answersList[2].valor;
    }else{
      disabled = false
    }
    console.log("disabled = ",disabled)
    let selectProvincia = this.generateSelect(this.optionsList[0],disabled);
    let selectCanton = this.generateSelect(this.optionsList[1],disabled);
    let selectDistrito = this.generateSelect(this.optionsList[2],disabled);

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
    selectProvincia.value = provinciaValue;

    await locationLogic.selectProvinciasFunction(
      selectProvincia.value,
      selectCanton
    );

    selectCanton.value = cantonValue;

    await locationLogic.selectCantonesFunction(
      selectCanton.value,
      selectDistrito
    );

    selectDistrito.value = distritoValue;

    locationWrapper.append(selectProvincia);
    locationWrapper.append(selectCanton);
    locationWrapper.append(selectDistrito);
    this.htmlFormGroup.append(locationWrapper);
  }
}
