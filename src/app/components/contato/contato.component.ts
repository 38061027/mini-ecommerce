import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.scss']
})
export class ContatoComponent implements OnInit{

  form:FormGroup

constructor(private fb: FormBuilder){
  this.form = this.fb.group({
    name:['',[Validators.required,Validators.minLength(5)]],
    phone:['',[Validators.required,Validators.minLength(11)]],
    email:['',[Validators.required,Validators.email]],
    text:['',[Validators.required,Validators.minLength(20)]]
  })
}

ngOnInit(): void {
  this.isFormValid()
}

isFormValid() {
  console.log(this.form.valid)
}

submit(){
  if(this.form.valid){
    console.log(this.form.value)
  }
}

}
