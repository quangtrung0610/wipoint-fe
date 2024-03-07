import { trigger, style, transition, animate, query } from '@angular/animations';

export const CollapseAnimation = [
  trigger('collapse', [
    transition(':enter', [
      query('*', style({ overflow: 'hidden' })),
      style({ display: 'grid', 'grid-template-rows': '0fr' }),
      animate('150ms cubic-bezier(0.4, 0, 0.2, 1)', style({ 'grid-template-rows': '1fr' })),
    ]),
    transition(':leave', [
      style({ height: '*', overflow: 'hidden' }),
      animate('150ms cubic-bezier(0.4, 0, 0.2, 1)', style({ height: '0' })),
    ]),
  ]),

  trigger('collapseEnter', [
    transition(':enter', [
      query('*', style({ overflow: 'hidden' })),
      style({ display: 'grid', 'grid-template-rows': '0fr' }),
      animate('150ms cubic-bezier(0.4, 0, 0.2, 1)', style({ 'grid-template-rows': '1fr' })),
    ]),
  ]),

  trigger('collapseLeave', [
    transition(':leave', [
      style({ height: '*', overflow: 'hidden' }),
      animate('150ms cubic-bezier(0.4, 0, 0.2, 1)', style({ height: '0' })),
    ]),
  ]),
];
