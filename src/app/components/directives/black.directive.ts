import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[black]',
  standalone: true,
})
export class blackDirective {
  color = 'orange';

  @HostBinding('style.borderColor')
  get borderColor() {
    return this.color;
  }

  @HostListener('mouseenter')
  enter() {
    this.color = 'black';
  }

  @HostListener('mouseleave')
  leave() {
    this.color = 'orange';
  }
}
