
import React from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default class TablaMercados extends React.Component {

  state = {
    mercados: [],
  }
  render() {
    return (
      <>
        <div>
          <DataTable value={this.state.mercados}>
            <Column field="MercadoId" header="ID"></Column>
            <Column field="TipoMercado" header="Tipo de Mercado"></Column>
            <Column field="CuotaOver" header="Cuota Over"></Column>
            <Column field="CuotaUnder" header="Cuota Under"></Column>
            <Column field="DineroOver" header="Dinero Over"></Column>
            <Column field="DineroUnder" header="Dinero Under"></Column>
            <Column field="EventoId" header="Evento ID"></Column>
            <Column body={this.estado} field="Bloqueado" header="Bloqueado"></Column>
          
          </DataTable>
        </div>
        <button onClick={this.getMercados}> actualizaar</button>
      </>
    )
  }
   estado=(rowData)=>{
    return (<>{rowData.Bloqueado?<p>si</p>:<p>no</p>}</>)

  }

  getMercados = () => {
    const promise = axios.get("https://localhost:44315/api/Mercados");
    const promiseResult = promise.then(res => {
      const mercados = res.data;
      this.setState({ mercados }, () => { console.log("Estos son mercados"); console.log(mercados); })
    });
  }

  componentDidMount() {
    const promise = axios.get("https://localhost:44315/api/Mercados");
    const promiseResult = promise.then(res => {
      const mercados = res.data;
      this.setState({ mercados }, () => { console.log("Estos son mercados"); console.log(mercados); })
    });
  }

}
