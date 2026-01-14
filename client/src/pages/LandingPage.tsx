import React from "react";
import { NavBar } from "../components";
import "./LandingPage.css";
import { Link } from "react-router-dom";

const scrollToTarget = (targetId: string) => {
  const target = document.getElementById(targetId);
  if (target) {
      target.scrollIntoView({ behavior: "smooth" });
  }
};

const LandingPage: React.FC = () => {
  return (
    <>
      <NavBar />
      {/* Header Section */}
      <div>
        <h1 className="title-1">ChainEstate</h1>
        <p className="title-2">Own, Invest, and Trade Real Estate on the Blockchain</p>
        <p className="title-3">ChainEstate makes property ownership transparent, secure, and decentralized. Explore properties, track ownership, and invest seamlessly</p>
        <div className="button-container">
          <Link to="/properties">
            <button className="button button-1">Explore Properties</button>
          </Link>
          <Link to="/sign-up">
            <button className="button button-2">Sign Up</button>
          </Link>
        </div>
      </div>
      {/* Key Feature Section */}
      <div className="explore-key-features-container">
        <button className="explore-key-features-button" onClick={() => scrollToTarget("target-1")}>Explore Key Features</button>
      </div>
      <div id="target-1">
        <h2 className="key-feature-title">Key Features</h2>
        <div className="key-feature-container">
          <div className="key-feature-item">
            <h3 className="key-feature-item-title">Key Feature 1</h3>
            <p className="key-feature-item-description-1">Decentralized Ownership</p>
            <p className="key-feature-item-description-2">All properties are tokenized on-chain</p>
          </div>
          <div className="key-feature-item">
            <h3 className="key-feature-item-title">Key Feature 2</h3>
            <p className="key-feature-item-description-1">Secure Transactions</p>
            <p className="key-feature-item-description-2">Transparent blockchain-based ownership transfers</p>
          </div>
        </div>
        <div className="key-feature-container">
          <div className="key-feature-item">
            <h3 className="key-feature-item-title">Key Feature 3</h3>
            <p className="key-feature-item-description-1">Real-Time Property Data</p>
            <p className="key-feature-item-description-2">On-chain updates and historical ownership records</p>
          </div>
          <div className="key-feature-item">
            <h3 className="key-feature-item-title">Key Feature 4</h3>
            <p className="key-feature-item-description-1">Fractional Investment</p>
            <p className="key-feature-item-description-2">Buy shares of a property rather than a whole</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
