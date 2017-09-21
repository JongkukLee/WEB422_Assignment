/********************************************************************************** 
*   WEB422 – Assignment 2 
*   I declare that this assignment is my own work in accordance with Seneca  Academic Policy.   
*   No part of this assignment has been copied manually or electronically from any other source 
*  (including web sites) or distributed to other students. 
*  
*	Name: _Jongkuk Lee_________ Student ID: _127730158____ Date: _2017-09-22_____ 
* 
* 
********************************************************************************/  
const urlString = "https://agile-retreat-67872.herokuapp.com/";

$(document).ready(function(){ // start jQuery

    // view	model"	for	our	current	"Employees"	view
    let employeesModel; 

    // Defines a Lodash template to show data on the screen
    let rowTemplate = _.template(
        '<% _.forEach(employees, function(employee) { %>' +
            '<div class="row body-row" data-id=<%- employee._id %>>' + 
                '<div class="col-xs-4 body-column"><%- employee.FirstName %></div>' + 
                '<div class="col-xs-4 body-column"><%- employee.LastName %></div>' + 
                '<div class="col-xs-4 body-column"><%- employee.Position.PositionName %></div>' + 
            '</div>' +
        '<% }); %>');

    // populate	the	"employeesModel" array,	
    // by issuing an AJAX call to your Teams API
    function initializeEmployeesModel()
    {
        console.log("main.js:::initializeEmployeesModel()");

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
            employeesModel = _.take(data, 300);

            // Invoke the "refreshEmployeeRows" function (see below for specification) 
            // with the employeesModel as the parameter
            refreshEmployeeRows(employeesModel);
        })
        .fail(function(err){
            // If the AJAX call fails, Invoke the "showGenericModal" 
            // function (see below for specification) with "Error" 
            // as the "title" parameter and an appropriate error message
            console.log("error: " + err.statusText);                
            showGenericModal('Error', 'Unable to get Employees');
        });
    }

    // show	generic modal using	id
    function showGenericModal(title, message)
    {
        console.log("main.js:::showGenericModal()");        
        $(".modal-title h4").text(title);
        $(".modal-body p").text(message);        
        $("#genericModal").modal();
    }
    // Defines a Lodash template
    // Invoke the template function
    // Add the results from invoking the template function
    function refreshEmployeeRows(employees)
    {
        console.log("main.js:::refreshEmployeeRows()");         
        let rows = rowTemplate({ 'employees': employees});
        let employeeTable = $("#employees-table");
        employeeTable.empty();
        employeeTable.append(rows);
    }

    // Returns a filtered version of the "employeesModel" array
    function getFilteredEmployeesModel(filterString)
    {
        console.log("main.js:::getFilteredEmployeesModel()");              
        let filterData = _.filter(employeesModel, function(employee) {
            if(employee.FirstName.indexOf(filterString) != -1 || 
                employee.LastName.indexOf(filterString) != -1 || 
                employee.Position.PositionName.indexOf(filterString) != -1)
            {
                return true;
            }
            else
            {
                return false;
            }
        });
        return filterData;
    }

    // search the global "employeesModel"	
    // array for an Employee whose _id matches the local "id"
    function getEmployeeModelById(id)
    {
        console.log("main.js:::getEmployeeModelById()");            
        let findIdx = _.findIndex(employeesModel, function(employee) { 
            return employee._id === id; 
        });

        // If the employee is found, a deep copy of the employee object is returned
        // otherwise, null
        if (findIdx != -1) return _.cloneDeep(employeesModel[findIdx]);
        else null;
    }

    // to fetch the data and populate our employees table
    initializeEmployeesModel();
    
    // wiring up the "keyup" event for the Search Field ("employee-search") that performs
    $("#employee-search").on("keyup", function() {

        console.log("main.js:::$(#employee-search).on(keyup, function() {");
        let searchText = $("#employee-search").val(); // using jQuery utility
        // return a filtered array, and invokes the refreshEmployeeRows()
        // show only "filtered" rows to the user
        refreshEmployeeRows(getFilteredEmployeesModel(searchText));
    });

    // wiring up the "click" event for every single (current and future) 
    // element with the class "bodyrow"
    $(".bootstrap-header-table").on("click", ".body-row", function() {

        console.log("main.js:::$(.bootstrap-header-table).on(click, .body-row, function() {");
        let $empId = $(this).attr("data-id");
        let clickedEmpoyee = getEmployeeModelById($empId);

        let hireDateStr = moment(clickedEmpoyee.hireDate).format("LL");            
        clickedEmpoyee.HireDate = hireDateStr;

        let modalTemplate = _.template(
            '<strong>Address:</strong> <%- employee.AddressStreet %> <%- employee.AddressCity %> <%- employee.AddressState %> <%- employee.AddressZip %><br>' +
            '<strong>Phone Number:</strong> <%-employee.PhoneNum %><br>' + 
            '<strong>Hire Date:</strong> <%- employee.HireDate %>');

        $("#genericModal").modal ({
            backdrop: 'static', // disable clicking on the backdrop to close
            keyboard: false, // disable using the keyboard to close
        });
        $("#myModalTitle").empty();
        $("#myModalMessage").empty();
        $("#myModalTitle").text(
            clickedEmpoyee.FirstName + " " + clickedEmpoyee.LastName);

        console.log(modalTemplate({ 'employee':clickedEmpoyee }));
        $("#myModalMessage").html(modalTemplate({ 'employee':clickedEmpoyee }));
    });
});