import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[orange]',
  standalone: true,
})
export class OrangeDirective {
  color = 'orange';

  @HostBinding('style.borderColor')
  get borderColor() {
    return this.color;
  }

  @HostListener('mouseenter')
  enter() {
    this.color = 'orange';
  }

  @HostListener('mouseleave')
  leave() {
    this.color = 'white';
  }
}
