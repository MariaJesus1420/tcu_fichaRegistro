export async function scriptsLoader(script_urls) {
    function load(script_url) {
        return new Promise(function(resolve, reject) {
            if (scriptsLoader.loaded.has(script_url)) {
                resolve();
            } else {
                var script = document.createElement('script');
                script.onload = resolve;
                script.src = script_url
                document.head.appendChild(script);
            }
        });
    }
    var promises = [];
    for (const script_url of script_urls) {
        promises.push(load(script_url));
    }
    await Promise.all(promises);
    for (const script_url of script_urls) {
        scriptsLoader.loaded.add(script_url);
    }
   
}


