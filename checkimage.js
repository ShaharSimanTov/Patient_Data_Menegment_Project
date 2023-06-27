// Exercise 3: Checking that the image uploaded by the user is a face image

const FormData = require('form-data');
const fetch = require('node-fetch');

const imaggaApiKey = 'acc_e443f856194719b'; 
const imaggaApiSecret = '08edbb62940adc4e1a1fa2caf28a0577'; 

const checkImage = async (picture) => {
  try {
    const imageBase64 = picture.data.toString('base64');
    const formData = new FormData();
    formData.append('image_base64', imageBase64);
    
    const requestOptions = {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`${imaggaApiKey}:${imaggaApiSecret}`).toString('base64')}`,
      },
      body: formData,
    };
    
    const response = await fetch('https://api.imagga.com/v2/tags', requestOptions);
    const responseObj = await response.json();

    // Extract the confidence values for the "face" tag
    const faceConfidences = responseObj.result.tags
      .filter(tag => tag.tag.en === "face")
      .map(tag => tag.confidence);
      
    if(faceConfidences > 40) return true; 
    else return false;

  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { checkImage };
