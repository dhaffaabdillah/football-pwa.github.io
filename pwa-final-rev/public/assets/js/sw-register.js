// REGISTER SERVICE WORKER
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js')
        .then(function() {
            console.log('Pendaftaran ServiceWorker berhasil');
        })
        .catch(function(){
            console.log('Pendaftaran ServiceWorker gagal');
        });
    })
} else {
    console.log("ServiceWorker belum didukung browser ini.")
}

function registerServiceWorker() {
    return navigator.serviceWorker.register('sw.js')
      .then(function (registration) {
        console.log('Registrasi service worker berhasil.');
        return registration;
      })
      .catch(function (err) {
        console.error('Registrasi service worker gagal.', err);
      });
}

// Periksa fitur Notification API
if ("Notification" in window) {
    requestPermission();
} else {
    console.error("Browser tidak mendukung notifikasi.");
}
    
// Meminta ijin menggunakan Notification API
function requestPermission() {
    navigator.serviceWorker.ready.then(() => {
        Notification.requestPermission().then(function (result) {
            if (result === "denied") {
                console.log("Fitur notifikasi tidak diijinkan.");
                return;
            } else if (result === "default") {
                console.error("Pengguna menutup kotak dialog permintaan ijin.");
                return;
            }
            
            console.log("Fitur notifikasi diijinkan.");
        });
        if (('PushManager' in window)) {
            navigator.serviceWorker.getRegistration().then(function(registration) {
                registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array("BLC34HtlPOBQUaIMOTrPjuQjOro7taRdg93XQs1ymTABCK0gCk3cN9SxqPnwiFNXMpGp4f8lYbTwZZRo2c4WJ5Y")
                }).then(function(subscribe) {
                    console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
                    console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                        null, new Uint8Array(subscribe.getKey('p256dh')))));
                    console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                        null, new Uint8Array(subscribe.getKey('auth')))));
                }).catch(function(e) {
                    console.error('Tidak dapat melakukan subscribe ', e.message);
                });
            });
        }
    });
}

function showNotifikasiRequireInteraction() {
    const title = 'notifikasi yang meminta interaksi pengguna';
    const options = {
        requireInteraction: true,
    }


    if(Notification.permission === 'granted'){
        navigator.serviceWorker.ready.then(function(reg) {
            reg.showNotification(title, options);
        });
    } else {
        console.error('fitur notifikasi tidak diijinkan')
    }
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
      
function checkIfPushIsEnabled() {
    //---check if push notification permission
    // has been denied by the user---
    if (Notification.permission === 'denied') {
        alert('User has blocked push notification.');
        return;
    }
    //---check if push notification is
    // supported or not---
    if (!('PushManager' in window)) {
        alert('Sorry, Push notification is ' +
              'not supported on this browser.');
        return;
    }
    //---get push notification subscription
    // if serviceWorker is registered and ready---
    navigator.serviceWorker.ready
    .then(function (registration) {
        registration.pushManager.getSubscription()
        .then(function (subscription) {
            console.log(subscription);
        })
        .catch(function (error) {
            console.error(
                'Error occurred enabling push ',
                error);
        });
    });
}
      
//---subscribe to push notification---
function subscribeToPushNotification() {
    navigator.serviceWorker.ready
    .then(function(registration) {
        if (!registration.pushManager) {
            alert(
                'This browser does not ' +
                'support push notification.');
            return false;
        }
        //---to subscribe push notification using
        // pushmanager---
        registration.pushManager.subscribe(
            //---always show notification when received---
            { userVisibleOnly: true }
        )
        .then(function (subscription) {
            console.log('Push notification subscribed.');
            console.log(subscription);
        })
        .catch(function (error) {
            console.error(
                'Push notification subscription error: ',
                error);
        });
    })
}
      
//---unsubscribe from push notification---
function unsubscribeFromPushNotification() {
    navigator.serviceWorker.ready
    .then(function(registration) {
        registration.pushManager.getSubscription()
        .then(function (subscription) {
            if(!subscription) {
                alert('Unable to unsubscribe from push ' +
                      'notification.');
                return;
            }
            subscription.unsubscribe()
            .then(function () {
                console.log('Push notification unsubscribed.');
                console.log(subscription);
            })
            .catch(function (error) {
                console.error(error);
            });
        })
        .catch(function (error) {
            console.error('Failed to unsubscribe push ' +
                          'notification.');
        });
    })
}
            
//---check if push notification is supported---
checkIfPushIsEnabled()