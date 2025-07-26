// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-application-list',
//   imports: [],
//   templateUrl: './application-list.html',
//   styleUrl: './application-list.scss'
// })
// export class ApplicationList {

// }
// File: src/app/components/application-list/application-list.component.ts

// import { Component, OnInit, ViewChild } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { MatTableDataSource, MatTableModule } from '@angular/material/table';
// import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
// import { MatSort, MatSortModule } from '@angular/material/sort';
// import { MatDialog, MatDialogModule } from '@angular/material/dialog';
// import { MatIconModule } from '@angular/material/icon';
// import { MatButtonModule } from '@angular/material/button';

// import { ApiService, JobApplication } from '../../services/api.service';
// import { DynamicForm } from '../dynamic-form/dynamic-form';
// import { ConfirmationPopup } from '../confirmation-popup/confirmation-popup';
// import { provideHttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-application-list',
//   standalone: true,
//    providers: [
//     provideHttpClient(), // add here if this component injects ApiService that requires HttpClient
//   ],
//   templateUrl: './application-list.html',
//   styleUrls: ['./application-list.scss'],
//   imports: [
//     CommonModule,
//     MatTableModule,
//     MatPaginatorModule,
//     MatSortModule,
//     MatDialogModule,
//     MatIconModule,
//     MatButtonModule,
//     // DynamicForm,
//     // ConfirmationPopup,
//   ]
// })
// export class ApplicationList implements OnInit {
//   displayedColumns: string[] = [
//     'name', 'jobTitle', 'status', 'appliedDate', 'interviewDate', 'feedbackScore',
//     'interviewFeedback', 'salaryExpectation', 'applicantSource', 'candidateRating', 'actions'
//   ];
//   dataSource = new MatTableDataSource<JobApplication>();

//   @ViewChild(MatPaginator) paginator!: MatPaginator;
//   @ViewChild(MatSort) sort!: MatSort;

//   constructor(private apiService: ApiService, private dialog: MatDialog) { }

//   ngOnInit(): void {
//     this.loadApplications();

//     this.apiService.refreshNeeded$.subscribe(() => {
//       this.loadApplications();
//     });
//   }

//   loadApplications(): void {
//     this.apiService.getApplications().subscribe(applications => {
//       this.dataSource.data = applications;
//       this.dataSource.paginator = this.paginator;
//       this.dataSource.sort = this.sort;
//     });
//   }

//   openAddDialog(): void {
//     const dialogRef = this.dialog.open(DynamicForm, {
//       width: '600px',
//       data: null
//     });

//     dialogRef.afterClosed().subscribe(() => {
//       // Refresh handled by service
//     });
//   }

//   openEditDialog(application: JobApplication): void {
//     const dialogRef = this.dialog.open(DynamicForm, {
//       width: '600px',
//       data: application
//     });

//     dialogRef.afterClosed().subscribe(() => {
//       // Refresh handled by service
//     });
//   }

//   openDeleteDialog(application: JobApplication): void {
//     const dialogRef = this.dialog.open(ConfirmationPopup, {
//       width: '350px',
//       data: { name: application.name }
//     });

//     dialogRef.afterClosed().subscribe(confirmed => {
//       if (confirmed) {
//         this.apiService.deleteApplication(application.applicationId!).subscribe(() => {
//           // Refresh handled by service
//         });
//       }
//     });
//   }

//   getStatusBadgeColor(status: string): string {
//     return status.toLowerCase() === 'interviewed' ? 'green' : 'blue';
//   }
// }


// import { Component, OnInit, ViewChild } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { MatTableDataSource, MatTableModule } from '@angular/material/table';
// import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
// import { MatSort, MatSortModule } from '@angular/material/sort';
// import { MatDialog, MatDialogModule } from '@angular/material/dialog';
// import { MatIconModule } from '@angular/material/icon';
// import { MatButtonModule } from '@angular/material/button';

// import { ApiService, JobApplication } from '../../services/api.service';
// import { DynamicForm } from '../dynamic-form/dynamic-form';
// import { ConfirmationPopup } from '../confirmation-popup/confirmation-popup';

// @Component({
//   selector: 'app-application-list',
//   standalone: true,

//   templateUrl: './application-list.html',
//   styleUrls: ['./application-list.scss'],
//   imports: [
//     CommonModule,
//     MatTableModule,
//     MatPaginatorModule,
//     MatSortModule,
//     MatDialogModule,
//     MatIconModule,
//     MatButtonModule,
//     // DynamicForm,
//     // ConfirmationPopup,
//   ]
// })
// export class ApplicationList implements OnInit {
//   displayedColumns: string[] = [
//     'name', 'jobTitle', 'status', 'appliedDate', 'interviewDate', 'feedbackScore',
//     'interviewFeedback', 'salaryExpectation', 'applicantSource', 'candidateRating', 'actions'
//   ];
//   dataSource = new MatTableDataSource<JobApplication>();

