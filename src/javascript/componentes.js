import {COMMON} from "./common"
import { HOME } from "./home"
export const componentes = {
  common : {
    init     : async ()=>{await COMMON.init()},
    finalize : function(){ }
  },
  home : {
    init     : async ()=>{await HOME.init() },
    cart     : function(){console.log("CART"); },
    category : function(){console.log("CATERGORY"); }
  }
}