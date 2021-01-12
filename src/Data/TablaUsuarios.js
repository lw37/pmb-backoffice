 import React from 'react';
import axios from 'axios';

export default class TablaUsuarios extends React.Component {

  state = {
    usuarios: []
  }
  render() {
    return (
      <>
      <button onClick= {this.getUsuarios}> actualizaar</button>
      </>
    )
  }

  getUsuarios = () => {
    const promise = axios.get("https://localhost:44315/api/apuestas");
    const promiseResult = promise.then(res => {
      const usuarios = res.data;
      console.log(this.state.usuarios)
      this.setState({ usuarios }, () => { console.log("Estos son usuarios"); console.log(usuarios); })
    });
  }

  componentDidMount() {
    const promise = axios.get("https://localhost:44315/api/apuestas");
    const promiseResult = promise.then(res => {
      const usuarios = res.data;
      this.setState({ usuarios }, () => { console.log("Estos son usuarios"); console.log(usuarios); })

    });
  }

}
