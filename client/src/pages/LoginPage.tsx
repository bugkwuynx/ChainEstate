import "./LoginPage.css";
import React from "react";

export default function LoginPage() {
  return (
    <div className="login-page">
      <div className="login-shell">
        <section className="login-hero">
          <div className="login-brand">
            <span className="login-brand__mark" />
            <div>
              <p className="login-brand__name">ChainEstate</p>
              <p className="login-brand__tag">Private capital real estate</p>
            </div>
          </div>

          <h1 className="login-hero__title">
            Manage portfolios with clarity and confidence.
          </h1>
          <p className="login-hero__subtitle">
            A monochrome workspace built for finance teams, real-estate
            investors, and advisory partners.
          </p>

          <div className="login-hero__stats">
            <div>
              <p className="login-hero__value">$12.4B</p>
              <p className="login-hero__label">Assets monitored</p>
            </div>
            <div>
              <p className="login-hero__value">240+</p>
              <p className="login-hero__label">Institutional clients</p>
            </div>
          </div>

          <div className="login-hero__card">
            <p className="login-hero__card-title">Today&apos;s snapshot</p>
            <div className="login-hero__card-row">
              <span>Market exposure</span>
              <span>Balanced</span>
            </div>
            <div className="login-hero__card-row">
              <span>Liquidity signal</span>
              <span>Stable</span>
            </div>
            <div className="login-hero__card-row">
              <span>Regional mix</span>
              <span>Global core</span>
            </div>
          </div>
        </section>

        <section className="login-panel">
          <div className="login-panel__header">
            <p className="login-panel__eyebrow">Secure access</p>
            <h2>Welcome back</h2>
            <p className="login-panel__subtext">
              Sign in to continue your investor dashboard.
            </p>
          </div>

          <form className="login-form">
            <label className="login-field">
              <span>Email address</span>
              <input type="email" placeholder="you@firm.com" />
            </label>
            <label className="login-field">
              <span>Password</span>
              <input type="password" placeholder="••••••••••" />
            </label>
            <div className="login-form__row">
              <label className="login-checkbox">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <button className="login-link" type="button">
                Forgot password?
              </button>
            </div>
            <button className="login-submit" type="button">
              Sign in
            </button>
          </form>

          <div className="login-divider">
            <span>or continue with</span>
          </div>
          <div className="login-sso">
            <button className="login-sso__button" type="button">
              Sign in with SSO
            </button>
            <button className="login-sso__button login-sso__button--ghost" type="button">
              Request access
            </button>
          </div>

          <p className="login-panel__footer">
            New to ChainEstate? <button className="login-link" type="button">Create an account</button>
          </p>
        </section>
      </div>
    </div>
  );
}
