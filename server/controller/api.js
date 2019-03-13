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
            title:'hello world',
            date: '2019-03-13',
            tag: '随笔',
            summary: 'hello world'
        }]
    }
})

router.get('/api/:date.:title', async(ctx, next) => {
    let res = {}
    let {date, title} = ctx.params;

    try {
        res = await new Promise((resolve, reject) => {
            glob(`./articals/**/${date}.${title}.md`, {}, function (err, files) {
                if(err) {
                    reject();
                }else{
                    resolve(files[0] )
                }
            })
        }).then((file) => {
            return fs.readFileSync(file, 'utf-8');
        })
    } catch (error) {
        console.err('err');
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