import React from "react";
import { NavBar } from "../components";
import "./LandingPage.css";

const LandingPage: React.FC = () => {
  return (
    <>
      <NavBar />
      <div>
        <h1 className="title-1">ChainEstate</h1>
        <p className="title-2">Own, Invest, and Trade Real Estate on the Blockchain</p>
        <p className="title-3">ChainEstate makes property ownership transparent, secure, and decentralized. Explore properties, track ownership, and invest seamlessly</p>
        <div className="button-container">
          <button className="button button-1">Explore Properties</button>
          <button className="button button-2">Sign Up</button>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
