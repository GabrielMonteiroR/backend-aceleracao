import express from "express";
import jwt from "jsonwebtoken";
import userController from "../usuario/controller.js";
import bcrypt from "bcrypt";

const routes = express.Router();

routes.post("/login", async (req, res) => {
  const { usuario, senha } = req.body; // destructuring

  const user = await userController.findByLogin(usuario);
  if (!user) {
    return res.status(401).json({ error: "Usuário ou senha inválidos" });
  }

  const isValid = await bcrypt.compare(senha, user.password);

  if (isValid) {
    const dadosUsuario = {
      nome: user.login,
      id: user.id,
    };

    const chavePrivada = process.env.SECRET_KEY;

    jwt.sign(dadosUsuario, chavePrivada, (err, token) => {
      if (err) {
        res.status(500).json({ mensagem: "Erro ao gerar o JWT" });

        return;
      }

      res.set("x-access-token", token);
      res.status(200).json(user);
    });
  } else {
    res.status(401).json({ error: "Usuário ou senha inválidos" });
    res.end();
  }
});

routes.get("/user-by-token", (req, res) => {
  const jwtToken = req.headers["authorization"];
  const chavePrivada = process.env.SECRET_KEY;

  jwt.verify(jwtToken, chavePrivada, (err, userInfo) => {
    if (err) {
      res.status(403).end();
      return;
    }

    res.json(userInfo);
  });
});

export { routes as default };
