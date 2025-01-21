import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ZoomMeetingsDisplay = () => {
  const [bookingReferences, setBookingReferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        let bookingIds = [];
        const userEmail = localStorage.getItem('userEmail') ;
        
        // First API call to get attendees
        const attendeesResponse = await axios.get(
          'https://api.cal.com/v1/attendees?apiKey=cal_live_a5e4e260e68782e00b697d3feea93bba'
        );
        
        attendeesResponse.data.attendees.forEach(attendee => {
          if (attendee.email === userEmail) {
            bookingIds.push(attendee.bookingId);
          }
        });

        // Second API call to get booking references
        const bookingsResponse = await axios.get(
          'https://api.cal.com/v1/booking-references?apiKey=cal_live_a5e4e260e68782e00b697d3feea93bba'
        );

        const filteredBookings = bookingsResponse.data.booking_references.filter(
          booking_reference => 
            bookingIds.includes(booking_reference.bookingId) && 
            booking_reference.type === "zoom_video"
        );

        setBookingReferences(filteredBookings);
        console.log(bookingsResponse);
        console.log(bookingReferences);
        
        console.log('Filtered Bookings:', filteredBookings); // Debugging line
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMeetings();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-100 min-h-screen flex flex-col gap-6">
      <h1 className="text-3xl md:text-6xl mb-9 font-bold">Zoom Meetings</h1>
      {bookingReferences.length === 0 ? (
        <div className="text-xl font-semibold">No Zoom Meetings Found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookingReferences.map((meeting) => (
            <div 
              key={meeting.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="bg-blue-500 text-white p-4 rounded-t-lg">
                <h2 className="text-xl font-bold">Zoom Meeting</h2>
              </div>
              
              <div className="p-4 space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Meeting ID</p>
                  <p className="font-medium">{meeting.meetingId}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Password</p>
                  <p className="font-medium">{meeting.meetingPassword}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Meeting URL</p>
                  <a 
                    href={meeting.meetingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 break-all"
                  >
                    {meeting.meetingUrl}
                  </a>
                </div>

                <div>
                  <p className="text-sm text-gray-500">UID</p>
                  <p className="font-medium">{meeting.uid}</p>
                </div>

                <button 
                  onClick={() => window.open(meeting.meetingUrl, '_blank')}
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                >
                  Join Meeting
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ZoomMeetingsDisplay;