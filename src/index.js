import { componentes } from "./javascript/componentes";

  const UTIL = {
    
    fire : async function(func,funcname, args){
    
      var namespace = componentes;  // indicate your obj literal namespace here
      
      funcname = (funcname === undefined) ? 'init' : funcname;
      if (func !== '' && namespace[func] && typeof namespace[func][funcname] == 'function'){
        console.log("FIRING ", func,funcname);
        await namespace[func][funcname](args);
      }
  
    },
  
    loadEvents : async function(){
  
      var bodyId = document.body.id;
      
      // hit up common first.
      await UTIL.fire('common');

      // do all the classes too.
      let ia = 0
      $.each(document.body.className.split(/\s+/),async function(i,classnm){
   
       await UTIL.fire(classnm);
        await UTIL.fire(classnm,bodyId);
       
      }); 
  
      await UTIL.fire('common','finalize');
  
    }
  
  };
  
  // kick it all off here 
  document.addEventListener("DOMContentLoaded", async function(event) {
    await UTIL.loadEvents()
    
});


