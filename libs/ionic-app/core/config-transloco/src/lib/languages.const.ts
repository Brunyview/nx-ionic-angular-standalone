export type AvailableLang = string | { id: string; label: string } | undefined;

export const availableLangs: AvailableLang[] = [
    { id: 'en', label: 'English' },
    { id: 'es', label: 'Español' },
  ]