import React from 'react';
import 'components/InterviewerList.scss'
import InterviewerListItem from './InterviewerListItem';
import PropTypes from 'prop-types';

export default function InterViewerList(props){
  
const interviewLists =  props.interviewers.map((interviewer, index) => (

  <InterviewerListItem
    key={index}
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
