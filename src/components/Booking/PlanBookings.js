import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';
import PlanBookingsDays from './PlanBookingsDays';
import PlanBookingHoures from './PlanBookingHours';
import { DevBookingData } from '../../DevUtility/booking';

const PlanBookings = (props) => {
  const [bookingDay, setBookingDay] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState(
    moment(bookingDay).daysInMonth()
  );

  useEffect(() => {
    setDaysInMonth(moment(bookingDay).daysInMonth());
  }, [bookingDay]);

  /* Data Com */

  return (
    <div className="container containerPlanBooking">
      <div className="dateHeader ">
        <div className="monthYearHeader">
          <div className="month">
            <h2>
              <Moment format="MMMM">{bookingDay}</Moment>
            </h2>
          </div>
          <div className="year">
            {' '}
            <Moment format="YYYY">{bookingDay}</Moment>
          </div>
          <div className="year">
            <div className="changeMonth changeDateBooking">
              <div
                className="prevMonth btnChangeDateBooking"
                onClick={() => {
                  setBookingDay(moment(bookingDay).subtract(1, 'months'));
                }}
              >
                <i className="fas fa-chevron-left"></i>
              </div>
              <div
                className="nextMonth btnChangeDateBooking"
                onClick={() => {
                  setBookingDay(moment(bookingDay).add(1, 'months'));
                }}
              >
                <i className="fas fa-chevron-right"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="dayHeader">
          <div className="dayNumber">
            <h2>
              <Moment format="D">{bookingDay}</Moment>
            </h2>
          </div>
          <div className="daysOfWeek">
            {' '}
            <Moment format="dddd">{bookingDay}</Moment>
          </div>
          <div className="changeDay changeDateBooking">
            <div
              className="prevDay btnChangeDateBooking"
              onClick={() => {
                setBookingDay(moment(bookingDay).subtract(1, 'days'));
              }}
            >
              <i className="fas fa-chevron-left"></i>
            </div>
            <div
              className="nextMonth btnChangeDateBooking"
              onClick={() => {
                setBookingDay(moment(bookingDay).add(1, 'days'));
              }}
            >
              <i className="fas fa-chevron-right"></i>
            </div>
          </div>
        </div>
      </div>
      <PlanBookingsDays
        daysInMonth={daysInMonth}
        bookingDay={bookingDay}
        setBookingDay={setBookingDay}
      />
      {console.log('DevBookingData :>> ', DevBookingData)}
      <PlanBookingHoures BookingData={DevBookingData} bookingDay={bookingDay} />
      <div className="reservedButtonLink">
        <button className="btn btn-green btn-capitalize">rezerwacja</button>
      </div>
    </div>
  );
};

PlanBookings.propTypes = {};

export default PlanBookings;
