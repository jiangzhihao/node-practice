let http = require('http');
let qs = require('querystring');

let server = http.createServer((req, res) => {
    if (req.url.startsWith('/favicon.ico')) {
        res.end('')
        return;
    }
    console.log('开启服务');
    res.setHeader('content-type', 'text/plaint;charset=utf-8');
    let [ path, params ] = req.url.split('?');
    if (path === '/add') {
        let { a, b } = qs.parse(params);
        if (isNaN(Number(a))) {
            res.end(`ERROR： 参数a数据类型不正确`)
            return;
        }
        if (isNaN(Number(b))) {
            res.end(`ERROR： 参数b数据类型不正确`)
            return;
        }
        res.end(`结果为： ${Number(a) + Number(b)}`)
        return;
    } else {
        res.end('ERROR, 接口为/add')
        return;
    }
})

server.listen(3000, 'localhost');
