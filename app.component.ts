// import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';

// @Component({
//   selector: 'app-root',
//   imports: [RouterOutlet],
//   templateUrl: './app.html',
//   styleUrl: './app.scss'
// })
// export class App {
//   protected readonly title = signal('frontend');
// }

// import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';

// @Component({
//   selector: 'app-root',
//   // standalone: true,                    // Mark this as a standalone component
//   imports: [RouterOutlet],             // Import RouterOutlet standalone component
//   templateUrl: './app.component.html', // Make sure this file exists in `src/app/`
//   styleUrls: ['./app.component.scss']  // Make sure this file exists
// })
// export class AppComponent {
//   protected readonly title = signal('frontend');
// }
// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';

// // Add any Angular Material or other modules your root component uses
// // For example:
// // import { MatToolbarModule } from '@angular/material/toolbar';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss'],
//   imports: [
//     CommonModule,
//     RouterModule,
//     // MatToolbarModule,  // add your used modules here
//   ]
// })
// export class AppComponent {
//   // Your component logic here (if any)
// }
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Angular Material modules you use in the root or its children
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ApplicationList } from './components/application-list/application-list';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    // ApplicationList
    // Add other Angular Material modules used by your app here
  ]
})
export class AppComponent {
  // Your component logic here (if any)
    title = 'My App';
}
