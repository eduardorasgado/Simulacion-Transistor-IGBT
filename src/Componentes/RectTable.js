import React, { Component } from 'react'
import { Table } from 'antd';
import 'antd/dist/antd.css';

export default class RectTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            
        }
    }

    columns = [
        {
          title: 'ρ',
          dataIndex: 'p',
          width: '4%',
          editable: true,
        },
        {
            title: 'v',
            dataIndex: 'v',
            width: '4%',
            editable: true,
          },
          {
            title: 'D',
            dataIndex: 'D',
            width: '4%',
            editable: true,
          },
          {
            title: 'µ',
            dataIndex: 'miu',
            width: '4%',
            editable: true,
          },
          {
            title: 'Pr',
            dataIndex: 'Pr',
            width: '4%',
            editable: true,
          },
          {
            title: 'k',
            dataIndex: 'k',
            width: '4%',
            editable: true,
          },
          {
            title: 'l',
            dataIndex: 'l',
            width: '4%',
            editable: true,
          },
          {
            title: 'A',
            dataIndex: 'A',
            width: '4%',
            editable: true,
          },
          {
            title: 'Ts',
            dataIndex: 'Ts',
            width: '4%',
            editable: true,
          },
          {
            title: 'T(inf)',
            dataIndex: 'Tinf',
            width: '4%',
            editable: true,
          },
          {
            title: 'CpGlicol',
            dataIndex: 'CpGlicol',
            width: '4%',
            editable: true,
          },
          {
            title: 'ΔTglicol',
            dataIndex: 'deltaTGlicol',
            width: '4%',
            editable: true,
          },{
            title: 'ρglicol',
            dataIndex: 'pGlicol',
            width: '4%',
            editable: true,
          },
          {
            title: 'Q',
            dataIndex: 'Qcaudal',
            width: '4%',
            editable: true,
          },
          {
            title: 'E1',
            dataIndex: 'E1',
            width: '4%',
            editable: true,
          },
          {
            title: 'E2',
            dataIndex: 'E2',
            width: '4%',
            editable: true,
          },
          {
            title: 'm',
            dataIndex: 'm',
            width: '4%',
            editable: true,
          },
          {
            title: 'Cp',
            dataIndex: 'Cp',
            width: '4%',
            editable: true,
          }

    ]
    render() {
        return (
            <div>
                <Table columns={this.columns} dataSource={this.props.data} />
            </div>
        )
    }
}
