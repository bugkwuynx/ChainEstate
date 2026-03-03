import { Router } from "express";
import {
    createListingHandler,
    getListingByIdHandler,
    getListingsHandler,
    updateListingHandler
} from "../../controllers/listings/listings.controller";

const listingsRouter = Router();

listingsRouter.post("/", createListingHandler);
listingsRouter.get("/:id", getListingByIdHandler);
listingsRouter.get("/", getListingsHandler);
listingsRouter.patch("/:id", updateListingHandler);

export default listingsRouter;