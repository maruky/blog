//all the api routers
const Router = require('koa-router');
const glob = require("glob")
const fs = require("fs")

const router = new Router();

// const showdown  = require('showdown');
// const converter = new showdown.Converter();

router.get('/api/articals', async(ctx, next) => {
    ctx.body = {
        code: 200,
        data: [{
            id: 1,
            title:'【LeetCode】最长回文子串',
            path: 'Leetcode-最长回文子串',
            date: '2019-03-13',
            tag: 'leetCode',
            summary: '最长回文子串'
        },{
            id: 2,
            title:'Promise | 控制并发',
            path: 'promise | 并发',
            date: '2019-04-01',
            tag: 'promise',
            summary: '用Promise限制并发数量'
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
            text: res
        }
    }
})

module.exports = router;