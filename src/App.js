import React from 'react';
import { Tabs, Button, Tag, PageHeader } from 'antd';
import Rectificador from './Componentes/Rectificador';
import 'antd/dist/antd.css';
import './App.css';
const TabPane = Tabs.TabPane;

class App extends React.Component {
  render() {
    return (
      <PageHeader className="App"
        onBack={() => window.history.back()}
        title="Simulación y modelo matematico para la generacion de calor de un transistor IGBT"
        subTitle="Transferencia de calor"
        tags={<Tag color="blue">Simulación</Tag>}
        
        footer={
          <Tabs defaultActiveKey="1">
            <TabPane tab="Rectificador" key="1" >
              <Rectificador></Rectificador>
            </TabPane>
            <TabPane tab="Inversor" key="2" >
              DOS MODOS EN INVERSOR, MANUAL LISTADO
            </TabPane>
            <TabPane tab="Resistencia" key="3">
              DOS MODOS, MANUAL Y LISTADO
            </TabPane>
          </Tabs>
        }
      >
      <div className="wrap">
        <div className="content padding"></div>
        <div className="extraContent"></div>
      </div>
    </PageHeader>
    );
  }
}

export default App;
