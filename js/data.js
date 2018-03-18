/* TO DO
Use objects for btc/ip properties and functions
Learn async/promises so that elements don't have to be refreshed by the dataFetch function */

var unix = Math.round(+new Date()/1000); // Get a UNIX timestamp

function pageLoad() {
    var diff = (unix - localStorage.getItem('timestamp'));
    
    if (diff > 120) {
        getBTCData();
        getIPData(); // Run the dataFetch function (last data is over 120 seconds old)
        console.log("Data > 120 seconds old : FETCHING NEW DATA");
    } else {
        ipRefresh(ipProperties.id); // Don't update the IP address and display what is in storage
        btcRefresh(btcProperties.id);
        console.log("Data < 120 seconds old : NOT UPDATING");
    }

    //THEME THIS SHOULD BE MOVED
    if (localStorage.getItem('theme') == null) {
        // No theme has been selected, nothing needs to switch
        themeSwitch('dark');
    } else {
        themeSwitch(localStorage.getItem('theme'));
    }

}

var btcProperties = {
    url: "https://api.coindesk.com/v1/bpi/currentprice.json",
    id: "btcData",
}
var ipProperties = {
    url: "https://wtfismyip.com/json",
    id: "ipData",
}

function getBTCData() {
    dataFetch(btcProperties.url, btcProperties.id);
    // console.log(JSON.parse(localStorage.getItem(btcProperties.id)));
    // btcRefresh(btcProperties.id);
}

async function getIPData() {
    dataFetch(ipProperties.url, ipProperties.id);
    // console.log(JSON.parse(localStorage.getItem(ipProperties.id)));
    // ipRefresh(ipProperties.id);
}

function btcRefresh(id) {
    var data = JSON.parse(localStorage.getItem(id));
    document.getElementById("usd-display").innerHTML = "USD: $" + data.bpi.USD.rate;
    document.getElementById("gbp-display").innerHTML = "GBP: £" + data.bpi.GBP.rate;
}

function ipRefresh(id) {
    var data = JSON.parse(localStorage.getItem(id)); // Parse the JSON from localstorage
    document.getElementById("ip-display").innerHTML = data.YourFuckingIPAddress; // Update HTML
    document.getElementById("isp-display").innerHTML = data.YourFuckingISP;
}


async function dataFetch(url, id) {
    const response = await fetch(url);
    const json = await response.json();

    localStorage.setItem(id, JSON.stringify(json));
    unix = Math.round(+new Date()/1000);
    localStorage.setItem('timestamp', unix);

    console.log("New data downloaded");

    if (id == ipProperties.id) {
        ipRefresh(ipProperties.id);
    } else if (id == btcProperties.id) {
        btcRefresh(btcProperties.id);
    }
    
}