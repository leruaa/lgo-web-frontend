import { writable } from 'svelte/store';

export const theme = writable<string>(undefined);