const Koa = require('koa')
const bodyParser = require('koa-bodyparser');
const controller = require('./controller')
const templating = require('./templating');


const isProduction = process.env.NODE_ENV === 'production';
const app = new Koa();

// log request URL;
app.use(async(ctx, next)=>{
    console.log(`${ctx.request.method} ${ctx.request.url}`);
    await next();
});

if (! isProduction) {
    let staticFiles = require('./static-files');
    app.use(staticFiles('/static/', __dirname + '/static'));
}


app.use(bodyParser());
// add router middleware

app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));


app.use(controller());


app.listen(3000);
console.log('app started as port 3000...');