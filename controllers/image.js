const Clarifai = require('clarifai');
console.log(Clarifai)

const { config } = require('dotenv');

config();


const app = new Clarifai.App({
  apiKey: process.env.API_KEY,
});

const face_detect_model_obj = {
  id: process.env.MODEL_ID,
    name: process.env.MODEL_NAME,
    version: process.env.MODEL_VERSION,
    type: process.env.MODEL_TYPE,
}

displayFaceBox = (box) => {
  this.setState({box: box});
}

const handleApiCall = (req, res) => {
app.models
      .predict(face_detect_model_obj, req.body.input)
      .then(data => {
        res.json(data);
      })
      .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0].entries);
    })
    .catch(err => res.status(400).json('unable to get entries'))
  }

  module.exports = {
    handleImage,
    handleApiCall
  }