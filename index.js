const { createBareServer } = require('@tomphttp/bare-server-node');
   const { createServer } = require('http');
   const Fastify = require('fastify');
   const fastifyStatic = require('@fastify/static');
   const { join } = require('path');
   const httpProxy = require('http-proxy');
   const wisp = require("wisp-server-node");
   const bare = createBareServer('/bare/');
   const fastify = Fastify();

   const proxyServer = httpProxy.createProxyServer();
   
   console.log("Fetching proxies...");
   
   fastify.register(fastifyStatic, {
       root: join(__dirname, 'public'),
       prefix: '/',
       decorateReply: false,
       setHeaders: (res, path) => {
           if (path.endsWith('.js')) {
               res.setHeader('Content-Type', 'application/javascript');
           }
       }
   });

   let active_users = 0
   let message = ""

   fastify.get('/any-message/*', async (req, reply) => {
       message = req.params['*'].replace("+"," ");

       // to use visit / 

       // im *sure* nobody will abuse this!!!!!!!!!!!!!!!!!!!!!!!!!!!
       const hasHtml = /<[^>]*>/g.test(message);
       if (hasHtml) {
           reply.status(400).send('trying to html inject in the big 25 :withered_rose:');
           return;
       }
       reply.send('ok')
   })

   fastify.get('/message/', async (req, reply) => {
       reply.send(message)
   })

   fastify.get("/register-active/", async (req, reply) => {
       active_users += 1
       setTimeout(() => {
           active_users -= 1
       }, 30 * 60 * 1000) // 30 minutes 
       reply.send(active_users)
   })
 
   fastify.get('/search_complete/*', async (req, reply) => {
       const query = req.params['*']; // Get the search query from the URL path
       if (!query) {
           reply.status(400).send('Search query is missing');
           return;
       }
   
       try {
           const response = await fetch(`https://google.com/complete/search?client=firefox&hl=en&q=${encodeURIComponent(query)}`);
           const suggestions = await response.json();
           reply.status(200).send(suggestions);
       } catch (error) {
           console.error('Error fetching search suggestions:', error);
           reply.status(500).send('no search results.');
       }
   });
   
   // 404 handler for all undefined routes
   fastify.setNotFoundHandler((req, reply) => {
       reply.status(404).sendFile('404.html', { root: join(__dirname, 'public') });
   });
   
   const server = createServer();
   
   server.on('request', (req, res) => {
       if (bare.shouldRoute(req)) {
           bare.routeRequest(req, res);
           return;
       }
   
       fastify.ready(err => {
           if (err) throw err;
           fastify.server.emit('request', req, res);
       });
   });
   

   
   server.on('upgrade', (req, socket, head) => {
       if (bare.shouldRoute(req, socket, head)) {
           bare.routeUpgrade(req, socket, head);
       } else {
           socket.end();
       }
   });
   
   server.listen(process.env.PORT || 8080, () => {
       console.log(`Server listening on port ${process.env.PORT || 8080}`);
   });