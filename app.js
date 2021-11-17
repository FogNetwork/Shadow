/*
Copyright © Fog Network
Made by Nebelung
MIT license: https://opensource.org/licenses/MIT
*/

const express = require('express')
const app = express()
const config = require('./config.json')
const port = process.env.PORT || config.port
const Corrosion = require('./lib/server')

const proxy = new Corrosion({
    prefix: config.prefix,
    codec: config.codec,
    title: "Shadow",
    forceHttps: true,
    requestMiddleware: [
        Corrosion.middleware.blacklist([
            'accounts.google.com',
        ], 'Page is blocked'),
    ]
});

proxy.bundleScripts();

app.use(express.static('./public', {
    extensions: ['html']
}));

app.get('/', function(req, res){
    res.sendFile('index.html', {root: './public'});
});

app.use(function (req, res) {
    if (req.url.startsWith(proxy.prefix)) {
      proxy.request(req,res);
    } else {
      res.status(404).sendFile('404.html', {root: './public'});
    }
})

app.listen(port, () => {
    console.log(`Shadow is running at localhost:${port}`)
})