const { Router } = require("express");
const MessageController = require("./controllers/MessageController");

const routes = Router();

routes.get("/msgs", MessageController.index);
routes.get("/msgs/fav", MessageController.showFav);
routes.get("/msgs/:id", MessageController.show);
routes.post("/msgs", MessageController.store);
routes.put("/msgs/:id", MessageController.update);
routes.delete("/msgs/:id", MessageController.delete);


module.exports = routes;
