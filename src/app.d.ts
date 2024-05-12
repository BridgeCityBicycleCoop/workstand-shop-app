// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			pb: import('$lib/server/db/pocketbase/types').TypedPocketBase;
			user?: Record<string, unknown> | null;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
	declare type Branded<T, B> = T & Brand<B>;
	declare type Prettify<T> = {
		[K in keyof T]: T[K];
	} & NonNullable<unknown>;
}

declare const __brand: unique symbol;
type Brand<B> = { [__brand]: B };

export {};
