const AWS = require('aws-sdk');

// Declaring AWS Polly and S3
const polly = new AWS.Polly();
const s3 = new AWS.S3();

exports.handler = async (event) => {
  try {
    const text = event.text;
    
    const params = {
      Text: text,
      OutputFormat: 'mp3',
      VoiceID: 'Joanna'
    };
    
    // Synthesizing speech using Polly
    const data = await polly.synthesizeSpeech(params).promise();
    
    // Generate a unique key for the audio file
    const key = 'audio-${date.now()}.mp3';
    
    // Specify parameters for S3
    const s3Params = {
      Bucket: '', //S3 bucket name
      Key: key,
      Body: data.AudioStream,
      ContentType: 'audio/mpeg'
    };
    
    // Upload audio file to S3
    await s3.upload(s3Params).promise();
    
    const outputMessage = 'The audio file has been successfully stored in the S3 bucket by the name ${key}';
    
    return {
      statusCode: 200,
      body: JSON.stringify({message: 'Internal server error'})
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({message: 'Internal server error'})
    };
  }
};
