const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pointSchema = new mongoose.Schema({
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  });

const locationFeedbackSchema = new mongoose.Schema({

    rating : { 
        type: Number,
        enum : [0,1,2,3,4,5],
        default : 5,
        required : true
    },
    comments : {
        type : String,
        required : false
    }

});

const locationSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  locationPoint: {
    type: pointSchema,
    required : true
  },
  feedbackList : {
      type : [locationFeedbackSchema],
      required : false
  }
});

module.exports = mongoose.model('Points', pointSchema);
module.exports = mongoose.model('LocationFeedbacks', locationFeedbackSchema);
module.exports = mongoose.model('Locations', locationSchema);
