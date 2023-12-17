import React, { useState, useEffect } from 'react';
import Day from './Days';
import "../styles/Calendar.css";

const Calendar = () => {

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const generateMonths = () => {
    const months = [];
    const startDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 6, 1);

    for (let i = 0; i < 12; i++) {
      const newDate = new Date(startDate);
      newDate.setMonth(startDate.getMonth() + i);
      months.push(newDate);
    }
    return months;
  };
  
  const generateDays = (month) => {
    const days = [];
    const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
    const lastDay = new Date(month.getFullYear(), month.getMonth() + 1, 0);
  
    // Calculate the offset to align the first day with the correct day of the week
    const offset = firstDay.getDay();
  
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const currentDate = new Date(month.getFullYear(), month.getMonth(), i);
      days.push(currentDate);
    }
  
    // Add empty days at the beginning if needed
    for (let i = 0; i < offset; i++) {
      days.unshift(null);
    }
  
    return days;
  };
  

  const renderCalendar = () => {
    const months = generateMonths();
  
    return months.map((month, index) => {
      const isCurrentMonth = month.getMonth() === currentMonth.getMonth();
      const eventsForMonth = events ? events.filter(event => event.date && event.date.getMonth() === month.getMonth()) : [];
  
      return (
        <div key={index} className={`month ${isCurrentMonth ? 'current-month' : ''}`}>
          <h3>{month.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h3>
          <div className="days">
            <div className="day-name">Sun</div>
            <div className="day-name">Mon</div>
            <div className="day-name">Tue</div>
            <div className="day-name">Wed</div>
            <div className="day-name">Thu</div>
            <div className="day-name">Fri</div>
            <div className="day-name">Sat</div>
            {generateDays(month).map((day, dayIndex) => {
              if (day === null) {
                return <div key={`empty-${dayIndex}`} className="day empty-day"></div>;
              }
  
              const eventsForDate = eventsForMonth.filter(event => event.date && event.date.toDateString() === day.toDateString());
              return (
                <Day
                  key={dayIndex}
                  date={day}
                  events={eventsForDate}
                  onDayClick={(date) => handleDayClick(date)}
                  className={isCurrentMonth && day.getDate() === new Date().getDate() ? 'current-day' : ''}
                  // onAddEvent={handleAddEvent}
                  onViewEvents={handleViewEvents}
                  onDeleteEvent={handleDeleteEvent}
                />
              );
            })}
          </div>
          <div className='Add'>
              <button className="add-event" onClick={handleAddEvent}>
                Add
              </button>
          </div>
        </div>
      );
    });
  };
  
  const handleDayClick = (date) => {
    setSelectedDate(date);
  };

  const handleAddEvent = () => {
    if (selectedDate) {
      const eventName = prompt('Enter event name:');
      if (eventName) {
        const newEvent = { date: new Date(selectedDate), eventName };
        setEvents((prevEvents) => [...prevEvents, newEvent]);
      }
    } else {
      alert('Please select a date before adding an event.');
    }
  };
  
  const handleViewEvents = (date) => {
    const eventsForDate = events?.filter((event) => event.date?.toDateString() === date.toDateString()) || [];
    alert(`Events for ${date.toLocaleDateString()}: ${eventsForDate.map((event) => event.eventName).join(', ')}`);
  };

  const handleDeleteEvent = (date, eventName) => {
    const updatedEvents = events.filter((event) => !(event.date.toDateString() === date.toDateString() && event.eventName === eventName));
    setEvents(updatedEvents);
  };

  return (
    <div className="calendar">
      {renderCalendar()}
    </div>
  );
};

export default Calendar;



