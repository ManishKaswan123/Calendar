import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Day = ({ date, events, onDayClick, onDeleteEvent, className }) => {
  const [showEvents, setShowEvents] = useState(false);

  const handleDayClick = () => {
    onDayClick(date);
  };

  const handleToggleEvents = () => {
    setShowEvents(!showEvents);
  };

  const handleDeleteEvent = (eventName) => {
    onDeleteEvent(date, eventName);
  };

  return (
    <div className={`day ${className}`} onClick={handleDayClick}>
      <div className="day-number">{date.getDate()}</div>
      <button className="view-event" onClick={handleToggleEvents}>
        {showEvents ? 'Hide' : 'View'}
      </button>
      {showEvents && events.length > 0 && (
        <div className="events">
          {events.map((event, index) => (
            <div key={index} className="event">
              <span className="event-name">{event.eventName}</span>
              <button className="delete-event" onClick={() => handleDeleteEvent(event.eventName)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

Day.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  events: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.instanceOf(Date),
      eventName: PropTypes.string,
    })
  ),
  onDayClick: PropTypes.func.isRequired,
  onDeleteEvent: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default Day;

