import { FirebaseINIT } from "./firebaseInit";
import { scriptsLoader } from "./scriptsLoader";
import { linksLoader } from "./linksLoader";
export const COMMON = {
  init: async () => {

    linksLoader.loaded = new Set();
    await linksLoader([
      "https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css",
      "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css",
    ]);
    
    scriptsLoader.loaded = new Set();
    await scriptsLoader([
      "https://code.jquery.com/jquery-3.6.0.slim.min.js",
      "https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js",
      "https://www.gstatic.com/firebasejs/8.6.7/firebase-app.js",
      "https://www.gstatic.com/firebasejs/8.6.7/firebase-auth.js",
      "https://www.gstatic.com/firebasejs/8.6.7/firebase-firestore.js",
    ]);

    // Now do stuff with those scripts.

    FirebaseINIT();

   
  },
};
