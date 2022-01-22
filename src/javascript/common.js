import { FirebaseINIT } from "./firebaseInit";
import { scriptsLoader } from "./scriptsLoader";
import { linksLoader } from "./linksLoader";

export const COMMON = {
  init: async () => {
    let listaDeScripts = [
     
      "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js",
      
      "https://kit.fontawesome.com/5fc4fd5412.js",
      "https://cdn.jsdelivr.net/npm/fullcalendar/main.js",
     
      "https://www.gstatic.com/firebasejs/8.6.7/firebase-app.js",
      "https://www.gstatic.com/firebasejs/8.6.7/firebase-auth.js",
      "https://www.gstatic.com/firebasejs/8.6.7/firebase-firestore.js",
      "https://cdn.jsdelivr.net/npm/fullcalendar/locales/es.js"

    ];

    let listaDeLinks = [
      "https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css",
      "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css",
      "https://cdn.jsdelivr.net/npm/fullcalendar/main.css",
      "https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.13.1/css/all.css",
    ];

    let promises = [];


    listaDeLinks.map(async (element) => {
      linksLoader.loaded = new Set();

      promises.push(linksLoader([element]));
    });





    await Promise.all(promises).then((result) => {
    
      promises = []
    }).catch((error)=>{
      console.log("Something went wrong >>" , error);
    })


    listaDeLinks.map(async (element) => {
      linksLoader.loaded = new Set();

      promises.push(linksLoader([element]));
    });


    listaDeScripts.map(async (element) => {

      scriptsLoader.loaded = new Set();
      promises.push(scriptsLoader([element]));
    });


    await Promise.all(promises).then(
      async (result) => {
    
      
        scriptsLoader("https://cdn.jsdelivr.net/npm/fullcalendar/locales/es.js")
        scriptsLoader("https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js")
        console.log("LOADING FIRESTORE");
        await FirebaseINIT();
        console.log("FINISH COMMON");
      }
      
    ).catch((error)=>{
      console.log("Links wrong ," , error);
    });
    // Now do stuff with those scripts.
  
  },
};
