
import './App.css'
import React, { useState } from 'react';
import Calendar from './Calendar';
// import { Calendar } from '@/components/ui/calendar';
import { FaCalendarDays } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";

function App() {
  const [date, setDate] = useState(new Date());

  return (
    <>
    <h1 className='text-center font-bold my-4 text-2xl '><span className='flex gap-2 justify-center items-center flex-row'>My Calendar <FaCalendarDays/></span></h1>
    <main className='px-2'>
    <Calendar/>
    </main>
    </>
  )
}

export default App
