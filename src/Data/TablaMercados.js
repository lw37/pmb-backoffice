import React from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default class TablaMercados extends React.Component {
  state = {
    mercados: [],
    lista: []
  }
  render() {
    return (
      <>
        <div>
          <DataTable value={this.state.lista}>
            <Column field="MercadoId" header="ID"></Column>
            <Column field="TipoMercado" header="Tipo de Mercado"></Column>
            <Column field="CuotaOver" header="Cuota Over"></Column>
            <Column field="CuotaUnder" header="Cuota Under"></Column>
            <Column field="DineroOver" header="Dinero Over"></Column>
            <Column field="DineroUnder" header="Dinero Under"></Column>
            <Column field="EventoId" header="Evento ID"></Column>
            <Column body={this.estado} field="Bloqueado" header="Bloquear"></Column>
          </DataTable>
        </div>
        <button onClick={this.getMercados}> actualizaar</button>
      </>
    )
  }
  estado = (rowData) => {
    return (<>{rowData.Bloqueado ?
      <div><p>si</p><button onClick={()=>this.desbloquearMercado(rowData)}>Desbloquear</button></div>
      : <div><p>no</p><button onClick={()=>this.bloquearMercado(rowData)}>Bloquear</button></div>}
    </>)
  }

  desbloquearMercado=(mercado)=>{
    axios.put("https://localhost:44315/api/Mercados/"+mercado.MercadoId+"?bloqueado="+false).then(()=>this.getMercados())
  }

  bloquearMercado=(mercado)=>{
    axios.put("https://localhost:44315/api/Mercados/"+mercado.MercadoId+"?bloqueado="+true).then(()=>this.getMercados())
  }
  
  getMercados = () => {
    const promise = axios.get("https://localhost:44315/api/Mercados");
    const promiseResult = promise.then(res => {
      const mercados = res.data;
      this.setState({ mercados, lista:mercados }, () => { console.log("Estos son mercados"); console.log(mercados); })
    });
  }

  componentDidMount(){
    this.getMercados();
  }

}
