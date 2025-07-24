const { createBareServer } = require('@tomphttp/bare-server-node');
const { createServer } = require('http');
const Fastify = require('fastify');
const fastifyStatic = require('@fastify/static');
const { join, dirname } = require('path');
const { Buffer } = require('buffer');
const AstralProxy = require('./astral_proxy/index');
const wisp = require("wisp-server-node");
const { epoxyPath } = require("@mercuryworkshop/epoxy-transport");
const { baremuxPath } = require("@mercuryworkshop/bare-mux/node");

const bare = createBareServer('/bare/', {
    compression: true,
    agent: new (require('https').Agent)({
        keepAlive: true,
        maxSockets: 50
    })
});

const fastify = Fastify({
    serverFactory: (handler) => {
        return createServer()
            .on("request", (req, res) => {
                res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
                res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
                handler(req, res);
            })
            .on("upgrade", (req, socket, head) => {
                if (req.url.endsWith("/wisp/")) wisp.routeRequest(req, socket, head);
                else socket.end();
            });
    },
});

// Initialize AstralProxy instances for both routes
const astralProxy = new AstralProxy('/astral/', {});
const proxProxy = new AstralProxy('/prox/', {});

// Cache objects
const cache = {
    suggestions: new Map(),
    gdomain: { data: null, timestamp: 0 }
};

// Cache configuration
const CACHE_TTL = {
    suggestions: 30 * 60 * 1000, // 30 minutes
    gdomain: 60 * 60 * 1000      // 1 hour
};

fastify.register(fastifyStatic, {
    root: join(__dirname, 'public'),
    prefix: '/',
    decorateReply: false,
});

fastify.register(fastifyStatic, {
    root: epoxyPath,
    prefix: "/epoxy/",
    decorateReply: false,
});

fastify.register(fastifyStatic, {
    root: baremuxPath,
    prefix: "/baremux/",
    decorateReply: false,
});

function decodeUrl(encodedUrl) {
    try {
        return Buffer.from(decodeURIComponent(encodedUrl), 'base64').toString('utf-8');
    } catch (err) {
        return null;
    }
}

// Helper function to safely decode base64
function safeBase64Decode(str) {
    try {
        // Clean the string first
        str = str.replace(/[^A-Za-z0-9+/=]/g, '');
        
        // Add padding if needed
        while (str.length % 4) {
            str += '=';
        }
        
        return Buffer.from(str, 'base64').toString('utf-8');
    } catch (error) {
        console.error('Base64 decode error:', error);
        return null;
    }
}

