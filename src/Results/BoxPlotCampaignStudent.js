import React from 'react';
import Plot from 'react-plotly.js';

function BoxPlot(props) {

    const { intro, re, sd, sv, sm, studentName, studentResult } = props;

    const scoresIntro = {
        x: intro,
        type: 'box',
        boxpoints: 'all',
        jitter: 0.5,
        pointpos: 0,
        boxmean: true,
        name: 'Introduction',
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
        name: 'Software Verification'
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

    const studentIntro = {
        name: studentName,
        y: ['Introduction'],
        x: [studentResult[0].introScore],
        text: studentName,
        marker: {
            size: 20
        },
        showlegend: false,
    };

    const studentRE = {
        name: studentName,
        y: ['Requirement Engineering'],
        x: [studentResult[0].reScore],
        text: studentName,
        marker: {
            size: 20
        },
        showlegend: false,
    };

    const studentSD = {
        name: studentName,
        y: ['Software Design'],
        x: [studentResult[0].sdScore],
        text: studentName,
        marker: {
            size: 20
        },
        showlegend: false,
    };

    const studentSV = {
        name: studentName,
        y: ['Software Verification'],
        x: [studentResult[0].svScore],
        text: studentName,
        marker: {
            size: 20
        },
        showlegend: false,
    };

    const studentSM = {
        name: studentName,
        y: ['Software Maintenance'],
        x: [studentResult[0].smScore],
        text: studentName,
        marker: {
            size: 20
        },
        showlegend: false,
    };

    return (
        <Plot
            data={[

                scoresSM,
                scoresSV,
                scoresSD,
                scoresRE,
                scoresIntro,
                studentIntro,
                studentRE,
                studentSD,
                studentSV,
                studentSM


            ]}

            layout={{
                title: "Overall Progress",
                legend: { traceorder: 'reversed' },
                width: 750,
                height: 500,
                yaxis: {
                    automargin: true
                },
                xaxis: { range: [-1, 105] },
            }}
        />
    );
}

export default BoxPlot;