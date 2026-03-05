import {
    createProperty,
    getProperties,
    getPropertyById,
    updateProperty 
 } from "../../services/properties/properties.service";
 import type { Request, Response } from "express";
 import type {
    Property,
    NewProperty,
    CreatePropertyRequest,
    GetPropertiesRequest,
    GetPropertyByIdRequest,
    UpdatePropertyRequest,
} from "../../types/properties.types";
import { mintPropertyOnChain } from "../../services/properties/propertyContract.service";
import { getUsers } from "../../services/users/users.service";
import type { User } from "../../types/users.types";

export const createPropertyHandler = async(
    req: CreatePropertyRequest,
    res: Response<Property | {message: string}>
) => {
    try {
        const newProperty = req.body;

        if (!newProperty.ownerId) {
            return res.status(400).json({message: "Owner ID is required"});
        }

        const getUsersResult: User[] = await getUsers({
            where: {id: newProperty.ownerId}
        });

        if (!getUsersResult || getUsersResult.length === 0) {
            return res.status(400).json({message: "User not found"});
        }

        const user: User = getUsersResult[0] as User;
        const ownerAddress = user.walletAddress;

        const physicalAddress = `${newProperty.addressLine}, ${newProperty.city}, ${newProperty.country}`;
        const tokenURI = "";

        const mintPropertyResult = await mintPropertyOnChain(
            ownerAddress,
            physicalAddress,
            tokenURI
        );

        if (!mintPropertyResult || !mintPropertyResult.success) {
            return res.status(400).json({message: "Error minting property"});
        }

        newProperty.tokenAddress = mintPropertyResult.tokenId as string;

        const createPropertyResult = await createProperty(newProperty);

        res.status(201).json(createPropertyResult as Property);
    } catch (error) {
        res.status(500).json({message: `Error creating property: ${error}`});
    }
}

export const getPropertyByIdHandler = async(
    req: GetPropertyByIdRequest,
    res: Response<Property | {message: string}>
) => {
    try {
        const {propertyId} = req.params;
        
        if (!propertyId) {
            return res.status(400).json({message: `Property ID is required`});
        }

        const getPropertyResult = await getPropertyById(propertyId);

        if (!getPropertyResult) {
            return res.status(404).json({message: `Property not found`});
        }

        res.status(200).json(getPropertyResult);

    } catch(error) {
        res.status(500).json({message: `Error getting property: ${error}`});
    }
}

export const getPropertiesHandler = async(
    req: GetPropertiesRequest,
    res: Response<Property[] | null | {message: string}>
) => {
    try {
        const queryOptions = req.query;

        const getPropertiesResult = await getProperties({
            where: queryOptions
        });

        res.status(200).json(getPropertiesResult);

    } catch (error) {
        res.status(500).json({message: `Error getting property: ${error}`});
    }
}

export const updatePropertyHandler = async(
    req: UpdatePropertyRequest,
    res: Response<Property | {message: string}>
) => {
    try {
        const propertyId = req.params.propertyId;
        const updates = req.body;

        if (!propertyId) {
            return res.status(400).json({message: `Property ID is required`});
        }

        const updatePropertyResult = await updateProperty(propertyId, updates);

        if (!updatePropertyResult) {
            return res.status(404).json({message: `Property not found`});
        }

        res.status(200).json(updatePropertyResult);
    } catch (error) {
        res.status(500).json({message: `Error updating property: ${error}`});
    }
};