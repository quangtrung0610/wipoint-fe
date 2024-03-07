import { trigger, style, transition, animate } from '@angular/animations';

export const HiddenAnimation = [
  trigger('hiddenEnter', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('150ms cubic-bezier(0.4, 0, 0.2, 1)', style({ opacity: 1 })),
    ]),
  ]),

  trigger('hidden', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('150ms cubic-bezier(0.4, 0, 0.2, 1)', style({ opacity: 1 })),
    ]),
    transition(':leave', [
      style({ opacity: 1 }),
      animate('150ms cubic-bezier(0.4, 0, 0.2, 1)', style({ opacity: 0 })),
    ]),
  ]),
];
