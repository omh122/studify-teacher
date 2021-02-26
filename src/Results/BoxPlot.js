import React from 'react';
import Plot from 'react-plotly.js';

function BoxPlot(props){

    const { results, assignment } = props;

    const scores = {
        x: results,
        type: 'box',
        boxpoints: 'all',
        jitter: 0.3,
        pointpos: 0,
        boxmean: true,
        name: typeof assignment === 'undefined' ? '' : assignment.name // pass in name
      };
      


    return (
      <Plot
        data={[
    
            scores
        
        ]}

        layout={ {
            title: "Overall Scores",
            width: 600,
            height: 250,
            yaxis: {
                automargin: true
            },
            xaxis: {range: [0, 5]},
        } }
      />
      );
}
      
export default BoxPlot;