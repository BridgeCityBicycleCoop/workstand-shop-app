// simple unique id generator

export default function uniqueId() {
	return `uid-${(Math.random() * 10e15).toString(16)}`;
}
