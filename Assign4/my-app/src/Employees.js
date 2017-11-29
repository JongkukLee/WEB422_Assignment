import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import MainContainer from './MainContainer.js'

class Employees extends Component {
    constructor(props) {
        super(props);
        this.dataSource = this.props.dataSource;
        this.state = {
            employees: []
        }
    }

    componentDidMount() {
        axios.get(this.dataSource).then((res) => {            
            this.setState({ employees: res.data });
        }).catch((err) => {
            console.log("error");
        });
    }

    componentWillUnmount() {

    }
    render() {
        return ( 
            <div>
            <MainContainer sidebar={this.props.title}>
            <h1 className="page-header">{this.props.title}</h1> 
            <div className="table-responsive overview-table">
                <table  className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Name & Position</th>
                            <th>Address</th>
                            <th>Phone Num</th>
                            <th>Hire Date</th>
                            <th>Salary Bonus</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.employees.map((employee, index) => {
                            return (
                                <tr>
                                    <td>{employee.FirstName} {employee.LastName} - {employee.Position.PositionName}</td>
                                    <td>{employee.AddressStreet} {employee.AddressState} {employee.AddressCity} {employee.AddressZip}</td>
                                    <td>{employee.PhoneNum} ext {employee.Extension}</td>
                                    <td>{moment(employee.HireDate).utc().format('LL')}</td>
                                    <td>$ {employee.SalaryBonus}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            </MainContainer>
      </div>            
        );
    }
}

export default Employees;