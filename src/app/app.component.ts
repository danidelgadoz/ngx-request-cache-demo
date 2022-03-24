import { Component } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isCacheEnable = true;

  constructor(
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.openSnackbar();
  }

  onToggleChange(e: MatSlideToggleChange) {
    this.isCacheEnable = e.checked;

    if (this.isCacheEnable) {
      this.openSnackbar();
    } else {
      this.snackBar.dismiss();
    }
  }

  private openSnackbar(): void {
    this.snackBar.open(`Watch devtools's network tab to see library behavior`, '', { duration: 10000 });
  }
}
