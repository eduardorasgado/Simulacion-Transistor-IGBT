import React, { Component } from 'react'
import {
    XYPlot,
    XAxis,
    YAxis,
    HorizontalGridLines,
    VerticalGridLines,
    LineSeries,
    LineMarkSeries
  } from 'react-vis';

export default class Grafica extends Component {
    
    render() {
        return (
            <div style={{ marginBottom: 80, marginTop: 80, marginLeft:40 }}>
                <XYPlot
                xDomain={[0, 100]}
                yDomain={[0,100]} 
                width={1000} height={600}
                getX={d => d[0]}
                getY={d => d[1]}
                >
                    <HorizontalGridLines
                        style={{stroke: '#B7E9ED'}}
                    ></HorizontalGridLines>
                    <VerticalGridLines
                        style={{stroke: '#B7E9ED'}}
                    ></VerticalGridLines>
                    <XAxis title="Tiempo"
                        style={{
                            line: {stroke: '#ADDDE1'},
                            ticks: {stroke: '#ADDDE1'},
                            text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600}
                          }}
                    >
                    </XAxis>
                    <YAxis title="dT"
                        style={{
                            line: {stroke: '#ADDDE1'},
                            ticks: {stroke: '#ADDDE1'},
                            text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600}
                          }}
                        
                    >
                    </YAxis>
                    <LineSeries 
                        className="first-series"
                        style={{
                            strokeLinejoin: 'round',
                            strokeWidth: 4,
                            fill: 'none',
                          }}
                    data={this.props.pairXYarray}/>
                    <LineMarkSeries
                        className="linemark-series-example"
                        style={{
                          strokeWidth: '1.5px',
                          fill: 'none',
                        }}
                        lineStyle={{stroke: 'red'}}
                        markStyle={{stroke: 'blue', fill: 'blue'}}
                        size={4}
                        data={this.props.pairXYarray}
                    ></LineMarkSeries>
                    
                </XYPlot>
            </div>
        )
    }
}
