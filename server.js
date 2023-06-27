const express = require('express')
const fileUpload = require('express-fileupload');
const app = express()
const port = 5000
app.use(fileUpload());
app.use(express.static('public'))
const {checkImage} = require('./models/checkimage')
const {checkIt} = require('./models/ChatGPT')
const Patient = require('./models/db') 
app.set('view engine', 'ejs');

// Ex 1+4: Receiving and saving patient data that passed the facial image test & creating a summary of information about the patient's medical conditions
app.post('/save', async (req, res) => {

    // Create a patient data and save to the db
    var newPatient = { ID: req.body.patientId, name: req.body.patientName, lastName: req.body.patientLastName, birthDate: req.body.birthDate } 

    // Save patient conditions to the db
    const formKeys=Object.keys(req.body)
    var conditionsArray = formKeys.filter(function(key) {
            return key.includes("condition")
        });
    var conditions = conditionsArray.map(key=>req.body[key])
    newPatient.conditions=conditions

    // send a question to the GPT with al the conditions using the func in 'ChatGPT.js'
    const question = "what might be the result of the following conditons: " + conditions.join(', ');
    const gptAns = await checkIt(question);

    // Save the patient picture to public/images folder
    const picture = req.files.picture
    picture.mv('public/images/' + picture.name);
    
    const imageHasFace = await checkImage(picture)

    // create a patient object according to the Patient schema
    let patient = new Patient(newPatient)
    
    try {
         if (imageHasFace){
            await patient.save();
            var savedResult={patientKey: patient, gptAnsKey: gptAns.replace(/(\\n\d+\.)|(\\n)/g,' ').slice(1, -1)};
            res.render('pages/firstDiagnose', savedResult);
            } else {
                res.render('pages/noFaceImage');
            }
    } catch (error) {
        res.status(500).send("Error: " + patient.name + " data not saved.");
    }
})


// Ex 2: Retrieving patient data from the database based on an ID card
app.get('/readbyID', async (req, res) => {
    var parameter = req.query.patientId
    try {
        const patient_find = await Patient.find({"ID":parameter});
        var result={patients:patient_find} 
        res.render("pages/patientdata", result) 
    } catch (error) {
        res.status(500).send(error);
    }
})


// Ex6: Integration with ChatGPT by enter symptoms and get an initial diagnosis by using the checkIt module
app.get('/ask',async (req, res) => {
    answer=await checkIt(req.query.question);
    res.json(answer.replace(/(\\n\d+\.)|(\\n)/g,' ').slice(1, -1));
  })


// Listening to a certain port to display the web page
app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
})