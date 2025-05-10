import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReservasComponent } from './reservas.component';
import { ReservasRoutingModule } from './reservas-routing.module';

@NgModule({
  declarations: [ReservasComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReservasRoutingModule
  ],
  exports: [ReservasComponent]
})
export class ReservasModule {}
