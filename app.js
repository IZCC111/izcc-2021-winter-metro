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
        range: 'coordinates!B1:B100'
    };
    const optlong = {
        spreadsheetId: '18f7rUUJ_0Vq7IJ20v4Rm_uPp75g0aXHNsjWLqNnW6Ec',
        range: 'coordinates!C1:C100'
    };
    const opteki = {
        spreadsheetId: '18f7rUUJ_0Vq7IJ20v4Rm_uPp75g0aXHNsjWLqNnW6Ec',
        range: 'coordinates!A1:A100'
    };
    const optbgc = {
        spreadsheetId: '18f7rUUJ_0Vq7IJ20v4Rm_uPp75g0aXHNsjWLqNnW6Ec',
        range: 'coordinates!D1:D100'
    };
    const optimg = {
        spreadsheetId: '18f7rUUJ_0Vq7IJ20v4Rm_uPp75g0aXHNsjWLqNnW6Ec',
        range: 'coordinates!E1:E100'
    };
    const opttopic = {
        spreadsheetId: '18f7rUUJ_0Vq7IJ20v4Rm_uPp75g0aXHNsjWLqNnW6Ec',
        range: 'topic!B1:B100'
    };
    const optteki = {
        spreadsheetId: '18f7rUUJ_0Vq7IJ20v4Rm_uPp75g0aXHNsjWLqNnW6Ec',
        range: 'topic!A1:B100'
    };
    const optteam = {
        spreadsheetId: '18f7rUUJ_0Vq7IJ20v4Rm_uPp75g0aXHNsjWLqNnW6Ec',
        range: 'team!B1:E1'
    };
    const optteameki = {
        spreadsheetId: '18f7rUUJ_0Vq7IJ20v4Rm_uPp75g0aXHNsjWLqNnW6Ec',
        range: 'team!B2:E2'
    };
    const optteampoint = {
        spreadsheetId: '18f7rUUJ_0Vq7IJ20v4Rm_uPp75g0aXHNsjWLqNnW6Ec',
        range: 'team!B3:E3'
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

    app.get('/teams', async function (req, res) {
        let lati = await gsapi.spreadsheets.values.get(optlati);
        let long = await gsapi.spreadsheets.values.get(optlong);
        let bgc = await gsapi.spreadsheets.values.get(optbgc);
        let team = await gsapi.spreadsheets.values.get(optteam);
        let teameki = await gsapi.spreadsheets.values.get(optteameki);
        let teampoint = await gsapi.spreadsheets.values.get(optteampoint);

        let latiArray = [];
        let longArray = [];
        let bgcArray = [];
        let teamArray = [];
        let teamekiArray = [];
        let teampointArray = [];
        for (let i = 0; i < lati.data.values.length; i++) {
            latiArray[i] = lati.data.values[i][0];
            longArray[i] = long.data.values[i][0];
            bgcArray[i] = bgc.data.values[i][0];
            teamArray[i] = team.data.values[0][i];
            teamekiArray[i] = teameki.data.values[0][i];
            teampointArray[i] = teampoint.data.values[0][i];
        }
        res.render('teams', {
            latitude: latiArray,
            len: latiArray.length,
            longitude: longArray,
            bgc: bgcArray,
            team: teamArray,
            teameki: teamekiArray,
            teampoint: teampointArray
        });
    });

}



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server up and running on ' + process.env.PORT + ' or 3000'));