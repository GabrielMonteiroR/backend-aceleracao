import User from "./user.js";
import bcrypt from "bcrypt";

async function findAll() {
  console.log("retornando pelo service");
  return await User.findAll();
}

async function findById(id) {
  return await User.findAll({
    where: {
      id: id,
    }
  });
}

async function findByLogin(login) {
  return await User.findOne({
    where: {
      login: login,
    }
  });
}

async function save(user) {
  if (!user.password) {
    throw new Error("Password is required");
  }
  const hash = await bcrypt.hash(user.password, 10);

  return await User.create({
    login: user.login,
    password: hash
  });
}

async function update(user, id) {
  return await User.update(
    {
      login: user.login,
      password: user.password,
    },
    {
      where: {
        id: id,
      },
    }
  );
}

async function deleteById(id) {
  return await User.destroy({
    where: {
      id: id,
    },
  });
}

export default {
  findAll,
  findById,
  findByLogin,
  save,
  update,
  deleteById,
};
