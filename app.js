const map = L.map("map").setView(
    [13.736717, 100.523186],
    6
);

L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        attribution: "&copy; OpenStreetMap contributors"
    }
).addTo(map);


function forestStyle(feature) {
    return {
        color: "#14532d",
        weight: 1,
        fillColor: "#22c55e",
        fillOpacity: 0.45
    };
}


function forestPopup(feature, layer) {

    const p = feature.properties;

    layer.bindPopup(function () {

        const center = layer.getBounds().getCenter();

        return `
            <div class="popup">

                <h3 style="text-align: center;">
                    ป่าสงวนแห่งชาติ
                </h3>
<div class="popup-divider"></div>

                <div class="popup-item">

                    <img
                        src="assets/icons/location.svg"
                        alt=""
                    >

                    <div>
                        <span>พิกัด</span>

                        <strong>
                            Latitude: ${center.lat.toFixed(6)}<br>
                            Longitude: ${center.lng.toFixed(6)}
                        </strong>
                    </div>

                </div>


                <div class="popup-item">

                    <img
                        src="assets/icons/tree.svg"
                        alt=""
                    >

                    <div>
                        <span>ชื่อ</span>

                        <strong>
                            ${p["ชื่อ"] ?? "-"}
                        </strong>
                    </div>

                </div>


                <div class="popup-item">

                    <img
                        src="assets/icons/province.svg"
                        alt=""
                    >

                    <div>
                        <span>จังหวัด</span>

                        <strong>
                            ${p["จังหวัด"] ?? "-"}
                        </strong>
                    </div>

                </div>


                <div class="popup-item">

                    <img
                        src="assets/icons/rai.svg"
                        alt=""
                    >

                    <div>
                        <span>พื้นที่ (ไร่)</span>

                        <strong>
                            ${p["พื้นที่ (ไร่)"] ?? "-"}
                        </strong>
                    </div>

                </div>

            </div>
        `;
    });
}


fetch("data/nrf.geojson")
    .then(response => {

        if (!response.ok) {
            throw new Error(
                "ไม่สามารถโหลดข้อมูล GeoJSON ได้"
            );
        }

        return response.json();
    })

    .then(data => {

        const forestLayer = L.geoJSON(
            data,
            {
                style: forestStyle,
                onEachFeature: forestPopup
            }
        ).addTo(map);

        map.fitBounds(
            forestLayer.getBounds()
        );

    })

    .catch(error => {

        console.error(error);

        alert(
            "ไม่สามารถโหลดข้อมูลป่าสงวนได้"
        );

    });