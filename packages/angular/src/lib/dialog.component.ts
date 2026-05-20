import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  RdxDialogCloseDirective,
  RdxDialogContentDirective,
  RdxDialogDescriptionDirective,
  RdxDialogTitleDirective,
  RdxDialogTriggerDirective,
} from '@radix-ng/primitives/dialog';

@Component({
  selector: 'p4-dialog',
  standalone: true,
  imports: [
    CommonModule,
    RdxDialogTriggerDirective,
    RdxDialogContentDirective,
    RdxDialogCloseDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <button type="button" [rdxDialogTrigger]="dialogTpl">
      <ng-content select="[trigger]" />
    </button>
    <ng-template #dialogTpl>
      <div
        rdxDialogContent
        class="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 rounded-md border border-neutral-200 bg-white p-6 shadow-lg"
      >
        <ng-content select="[content]" />
        <button
          type="button"
          rdxDialogClose
          aria-label="Close"
          class="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          ×
        </button>
      </div>
    </ng-template>
  `,
})
export class DialogComponent {}

@Component({
  selector: 'p4-dialog-title',
  standalone: true,
  imports: [RdxDialogTitleDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <h2 rdxDialogTitle class="text-lg font-semibold text-neutral-900">
      <ng-content />
    </h2>
  `,
})
export class DialogTitleComponent {}

@Component({
  selector: 'p4-dialog-description',
  standalone: true,
  imports: [RdxDialogDescriptionDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `<p rdxDialogDescription class="text-sm text-neutral-600"><ng-content /></p>`,
})
export class DialogDescriptionComponent {}
