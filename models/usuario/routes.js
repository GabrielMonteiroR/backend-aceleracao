import express from "express";
import controller from "./controller.js";

const routes = express.Router();

routes.get('/usuarios', async (req, res) => {
    const autores = await controller.findAll();
    res.status(200).json(autores);
});

routes.post('/usuarios', async (req, res) => {
    const autor = req.body; // pegando o conteúdo da requisição (body)
    const savedAutor = await controller.save(autor);

    res.json(savedAutor); // enviando o cadastro para o client
});

routes.get('/usuarios/:id', async (req, res) => {
    const id = Number(req.params.id);
    const encontrado = await controller.findById(id);

    if (encontrado.length > 0) {
        res.status(200).json(encontrado);
    } else {
        res.status(204).send();
    }

});

routes.post('/usuarios/:id', async (req, res) => {
    const id = Number(req.params.id);
    const autor = req.body; 
    let updateUser = await controller.update(autor, id);
    if (updateUser) {
        updateUser = await controller.findById(id); 
        res.status(200).json(updateUser);
    }

    res.status(400);
});

routes.delete('/usuarios/:id', async (req, res) => {
    const id = Number(req.params.id);
    await controller.deleteById(id);

    res.status(204).send();
});

export { routes as default };