import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
  signal,
} from '@angular/core';

@Component({
  selector: 'p4-tooltip',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <span
      class="relative inline-block"
      (mouseenter)="show()"
      (mouseleave)="hide()"
      (focusin)="show()"
      (focusout)="hide()"
    >
      <ng-content />
      @if (open()) {
        <span
          role="tooltip"
          [class]="contentClass"
        >
          {{ content }}
        </span>
      }
    </span>
  `,
})
export class TooltipComponent {
  @Input({ required: true }) content!: string;
  @Input() side: 'top' | 'right' | 'bottom' | 'left' = 'top';
  @Input() delayDuration = 300;

  open = signal(false);
  private timeoutId?: ReturnType<typeof setTimeout>;

  get contentClass(): string {
    const base =
      'absolute z-50 overflow-hidden rounded-md bg-neutral-900 px-3 py-1.5 text-sm text-white shadow-md whitespace-nowrap';
    const sideMap = {
      top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
      right: 'left-full top-1/2 -translate-y-1/2 ml-2',
      bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
      left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    };
    return `${base} ${sideMap[this.side]}`;
  }

  show(): void {
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => this.open.set(true), this.delayDuration);
  }

  hide(): void {
    clearTimeout(this.timeoutId);
    this.open.set(false);
  }
}
