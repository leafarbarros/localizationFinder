const domain = require('../domain/users-domain');
var jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
      
      const user = await domain.findUser({ "mail" : req.body.mail });
      
      if (user[0] == null || user[0].password != req.body.password){
          throw new Error("Usuário e/ou senha inválidos!")
      }

      //auth ok
      const authUser = user[0]; //esse id viria do banco de dados
      var token = jwt.sign({ authUser }, process.env.SECRET, {
            expiresIn: 300 // expires in 5min
      });
      return res.json({ auth: true, token: token });

    } catch (e) {
      res.status(500).json({message: 'Falha ao efetuar login. ' + e.message});
    }
};


exports.logout = async (req, res) => {

  var token = req.headers['x-access-token'];
  decodedToken = jwt.decode(token);  
  timeToExpire = decodedToken.exp - (new Date().getTime()/1000);
    
  res.json({ auth: false, token: ("seu token expira em " + timeToExpire.toFixed(0) + "s") });

};


exports.verifyJWT = (req, res, next) => {
  var token = req.headers['x-access-token'];
  if (!token) return res.status(401).json({ auth: false, message: 'Usuário não autenticado. Token não informado.' });
  
  jwt.verify(token, process.env.SECRET, function(err, decoded) {
    if (err) return res.status(403).json({ auth: false, message: 'Usuário não autenticado ou token informado inválido.' });
    
    // se tudo estiver ok, salva no request para uso posterior
    req.authUser = decoded.authUser;
    next();
  });
};

exports.onlyAdmin = (req, res, next) => {
  var token = req.headers['x-access-token'];
  decodedToken = jwt.decode(token);  
  
  if (decodedToken.authUser.role != "Admin"){
    return res.status(403).json({ auth: false, message: 'Você não tem permissão para executar essa ação.' });
  }

  next();
};