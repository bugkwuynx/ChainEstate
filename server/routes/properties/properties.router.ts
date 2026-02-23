import {Router} from "express";
import {
    createPropertyHandler,
    getPropertiesHandler,
    getPropertyByIdHandler,
    updatePropertyHandler
} from "../../controllers/properties/properties.controller"; 

const propertiesRouter = Router();

propertiesRouter.post("/", createPropertyHandler);
propertiesRouter.get("/:id", getPropertyByIdHandler);
propertiesRouter.get("/", getPropertiesHandler);
propertiesRouter.patch("/:id", updatePropertyHandler);

export default propertiesRouter;