(function(){
    var wait_for_hash = setInterval(() => {
        if (!document.location.hash.includes("pnr_locator=") || !document.location.hash.includes("pnr_key=")) {
            return;
        }

        var success = false;

        for (var i = 0; i < 1; ++i) {
            if (success) {
                break;
            }

            (async () => {
                const rawResponse = await fetch('https://www.aeroflot.ru/sb/booking/api/app/paid_meal_offers/v1', {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'cookie': document.cookie
                  },
                  body: '{"pnr_locator":"' + document.location.hash.split("pnr_locator=")[1].replace(/&.*/g, "") + '","pnr_key":"' + document.location.hash.split("pnr_key=")[1].replace(/&.*/g, "") + '","lang":"' + document.cookie.split("AF_preferredLanguage=")[1].replace(/;.*/, "").toLowerCase() + '","pos_country":"' + document.cookie.split("POS_COUNTRY=")[1].replace(/;.*/, "").toLowerCase() + '"}'
                });
    
                const content = await rawResponse.json();
    
                //console.log(content);
                if (content.success) {
                    success = true;
    
                    if (content && content.data) {
                        dataLayerSU.push({
                            "event": "AeroinformEvent_78_1",
                            "eventCategory": "ab_test",
                            "eventAction": "load_orgigin_service",
                            "eventLabel": "paid_meal",
                            "customdimension5": "B"
                        });
                    }
                }
            })();
        }

        clearInterval(wait_for_hash);
    }, 1000);
})();
