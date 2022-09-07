const express = require("express")
const apiController = require("../controllers/apiControllers")
const apiRouter = express.Router()

// apiRouter.get("/search", apiController.search);
// apiRouter.get("/recoverpassword", apiController.recoverpassword);
// apiRouter.get("/restorepassword", apiController.restorepassword);

// apiRouter.post("/user", apiController.singup);
// apiRouter.post("/login", apiController.login);
// apiRouter.post("/logout", apiController.logout);
apiRouter.post("/ads", apiController.createOffer);
// apiRouter.post("/favorites", apiController.addFavorite);

// apiRouter.put("/user", apiController.updateUser);
// apiRouter.put("/ads", apiController.updateOffer);

// apiRouter.delete("/user", apiController.deleteUser);
// apiRouter.delete("/ads", apiController.deleteOffer);
// apiRouter.delete("/favorites", apiController.deleteFavorite);

module.exports = apiRouter;