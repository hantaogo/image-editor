import { maxParamCount } from '@/const/data'

export const stringToColor = (str) => {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		hash = str.charCodeAt(i) + ((hash << 5) - hash)
	}

	let hex = ''
	for (let i = 0; i < maxParamCount; i++) {
		const value = (hash >> (i * 8)) & 0xFF
		hex += ('00' + value.toString(16)).substr(-2)
	}

	return `#${hex}`
}