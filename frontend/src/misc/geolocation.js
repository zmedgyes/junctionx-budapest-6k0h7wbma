export async function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position)=>{
                    resolve({ lat: position.coords.latitude, lng: position.coords.longitude});
                },
                (err) => {
                    //reject(err);
                    resolve({ lat: 49.111, lng: 19.234});
                }
            );
        } else {
            //reject(new Error("Geolocation is not supported by this browser."));
            resolve({ lat: 49.111, lng: 19.234 });
        }
    });
}