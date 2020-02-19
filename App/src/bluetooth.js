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
        .then(server => {
            console.log('got server');
            return server.getPrimaryService('battery_service');
         })
         .then(service => {
             console.log('got service');
             return service.getCharacteristic('battery_level');
         })
         .then(characteristic => { 
             console.log('got characteristic');
             // characteristic.writeValue...
            return characteristic.readValue();
         })
         .then(value => {
             console.log('battery level', value);
         })
        .catch(error => {console.log(error);});
});

function disconnected(event){
    let device = event.target;
    console.log('Device ' +device.name+' is disconnected')
}