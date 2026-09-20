"use client";

import { FormEvent, useState } from "react";
import { projectTypeOptions, waLink } from "@/lib/site-config";

export default function QuoteForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("");
  const [details, setDetails] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const lines = [
      "Hello NYRA Constructions, I'd like a quote.",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Project type: ${type}`,
      details ? `Details: ${details}` : null,
    ].filter(Boolean);

    window.open(waLink(lines.join("\n")), "_blank");
  }

  return (
    <form className="quote-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="name">Full name</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-row">
        <label htmlFor="phone">Phone number</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className="form-row">
        <label htmlFor="type">Project type</label>
        <select
          id="type"
          name="type"
          required
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="" disabled>
            Select project type
          </option>
          {projectTypeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="form-row">
        <label htmlFor="details">Project details</label>
        <textarea
          id="details"
          name="details"
          rows={4}
          placeholder="Location, approximate size, and what you need"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary btn-block">
        Send via WhatsApp
      </button>
      <p className="form-note">
        This opens WhatsApp with your details filled in, ready to send.
      </p>
    </form>
  );
}
