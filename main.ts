// import 'zone.js'; 
// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { AppComponent } from './app/app.component';

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));
// import 'zone.js'; 
// import { bootstrapApplication } from '@angular/platform-browser';
// import { importProvidersFrom } from '@angular/core';
// import { HttpClientModule } from '@angular/common/http';

// import { AppComponent } from './app/app.component';
// import { appConfig } from './app/app.config';

// bootstrapApplication(AppComponent, {
//   ...appConfig, // Spread your existing config here
//   providers: [
//     ...(appConfig.providers || []),  // Include existing providers from appConfig
//     importProvidersFrom(HttpClientModule), // Add HttpClientModule here
//   ],
// }).catch((err) => console.error(err));


import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { MatNativeDateModule } from '@angular/material/core'; // ✅ Needed for DateAdapter

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    importProvidersFrom(
      HttpClientModule,
      MatNativeDateModule // ✅ This provides DateAdapter globally
    ),
  ],
}).catch((err) => console.error(err));



// import { bootstrapApplication } from '@angular/platform-browser';
// import { importProvidersFrom } from '@angular/core';
// import { HttpClientModule } from '@angular/common/http';

// import { AppComponent } from './app/app.component';

// bootstrapApplication(AppComponent, {
//   providers: [
//     importProvidersFrom(HttpClientModule),
//   ]
// }).catch(err => console.error(err));
