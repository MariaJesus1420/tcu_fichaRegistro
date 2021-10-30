export async function linksLoader(link_url) {
  return new Promise(function (resolve, reject) {
    if (linksLoader.loaded.has(link_url)) {
      resolve();
    } else {
      var link = document.createElement("link");
      link.rel = "stylesheet";
      link.onload = resolve;
      link.onerror = reject
      link.href = link_url;
      document.head.appendChild(link);
    }
  });

  /*
    var promises = [];
    for (const link_url of links_urls) {
        promises.push(load(link_url));
    }
    await Promise.all(promises);
    for (const link_url of links_urls) {
        linksLoader.loaded.add(link_url);
    }
   */
}
