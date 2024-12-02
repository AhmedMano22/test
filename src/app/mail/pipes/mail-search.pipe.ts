

// import { Pipe, PipeTransform } from '@angular/core';

// @Pipe({
//   name: 'mailSearch'
// })
// export class MailSearchPipe implements PipeTransform {
//   transform(value: any, args?: any) {
//     const searchText = new RegExp(args, 'ig');
//     if (value) {
//       return value.filter((mail: any) => {
//         if (mail.sender || mail.subject) {
//           if (
//             mail.sender.search(searchText) !== -1 ||
//             mail.subject.search(searchText) !== -1
//           ) {
//             return true;
//           }
//         }
//       });
//     }
//   }
// }

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'MailSearch'
})
export class MailSearchPipe implements PipeTransform {
  transform(value: any, args?: any) {
    const searchText = new RegExp(args, 'ig');
    if (value) {
      return value.filter((mail: any) => {
        if (mail.sender || mail.subject) {
          if (
            mail.sender.search(searchText) !== -1 ||
            mail.subject.search(searchText) !== -1
          ) {
            return true;
          }
        }
        // Return false if the condition is not met
        return false;
      });
    }
    // Return the original value if it's null or undefined
    return value;
  }
}
