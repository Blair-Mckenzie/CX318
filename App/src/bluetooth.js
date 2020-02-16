let button=document.getElementById('bluetooth');
button.addEventListener("click",() => {
    navigator.bluetooth.requestDevice({
        acceptAllDevices:true,
        optionalServices:['battery_service']
    })
        .then(device =>{
            device.addEventListener('gattserverdisconnected',disconnected);
            console.log(device.name);
            return device.gatt.connect();
        })
        .then(server => { /* ... */ })
        .catch(error => {console.log(error);});
});

function disconnected(event){
    let device = event.target;
    console.log('Device ' +device.name+' is disconnected')
}