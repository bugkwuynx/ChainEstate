import React, { useMemo, useState } from "react";
import "./PropertiesPage.css";
import { useNavigate } from "react-router-dom";
import type { Listing } from "../types/Property.types";

type PropertyFilters = {
  query: string;
  location: string;
  propertyType: string;
  priceRange: string;
  minSize: string;
  sortBy: string;
};

const listings: Listing[] = [
  {
    id: "101",
    tokenId: "101",
    ownerAddress: "0x9F2b7c8AbfE111111111111111111111111111111",
    sellerAddress: "0x9F2b7c8AbfE111111111111111111111111111111",
    title: "Noir Skyline Residences",
    description:
      "Penthouse-ready tower with skyline panoramas, private lounges, and direct transit access.",
    country: "United States",
    city: "Chicago, IL",
    addressLine: "415 Lake Street",
    propertyType: "Condo",
    sizeSqft: 1850,
    yearBuilt: 2022,
    isVerified: true,
    ipfsMetadataUri: null,
    createdAt: new Date(),
    priceWei: 920,
    isActive: true,
    images: [
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&crop&w=1200&q=80",
    ],
    history: [],
  },
  {
    id: "102",
    tokenId: "102",
    ownerAddress: "0x72cC909Caa222222222222222222222222222222",
    sellerAddress: "0x72cC909Caa222222222222222222222222222222",
    title: "Marble Bay Loft",
    description:
      "Loft-style waterfront home with private marina access, open-plan living, and curated finishes.",
    country: "Portugal",
    city: "Lisbon",
    addressLine: "88 Avenida Central",
    propertyType: "Loft",
    sizeSqft: 2120,
    yearBuilt: 2020,
    isVerified: true,
    ipfsMetadataUri: null,
    createdAt: new Date(),
    priceWei: 760,
    isActive: true,
    images: [
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&crop&w=1200&q=80",
    ],
    history: [],
  },
  {
    id: "103",
    tokenId: "103",
    ownerAddress: "0x60adC1FFeB333333333333333333333333333333",
    sellerAddress: "0x60adC1FFeB333333333333333333333333333333",
    title: "Midnight Garden Villas",
    description:
      "Low-rise villas with private courtyards, integrated smart home tech, and onsite wellness.",
    country: "United Arab Emirates",
    city: "Dubai",
    addressLine: "12 Crescent Way",
    propertyType: "Villa",
    sizeSqft: 3050,
    yearBuilt: 2019,
    isVerified: false,
    ipfsMetadataUri: null,
    createdAt: new Date(),
    priceWei: 1150,
    isActive: true,
    images: [
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&crop&w=1200&q=80",
    ],
    history: [],
  },
  {
    id: "104",
    tokenId: "104",
    ownerAddress: "0x456C500Dea444444444444444444444444444444",
    sellerAddress: "0x456C500Dea444444444444444444444444444444",
    title: "Mono District Townhomes",
    description:
      "Urban townhomes with flexible workspaces, rooftop terraces, and shared mobility hub.",
    country: "United Kingdom",
    city: "London",
    addressLine: "7 Blackfriars Lane",
    propertyType: "Townhome",
    sizeSqft: 1650,
    yearBuilt: 2017,
    isVerified: true,
    ipfsMetadataUri: null,
    createdAt: new Date(),
    priceWei: 640,
    isActive: true,
    images: [
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&crop&w=1200&q=80",
    ],
    history: [],
  },
  {
    id: "105",
    tokenId: "105",
    ownerAddress: "0xA5bEA7A55C555555555555555555555555555555",
    sellerAddress: "0xA5bEA7A55C555555555555555555555555555555",
    title: "Studio One Carbon",
    description:
      "Minimalist studio with hotel services, co-working access, and short-term rental readiness.",
    country: "Japan",
    city: "Tokyo",
    addressLine: "4-2-1 Shibuya",
    propertyType: "Studio",
    sizeSqft: 720,
    yearBuilt: 2021,
    isVerified: true,
    ipfsMetadataUri: null,
    createdAt: new Date(),
    priceWei: 420,
    isActive: true,
    images: [
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
    ],
    history: [],
  },
  {
    id: "106",
    tokenId: "106",
    ownerAddress: "0x51FCDc34bd666666666666666666666666666666",
    sellerAddress: "0x51FCDc34bd666666666666666666666666666666",
    title: "Obsidian Lake House",
    description:
      "Lakeside retreat with panoramic decks, wellness spa, and private dock access.",
    country: "Canada",
    city: "Vancouver, BC",
    addressLine: "300 North Shore",
    propertyType: "House",
    sizeSqft: 3580,
    yearBuilt: 2016,
    isVerified: false,
    ipfsMetadataUri: null,
    createdAt: new Date(),
    priceWei: 1320,
    isActive: true,
    images: [
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&crop&w=1200&q=80",
    ],
    history: [],
  },
];

