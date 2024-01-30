import { writable } from 'svelte/store';

export const isLoggedIn = writable(false);

export const store = writable({
    menu: false
});

export const menu = writable(false);
export const device = writable(window.innerWidth > 768 ? 'desktop' : 'mobile');