document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random()*100000000) + '';
  const status = 'Open';

  const issue = { id, description, severity, assignedTo, status };
  // console.log(issue)
  let issues = [];
  if (localStorage.getItem('issues')){
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  // console.log(issues);
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));

  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();
}


const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';

  if(issues!==null){
    for (var i = 0; i < issues.length; i++) {
      const {id, description, severity, assignedTo, status} = issues[i];
  
      issuesList.innerHTML +=   `<div class="well">
                                  ${id}
                                <h6 id='issue-id'>Issue ID:<span> ${id}</span> </h6>
                                <p><span class="label label-info"> ${status} </span></p>
                                <h3> ${description} </h3>
                                <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                                <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                                <a href="#" onclick="closeIssue(${id})" class="btn btn-warning">Close</a>
                                <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                                </div>`;
    }
  }
}
const closeIssue = id => {
  // console.log(id);
  const issues = JSON.parse(localStorage.getItem('issues'));
  // console.log(issues[0].id);
  let currentIssue;
  for(const iss of issues){
    if(iss.id==id){
      currentIssue=iss;
    }
  // console.log(iss);
  }
  
  // console.log(currentIssue)
  currentIssue.status = 'Closed';
  
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

const deleteIssue = id => {
  const div=document.querySelectorAll('.well')
  // const issueId=document.getElementById()
  // console.log(id)
  
  
  const issues = JSON.parse(localStorage.getItem('issues'));
  // console.log(issues)
  let remainingIssues;
  for(let i=0;i<issues.length;i++){
    const first=div[i].firstChild.textContent;
    // console.log()
    if(parseInt(first)===id){
      div[i].remove()
    }
    if(issues[i].id==id){
      issues.pop();
      localStorage.setItem('issues',JSON.stringify(issues))
      console.log(issues)
      if(issues.length==0){
        localStorage.removeItem('issues')
      }
}
}
}
