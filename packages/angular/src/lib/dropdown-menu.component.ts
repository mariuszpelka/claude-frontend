import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewEncapsulation,
  inject,
  signal,
} from '@angular/core';

@Component({
  selector: 'p4-dropdown-menu',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="relative inline-block">
      <button
        type="button"
        (click)="toggle()"
        [attr.aria-expanded]="open()"
        [attr.aria-haspopup]="'menu'"
      >
        <ng-content select="[trigger]" />
      </button>
      @if (open()) {
        <div
          role="menu"
          class="absolute left-0 top-full z-50 mt-1 min-w-[8rem] overflow-hidden rounded-md border border-neutral-200 bg-white p-1 text-neutral-900 shadow-md"
        >
          <ng-content select="[content]" />
        </div>
      }
    </div>
  `,
})
export class DropdownMenuComponent {
  @Input() defaultOpen = false;
  open = signal(this.defaultOpen);
  private elementRef = inject(ElementRef);

  toggle(): void {
    this.open.update((v) => !v);
  }

  close(): void {
    this.open.set(false);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (
      this.open() &&
      !this.elementRef.nativeElement.contains(event.target as Node)
    ) {
      this.close();
    }
  }
}

@Component({
  selector: 'p4-dropdown-menu-item',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <button
      type="button"
      role="menuitem"
      [disabled]="disabled"
      class="relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-neutral-100 focus:text-neutral-900 disabled:pointer-events-none disabled:opacity-50"
    >
      <ng-content />
    </button>
  `,
})
export class DropdownMenuItemComponent {
  @Input() disabled = false;
}

@Component({
  selector: 'p4-dropdown-menu-label',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="px-2 py-1.5 text-xs font-semibold text-neutral-500">
      <ng-content />
    </div>
  `,
})
export class DropdownMenuLabelComponent {}

@Component({
  selector: 'p4-dropdown-menu-separator',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `<div class="-mx-1 my-1 h-px bg-neutral-200"></div>`,
})
export class DropdownMenuSeparatorComponent {}
