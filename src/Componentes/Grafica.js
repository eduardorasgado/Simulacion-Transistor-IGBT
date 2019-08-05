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
import { Input, Form, Row, Col } from 'antd';

export default class Grafica extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            xRangeRect: [0, 10],
            yRangeRect: [0, 20],
            xRangeRes: [0, 10],
            yRangeRes: [0, 70],
            ejeYLabel: "dT",
            ejeXLabel: "Tiempo"
        }

        this.updateLabel = this.updateLabel.bind(this);
    }

    updateLabel(event) {
        let target = event.target;
        let inputName = target.name;
        let value = target.value;

        if(value !== null || value !== ''){
            this.setState({
                [inputName]: value
            });
        }
    }
    render() {
        return (
            <div style={{ marginBottom: 80, marginTop: 80, marginLeft:40 }}>
                <Form>
                    <Row>
                        <Col span={3}>
                        <Form.Item label="nombre del eje y:">
                            <Input
                                name="ejeYLabel"
                                value={this.state.ejeYLabel}
                                onChange={(event) => {this.updateLabel(event)}}
                            >
                            </Input>
                        </Form.Item>
                        </Col>
                        <Col span={3}>
                        <Form.Item label="nombre del eje x:">
                            <Input
                                name="ejeXLabel"
                                value={this.state.ejeXLabel}
                                onChange={(event) => {this.updateLabel(event)}}
                            >
                            </Input>
                        </Form.Item>
                        </Col>
                    </Row>
                </Form>
                <br></br>
                <br></br>
                <XYPlot
                xDomain={this.props.chartType ? this.state.xRangeRes : this.state.xRangeRect}
                yDomain={this.props.chartType ? this.state.yRangeRes : this.state.yRangeRect} 
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
                    <XAxis title={this.state.ejeXLabel}
                        style={{
                            line: {stroke: '#ADDDE1'},
                            ticks: {stroke: '#ADDDE1'},
                            text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600}
                          }}
                    >
                    </XAxis>
                    <YAxis title={this.state.ejeYLabel}
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
