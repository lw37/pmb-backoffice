import React from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { SelectButton } from 'primereact/selectbutton';
import { Calendar } from 'primereact/calendar';
import { InputText } from "primereact/inputtext";
export default class TablaEventos extends React.Component {

  state = {
    eventos: [],
    evento: {
      EventoId: "6",
      NombreEquipo: "Valencia1",
      Visitante: "Bacelona1",
      FechaEvento: "2077-07-07"
    },
    menu: ["Lista", "+ Nuevo Evento"],
    menuNom: ""
  }
  render() {
    return (
      <>
        <SelectButton options={this.state.menu} onChange={(e) => this.setState({ menuNom: e.value })} />
        {this.state.menuNom === "Lista" ? <div>
          <DataTable value={this.state.eventos}>
            <Column field="NombreEquipo" header="Equipo Local"></Column>
            <Column field="Visitante" header="Equipo Visitante"></Column>
            <Column field="FechaEvento" header="Fecha de Evento"></Column>
          </DataTable>
          <button onClick={this.getEventos}> actualizar</button>
        </div>
          :
          <div>
            <p>Crear nuevo evento</p>
            <div >
              <label>Fecha:</label>
              <Calendar id="icon" showIcon />
            </div>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-user"></i>
              </span>
              <InputText placeholder="Username" />
            </div>
            <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
                <i className="pi pi-user"></i>
              </span>
            <InputText></InputText></div>
            <button onClick={this.anyadirEvento}> Añadir</button>
          </div>
        }

      </>
    )
  }

  anyadirEvento = () => {
    axios.post("https://localhost:44315/api/eventos", this.state.evento)
  }

  getEventos = () => {
    const promise = axios.get("https://localhost:44315/api/eventos");
    const promiseResult = promise.then(res => {
      const eventos = res.data;
      console.log("Eventos :" + this.state.eventos)
      this.setState({ eventos }, () => { console.log("Estos son eventos"); console.log(eventos); })
    });
  }
  componentDidUpdate() {

  }
  componentDidMount() {
    const promise = axios.get("https://localhost:44315/api/eventos");
    const promiseResult = promise.then(res => {
      const eventos = res.data;
      console.log("Eventos :" + this.state.eventos)
      this.setState({ eventos }, () => { console.log("Estos son eventos"); console.log(eventos); })
    });
  }

}
