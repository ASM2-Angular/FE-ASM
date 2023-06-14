import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ICategory } from 'src/app/interfaces/Category';
import { CategoryService } from 'src/app/services/category.service';
import { Router } from '@angular/router';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent {
  categoryForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    img: [''],
  })
  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private uploadService: UploadService,
  ) { }
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
    const category: ICategory = {
      name: this.categoryForm.value.name || '',
      img: this.categoryForm.value.img || '',
    }
    this.categoryService.addCategory(category).subscribe(data => {
      console.log('category', category);
      this.router.navigate(['/admin/category']);

    }

    )
  }
}
