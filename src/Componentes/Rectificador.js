import React, { Component } from 'react'
import { Tag, Divider, Table } from 'antd';
import 'antd/dist/antd.css';
import './Tab.css';
import RectForm from './RectForm';
import ResForm from './ResForm';
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
            return [key+1, element.dT] 
        });

        this.setState({
            pairXYarray: newXY
        });
        console.log(this.state.pairXYarray);
    }

    render() {
        const contentGuiaIngresar = (
            <div>
              <p style={{margin: 0}}>Los valores se van a colocar en sus respectivos campos al dar click</p>
              <p style={{margin: 0}}>Esta operación no ingresa los datos a la tabla,</p>
              <p style={{margin: 0}}>haga click en <Tag color="blue">ingresar a tabla</Tag>
               después de esta operación para ello.</p>
            </div>
          );

          const contentGuiaIngresarATabla = (
            <div>
              <p style={{margin: 0}}>Todos los valores deben ser asignados, así como µ debe ser distinto a cero para poder proceder.</p>
              <p style={{margin: 0}}>Al dar click, se agrega una nueva fila a la tabla de la siguiente sección: <Tag color="red">Tabla de datos</Tag></p>
              <p style={{margin: 0}}>Estos datos son acumulativos, cada click agrega una nueva fila a la tabla.</p>
              <p>Nota: Al reiniciar la página se pierden tus datos almacenados.</p>
            </div>
          );

        return (
            <div>
               <h1>{this.props.title}</h1>
               <Divider>Ingreso de nuevos datos</Divider>
               {this.props.typeRect === 0 ?
                    <RectForm
                        contentGuiaIngresar={contentGuiaIngresar}
                        contentGuiaIngresarATabla={contentGuiaIngresarATabla}
                        setNewData={this.setNewData}
                    ></RectForm>
                     :
                     <ResForm
                        contentGuiaIngresar={contentGuiaIngresar}
                        contentGuiaIngresarATabla={contentGuiaIngresarATabla}
                        setNewData={this.setNewData}
                     ></ResForm>

                }
               
               <Divider>Tabla de datos</Divider>
               {this.props.typeRect === 0 ?
                    <RectTable
                    {...this.state}
                    tableType={this.props.typeRect}
                    deleteARecord={this.deleteARecord}
                   ></RectTable>
                   :
                   <RectTable
                    {...this.state}
                    tableType={this.props.typeRect}
                    deleteARecord={this.deleteARecord}
                   >
                   </RectTable>
                }

               <Divider>Simulación actual</Divider>
               <Grafica
                chartType={this.props.typeRect}
                {...this.state}
               ></Grafica>
            </div>
        )
    }
}
