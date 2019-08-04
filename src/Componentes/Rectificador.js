import React, { Component } from 'react'
import { Tag, Divider, Table } from 'antd';
import 'antd/dist/antd.css';
import './Tab.css';
import RectForm from './RectForm';
import RectTable from './RectTable';
import Grafica from './Grafica';

export default class Rectificador extends Component {
    constructor (props) {
        super(props);

        this.state = {
            count: 1,
            data: [],
            pairXYarray: []
        };

        this.setNewData = this.setNewData.bind(this);
        this.deleteARecord = this.deleteARecord.bind(this);
        this.createNewXYArray = this.createNewXYArray.bind(this);
    }

    setNewData(newData) {
        // json deep copy
        let copied = JSON.parse(JSON.stringify(newData));
        copied["key"] = this.state.count;
        this.setState({
            count: (this.state.count + 1)
        });

        var actualData = this.state.data;
        actualData.push(copied);
        this.setState({
            data: actualData
        });
        alert("nuevos datos agregados");

        console.log(this.state.data);

        this.createNewXYArray();
    }

    deleteARecord(key) {
        var actualData = this.state.data;
        actualData = actualData.filter((data) => {
            if(data.key  !== key) {
                return data
            }
        });

        this.setState({
            data: actualData
        });

        this.createNewXYArray();
    }

    createNewXYArray() {
        let newXY = this.state.data.map((element, key) => {
            return [element.dT, key] 
        });

        this.setState({
            pairXYarray: newXY
        });
        console.log(this.state.pairXYarray);
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
               <RectTable
                {...this.state}
                deleteARecord={this.deleteARecord}
               ></RectTable>

               <Divider>Simulación actual</Divider>
               <Grafica
                {...this.state}
               ></Grafica>
            </div>
        )
    }
}
