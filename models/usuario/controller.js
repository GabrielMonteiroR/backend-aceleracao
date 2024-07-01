import service from "./service.js";

function findAll() {
    return service.findAll();
}

function findById(id) {
    return service.findById(id);
}

function findByLogin(login) {
    return service.findByLogin(login);
}

function save(user) {
    return service.save(user);
}

function update(user, id) {
    return service.update(user, id);
}

function deleteById(id) {
    return service.deleteById(id);
}

export default {
    findAll,
    findById,
    findByLogin,
    save,
    update,
    deleteById
};