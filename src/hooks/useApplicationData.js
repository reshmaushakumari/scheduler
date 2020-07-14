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
    
    useEffect(() => {
      Promise.all([
        axios.get(`/api/days`),
        axios.get(`/api/appointments`),
        axios.get(`/api/interviewers`)
      ]).then((all) => {
        setState(prev => ({ days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      })
    },[]);

    const bookInterview = (id, interview) => {
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };

      setState({
        ...state,
        appointments
      });

      console.log("Appointments*******"+appointment)


      return (
        axios.put("/api/appointments/"+id,{
          interview
        }).then((response) => { 
          console.log(response)
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
      setState({
        ...state,
        appointments
      });

      return (
        axios.delete("/api/appointments/"+id,{
          interview
        }).then((response) => { 
          console.log(response)
        })
      )
    };

return  { state, setDay, bookInterview, cancelInterview };
}