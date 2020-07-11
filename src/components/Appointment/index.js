import React from "react";

import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form"
import useVisualMode from "hooks/useVisualMode";
import  { getInterviewersForDay }  from "helpers/selectors";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment(props){
  function onAdd(){
    transition(CREATE)
  }
  function onCancel(){
    back();
  }
 
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY);

    return(
      <article className="appointment">
        <Header time={props.time}/>
        {/* {props.interview ? (<Show {...props.interview} />): (<Empty {...props}/>)} */}
        {mode === EMPTY && <Empty onAdd={onAdd} />}
        {mode === CREATE && (<Form 
                        interviewers={props.interviewers}
                        onCancel={onCancel}
                        />)}
        {mode === SHOW && (<Show
              student={props.interview.student}
              interviewer={props.interview.interviewer}/>)}
      </article>
    )
}
