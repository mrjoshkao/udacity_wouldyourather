import React, { useState } from 'react'
import { PieChart } from 'react-minimal-pie-chart'
import ReactTooltip from 'react-tooltip'
import { capFirstLetter } from '../utils/helpers.js'

function makeTooltipContent(data) {
  const hasZeroVotes = (data[0].value === 0 || data[1].value === 0) ? 
          (data[0].value===0 ? data[0].tooltip : data[1].tooltip) 
          : 
          null;
  return (data.filter(d=>d.value!==0).map((d,index)=>
    (<div>{d.tooltip}: {d.value} {d.value===1?' vote':' votes'} <br/> {hasZeroVotes?('('+ hasZeroVotes + ' has no votes)'):''}</div>)
  ));
}

function ResultGraph({optionOne, optionTwo, userChoice, votesOne, votesTwo}){
  const [hovered, setHovered] = useState(null);
  const lineWidth = 60;
  const optionOneText = capFirstLetter(optionOne.text);
  const optionTwoText = capFirstLetter(optionTwo.text);
  let data = [
          { value: votesOne, color: '#E38627', tooltip: optionOneText },
          { value: votesTwo, color: '#C13C37', tooltip: optionTwoText },
        ]
  const tooltips = makeTooltipContent(data);
  data = data.filter(d=>d.value!==0);
  
  return(
    <div data-tip="" data-for="chart">
      <PieChart 
        data={data}
        label={({ dataEntry }) => `${Math.round(dataEntry.percentage)}%`}
        labelPosition={100 - lineWidth / 2}
        labelStyle={{
          fill: '#fff',
          opacity: 0.75,
          pointerEvents: 'none',
          fontSize: '10px',
        }}
        radius={PieChart.defaultProps.radius - 6}
        startAngle={180}
        lineWidth={60}
        animate
        onMouseOver={(_, index) => {
          setHovered(index);
        }}
        onMouseOut={() => {
          setHovered(null);
        }}
      />
      <ReactTooltip
        id="chart"
        getContent={() =>
          typeof hovered === 'number' ? tooltips[hovered]:null
        }
        multiline={true}
      />
      
      <h3>You Selected: {userChoice==="optionOne"?optionOneText:optionTwoText}</h3>
    </div>
  )
}

export default ResultGraph