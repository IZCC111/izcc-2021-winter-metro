const {google} = require('googleapis');
const keys = require('./keys.json');
const ejs = require('ejs');
const express = require('express');
const path = require('path');
const app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/node_modules',express.static(path.join(__dirname,'node_modules')))


const client = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    ['https://www.googleapis.com/auth/spreadsheets.readonly']
);


client.authorize(function (err, tokens) {

    if (err) {
        console.log(err);
        return;
    } else {
        console.log('Connected!');
        gsrun(client);
    }
});


async function gsrun(cl) {
    const gsapi = google.sheets({version: 'v4', auth: cl});


    const optlati = {
        spreadsheetId: '18f7rUUJ_0Vq7IJ20v4Rm_uPp75g0aXHNsjWLqNnW6Ec',
        range: 'coordinates!B1:B98'
    };
    const optlong = {
        spreadsheetId: '18f7rUUJ_0Vq7IJ20v4Rm_uPp75g0aXHNsjWLqNnW6Ec',
        range: 'coordinates!C1:C98'
    };
    const opteki = {
        spreadsheetId: '18f7rUUJ_0Vq7IJ20v4Rm_uPp75g0aXHNsjWLqNnW6Ec',
        range: 'coordinates!A1:A98'
    };
    const optbgc = {
        spreadsheetId: '18f7rUUJ_0Vq7IJ20v4Rm_uPp75g0aXHNsjWLqNnW6Ec',
        range: 'coordinates!D1:D98'
    };
    const optimg = {
        spreadsheetId: '18f7rUUJ_0Vq7IJ20v4Rm_uPp75g0aXHNsjWLqNnW6Ec',
        range: 'coordinates!E1:E98'
    };
    const opttopic = {
        spreadsheetId: '18f7rUUJ_0Vq7IJ20v4Rm_uPp75g0aXHNsjWLqNnW6Ec',
        range: 'topic!B1:B98'
    };
    const optteki = {
        spreadsheetId: '18f7rUUJ_0Vq7IJ20v4Rm_uPp75g0aXHNsjWLqNnW6Ec',
        range: 'topic!A1:B98'
    };

    app.get('/', async function (req, res) {
        let lati = await gsapi.spreadsheets.values.get(optlati);
        let long = await gsapi.spreadsheets.values.get(optlong);
        let eki = await gsapi.spreadsheets.values.get(opteki);
        let bgc = await gsapi.spreadsheets.values.get(optbgc);
        let img = await gsapi.spreadsheets.values.get(optimg);
        let topic = await gsapi.spreadsheets.values.get(opttopic);
        let teki = await gsapi.spreadsheets.values.get(optteki);

        let latiArray = [];
        let longArray = [];
        let ekiArray = [];
        let bgcArray = [];
        let imgArray = [];
        let tekiArray =[],topicArray=[]
        for (let i = 0; i < lati.data.values.length; i++) {
            latiArray[i] = lati.data.values[i][0];
            longArray[i] = long.data.values[i][0];
            ekiArray[i] = eki.data.values[i][0];
            bgcArray[i] = bgc.data.values[i][0];
            imgArray[i] = img.data.values[i][0];
        }
        for (let i = 0; i < teki.data.values.length; i++) {
            tekiArray[i]= teki.data.values[i][0];
            topicArray[i]=topic.data.values[i][0];
        }
        res.render('index', {
            latitude: latiArray,
            longitude: longArray,
            len: latiArray.length,
            eki: ekiArray,
            bgc: bgcArray,
            img: imgArray,
            teki:tekiArray,
            topic:topicArray
        });
    });

}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server up and running on ' + process.env.PORT + ' or 3000'));