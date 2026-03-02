import {Router} from "express";
import {
    createPropertyHandler,
    getPropertiesHandler,
    getPropertyByIdHandler,
    updatePropertyHandler
} from "../../controllers/properties/properties.controller"; 

const propertiesRouter = Router();

propertiesRouter.post("/", createPropertyHandler);
propertiesRouter.get("/:propertyId", getPropertyByIdHandler);
propertiesRouter.get("/", getPropertiesHandler);
propertiesRouter.patch("/:propertyId", updatePropertyHandler);

export default propertiesRouter;