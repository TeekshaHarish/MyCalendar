import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import TimePicker from "./TimePicker";
import { IoClose } from "react-icons/io5";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { compareTimeIsLess,generateCalendarGrid,exportAsCSV,exportAsJSON
} from "./utils";


const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem("calendarEvents");
    return savedEvents ? JSON.parse(savedEvents) : {};
  });
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    name: "",
    startTime: "00:00",
    endTime: "00:00",
    description: "",
  });
  const [filterKeyword, setFilterKeyword] = useState("");
  const [editEventIndex, setEditEventIndex] = useState(null);
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    localStorage.setItem("calendarEvents", JSON.stringify(events));
  }, [events]);

  const handleTimeChange = (field, value) => {
    setNewEvent((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePrevMonth = () => {
    const prevMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1
    );
    setCurrentDate(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1
    );
    setCurrentDate(nextMonth);
  };

  const handleDayClick = (day, month, year) => {
    setSelectedDate(() => new Date(year, month, day));
    console.log("d", selectedDate);
    setIsSidePanelOpen(true);
    setOpenForm(false);
    setEditEventIndex(null); // Reset to ensure adding new event
    setNewEvent({
      name: "",
      startTime: "00:00",
      endTime: "00:00",
      description: "",
    });
  };

  const isOverLapping = () => {
    const eventDate = selectedDate.toDateString();
    const newStart = new Date(`${eventDate} ${newEvent.startTime}`);
    const newEnd = new Date(`${eventDate} ${newEvent.endTime}`);

    if (!compareTimeIsLess(newStart, newEnd)) {
      alert("Start Time should be less than end time!");
      return true;
    }
    const overlap = events[eventDate].some((event) => {
      const existingStart = new Date(`${eventDate} ${event.startTime}`);
      const existingEnd = new Date(`${eventDate} ${event.endTime}`);

      // Checking if there is an overlap
      return !(
        (
          compareTimeIsLess(newEnd, existingStart) || // New event ends before the existing event starts
          compareTimeIsLess(existingEnd, newStart)
        ) // Existing event ends before the new event starts
      );
    });

    if (overlap) {
      alert("Event times overlap! Please choose a different time.");
      return true;
    }
    return false;
  };
  const addEvent = () => {
    const eventDate = selectedDate.toDateString();

    if (!events[eventDate]) {
      events[eventDate] = [];
    }

    if(isOverLapping()){
      return;
    }

    events[eventDate].push({ ...newEvent });
    setEvents({ ...events });
    setNewEvent({
      name: "",
      startTime: "00:00",
      endTime: "00:00",
      description: "",
    });
    // setIsSidePanelOpen(false);
    setOpenForm(false);
  };

  const updateEvent = () => {
    const eventDate = selectedDate.toDateString();

    if(isOverLapping()){
      return;
    }

    const updatedEvents = [...events[eventDate]];
    updatedEvents[editEventIndex] = { ...newEvent };
    events[eventDate] = updatedEvents;

    setEvents({ ...events });
    setEditEventIndex(null);
    setNewEvent({
      name: "",
      startTime: "00:00",
      endTime: "00:00",
      description: "",
    });
    // setIsSidePanelOpen(false);
  };

  const deleteEvent = (eventIndex) => {
    const eventDate = selectedDate.toDateString();
    events[eventDate].splice(eventIndex, 1);
    setEditEventIndex(null);
    if (events[eventDate].length === 0) delete events[eventDate];
    setEvents({ ...events });
  };

  const filterEvents = () => {
    const eventDate = selectedDate.toDateString();
    if (!events[eventDate]) return [];
    return events[eventDate].filter((event) =>
      event.name.toLowerCase().includes(filterKeyword.toLowerCase())
    );
  };

  const categoryColors = {
    work: "bg-blue-200",
    personal: "bg-green-200",
    other: "bg-yellow-200",
  };

  

  
  const calendarGrid = generateCalendarGrid(currentDate);

  return (
    <div className={`flex p-3 ${isSidePanelOpen ? "" : "w-3/4 mx-auto"}`}>
      <div className="flex-1">
        <div className="flex items-center justify-between my-4">
          <Button onClick={handlePrevMonth}>
            <GrPrevious /> Prev
          </Button>
          <h2 className="text-xl font-bold">
            {currentDate.toLocaleString("default", { month: "long" })}{" "}
            {currentDate.getFullYear()}
          </h2>
          <Button onClick={handleNextMonth}>
            Next <GrNext />
          </Button>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {"Sun Mon Tue Wed Thu Fri Sat".split(" ").map((day) => (
            <div
              key={day}
              className="text-center font-bold border-b border-gray-400"
            >
              {day}
            </div>
          ))}
          {calendarGrid.map((cell, index) => {
            const isWeekend = [0, 6].includes(
              new Date(cell.year, cell.month, cell.day).getDay()
            ); // Check if the day is Saturday (6) or Sunday (0)
            return (
              <div
                key={index}
                onClick={() =>
                  cell.currentMonth &&
                  handleDayClick(cell.day, cell.month, cell.year)
                }
                className={`p-4 text-center cursor-pointer rounded-lg ${
                  cell.currentMonth ? "bg-white" : "bg-gray-200"
                } ${
                  cell.day === selectedDate.getDate() && cell.currentMonth
                    ? "border-2 rounded-lg border-gray-700 bg-blue-200"
                    : "border-2 border-transparent"
                } ${
                  cell.day === new Date().getDate() &&
                  cell.currentMonth &&
                  cell.month === new Date().getMonth() &&
                  cell.year === new Date().getFullYear()
                    ? "bg-slate-400 rounded-lg"
                    : ""
                } ${isWeekend && cell.currentMonth ? "bg-red-100" : ""}`}
              >
                {cell.day}
              </div>
            );
          })}
        </div>
      </div>

      {isSidePanelOpen && (
        <div className="w-1/3 bg-gray-100 p-4 ml-4">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-bold flex justify-between">
                <span>Events on {selectedDate.toDateString()}</span>{" "}
                <Button
                  variant="secondary"
                  onClick={() => setIsSidePanelOpen(false)}
                >
                  <IoClose />
                </Button>
              </h2>
              <Input
                placeholder="Filter events"
                value={filterKeyword}
                onChange={(e) => setFilterKeyword(e.target.value)}
              />
            </CardHeader>
            <CardContent>
              {filterEvents().map((event, index) => (
                <div
                  key={index}
                  className={`border p-2 mb-2 rounded-md ${
                    categoryColors[event.category]
                  }`}
                >
                  <p>
                    <strong>Name:</strong> {event.name}
                  </p>
                  <p>
                    <strong>Time:</strong> {event.startTime} - {event.endTime}
                  </p>
                  <p>
                    <strong>Description:</strong> {event.description}
                  </p>
                  <p>
                    <strong>Category:</strong> {event.category}
                  </p>
                  <Button
                    variant="destructive"
                    className="mr-2 my-1"
                    onClick={() => deleteEvent(index)}
                  >
                    Delete
                  </Button>
                  <Button
                    onClick={() => {
                      setEditEventIndex(index);
                      setNewEvent({ ...event });
                    }}
                  >
                    Edit
                  </Button>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button onClick={() => setOpenForm(true)}>Add Event</Button>
            </CardFooter>
            <CardFooter className="flex gap-2">
              <Button onClick={() => exportAsJSON(selectedDate,events)}>Export as JSON</Button>
              <Button onClick={() => exportAsCSV(selectedDate,events)}>Export as CSV</Button>
            </CardFooter>
          </Card>

          {(editEventIndex !== null || openForm) && (
            <Card className="mt-4">
              <CardHeader>
                <h2 className="text-lg font-bold">
                  {editEventIndex !== null ? "Edit Event" : "Add Event"}
                </h2>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder="Event Name"
                  value={newEvent.name}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, name: e.target.value })
                  }
                />

                <TimePicker
                  value={newEvent.startTime}
                  label="Start Time (HH:MM)"
                  onChange={(value) => {
                    handleTimeChange("startTime", value);
                    console.log(newEvent);
                  }}
                />
                <TimePicker
                  value={newEvent.endTime}
                  label="End Time (HH:MM)"
                  onChange={(value) => {
                    handleTimeChange("endTime", value);
                    console.log(newEvent);
                  }}
                />

                <Input
                  placeholder="Description"
                  value={newEvent.description}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, description: e.target.value })
                  }
                />
                <Select
                  onValueChange={(e) => {
                    console.log(e);
                    setNewEvent({ ...newEvent, category: e });
                    console.log(newEvent);
                  }}
                >
                  <SelectTrigger className="w-[180px] mt-2">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Category</SelectLabel>
                      <SelectItem value="work">
                        <div className="flex gap-2">
                          <div
                            className={"w-4 h-4 rounded-full bg-blue-200"}
                          ></div>
                          <div>Work</div>
                        </div>
                      </SelectItem>
                      <SelectItem value="personal">
                        <div className="flex gap-2">
                          <div
                            className={"w-4 h-4 rounded-full bg-green-200"}
                          ></div>
                          <div>Personal</div>
                        </div>
                      </SelectItem>
                      <SelectItem value="other">
                        <div className="flex gap-2">
                          <div
                            className={"w-4 h-4 rounded-full bg-yellow-200"}
                          ></div>
                          <div>Other</div>
                        </div>
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Button
                  onClick={editEventIndex === null ? addEvent : updateEvent}
                  className="my-3 mr-2"
                >
                  {editEventIndex === null ? "Add Event" : "Update Event"}
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setIsSidePanelOpen(false)}
                >
                  Close
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default Calendar;
