import React from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


export default class TablaEventos extends React.Component {

  state = {
    eventos: [],
  }
  render() {
    return (
      <>
        <div>
          <DataTable value={this.state.eventos}>
            <Column field="NombreEquipo" header="Equipo Local"></Column>
            <Column field="Visitante" header="Equipo Visitante"></Column>
            <Column field="FechaEvento" header="Fecha de Evento"></Column>
          </DataTable>
        </div>
        <button onClick={this.getEventos}> actualizar</button>
      </>
    )
  }

  getEventos = () => {
    const promise = axios.get("https://localhost:44315/api/eventos");
    const promiseResult = promise.then(res => {
      const eventos = res.data;
      console.log("Eventos :"+this.state.eventos)
      this.setState({ eventos }, () => { console.log("Estos son eventos"); console.log(eventos); })
    });
  }
  componentDidUpdate(){

  }
  componentDidMount() {
      const promise = axios.get("https://localhost:44315/api/eventos");
      const promiseResult = promise.then(res => {
        const eventos = res.data;
        console.log("Eventos :"+this.state.eventos)
        this.setState({ eventos }, () => { console.log("Estos son eventos"); console.log(eventos); })
      });
  }

}
