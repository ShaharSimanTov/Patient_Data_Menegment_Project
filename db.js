const mongoose = require('mongoose'); 

uri = "mongodb+srv://shahar14698:shahar14@cluster0.9ypbczk.mongodb.net/ProjectDB?retryWrites=true&w=majority";

mongoose.connect(uri, 
{   
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

const patientSchema = new mongoose.Schema({
    ID: String,
    name: String,
    lastName: String,
    birthDate: Date,
    conditions: [String]
});

const Patient = mongoose.model('patient', patientSchema);

module.exports = Patient;