import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// utilitário: gera os dias do mês com base na data atual
const generateCalendar = (year, month) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const daysInMonth = [];
  const startDay = firstDay.getDay(); // domingo = 0
  const totalDays = lastDay.getDate();

  // Dias em branco antes do primeiro
  for (let i = 0; i < startDay; i++) {
    daysInMonth.push(null);
  }

  // Dias do mês
  for (let i = 1; i <= totalDays; i++) {
    daysInMonth.push(new Date(year, month, i));
  }

  return daysInMonth;
};

export const Calendar = ({ events = [] }) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const days = generateCalendar(currentYear, currentMonth);

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const isToday = (date) =>
    date &&
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  const hasEvent = (date) =>
    events.some(
      (e) => new Date(e.date).toDateString() === date?.toDateString()
    );

  const months = [
    "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
    "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"
  ];

  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  return (
    <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-4">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="p-2 rounded-full hover:bg-gray-100">
          <ChevronLeft />
        </button>
        <h2 className="text-xl font-bold text-dark">
          {months[currentMonth]} {currentYear}
        </h2>
        <button onClick={nextMonth} className="p-2 rounded-full hover:bg-gray-100">
          <ChevronRight />
        </button>
      </div>

      {/* Dias da semana */}
      <div className="grid grid-cols-7 text-center font-medium text-gray-500 mb-2">
        {weekDays.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Dias */}
      <div className="grid grid-cols-7 gap-2 text-center">
        {days.map((date, idx) => {
          const isEvent = date && hasEvent(date);

          return (
            <div
              key={idx}
              className={`h-12 flex items-center justify-center rounded-lg text-sm transition
                ${!date ? "" : "cursor-pointer"}
                ${isToday(date) ? "bg-accent text-white font-bold" : ""}
                ${isEvent && !isToday(date) ? "bg-accent/20 text-accent font-semibold" : ""}
                ${date && !isToday(date) && !isEvent ? "hover:bg-gray-100" : ""}
              `}
            >
              {date ? date.getDate() : ""}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar