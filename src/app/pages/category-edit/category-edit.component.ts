import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ICategory } from 'src/app/interfaces/Category';
import { CategoryService } from 'src/app/services/category.service';
import { Router } from '@angular/router';
import { UploadService } from 'src/app/services/upload.service';
@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent {
  category!: ICategory;
  categoryForm = this.formBuilder.group({
    img: [''],
    name: ['', [Validators.required, Validators.minLength(4)]]
  })
  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private router: ActivatedRoute,
    private uploadService: UploadService,
    private router2: Router
  ) {
    this.router.paramMap.subscribe((params => {
      const id = (params.get('id'));  //
      if (id) {
        this.categoryService.getCategory(id!).subscribe((data: any) => {
          console.log(data);
          if (data) {
            this.categoryForm.patchValue({
              name: data.name,
              img: data.img
            })
          }
        })
      }
    }))

  }
  HandleGetfile(file: any) {
    const fileArr = file.target.files[0];

    this.uploadService.uploadFile(fileArr).subscribe(data => {
      if (data && data.url) {
        this.categoryForm.patchValue({
          img: data.url
        })
      }
    })
  }
  onHandleSubmit() {
    this.router.paramMap.subscribe((params) => {
      const id = (params.get('id'))
      if (id) {
        const category: ICategory = {
          _id: id,
          name: this.categoryForm.value.name || "",
          img: this.categoryForm.value.img || "",
        }
        this.categoryService.updateCategory(category).subscribe((category) => {
          console.log('category', category);
          this.router2.navigate(['/admin/category']);
        })
      }
    })
  }
}
