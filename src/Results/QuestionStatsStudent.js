import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

function Graph(props) {

    const { results, assignment, studentName } = props;

    function stringDivider(str, width, spaceReplacer) {
        if (str.length > width) {
            var p = width
            for (; p > 0 && str[p] != ' '; p--) {
            }
            if (p > 0) {
                var left = str.substring(0, p);
                var right = str.substring(p + 1);
                return left + spaceReplacer + stringDivider(right, width, spaceReplacer);
            }
        }
        return str;
    }

    const [questions, setQuestions] = useState([]);
    const [wrongCount, setWrongCount] = useState([]);
    useEffect(() => {
        console.log(results);
        if (assignment !== false) {
            let tempX = [];
            let tempY = [];
            for (let i = 0; i < assignment.questions.length; i += 1) {
                tempX.push(stringDivider((assignment.questions[i].question), 20, '<br>'));
                if (results[0].wrongQuestionIds.includes(assignment.questions[i]._id)) {
                    tempY.push(0);
                } else {
                    tempY.push(1);
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
            layout={{
                title: studentName,
                width: 600,
                height: 300,
                xaxis: {
                    automargin: true,
                    tickangle: 0,
                },
                yaxis: { range: [0, 1] },
            }}
        />
    );
}

export default Graph;