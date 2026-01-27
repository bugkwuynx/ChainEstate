import React, { useMemo, useState } from "react";
import "./PropertyCard.css";
import type { Listing, Property, PropertyHistoryEntry } from "../types/Property.types";

export type PropertyCardProps = {
  property?: Listing;
  onBuy?: (property: Listing) => void;
};

const defaultPropertyHistory: PropertyHistoryEntry[] = [
    {
        date: "Mar 2024",
        event: "Tokenized ownership verified",
        owner: "0x1234567890123456789012345678901234567890",
        priceWei: 1000,
    },
];

const defaultProperty: Property = {
  id: "1",
  tokenId: "1",
  ownerAddress: "0x1234567890123456789012345678901234567890",
  images: ["https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&crop&w=1200&q=80", "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&crop&w=1200&q=80", "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&crop&w=1200&q=80", "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&crop&w=1200&q=80"],
  title: "Harbor Point Towers",
  description: "A waterfront residence with panoramic skyline views, floor-to-ceiling glass, and a private sky lounge. Designed for modern living with concierge services and smart-home automation.",
  country: "United States",
  city: "Seattle, WA",
  addressLine: "123 Main St",
  propertyType: "Apartment",
  sizeSqft: 2950,
  isVerified: true,
  ipfsMetadataUri: null,
  yearBuilt: 2024,
  createdAt: new Date(),
  history: defaultPropertyHistory,
};

const defaultListing: Listing = {
  ...defaultProperty,
  sellerAddress: "0x1234567890123456789012345678901234567890",
  priceWei: 1000,
  isActive: true,
};

const PropertyCard: React.FC<PropertyCardProps> = ({
  property = defaultListing,
  onBuy,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeImage = useMemo(() => {
    if (!property.images.length) {
      return "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80";
    }
    return property.images[activeIndex] ?? property.images[0];
  }, [activeIndex, property.images]);

  return (
    <article className="property-card">
      <header className="property-header">
        <div>
          <p className="property-eyebrow">Featured Property</p>
          <h2 className="property-title">{property.title}</h2>
          <p className="property-location">{property.city}</p>
        </div>
        <div className="property-price">
          <span>Listed price</span>
          <strong>{property.priceWei} Wei</strong>
        </div>
      </header>

      <section className="property-gallery" aria-label="Property gallery">
        <div className="property-main-image">
          <img src={activeImage} alt={`${property.title} main view`} />
        </div>
        <div className="property-thumbnails">
          {property.images.map((image, index) => (
            <button
              key={`${property.title}-image-${index + 1}`}
              className={`property-thumb ${
                index === activeIndex ? "active" : ""
              }`}
              onClick={() => setActiveIndex(index)}
              aria-label={`View image ${index + 1}`}
              type="button"
            >
              <img src={image} alt={`${property.title} view ${index + 1}`} />
            </button>
          ))}
        </div>
      </section>

      <section className="property-details">
        <div className="property-description">
          <h3>Overview</h3>
          <p>{property.description}</p>
          <div className="property-meta">
            <div>
              <span>Size</span>
              <strong>{property.sizeSqft}</strong>
            </div>
            <div>
              <span>Year Built</span>
              <strong>{property.yearBuilt}</strong>
            </div>
            <div>
              <span>Location</span>
              <strong>{property.city}</strong>
            </div>
          </div>
        </div>

        <div className="property-features">
          <h3>Key features</h3>
          <ul>
            <li>{property.propertyType}</li>
            <li>{property.sizeSqft} sqft</li>
            <li>{property.city}, {property.country}</li>
          </ul>
          <button
            className="property-buy"
            type="button"
            onClick={() => onBuy?.(property)}
          >
            Buy property
          </button>
        </div>
      </section>

      <section className="property-history">
        <div className="property-history-header">
          <h3>Ownership history</h3>
          <span>On-chain verified</span>
        </div>
        <div className="property-history-table" role="table">
          <div className="property-history-row header" role="row">
            <span role="columnheader">Date</span>
            <span role="columnheader">Event</span>
            <span role="columnheader">Owner</span>
            <span role="columnheader">Price</span>
          </div>
          {property.history.map((entry) => (
            <div className="property-history-row" role="row" key={entry.event}>
              <span role="cell">{entry.date}</span>
              <span role="cell">{entry.event}</span>
              <span role="cell">{entry.owner}</span>
              <span role="cell">{entry.priceWei ?? "—"}</span>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
};

export default PropertyCard;
