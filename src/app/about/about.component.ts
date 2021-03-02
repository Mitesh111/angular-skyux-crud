import { Component } from "@angular/core";
import { EmployeeService } from "../employee-service";
import { GridApi, GridOptions, GridReadyEvent } from "ag-grid-community";
import { SkyAgGridService, SkyCellType } from "@skyux/ag-grid";

@Component({
  selector: "my-about",
  templateUrl: "./about.component.html",
})
export class AboutComponent {
  public gridData: Object;
  public columnDefs = [
    {
      field: "id",
      headerName: "Id",
      hide: true,
    },
    {
      field: "selected",
      type: SkyCellType.RowSelector,
    },
    {
      field: "firstName",
      headerName: "First Name",
      type: SkyCellType.Text,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      type: SkyCellType.Text,
      editable: true,
    },
    {
      field: "contactNumber",
      headerName: "Contact Number",
      type: SkyCellType.Number,
      filter: true,
    },
    {
      field: "emailAddress",
      headerName: "Email",
      type: SkyCellType.Text,
      filter: true,
    },
    {
      field: "dateOfBirth",
      headerName: "Birthday",
      type: SkyCellType.Date,
      filter: true,
    },
  ];
  public gridApi: GridApi;
  public gridOptions: GridOptions;

  constructor(
    private empService: EmployeeService,
    private agGridService: SkyAgGridService
  ) {}
  ngOnInit() {
    this.empService.getAllEmployee().subscribe((resp) => {
      console.log(resp);
      this.gridData = resp;
    });
    this.gridOptions = {
      columnDefs: this.columnDefs,
      onGridReady: (gridReadyEvent) => this.onGridReady(gridReadyEvent),
    };
    this.gridOptions = this.agGridService.getGridOptions({
      gridOptions: this.gridOptions,
    });
    console.log(this.gridOptions);
  }
  public onGridReady(gridReadyEvent: GridReadyEvent): void {
    this.gridApi = gridReadyEvent.api;
    this.gridApi.sizeColumnsToFit();
  }
}
