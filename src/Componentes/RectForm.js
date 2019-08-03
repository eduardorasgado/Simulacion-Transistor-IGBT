import React, { Component } from 'react'
import { Form, InputNumber, Button, Row, Col } from 'antd';
var FormItem = Form.Item;

export default class RectForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        }
    }

    sayHi(event) {
        event.preventDefault();
        alert("Se han guardado los datos");
    }
    render() {
        return (
           <Form onSubmit={(evnt) => this.sayHi(evnt)}>
            <Row>
                <Col span={4}>
                    <FormItem label="p">
                        <InputNumber min={1} max={10} value={5}/>
                        <span className="ant-form-text"></span>
                    </FormItem>
                </Col>  
                <Col span={4}>
                    <FormItem label="v">
                        <InputNumber min={1} max={10} value={5}/>
                        <span className="ant-form-text"></span>
                    </FormItem>
                </Col>
                <Col span={4}>
                    <FormItem label="D">
                        <InputNumber min={1} max={10} value={5}/>
                        <span className="ant-form-text"></span>
                    </FormItem>
                </Col> 
                <Col span={4}>
                    <FormItem label="µ">
                        <InputNumber min={1} max={10} value={5}/>
                        <span className="ant-form-text"></span>
                    </FormItem>
                </Col>
                <Col span={4}>
                    <FormItem label="Pr">
                        <InputNumber min={1} max={10} value={5}/>
                        <span className="ant-form-text"></span>
                    </FormItem>
                </Col>
            </Row>

            <Row>
                <Col span={4}>
                    <FormItem label="A">
                        <InputNumber min={1} max={10} value={5}/>
                        <span className="ant-form-text"></span>
                    </FormItem>
                </Col>
                <Col span={4}>
                    <FormItem label="Ts">
                        <InputNumber min={1} max={10} value={5}/>
                        <span className="ant-form-text"></span>
                    </FormItem>
                </Col>
                <Col span={4}>
                    <FormItem label="T(infinito)">
                        <InputNumber min={1} max={10} value={5}/>
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
