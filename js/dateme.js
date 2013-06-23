	// Find all elements with class dateMe
	var subject = document.getElementsByClassName('dateMe');

	// Run the function when the field loses focus
	for (var i = 0; i < subject.length; i++) {
		var act = subject[i];
		act.onblur = function() {
			dateMe(act);
		}
	}

	function dateMe(subject) {
		// First grab the element
		var act = subject;

		// Grab the entered Date
		var enteredDate = act.value;

		// Remove error class before validation
		act.className = act.className.replace( /(?:^|\s)error(?!\S)/g , '' );

		// Make sure a value was entered
		if ( !enteredDate ) {
			return false;
		}

		// If enteredDate is only a number, add slashes at the correct points
		if ( enteredDate == parseFloat(enteredDate) ) {
			enteredDate = enteredDate.replace(/(\S{2})/g,"$1/");
			enteredDate = enteredDate.replace(/\/$/,"");   // removes the final slash
		}

		// Replace dashes and dots with slashes for consistency
		enteredDate = enteredDate.replace(/[-|.]/g, '/');

		// Remove third slash if four digit year is entered
		if ( enteredDate.lastIndexOf("/") > 6 ) {
			enteredDate = enteredDate.replace(/\/([^\/]*)$/,'$1');
		}

		// If a two digit year is entered, prefix 19 for > 31, and 20 for < 32
		var parts = enteredDate.split("/");
		var year = [parts[parts.length - 1]];

		if (year.length == 2) {
			if (year < 32) {
				// Make sure only last value of year is replaced
				var positionOfYear = enteredDate.lastIndexOf(year);
				enteredDate = enteredDate.substring(0,positionOfYear) +  '20' + year;
			} else if (year > 31) {
				// Make sure only last value of year is replaced
				var positionOfYear = enteredDate.lastIndexOf(year);
				enteredDate = enteredDate.substring(0,positionOfYear) +  '19' + year;
			}
		}

		if (year.length < 2) {
			// Update error message if date is invalid
			act.className += " error";
			return false;
		}

		// Split array into d/m/y variables
		var parts = enteredDate.split("/");
		var d = parts[0];
		var m = parts[1];
		var y = parts[2];

		// Validate enteredDate against Georgian Calendar
		if ( m>12 || m<01 || d<01 ||
				( d>30
					&& ( m==09 || m==04 || m==06 || m==11 )
				)
			|| ( d>29 && m==02 && Math.ceil(y/4) == Math.floor(y/4) )
			|| ( d>28 && m==02 && Math.ceil(y/4) !== Math.floor(y/4) )
			|| d>31 )
		{

			// Update error message if date is invalid
			act.className += " error";
			return false;

		} else {

			// Final checks to add leading zeroes to single digit days and months
			if ( d.length < 2 ) {
				enteredDate = '0' + d + '/' + m + '/' + y;
			}

			if ( m.length < 2 ) {
				enteredDate = d + '/' + '0' + m + '/' + y;
			}

			if ( d.length < 2 && m.length < 2 ) {
				enteredDate = '0' + d + '/' + '0' + m + '/' + y;
			}

			// Return final validated date to update field
			act.value = enteredDate;
			return true;

		}

	}