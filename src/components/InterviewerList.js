import React from 'react';
import 'components/InterviewerList.scss'
import InterviewerListItem from './InterviewerListItem';

export default function InterViewerList(props){

const interviewLists =  props.interviewers.map((interviewer) => (

  <InterviewerListItem
    {...interviewer}
    selected = {interviewer.id === props.value}
    setInterviewer = {() => props.onChange(interviewer.id)}
  />

))
return(
<section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">{interviewLists}</ul>
</section>
)}