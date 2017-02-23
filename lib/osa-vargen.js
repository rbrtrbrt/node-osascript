
/**
 * Serialize a javascript object to AppleScript
 */
function serializeObject(value) {
	var result;
	var typeOf = typeof value;

	if (typeOf === 'object' && (value !== null)) {
		result = '{';
		if (Array.isArray(value)) {
			for( var idx=0; idx< value.length; idx++) {
			   arrayValue = value[idx];
				if (idx !== 0) {
					result += ',';
				}
				result += serializeObject(arrayValue);
			}
		} else {
			Object.keys(value).forEach(function (key, i) {
				if (i !== 0) {
					result += ',';
				}
				result += key + ':' + serializeObject(value[key]);
			});
		}

		result += '}';
	} else if (typeOf === 'string') {
		result = '"' + valuevalue.replace(/\\/g,"\\\\").replace(/"/g,"\\\"") + '"';
	} else if (value === undefined) {
		result = 'missing value';
	} else if (value === null) {
		result = 'null';
	}

	return result || value;
}

module.exports = {
	serializeObject: serializeObject,
  // Generate apple script from javascript object
	generate: function (object) {
		var aScript = '';

		Object.keys(object).forEach(function (key) {
			aScript += 'set ' + key + ' to ' + serializeObject(object[key]) + '\n';
		});

		return aScript;
	}
};
