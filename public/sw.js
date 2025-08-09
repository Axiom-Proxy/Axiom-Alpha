importScripts('./uv/uv.bundle.js');
importScripts('./uv/uv.config.js');
importScripts('./uv/uv.sw.js');

const uv = new UVServiceWorker();
let cached_plugin = ""

self.addEventListener('fetch', event => {
    event.respondWith(
        (async ()=>{
            // dont let github bitch
            if(event.request.url.startsWith("https://raw.githubusercontent.com/Axiom-Proxy/Axiom-Plugins-Directory/refs/heads/main/plugins.json")){
                if (cached_plugin == "") {
                    cached_plugin = await fetch(event.request);
                }
                return cached_plugin.clone();
            }


            if(event.request.url.startsWith(location.origin + __uv$config.prefix) && event.request.url != "https://raw.githubusercontent.com/Axiom-Proxy/Axiom-Plugins-Directory/refs/heads/main/plugins.json"){
                return await uv.fetch(event);
            }
            return await fetch(event.request);
        })()
    );
});