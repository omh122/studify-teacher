import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import StudentList from './StudentList';
import BoxPlotCampaign from './BoxPlotCampaign';
import BoxPlotCampaignStudent from './BoxPlotCampaignStudent';
import campaignResultService from '../services/campaignResults';
import { trackPromise } from 'react-promise-tracker';


const useStyles = makeStyles((theme) => ({
  paddedItem: {
    paddingLeft: theme.spacing(15),
    paddingRight: theme.spacing(15),
    paddingTop: theme.spacing(7),
  },
}));

// const test_data = [
//   ['1', 100, 71.4285, 14.2857, 28.5714, 85.714],
//   ['2', 71.4285, 42.8571, 71.4285, 42.8571, 71.4285],
//   ['3', 100, 71.4285, 14.2857, 28.5714, 14.2857],
//   ['4', 85.714, 71.4285, 100, 28.5714, 14.2857],
//   ['5', 100, 71.4285, 14.2857, 28.5714, 0],
//   ['6', 85.714, 42.8571, 14.2857, 28.5714, 28.5714],
//   ['7', 100, 28.5714, 28.5714, 14.2857, 28.5714],
//   ['8', 100, 100, 28.5714, 0, 0],
// ];

// function createData(studentId, intro, re, sd, sm, sv) {
//   return { studentId, intro, re, sd, sm, sv };
// }

// const results = []

// for (let i = 0; i < test_data.length; i += 1) {
//   results.push(createData(...test_data[i]));
// }

function CampaignResults() {
  const classes = useStyles();

  const [results, setResults] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await trackPromise(campaignResultService.getCampaignResults());
      setResults(res.data);
    }
    fetchData();
  }, []);

  // setting arrays of diff categories
  const [intro, setIntro] = useState();
  const [re, setRE] = useState();
  const [sd, setSD] = useState();
  const [sv, setSV] = useState();
  const [sm, setSM] = useState();

  useEffect(() => {
    let tempIntro = [];
    let tempRE = [];
    let tempSD = [];
    let tempSV = [];
    let tempSM = [];
    for (let i = 0; i < results.length; i += 1) {
      tempIntro.push(results[i].introScore);
      tempRE.push(results[i].reScore);
      tempSD.push(results[i].sdScore);
      tempSV.push(results[i].svScore);
      tempSM.push(results[i].smScore);
    }
    setIntro(tempIntro);
    setRE(tempRE);
    setSD(tempSD);
    setSV(tempSV);
    setSM(tempSM);
  }, [results])

  // selecting student
  const [selectedStudent, setSelectedStudent] = useState('');

  function setStudent(value) {
    setSelectedStudent(value);
  }

  // indiv student result of selected assignment
  const [selectedStudentResult, setSelectedStudentResult] = useState('');

  useEffect(() => {
    if (selectedStudent !== '') {
      setSelectedStudentResult(results.filter((res) => selectedStudent._id.includes(res.userId)))
    }
  }, [selectedStudent]);


  return (
    <div>
      <Grid container spacing={3} className={classes.paddedItem}>
        <Grid item xs={3}>
          <StudentList parentCallback={setStudent} />
        </Grid>
        <Grid item xs={9} align='center' justify='center'>

          {typeof selectedStudentResult[0] === 'undefined' || selectedStudent === '' ?
            <BoxPlotCampaign intro={intro} re={re} sd={sd} sv={sv} sm={sm} />
            : <BoxPlotCampaignStudent intro={intro} re={re} sd={sd} sv={sv} sm={sm} studentName={selectedStudent.name} studentResult={selectedStudentResult} />}
        </Grid>
      </Grid>
    </div>
  );
}

export default CampaignResults;