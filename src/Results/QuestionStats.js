import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

function Graph(props){

    const { results, assignment, totalStudents } = props;

    function stringDivider(str, width, spaceReplacer) {
        if (str.length>width) {
            var p=width
            for (;p>0 && str[p]!=' ';p--) {
            }
            if (p>0) {
                var left = str.substring(0, p);
                var right = str.substring(p+1);
                return left + spaceReplacer + stringDivider(right, width, spaceReplacer);
            }
        }
        return str;
    }

    const [questions, setQuestions] = useState([]);
    const [wrongCount, setWrongCount] = useState([]);
    useEffect(() => {
        if ( assignment !== false ) {
            let tempX = [];
            let tempY = [];
            for (let i = 0; i < assignment.questions.length; i += 1) {
                tempX.push(stringDivider((assignment.questions[i].question), 20, '<br>'));
                if (typeof results[assignment.questions[i]._id]!=='undefined') {
                    tempY.push(totalStudents-results[assignment.questions[i]._id]);
                } else {
                    tempY.push(totalStudents);
                }
                
            }
            setQuestions(tempX);
            setWrongCount(tempY);
        }  
    }, [assignment, results]);


    const data = {
        x: questions,
        y: wrongCount,
        name: 'Questions',
        type: 'bar'
    };


    return (
      <Plot
        data={[
    
            data
        
        ]}
        layout={ {
            title: "Question Statistics",
            width: 600,
            height: 300,
            xaxis: {
                automargin: true,
                tickangle: 0,
            },
        } }
      />
      );
}
      
export default Graph;