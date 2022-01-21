export async function scriptsLoader(script_url) {
  return new Promise(function (resolve, reject) {
    if (scriptsLoader.loaded.has(script_url)) {
   
      resolve("hola");
    } else {
      let script = document.createElement("script");

      script.onload = resolve;
      script.onerror = reject;
      script.src = script_url;
      script.crossOrigin= "anonymous"

      document.body.appendChild(script);
    }
  });

  /*
  var promises = [];
  for (const script_url of script_urls) {
    console.log("Downloading script")
    promises.push(load(script_url).then(console.log()));
  }
 await Promise.all(promises).then((resultado) =>{
    console.log(resultado,"resolved");
 });

  for (const script_url of script_urls) {
    scriptsLoader.loaded.add(script_url);
  }
  */
}
