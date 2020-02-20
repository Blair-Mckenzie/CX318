let button=document.getElementById('bluetooth');
button.addEventListener("click",() => {
    navigator.bluetooth.requestDevice({
        acceptAllDevices:true,
        optionalServices:["dd8c1400-3ae2-5c42-b8be-96721cd710fe"]
    })
        .then(device =>{
            device.addEventListener('gattserverdisconnected',disconnected);
            console.log(device.name);
            return device.gatt.connect();
        })
        .then(server => {
            console.log('got server');
            return server.getPrimaryService("dd8c1400-3ae2-5c42-b8be-96721cd710fe");
         })
         .then(service => {
             console.log('got service');
             return service.getCharacteristic("dd8c1401-3ae2-5c42-b8be-96721cd710fe");
         })
         .then(characteristic => { 
             console.log('got characteristic');
             var buf = new ArrayBuffer("h");
             characteristic.writeValue(buf);
             console.log(characteristic.readValue());
            return characteristic.readValue();
         })
         .then(value => {
             console.log("dd8c1400-3ae2-5c42-b8be-96721cd710fe", value);
         })
        .catch(error => {console.log(error);});
});

function disconnected(event){
    let device = event.target;
    console.log('Device ' +device.name+' is disconnected')
}