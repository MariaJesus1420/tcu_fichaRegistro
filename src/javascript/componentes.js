import {COMMON} from "./common"
import { HOME } from "./home"
export const componentes = {
  common : {
    init     : COMMON.init(),
    finalize : function(){ }
  },
  home : {
    init     : HOME.init(),
    cart     : function(){ },
    category : function(){ }
  }
}