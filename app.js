const {google} = require('googleapis');
const keys = require('./keys.json');
const ejs = require('ejs');
const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const app = express();
const SECRET = 'IZCC2021winterjizz';
require('events').EventEmitter.defaultMaxListeners = 0

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended: false}))
app.use(cookieParser());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')))


const client = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
);


client.authorize(function (err, tokens) {

    if (err) {
        console.log(err);

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
    const optusername = {
        spreadsheetId: '18f7rUUJ_0Vq7IJ20v4Rm_uPp75g0aXHNsjWLqNnW6Ec',
        range: 'team!B4:E4'
    };
    const optpassword = {
        spreadsheetId: '18f7rUUJ_0Vq7IJ20v4Rm_uPp75g0aXHNsjWLqNnW6Ec',
        range: 'team!B5:E5'
    };
    const optpropsname = {
        spreadsheetId: '18f7rUUJ_0Vq7IJ20v4Rm_uPp75g0aXHNsjWLqNnW6Ec',
        range: 'team!A6:A16'
    };
    const optpropsq0 = {
        spreadsheetId: '18f7rUUJ_0Vq7IJ20v4Rm_uPp75g0aXHNsjWLqNnW6Ec',
        range: 'team!B6:B16'
    };
    const optpropsq1 = {
        spreadsheetId: '18f7rUUJ_0Vq7IJ20v4Rm_uPp75g0aXHNsjWLqNnW6Ec',
        range: 'team!C6:C16'
    };
    const optpropsq2 = {
        spreadsheetId: '18f7rUUJ_0Vq7IJ20v4Rm_uPp75g0aXHNsjWLqNnW6Ec',
        range: 'team!D6:D16'
    };
    const optpropsqa = {
        spreadsheetId: '18f7rUUJ_0Vq7IJ20v4Rm_uPp75g0aXHNsjWLqNnW6Ec',
        range: 'team!E6:E16'
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
        let tekiArray = [], topicArray = []
        for (let i = 0; i < lati.data.values.length; i++) {
            latiArray[i] = lati.data.values[i][0];
            longArray[i] = long.data.values[i][0];
            ekiArray[i] = eki.data.values[i][0];
            bgcArray[i] = bgc.data.values[i][0];
            imgArray[i] = img.data.values[i][0];
        }
        for (let i = 0; i < teki.data.values.length; i++) {
            tekiArray[i] = teki.data.values[i][0];
            topicArray[i] = topic.data.values[i][0];
        }
        res.render('index', {
            latitude: latiArray,
            longitude: longArray,
            len: latiArray.length,
            eki: ekiArray,
            bgc: bgcArray,
            img: imgArray,
            teki: tekiArray,
            topic: topicArray
        });
    });

    app.get('/teams', async function (req, res) {
        let lati = await gsapi.spreadsheets.values.get(optlati);
        let long = await gsapi.spreadsheets.values.get(optlong);
        let eki = await gsapi.spreadsheets.values.get(opteki);
        let bgc = await gsapi.spreadsheets.values.get(optbgc);
        let team = await gsapi.spreadsheets.values.get(optteam);
        let teameki = await gsapi.spreadsheets.values.get(optteameki);
        let teampoint = await gsapi.spreadsheets.values.get(optteampoint);
        let tusername = await gsapi.spreadsheets.values.get(optusername);
        let cookietoken = req.cookies.token;
        var tokenusername = "NULL";
        if (cookietoken) {
            jwt.verify(cookietoken, SECRET, function (err) {
                if (err) {
                    console.log("token錯誤");
                    res.redirect('/');
                    //token過期判斷
                }
            })
        }
        let tusernameArray = [];
        let latiArray = [];
        let longArray = [];
        let ekiArray = [];
        let bgcArray = [];
        let teamArray = [];
        let teamekiArray = [];
        let teampointArray = [];
        var nowteam = "未登入";
        var btnin = "block";
        var btnout = "none"
        for (let i = 0; i < tusername.data.values[0].length; i++) {
            tusernameArray[i] = tusername.data.values[0][i];
        }
        for (let i = 0; i < lati.data.values.length; i++) {
            latiArray[i] = lati.data.values[i][0];
            longArray[i] = long.data.values[i][0];
            ekiArray[i] = eki.data.values[i][0];
            bgcArray[i] = bgc.data.values[i][0];
            teamArray[i] = team.data.values[0][i];
            teamekiArray[i] = teameki.data.values[0][i];
            teampointArray[i] = teampoint.data.values[0][i];
        }
        if (cookietoken) {
            var detoken = jwt.verify(cookietoken, SECRET);
            tokenusername = detoken.username;
            console.log(tokenusername);
            for (let i = 0; i < tusername.data.values[0].length; i++) {
                if (tokenusername === tusernameArray[i]) {
                    nowteam = teamArray[i];
                }
            }
            btnin = "none";
            btnout = "block";
        }

        res.render('teams', {
            latitude: latiArray,
            len: latiArray.length,
            longitude: longArray,
            eki: ekiArray,
            bgc: bgcArray,
            team: teamArray,
            teameki: teamekiArray,
            teampoint: teampointArray,
            nowteam: nowteam,
            btnin: btnin,
            btnout: btnout
        });
    });

    app.post('/nowieki', async function (req, res) {
        console.log(req.body.noweki);
        var noweki = req.body.noweki;
        let cookietoken = req.cookies.token;
        const updeki0 = {
            spreadsheetId: '18f7rUUJ_0Vq7IJ20v4Rm_uPp75g0aXHNsjWLqNnW6Ec',
            range: 'team!B2',
            valueInputOption: 'USER_ENTERED',
            resource: {"values": [[noweki]]}
        }
        const updeki1 = {
            spreadsheetId: '18f7rUUJ_0Vq7IJ20v4Rm_uPp75g0aXHNsjWLqNnW6Ec',
            range: 'team!C2',
            valueInputOption: 'USER_ENTERED',
            resource: {"values": [[noweki]]}
        }
        const updeki2 = {
            spreadsheetId: '18f7rUUJ_0Vq7IJ20v4Rm_uPp75g0aXHNsjWLqNnW6Ec',
            range: 'team!D2',
            valueInputOption: 'USER_ENTERED',
            resource: {"values": [[noweki]]}
        }
        const updekia = {
            spreadsheetId: '18f7rUUJ_0Vq7IJ20v4Rm_uPp75g0aXHNsjWLqNnW6Ec',
            range: 'team!E2',
            valueInputOption: 'USER_ENTERED',
            resource: {"values": [[noweki]]}
        }
        let tusername = await gsapi.spreadsheets.values.get(optusername);
        let tusernameArray = [];
        for (let i = 0; i < tusername.data.values[0].length; i++) {
            tusernameArray[i] = tusername.data.values[0][i];
        }
        if (cookietoken) {
            var detoken = jwt.verify(cookietoken, SECRET);
            tokenusername = detoken.username;
            console.log(tokenusername);
            for (let i = 0; i < tusername.data.values[0].length; i++) {
                if (tokenusername === tusernameArray[i]) {
                    switch (i) {
                        case 0:
                            await gsapi.spreadsheets.values.update(updeki0);
                            break;
                        case 1:
                            await gsapi.spreadsheets.values.update(updeki1);
                            break;
                        case 2:
                            await gsapi.spreadsheets.values.update(updeki2);
                            break;
                        case 3:
                            await gsapi.spreadsheets.values.update(updekia);
                            break;
                    }
                }
            }
            res.send("")
        }
    });

    app.post('/logout', function (req, res) {
        res.clearCookie('token');
        res.redirect('/');
    });

    app.post('/login', async function (req, res) {
        console.log(req.body);
        let username = await gsapi.spreadsheets.values.get(optusername);
        let password = await gsapi.spreadsheets.values.get(optpassword);
        let usernameArray = [];
        let passwordArray = [];
        for (let i = 0; i < username.data.values[0].length; i++) {
            usernameArray[i] = username.data.values[0][i];
            passwordArray[i] = password.data.values[0][i];
        }
        var iusername = req.body.username;
        var ipassword = req.body.password;
        for (let i = 0; i < username.data.values[0].length; i++) {
            if (iusername === usernameArray[i]) {
                if (ipassword === passwordArray[i]) {
                    var token = jwt.sign({username: iusername}, SECRET, {expiresIn: '1h'});

                    console.log(token)
                    res.cookie("token", token).redirect(req.get('referer'));

                }
            }
        }
    });

    app.get('/props', async function (req, res) {
        let cookietoken = req.cookies.token;
        let lati = await gsapi.spreadsheets.values.get(optlati);
        let long = await gsapi.spreadsheets.values.get(optlong);
        let eki = await gsapi.spreadsheets.values.get(opteki);
        let bgc = await gsapi.spreadsheets.values.get(optbgc);
        let latiArray = [];
        let longArray = [];
        let ekiArray = [];
        let bgcArray = [];
        for (let i = 0; i < lati.data.values.length; i++) {
            latiArray[i] = lati.data.values[i][0];
            longArray[i] = long.data.values[i][0];
            ekiArray[i] = eki.data.values[i][0];
            bgcArray[i] = bgc.data.values[i][0];
        }
        if (!cookietoken){
            res.render('plzLogin', {
                latitude: latiArray,
                len: latiArray.length,
                longitude: longArray,
                eki: ekiArray,
                bgc: bgcArray,
            })
        }
        else{
            let pname = await gsapi.spreadsheets.values.get(optpropsname);
            let pquan0 = await gsapi.spreadsheets.values.get(optpropsq0);
            let pquan1 = await gsapi.spreadsheets.values.get(optpropsq1);
            let pquan2 = await gsapi.spreadsheets.values.get(optpropsq2);
            let pquana = await gsapi.spreadsheets.values.get(optpropsqa);
            let tusername = await gsapi.spreadsheets.values.get(optusername);
            let pnameArray = [];
            let pquan0Array = [];
            let pquan1Array = [];
            let pquan2Array = [];
            let pquanaArray = [];
            let tuserArray = [];
        for (let i =0; i<pname.data.values.length; i++){
            pnameArray[i] = pname.data.values[i][0];
            pquan0Array[i] = pquan0.data.values[i][0];
            pquan1Array[i] = pquan1.data.values[i][0];
            pquan2Array[i] = pquan2.data.values[i][0];
            pquanaArray[i] = pquana.data.values[i][0];
            tuserArray[i] = tusername.data.values[0][i];
        }
            var detoken = jwt.verify(cookietoken, SECRET);
            tokenusername = detoken.username;
            console.log(tokenusername);
            for (let i = 0; i < tusername.data.values[0].length; i++) {
                if (tokenusername === tusernameArray[i]) {
                    switch (i) {
                        case 0:
                            res.render('props', {
                                latitude: latiArray,
                                len: latiArray.length,
                                longitude: longArray,
                                eki: ekiArray,
                                bgc: bgcArray,
                                pname: pnameArray,
                                pquan:　pquan0Array
                            })
                            break;
                        case 1:
                            res.render('props', {
                                latitude: latiArray,
                                len: latiArray.length,
                                longitude: longArray,
                                eki: ekiArray,
                                bgc: bgcArray,
                                pname: pnameArray,
                                pquan:　pquan2Array
                            })
                            break;
                        case 2:
                            res.render('props', {
                                latitude: latiArray,
                                len: latiArray.length,
                                longitude: longArray,
                                eki: ekiArray,
                                bgc: bgcArray,
                                pname: pnameArray,
                                pquan:　pquan3Array
                            })
                            break;
                        case 3:
                            res.render('props', {
                                latitude: latiArray,
                                len: latiArray.length,
                                longitude: longArray,
                                eki: ekiArray,
                                bgc: bgcArray,
                                pname: pnameArray,
                                pquan:　pquanaArray
                            })
                            break;
                    }
                }
            }
        }});
}


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server up and running on ' + process.env.PORT + ' or 3000'));