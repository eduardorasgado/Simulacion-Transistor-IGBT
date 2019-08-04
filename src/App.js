import React from 'react';
import { Tabs, Button, Tag, PageHeader } from 'antd';
import Rectificador from './Componentes/Rectificador';
import 'antd/dist/antd.css';
import './App.css';
const TabPane = Tabs.TabPane;

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      rectificadorTitle: "Simulación de Rectificador",
      inversorTitle: "Simulación de Inversor"
    }
  }
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
              <Rectificador
                title={this.state.rectificadorTitle}
              ></Rectificador>
            </TabPane>
            <TabPane tab="Inversor" key="2" >
              <Rectificador
                title={this.state.inversorTitle}
              ></Rectificador>
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
