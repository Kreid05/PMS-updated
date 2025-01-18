import React, { useState, useEffect } from "react";
import AddRoom from "./Addroom"; 
import RoomType from "./RoomType"; 
import './room.css';

const Room = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isAddRoomOpen, setIsAddRoomOpen] = useState(false);
  const [rooms, setRooms] = useState([
    {
      id: "00001",
      type: "Standard Room",
      floor: "1",
      rate: "1000",
      capacity: "2 guests",
      status: "Available",
      lastUpdated: "2023-12-25"
    },
    {
      id: "00002",
      type: "Deluxe Room",
      floor: "2",
      rate: "2000",
      capacity: "4 guests",
      status: "Occupied",
      lastUpdated: "2024-01-05"
    },
    {
      id: "00003",
      type: "Suite Room",
      floor: "3",
      rate: "3000",
      capacity: "6 guests",
      status: "Reserved",
      lastUpdated: "2024-01-03"
    },
    {
      id: "00004",
      type: "Standard Room",
      floor: "1",
      rate: "1000",
      capacity: "2 guests",
      status: "Out of Order",
      lastUpdated: "2023-12-20"
    },
    {
      id: "00005",
      type: "Deluxe Room",
      floor: "2",
      rate: "2200",
      capacity: "3 guests",
      status: "In Maintenance",
      lastUpdated: "2024-01-01"
    }
  ]);
  const [activeTab, setActiveTab] = useState("room");

  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleStatusFilter = (e) => setStatusFilter(e.target.value);
  const handleTypeFilter = (e) => setTypeFilter(e.target.value);
  const handleStartDateChange = (e) => setStartDate(e.target.value);
  const handleEndDateChange = (e) => setEndDate(e.target.value);

  const handleResetFilters = () => {
    setSearchTerm("");
    setStatusFilter("");
    setTypeFilter("");
    setStartDate("");
    setEndDate("");
  };

  const handleAddRoom = (roomData) => {
    const newRoom = {
      id: String(rooms.length + 1).padStart(5, "0"),
      type: roomData.roomType,
      floor: roomData.floorNumber,
      status: roomData.roomStatus,
      lastUpdated: new Date().toISOString().split("T")[0], // Today's date
    };
    setRooms((prevRooms) => [...prevRooms, newRoom]);
    setIsAddRoomOpen(false);
    alert("Room added successfully!");
  };

  const handleEditRoom = (roomId) => {
    alert(`Edit room with ID: ${roomId}`);
  };

  const handleArchiveRoom = (roomId) => {
    alert(`Archive room with ID: ${roomId}`);
  };

  useEffect(() => {
    const intervalId = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => clearInterval(intervalId);
  }, []);

  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch = (room.id && room.id.includes(searchTerm)) || 
                          (room.type && room.type.toLowerCase().includes(searchTerm.toLowerCase()));
  
    const matchesStatus = statusFilter ? (room.status && room.status.toLowerCase() === statusFilter.toLowerCase()) : true;
    const matchesType = typeFilter ? (room.type && room.type.toLowerCase().includes(typeFilter.toLowerCase())) : true;
    const matchesDate =
      (!startDate || (room.lastUpdated && new Date(room.lastUpdated) >= new Date(startDate))) &&
      (!endDate || (room.lastUpdated && new Date(room.lastUpdated) <= new Date(endDate)));
  
    return matchesSearch && matchesStatus && matchesType && matchesDate;
  });
  
  return (
    <div className="room-container">
      <div className="tabs">
        <button 
          className={`tab-button ${activeTab === "room" ? "active" : ""}`}
          onClick={() => setActiveTab("room")}
        >
          Room
        </button>
        <button 
          className={`tab-button ${activeTab === "roomType" ? "active" : ""}`}
          onClick={() => setActiveTab("roomType")}
        >
          Room Type
        </button>
      </div>

      <div className="room-filters">
        {activeTab === "room" && (
          <>
            <div className="filter-by">
              <h2>Filter By:</h2>
            </div>

            <div className="filter-option">
              <label htmlFor="status-filter">Room Status:</label>
              <select id="status-filter" value={statusFilter} onChange={handleStatusFilter}>
                <option value="">All</option>
                <option value="Available">Available</option>
                <option value="Occupied">Occupied</option>
                <option value="Reserved">Reserved</option>
                <option value="Out of Order">Out of Order</option>
                <option value="In Maintenance">In Maintenance</option>
              </select>
            </div>

            <div className="filter-option">
              <label htmlFor="type-filter">Room Type:</label>
              <select id="type-filter" value={typeFilter} onChange={handleTypeFilter}>
                <option value="">All</option>
                <option value="Standard Room">Standard Room</option>
                <option value="Deluxe Room">Deluxe Room</option>
                <option value="Suite Room">Suite Room</option>
              </select>
            </div>

            <div className="filter-option">
              <label htmlFor="date-range">Date Range:</label>
              <div className="date-range-inputs">
                <input
                  type="date"
                  id="start-date"
                  value={startDate}
                  onChange={handleStartDateChange}
                />
                <span className="date-separator">-</span>
                <input
                  type="date"
                  id="end-date"
                  value={endDate}
                  onChange={handleEndDateChange}
                />
              </div>
            </div>

            <div className="filter-search">
              <input
                type="text"
                placeholder="Search room"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>

            <div className="room-filters-wrapper">
              <button className="reset-filters-btn" onClick={handleResetFilters}>
                Reset Filters
              </button>
              <button className="add-room-btn" onClick={() => setIsAddRoomOpen(true)}>
                + Add Room
              </button>
            </div>

            <AddRoom
              isOpen={isAddRoomOpen}
              onClose={() => setIsAddRoomOpen(false)}
              onSubmit={handleAddRoom}
            />
          </>
        )}

        {activeTab === "roomType" && <RoomType />}
      </div>

      <div className="room-table-container">
        {activeTab === "room" && (
          <table className="room-table">
            <thead>
              <tr>
                <th>Room #</th>
                <th>Room Type</th>
                <th>Floor Number</th>
                <th>Rate</th>
                <th>Capacity</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRooms.map((room) => (
                <tr key={room.id}>
                  <td>{room.id}</td>
                  <td>{room.type}</td>
                  <td>{room.floor}</td>
                  <td>{room.rate}</td>
                  <td>{room.capacity}</td>
                  <td>
                    <span className={`status ${room.status.toLowerCase().replace(/ /g, "-")}`}>
                      {room.status}
                    </span>
                  </td>
                  <td>
                    <button className="room-action-btn edit-btn" onClick={() => handleEditRoom(room.id)}>Edit</button>
                    <button className="room-action-btn archive-btn" onClick={() => handleArchiveRoom(room.id)}>Archive</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Room;
