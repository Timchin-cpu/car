import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import styles from "./BookingPage.module.css";

export default function BookingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const car = location.state?.car;

  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 0)); // January 2025
  const [pickupDate, setPickupDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [selectingPickup, setSelectingPickup] = useState(true);

  if (!car) {
    navigate("/");
    return null;
  }

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const handleDateClick = (day) => {
    const selectedDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );

    if (selectingPickup) {
      setPickupDate(selectedDate);
      setReturnDate(null);
      setSelectingPickup(false);
    } else {
      if (selectedDate > pickupDate) {
        setReturnDate(selectedDate);
      } else {
        setPickupDate(selectedDate);
        setReturnDate(null);
      }
    }
  };

  const isDateInRange = (day) => {
    if (!pickupDate || !returnDate) return false;
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    return date > pickupDate && date < returnDate;
  };

  const isPickupDate = (day) => {
    if (!pickupDate) return false;
    return (
      pickupDate.getDate() === day &&
      pickupDate.getMonth() === currentMonth.getMonth() &&
      pickupDate.getFullYear() === currentMonth.getFullYear()
    );
  };

  const isReturnDate = (day) => {
    if (!returnDate) return false;
    return (
      returnDate.getDate() === day &&
      returnDate.getMonth() === currentMonth.getMonth() &&
      returnDate.getFullYear() === currentMonth.getFullYear()
    );
  };

  const formatDate = (date) => {
    if (!date) return "";
    return `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
  };

  const calculateDays = () => {
    if (!pickupDate || !returnDate) return 0;
    const diff = returnDate - pickupDate;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className={styles.emptyDay}></div>);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const isPickup = isPickupDate(day);
    const isReturn = isReturnDate(day);
    const inRange = isDateInRange(day);

    days.push(
      <button
        key={day}
        onClick={() => handleDateClick(day)}
        className={`${styles.dayButton} ${isPickup ? styles.pickupDay : ""} ${
          isReturn ? styles.returnDay : ""
        } ${inRange ? styles.inRangeDay : ""}`}
      >
        {day}
      </button>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate("/")}>
          <ChevronLeft size={24} />
        </button>
        <h2 className={styles.title}>Book Summary</h2>
        <div style={{ width: 24 }}></div>
      </div>

      <div className={styles.content}>
        <div className={styles.daysInfo}>
          <div className={styles.daysCount}>
            <div className={styles.circle}></div>
            <span className={styles.daysText}>{calculateDays()} Days</span>
          </div>
          <div className={styles.eventBadge}>
            <div className={styles.eventCircle}></div>
            <span className={styles.eventText}>Event</span>
          </div>
        </div>

        <div className={styles.calendar}>
          <div className={styles.calendarHeader}>
            <button className={styles.navButton} onClick={handlePrevMonth}>
              <ChevronLeft size={20} />
            </button>
            <span className={styles.monthYear}>
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </span>
            <button className={styles.navButton} onClick={handleNextMonth}>
              <ChevronRight size={20} />
            </button>
          </div>

          <div className={styles.weekDays}>
            {weekDays.map((day) => (
              <div key={day} className={styles.weekDay}>
                {day}
              </div>
            ))}
          </div>

          <div className={styles.daysGrid}>{days}</div>
        </div>

        <div className={styles.dateInputs}>
          <div className={styles.dateInput}>
            <label className={styles.dateLabel}>Pick-up Date</label>
            <div className={styles.dateValue}>
              <span>{formatDate(pickupDate) || "Select date"}</span>
              <Calendar size={20} className={styles.calendarIcon} />
            </div>
          </div>
          <div className={styles.dateInput}>
            <label className={styles.dateLabel}>Return Date</label>
            <div className={styles.dateValue}>
              <span>{formatDate(returnDate) || "Select date"}</span>
              <Calendar size={20} className={styles.calendarIcon} />
            </div>
          </div>
        </div>

        <button
          className={styles.bookButton}
          disabled={!pickupDate || !returnDate}
        >
          <span>⚡</span>
          Book Now
        </button>
      </div>
    </div>
  );
}
