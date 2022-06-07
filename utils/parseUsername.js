export const parseUsername = (data) => {
	const equalSymbolIndex = data.indexOf("=");
	
	if (equalSymbolIndex != -1 && data.slice(0, equalSymbolIndex) == '--username') {
		return data.slice(equalSymbolIndex+1);
	}
	throw new Error('Unknown argument!\nValid argument example: --username=Anemoiaa');
};
