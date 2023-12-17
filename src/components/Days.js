import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Day = ({ date, events, onDayClick, onViewEvents, onDeleteEvent, className }) => {

  const [isVisible , setIsVisible] = useState(false);
  const [view , seView] = useState("View");
  const handleDayClick = () => {
    onDayClick(date);
  };

  const handleViewEvents = () => {
    // onViewEvents(date);
    setIsVisible(!isVisible);
    if(view === "View")
      seView("Hide");
    else
      seView("View");
  };

  const handleDeleteEvent = (eventName) => {
    onDeleteEvent(date, eventName);
  };

  return (
    <div className={`day ${className}`} onClick={handleDayClick}>
      <div className="day-number">{date.getDate()}</div>
      {events && events.length > 0 && (
        <div className="events">
          {isVisible && events.map((event, index) => (
            <div key={index} className="event">
              <span className="event-name">{event.eventName}</span>
              <button className="delete-event" onClick={() => handleDeleteEvent(event.eventName)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
      <button className="view-event" onClick={handleViewEvents}>
        {view}
      </button>
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
  onAddEvent: PropTypes.func.isRequired,
  onViewEvents: PropTypes.func.isRequired,
  onDeleteEvent: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default Day;
