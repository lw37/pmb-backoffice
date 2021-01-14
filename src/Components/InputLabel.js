import React from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { InputText } from 'primereact/inputtext';

export default class MyInput extends React.Component{
    render() {
        return (
            <>
                <label> {this.props.labe} </label>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText onChange={this.props.callback} placeholder="Search" />
                </span>
            </>
        );
    }
}
