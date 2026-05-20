import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import {
  RdxDropdownMenuContentDirective,
  RdxDropdownMenuItemDirective,
  RdxDropdownMenuLabelDirective,
  RdxDropdownMenuSeparatorDirective,
  RdxDropdownMenuTriggerDirective,
} from '@radix-ng/primitives/dropdown-menu';

@Component({
  selector: 'p4-dropdown-menu',
  standalone: true,
  imports: [
    CommonModule,
    RdxDropdownMenuTriggerDirective,
    RdxDropdownMenuContentDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <button
      type="button"
      [rdxDropdownMenuTrigger]="menuTpl"
      class="inline-flex"
    >
      <ng-content select="[trigger]" />
    </button>
    <ng-template #menuTpl>
      <div
        rdxDropdownMenuContent
        class="z-50 mt-1 min-w-[8rem] overflow-hidden rounded-md border border-neutral-200 bg-white p-1 text-neutral-900 shadow-md"
      >
        <ng-content select="[content]" />
      </div>
    </ng-template>
  `,
})
export class DropdownMenuComponent {}

@Component({
  selector: 'p4-dropdown-menu-item',
  standalone: true,
  imports: [CommonModule, RdxDropdownMenuItemDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <button
      rdxDropdownMenuItem
      [disabled]="disabled"
      class="relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-neutral-100 focus:text-neutral-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
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
  imports: [CommonModule, RdxDropdownMenuLabelDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <div rdxDropdownMenuLabel class="px-2 py-1.5 text-xs font-semibold text-neutral-500">
      <ng-content />
    </div>
  `,
})
export class DropdownMenuLabelComponent {}

@Component({
  selector: 'p4-dropdown-menu-separator',
  standalone: true,
  imports: [CommonModule, RdxDropdownMenuSeparatorDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `<div rdxDropdownMenuSeparator class="-mx-1 my-1 h-px bg-neutral-200"></div>`,
})
export class DropdownMenuSeparatorComponent {}
