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