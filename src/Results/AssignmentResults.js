import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SelectAssignment from './SelectAssignment';
import Grid from '@material-ui/core/Grid';
import StudentList from './StudentList';
import BoxPlot from './BoxPlot';
import BoxPlotStudent from './BoxPlotStudent';
import QuestionStats from './QuestionStats';
import QuestionStatsStudent from './QuestionStatsStudent';
import assignmentService from '../services/assignments';
import assignmentResultService from '../services/assignmentResults';
import { trackPromise } from 'react-promise-tracker';

const useStyles = makeStyles((theme) => ({
  paddedItem: {
    paddingLeft: theme.spacing(15),
    paddingRight: theme.spacing(15),
    // paddingTop: theme.spacing(5),
  },
  paddedBottom: {
    paddingBottom: theme.spacing(3),
  },
}));

// const test_data = [
//   ['1', '1', '4', ['1']],
//   ['2', '1', '3', ['1', '2']],
//   ['3', '1', '2', ['1', '2', '3']],
//   ['4', '1', '0', ['1', '2', '3', '4', '5']],
//   ['5', '1', '4', ['2']],
//   ['6', '1', '3', ['1', '2']],
//   ['7', '1', '5', []],
//   ['8', '1', '1', ['1', '2', '4', '5']],
// ];

// function createData(studentId, assignmentId, score, wrongqns) {
//   return { studentId, assignmentId, score, wrongqns };
// }

// const results = []

// for (let i = 0; i < test_data.length; i += 1) {
//   results.push(createData(...test_data[i]));
// }

function AssignmentResults() {
  const classes = useStyles();

  // fetch data
  // const [questions, setQuestions] = useState([]);
  // useEffect(() => {
  //   async function fetchData() {
  //     const res = await trackPromise(questionService.getQuestions());
  //     setQuestions(res.data);
  //   }
  //   fetchData();
  // }, []);

  const [assignments, setAssignments] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await trackPromise(assignmentService.getAssignments());
      setAssignments(res.data);
    }
    fetchData();
  }, []);

  const [results, setResults] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await trackPromise(assignmentResultService.getAssignmentResults());
      setResults(res.data);
    }
    fetchData();
  }, []);

  // setting selected assignment
  const [selectedAssignment, setSelectedAssignment] = useState(false);

  function setAssignment(value) {
    setSelectedAssignment(value);
  }

  // filtering results of selected assignment
  const [selectedResults, setSelectedResults] = useState([]);

  useEffect(() => {
    setSelectedResults(results.filter((res) => selectedAssignment._id.includes(res.assignmentId)))
  }, [selectedAssignment]);

  // setting scores of selected assignment
  const [scores, setScores] = useState([]);
  const [wrong, setWrong] = useState({});

  useEffect(() => {
    let tempScores = [];
    let tempWrong = {};
    for (let i = 0; i < selectedResults.length; i += 1) {
      tempScores.push(parseInt(selectedResults[i].score, 10));
      for (let j = 0; j < selectedResults[i].wrongQuestionIds.length; j += 1) {
        if (tempWrong[selectedResults[i].wrongQuestionIds[j]] == null) {
          tempWrong[selectedResults[i].wrongQuestionIds[j]] = 1;
        } else {
          tempWrong[selectedResults[i].wrongQuestionIds[j]]++;
        }
      }
    }
    setScores(tempScores);
    setWrong(tempWrong);
  }, [selectedResults]);

  // selecting student
  const [selectedStudent, setSelectedStudent] = useState('');

  function setStudent(value) {
    setSelectedStudent(value);
  }

  // indiv student result of selected assignment
  const [selectedStudentResult, setSelectedStudentResult] = useState('');

  useEffect(() => {
    if (selectedAssignment !== false && selectedStudent !== '') {
      setSelectedStudentResult(selectedResults.filter((res) => selectedStudent._id.includes(res.userId)))
    }
  }, [selectedStudent, selectedAssignment]);

  return (
    <div>
      <Grid container spacing={3} className={classes.paddedItem}>
        <Grid item xs={3}>
          <Grid continaer>
            <Grid item xs={12} className={classes.paddedBottom}><SelectAssignment assignments={assignments} parentCallback={setAssignment} /></Grid>
            <Grid item xs={12}></Grid>
            <Grid item xs={12}><StudentList parentCallback={setStudent} /></Grid>
          </Grid>
        </Grid>
        <Grid item xs={9} align='center' justify='center'>
          {typeof selectedStudentResult[0] === 'undefined' || selectedStudent === '' ?
            <BoxPlot results={scores} assignment={selectedAssignment} />
            : <BoxPlotStudent results={scores} assignment={selectedAssignment} studentName={selectedStudent.name} studentResult={selectedStudentResult} />}
          {typeof selectedStudentResult[0] === 'undefined' || selectedStudent === '' ?
            <QuestionStats results={wrong} assignment={selectedAssignment} totalStudents={selectedResults.length} />
            : <QuestionStatsStudent results={selectedStudentResult} assignment={selectedAssignment} studentName={selectedStudent.name} />}
        </Grid>
      </Grid>
    </div>
  );
}

export default AssignmentResults;