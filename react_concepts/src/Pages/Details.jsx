import { useState } from "react";
import "./Details.css";

function Details() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [nameTouched, setNameTouched] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);

  const nameError = nameTouched && name.trim() === "";
  const phoneError = phoneTouched && phone.trim() === "";

  const canSubmit =
    name.trim() !== "" &&
    phone.trim() !== "";

  function submitForm(e) {
    e.preventDefault();

    setNameTouched(true);
    setPhoneTouched(true);

    if (canSubmit) {
      alert("Details submitted successfully!");
    }
  }

  return (
    <div className="container">

      <h2>Details</h2>

      <form onSubmit={submitForm}>

        {/* Name - Required */}
        <label>Name *</label>

        <input
          type="text"
          value={name}
          placeholder="Enter name"
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setNameTouched(true)}
          className={nameError ? "input-error" : ""}
        />

        {nameError && (
          <span className="error-message">
            Name is required
          </span>
        )}


        {/* Phone - Required */}
        <label>Phone Number *</label>

        <input
          type="text"
          value={phone}
          placeholder="Enter phone number"
          onChange={(e) => setPhone(e.target.value)}
          onBlur={() => setPhoneTouched(true)}
          className={phoneError ? "input-error" : ""}
        />

        {phoneError && (
          <span className="error-message">
            Phone number is required
          </span>
        )}


        {/* Email - NOT Required */}
        <label>Email</label>

        <input
          type="email"
          value={email}
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />


        {/* Submit */}
        <button type="submit" disabled={!canSubmit}>
          Submit
        </button>

      </form>

    </div>
  );
}

export default Details;
