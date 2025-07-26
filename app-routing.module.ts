// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { LandingPage } from './components/landing-page/landing-page';
// import { ApplicationList } from './components/application-list/application-list';

// const routes: Routes = [
//   { path: '', component: LandingPage},
//   { path: 'applications', component: ApplicationList },
//   { path: '**', redirectTo: '' }
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule {}
// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';

// const routes: Routes = [
//   {
//     path: '',
//     loadComponent: () => import('./components/landing-page/landing-page').then(m => m.LandingPage)
//   },
//   {
//     path: './applications',
//     loadComponent: () => import('./components/application-list/application-list').then(m => m.ApplicationList)
//   },
  
//   {
//     path: '**',
//     redirectTo: ''
//   }
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule {}
// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';

// import { LandingPage } from './components/landing-page/landing-page';
// import { ApplicationList } from './components/application-list/application-list';

// const routes: Routes = [
//   { path: '', component: LandingPage },
//   { path: 'applications', component: ApplicationList },
//   { path: '**', redirectTo: '' }
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/landing-page/landing-page').then(m => m.LandingPage),
  },
  {
    path: 'applications',
    loadComponent: () =>
      import('./components/application-list/application-list').then(m => m.ApplicationList),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