// Helper function to convert simple base64 URL to AstralProxy format
function convertToAstralFormat(path, prefix) {
    // Remove the prefix to get just the base64 part
    let base64Part = path.replace(prefix.slice(0, -1), '').replace(/^\//, '');
    
    // Clean up the base64 string - remove any URL encoding artifacts
    base64Part = decodeURIComponent(base64Part);
    s
    try {
        if (!/^[A-Za-z0-9+/]*={0,2}$/.test(base64Part)) {
            return null;
        }
        
        const fullUrl = safeBase64Decode(base64Part);
        if (!fullUrl) {
            return null;
        }
        
        if (!fullUrl.startsWith('http://') && !fullUrl.startsWith('https://')) {
            return null;
        }
        
        const url = new URL(fullUrl);
        
        const encodedOrigin = Buffer.from(url.origin).toString('base64');
        
        const pathPart = url.pathname === '/' ? '/' : url.pathname;
        
        const result = `/_${encodedOrigin}_${pathPart}${url.search}${url.hash}`;
        return result;
    } catch (error) {
        console.error('Error converting URL format:', error);
        return null;
    }
}

async function proxHandler(req, reply) {
    const nodeReq = req.raw;
    const nodeRes = reply.raw;
    
    reply.hijack();
    
    try {
  
        const originalUrl = nodeReq.url;
        const convertedPath = convertToAstralFormat(originalUrl, '/prox/');
        if (convertedPath) {
            nodeReq.url = '/prox' + convertedPath;
        } else {
            nodeRes.writeHead(400, { 'Content-Type': 'text/html' });
            nodeRes.end(`
                <h2>Invalid URL Format</h2>
                <p>Could not parse the provided base64 URL.</p>
                <p>You provided: <code>${originalUrl}</code></p>
                <p>Make sure your base64 encodes a valid HTTP/HTTPS URL.</p>
            `);
            return;
        }
        
        const next = () => {
            if (!nodeRes.headersSent) {
                nodeRes.writeHead(404, { 'Content-Type': 'text/plain' });
                nodeRes.end('Proxy path not found');
            }
        };
        
        proxProxy.http(nodeReq, nodeRes, next);
    } catch (error) {
        console.error('Prox proxy error:', error);
        if (!nodeRes.headersSent) {
            nodeRes.writeHead(500, { 'Content-Type': 'text/plain' });
            nodeRes.end('Proxy error occurred: ' + error.message);
        }
    }
}

async function astralHandler(req, reply) {
    const nodeReq = req.raw;
    const nodeRes = reply.raw;
    
    reply.hijack();
    
    try {
        
        const next = () => {
            if (!nodeRes.headersSent) {
                nodeRes.writeHead(404, { 'Content-Type': 'text/plain' });
                nodeRes.end('Proxy path not found');
            }
        };
        
        astralProxy.http(nodeReq, nodeRes, next);
    } catch (error) {
        console.error('Astral proxy error:', error);
        if (!nodeRes.headersSent) {
            nodeRes.writeHead(500, { 'Content-Type': 'text/plain' });
            nodeRes.end('Proxy error occurred: ' + error.message);
        }
    }
}

fastify.all('/prox/*', proxHandler);
fastify.all('/astral/*', astralHandler);

fastify.get("/gdomain/", async (req, reply) => {
    const now = Date.now();
    
    // Check if cache is valid
    if (cache.gdomain.data && (now - cache.gdomain.timestamp) < CACHE_TTL.gdomain) {
        reply.status(200).send(cache.gdomain.data);
        return;
    }
    
    try {
        const response = await fetch("https://raw.githubusercontent.com/Glitch-Network/glitch_net_domains/main/db.txt");
        const data = await response.text();
        
        // Update cache
        cache.gdomain.data = data;
        cache.gdomain.timestamp = now;
        
        reply.status(200).send(data);
    } catch (error) {
        // If fetch fails but we have cached data, serve it
        if (cache.gdomain.data) {
            reply.status(200).send(cache.gdomain.data);
        } else {
            reply.status(500).send({ error: "Failed to fetch the data" });
        }
    }
});

fastify.get('/search_complete/*', async (req, reply) => {
    const query = req.params['*'];
    if (!query) {
        reply.status(400).send('Search query is missing');
        return;
    }
    
    const now = Date.now();
    const cacheKey = query.toLowerCase();
    
    // Check cache first
    if (cache.suggestions.has(cacheKey)) {
        const cached = cache.suggestions.get(cacheKey);
        if ((now - cached.timestamp) < CACHE_TTL.suggestions) {
            reply.status(200).send(cached.data);
            return;
        }
        // Remove expired entry
        cache.suggestions.delete(cacheKey);
    }
    
    try {
        const response = await fetch(`https://google.com/complete/search?client=firefox&hl=en&q=${encodeURIComponent(query)}`);
        const suggestions = await response.json();
        
        // Cache the result
        cache.suggestions.set(cacheKey, {
            data: suggestions,
            timestamp: now
        });
        
        // Limit cache size (keep last 1000 entries)
        if (cache.suggestions.size > 1000) {
            const oldestKey = cache.suggestions.keys().next().value;
            cache.suggestions.delete(oldestKey);
        }
        
        reply.status(200).send(suggestions);
    } catch (error) {
        console.error('Error fetching search suggestions:', error);
        reply.status(500).send('no search results.');
    }
});

// 404 handler
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
    } else if (req.url.endsWith("/wisp/")) {
        wisp.routeRequest(req, socket, head);
    } else {
        // Handle WebSocket upgrades for AstralProxy instances
        if (req.url.startsWith('/prox/')) {
            // Let the proxProxy handle its own WebSocket upgrades
            try {
                proxProxy.ws(req, socket, head);
            } catch (error) {
                console.error('Prox WebSocket error:', error);
                socket.end();
            }
        } else if (req.url.startsWith('/astral/')) {
            // Let the astralProxy handle its own WebSocket upgrades
            try {
                astralProxy.ws(req, socket, head);
            } catch (error) {
                console.error('Astral WebSocket error:', error);
                socket.end();
            }
        } else {
            socket.end();
        }
    }
});

setInterval(() => {
    const now = Date.now();
    
    // Clean expired suggestions
    for (const [key, value] of cache.suggestions.entries()) {
        if ((now - value.timestamp) > CACHE_TTL.suggestions) {
            cache.suggestions.delete(key);
        }
    }
    
}, 10 * 60 * 1000); // Every 10 minutes

server.listen(process.env.PORT || 8080, () => {
    console.log(`Server listening on port ${process.env.PORT || 8080}`);
    console.log(`Prox proxy available at /prox/`);
    console.log(`Astral proxy available at /astral/`);
    console.log(`Bare proxy available at /bare/`);
});