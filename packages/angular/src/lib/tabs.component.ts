import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import {
  RdxTabsContentDirective,
  RdxTabsListDirective,
  RdxTabsRootDirective,
  RdxTabsTriggerDirective,
} from '@radix-ng/primitives/tabs';

@Component({
  selector: 'p4-tabs',
  standalone: true,
  imports: [CommonModule, RdxTabsRootDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <div
      rdxTabsRoot
      [value]="value"
      [defaultValue]="defaultValue"
      (valueChange)="valueChange.emit($event)"
    >
      <ng-content />
    </div>
  `,
})
export class TabsComponent {
  @Input() defaultValue: string | undefined;
  @Input() value: string | undefined;
  @Output() valueChange = new EventEmitter<string>();
}

@Component({
  selector: 'p4-tabs-list',
  standalone: true,
  imports: [CommonModule, RdxTabsListDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <div
      rdxTabsList
      class="inline-flex h-10 items-center justify-center rounded-md bg-neutral-100 p-1 text-neutral-600"
    >
      <ng-content />
    </div>
  `,
})
export class TabsListComponent {}

@Component({
  selector: 'p4-tabs-trigger',
  standalone: true,
  imports: [CommonModule, RdxTabsTriggerDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <button
      rdxTabsTrigger
      [value]="value"
      [disabled]="disabled"
      class="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-neutral-900 data-[state=active]:shadow"
    >
      <ng-content />
    </button>
  `,
})
export class TabsTriggerComponent {
  @Input({ required: true }) value!: string;
  @Input() disabled = false;
}

@Component({
  selector: 'p4-tabs-content',
  standalone: true,
  imports: [CommonModule, RdxTabsContentDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <div
      rdxTabsContent
      [value]="value"
      class="mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
    >
      <ng-content />
    </div>
  `,
})
export class TabsContentComponent {
  @Input({ required: true }) value!: string;
}
