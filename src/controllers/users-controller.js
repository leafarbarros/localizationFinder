const domain = require('../domain/users-domain');
var jwt = require('jsonwebtoken');

// list
exports.listUsers = async (req, res) => {
  try {
    const allUsers = await domain.listUsers();
    res.status(200).send(allUsers);
  } catch (e) {
    res.status(500).send({message: 'Falha ao carregar os usuários.' + e.message});
  }
};

exports.viewProfile = async (req, res) => {
    try {
      var token = req.headers['x-access-token'];
      decodedToken = jwt.decode(token);  
      filterUser = { _id : decodedToken.authUser._id };
      const user = await domain.findUser(filterUser);
      res.status(200).send(user);
    } catch (e) {
      res.status(500).send({message: 'Falha ao visualizar perfil.' + e.message});
    }
  };

// create
exports.createUser = async (req, res) => {
  try {

    await domain.createUser({
        name: req.body.name,
        mail: req.body.mail,
        password : req.body.password,
        role : req.body.role
      });

    res.status(201).send({message: 'Usuário cadastrado com sucesso!'});
  } catch (e) {
    res.status(500).send({message: 'Falha ao cadastrar o usuário. ' + e.message});
  }
};


exports.deleteUser = async (req, res) => {
    try {
      
      await domain.deleteUser({ "mail" : req.body.mail});
      res.status(201).send({message: 'Usuário excluído com sucesso!'});

    } catch (e) {
      res.status(500).send({message: 'Falha ao excluir o usuário.' + e.message});
    }
  };


exports.updateUser = async (req, res) => {
    try {
      var token = req.headers['x-access-token'];
      decodedToken = jwt.decode(token);  

      await domain.updateUser({
          _id : decodedToken.authUser._id,
          oldPassword : req.body.oldPassword,
          newMail: req.body.newMail,
          newPassword : req.body.newPassword,
        });
  
      res.status(201).send({message: 'Usuário atualizado com sucesso!'});
    } catch (e) {
      res.status(500).send({message: 'Falha ao atualizar dados do usuário. ' + e.message});
    }
  };