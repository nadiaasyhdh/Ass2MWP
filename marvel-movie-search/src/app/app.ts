// app.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { routes } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
 imports: [CommonModule, FormsModule, RouterModule], // ✅ only the symbol

  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  title = '';
}
