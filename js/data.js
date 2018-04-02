var api = {
    btc: {
        url: "https://api.coindesk.com/v1/bpi/currentprice.json",
        id: "btcData",
    },
    ip: {
        url: "https://wtfismyip.com/json",
        id: "ipData", 
    }
}
var vpnHostname = [
    "London Trust Media", // PIA
]
var vpnAlias = [
    "PIA VPN", // PIA
]

function getData() {
    dataFetch(api.btc);
    dataFetch(api.ip);
}

function dataRefresh() {
    btcRefresh(api.btc.id);
    ipRefresh(api.ip.id);
}

function btcRefresh(id) {
    var data = JSON.parse(localStorage.getItem(id));
    document.getElementById("usd-display").innerHTML = "USD: $" + data.bpi.USD.rate;
    document.getElementById("gbp-display").innerHTML = "GBP: £" + data.bpi.GBP.rate;
}

function ipRefresh(id) {
    var data = JSON.parse(localStorage.getItem(id)); // Parse the JSON from localstorage
    var location = data.YourFuckingLocation.split(",");

    document.getElementById("ip-display").innerHTML = data.YourFuckingIPAddress; // Update HTML

    if (vpnHostname.indexOf(data.YourFuckingISP) > -1) { // Hostname from API is present in array
        var index = vpnHostname.indexOf(data.YourFuckingISP);
        document.getElementById("isp-display").innerHTML = vpnAlias[index];
        document.getElementById("location-display").innerHTML =  (location[0] + ", " + location[2]);
    } else { // Hostname from API is not present in array
        document.getElementById("isp-display").innerHTML = data.YourFuckingISP;
        document.getElementById("location-display").innerHTML =  (location[0] + ", " + location[2]);
    }

}

async function dataFetch(properties) {
    const response = await fetch(properties.url);
    const json = await response.json();

    localStorage.setItem(properties.id, JSON.stringify(json));
    unix = Math.round(+new Date()/1000);
    localStorage.setItem('timestamp', unix);

    console.log("New data downloaded");

    // Refresh the appropiate display for the data that has been retrieved.
    /* This should not be placed here but as the data takes time to come in the refresh
       has to be initiated in this async function otherwise the display gets refreshed
       before the data is ready.
    */
    refresh(properties.id);
    
}

function refresh(id) {
    if (id == api.ip.id) {
        ipRefresh(api.ip.id);
    } else if (id == api.btc.id) {
        btcRefresh(api.btc.id);
    }
}