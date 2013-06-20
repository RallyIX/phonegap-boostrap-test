var shake = (function () {
	var shake = {},
		watchId = null,
		options = { 
			frequency: 300,
			delay: 3000,
			sensitivity: 30
		},
		previousAcceleration = { x: null, y: null, z: null },
		shakeCallBack = null;
	
	// Start watching the accelerometer for a shake gesture
	shake.startWatch = function (onShake) {
		shakeCallBack = onShake;
		watchId = navigator.accelerometer.watchAcceleration(getAccelerationSnapshot, handleError, options);
	};
	
	// Stop watching the accelerometer for a shake gesture
	shake.stopWatch = function () {
		if (watchId !== null) {
			navigator.accelerometer.clearWatch(watchId);
			watchId = null;
		}
	};
	
	// Gets the current acceleration snapshot from the last accelerometer watch
	function getAccelerationSnapshot() {
		navigator.accelerometer.getCurrentAcceleration(assessCurrentAcceleration, handleError);
	}
	
	// Assess the current acceleration parameters to determine a shake
	function assessCurrentAcceleration(acceleration) {
		var a = acceleration;
		
	    //document.getElementById('x').innerHTML = 'x' + roundNumber(a.x);
	    //document.getElementById('y').innerHTML = 'y' + roundNumber(a.y);
	    //document.getElementById('z').innerHTML = 'z' + roundNumber(a.z);		
		
		var accelerationChange = {};
		if (previousAcceleration.x !== null) {
			accelerationChange.x = Math.abs(previousAcceleration.x, acceleration.x);
			accelerationChange.y = Math.abs(previousAcceleration.y, acceleration.y);
			accelerationChange.z = Math.abs(previousAcceleration.z, acceleration.z);
		}
		
		//document.getElementById('shake').innerHTML = (accelerationChange.x + accelerationChange.y + accelerationChange.z);
		
		if (accelerationChange.x + accelerationChange.y + accelerationChange.z > options.sensitivity) {
			// Shake detected
			if (typeof (shakeCallBack) === "function") {
				shakeCallBack();
				
			}
			shake.stopWatch();
			setTimeout(shake.startWatch.bind(shake,shakeCallBack), options.delay);
			previousAcceleration = { 
				x: null, 
				y: null, 
				z: null
			}
		} else {
			previousAcceleration = {
				x: acceleration.x,
				y: acceleration.y,
				z: acceleration.z
			}
		}
	}
 
	// Handle errors here
	function handleError() {
	}
	
	return shake;
})();