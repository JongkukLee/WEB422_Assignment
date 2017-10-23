import React, { Component } from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import MainContainer from './MainContainer.js'

class Projects extends Component {
    constructor(props) {
        super(props);
        this.dataSource = this.props.dataSource;
        this.state = {
            projects: []
        }
    }

    componentDidMount() {
        axios.get(this.dataSource).then((res) => {            
            this.setState({ projects: res.data });
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
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.projects.map((project, index) => {
                            let date = "";
                            if(project.ProjectEndDate == null) date = "n/a";
                            else date = <Moment format="LL" date={project.ProjectEndDate} />
                            return (
                                <tr>
                                    <td>{project.ProjectName}</td>
                                    <td>{project.ProjectDescription}</td>
                                    <td><Moment format="LL" date={project.ProjectStartDate} /></td>
                                    <td>{date}</td>
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

export default Projects;