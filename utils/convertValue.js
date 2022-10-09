export const convert = (valueFrom, currencyFrom, currencyTo) =>  {
	if(!valueFrom){
		return;
	}

	if(currencyFrom === currencyTo){
		return valueFrom;
	} else {
		return ((currencyFrom / currencyTo) * valueFrom).toFixed(2)
	}
}