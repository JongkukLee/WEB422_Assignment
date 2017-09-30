/********************************************************************************** 
*   WEB422 – Assignment 3 
*   I declare that this assignment is my own work in accordance with Seneca  Academic Policy.   
*   No part of this assignment has been copied manually or electronically from any other source 
*  (including web sites) or distributed to other students. 
*  
*	Name: _Jongkuk Lee_________ Student ID: _127730158____ Date: _2017-10-07_____ 
* 
* 
********************************************************************************/  
const urlString = "https://agile-retreat-67872.herokuapp.com/";

var viewModel = {
    teams:ko.observableArray([]),
    employees:ko.observableArray([]),
    projects:ko.observableArray([])    
};

    // show	generic modal using	id
    function showGenericModal(title, message)
    {
        console.log("main.js:::showGenericModal()" + title);
        console.log("main.js:::showGenericModal()" + message);
        $("#genericModal").modal ({
            backdrop: 'static', // disable clicking on the backdrop to close
            keyboard: false, // disable using the keyboard to close
        });
        $("#myModalTitle").empty();
        $("#myModalMessage").empty();
        $("#myModalTitle").text(title);
        $("#myModalMessage").html(message);
    }

// populate	the	"employeesModel" array,	
// by issuing an AJAX call to your Teams API
function initializeTeams()
{
    console.log("main.js:::initializeTeams()");

    return new Promise( function(resolve, reject) {
        // request data to REST server with jQuery-ajax
        $.ajax({
            // according to data-query type, request data to REST
            url: urlString + "teams-raw",
            method: "GET",
            contentType: "application/json"
        })
        .done(function(data) {
            // Assign the results to the "employeesModel" variable, 
            // causing it to be populated with all 300 Employees returned from your API
            // console.log("main.js:::initializeTeams():::" + data.length);            
            viewModel.teams = ko.mapping.fromJS(data);
            console.log("main.js:::initializeTeams():::" + viewModel.teams().length);
            resolve();


            // Invoke the "refreshEmployeeRows" function (see below for specification) 
            // with the employeesModel as the parameter
            // refreshEmployeeRows(employeesModel);
        })
        .fail(function(err){
            // If the AJAX call fails, Invoke the "showGenericModal" 
            // function (see below for specification) with "Error" 
            // as the "title" parameter and an appropriate error message
            console.log("error: " + err.statusText);                
            reject("Error loading the team data.");
        });
    });
}

// populate	the	"employeesModel" array,	
// by issuing an AJAX call to your Teams API
function initializeEmployees()
{
    console.log("main.js:::initializeEmployees()");
    return new Promise( function(resolve, reject) {
        // request data to REST server with jQuery-ajax
        $.ajax({
            // according to data-query type, request data to REST
            url: urlString + "employees",
            method: "GET",
            contentType: "application/json"
        })
        .done(function(data) {
            // Assign the results to the "employeesModel" variable, 
            // causing it to be populated with all 300 Employees returned from your API
            viewModel.employees = ko.mapping.fromJS(data);
            console.log("main.js:::initializeTeams():::" + viewModel.employees().length);
            resolve();
        })
        .fail(function(err){
            // If the AJAX call fails, Invoke the "showGenericModal" 
            // function (see below for specification) with "Error" 
            // as the "title" parameter and an appropriate error message
            console.log("error: " + err.statusText);                
            reject("Error loading the team data.");
        });
    });
}

// populate	the	"employeesModel" array,	
// by issuing an AJAX call to your Teams API
function initializeProjects()
{
    console.log("main.js:::initializeProjects()");
    return new Promise( function(resolve, reject) {
        // request data to REST server with jQuery-ajax
        $.ajax({
            // according to data-query type, request data to REST
            url: urlString + "projects",
            method: "GET",
            contentType: "application/json"
        })
        .done(function(data) {
            // Assign the results to the "employeesModel" variable, 
            // causing it to be populated with all 300 Employees returned from your API
            viewModel.projects = ko.mapping.fromJS(data);
            console.log("main.js:::initializeProjects():::" + viewModel.projects().length);
            resolve();
        })
        .fail(function(err){
            // If the AJAX call fails, Invoke the "showGenericModal" 
            // function (see below for specification) with "Error" 
            // as the "title" parameter and an appropriate error message
            console.log("error: " + err.statusText);                
            reject("Error loading the team data.");
        });
    });
}

// send the updated team data to the correct route in the API
function saveTeam(this)
{
    // Set the value of this to a local variable
    let currentTeam = this._id();

    let modifyProjects = _.filter(this.Projects, function() { return this.Projects.TeamName === currentTeam; } );


    $.ajax({
        url: urlString + "team/" + currentTeam,
        type: "PUT",
        data: JSON.stringify(plainEmployee),
        contentType: "application/json"
    })
    .done(function (data) {
        resolve();
    })
    .fail(function (err) {
        employee.isDirty = true; // reinstate the "isDirty" flag, if we couldn't save the employee
        reject("Unable to update Employees");
    });

}

$(document).ready(function(){ // start jQuery

    initializeTeams()
    .then(initializeEmployees)
    .then(initializeProjects)
    .then(function() {
        ko.applyBindings(viewModel);

        $("select.multiple").multipleSelect({ filter: true });
        $("select.single").multipleSelect({ single: true, filter: true });
    })
    .catch(function(err) {
        console.log("error: " + err);
        showGenericModal('Error', err);
    });
});