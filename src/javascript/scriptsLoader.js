export async function scriptsLoader(script_urls) {
  function load(script_url) {
    return new Promise(function (resolve, reject) {
        
      if (scriptsLoader.loaded.has(script_url)) {
        console.log("RESOLVED");
        resolve();
      } else {
        let script = document.createElement("script");

        script.onload =  ()=>{
            console.log("resolved");
            resolve(script);
        };
        script.src = script_url;
        document.head.appendChild(script);
        
      }
    });
  }
  var promises = [];
  for (const script_url of script_urls) {
    promises.push(load(script_url));
  }
 await Promise.all(promises).then((resultado) =>{
    resultado.forEach(element => {
        document.head.appendChild(element);
     });
 });

  for (const script_url of script_urls) {
    scriptsLoader.loaded.add(script_url);
  }
}
