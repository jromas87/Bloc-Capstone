$(function() {

    var Job = kendo.data.Model.define({
        id: "id"
    })

    var crudServiceBaseUrl = "/psr",
            dataSource = new kendo.data.DataSource({
                transport: {
                    read:  {
                        url: crudServiceBaseUrl,
                        dataType: "json"
                    },
                    update: {
                        url: function(job) {
                            return crudServiceBaseUrl + "/" + job.id;
                        },
                        dataType: "json",
                        contentType: "application/json",
                        type: "PUT"
                    },
                    destroy: {
                        url: function(job) {
                            return crudServiceBaseUrl + "/" + job.id
                        },
                        dataType: "json",
                        type: "DELETE"
                    },
                    create: {
                        url: crudServiceBaseUrl,
                        dataType: "json",
                        contentType: "application/json",
                        type: "POST"
                    },
                    parameterMap: function(job, type) {
                        if (type === "create" || type === "update") {
                            return JSON.stringify({ job: job });
                        }
                    }
                },
                pageSize: 10,
                schema: {
                           model: {
                             id: "id",
                             fields: {
                                id: { editable: false },
                                //name: { type: "string" },
                                number: { editable: false },
                                precon_number: { editable: false },
                                sqft: { type: "number" },
                                state: { defaultValue: { id: 1, name: "Michigan"} },
                                sachse_group: { defaultValue: { id: 1, name: "Commercial"} },
                                project_type: { defaultValue: { id: 1, name: "Retail"} },
                                contract_type: { defaultValue: { id: 1, name: "Cost Plus" } },
                                project_phase: { defaultValue: { id: 1, name: "01. Sales"} }
                                
                             }
                           }
                       }
            });

    $("#grid").kendoGrid({
        dataSource: dataSource,
        columnMenu: true,
        filterable: true,
        sortable: true,
        resizable: true,
        navigatable: true,
        toolbar: ["create", "save", "cancel"],

        pageable: {
            refresh: true,
            pageSizes: true,
            buttonCount: 5
        },
        columns: 
                [
                {
                    field: "project_phase",
                    title: "Project Phase",
                    editor: projPhaseDropDownEditor,
                    template: "#=project_phase.name#",
                    width: 150
                },
                {
                    field: "precon_number",
                    title: "Precon #",
                    width: 110
                }, 
                {
                    field: "number",
                    title: "Job #",
                    width: 100
                }, 
                {
                    field: "name",
                    title: "Project Name",
                    editor: jobNameAutoFill,
                    width: 300
                },
                {
                    field: "building",
                    title: "Proj Bldg/Location",
                    editor: buildingNameAutoFill,
                    width: 250
                },
                {
                    field: "sachse_group",
                    title: "Sachse Group",
                    editor: sachseGroupDropDownEditor,
                    template: "#=sachse_group.name#",
                    width: 250
                },
                {
                    field: "address",
                    title: "Address",
                    width: 200
                },
                {
                    field: "city",
                    title: "City",
                    width: 150
                },
                {   field: "state", 
                    title: "State", 
                    width: 160, 
                    editor: stateDropDownEditor, 
                    template: "#=state.name#" 
                },
                {   field: "sqft", 
                    title: "Sq. Ft.", 
                    width: 160
                },
                {   field: "project_type", 
                    title: "Project Type", 
                    width: 160, 
                    editor: projTypeDropDownEditor, 
                    template: "#=project_type.name#" 
                },
                {   field: "contract_type", 
                    title: "Contract Type", 
                    width: 160, 
                    editor: contractTypeDropDownEditor, 
                    template: "#=contract_type.name#" 
                },
                {
                    field: "start_date",
                    title: "Start Date",
                    editor: datePickerEditor,
                    width: 150
                },
                {
                    field: "turnover_date",
                    title: "Turnover Date",
                    editor: datePickerEditor,
                    width: 150
                },
                {   command: "destroy", 
                    title: "&nbsp;", 
                    width: 120 }
                ],
        editable: true
    });
});

