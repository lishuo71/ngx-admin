import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      版权所有 ©2020
    </span>
    <div class="socials">
      <a href="http://www.gugensoft.com" target="_blank" >谷亘软件</a>
    </div>
  `,
})
export class FooterComponent {
}
