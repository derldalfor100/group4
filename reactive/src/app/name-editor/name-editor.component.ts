import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-name-editor',
  templateUrl: './name-editor.component.html',
  styleUrls: ['./name-editor.component.css']
})
export class NameEditorComponent {

  name: FormControl = new FormControl('');

  constructor() { }

  updateName() {
    this.name.setValue(this.name.value+'1');
  }

}
