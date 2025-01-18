import React, { useEffect, useState } from "react";
import "./guest.css";

const Guest = () => {
  const [guestData, setGuestData] = useState([
    {
      id: 1,
      firstName: "Yesha",
      lastName: "Perez",
      contactNo: "09217680121",
      email: "yeng@gmail.com",
      roomNumber: "00001",
      checkInDate: "2024-12-14",
      checkOutDate: "2024-12-15",
      platform: "website",
      bookingStatus: "confirmed",
      bookingDate: "2024-12-01",
    },
    {
      id: 2,
      firstName: "Limuel",
      lastName: "Alcovendas",
      contactNo: "09212345678",
      email: "limwel@gmail.com",
      roomNumber: "00002",
      checkInDate: "2024-12-14",
      checkOutDate: "2024-12-15",
      platform: "app",
      bookingStatus: "pending",
      bookingDate: "2024-12-02",
    },
    {
      id: 3,
      firstName: "Mark",
      lastName: "Legend",
      contactNo: "09219876543",
      email: "mark@gmail.com",
      roomNumber: "00003",
      checkInDate: "2024-12-14",
      checkOutDate: "2024-12-15",
      platform: "third-party",
      bookingStatus: "cancelled",
      bookingDate: "2024-11-30",
    },
  ]);

  const [filter, setFilter] = useState(""); 
  const [sortOrder, setSortOrder] = useState("newest"); 
  const [bookingStatus, setBookingStatus] = useState(""); 
  const [platform, setPlatform] = useState(""); 


  useEffect(() => {
    const fetchGuestData = async () => {
      try {
      } catch (error) {
        console.error("Error fetching guest data:", error);
      }
    };

    fetchGuestData();
  }, []); 

  // Filter guests 
  const filteredGuests = guestData.filter((guest) => {
    const nameMatch = `${guest.firstName} ${guest.lastName}`
      .toLowerCase()
      .includes(filter.toLowerCase());
    const bookingStatusMatch = bookingStatus
      ? guest.bookingStatus.toLowerCase() === bookingStatus.toLowerCase()
      : true;
    const platformMatch = platform
      ? guest.platform.toLowerCase() === platform.toLowerCase()
      : true;
    return nameMatch && bookingStatusMatch && platformMatch;
  });

  // Sorting guests based on the selected order 
  const sortedGuests = filteredGuests.sort((a, b) => {
    if (sortOrder === "newest") {
      return new Date(b.bookingDate) - new Date(a.bookingDate); 
    } else {
      return new Date(a.bookingDate) - new Date(b.bookingDate); 
    }
  });

  const handleEdit = (guestId) => {
    // Handle edit action
    console.log("Edit guest with id:", guestId);
  };

  const handleArchive = (guestId) => {
    // Handle archive action
    console.log("Archive guest with id:", guestId);
  };

  return (
    <div className="guest-container">
      {/* Filter Row */}
      <div className="filter-row">
        {/* Filter Label */}
        <div className="filter-label">
          <label>Filter by:</label>
        </div>

        {/* Sort Order Dropdown */}
        <div className="filter-group">
          <label htmlFor="sort-order">Sort by:</label>
          <select
            id="sort-order"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)} // Update sort order state
          >
            <option value="newest">Newest to Oldest</option>
            <option value="oldest">Oldest to Newest</option>
          </select>
        </div>

        {/* Booking Status Dropdown */}
        <div className="filter-group">
          <label htmlFor="booking-status">Booking Status:</label>
          <select
            id="booking-status"
            value={bookingStatus}
            onChange={(e) => setBookingStatus(e.target.value)} // Update booking status state
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Platform Dropdown */}
        <div className="filter-group">
          <label htmlFor="platform">Platform:</label>
          <select
            id="platform"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          >
            <option value="">All</option>
            <option value="website">Website</option>
            <option value="app">App</option>
            <option value="third-party">Third-party</option>
          </select>
        </div>

        {/* Search by Name */}
        <div className="filter-group">
          <input
            id="guest-filter"
            type="text"
            placeholder="Search guest name"
            value={filter}
            onChange={(e) => setFilter(e.target.value)} 
          />
        </div>
      </div>

      {/* Guest Table */}
      <table>
        <thead>
          <tr>
            <th>Guest Name</th>
            <th>Contact Number</th>
            <th>Email Address</th>
            <th>Room Number</th>
            <th>Check-in Date</th>
            <th>Check-out Date</th>
            <th>Platform</th>
            <th>Booking Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedGuests.length > 0 ? (
            sortedGuests.map((guest) => (
              <tr key={guest.id}>
                <td>{guest.firstName} {guest.lastName}</td>
                <td>{guest.contactNo}</td>
                <td>{guest.email}</td>
                <td>{guest.roomNumber}</td>
                <td>{new Date(guest.checkInDate).toLocaleDateString()}</td>
                <td>{new Date(guest.checkOutDate).toLocaleDateString()}</td>
                <td>{guest.platform}</td>
                <td>{guest.bookingStatus}</td>
                <td>
                  <button onClick={() => handleEdit(guest.id)}>Edit</button>
                  <button onClick={() => handleArchive(guest.id)}>Archive</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No guests found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Guest;
