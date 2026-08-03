import { profile } from '../data/profile';

const base = import.meta.env.BASE_URL === '/'
  ? ''
  : import.meta.env.BASE_URL.replace(/\/$/, '');

const isExternal = (value: string) =>
  /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(value);

export function sitePath(path = '/') {
  if (!path || path.startsWith('#') || isExternal(path)) return path;

  const rootedPath = path.startsWith('/') ? path : `/${path}`;
  if (base && (rootedPath === base || rootedPath.startsWith(`${base}/`))) {
    return rootedPath;
  }

  return `${base}${rootedPath}` || '/';
}

export function absoluteSiteUrl(path = '/') {
  return new URL(sitePath(path), new URL(profile.siteUrl).origin).toString();
}
