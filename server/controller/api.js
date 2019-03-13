//all the api routers
const Router = require('koa-router');

const router = new Router();

router.get('/api/:name', (ctx, next) => {
    ctx.body= ctx.params.name
})

module.exports = router;