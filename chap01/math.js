exports.factorial = function(n){
	var result = n;
	while(n > 0){
		if (n == 1) {
			return result;
		}
		result *= (n - 1);
		n --;
	}

	return result;

}