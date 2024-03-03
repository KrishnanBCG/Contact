import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavbarComponent } from './sidenavbar/sidenavbar.component';
import { HeaderbarComponent } from './headerbar/headerbar.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button'
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field';
import { CreateContactComponent } from './create-contact/create-contact.component';
import { CreateTagsComponent } from './create-tags/create-tags.component';
import { CreateFolderComponent } from './create-folder/create-folder.component';
import { TagInputModule } from 'ngx-chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ViewtagComponent } from './viewtag/viewtag.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ChipsModule } from 'primeng/chips'
import { MultiSelectModule } from 'primeng/multiselect';
import { HttpClientModule } from '@angular/common/http';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { InactivecontactComponent } from './inactivecontact/inactivecontact.component';
import { RelationComponent } from './relation/relation.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ActivecontactComponent } from './activecontact/activecontact.component';
import { LoginComponent } from './login/login.component';
import { MatTabsModule } from '@angular/material/tabs'
import { MainComponent } from './main/main.component';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list'
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CdkDrag } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    SidenavbarComponent,
    HeaderbarComponent,
    CreateContactComponent,
    CreateTagsComponent,
    CreateFolderComponent,
    ViewtagComponent,
    InactivecontactComponent,
    RelationComponent,
    ActivecontactComponent,
    LoginComponent,
    MainComponent,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA, // Add CUSTOM_ELEMENTS_SCHEMA to suppress the message for Web Components
    NO_ERRORS_SCHEMA
  ],
  imports: [
    BrowserModule,
    MatInputModule,
    AppRoutingModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    FormsModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    MatButtonModule,
    TagInputModule,
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDialogModule,
    ChipsModule,
    MultiSelectModule,
    HttpClientModule,
    MatChipsModule,
    MatSlideToggleModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    MatTabsModule,
    CdkAccordionModule,
    MatSidenavModule,
    MatExpansionModule,
    RouterModule,
    MatListModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCardModule,
    MatNativeDateModule,
    CdkDrag,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
