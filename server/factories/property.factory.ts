import type {
  NewProperty,
  Property,
  PropertyDetail,
  Image,
  PropertyDocument,
  Listing,
  PropertyHistoryEntry,
} from "../types/properties.types";
import { generateRandomNumber, generateRandomString } from "../utils/random";

let idCounter = 1;

const generateId = () => `${idCounter++}`;

/* -------------------------------------------------- */
/* Base Property */
/* -------------------------------------------------- */

export const createMockNewProperty = (
  overrides: Partial<NewProperty> = {}
): NewProperty => {
  return {
    tokenAddress: overrides?.tokenAddress || generateRandomString(10),
    ownerId: overrides?.ownerId || generateRandomString(10),
    title: overrides?.title || generateRandomString(),
    description: overrides?.description || generateRandomString(),
    country: overrides?.country || generateRandomString(),
    city: overrides?.city || generateRandomString(),
    addressLine: overrides?.addressLine || generateRandomString(),
    propertyType: overrides?.propertyType || "residential",
    sizeSqft: overrides?.sizeSqft || generateRandomNumber(),
    yearBuilt: overrides?.yearBuilt || generateRandomNumber(),
  };
};

export const createMockProperty = (
  overrides: Partial<Property> = {}
): Property => {
  const base = createMockNewProperty();

  return {
    id: generateId(),
    ...base,
    isVerified: false,
    ipfsMetadataUri: null,
    createdAt: new Date(),
  };
};

/* -------------------------------------------------- */
/* Image */
/* -------------------------------------------------- */

export const createMockImage = (
  propertyId: string,
  overrides: Partial<Image> = {}
): Image => {
  return {
    id: generateId(),
    propertyId,
    imageUrl: generateRandomString(),
    ...overrides,
  };
};

/* -------------------------------------------------- */
/* Property History */
/* -------------------------------------------------- */

export const createMockHistoryEntry = (
  overrides: Partial<PropertyHistoryEntry> = {}
): PropertyHistoryEntry => {
  return {
    date: new Date().toISOString(),
    event: "TRANSFER",
    owner: generateRandomString(),
    priceWei: generateRandomNumber(),
    ...overrides,
  };
};

/* -------------------------------------------------- */
/* Property Detail */
/* -------------------------------------------------- */

export const createMockPropertyDetail = (
  overrides: Partial<PropertyDetail> = {}
): PropertyDetail => {
  const property = createMockProperty();

  return {
    ...property,
    history: [createMockHistoryEntry()],
    images: [createMockImage(property.id)],
    ...overrides,
  };
};

/* -------------------------------------------------- */
/* Property Document */
/* -------------------------------------------------- */

export const createMockPropertyDocument = (
  propertyId: string,
  overrides: Partial<PropertyDocument> = {}
): PropertyDocument => {
  return {
    id: generateId(),
    propertyId,
    documentType: "TITLE_DEED",
    ipfsUri: generateRandomString(),
    createdAt: new Date(),
    ...overrides,
  };
};

/* -------------------------------------------------- */
/* Listing */
/* -------------------------------------------------- */

export const createMockListing = (
  overrides: Partial<Listing> = {}
): Listing => {
  const property = createMockProperty();

  return {
    ...property,
    sellerAddress: generateRandomString(),
    priceWei: generateRandomNumber(),
    isActive: true,
    createdAt: new Date(),
    closedAt: new Date(),
    ...overrides,
  };
};