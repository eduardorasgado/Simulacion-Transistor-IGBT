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
import { Input, Form, Row, Col, InputNumber } from 'antd';

export default class Grafica extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            xRangeRect: [0, 10],
            yRangeRect: [0, 20],
            xRangeRes: [0, 10],
            yRangeRes: [0, 70],
            ejeYLabel: "dT",
            ejeXLabel: "Tiempo",
            ySelected: 0,
            xSelected: 0
        }

        this.updateLabel = this.updateLabel.bind(this);
        this.updateXMax = this.updateXMax.bind(this);
        this.updateYMax = this.updateYMax.bind(this);
    }

    componentDidMount() {
        this.setState({
            ySelected: this.props.chartType ? this.state.yRangeRes[1] : this.state.yRangeRect[1],
            xSelected: this.props.chartType ? this.state.xRangeRes[1] : this.state.xRangeRect[1]
        });
    }

    updateLabel(event) {
        let target = event.target;
        let inputName = target.name;
        let value = target.value;

        if(value !== null){
            this.setState({
                [inputName]: value
            });
        }
    }

    updateYMax(value) {
        if(value !== null){
            if(this.props.chartType){
                // caso resistencia
                let range = this.state.yRangeRes;
                range[1] = value;
                this.setState({
                    yRangeRes: range
                })
            } else {
                // caso rectificador/inversor
                let range = this.state.yRangeRect;
                range[1] = value;

                this.setState({
                    yRangeRect: range
                });
            }
        }
    }

    updateXMax(value) {
        if(value !== null){
            if(this.props.chartType){
                // caso resistencia
                let range = this.state.xRangeRes;
                range[1] = value;
                this.setState({
                    xRangeRes: range
                })
            } else {
                // caso rectificador/inversor
                let range = this.state.xRangeRect;
                range[1] = value;

                this.setState({
                    xRangeRect: range
                });
            }
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
                        <Col span={3}>
                        <Form.Item label="maximo del eje y:">
                            <InputNumber                                
                                value={this.state.ySelected}
                                onChange={(value) => {this.updateYMax(value)}}
                            >
                            </InputNumber>
                        </Form.Item>
                        </Col>
                        <Col span={3}>
                        <Form.Item label="maximo del eje x:">
                            <InputNumber                                
                                value={this.state.xSelected}
                                onChange={(value) => {this.updateXMax(value)}}
                            >
                            </InputNumber>
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
