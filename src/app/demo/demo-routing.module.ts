import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicComponent } from './basic/basic.component';
import { DynamicComponent } from './dynamic/dynamic.component';
import { ExtendComponent } from './extend/extend.component';

const routes: Routes = [
  {
    path: 'basic',
    component: BasicComponent
  },
  {
    path: 'extend',
    component: ExtendComponent
  },
  {
    path: 'dynamic',
    component: DynamicComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoRoutingModule {}
