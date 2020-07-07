import React from 'react';
import DayListItem from "components/DayListItem";

export default function DayList(props){
 const dayLists =  props.days.map(day => {
  return <DayListItem 
    key={props.id}
    name={day.name} 
    spots={day.spots} 
    selected={day.name === props.day}
    setDay={props.setDay}  
  />
 })
  return(
  <ul>{dayLists}</ul>
  )
}