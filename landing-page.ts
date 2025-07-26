// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-landing-page',
//   imports: [],
//   templateUrl: './landing-page.html',
//   styleUrl: './landing-page.scss'
// })
// export class LandingPage {

// }
// import { Component } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-landing-page',
//   // imports: [],
//   templateUrl: './landing-page.html',
//   styleUrls: ['./landing-page.scss'],
  
// })
// export class LandingPage {
//   constructor(private router: Router) {}

//   goToApplications() {
//     this.router.navigate(['/applications']);
//   }
// }


// import { Component } from '@angular/core';
// import { RouterModule } from '@angular/router';

// @Component({
//   selector: 'app-landing-page',
//   standalone: true,
//   templateUrl: './landing-page.html',
//   styleUrls: ['./landing-page.scss'],
//   imports: [RouterModule]
// })
// export class LandingPage {}

import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterModule, MatButtonModule,CommonModule],
  templateUrl: './landing-page.html',
  styleUrls: ['./landing-page.scss'],  // remove if you don't have styles
})
export class LandingPage {
  features = ['Simple Management', 'Easy Organization', 'Quick Access'];
  constructor(private router: Router) {}

  goToApplications(): void {
    console.log('Navigation triggered');
    this.router.navigate(['/applications']);
  }
}
