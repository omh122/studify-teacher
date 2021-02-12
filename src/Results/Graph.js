import React from 'react';
import Plot from 'react-plotly.js';

function Graph(){
    const xlabels = ['Requirement Engineering', 'Software Design', 'Software Verification', 'Software Maintenance'];

    const easy = {
        x: xlabels,
        y: [8, 6, 4, 7],
        name: 'Easy',
        type: 'bar'
    };
    const intermediate = {
        x: xlabels,
        y: [5, 7, 9, 8],
        name: 'Medium',
        type: 'bar'
    };

    const advanced = {
        x: xlabels,
        y: [7, 8, 8, 7],
        name: 'Advanced',
        type: 'bar'
    };


    return (
      <Plot
        data={[
    
            easy,
            intermediate,
            advanced
        
        ]}
        layout={ {
            barmode:'group', 
            title: "Chuan Bin's Statistics",
            width: 600,
            height: 400
        } }
      />
      );
}
      
export default Graph;