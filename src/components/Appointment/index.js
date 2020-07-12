import React from "react";

import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import useVisualMode from "hooks/useVisualMode";
import Status from "components/Appointment/Status";
import Confirm from "./Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";


export default function Appointment(props){
  function onAdd(){
    transition(CREATE)
  }
  function onCancel(){
    back();
  }
  function save(name, interviewer) {
    const interview = {
      student: name, 
      interviewer
    };
    transition(SAVING)
    {props.bookInterview(props.id, interview)}
    transition(SHOW)
  }

  function deleteInterview() {
    const interview = "";
    transition(CONFIRM)
    transition(SAVING)
    {props.cancelInterview(props.id, interview)}
    transition(EMPTY);
  }
  function onDelete(){
    transition(CONFIRM)
  }
  function onEdit(params) {
    transition(EDIT)
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
                          onSave={save}
                        />)}
        {mode === SHOW && (<Show
                          student={props.interview.student}
                          interviewer={props.interview.interviewer}
                          onDelete={onDelete}
                          onEdit={onEdit}/>)}
        {mode === SAVING && (<Status message="Saving"/>)}
        {mode === CONFIRM && (<Confirm 
                          message="Delete the appointment?"
                          onCancel={onCancel}
                          onConfirm={deleteInterview}/>)}
        {mode === EDIT && (<Form
                          name={props.interview.student}
                          interviewers={props.interviewers}
                          onSave={save}
                          onCancel={onCancel}/>)}
      </article>
    )
}
