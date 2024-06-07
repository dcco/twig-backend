
	// General
var fs = require('fs');

	// EXPRESS SERVER constants
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5500;

	// Sheets API variables
const {google} = require('googleapis');
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly';
var API_KEY = '0000';

	// API setup
app.use(cors());

app.listen(PORT, () => {
	console.log("Server started.");
	var secret = JSON.parse(fs.readFileSync('secret.json', 'utf8'));
	API_KEY = secret.key;
});

app.get("/test", async (req, res) => {
	res.status(200).json({
		'response': "Valid",
		'id': "0000"
	});
});

function sheetGet(sheetReq) {
	return async (req, res) => {
		try {
			const sheets = google.sheets({ version: 'v4', auth: API_KEY });
			response = await sheets.spreadsheets.values.get(sheetReq);
			res.status(200).json({
				'response': "Valid",
				'res': response.data
			});
		} catch (err) {
			res.status(404).json({
				'response': "Error",
				'err': err
			})
		}
	};
}

function sheetGetFull(sheetReq) {
	return async (req, res) => {
		try {
			const sheets = google.sheets({ version: 'v4', auth: API_KEY });
			response = await sheets.spreadsheets.get(sheetReq);
			res.status(200).json({
				'response': "Valid",
				'res': response.data.sheets
			});
		} catch (err) {
			res.status(404).json({
				'response': "Error",
				'err': err
			})
		}
	};
}


app.get("/xcams", sheetGet({
	spreadsheetId: '1J20aivGnvLlAuyRIMMclIFUmrkHXUzgcDmYa31gdtCI',
	ranges: 'Ultimate Star Spreadsheet v2!A2:D526'
}));

app.get("/up_rta", sheetGetFull({
	spreadsheetId: '1v2ZBecZmuBy8eE8DZE5PaBuCW5NFaobWIchqahdcUQY',
	ranges: ['Up RTA!B2:I12'],
	includeGridData: true
}));

/*
app.get("/xcams", async (req, res) => {
	try {
		const sheets = google.sheets({ version: 'v4', auth: API_KEY });
		response = await sheets.spreadsheets.values.get({
			spreadsheetId: '1J20aivGnvLlAuyRIMMclIFUmrkHXUzgcDmYa31gdtCI',
			range: 'Ultimate Star Spreadsheet v2!A2:D526',
		});
		res.status(200).json({
			'response': "Valid",
			'res': response.data
		});
    } catch (err) {
		res.status(404).json({
			'response': "Error",
			'err': err
		})
	}
});

app.get("/xcams", async (req, res) => {
	try {
		const sheets = google.sheets({ version: 'v4', auth: API_KEY });
		response = await sheets.spreadsheets.values.get({
			spreadsheetId: '1J20aivGnvLlAuyRIMMclIFUmrkHXUzgcDmYa31gdtCI',
			range: 'Ultimate Star Spreadsheet v2!A2:D526',
		});
		res.status(200).json({
			'response': "Valid",
			'res': response.data
		});
    } catch (err) {
		res.status(404).json({
			'response': "Error",
			'err': err
		})
	}
});*/