//   @ViewChild(MatPaginator) paginator!: MatPaginator;
//   @ViewChild(MatSort) sort!: MatSort;

//   constructor(private apiService: ApiService, private dialog: MatDialog) { }

//   ngOnInit(): void {
//     this.loadApplications();

//     this.apiService.refreshNeeded$.subscribe(() => {
//       this.loadApplications();
//     });
//   }

//   loadApplications(): void {
//     this.apiService.getApplications().subscribe(applications => {
//       this.dataSource.data = applications;
//       this.dataSource.paginator = this.paginator;
//       this.dataSource.sort = this.sort;
//     });
//   }

//   openAddDialog(): void {
//     const dialogRef = this.dialog.open(DynamicForm, {
//       width: '500px',
//       data: null
//     });

//     dialogRef.afterClosed().subscribe((formValue: any) => {
//       if (formValue) {
//         this.apiService.addApplication(formValue).subscribe({
//           next: (savedApp) => {
//             // Add saved item to table immediately
//             this.dataSource.data = [...this.dataSource.data, savedApp];
//             this.applyFilter();
//           },
//           error: () => {
//             console.error('Failed saving');
//           }
//         });
//       }
//     });
//   }


//   openEditDialog(application: JobApplication): void {
//     const dialogRef = this.dialog.open(DynamicForm, {
//       width: '600px',
//       data: application
//     });

//     dialogRef.afterClosed().subscribe(() => {
//       // Refresh handled by service
//     });
//   }

//   openDeleteDialog(application: JobApplication): void {
//     const dialogRef = this.dialog.open(ConfirmationPopup, {
//       width: '350px',
//       data: { name: application.name }
//     });

//     dialogRef.afterClosed().subscribe(confirmed => {
//       if (confirmed) {
//         this.apiService.deleteApplication(application.applicationId!).subscribe(() => {
//           // Refresh handled by service
//         });
//       }
//     });
//   }


//   getStatusBadgeColor(status: string): string {
//     return status.toLowerCase() === 'interviewed' ? 'green' : 'blue';
//   }
// }

import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { ApiService, JobApplication } from '../../services/api.service';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { ConfirmationPopup } from '../confirmation-popup/confirmation-popup';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClient } from '@angular/common/http';
import { EditApplication } from '../edit-application/edit-application';
// Define FormField type if not imported from elsewhere
export interface FormField {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  options?: string[];
}

@Component({
  selector: 'app-application-list',
  standalone: true,
  templateUrl: './application-list.html',
  styleUrls: ['./application-list.scss'],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ]
})
export class ApplicationList implements OnInit {
  displayedColumns: string[] = [
    'name', 'jobTitle', 'status', 'appliedDate', 'interviewDate', 'feedbackScore',
    'interviewFeedback', 'salaryExpectation', 'applicantSource', 'candidateRating', 'actions'
  ];
  dataSource = new MatTableDataSource<JobApplication>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private apiService: ApiService, private dialog: MatDialog, private http: HttpClient) { }

  ngOnInit(): void {
    this.loadApplications();

    // Refresh table when new data is added/deleted
    this.apiService.refreshNeeded$.subscribe(() => {
      this.loadApplications();
    });
  }

  loadApplications(): void {
    this.apiService.getApplications().subscribe(applications => {
      this.dataSource.data = applications;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      // Optional: Set default filtering logic
      this.dataSource.filterPredicate = (data: JobApplication, filter: string) => {
        const str = JSON.stringify(data).toLowerCase();
        return str.includes(filter);
      };
    });
  }

  // openAddDialog(): void {
  //   // Preload schema
  //   this.http.get<{ fields: FormField[] }>('/assets/form-schema.json').subscribe(schema => {
  //     this.dialog.open(DynamicForm, {
  //       width: '600px',
  //       data: { schema, application: null }
  //     })
  //       .afterClosed()
  //       .subscribe(result => {
  //         if (result === true) {
  //           this.loadApplications();
  //         }
  //       });
  //   });
  // }
  openAddDialog(): void {
  this.http.get<{ fields: FormField[] }>('/assets/form-schema.json').subscribe({
    next: schema => {
      this.dialog.open(DynamicForm, {
        width: '600px',
        data: { schema }
      });
    },
    error: () => {
      console.error('Failed to load schema');
    }
  });
}



 openEditDialog(application: JobApplication): void {
  this.dialog.open(EditApplication, {
    width: '600px',
    data: application
  });
}

  openDeleteDialog(application: JobApplication): void {
    const dialogRef = this.dialog.open(ConfirmationPopup, {
      width: '350px',
      data: { name: application.name }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.apiService.deleteApplication(application.applicationId!).subscribe(() => {
          // Refresh is handled via service trigger
        });
      }
    });
  }

  // This method is called by search input (in HTML)
  applyFilter(filterValue: string = ''): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getStatusBadgeColor(status: string): string {
    return status.toLowerCase() === 'interviewed' ? 'green' : 'blue';
  }
}

