import React, { Component } from 'react'
import { Tag, Divider, Table } from 'antd';
import 'antd/dist/antd.css';
import './Tab.css';
import RectForm from './RectForm';
import RectTable from './RectTable';

export default class Rectificador extends Component {
    constructor (props) {
        super(props);

        this.state = {
            data: []
        };

        this.setNewData = this.setNewData.bind(this);
    }

    setNewData(data) {
        alert("new data added");
    }
    render() {
        return (
            <div>
               <h1>Simulación de rectificador</h1>
               <Divider>Ingreso de nuevos datos</Divider>
               <RectForm
                setNewData={this.setNewData}
               ></RectForm>
               
               <Divider>Tabla de datos</Divider>
               <RectTable></RectTable>

               <Divider>Simulación actual</Divider>
               AQUI SE MUESTRA LA GRAFICA
            </div>
        )
    }
}
