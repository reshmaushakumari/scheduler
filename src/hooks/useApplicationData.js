import { useState, useEffect } from "react";
import axios from 'axios';

export default function useVisualMode() {
  const [state, setState] = useState({
      day: "Monday",
      days: [],
      appointments: {},
      interviewers: {}
    });

    const setDay = day => setState({...state, day});
    //const setSpots = spot => setState({...state, spot})
    useEffect(() => {
      Promise.all([
        axios.get(`/api/days`),
        axios.get(`/api/appointments`),
        axios.get(`/api/interviewers`)
      ]).then((all) => {
        setState(prev => ({ days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      })
    },[]);

    function getDay(appointmentId){
      return state.days.filter(day =>day.appointments.includes(appointmentId))[0]
    }

    const bookInterview = (id, interview) => {

      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
     
      const day = getDay(id)
      let newDay = {
        ...day,
        spots: day.spots - 1
      }

      let newDays = state.days
      
      for(let i = 0 ; i < state.days.length; i++){
        if(state.days[i].id === newDay.id){
          newDays.splice(i, 1, newDay)
        }
      }

      

      return (
        axios.put("/api/appointments/"+id,{
          interview
        }).then((response) => { 
          console.log(`day: ${JSON.stringify(newDays)}`)
          setState({
            ...state,
            appointments,
            days: newDays
          });
        })
      )
    };

    const cancelInterview = (id, interview) => {
      console.log(id, interview);
      const appointment = {
        ...state.appointments[id]
      };    
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      
      const day = getDay(id)
      let newDay = {
        ...day,
        spots: day.spots + 1
      }

      let newDays = state.days
      
      for(let i = 0 ; i < state.days.length; i++){
        if(state.days[i].id === newDay.id){
          newDays.splice(i, 1, newDay)
        }
      }

      return (
        axios.delete("/api/appointments/"+id,{
          interview
        }).then((response) => { 
          console.log(`day: ${JSON.stringify(newDays)}`)
          setState({
            ...state,
            appointments,
            days: newDays
          });
        })
      )
    };

return  { state, setDay, bookInterview, cancelInterview };
}