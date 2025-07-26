// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-edit-application',
//   imports: [],
//   templateUrl: './edit-application.html',
//   styleUrl: './edit-application.scss'
// })
// export class EditApplication {

// }
// import { Component, Inject, OnInit } from '@angular/core';
// import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
// import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
// import { ApiService, JobApplication } from '../../services/api.service';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import { CommonModule } from '@angular/common';
// import { MatSelectModule } from '@angular/material/select';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatNativeDateModule } from '@angular/material/core';
// import { MatIconModule } from '@angular/material/icon';
// import { FormControl } from '@angular/forms';

// @Component({
//   selector: 'app-edit-application',
//   templateUrl: './edit-application.html',
//   standalone: true,
//   styleUrls: ['./edit-application.scss'],
//   imports: [CommonModule,
//     ReactiveFormsModule,
//     MatDialogModule,        // ✅ Needed for <mat-dialog-content>, <mat-dialog-actions>
//     MatFormFieldModule,
//     MatInputModule,
//     MatButtonModule,
//     MatSelectModule,        // if using <mat-select>
//     MatDatepickerModule,    // if using <mat-datepicker>
//     MatNativeDateModule,    // needed with datepicker
//     MatIconModule
//     // Add Angular Material & Reactive Form imports here
//   ]
// })
// export class EditApplication implements OnInit {
//   form!: FormGroup;
//   loading = false;
//   errorMessage = '';

//   constructor(
//     private fb: FormBuilder,
//     private apiService: ApiService,
//     private dialogRef: MatDialogRef<EditApplication>,
//     @Inject(MAT_DIALOG_DATA) public data: JobApplication
//   ) { }

//   ngOnInit(): void {
//     this.form = this.fb.group({
//       name: [this.data.name, Validators.required],
//       jobTitle: [this.data.jobTitle, Validators.required],
//       status: [this.data.status],
//       appliedDate: [this.data.appliedDate],
//       interviewDate: [this.data.interviewDate],
//       feedbackScore: [this.data.feedbackScore],
//       interviewFeedback: [this.data.interviewFeedback],
//       salaryExpectation: [this.data.salaryExpectation],
//       applicantSource: [this.data.applicantSource],
//       candidateRating: [this.data.candidateRating]
//     });
//     if (this.data?.applicationId) {
//       this.form.patchValue(this.data);
//     }

//   }


//   submit() {
//     if (this.form.invalid) return;

//     this.loading = true;
//     this.apiService.updateApplication(this.data.applicationId!, this.form.value).subscribe({
//       next: (result) => {
//         this.dialogRef.close(result); // Close dialog and notify parent
//       },
//       error: (err) => {
//         this.errorMessage = 'Update failed';
//         this.loading = false;
//       }
//     });
//   }

//   cancel() {
//     this.dialogRef.close(false);
//   }

//   getFormControl(name: string): FormControl {
//     const control = this.form.get(name);
//     if (!control) {
//       throw new Error(`Form control with name "${name}" not found`);
//     }
//     return control as FormControl;
//   }

// }
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ApiService, JobApplication } from '../../services/api.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-application',
  templateUrl: './edit-application.html',
  standalone: true,
  styleUrls: ['./edit-application.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule
  ]
})
export class EditApplication implements OnInit {
  form!: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private dialogRef: MatDialogRef<EditApplication>,
    @Inject(MAT_DIALOG_DATA) public data: JobApplication
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.data.name, Validators.required],
      jobTitle: [this.data.jobTitle, Validators.required],
      status: [this.data.status],
      appliedDate: [this.data.appliedDate],
      interviewDate: [this.data.interviewDate],
      feedbackScore: [this.data.feedbackScore],
      interviewFeedback: [this.data.interviewFeedback],
      salaryExpectation: [this.data.salaryExpectation],
      applicantSource: [this.data.applicantSource],
      candidateRating: [this.data.candidateRating]
    });

    // No need to patch form again with this.data if it's already used above
  }

  submit() {
    if (this.form.invalid) return;

    this.loading = true;

    // Make sure you're not sending applicationId back to the server if it's not expected
    const payload = { ...this.form.value };

    this.apiService.updateApplication(this.data.applicationId!, payload).subscribe({
      next: (result) => {
        this.dialogRef.close(result);
      },
      error: (err) => {
        setTimeout(() => {
          this.errorMessage = 'Update failed';
        });
        this.loading = false;
      }
    });
  }

  cancel() {
    this.dialogRef.close(false);
  }

  getFormControl(name: string): FormControl {
    const control = this.form.get(name);
    if (!control) {
      throw new Error(`Form control with name "${name}" not found`);
    }
    return control as FormControl;
  }
}