const filterDefaults: PropertyFilters = {
  query: "",
  location: "All locations",
  propertyType: "All types",
  priceRange: "All prices",
  minSize: "Any size",
  sortBy: "Featured",
};

const formatWei = (value: number) => `${value} Wei`;

const PropertiesPage: React.FC = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<PropertyFilters>(filterDefaults);

  const filteredListings = useMemo(() => {
    const query = filters.query.trim().toLowerCase();

    const matchesLocation = (listing: Listing) => {
      if (filters.location === "All locations") {
        return true;
      }
      return listing.city === filters.location;
    };

    const matchesType = (listing: Listing) => {
      if (filters.propertyType === "All types") {
        return true;
      }
      return listing.propertyType === filters.propertyType;
    };

    const matchesPrice = (listing: Listing) => {
      if (filters.priceRange === "All prices") {
        return true;
      }
      if (filters.priceRange === "Under 600") {
        return listing.priceWei < 600;
      }
      if (filters.priceRange === "600 - 900") {
        return listing.priceWei >= 600 && listing.priceWei <= 900;
      }
      return listing.priceWei > 900;
    };

    const matchesSize = (listing: Listing) => {
      if (filters.minSize === "Any size") {
        return true;
      }
      if (filters.minSize === "1000+ sqft") {
        return listing.sizeSqft >= 1000;
      }
      if (filters.minSize === "2000+ sqft") {
        return listing.sizeSqft >= 2000;
      }
      return listing.sizeSqft >= 3000;
    };

    const matchesQuery = (listing: Listing) => {
      if (!query) {
        return true;
      }
      return (
        listing.title.toLowerCase().includes(query) ||
        listing.city.toLowerCase().includes(query) ||
        listing.country.toLowerCase().includes(query) ||
        listing.propertyType.toLowerCase().includes(query)
      );
    };

    let filtered = listings.filter(
      (listing) =>
        listing.isActive &&
        matchesLocation(listing) &&
        matchesType(listing) &&
        matchesPrice(listing) &&
        matchesSize(listing) &&
        matchesQuery(listing)
    );

    if (filters.sortBy === "Price: Low to High") {
      filtered = [...filtered].sort((a, b) => a.priceWei - b.priceWei);
    } else if (filters.sortBy === "Price: High to Low") {
      filtered = [...filtered].sort((a, b) => b.priceWei - a.priceWei);
    } else if (filters.sortBy === "Newest") {
      filtered = [...filtered].sort((a, b) => b.yearBuilt - a.yearBuilt);
    }

    return filtered;
  }, [filters]);

  const updateFilter = (key: keyof PropertyFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters(filterDefaults);
  };

  return (
    <main className="properties-page">
      <section className="properties-hero">
        <div>
          <p className="properties-eyebrow">Marketplace</p>
          <h1 className="properties-title">Search and buy verified properties.</h1>
          <p className="properties-subtitle">
            Filter by location, type, and price to find the right property. All
            listings are presented in a clear black-and-white interface for fast comparison.
          </p>
        </div>
        <div className="properties-summary">
          <div>
            <p className="summary-label">Active listings</p>
            <p className="summary-value">{listings.length}</p>
          </div>
          <div>
            <p className="summary-label">Verified assets</p>
            <p className="summary-value">
              {listings.filter((item) => item.isVerified).length}
            </p>
          </div>
          <div>
            <p className="summary-label">Avg. price</p>
            <p className="summary-value">
              {Math.round(
                listings.reduce((total, item) => total + item.priceWei, 0) /
                  listings.length
              )}{" "}
              Wei
            </p>
          </div>
        </div>
      </section>

      <section className="properties-filters">
        <div className="filters-row">
          <div className="filter-group filter-search">
            <label htmlFor="property-search">Search</label>
            <input
              id="property-search"
              type="text"
              placeholder="Search by name, city, or type"
              value={filters.query}
              onChange={(event) => updateFilter("query", event.target.value)}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="filter-location">Location</label>
            <select
              id="filter-location"
              value={filters.location}
              onChange={(event) => updateFilter("location", event.target.value)}
            >
              <option>All locations</option>
              <option>Chicago, IL</option>
              <option>Lisbon</option>
              <option>Dubai</option>
              <option>London</option>
              <option>Tokyo</option>
              <option>Vancouver, BC</option>
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="filter-type">Property type</label>
            <select
              id="filter-type"
              value={filters.propertyType}
              onChange={(event) => updateFilter("propertyType", event.target.value)}
            >
              <option>All types</option>
              <option>Condo</option>
              <option>Loft</option>
              <option>Villa</option>
              <option>Townhome</option>
              <option>Studio</option>
              <option>House</option>
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="filter-price">Price</label>
            <select
              id="filter-price"
              value={filters.priceRange}
              onChange={(event) => updateFilter("priceRange", event.target.value)}
            >
              <option>All prices</option>
              <option>Under 600</option>
              <option>600 - 900</option>
              <option>900+</option>
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="filter-size">Min size</label>
            <select
              id="filter-size"
              value={filters.minSize}
              onChange={(event) => updateFilter("minSize", event.target.value)}
            >
              <option>Any size</option>
              <option>1000+ sqft</option>
              <option>2000+ sqft</option>
              <option>3000+ sqft</option>
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="filter-sort">Sort by</label>
            <select
              id="filter-sort"
              value={filters.sortBy}
              onChange={(event) => updateFilter("sortBy", event.target.value)}
            >
              <option>Featured</option>
              <option>Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>
        <div className="filters-actions">
          <p className="filters-count">
            Showing {filteredListings.length} of {listings.length} properties
          </p>
          <button type="button" className="filters-reset" onClick={clearFilters}>
            Reset filters
          </button>
        </div>
      </section>

      <section className="properties-grid" aria-label="Available properties">
        {filteredListings.map((listing) => (
          <article className="property-tile" key={listing.id}>
            <div className="property-image">
              <img src={listing.images[0]} alt={listing.title} />
              {listing.isVerified && <span className="property-badge">Verified</span>}
            </div>
            <div className="property-body">
              <div className="property-header">
                <div>
                  <h2>{listing.title}</h2>
                  <p className="property-location">
                    {listing.city}, {listing.country}
                  </p>
                </div>
                <div className="property-price">
                  <span>Listed price</span>
                  <strong>{formatWei(listing.priceWei)}</strong>
                </div>
              </div>
              <p className="property-description">{listing.description}</p>
              <div className="property-meta">
                <div>
                  <span>Type</span>
                  <strong>{listing.propertyType}</strong>
                </div>
                <div>
                  <span>Size</span>
                  <strong>{listing.sizeSqft} sqft</strong>
                </div>
                <div>
                  <span>Year</span>
                  <strong>{listing.yearBuilt}</strong>
                </div>
              </div>
              <div className="property-actions">
                <button
                  type="button"
                  className="property-ghost"
                  onClick={() => navigate("/property/0")}
                >
                  View details
                </button>
                <button type="button" className="property-buy">
                  Buy now
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
};

export default PropertiesPage;
