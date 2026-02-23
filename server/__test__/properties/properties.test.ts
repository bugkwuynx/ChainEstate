import {
    createPropertyHandler,
    getPropertiesHandler,
    getPropertyByIdHandler,
    updatePropertyHandler
} from "../../controllers/properties/properties.controller";
import {
    createProperty,
    getProperties,
    getPropertyById,
    updateProperty 
} from "../../services/properties/properties.service";
import { createMockProperty, createMockNewProperty } from "../../factories";
import {Request, Response} from "express";
import { CreatePropertyRequest } from "../../types/properties.types";

 jest.mock("../../services/properties/properties.service");
 
 const mockResponse = () => {
    const res = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
 }

 describe("Property Controllers", () => {
    afterEach(() => {
        jest.clearAllMocks();
    })

    /**
     * CREATE PROPERTY
     */
    describe("createPropertyHandler", () => {
        it("return 400 if ownerId is missing", async() => {
            const req = { body: {} } as Request;

            const res = mockResponse();

            await createPropertyHandler(req as CreatePropertyRequest, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({message: "Owner ID is required"});
        });

        it("return 201 when property is created", async() => {
            const newProperty = createMockNewProperty({ownerId: "0x123"});
            const mockProperty = createMockProperty({...newProperty});

            (createProperty as jest.Mock).mockResolvedValue(mockProperty);

            const req = {body: newProperty} as Request;
            const res = mockResponse();

            await createPropertyHandler(req as CreatePropertyRequest, res);

            expect(createProperty).toHaveBeenCalledWith(newProperty);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mockProperty);
        });
    });

    /**
     * GET PROPERTY BY ID
     */
    describe("getPropertyByIdHandler", () => {
        it("return 400 if propertyId is missing", async() => {
            const req = {params: {}} as Request;
            const res = mockResponse();

            await getPropertyByIdHandler(req as any, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({message: "Property ID is required"});
        });

        it("should return 404 if property not found", async() => {
            (getPropertyById as jest.Mock).mockResolvedValue(null);

            const req = { params: { propertyId: "1" } } as unknown as Request;
            const res = mockResponse();

            await getPropertyByIdHandler(req as any, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({message: "Property not found"});
        });

        it("return 200 if property found", async() => {
            const mockProperty = createMockProperty({id: "1"});
            (getPropertyById as jest.Mock).mockResolvedValue(mockProperty);

            const req = {params: {propertyId: "1"}} as unknown as Request;
            const res = mockResponse();

            await getPropertyByIdHandler(req as any, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockProperty);
        });
    });

    /**
     * GET PROPERTIES
     */
    describe("getPropertiesHandler", () => {
        it("return 200 with properties list", async() => {
            const mockProperties = [
                createMockProperty({city: "NYC"}),
                createMockProperty({city: "NYC"}),
                createMockProperty({city: "NYC"})
            ];
            (getProperties as jest.Mock).mockResolvedValue(mockProperties);

            const req = {query: {city: "NYC"}} as any as Request;
            const res = mockResponse();

            await getPropertiesHandler(req as any, res);

            expect(getProperties).toHaveBeenCalledWith({ where: { city: "NYC" } });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockProperties);
        });
    });
 });