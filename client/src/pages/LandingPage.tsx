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

const features = [
  {
    title: "Decentralized ownership",
    description: "Tokenized property titles make ownership transparent and verifiable.",
  },
  {
    title: "Secure transactions",
    description: "Smart contracts ensure every transfer is immutable and audited.",
  },
  {
    title: "Real-time property data",
    description: "Live updates with on-chain history for confident decisions.",
  },
  {
    title: "Fractional investment",
    description: "Own shares of premium properties without the full price tag.",
  },
];

const steps = [
  {
    title: "Connect wallet",
    description: "Sign in securely using your preferred crypto wallet.",
  },
  {
    title: "Browse and invest",
    description: "Discover properties and allocate capital across portfolios.",
  },
  {
    title: "Manage and trade",
    description: "Track performance, receive updates, or sell fractional shares.",
  },
];

const LandingPage: React.FC = () => {
  return (
    <>
      <main className="landing-page">
        <section className="hero">
          <div className="hero-content">
            <span className="eyebrow">ChainEstate</span>
            <h1 className="hero-title">
              Own, invest, and trade real estate on the blockchain.
            </h1>
            <p className="hero-subtitle">
              ChainEstate brings transparent, secure, and decentralized property ownership
              to modern investors. Explore verified assets, monitor ownership, and
              diversify with confidence.
            </p>
            <div className="hero-actions">
              <Link className="primary-button" to="/properties">
                Explore Properties
              </Link>
              <Link className="secondary-button" to="/sign-up">
                Sign Up
              </Link>
            </div>
            <div className="hero-links">
              <button
                className="ghost-button"
                onClick={() => scrollToTarget("target-1")}
              >
                Key Features
              </button>
              <button
                className="ghost-button"
                onClick={() => scrollToTarget("target-2")}
              >
                How It Works
              </button>
            </div>
            <div className="hero-stats">
              <div className="stat-card">
                <p className="stat-value">400+</p>
                <p className="stat-label">Tokenized listings</p>
              </div>
              <div className="stat-card">
                <p className="stat-value">$128M</p>
                <p className="stat-label">Assets on-chain</p>
              </div>
              <div className="stat-card">
                <p className="stat-value">24/7</p>
                <p className="stat-label">Ownership visibility</p>
              </div>
            </div>
          </div>
          <div className="hero-panel">
            <div className="panel-card">
              <p className="panel-title">Trusted by modern investors</p>
              <p className="panel-description">
                Built for compliance-ready, transparent transactions with instant
                provenance, digital deeds, and real-time performance insights.
              </p>
              <div className="panel-divider" />
              <div className="panel-list">
                <div className="panel-item">
                  <span className="panel-dot" />
                  <span>Immutable ownership ledger</span>
                </div>
                <div className="panel-item">
                  <span className="panel-dot" />
                  <span>Institution-grade security</span>
                </div>
                <div className="panel-item">
                  <span className="panel-dot" />
                  <span>Global fractional access</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="target-1">
          <div className="section-header">
            <p className="section-kicker">Key Features</p>
            <h2 className="section-title">Designed for clarity and confidence.</h2>
            <p className="section-subtitle">
              Every detail is engineered to make real estate investing feel clean,
              secure, and effortless.
            </p>
          </div>
          <div className="feature-grid">
            {features.map((feature) => (
              <div className="feature-card" key={feature.title}>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section section-alt" id="target-2">
          <div className="section-header">
            <p className="section-kicker">How It Works</p>
            <h2 className="section-title">Start investing in three steps.</h2>
            <p className="section-subtitle">
              Move from discovery to ownership with a seamless onboarding flow.
            </p>
          </div>
          <div className="steps-grid">
            {steps.map((step, index) => (
              <div className="step-card" key={step.title}>
                <span className="step-number">{`0${index + 1}`}</span>
                <div>
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default LandingPage;
