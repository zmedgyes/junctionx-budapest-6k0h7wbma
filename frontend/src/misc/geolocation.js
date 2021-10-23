export async function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position)=>{
                    resolve({ lat: position.coords.latitude, lng: position.coords.longitude});
                },
                (err) => {
                    reject(err);
                }
            );
        } else {
            reject(new Error("Geolocation is not supported by this browser."));
        }
    });
}