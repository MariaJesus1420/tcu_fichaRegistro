import { COMMON } from "./common";
import { HOME } from "./home";
import {EVENTS} from "./events"
import { FORMVIEWVER } from "./formViewver";
export const componentes = {
  common: {
    init: async () => {
      console.log("INIT COMMON");
      await COMMON.init();
    },
    finalize: function () {},
  },
  home: {
    init: async () => {
      await HOME.init();
    },
    cart: function () {
      console.log("CART");
    },
    category: function () {
      console.log("CATERGORY");
    },
  },
  events:{
    init: async ()=>{
      await EVENTS.init();
    }
  },
  formViewver:{
    init: async ()=>{
      await FORMVIEWVER.init();
    }
  }
};
