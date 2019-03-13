//all the api routers
const Router = require('koa-router');
const glob = require("glob")
const fs = require("fs")

const router = new Router();

const showdown  = require('showdown');
const converter = new showdown.Converter();

router.get('/api/articals', async(ctx, next) => {
    ctx.body = {
        code: 200,
        data: [{
            id: 1,
            title:'hello world',
            path: 'hello-world',
            date: '2019-03-13',
            tag: '随笔',
            summary: 'hello world!'
        }]
    }
})

router.get('/api/:path', async(ctx, next) => {
    let res = {}
    let {path} = ctx.params;

    try {
        res = await new Promise((resolve, reject) => {
            glob(`./articals/**/${path}.md`, {}, function (err, files) {
                if(err) {
                    reject();
                }else{
                    resolve(files[0] )
                }
            })
        }).then((file) => {
            return fs.readFileSync(file, 'utf-8');
        }).catch( e => {
            throw new Error(e);
        })
    } catch (error) {
        console.error('err');
        ctx.body = {
            code: 500,
            error: {
                msg: 'service error'
            }
        }
    }

    ctx.body = {
        code: 200,
        data: {
            text: converter.makeHtml(res)
        }
    }
})

module.exports = router;