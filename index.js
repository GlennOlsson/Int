var http = require('http');
const axios = require('axios');

let token = "MOQB1G0864POXZQ6"

let mainURL = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=SNAP&apikey="

http.createServer(function (req, res) {
    res.write('<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta name="viewport"initial-scale=1.0"> <meta http-equiv="X-UA-Compatible" content="ie=edge"> <title>DECG</title> </head> <body> <input id="input"/> <button onclick="cl()">Skicka</button><script> function cl(){ console.log("click"); } </script> </body> </html>'); //write a response to the client
    res.end(); //end the response
}).listen(8080);

http.createServer(function (req, res) {
    let stockSymb = req.url.substring(1);

    GET(stockSymb).then((resp) => {
        let json = resp.data

        let tsd = json["Time Series (Daily)"];

        let yesterday = "2018-12-18"

        let close = tsd[yesterday]["4. close"];

        console.log(close)
        res.write(close); //write a response to the client
        res.end(); //end the response
    })

   
}).listen(8081);

function getURL(symb){
    return "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + symb + "&apikey=" + token
}

function GET(symb){    
    return axios(getRequestInstance(getURL(symb), "get", null))
        .then((response => response))
        .catch((error) => {
            onError(error)
            return error
        })
}

function getRequestInstance(symb, method, data){
    return {
        url: getURL(symb),
        method: method,
        baseURL: mainURL,
        data: data,
        
    }
}