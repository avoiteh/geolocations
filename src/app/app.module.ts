import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

//import { AppComponent } from './app.component';
import { GeolocationsComponent } from './geolocations.component';
import { geoPointsTreeViewDirective } from './geolocations.component';
import { attachedGeoObjects } from './attached-geo-objects.component';

import { ParentPipe} from './parent.pipe';
import { AttachedPipe} from './attached.pipe';

@NgModule({
  declarations: [
//    AppComponent,
    GeolocationsComponent,
    geoPointsTreeViewDirective,
    attachedGeoObjects,
    ParentPipe,
    AttachedPipe
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [
  //AppComponent,
  GeolocationsComponent
  ]
})
export class AppModule { }
