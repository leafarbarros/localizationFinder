const mongoose = require('mongoose');
const Locations = mongoose.model('Locations');
const LocationFeedbacks = mongoose.model('LocationFeedbacks');

exports.listLocations = async () => {
  const allLocations = await Locations.find({}).sort('name');
  return allLocations;
};

exports.mapLocations = async referenceLocationPoint => {
    if (referenceLocationPoint == null ||  referenceLocationPoint.type != "Point" || 
        referenceLocationPoint.coordinates == null || !Array.isArray(referenceLocationPoint.coordinates) ||
        referenceLocationPoint.coordinates.length != 2 
        ){
        throw new Error("Necessário informar uma localização de referência válida");
    }
    const nearLocations = await Locations.find({
        locationPoint:
          { $near :
             {
               $geometry: referenceLocationPoint
             }
          }
      });
    return nearLocations;
};

exports.createLocation = async locationData => {
    const newLocation = new Locations(locationData);
    //check if already exists an user with the mail requested
    const existingLocation = await Locations.find({ "name" : newLocation.name});
    
    if (existingLocation[0] != null){
        throw new Error("Localização já existe: " + existingLocation[0].name);
    }
  
    await newLocation.save();
};


exports.addLocationFeedback = async (locationId , locationFeedbackData) => {
        
    if (!locationId || locationId == 0 || locationId == ""){
        throw new Error("Necessário informar o local da avaliação.");
    }
    if (!locationFeedbackData || !locationFeedbackData.rating || !locationFeedbackData.comments)
    {
        throw new Error("Necessário informar uma avaliação válida");
    }

    const location = await Locations.findOne({ "_id" : locationId});
    if (!location){
        throw new Error("Local não encontrado.");
    }

    const newLocationFeedback = new LocationFeedbacks(locationFeedbackData);
    
    location.feedbackList.push(newLocationFeedback);
    
    const filter = { "_id" : locationId };
    await Locations.findOneAndUpdate(filter, { feedbackList : location.feedbackList});

};


exports.viewLocationFeedbacks = async locationId => {
        
    if (!locationId || locationId == 0 || locationId == ""){
        throw new Error("Necessário informar o local.");
    }

    const location = await Locations.findOne({ "_id" : locationId});
    if (!location){
        throw new Error("Local não encontrado.");
    }
    
    return location.feedbackList;

};

