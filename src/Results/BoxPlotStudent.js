import React from 'react';
import Plot from 'react-plotly.js';

function BoxPlot(props) {

  const { results, assignment, studentName, studentResult } = props;

  const scores = {
    x: results,
    type: 'box',
    boxpoints: 'all',
    jitter: 0.3,
    pointpos: 0,
    boxmean: true,
    name: typeof assignment === 'undefined' ? '' : assignment.name, // pass in name
    showlegend: false,
  };

  const student = {
    name: studentName,
    y: typeof assignment === 'undefined' ? '' : [assignment.name],
    x: [studentResult[0].score],
    text: studentName,
    showlegend: false,
    marker: {
      size: 20
    }
  }



  return (
    <Plot
      data={[

        scores,
        student

      ]}

      layout={{
        title: "Overall Scores",
        width: 750,
        height: 250,
        yaxis: {
          automargin: true
        },
        xaxis: { range: [0, 5.5] },
      }}
    />
  );
}

export default BoxPlot;