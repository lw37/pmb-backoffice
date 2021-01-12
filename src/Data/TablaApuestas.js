import React from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


export default class TablaApuestas extends React.Component {

  state = {
    apuestas: [],
  }
  render() {
    return (
      <>
        <div>
          <DataTable value={this.state.apuestas}>
            <Column field="ApuestaId" header="ID"></Column>
            <Column field="TipoApuesta" header="Tipo de Apuestas"></Column>
            <Column field="Cuota" header="Cuota"></Column>
            <Column field="DineroApostado" header="Dinero Apostado"></Column>
            <Column field="FechaApuesta" header="Fecha de Apuestas"></Column>
            <Column field="MercadoId" header="ID de Mercado"></Column>
            <Column field="UsuarioId" header="Email de Usuario"></Column>
          </DataTable>
        </div>
        <button onClick={this.getApuestas}> actualizaar</button>
      </>
    )
  }

  getApuestas = () => {
    const promise = axios.get("https://localhost:44315/api/Apuestas");
    const promiseResult = promise.then(res => {
      const apuestas = res.data;
      this.setState({ apuestas }, () => { console.log("Estos son apuestas"); console.log(apuestas); })
    });
  }

  componentDidMount() {
    const promise = axios.get("https://localhost:44315/api/Apuestas");
    const promiseResult = promise.then(res => {
      const apuestas = res.data;
      this.setState({ apuestas }, () => { console.log("Estos son apuestas"); console.log(apuestas); })
    });
  }

}
