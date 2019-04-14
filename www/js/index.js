document.addEventListener('deviceready', onDeviceReady, false);

function isMaintenance(){
  //check if site is under maintenance;
}
//check internet connection
function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    if(states[networkState]=='No network connection')
    {
      window.location.replace('cd_error-404.html');
    }
    else {
      //alert(states[networkState]);
      return true;
    }
    //alert('Connection type: ' + states[networkState]);
}
//list menu items
function list_menu() {
$('.menu_list').load('cd_menu.html');
$('.footer_list').load('cd_footer.html');
}
//one signal function
/*function onesignal_log(){
  var notificationOpenedCallback = function(jsonData) {
   console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
 };

 window.plugins.OneSignal
   .startInit("4121261b-de20-4778-9e04-97bf00756e08")
   .handleNotificationOpened(notificationOpenedCallback)
   .endInit();
}*/

//push notification function
function push_notification() {
  var push = PushNotification.init({ "android": {"senderID": "YOUR_SENDER_ID"}});
push.on('registration', function(data) {
$.ajax({
 type:"POST",
 url:php_link+"register_device.php",
 data:{"device_id":data.registrationId},
 crossDomain:true,
 cache:false,
 success:function(data){
      //console.log(data);
       //alert(data);
         //$('#select_year').html(data);
 },
 error: function(e){
   }

})


//console.log(data.registrationId);
document.getElementById("gcm_id").innerHTML = data.registrationId;
});

push.on('notification', function(data) {
alert(data.title+" Message: " +data.message);
});

push.on('error', function(e) {
alert(e);
});
}

function onDeviceReady() {
checkConnection();
//onesignal_log();
push_notification();
}
$(document).ready(function() {
  list_menu();
})

    //checkConnection();
