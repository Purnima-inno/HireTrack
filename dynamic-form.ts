// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-dynamic-form',
//   imports: [],
//   templateUrl: './dynamic-form.html',
//   styleUrl: './dynamic-form.scss'
// })
// export class DynamicForm {

// }

// import { Component, Inject, OnInit } from '@angular/core';
// import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
// import { ApiService, JobApplication } from '../../services/api.service';
// import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
// import { HttpClient } from '@angular/common/http';
// import { CommonModule } from '@angular/common';
// import { MatError, MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatSelectModule } from '@angular/material/select';
// import { MatSliderModule } from '@angular/material/slider';
// import { MatIconModule } from '@angular/material/icon';
// import { MatButtonModule } from '@angular/material/button';

// interface FormField {
//   label: string;
//   name: string;
//   type: string;
//   required?: boolean;
//   options?: string[];
//   min?: number;
//   max?: number;
//   validation?: any;
//   maxLength?: number;
//   minLength?: number;
// }

// @Component({
//   selector: 'app-dynamic-form',
//   standalone: true,
//   templateUrl: './dynamic-form.html',
//   styleUrls: ['./dynamic-form.scss'],
//   imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule,
//     MatInputModule,
//     MatError,
//     MatSelectModule,
//     MatSliderModule,
//     MatIconModule,MatButtonModule]
// })
// export class DynamicForm implements OnInit {
//   form: FormGroup = new FormGroup({});
//   schema: { fields: FormField[] } = { fields: [] };
//   isEditMode: boolean = false;
//   loading = false;
//   errorMessage = '';

//   constructor(
//     // private fb: FormBuilder,
//     private apiService: ApiService,
//     private http: HttpClient,
//     private dialogRef: MatDialogRef<DynamicForm>,
//     @Inject(MAT_DIALOG_DATA) public data: JobApplication | null
//   ) { }

//   ngOnInit() {
//     this.http.get<{ fields: FormField[] }>('/assets/form-schema.json').subscribe({
//       next: (schema) => {
//         this.schema = schema;
//         this.buildForm();
//       },
//       error: (_) => {
//         this.errorMessage = 'Could not load form schema.';
//       }
//     });
//   }

//   buildForm() {
//     const group: any = {};
//     this.schema.fields.forEach(field => {
//       const validators = [];
//       if (field.required) {
//         validators.push(Validators.required);
//       }
//       if (field.validation) {
//         if (field.validation.minLength) {
//           validators.push(Validators.minLength(field.validation.minLength));
//         }
//         if (field.validation.maxLength) {
//           validators.push(Validators.maxLength(field.validation.maxLength));
//         }
//       }
//       group[field.name] = new FormControl(this.data ? (this.data as any)[field.name] ?? '' : '', validators);
//     });
//     this.form = new FormGroup(group);
//     if (this.data && this.data.applicationId) this.isEditMode = true;
//   }

//   submit() {
//     if (this.form.invalid) {
//       return;
//     }

//     const formValue = this.form.value;

//     this.loading = true;
//     if (this.isEditMode && this.data?.applicationId) {
//       this.apiService.updateApplication(this.data.applicationId, formValue).subscribe({
//         next: () => {
//           this.loading = false;
//           this.dialogRef.close(true);
//         },
//         error: () => {
//           this.loading = false;
//           this.errorMessage = 'Failed to update the application.';
//         }
//       });
//     } else {
//       this.apiService.addApplication(formValue).subscribe({
//         next: () => {
//           this.loading = false;
//           this.dialogRef.close(true);
//         },
//         error: () => {
//           this.loading = false;
//           this.errorMessage = 'Failed to add the application.';
//         }
//       });
//     }
//   }

//   cancel() {
//     this.dialogRef.close(false);
//   }

//   // Helper for rating stars generation (optional, in template)
//   trackByIndex(index: number): number {
//     return index;
//   }
// }
import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService, JobApplication } from '../../services/api.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

interface FormField {
  label: string;
  name: string;
  type: string;
  required?: boolean;
  options?: string[];
  min?: number;
  max?: number;
  validation?: any;
}

interface DialogData {
  schema: { fields: FormField[] };
  application?: JobApplication;
}

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  templateUrl: './dynamic-form.html',
  styleUrls: ['./dynamic-form.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class DynamicForm implements OnInit {
  form: FormGroup = new FormGroup({});
  schema!: { fields: FormField[] };
  isEditMode = false;
  loading = false;
  errorMessage = '';

  // Picker map for date fields
  pickerMap: Record<string, any> = {};

  constructor(
    private apiService: ApiService,
    private dialogRef: MatDialogRef<DynamicForm>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    if (!this.data?.schema?.fields) {
      this.errorMessage = 'Invalid schema provided.';
      return;
    }

    this.schema = this.data.schema;
    this.isEditMode = !!this.data.application;

    // Setup picker map
    this.schema.fields.forEach((field) => {
      if (field.type === 'date') {
        this.pickerMap[field.name] = field.name;
      }
    });

    this.buildForm();
  }

  buildForm() {
    const group: any = {};
    const existing = this.data.application || {};

    this.schema.fields.forEach((field) => {
      const validators = [];
      if (field.required) validators.push(Validators.required);
      if (field.validation?.minLength) validators.push(Validators.minLength(field.validation.minLength));
      if (field.validation?.maxLength) validators.push(Validators.maxLength(field.validation.maxLength));

      group[field.name] = new FormControl(
        (existing as any)[field.name] ?? '',
        validators
      );
    });

    this.form = new FormGroup(group);
  }

  submit() {
    if (this.form.invalid) return;

    const formData = { ...this.form.value };

    // Normalize data
    for (const key in formData) {
      const value = formData[key];

      if (value === '' || value === undefined) {
        formData[key] = null;
      } else if (value instanceof Date) {
        formData[key] = value.toISOString().split('T')[0];
      } else if (['feedbackScore', 'candidateRating', 'salaryExpectation'].includes(key)) {
        formData[key] = parseFloat(value);
        if (isNaN(formData[key])) {
          formData[key] = null;
        }
      }
    }

    this.loading = true;

    const request$ = this.isEditMode && this.data.application?.applicationId
      ? this.apiService.updateApplication(this.data.application.applicationId, formData)
      : this.apiService.addApplication(formData);

    request$.subscribe({
      next: (saved) => {
        this.loading = false;
        this.dialogRef.close(saved);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err?.error?.message || 'Failed to save.';
        this.cdr.detectChanges();
      }
    });

    console.log('Submitting formData:', formData);
  }

  cancel() {
    this.dialogRef.close(false);
  }

  trackByName(index: number, field: FormField) {
    return field.name;
  }

  // ✅ Type-safe accessor for template
  getFormControl(name: string): FormControl {
  const control = this.form.get(name);
  if (!control) {
    throw new Error(`Form control with name "${name}" not found`);
  }
  return control as FormControl;
}

}
