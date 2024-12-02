import { Component } from '@angular/core';

@Component({
  selector: 'app-zoom',
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.scss'],
})
export class ZoomComponent {
  private readonly DEFAULT_USER_NAME = 'Ahmed hamdan';
  private readonly DEFAULT_USER_EMAIL = 'amrweb@gmail.com';
  async ngAfterContentInit(): Promise<any> {
    const { ZoomMtg } = await import('@zoomus/websdk');
    ZoomMtg.setZoomJSLib('https://source.zoom.us/lib', '/av');
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareWebSDK();
    let payload = {
      meetingNumber:'88483250867',
      sdkKey:'N3plIhIFSfSogZcIIVgkjA',
      sdkSecret:'W078sPP85xd7wUeSKFYnfnrOE2Hwx1Gh',
      passWord:'btx7N5',
      leaveUrl : 'http://localhost:4200',
      role: "0",

    };

    ZoomMtg.generateSDKSignature({
      meetingNumber: payload.meetingNumber,
      role: payload.role,
      sdkKey: payload.sdkKey,
      sdkSecret: payload.sdkSecret,
      success: (signature: any) => {
        console.log("signature from generateSDKSignature",signature);
        ZoomMtg.init({
          leaveUrl: payload.leaveUrl,
          success: (data: any) => {
            ZoomMtg.join({
              meetingNumber: payload.meetingNumber,
              passWord: payload.passWord,
              sdkKey: payload.sdkKey,
              userName: this.DEFAULT_USER_NAME,
              userEmail: this.DEFAULT_USER_EMAIL,
              signature: signature.result,
              tk: '',
              success: (data: any) => {
                console.log('data from sucess in join', data);
              },
              error: (error: any) => {
                console.log('error in join', error);
              },
            });
          },
          error: (error: any) => {
            console.log('error in init', error);
          },
        });
      },
      error: (error: any) => {
        console.log('error in generateSDKSignature', error);
      },
    });
  }
}
