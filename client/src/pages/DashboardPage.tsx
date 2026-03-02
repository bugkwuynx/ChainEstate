import React from "react";
import "./DashboardPage.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import type { Property } from "@/types/Property.types";
import { useAuth } from "@/context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

const activeOffers = [
  {
    property: "Canyon Ridge Estate",
    type: "Bid",
    amount: "$820K",
    status: "Open",
  },
  {
    property: "Harbor Point Towers",
    type: "Offer",
    amount: "$540K",
    status: "Negotiating",
  },
  {
    property: "Lakeside Villas",
    type: "Bid",
    amount: "$390K",
    status: "Countered",
  },
];

const potentialProperties = [
  {
    name: "Nova District Penthouse",
    location: "Singapore",
    projectedYield: "8.4%",
    fundingWindow: "3 days left",
  },
  {
    name: "Seaside Residences",
    location: "Lisbon, PT",
    projectedYield: "6.9%",
    fundingWindow: "Pre-listing",
  },
  {
    name: "Greenpoint Commons",
    location: "Brooklyn, NY",
    projectedYield: "7.5%",
    fundingWindow: "5 days left",
  },
];

const transactions = [
  {
    title: "Purchased 12% of Harbor Point Towers",
    date: "Jan 18, 2026",
    amount: "$180K",
  },
  {
    title: "Dividend payout - Montmartre Studio",
    date: "Jan 10, 2026",
    amount: "$4.8K",
  },
  {
    title: "Listed 5% of Marina Residences",
    date: "Dec 28, 2025",
    amount: "$62K",
  },
];

const activity = [
  {
    detail: "Offer accepted on Canyon Ridge Estate",
    time: "2h ago",
  },
  {
    detail: "New appraisal uploaded for Soho Loft 12A",
    time: "6h ago",
  },
  {
    detail: "Wallet connected from Ledger X",
    time: "Yesterday",
  },
];

const getOwnedProperties = async (): Promise<Property[]> => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  if (!token || !userId) {
    throw new Error("User not authenticated");
  }

  const getOwnedPropertiesResult = await fetch(
    `${API_URL}/properties?ownerId=${userId}`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  if (getOwnedPropertiesResult.status === 401) {
    throw new Error("Token expired or unauthorized");
  }

  if (!getOwnedPropertiesResult.ok) {
    throw new Error("Error fetching owned properties");
  }

  const ownedProperties: Property[] = await getOwnedPropertiesResult.json();

  return ownedProperties.slice(0, 3);
};

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [ownedProperties, setOwnedProperties] = useState<Property[]>([]);

  useEffect(() => {
    getOwnedProperties()
      .then(setOwnedProperties)
      .catch((error) => {
        if (error.message === "Token expired or unauthorized") {
          logout();
        } else {
          setError(error.message);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="dashboard-page">
      <section className="dashboard-hero">
        <div>
          <p className="dashboard-eyebrow">User Dashboard</p>
          <h1 className="dashboard-title">Welcome back, Alexis.</h1>
          <p className="dashboard-subtitle">
            Monitor owned properties, manage bids, and track activity across
            your on-chain portfolio.
          </p>
        </div>
        <div className="dashboard-summary">
          <div>
            <p className="summary-label">Total portfolio value</p>
            <p className="summary-value">$5.92M</p>
          </div>
          <div>
            <p className="summary-label">Active offers</p>
            <p className="summary-value">3</p>
          </div>
          <div>
            <p className="summary-label">Yield to date</p>
            <p className="summary-value">+12.4%</p>
          </div>
        </div>
      </section>

      <section className="dashboard-section">
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <h2>Owned Properties</h2>
            <div className="dashboard-card-header-actions">
              <span className="dashboard-chip">3 assets</span>
              <button
                type="button"
                className="dashboard-btn-add"
                onClick={() => navigate("/property/add")}
              >
                Add property
              </button>
            </div>
          </div>
          <div className="dashboard-list">
            {ownedProperties.map((property, index) => (
              <div className="dashboard-list-item" key={property.title}>
                <div
                  onClick={() => navigate(`/property/${index}`)}
                  style={{ cursor: "pointer" }}
                >
                  <p className="dashboard-item-title">{property.title}</p>
                  <p className="dashboard-item-subtitle">
                    {property.addressLine} · {property.city}
                  </p>
                </div>
                <span className="dashboard-item-value">
                  {property.yearBuilt}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <h2>Active Offers & Bids</h2>
            <span className="dashboard-chip">3 open</span>
          </div>
          <div className="dashboard-list">
            {activeOffers.map((offer, index) => (
              <div className="dashboard-list-item" key={offer.property}>
                <div
                  onClick={() => navigate(`/property/${index}`)}
                  style={{ cursor: "pointer" }}
                >
                  <p className="dashboard-item-title">{offer.property}</p>
                  <p className="dashboard-item-subtitle">
                    {offer.type} · {offer.status}
                  </p>
                </div>
                <span className="dashboard-item-value">{offer.amount}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <h2>Potential Properties</h2>
            <span className="dashboard-chip">Watchlist</span>
          </div>
          <div className="dashboard-list">
            {potentialProperties.map((property, index) => (
              <div className="dashboard-list-item" key={property.name}>
                <div
                  onClick={() => navigate(`/property/${index}`)}
                  style={{ cursor: "pointer" }}
                >
                  <p className="dashboard-item-title">{property.name}</p>
                  <p className="dashboard-item-subtitle">
                    {property.location} · {property.projectedYield} yield
                  </p>
                </div>
                <span className="dashboard-item-value">
                  {property.fundingWindow}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-card dashboard-card-split">
          <div>
            <div className="dashboard-card-header">
              <h2>Transactions</h2>
              <span className="dashboard-chip">Recent</span>
            </div>
            <div className="dashboard-list">
              {transactions.map((item) => (
                <div className="dashboard-list-item" key={item.title}>
                  <div>
                    <p className="dashboard-item-title">{item.title}</p>
                    <p className="dashboard-item-subtitle">{item.date}</p>
                  </div>
                  <span className="dashboard-item-value">{item.amount}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="dashboard-divider" />
          <div>
            <div className="dashboard-card-header">
              <h2>Activity</h2>
              <span className="dashboard-chip">Live</span>
            </div>
            <div className="dashboard-activity">
              {activity.map((item) => (
                <div className="dashboard-activity-item" key={item.detail}>
                  <span className="dashboard-activity-dot" />
                  <div>
                    <p className="dashboard-item-title">{item.detail}</p>
                    <p className="dashboard-item-subtitle">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default DashboardPage;
