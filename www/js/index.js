/*jslint browser:true*/
/*global sap*/
(function () {
    "use strict";

    //add an event listener for the Cordova deviceReady event.
    document.addEventListener('deviceready', function () {
        sap.FioriClient.loadByIndexPage = true;
        sap.logon.Utils.logPerformanceMessage("ondeviceready from index.js");        
        var FirebasePlugin = window.FirebasePlugin;
        
        // Notifications
        var checkNotificationPermission = function(requested){
            FirebasePlugin.hasPermission(function(hasPermission){
                if(hasPermission){
                    console.log("Remote notifications permission granted");
                    if (window.localStorage.getItem("isPushRegistered") !== "true") {
                        window.localStorage.setItem("isPushRegistered", "false");
                        // Granted
                        getToken();
                    }else{
						console.log("Got Existing FCM token: " + window.localStorage.getItem("deviceToken"));
					}
                }else if(!requested){
                    // Request permission
                    console.log("Requesting remote notifications permission");
                    FirebasePlugin.grantPermission(checkNotificationPermission.bind(this, true));
                }else{
                    // Denied
                    console.error("Notifications won't be shown as permission is denied");
                }
            });
        };

        var getToken = function(){
            FirebasePlugin.getToken(function(token){
                console.log("Got FCM token: " + token);
				if(token && token.length > 0){
					window.localStorage.setItem("isPushRegistered", "true");
					window.localStorage.setItem("deviceToken", token);
				}
            }, function(error) {
                window.localStorage.setItem("isPushRegistered", "false");
                console.error("Failed to get FCM token", error);
            });
        };
				
        if(FirebasePlugin){
            checkNotificationPermission(false);
        }else{
            console.log("No Push Notification Plugin");
        }
    });
}());