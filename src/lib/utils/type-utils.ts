export type Prettify<T> = {
	[K in keyof T]: T[K];
} & {}; // eslint-disable-line @typescript-eslint/ban-types

export type Nullable<T> = { [K in keyof T]: T[K] | null };
