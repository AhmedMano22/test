import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DragulaService } from 'ng2-dragula';
@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],

})
export class DynamicFormComponent {
  registerForm!:FormGroup;
    dynamicForm:any;
    constructor(private http:HttpClient,private fb:FormBuilder,private dragulaService: DragulaService){
      this.dragulaService.createGroup('bag-dynamicForm', {
        revertOnSpill: true
      });
    }

    ngOnInit() {
      this.registerForm = this.fb.group({})

      const Form = localStorage.getItem('dynamicForm');
      if(Form){
        this.dynamicForm = JSON.parse(Form);
        this.createFormControl();
      }else{
        this.http.get('/assets/dynamicForm.json').subscribe(res=>{
          this.dynamicForm = res;
          console.log(this.dynamicForm);
          this.createFormControl()
        })
      }

      this.dragulaService.dropModel('bag-dynamicForm')
      .subscribe(({ sourceModel }) => {
        this.dynamicForm = sourceModel;
        console.log('Form controls have been rearranged:', this.dynamicForm);
        localStorage.setItem('dynamicForm', JSON.stringify(this.dynamicForm));
       // this.updateJsonStructure();
      });
    }
    updateJsonStructure() {
      this.http.post('/api/saveJson', this.dynamicForm).subscribe(response => {
        console.log('Save response:', response);
      }, error => {
        console.error('Error saving JSON:', error);
      });
    }


    createFormControl(){
      this.dynamicForm.forEach((element:any) => {
        if(element.Required === "true"){
          this.registerForm.addControl(element.ID,new FormControl('',Validators.required));
        }else{
          this.registerForm.addControl(element.ID,new FormControl(''));
        }
      });
      console.log(this.registerForm);

    }
    submit(){
      console.log(this.registerForm.value);

    }
}
