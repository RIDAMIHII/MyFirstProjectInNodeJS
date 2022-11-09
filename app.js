var http = require('http');
var fs = require('fs');
const url = require('url');
const { randomFillSync, createSecretKey } = require('crypto');
const querystring = require('querystring');
const replaceHtml = require('./modules/replacesHtml')


// var path = url.parse("https://www.researchgate.net/profile/Achref-Mouelhi-2");
// console.log(path);


var html = fs.readFileSync('./template/index.html','utf-8');
var products = JSON.parse(fs.readFileSync('./data/poduct.json','utf-8'));
var productList = fs.readFileSync('./template/product.html','utf-8');
var productDetail = fs.readFileSync('./template/prodDetail.html','utf-8');



// let productsArray=products.map((prod)=>{
//     let output=productList.replace('{{%IMAGE%}}',prod.productImage);
//     output=output.replace("{{%NAME%}}",prod.name);
//     output=output.replace("{{%MODELNAME%}}",prod.modelName);
//     output=output.replace("{{%MODELNUMBER%}}",prod.modelNumber);
//     output=output.replace("{{%SIZE%}}",prod.size);
//     output=output.replace("{{%CAMERA%}}",prod.camera);
//     output=output.replace("{{%PRICE%}}",prod.price);
//     output=output.replace("{{%COLOR%}}",prod.color);
//     output=output.replace("{{%id%}}",prod.id);
//     return output;
// })


// function replaceHtml(template,product){
//     let output=template.replace('{{%IMAGE%}}',product.productImage);
//     output=output.replace("{{%NAME%}}",product.name);
//     output=output.replace("{{%MODELNAME%}}",product.modelName);
//     output=output.replace("{{%MODELNUMBER%}}",product.modelNumber);
//     output=output.replace("{{%SIZE%}}",product.size);
//     output=output.replace("{{%CAMERA%}}",product.camera);
//     output=output.replace("{{%PRICE%}}",product.price);
//     output=output.replace("{{%COLOR%}}",product.color);
//     output=output.replace("{{%id%}}",product.id);
//     output=output.replace("{{%description%}}",product.description);
//     return output;
// }

var server = http.createServer((req,res)=>{
    //var Path = req.url;
    //var path = querystring.parse((url.parse(Path)).query);
    let {query,pathname:path}= url.parse(req.url,true);
    //console.log(x);
    
    //console.log(url.parse(req.url,true););

    // console.log(url.parse(path));
     //console.log(path);

    if(path === '/' || path === '/home'){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end(html.replace('{{%content%}}', productsArray.join('')));
    }
    
    else if (path === '/about'){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end(html.replace('{{%content%}}', 'ABout'));
    }
    else if (path === '/contact'){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end(html.replace('{{%content%}}', 'Contact'));
    }
    else if (path === '/product'){
            if(!query.id){
            res.writeHead(200,{'Content-Type':'text/html'});
            // res.end(html.replace('{{%content%}}',productsArray.join('')));

            let productHtmlArray = products.map((prod)=>{
                return replaceHtml(productList,prod);
    
            })

            let productresponseHtml = html.replace('{{%content%}}',productHtmlArray.join(''));

            res.end(productresponseHtml);

            }
            else{
                //res.end("the ID for this product is "+ query.id);
                let prod = products[query.id];
                let productDetailHtml = replaceHtml(productDetail,prod);
                res.end(html.replace('{{%content%}}',productDetailHtml));

            }
    }
  
    
    else{
        res.writeHead(404,{'Content-Type':'text/plain'});
        res.end('404 Not Found');
    }
})


server.listen(8000,()=>{
    console.log("Rida Mihi");
})