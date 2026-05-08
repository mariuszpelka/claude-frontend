import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  Optional,
  Output,
  SkipSelf,
  ViewEncapsulation,
  forwardRef,
  signal,
} from '@angular/core';

@Component({
  selector: 'p4-tabs',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `<ng-content />`,
})
export class TabsComponent {
  @Input() set defaultValue(v: string | undefined) {
    if (v !== undefined && this.activeValue() === undefined) {
      this.activeValue.set(v);
    }
  }
  @Input() set value(v: string | undefined) {
    if (v !== undefined) this.activeValue.set(v);
  }
  @Output() valueChange = new EventEmitter<string>();

  readonly activeValue = signal<string | undefined>(undefined);

  setValue(v: string): void {
    this.activeValue.set(v);
    this.valueChange.emit(v);
  }
}

@Component({
  selector: 'p4-tabs-list',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <div
      role="tablist"
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
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <button
      type="button"
      role="tab"
      [attr.aria-selected]="parent.activeValue() === value"
      [attr.data-state]="parent.activeValue() === value ? 'active' : 'inactive'"
      [disabled]="disabled"
      (click)="parent.setValue(value)"
      class="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-neutral-900 data-[state=active]:shadow"
    >
      <ng-content />
    </button>
  `,
})
export class TabsTriggerComponent {
  @Input({ required: true }) value!: string;
  @Input() disabled = false;

  constructor(
    @SkipSelf() @Optional() @Inject(forwardRef(() => TabsComponent))
    public parent: TabsComponent,
  ) {
    if (!parent) {
      throw new Error('p4-tabs-trigger must be used inside p4-tabs');
    }
  }
}

@Component({
  selector: 'p4-tabs-content',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    @if (parent.activeValue() === value) {
      <div
        role="tabpanel"
        class="mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
      >
        <ng-content />
      </div>
    }
  `,
})
export class TabsContentComponent {
  @Input({ required: true }) value!: string;

  constructor(
    @SkipSelf() @Optional() @Inject(forwardRef(() => TabsComponent))
    public parent: TabsComponent,
  ) {
    if (!parent) {
      throw new Error('p4-tabs-content must be used inside p4-tabs');
    }
  }
}
