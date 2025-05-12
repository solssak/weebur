import {
  VIEW_MODE,
  VIEW_MODE_KEY,
  VIEW_MODE_EXPIRY_KEY,
} from '@/types/Product';

export const initializeViewMode = (): VIEW_MODE => {
  const savedViewMode = localStorage.getItem(VIEW_MODE_KEY);
  const expiryTime = localStorage.getItem(VIEW_MODE_EXPIRY_KEY);

  if (
    savedViewMode &&
    expiryTime &&
    new Date().getTime() < parseInt(expiryTime)
  ) {
    return savedViewMode as VIEW_MODE;
  }

  const newViewMode = Math.random() < 0.5 ? 'grid' : 'list';
  setViewMode(newViewMode);

  return newViewMode;
};

export const setViewMode = (viewMode: VIEW_MODE): void => {
  localStorage.setItem(VIEW_MODE_KEY, viewMode);
  localStorage.setItem(
    VIEW_MODE_EXPIRY_KEY,
    (new Date().getTime() + 24 * 60 * 60 * 1000).toString(),
  );
};
