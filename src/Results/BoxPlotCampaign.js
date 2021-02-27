import React from 'react';
import Plot from 'react-plotly.js';

function BoxPlot(props){

    const { intro, re, sd, sv, sm } = props;

    const scoresIntro = {
        x: intro,
        type: 'box',
        boxpoints: 'all',
        jitter: 0.5,
        pointpos: 0,
        boxmean: true,
        name: 'Introduction'
      };

    const scoresRE = {
        x: re,
        type: 'box',
        boxpoints: 'all',
        jitter: 0.5,
        pointpos: 0,
        boxmean: true,
        name: 'Requirement Engineering'
    };

    const scoresSD = {
        x: sd,
        type: 'box',
        boxpoints: 'all',
        jitter: 0.5,
        pointpos: 0,
        boxmean: true,
        name: 'Software Design'
    };
      
    const scoresSV = {
        x: sv,
        type: 'box',
        boxpoints: 'all',
        jitter: 0.5,
        pointpos: 0,
        boxmean: true,
        name:'Software Verification'
    };

    const scoresSM = {
        x: sm,
        type: 'box',
        boxpoints: 'all',
        jitter: 0.5,
        pointpos: 0,
        boxmean: true,
        name: 'Software Maintenance'
    };

    return (
      <Plot
        data={[
            
            scoresSM,
            scoresSV,
            scoresSD,
            scoresRE,
            scoresIntro
            
        
        ]}

        layout={ {
            title: "Overall Progress",
            legend: {traceorder: 'reversed'},
            width: 750,
            height: 500,
            yaxis: {
                automargin: true
            },
            xaxis: {range: [-1, 101]},
        } }
      />
      );
}
      
export default BoxPlot;