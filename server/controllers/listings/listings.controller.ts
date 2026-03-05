import {
    createListing,
    getListings,
    getListingById,
    updateListing
} from "../../services/listings/listings.service";
import { Response } from "express";
import type {
    Listing,
    NewListing,
    CreateListingRequest,
    GetListingByIdRequest,
    GetListingsRequest,
    UpdateListingRequest
} from "../../types/listings.types";
import { getPropertyById } from "../../services/properties/properties.service";

export const createListingHandler = async(
    req: CreateListingRequest,
    res: Response<Listing | {message: string}>
) => {
    try {
        const newListing = req.body;

        if (!newListing.propertyId || !newListing.sellerId || !newListing.priceWei) {
            return res.status(400).json({message: "All fields are required"});
        }

        if (newListing.sellerId == "") {
            return res.status(400).json({message: "User Id is not valid"});
        }

        // Check if property exists
        const getPropertyResult = await getPropertyById(newListing.propertyId);

        if (!getPropertyResult) {
            return res.status(400).json({message: `Property ${newListing.propertyId} does not exist!`});
        }

        // Check if property belongs to user
        if (getPropertyResult.ownerId != newListing.sellerId) {
            return res.status(400).json({message: `Property ${newListing.propertyId} does not belong to user ${newListing.sellerId}`});
        }

        // Check if the property has been listed
        const getListingResult = await getListings({
            where: {propertyId: newListing.propertyId}
        });

        const createListingResult = await createListing(newListing);

        res.status(201).json(createListingResult as Listing);
    } catch(error) {
        res.status(500).json({message: `Error creating listing: ${error}`});
    }
}

export const getListingByIdHandler = async(
    req: GetListingByIdRequest,
    res: Response<Listing | {message: string}>
) => {
    try {
        const {id} = req.params;

        if (!id) {
            return res.status(400).json({message: `Listing Id is missing`});
        }

        const getListingResult = await getListingById(id);

        if (!getListingResult) {
            return res.status(404).json({message: `Listing not found`});
        }

        res.status(200).json(getListingResult);
    } catch(error) {
        res.status(500).json({message: `Error getting listing: ${error}`});
    }
}

export const getListingsHandler = async(
    req: GetListingsRequest,
    res: Response<Listing[] | null | {message: string}>
) => {
    try {
        const queryOptions = req.query;

        const getListingsResult = await getListings({
            where: queryOptions
        });

        res.status(200).json(getListingsResult);
    } catch(error) {
        res.status(500).json({message: `Error getting listing: ${error}`});
    }
}

export const updateListingHandler = async(
    req: UpdateListingRequest,
    res: Response<Listing | {message: string}>
) => {
    try {
        const id = req.params.id;
        const updates = req.body;

        if (!id) {
            return res.status(400).json({message: `Listing ID is required`});
        }

        const updateListingResult = await updateListing(id, updates);

        if (!updateListingResult) {
            return res.status(404).json({message: `Listing not found`});
        }

        res.status(200).json(updateListingResult);
    } catch(error) {
        res.status(500).json({message: `Error updating listing: ${error}`});
    }
}