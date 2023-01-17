import { ApiService } from './services/api.service';
import { DialogComponent } from './dialog/dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Crud';
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'salary' ,'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog : MatDialog ,private api : ApiService){

  }
 ngOnInit(): void {
     this.getAllProducts()
 }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width :'30%'
    }).afterClosed().subscribe(val=>{
      if(val === "save"){
        this.getAllProducts();
      }
    })
  }
  getAllProducts(){
    this.api.getProduct()
    .subscribe({
      next: (res) => {
       console.log(res);        
       this.dataSource = new MatTableDataSource(res.data);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
      },error :(err) =>{
        console.log(err)
      }
    })
  }
    editProduct(row:any){
      this.dialog.open(DialogComponent,{
        width:'30%',
        data :row,
      }).afterClosed().subscribe(val=>{
        if(val === 'update'){
          this.getAllProducts();
        }
      })
    }
    deleteProduct(id:any){
      this.api.deleteProduct(id)
      .subscribe({
        next :(res)=>{
          alert("Product deleted");
          this.getAllProducts()
        },error:()=>{
          alert("error while deleting the record")
        }
      })
    }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}



