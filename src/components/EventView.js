import React from 'react';
import PropTypes from 'prop-types';

const EventView = ({ events, onDeleteEvent, onClose }) => {
  return (
    <div className="event-view">
      <ul>
        {events.map((event, index) => (
          <li key={index} >
            <span>{event.eventName}</span>
            <button  onClick={() => onDeleteEvent(event.eventName)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

EventView.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      eventName: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDeleteEvent: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EventView;
