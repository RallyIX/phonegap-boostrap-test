/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

	function tweetdisplay() {
		if (!$('#tweetmessage')) return;
		var tweets = JSON.parse(localStorage.getItem('testObject'));
		if (tweets.length) {
			$('#tweetmessage').html(tweets[0]);
		} else {
			$('#tweetmessage').html("GO GET SOME MORE TWEETS!");
		}
		counttweets();
	}

	function tweethash(o) {
		var tweets = JSON.parse(localStorage.getItem('testObject'));
		if (tweets.length > 0 && tweets[0].indexOf($(o).html()) === -1) {
			tweets[0] = tweets[0] + ' ' + $(o).html();	
		}
		localStorage.setItem('testObject',JSON.stringify(tweets));
		tweetdisplay();
	}
	
	function tweetcancel() {
		var tweets = JSON.parse(localStorage.getItem('testObject'));
		tweets.shift();
		localStorage.setItem('testObject',JSON.stringify(tweets));
		tweetdisplay();
	}

	function shook() {
		if (!accepttweets) {
			$('body').animate( { backgroundColor: '#e3e3e3' }, 100).animate( { backgroundColor: '#f7941e' }, 1000);	
			var unshake = window.setTimeout(unshook,15000);
		}
		accepttweets = true;
	}
	
	function unshook() {
		if (accepttweets) {
			$('body').animate( { backgroundColor: '#f7941e' }, 100).animate( { backgroundColor: '#e3e3e3' }, 1000);		
		}
		accepttweets = false;
	}

	function counttweets() {
		if (!localStorage.getItem('testObject')) {
			localStorage.setItem('testObject','[]');
		}		
		var tweets = JSON.parse(localStorage.getItem('testObject'));
		var tweetcount = tweets.length;
		$('#ampcount').html(tweetcount);
		if (tweetcount > 0) {
			$('#ampcount').css('display', 'block');
		} else {
			$('#ampcount').css('display', 'none');	
		}
	}
	
	function tweet(c) {
			if (c==1) window.setTimeout(tweet.bind(this,1),5000);
		
			if (!accepttweets && c ==1 ) return;
			
			if (!localStorage.getItem('testObject')) {
				localStorage.setItem('testObject','[]');
			}
		
			var tweets = JSON.parse(localStorage.getItem('testObject'));
			var ret = '';
			
			if (c == 1) {
				var nexttweet = tweetlist.shift();
				ret = tweets.push(nexttweet);
				// stick it back in pile for test
				tweetlist.push(nexttweet);
			} else {
				ret = tweets.shift();	
				window.plugins.twitter.composeTweet(
						 function(){
						 },
						 function(){
							alert("We have a problem with the plugin");
						 },
						 ret
					);
			}
			
			localStorage.setItem('testObject',JSON.stringify(tweets));
			
			tweetdisplay();
			counttweets();
			
			return ret;
		
	}

var myScroll = null;

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
    	 	var myScroll = new iScroll('wrapper',{snap:'li'});
    	 	
    	 	if ($('#ampcount')) {
    	 		counttweets();
    	 	}
    	 	
    		shake.startWatch(function(){
				 //window.plugins.twitter.composeTweet(
				//		 function(){
				//		 },
				//		 function(){
				//			alert("We have a problem with the plugin");
				//		 },
				//		 "Stop shaking me, damnit"
				//	);
    			//
    			
    				if (window.acceptshake) {
    					shook();
    				}
					return true;
				}		
    	);
    	
    	//var contentDiv = document.getElementById("acctest");
    	//contentDiv.innerHTML= 'loaded';
        app.receivedEvent('deviceready');
    },
    onError: function() {
    	console.log('error!');
    },
    onSuccess: function (acceleration) {
        var contentDiv = document.getElementById("acctest");
    },  
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);        
        //var contentDiv = document.getElementById("acctest");
        //contentDiv.innerHTML= 'event!'; 
        
        window.plugins.twitter.isTwitterAvailable(
        		function(bool){ 
        			if(bool){
        				// Do something
        				//alert("Twitter available, success!");
        			} else {
        				alert("Twitter is not available");
        			}
        		},
        		function(){
        		//	alert("We have a problem with the plugin");
        		}
        	);
        
        
        
        //deviceInfo();
        //getLocation();
        //toggleCompass();
        

        //console.log(navigator.accelerometer);
        //console.log('Received Event yabba: ' + id);
    }
};
