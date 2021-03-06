import React from 'react';
import NVD3Chart from 'react-nvd3';
import d3 from 'd3';

const map = (d) => ({
  x: Date.parse(d.date),
  y: d.open
});

const transformData = (data, width) => {
  // Graph detail proportional to width
  const delta = parseInt(data.length / (width / 4), 10);
  const output = [];
  for (let index = 0; index < data.length; index += delta) {
    output.push(data[index]);
  }
  return [{
    key: 'open',
    values: output.map(map),
    color: '#ff7f0e'
  }];
};

const LineChart = ({ data, width, height }) => {
  if (data) {
    return (
      <NVD3Chart
        width={width}
        height={height}
        xAxis={{
          tickFormat: (d) => d3.time.format('%d/%m/%y')(new Date(d))
        }}
        yAxis={{
          tickFormat: (d) => parseFloat(d).toFixed(2)
        }}
        duration={1}
        margin={{
          left: 50, right: 60, top: 80, bottom: 50
        }}
        type="lineChart"
        datum={transformData(data, width)} x="label" y="value"
      />
    );
  }
  return (<div>No data</div>);
};

LineChart.propTypes = {
  data: React.PropTypes.array,
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
};

export default LineChart;
