import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  NgxQrcodeElementTypes,
  NgxQrcodeErrorCorrectionLevels,
} from '@techiediaries/ngx-qrcode';
/*  */
import * as chartData from '../../models/apex';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent {
  //   public areaSpalineChart = chartData.areaSpalineChart;
  //   appointments: any[] = [];
  //   //  selectedDate:string = '';
  //   selectedFrom: string = '';
  //   selectedTo: string = '';
  //   enableddays: number[] = [1, 3, 5];
  //   // isDayEnabeld(day:number):boolean{
  //   //   const selectedday = new Date(this.selectedDate).getDay();
  //   //   return this.enableddays.includes(selectedday)
  //   // }
  //   marchDate: Date[] = [
  //     new Date('2024-03-10'),
  //     new Date('2024-03-15'),
  //     new Date('2024-03-20'),
  //   ];
  //   isInmarch(date: Date): boolean {
  //     return date.getMonth() === 2;
  //   }
  //   check(selectedDate: string) {
  //     const date = new Date(selectedDate);
  //     const isInmarch = date.getMonth() === 2;
  //     return isInmarch;
  //   }
  //   form!: FormGroup;
  //   testform!: FormGroup;
  //   constructor(private fb: FormBuilder) {}

  //   ngOnInit(): void {
  //     this.form = this.fb.group({
  //       input1: ['', Validators.required],
  //       input2: ['', Validators.required],
  //     });

  //     this.testform = this.fb.group({
  //       name: ['', [Validators.required, Validators.minLength(7)]],
  //       phone: ['', [Validators.required]],
  //     });
  //   }

  //   onSubmit(): void {
  //     console.log(this.testform.value);
  //   }

  //   selectedDate1: string = '';
  //   selectedDate2: string = '';
  //   dataArray: { value1: string; value2: string }[] = [];

  //   progressPercent: number = 15;
  //   saveData() {
  //     // Check if both input fields have values before saving
  //     if (this.selectedDate1 && this.selectedDate2) {
  //       const newData = {
  //         value1: this.selectedDate1,
  //         value2: this.selectedDate2,
  //       };
  //       this.dataArray.push(newData);
  //       console.log(this.dataArray);
  //     }
  //   }
  //   reset() {
  //     this.selectedDate1 = '';
  //     this.selectedDate2 = '';
  //   }
  //   updateProgress(): void {
  //     // Check if both inputs are valid
  //     if (
  //       this.form.controls['input1'].valid &&
  //       this.form.controls['input2'].valid
  //     ) {
  //       // Calculate progress percentage based on inputs
  //       const input1Value = this.form.controls['input1'].value;
  //       const input2Value = this.form.controls['input2'].value;
  //       this.progressPercent = Math.round((input1Value + input2Value) / 2);
  //     } else {
  //       this.progressPercent = 0; // Reset progress if any input is invalid
  //     }
  //   }
  // }
  public elementType = NgxQrcodeElementTypes.IMG;
  public correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  public value = '12345';
  public qrCodeData: any = { name: '', phone: '' };
  public token!: string;

  constructor() {}

  ngOnInit(): void {
    this.generateToken();
    this.value = this.token;
  }

  generateToken(): void {
    const date = new Date();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    const year = date.getUTCFullYear() - 2020;
    const random1 = `${day < 10 ? '0' : ''}${day}${
      month < 10 ? '0' : ''
    }${month}${year}`;
    const random2 = Math.floor(10000 + Math.random() * 9000).toString();
    this.token = random1 + random2;
  }

  QRCode(): void {
    const imgElement = document.querySelector('img')?.src;

    const name = this.qrCodeData.name || '';
    const phone = this.qrCodeData.phone || '';

    if (imgElement && (phone || name)) {
      const blobData = this.convertBase64ToBlob(imgElement);
      const blob = new Blob([blobData], { type: 'image/png' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${name ? name + ' - ' : ''}${phone}`;
      link.click();
    }

    this.generateToken();
    this.value = this.token;
  }

  private convertBase64ToBlob(base64Image: string): Blob {
    const parts = base64Image.split(';base64,');
    const imageType = parts[0].split(':')[1];
    const decodedData = window.atob(parts[1]);
    const uInt8Array = new Uint8Array(decodedData.length);
    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: imageType });
  }
}
