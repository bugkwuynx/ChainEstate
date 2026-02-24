import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddPropertyPage.css";
import type { NewProperty } from "@/types/Property.types";

const PROPERTY_TYPES = [
  "House",
  "Apartment",
  "Condo",
  "Villa",
  "Studio",
  "Loft",
  "Townhome",
  "Other",
];

const initialForm: Omit<NewProperty, "ownerId"> = {
  tokenAddress: "",
  title: "",
  description: "",
  country: "",
  city: "",
  addressLine: "",
  propertyType: "",
  sizeSqft: 0,
  yearBuilt: 0,
};

const AddPropertyPage: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = (field: keyof typeof form, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError("Title is required.");
      return;
    }
    if (!form.country.trim()) {
      setError("Country is required.");
      return;
    }
    if (!form.city.trim()) {
      setError("City is required.");
      return;
    }
    if (!form.addressLine.trim()) {
      setError("Address is required.");
      return;
    }
    if (!form.propertyType) {
      setError("Property type is required.");
      return;
    }
    if (form.sizeSqft <= 0) {
      setError("Size (sq ft) must be greater than 0.");
      return;
    }
    if (form.yearBuilt <= 0) {
      setError("Year built must be valid.");
      return;
    }

    setSubmitting(true);
    setError(null);
    try{
      /**
       * CALLING API HERE
       */
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create property.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="add-property-page">
      <div className="add-property-card">
        <h1 className="add-property-title">Add property</h1>
        <p className="add-property-subtitle">
          Enter the required details to register a new property.
        </p>

        <form className="add-property-form" onSubmit={handleSubmit}>
          {error && <p className="add-property-error" role="alert">{error}</p>}
          <label className="add-property-label">
            Title <span className="add-property-required">*</span>
          </label>
          <input
            type="text"
            className="add-property-input"
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            placeholder="e.g. Soho Loft 12A"
            required
          />

          <label className="add-property-label">Description</label>
          <textarea
            className="add-property-input add-property-textarea"
            value={form.description ?? ""}
            onChange={(e) => update("description", e.target.value)}
            placeholder="Optional description"
            rows={3}
          />

          <label className="add-property-label">
            Country <span className="add-property-required">*</span>
          </label>
          <input
            type="text"
            className="add-property-input"
            value={form.country}
            onChange={(e) => update("country", e.target.value)}
            placeholder="e.g. United States"
            required
          />

          <label className="add-property-label">
            City <span className="add-property-required">*</span>
          </label>
          <input
            type="text"
            className="add-property-input"
            value={form.city}
            onChange={(e) => update("city", e.target.value)}
            placeholder="e.g. New York"
            required
          />

          <label className="add-property-label">
            Address line <span className="add-property-required">*</span>
          </label>
          <input
            type="text"
            className="add-property-input"
            value={form.addressLine}
            onChange={(e) => update("addressLine", e.target.value)}
            placeholder="Street address"
            required
          />

          <label className="add-property-label">
            Property type <span className="add-property-required">*</span>
          </label>
          <select
            className="add-property-input add-property-select"
            value={form.propertyType}
            onChange={(e) => update("propertyType", e.target.value)}
            required
          >
            <option value="">Select type</option>
            {PROPERTY_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          <label className="add-property-label">
            Size (sq ft) <span className="add-property-required">*</span>
          </label>
          <input
            type="number"
            className="add-property-input"
            min={1}
            value={form.sizeSqft || ""}
            onChange={(e) => update("sizeSqft", e.target.value ? Number(e.target.value) : 0)}
            placeholder="e.g. 1200"
            required
          />

          <label className="add-property-label">
            Year built <span className="add-property-required">*</span>
          </label>
          <input
            type="number"
            className="add-property-input"
            min={1800}
            max={new Date().getFullYear() + 1}
            value={form.yearBuilt || ""}
            onChange={(e) => update("yearBuilt", e.target.value ? Number(e.target.value) : 0)}
            placeholder="e.g. 2020"
            required
          />

          <div className="add-property-actions">
            <button
              type="button"
              className="add-property-back"
              onClick={() => navigate("/dashboard")}
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="add-property-submit"
              disabled={submitting}
            >
              {submitting ? "Creating…" : "Create property"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default AddPropertyPage;
