import React, { useState, useEffect } from "react";
import "./facilities.css";
import AddFacilityModal from "./AddFacilities";

const FilterBar = ({ options, filters, handleFilterChange, handleResetFilters, handleOpenModal }) => {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label htmlFor="facilityType">Facility Type:</label>
        <select
          className="filter-dropdown"
          id="facilityType"
          name="facilityType"
          value={filters.facilityType}
          onChange={handleFilterChange}
        >
          {options.facilityType.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <label htmlFor="availability">Availability:</label>
        <select
          className="filter-dropdown"
          id="availability"
          name="availability"
          value={filters.availability}
          onChange={handleFilterChange}
        >
          {options.availability.map((avail, index) => (
            <option key={index} value={avail}>
              {avail}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <label htmlFor="operatingDays">Operating Days:</label>
        <select
          className="filter-dropdown"
          id="operatingDays"
          name="operatingDays"
          value={filters.operatingDays}
          onChange={handleFilterChange}
        >
          {options.operatingDays.map((operatingDays, index) => (
            <option key={index} value={operatingDays}>
              {operatingDays}
            </option>
          ))}
        </select>
      </div>
      <div className="action-buttons">
        <button className="reset-button" onClick={handleResetFilters}>
          Reset Filter
        </button>
        <button className="add-facilities-button" onClick={handleOpenModal}>
          Add Facilities
        </button>
      </div>
    </div>
  );
};

const Table = ({ data }) => {
  return (
    <table className="facilities-table">
      <thead>
        <tr>
          <th>Image</th>
          <th>Facility Name</th>
          <th>Facility Type</th>
          <th>Location</th>
          <th>Price</th>
          <th>Opening - Closing Hours</th>
          <th>Operational Days</th>
          <th>Capacity</th>
          <th>Availability</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((facility, index) => (
          <tr key={index}>
            <td>
              <img src={facility.image} alt={facility.name} />
            </td>
            <td>{facility.name}</td>
            <td>{facility.type}</td>
            <td>{facility.location}</td>
            <td>{facility.price}</td>
            <td>{facility.billingType}</td>
            <td>{facility.hours}</td>
            <td>{facility.days}</td>
            <td>{facility.capacity}</td>
            <td>{facility.availability}</td>
            <td>
              <button className="action-button">Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const Facilities = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const [filters, setFilters] = useState({
    facilityType: "All",
    availability: "All",
    operatingDays: "All",
  });

  const filterOptions = {
    facilityType: ["All", "Gym", "Pool", "Conference Room"],
    availability: ["All", "Available", "Not Available"],
    operatingDays: ["All", "Mon-Fri", "Mon-Sun"],
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleResetFilters = () => {
    setFilters({
      facilityType: "All",
      availability: "All",
      operatingDays: "All",
    });
  };

  const filteredData = []; // Replace with your data

  return (
    <div className="facilities-container">
      <div className="table-container">
        <FilterBar
          options={filterOptions}
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleResetFilters={handleResetFilters}
          handleOpenModal={handleOpenModal}
        />
        <Table data={filteredData} />
      </div>
      <AddFacilityModal isModalOpen={isModalOpen} handleCloseModal={handleCloseModal} />
    </div>
  );
};

export default Facilities;
