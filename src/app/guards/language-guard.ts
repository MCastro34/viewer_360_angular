import { CanActivateFn, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { inject } from '@angular/core';

export const languageGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const availableLangs = environment.langs;
  const lang = route.paramMap.get('lang');

  if (lang && availableLangs.includes(lang)) {
    return true;
  }

  const browserLangs = navigator.languages.flatMap((lang) => lang.toLowerCase().split('-'));

  const matchedLang =
    browserLangs.find((lang) => availableLangs.includes(lang)) ?? environment.defaultLang;

  return router.createUrlTree([matchedLang]);
};
