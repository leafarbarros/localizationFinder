const mongoose = require('mongoose');
const Users = mongoose.model('Users');

exports.listUsers = async () => {
  const allUsers = await Users.find({});
  return allUsers;
};

exports.findUser = async filterData => {
  const findUser = await Users.find(filterData);
  return findUser;
};

exports.createUser = async userData => {
  const newUser = new Users(userData);

  //check if already exists an user with the mail requested
  const existingUser = await Users.find({ "mail" : newUser.mail});
  
  if (existingUser[0] != null){
      throw new Error("Usuário já existe: " + existingUser[0].mail);
  }

  await newUser.save();
};


exports.deleteUser = async userData => {
  
  await Users.deleteOne({ "mail" : userData.mail})

};

/**
 * 
 * @param {_id : "required" ,
 *        newMail : "optional" ,
 *        newPassword : "optional",
 *        oldPassword = "required if newPassword field is informed" , } userData 
 */
exports.updateUser = async (userData) => {
  
  const user = await Users.findOne({ "_id" : userData._id });

  if (user == null){
    throw new Error("Usuário não encontrado: " + userData.oldMail);
  }

  if (userData.newMail != null && userData.newMail.trim() != ""){
    user.mail = userData.newMail;
  }

  if (userData.newPassword != null && userData.newPassword.trim() != "" )
  {
    if (user.password == userData.oldPassword){
      user.password = userData.newPassword;
    }
    else{
      throw new Error("Não foi possível atualizar a senha. Por favor, informe sua senha antiga corretamente.");
    }
  }

  const filter = { "_id" : userData._id };
  await Users.findOneAndUpdate(filter, { mail : user.mail , password : user.password});
  
};