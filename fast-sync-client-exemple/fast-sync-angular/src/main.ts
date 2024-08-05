import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then((val) => {
    console.log('fast sync configuration');
  })
  .catch((err) => console.error(err));
