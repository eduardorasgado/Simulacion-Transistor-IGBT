import React, { Component } from 'react'
import { Form, InputNumber, Button, Row, Col } from 'antd';
import './Form.css';
var FormItem = Form.Item;

export default class RectForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                p: 0,
                v: 0,
                D: 0,
                miu: 0,

                Pr: 0.722,
                k: 0.027,
                l: 0.11,

                A: 0,
                Ts: 0,
                Tinf: 0,

                CpGlicol: 0,
                deltaTGlicol: 0,
                pGlicol: 0,
                Qcaudal: 0,

                E1: 0,
                E2: 0,
                m: 0,
                Cp: 0

            }
        }

        this.saveData = this.saveData.bind(this);
        this.updateData = this.updateData.bind(this);
    }

    saveData(event) {
        event.preventDefault();
        this.props.setNewData(this.state.data);
    }

    updateData(target, value) {
        var dataUpdate = this.state.data;
        if(!isNaN(value)) {
            dataUpdate[target] = value;
        }
        this.setState({
            data: dataUpdate
        })
    }
    
    render() {
        return (
           <Form onSubmit={(evnt) => this.saveData(evnt)}>
            <Row>
                <Col span={4}>
                    <FormItem label="ρ">
                        <InputNumber 
                            name="p"
                            value={this.state.data.p}
                            onChange={(value) => this.updateData("p", value)}
                            />
                    </FormItem>
                </Col>  
                <Col span={4}>
                    <FormItem label="v">
                        <InputNumber
                            name="v"
                            value={this.state.data.v}
                            onChange={(value) => this.updateData("v", value)}
                            />
                        
                    </FormItem>
                </Col>
                <Col span={4}>
                    <FormItem label="D">
                        <InputNumber 
                            name="D"
                            value={this.state.data.D}
                            onChange={(value) => this.updateData("D", value)}
                        />
                        <span className="ant-form-text"></span>
                    </FormItem>
                </Col> 
                <Col span={4}>
                    <FormItem label="µ">
                        <InputNumber
                            name="miu"
                            value={this.state.data.miu}
                            onChange={(value) => this.updateData("miu", value)}
                        />
                        
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span={4}>
                    <FormItem label="Pr">
                        <InputNumber 
                            name="Pr"
                            value={this.state.data.Pr}
                            onChange={(value) => this.updateData("Pr", value)}
                        />
                        
                    </FormItem>
                </Col>
                <Col span={4}>
                    <FormItem label="k">
                        <InputNumber
                            name="k"
                            value={this.state.data.k}
                            onChange={(value) => this.updateData("k", value)}
                        />
                    
                    </FormItem>
                </Col>
                <Col span={4}>
                    <FormItem label="l">
                        <InputNumber
                            name="l"
                            value={this.state.data.l}
                            onChange={(value) => this.updateData("l", value)}
                        />
                    </FormItem>
                </Col>
            </Row>

            <Row>
                <Col span={4}>
                    <FormItem label="A">
                        <InputNumber
                            name="A"
                            value={this.state.data.A}
                            onChange={(value) => this.updateData("A", value)}
                        />
                        <span className="ant-form-text"></span>
                    </FormItem>
                </Col>
                <Col span={4}>
                    <FormItem label="Ts">
                        <InputNumber
                            name="Ts"
                            value={this.state.data.Ts}
                            onChange={(value) => this.updateData("Ts", value)}
                        />
                        <span className="ant-form-text"></span>
                    </FormItem>
                </Col>
                <Col span={4}>
                    <FormItem label="T(infinito)">
                        <InputNumber
                            name="Tinf"
                            value={this.state.data.Tinf}
                            onChange={(value) => this.updateData("Tinf", value)}
                        />
                        <span className="ant-form-text"></span>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span={4}>
                    <FormItem label="Cpglicol">
                        <InputNumber
                            name="CpGlicol"
                            value={this.state.data.CpGlicol}
                            onChange={(value) => this.updateData("CpGlicol", value)}
                        />
                        <span className="ant-form-text"></span>
                    </FormItem>
                </Col>
                <Col span={4}>
                    <FormItem label="ΔTglicol">
                        <InputNumber
                            name="deltaTGlicol"
                            value={this.state.data.deltaTGlicol}
                            onChange={(value) => this.updateData("deltaTGlicol", value)}
                        />
                        <span className="ant-form-text"></span>
                    </FormItem>
                </Col>
                <Col span={4}>
                    <FormItem label="ρglicol">
                        <InputNumber
                            name="pGlicol"
                            value={this.state.data.pGlicol}
                            onChange={(value) => this.updateData("pGlicol", value)}
                        />
                        <span className="ant-form-text"></span>
                    </FormItem>
                </Col>
                <Col span={4}>
                    <FormItem label="Q(Caudal)">
                        <InputNumber name="Qcaudal"
                            value={this.state.data.Qcaudal}
                            onChange={(value) => this.updateData("Qcaudal", value)}
                            />
                        <span className="ant-form-text"></span>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span={4}>
                    <FormItem label="E1">
                        <InputNumber
                            name="E1"
                            value={this.state.data.E1}
                            onChange={(value) => this.updateData("E1", value)}
                        />
                        <span className="ant-form-text"></span>
                    </FormItem>
                </Col>
                <Col span={4}>
                    <FormItem label="E2">
                        <InputNumber 
                            name="E2"
                            value={this.state.data.E2}
                            onChange={(value) => this.updateData("E2", value)}/>
                        <span className="ant-form-text"></span>
                    </FormItem>
                </Col>
                <Col span={4}>
                    <FormItem label="m">
                        <InputNumber 
                            name="m"
                            value={this.state.data.m}
                            onChange={(value) => this.updateData("m", value)}
                        />
                        <span className="ant-form-text"></span>
                    </FormItem>
                </Col>
                <Col span={4}>
                    <FormItem label="Cp">
                        <InputNumber
                            name="Cp"
                            value={this.state.data.Cp}
                            onChange={(value) => this.updateData("Cp", value)}
                        />
                        <span className="ant-form-text"></span>
                    </FormItem>
                </Col>
            </Row> 

            <FormItem wrapperCol={{ span: 12, offset: 12 }}>
                <Button type="primary" htmlType="submit">
                    Ingresar
                </Button>
            </FormItem>
           </Form> 
        )
    }
}
