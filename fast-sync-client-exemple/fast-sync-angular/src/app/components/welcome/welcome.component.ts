import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'fast-sync-client';
import { configureClientFastSync } from 'src/app/fast-sync-configuration/fast_sync_configuration';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {
  synZone: string | null = null;
  constructor(private router: Router) {}

  onSubmit() {
    if (!isNullOrUndefined(this.synZone)) {
      configureClientFastSync(this.synZone!);
      this.router.navigate([`/sync/${this.synZone}`]);
    }
  }
}
