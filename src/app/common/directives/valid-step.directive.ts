import { combineLatest } from 'rxjs';
import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { NgFormsManager } from '@ngneat/forms-manager';

@Directive({
  selector: '[appValidStep]'
})
export class ValidStepDirective implements OnInit {

  @Input() appValidStep!: string | undefined;
  constructor(private host: ElementRef<HTMLElement>, private formsManager: NgFormsManager) { }

  ngOnInit() {
    const step = this.appValidStep ? this.appValidStep : '';
    const isStepValid$ = this.formsManager.validityChanges(step);
    const isStepDirty$ = this.formsManager.dirtyChanges(step);

    combineLatest([isStepDirty$, isStepValid$])
      .subscribe(([isDirty, isValid]) => {
        if (isDirty) {
          this.host.nativeElement.classList.toggle('invalid', !isValid);
        }
      });
  }

}
