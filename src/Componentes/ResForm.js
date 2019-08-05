import React, { Component } from 'react'
import { Form, InputNumber, Button, Row, Col, Tag, Input, Popover } from 'antd';
import { computeRe, computeNu, computeH, computeQigbt, computeMGlicol, computeQDisipador, computedT, computeNuResistencia, computedTResistencia } from '../mathematics/Formulas';
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
                l: 0.3,

                A: 0,
                Ts: 0,
                Tinf: 0,

                E1: 0,
                Pd: 0,
                m: 0,
                Cp: 0,

                // datos que deben de calcularse
                re: null,
                nu: null,
                h: null,
                Qresistencia: null,
                dT: null

            },
            cvsRow: '',
            cvsRowFromFields: '',
            cvsPlaceholder: "ρ, v, D, µ, Pr, k, l, A, Ts, T(infinito), E1, Pd, m, Cp"
        }

        this.saveData = this.saveData.bind(this);
        this.updateData = this.updateData.bind(this);
        this.updateCVSRow = this.updateCVSRow.bind(this);
        this.insertingAllFieldsFromCVSRow = this.insertingAllFieldsFromCVSRow.bind(this);
        this.convertDataToCVSRow = this.convertDataToCVSRow.bind(this);
        this.updateResults = this.updateResults.bind(this);
    }

    saveData(event) {
        event.preventDefault();
        this.updateResults();

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

    updateCVSRow(event) {
        let target = event.target;
        let inputName = target.name;
        let value = target.value;

        this.setState({
            cvsRow: value
        });
    }

    componentDidMount() {
        setInterval(() => {
            this.updateResults();
        }, 2000);
    }

    updateResults() {
        let reRes = computeRe(
            this.state.data.p,
            this.state.data.v,
            this.state.data.D,
            this.state.data.miu
        );
        let nuRes = computeNuResistencia(
            reRes,
            this.state.data.Pr
        );
        let hRes = computeH(
            this.state.data.k,
            this.state.data.l,
            nuRes,

        );
        let qRes = computeQigbt(
            this.state.data.A,
            hRes,
            this.state.data.Ts,
            this.state.data.Tinf
        );
        
        let dtRes = computedTResistencia(
            this.state.data.E1,
            this.state.data.Qresistencia,
            this.state.data.Pd,
            this.state.data.m,
            this.state.data.Cp
        );

        let newData = this.state.data;
        if(reRes !== null) {
            newData.re = reRes.toFixed(2);
        } else {
            newData.re = reRes;
        }
        newData.nu = nuRes.toFixed(2);
        newData.h = hRes.toFixed(2);
        newData.Qresistencia = qRes.toFixed(2);
        if(dtRes !== null) {
            newData.dT = dtRes.toFixed(2);
        } else {
            newData.dT = dtRes;
        }
        this.setState({
            data: newData
        });
    }

    /**
     * Funcion que permite mapear todos los datos del arreglo obtenido de
     * el input cvs a el objeto data en el estado
     * @param {} event 
     */
    insertingAllFieldsFromCVSRow(event) {
        let newData = this.state.cvsRow.split(",");
        let oldData = this.state.data;

        Object.keys(oldData).forEach((key, index) => {
            if(index <= 13){
                oldData[key] = newData[index]
            }
        });

        this.setState({
            data: oldData
        });
    }

    /**
     * Funcion que permite mapear los datos individuales de los campos y
     * los junta en un string para devolverlos como fila de cvs
     * @param {} event 
     */
    convertDataToCVSRow(event) {
        //cvsRowFromFields
        let values = [];
        Object.keys(this.state.data).forEach((key, index) => {
            if(index <= 13) {
                values.push(this.state.data[key]);
            }
        });

        this.setState({
            cvsRowFromFields: values.join(",")
        });
    }

    

    render() {
       
        return (
           <div>
               <Form>
                <p>Insertar por fila(cvs)</p>
                <p>Usted pueden insertar filas a la tabla, por fila con formato cvs(comma separated values). Procurar no dejar espacios entre valores y comas.</p>
                    <Row>
                    <Col span={1}></Col>
                    <Col span={18}>
                            <FormItem>
                                <Input 
                                    placeholder={this.state.cvsPlaceholder}
                                    name="all"
                                    value={this.state.cvsRow}
                                    onChange={(event) => this.updateCVSRow(event)}
                                />
                            </FormItem>
                    </Col>
                    <Col span={2}>
                        <Popover content={this.props.contentGuiaIngresar} title="Tu Guía">
                            <Button 
                                htmlType="submit"
                                onClick={(event) => this.insertingAllFieldsFromCVSRow(event)}
                                >
                                Ingresar
                            </Button>
                        </Popover>
                    </Col>
                    </Row>
                    <br/>
               </Form>
               <Form onSubmit={(evnt) => this.saveData(evnt)}>
               
                <p>Insertar por campo</p>
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
                            
                        </FormItem>
                    </Col>
                    <Col span={4}>
                        <FormItem label="Ts">
                            <InputNumber
                                name="Ts"
                                value={this.state.data.Ts}
                                onChange={(value) => this.updateData("Ts", value)}
                            />
                            
                        </FormItem>
                    </Col>
                    <Col span={4}>
                        <FormItem label="T(infinito)">
                            <InputNumber
                                name="Tinf"
                                value={this.state.data.Tinf}
                                onChange={(value) => this.updateData("Tinf", value)}
                            />

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
                            
                        </FormItem>
                    </Col>
                    <Col span={4}>
                        <FormItem label="Pd">
                            <InputNumber
                                name="Pd"
                                value={this.state.data.Pd}
                                onChange={(value) => this.updateData("Pd", value)}
                            />
                            
                        </FormItem>
                    </Col>
                    <Col span={4}>
                        <FormItem label="m">
                            <InputNumber 
                                name="m"
                                value={this.state.data.m}
                                onChange={(value) => this.updateData("m", value)}
                            />
                            
                        </FormItem>
                    </Col>
                    <Col span={4}>
                        <FormItem label="Cp">
                            <InputNumber
                                name="Cp"
                                value={this.state.data.Cp}
                                onChange={(value) => this.updateData("Cp", value)}
                            />
                            
                        </FormItem>
                    </Col>
                </Row>
                <FormItem wrapperCol={{ span: 12, offset: 12 }}>
                    <Popover content={this.props.contentGuiaIngresarATabla} title="Tu Guía">
                        <Button type="primary" htmlType="submit"
                            disabled={this.state.data.re == null ? true : false }
                        >
                            Ingresar a tabla
                        </Button>
                    </Popover>
                    
                </FormItem>
                <br></br>
                <Row>
                    <p>Con los valores proporcionados en los campos individuales usted puede obtener una fila para un archivo cvs.</p>
                    <Col span={1}></Col>
                    <Col span={16}>
                        <FormItem>
                            <Input 
                                placeholder={this.state.cvsPlaceholder} 
                                name="all"
                                value={this.state.cvsRowFromFields}
                            />
                        </FormItem>
                    </Col>
                    <Col span={1}></Col>
                    <Col span={1}>
                        <Button
                            onClick={(event) => this.convertDataToCVSRow(event)}
                        >
                            Obtener en cvs
                        </Button>    
                    </Col>
                </Row>
            </Form>
            <br></br>
            <p>Previa de resultados: (Los resultados son calculados automaticamente cuando introduce nuevos valores en los campos de registro)</p>
            <Tag color="blue">Re: {this.state.data.re}</Tag>
            <Tag color="blue">Nu: {this.state.data.nu}</Tag>
            <Tag color="blue">h: {this.state.data.h}</Tag>
            <Tag color="blue">Q(resistencia): {this.state.data.Qresistencia}</Tag>
            <Tag color="green">dT/dt: {this.state.data.dT}</Tag>
           </div> 
        )
    }
}
