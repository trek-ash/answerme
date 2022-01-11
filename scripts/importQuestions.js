const xlsx = require('node-xlsx').default;
const Question = require("../models/Questions");
const workSheetsFromFile = xlsx.parse(`${__dirname}/../resources/data.xlsx`);
const mongoose = require('mongoose')
const loaclLink = "mongodb://localhost:27017/answerme";

const THREAT_HUNTING = "Threat Hunting"
const VULNERABILITY_MANAGEMENT = "Vulnerability Management"

const insertToDB = (objs) => {

    Question.insertMany(objs)
        .then(function(docs) {
             console.log(docs)
        })
        .catch(function(err) {
            console.log(err)
        });
}

const prepareSheetData = (sheetData, category) => {
    const stageCol = sheetData[0].indexOf("Stage")
    const descriptionCol = sheetData[0].indexOf("Item")

    return sheetData.splice(1)
    .filter(row=>row.length>=3)
    .map(row=>{
        return new Question({
            category,
            stage: row[stageCol],
            description: row[descriptionCol],
        })
    })
}

const getAllQuestionsFromSheets = (selectedSheets) => {
    let threatQuestionObj = []
    let vulnerabilityQuestionObj = []
    selectedSheets.forEach((sheet)=>{
        
        switch (sheet.name) {
            case VULNERABILITY_MANAGEMENT:
                vulnerabilityQuestionObj = prepareSheetData(sheet.data, VULNERABILITY_MANAGEMENT)
                break;
            case THREAT_HUNTING:
                threatQuestionObj = prepareSheetData(sheet.data, THREAT_HUNTING)
                break;
            default:
                break;
        }
    })

    return [...threatQuestionObj, ...vulnerabilityQuestionObj]
}

const handleImportedSheets = (workSheetsFromFile) => {
    const allowedSheets = [THREAT_HUNTING, VULNERABILITY_MANAGEMENT]
    const requiredSheets = workSheetsFromFile.filter(sheet=>allowedSheets.indexOf(sheet.name)!=-1)
    
    const questions = getAllQuestionsFromSheets(requiredSheets)
    insertToDB(questions)
}


mongoose
  .connect(loaclLink, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => {
    handleImportedSheets(workSheetsFromFile);
  })
  .catch(err => console.log(err));

