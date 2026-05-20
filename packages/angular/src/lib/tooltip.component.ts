import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import {
  RdxTooltipContentDirective,
  RdxTooltipRootDirective,
  RdxTooltipTriggerDirective,
} from '@radix-ng/primitives/tooltip';

export type TooltipSide = 'top' | 'right' | 'bottom' | 'left';

@Component({
  selector: 'p4-tooltip',
  standalone: true,
  imports: [
    CommonModule,
    RdxTooltipRootDirective,
    RdxTooltipTriggerDirective,
    RdxTooltipContentDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <span rdxTooltipRoot [openDelay]="delayDuration" class="inline-block">
      <button rdxTooltipTrigger class="bg-transparent border-0 p-0 cursor-pointer">
        <ng-content />
      </button>
      <ng-template rdxTooltipContent [side]="side" [sideOffset]="6">
        <span
          class="z-50 overflow-hidden rounded-md bg-neutral-900 px-3 py-1.5 text-sm text-white shadow-md whitespace-nowrap"
        >
          {{ content }}
        </span>
      </ng-template>
    </span>
  `,
})
export class TooltipComponent {
  @Input({ required: true }) content!: string;
  @Input() side: TooltipSide = 'top';
  @Input() delayDuration = 300;
}
