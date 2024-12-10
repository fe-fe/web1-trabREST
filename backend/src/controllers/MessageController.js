const MessageRepository = require("../repositories/MessageRepository");

class MessageController {
  async index(request, response) {
    const msgs = await MessageRepository.findAll();
    response.json(msgs);
  }

  async show(request, response) {
    const { id } = request.params;

    const user = await MessageRepository.findById(id);
    if (!user) {
      return response.status(404).json({ error: "User not found!" });
    }
    response.json(user);
  }

  async store(request, response) {
    const { titulo, msg } = request.body;
    if (!titulo) {
      return response.status(400).json({ error: "e preciso ter um titulo" });
    }

    const newMessage = await MessageRepository.create({
      titulo,
      msg
    });

    response.status(201).json(newMessage);
  }

  async update(request, response) {
    const {id, titulo, msg, fav } = request.body;
    if (!id || !titulo) {
      return response.status(400).json({ error: "id ou titulo invalido" })
    }
    let newMsg = await MessageRepository.update(id, titulo, msg, fav);
    return response.status(204).json(newMsg);
  }

  async delete(request, response) {
    const { id } = request.params;

    if (!id) {
      return response.status(400).json({ error: "Invalid message id" });
    }
    await MessageRepository.delete(id);
    response.sendStatus(204);
  }

  async showFav(request, response) {
    const msgs = await MessageRepository.findAllFav();
    response.json(msgs)
  }
}
module.exports = new MessageController();
