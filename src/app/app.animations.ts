import {
  animate,
  animateChild,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const routeAnimation = trigger('routeAnimation', [
  transition('* <=> *', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
      }),
    ]),
    query(':enter', [style({ opacity: 0 })]),
    query(':leave', animateChild()),
    group([
      query(':leave', [animate('300ms ease-out', style({ opacity: 0 }))]),
      query(':enter', [animate('300ms ease-out', style({ opacity: 1 }))]),
    ]),
    query(':enter', animateChild()),
  ]),
]);
export const recipeAnimation = trigger('recipeAnimation', [
  transition(':increment', [
    style({ transform: 'translateX(100%)', opacity: 0 }),
    animate(
      '300ms ease-out',
      style({ transform: 'translateX(0%)', opacity: 1 })
    ),
  ]),
  transition(':decrement', [
    style({ transform: 'translateX(-100%)', opacity: 0 }),
    animate(
      '300ms ease-out',
      style({ transform: 'translateX(0%)', opacity: 1 })
    ),
  ]),
]);
export const inOutAnimation = trigger('inOutAnimation', [
  transition(':enter', [
    style({ opacity: 0, maxHeight: '0' }),
    animate('0.5s ease-out', style({ opacity: 1, maxHeight: '1000px' })),
  ]),
  transition(':leave', [
    style({ opacity: 1, maxHeight: '1000px' }),
    animate('0.5s ease-in', style({ maxHeight: '0', opacity: 0 })),
  ]),
]);
export const fade = trigger('fade', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('0.5s ease-out', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    style({ opacity: 1 }),
    animate('0.5s ease-in', style({ opacity: 0 })),
  ]),
]);
