import React from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';

export default class TablaApuestas extends React.Component {

  state = {
    apuestas: [],
    lista: [],
    textoEmail: "",
    textoMercado: "",
    textoEvento: "",
  }
  render() {
    return (
      <>
        <div>
          <label> Email: </label>
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText onChange={this.filtroEmail} placeholder="Search" />
          </span>
          <label> Mercado: </label>
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText onChange={this.filtroMercado} placeholder="Search" />
          </span>
          <label> Evento: </label>
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText onChange={this.filtroEvento} placeholder="Search" />
          </span>
          <DataTable value={this.state.lista}>
            <Column field="apuestaId" header="ID"></Column>
            <Column body={this.estado} field="tipoApuesta" header="Tipo de Apuestas"></Column>
            <Column field="cuota" header="Cuota"></Column>
            <Column field="dineroApostado" header="Dinero Apostado"></Column>
            <Column field="fechaApuesta" header="Fecha de Apuestas"></Column>
            <Column field="mercadoId" header="ID de Mercado"></Column>
            <Column field="eventoId" header="ID de Evento"></Column>
            <Column field="email" header="Email de Usuario"></Column>
          </DataTable>
        </div>
        <button onClick={this.getApuestas}> actualizar</button>
      </>
    )
  }

  filtroEmail = (evento) => {
    this.setState({ textoEmail: evento.target.value }, () => { this.filtro() });
  }

  filtroMercado = (evento) => {
    this.setState({ textoMercado: evento.target.value }, () => { this.filtro() });
  }

  filtroEvento = (evento) => {
    this.setState({ textoEvento: evento.target.value }, () => { this.filtro() });
  }

  filtro = () => {
    if (this.state.textoEmail !== "") {
      const lista = this.state.apuestas.filter(a => a.email === this.state.textoEmail)
      this.setState({ lista });
    } else if (this.state.textoEvento !== "") {
      const lista = this.state.apuestas.filter(a => a.eventoId == this.state.textoEvento)
      this.setState({ lista });
    }
    else if (this.state.textoMercado !== "") {
      const lista = this.state.apuestas.filter(a => a.mercadoId == this.state.textoMercado)
      this.setState({ lista });
    } else {
      this.getApuestas();
    }

  }


  estado = (rowData) => {
    return (<>{rowData.tipoApuesta ? <p>Over</p> : <p>Under</p>}</>)
  }

  getApuestas = () => {
    const promise = axios.get("https://localhost:44315/api/Apuestas");
    const promiseResult = promise.then(res => {
      const apuestas = res.data;
      this.setState({ apuestas, lista: apuestas }, () => { console.log("Estos son apuestas"); console.log(apuestas); })
    });
  }

  componentDidMount() {
    const promise = axios.get("https://localhost:44315/api/Apuestas");
    const promiseResult = promise.then(res => {
      const apuestas = res.data;
      this.setState({ apuestas, lista: apuestas }, () => { console.log("Estos son apuestas"); console.log(apuestas); })
    });
  }

}
