import React from "react";

import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import useVisualMode from "hooks/useVisualMode";
import Status from "components/Appointment/Status";
import Error from "components/Appointment/Error";
import Confirm from "./Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";


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
    transition(SAVING); 
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(error => transition(ERROR_SAVE, true));
  }

  function deleteInterview() {
    const interview = "";
    transition(CONFIRM)
    transition(DELETING, true)
    props.cancelInterview(props.id, interview)
    .then(() => transition(EMPTY))
    .catch(error => transition(ERROR_DELETE, true));
  }
  function onDelete(){
    transition(CONFIRM)
  }
  function onEdit() {
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
        {mode === DELETING && (<Status message="Deleting"/>)}
        {mode === CONFIRM && (<Confirm 
                          message="Delete the appointment?"
                          onCancel={onCancel}
                          onConfirm={deleteInterview}/>)}
        {mode === EDIT && (<Form
                          name={props.interview.student}
                          interviewers={props.interviewers}
                          onSave={save}
                          onCancel={onCancel}/>)}
        {mode === ERROR_SAVE &&(<Error message="Could not save appointment"
                          onClose={onCancel}/>)}
        {mode === ERROR_DELETE &&(<Error message="Could not delete appointment"
                          onClose={onCancel}/>)}
      </article>
    )
}
