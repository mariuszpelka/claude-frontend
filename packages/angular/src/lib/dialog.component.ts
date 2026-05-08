import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'p4-dialog',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <button type="button" (click)="open()">
      <ng-content select="[trigger]" />
    </button>
    <dialog
      #dialogEl
      class="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 rounded-md border border-neutral-200 bg-white p-6 shadow-lg backdrop:bg-black/50"
      (close)="onClose()"
      (click)="onBackdropClick($event)"
    >
      <ng-content select="[content]" />
      <button
        type="button"
        (click)="close()"
        aria-label="Close"
        class="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        ×
      </button>
    </dialog>
  `,
})
export class DialogComponent {
  @ViewChild('dialogEl') dialogEl!: ElementRef<HTMLDialogElement>;
  @Input() defaultOpen = false;
  @Output() openChange = new EventEmitter<boolean>();

  open(): void {
    this.dialogEl.nativeElement.showModal();
    this.openChange.emit(true);
  }

  close(): void {
    this.dialogEl.nativeElement.close();
  }

  onClose(): void {
    this.openChange.emit(false);
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === this.dialogEl.nativeElement) {
      this.close();
    }
  }
}

@Component({
  selector: 'p4-dialog-title',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <h2 class="text-lg font-semibold text-neutral-900"><ng-content /></h2>
  `,
})
export class DialogTitleComponent {}

@Component({
  selector: 'p4-dialog-description',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `<p class="text-sm text-neutral-600"><ng-content /></p>`,
})
export class DialogDescriptionComponent {}
