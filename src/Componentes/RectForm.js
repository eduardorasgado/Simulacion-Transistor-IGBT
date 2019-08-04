import React, { Component } from 'react'
import { Form, InputNumber, Button, Row, Col, Tag, Input } from 'antd';
import { computeRe, computeNu, computeH, computeQigbt, computeMGlicol, computeQDisipador, computedT } from '../mathematics/Formulas';
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
                Cp: 0,

                // datos que deben de calcularse
                re: null,
                nu: null,
                h: null,
                Qigbt: null,
                mGlicol: null,
                Qdis: null,
                dT: null

            },
            cvsRow: '',
            cvsRowFromFields: ''
        }

        this.saveData = this.saveData.bind(this);
        this.updateData = this.updateData.bind(this);
        this.updateCVSRow = this.updateCVSRow.bind(this);
        this.insertingAllFieldsFromCVSRow = this.insertingAllFieldsFromCVSRow.bind(this);
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
            let reRes = computeRe(
                this.state.data.p,
                this.state.data.v,
                this.state.data.D,
                this.state.data.miu
            );
            let nuRes = computeNu(
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
            let mgRes = computeMGlicol(
                this.state.data.pGlicol,
                this.state.data.Qcaudal
            );
            let qdisRes = computeQDisipador(
                mgRes,
                this.state.data.CpGlicol,
                this.state.data.deltaTGlicol
            );
            let dtRes = computedT(
                this.state.data.E1,
                this.state.data.E2,
                qdisRes,
                this.state.data.Qigbt,
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
            newData.Qigbt = qRes.toFixed(2);
            newData.mGlicol = mgRes.toFixed(2);
            newData.Qdis = qdisRes.toFixed(2);
            if(dtRes !== null) {
                newData.dT = dtRes.toFixed(2);
            } else {
                newData.dT = dtRes;
            }
            this.setState({
                data: newData
            });
        }, 2000);
    }

    /**
     * Funcion que permite mapear todos los datos del arreglo obtenido de
     * el input cvs a el objeto data en el estado
     * @param {} event 
     */
    insertingAllFieldsFromCVSRow(event) {
        let newData = this.state.cvsRow.split(",");
        let oldData = this.state.data;
        oldData.p = newData[0];
        oldData.v = newData[1];
        oldData.D = newData[2];
        oldData.miu = newData[3];
        oldData.Pr = newData[4];
        oldData.k = newData[5];
        oldData.l = newData[6];
        oldData.A = newData[7];
        oldData.Ts = newData[8];
        oldData.Tinf = newData[9];
        oldData.CpGlicol = newData[10];
        oldData.deltaTGlicol = newData[11];
        oldData.pGlicol = newData[12];
        oldData.Qcaudal = newData[13];
        oldData.E1 = newData[14];
        oldData.E2 = newData[15];
        oldData.m = newData[16];
        oldData.Cp = newData[17];

        this.setState({
            data: oldData
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
                                    placeholder="ρ, v, D, µ, Pr, k, l, A, Ts, T(infinito), Cpglicol, ΔTglicol, ρglicol, Q(caudal), E1, E2, m, Cp" 
                                    name="all"
                                    value={this.state.cvsRow}
                                    onChange={(event) => this.updateCVSRow(event)}
                                />
                            </FormItem>
                    </Col>
                    <Col span={2}>
                        <Button 
                            htmlType="submit"
                            onClick={(event) => this.insertingAllFieldsFromCVSRow(event)}
                            >
                            Ingresar
                        </Button>
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
                        Ingresar a tabla
                    </Button>
                </FormItem>
                <br></br>
                <Row>
                    <p>Con los valores proporcionados en los campos individuales usted puede obtener una fila para un archivo cvs.</p>
                    <Col span={1}></Col>
                    <Col span={16}>
                        <FormItem>
                            <Input 
                                placeholder="ρ, v, D, µ, Pr, k, l, A, Ts, T(infinito), Cpglicol, ΔTglicol, ρglicol, Q(caudal), E1, E2, m, Cp" 
                                name="all"
                                value={this.state.cvsRowFromFields}
                            />
                        </FormItem>
                    </Col>
                    <Col span={1}></Col>
                    <Col span={1}>
                        <Button>
                            Obtener en cvs
                        </Button>    
                    </Col>
                </Row>
            </Form>
            <br></br>
            <p>Previa de resultados: </p>
            <Tag color="blue">Re: {this.state.data.re}</Tag>
            <Tag color="blue">Nu: {this.state.data.nu}</Tag>
            <Tag color="blue">h: {this.state.data.h}</Tag>
            <Tag color="blue">Qigbt: {this.state.data.Qigbt}</Tag>
            <Tag color="blue">mGlicol: {this.state.data.mGlicol}</Tag>
            <Tag color="blue">Q(disipador): {this.state.data.Qdis}</Tag>
            <Tag color="blue">dT/dt: {this.state.data.dT}</Tag>
           </div> 
        )
    }
}
