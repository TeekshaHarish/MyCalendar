export const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

  export const firstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  export const generateCalendarGrid = (currentDate) => {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const daysInPrevMonth = daysInMonth(month - 1, year);
    const daysInCurrentMonth = daysInMonth(month, year);
    const firstDay = firstDayOfMonth(month, year);

    const grid = [];

    for (let i = firstDay - 1; i >= 0; i--) {
      grid.push({ day: daysInPrevMonth - i, currentMonth: false,month:month===0?11:month-1, year:month===0?year-1:year});
    }

    for (let i = 1; i <= daysInCurrentMonth; i++) {
      grid.push({ day: i, currentMonth: true,month:month, year:year });
    }

    while (grid.length < 42) {
      grid.push({ day: grid.length - daysInCurrentMonth - firstDay + 1, currentMonth: false ,month:month===11?0:month+1, year:month===11?year+1:year});
    }

    return grid;
  };

  export const compareTimeIsLess = (time1, time2) => {
    return new Date(`${time1}:00Z`) < new Date(`${time2}:00Z`);
  };

  export const getEventsForCurrentMonth = (selectedDate,events) => {
    const currentMonth = selectedDate.getMonth();
    const currentYear = selectedDate.getFullYear();
  
    let currentMonthEvents = [];
  
    for (const [dateString, dayEvents] of Object.entries(events)) {
      const eventDate = new Date(dateString);
      if (
        eventDate.getMonth() === currentMonth &&
        eventDate.getFullYear() === currentYear
      ) {
        // Add each event along with its date
        const eventsWithDate = dayEvents.map((event) => ({
          ...event,
          date: dateString,
        }));
        currentMonthEvents = [...currentMonthEvents, ...eventsWithDate];
      }
    }
  
    return currentMonthEvents;
  };

  export const exportAsJSON = (selectedDate,events) => {
      const currentMonthEvents = getEventsForCurrentMonth(selectedDate, events);
  
      if (currentMonthEvents.length === 0) {
        alert("No events to export for the current month.");
        return;
      }
  
      const blob = new Blob([JSON.stringify(currentMonthEvents, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "events_current_month.json";
      link.click();
    };

  export const exportAsCSV = (selectedDate,events) => {
      const currentMonthEvents = getEventsForCurrentMonth(selectedDate, events);
  
      if (currentMonthEvents.length === 0) {
        alert("No events to export for the current month.");
        return;
      }
  
      // Create the CSV header
      const headers = ["Date", "Name", "Start Time", "End Time", "Description"];
      const csvRows = [headers.join(",")]; // Add headers to the CSV
  
      // Add each event as a row
      currentMonthEvents.forEach((event) => {
        const row = [
          event.date, // Date
          event.name, // Name
          event.startTime, // Start Time
          event.endTime, // End Time
          event.description, // Description
        ];
        csvRows.push(row.join(","));
      });
  
      // Convert to a CSV string
      const csvContent = csvRows.join("\n");
  
      // Trigger download
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "events_current_month.csv";
      link.click();
    };

