import React, { useState, useEffect } from "react";
import "./addFacilitiesModal.css";

const AddFacilityModal = ({ isModalOpen, handleCloseModal }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    action: "",
    facilityCategory: "",
    existingCategory: "",
    name: "",
    location: "",
    capacity: "",
    type: "",
    description: "",
    image: "",
    openingTime: "",
    closingTime: "",
    operationalDays: "",
    billingType: "",
    price: "",
  });

  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [touchedFields, setTouchedFields] = useState({});

  useEffect(() => {
    if (isModalOpen) {
      setFormData({
        action: "",
        facilityCategory: "",
        existingCategory: "",
        name: "",
        location: "",
        capacity: "",
        type: "",
        description: "",
        image: "",
        openingTime: "",
        closingTime: "",
        operationalDays: "",
        billingType: "",
        price: "",
      });
      setTouchedFields({});
      setCurrentStep(1);
      setErrorMessage("");
    }
  }, [isModalOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTimeChange = (e, field) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  };

  const handleFocus = (field) => {
    setTouchedFields((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  const getInputClass = (field) => {
    if (touchedFields[field]) {
      if (!formData[field] && (currentStep === 3 || formData[field] === "")) {
        return "input-error"; // Red outline if the field is touched and empty
      } else {
        return "input-success"; // Green outline if the field is touched and has a value
      }
    }
    return "input-default"; // Gray outline if not touched yet
  };
  
  

  const validateStep = () => {
    let isValid = true;

    if (currentStep === 1) {
      if (formData.action === "create" && formData.facilityCategory) {
        setIsNextEnabled(true);
      } else if (formData.action === "select" && formData.existingCategory) {
        setIsNextEnabled(true);
      } else {
        isValid = false;
        setIsNextEnabled(false);
      }
    } else if (currentStep === 2) {
      if (
        formData.name &&
        formData.location &&
        formData.capacity &&
        formData.type
      ) {
        setIsNextEnabled(true);
      } else {
        isValid = false;
        setIsNextEnabled(false);
      }
    } else if (currentStep === 3) {
      if (
        formData.openingTime &&
        formData.closingTime &&
        formData.operationalDays &&
        formData.price
      ) {
        setIsNextEnabled(true);
      } else {
        isValid = false;
        setIsNextEnabled(false);
      }
    }

    return isValid;
  };

  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
      setErrorMessage("");
    } else {
      const requiredFields =
        currentStep === 3
          ? ["openingTime", "closingTime", "operationalDays", "price"]
          : [];
      const stepFieldsTouched = {};
      requiredFields.forEach((field) => {
        stepFieldsTouched[field] = true;
      });
      setTouchedFields((prev) => ({
        ...prev,
        ...stepFieldsTouched,
      }));
      setErrorMessage("Please fill up the required fields");
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      console.log("Form Submitted:", formData);
      handleCloseModal();
    } else {
      const requiredFields = ["openingTime", "closingTime", "operationalDays", "price"];
      const stepFieldsTouched = {};
      requiredFields.forEach((field) => {
        stepFieldsTouched[field] = true;
      });
      setTouchedFields((prev) => ({
        ...prev,
        ...stepFieldsTouched,
      }));
      setErrorMessage("Please fill up the required fields");
    }
  };

  useEffect(() => {
    validateStep();
  }, [formData, currentStep]);

  if (!isModalOpen) return null;

  return (
    <div className="facility-modal-overlay">
      <div className="facility-modal-content">
        <div className="facility-stepper">
          <div className={`facility-step ${currentStep >= 1 ? 'active' : ''}`}>
            <div className="facility-circle">1</div>
            <p>Facility Category</p>
          </div>
          <div className={`facility-step ${currentStep >= 2 ? 'active' : ''}`}>
            <div className="facility-circle">2</div>
            <p>Facility Details</p>
          </div>
          <div className={`facility-step ${currentStep >= 3 ? 'active' : ''}`}>
            <div className="facility-circle">3</div>
            <p>Facility Operational Management</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="facility-form">
          {currentStep === 1 && (
            <div>
              <h4>Facility Category</h4>
              <div className="facility-form-group">
                <label>Pick an Action <span style={{ color: "red" }}>*</span>:</label>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="action"
                      value="create"
                      checked={formData.action === "create"}
                      onChange={handleChange}
                      onFocus={() => handleFocus("action")}
                      required
                    />
                    Create New Facility Category
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="action"
                      value="select"
                      checked={formData.action === "select"}
                      onChange={handleChange}
                      onFocus={() => handleFocus("action")}
                      required
                    />
                    Select Existing Facility Category
                  </label>
                </div>
              </div>
              {formData.action === "create" && (
                <div className="facility-form-group">
                  <label htmlFor="facilityCategory">Facility Category <span style={{ color: "red" }}>*</span>:</label>
                  <input
                    type="text"
                    id="facilityCategory"
                    name="facilityCategory"
                    value={formData.facilityCategory}
                    onChange={handleChange}
                    onFocus={() => handleFocus("facilityCategory")}
                    required
                    className={getInputClass("facilityCategory")}
                  />
                </div>
              )}
              {formData.action === "select" && (
                <div className="facility-form-group">
                  <label htmlFor="existingCategory">Facility Category <span style={{ color: "red" }}>*</span>:</label>
                  <select
                    id="existingCategory"
                    name="existingCategory"
                    value={formData.existingCategory}
                    onChange={handleChange}
                    onFocus={() => handleFocus("existingCategory")}
                    required
                    className={getInputClass("existingCategory")}
                  >
                    <option value="">Facility Category</option>
                    <option value="pool">Food</option>
                    <option value="gym">Wellness</option>
                    <option value="spa">Recreational</option>
                  </select>
                </div>
              )}

              <div className="facility-form-actions">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="facility-cancel-button"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="facility-submit-button"
                  disabled={!isNextEnabled}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h4>Facility Details</h4>
              <div className="facility-form-group">
                <label htmlFor="image">Upload Image (Optional):</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                />
              </div>
              <div className="facility-form-group">
                <label htmlFor="name">Facility Name <span style={{ color: "red" }}>*</span>:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => handleFocus("name")}
                  required
                  className={getInputClass("name")}
                />
              </div>
              <div className="facility-form-group">
                <label htmlFor="location">Location <span style={{ color: "red" }}>*</span>:</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  onFocus={() => handleFocus("location")}
                  required
                  className={getInputClass("location")}
                />
              </div>
              <div className="facility-form-group">
                <label htmlFor="capacity">Capacity <span style={{ color: "red" }}>*</span>:</label>
                <input
                  type="number"
                  id="capacity"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  onFocus={() => handleFocus("capacity")}
                  required
                  className={getInputClass("capacity")}
                />
              </div>
              <div className="facility-form-group">
                <label htmlFor="type">Facility Type <span style={{ color: "red" }}>*</span>:</label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  onFocus={() => handleFocus("type")}
                  required
                  className={getInputClass("type")}
                >
                  <option value="">Select Facility Type</option>
                  <option value="indoor">Indoor</option>
                  <option value="outdoor">Outdoor</option>
                </select>
              </div>

              <div className="facility-form-actions">
                <button
                  type="button"
                  onClick={prevStep}
                  className="facility-back-button"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="facility-submit-button"
                  disabled={!isNextEnabled}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h4>Facility Operational Management</h4>
              <div className="facility-form-group">
                <label htmlFor="openingTime">Opening Time <span style={{ color: "red" }}>*</span>:</label>
                <input
                  type="time"
                  id="openingTime"
                  name="openingTime"
                  value={formData.openingTime}
                  onChange={(e) => handleTimeChange(e, "openingTime")}
                  required
                  className={getInputClass("openingTime")}
                />
              </div>
              <div className="facility-form-group">
                <label htmlFor="closingTime">Closing Time <span style={{ color: "red" }}>*</span>:</label>
                <input
                  type="time"
                  id="closingTime"
                  name="closingTime"
                  value={formData.closingTime}
                  onChange={(e) => handleTimeChange(e, "closingTime")}
                  required
                  className={getInputClass("closingTime")}
                />
              </div>
              <div className="facility-form-group">
                <label htmlFor="operationalDays">Operational Days <span style={{ color: "red" }}>*</span>:</label>
                <input
                  type="text"
                  id="operationalDays"
                  name="operationalDays"
                  value={formData.operationalDays}
                  onChange={handleChange}
                  onFocus={() => handleFocus("operationalDays")}
                  required
                  className={getInputClass("operationalDays")}
                />
              </div>
              <div className="facility-form-group">
                <label htmlFor="price">Price <span style={{ color: "red" }}>*</span>:</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  onFocus={() => handleFocus("price")}
                  required
                  className={getInputClass("price")}
                />
              </div>

              <div className="facility-form-actions">
                <button
                  type="button"
                  onClick={prevStep}
                  className="facility-back-button"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="facility-submit-button"
                >
                  Submit
                </button>

              </div>
            </div>
          )}
        </form>
        {errorMessage && <p className="facility-error-message">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default AddFacilityModal;
