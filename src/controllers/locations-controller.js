const domain = require('../domain/locations-domain');


exports.listLocations = async (req, res) => {
    try {
      const allLocations = await domain.listLocations();
      res.status(200).send(allLocations);
    } catch (e) {
      res.status(500).send({message: 'Falha ao carregar os locais.' + e.message});
    }
};


exports.mapLocations = async (req, res) => {
    try {
      const nearLocations = await domain.mapLocations(req.body.referenceLocationPoint);
      res.status(200).send(nearLocations);
    } catch (e) {
      res.status(500).send({message: 'Falha ao carregar os locais.' + e.message});
    }
};


// create
exports.createLocation = async (req, res) => {
    try {

      await domain.createLocation({
          name: req.body.name,
          locationPoint : req.body.locationPoint
        });

      res.status(201).send({message: 'Local cadastrado com sucesso!'});
    } catch (e) {
      res.status(500).send({message: 'Falha ao cadastrar local. ' + e.message});
    }
};

// create
exports.addLocationFeedback = async (req, res) => {
    try {
        
      await domain.addLocationFeedback(req.body.locationId,req.body.locationFeedback);

      res.status(201).send({message: 'Avaliação cadastrada com sucesso!'});
    } catch (e) {
      res.status(500).send({message: 'Falha ao cadastrar avaliação. ' + e.message});
    }
};


exports.viewLocationFeedbacks = async (req, res) => {
    try {
        const locationFeedbacks = await domain.viewLocationFeedbacks(req.body.locationId);
        res.status(200).send(locationFeedbacks);
      } catch (e) {
        res.status(500).send({message: 'Falha ao carregar as avaliações.' + e.message});
      }
};