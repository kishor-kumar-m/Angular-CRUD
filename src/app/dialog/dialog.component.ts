import { ApiService } from './../services/api.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  productForm!: FormGroup;
  actionButton : string = "save"

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef: MatDialogRef<DialogComponent>

  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      salary: ['', Validators.required],
    });
    if(this.editData){
      this.actionButton = "Update"
      this.productForm.controls['first_name'].setValue(this.editData.first_name)
      this.productForm.controls['last_name'].setValue(this.editData.last_name)
      this.productForm.controls['email'].setValue(this.editData.email)
      this.productForm.controls['salary'].setValue(this.editData.salary)

    }
  }

  addProduct() {
    if(!this.editData){
      if (this.productForm.valid) {
        this.api.postProduct(this.productForm.value).subscribe({
          next: (res) => {
            this.productForm.reset();
            this.dialogRef.close();
          },
          error: (err) => {
            alert(err);
            console.log(err);
          },
        });
      }
    }else{
      this.updateProduct()
    }
  }
  updateProduct(){
    this.api.putProduct(this.productForm.value,this.editData._id)
    .subscribe({
      next :(res) =>{
        this.productForm.reset()
        this.dialogRef.close('update')
      },
      error :() =>{
        alert("Error while updating")
      }
    })
  }
}
