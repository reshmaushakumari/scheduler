function getAppointmentsForDay(state, day){

  const filteredDays = state.days.filter(oneDay => oneDay.name === day);
  let appoArray = [];
  const finalArray = [];
  filteredDays.forEach(element => {
    appoArray = element.appointments;
  })
  appoArray.forEach(currElement => {
    for (const appointmentEntry in state.appointments) {
      if (state.appointments[appointmentEntry].id === currElement) {
        finalArray.push(state.appointments[appointmentEntry]);
      };
    }
  })
  return finalArray;
}

function  getInterview(state, interview) {
  if(interview === null){
    return null;
  }
  const interviewerId = interview.interviewer;
  let finalOutput = {};
  for(const interviewer in state.interviewers){
    if(state.interviewers[interviewerId].id === interviewerId){
      finalOutput={
        student : interview.student,
        interviewer: state.interviewers[interviewerId]
      }
    return finalOutput
    }
  }
}

function getInterviewersForDay(state, day){
  const filteredDays = state.days.filter(oneDay => oneDay.name === day);
  let interviewArray = [];
  const finalArray = [];
  filteredDays.forEach(element => {
    interviewArray = element.interviewers;
  })
  interviewArray.forEach(currElement => {
    for (const interviewerEntry in state.interviewers) {
      if (state.interviewers[interviewerEntry].id === currElement) {
        finalArray.push(state.interviewers[interviewerEntry]);
      }
    }
  })
  return finalArray;
}

export { getAppointmentsForDay , getInterview, getInterviewersForDay }