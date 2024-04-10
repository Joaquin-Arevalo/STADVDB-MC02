document.addEventListener("DOMContentLoaded", function(){
    var submit_button = document.getElementById('submit-button');
    submit_button.addEventListener('click', insertData);

    var search_button = document.getElementById('search-button');
    search_button.addEventListener('click', searchData);

    function insertData(event) {
        event.preventDefault();
        const pxid = document.getElementById('patient_id').value;
        const RegionName = document.getElementById('region').value;
        
        fetch('/insert_data_server0', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                pxid_b: pxid,
                RegionName_b: RegionName
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            // Handle the response as needed
            console.log(html);
            // Optionally, redirect to another page
            document.getElementById('appointmentForm').reset();//check later
            window.location.href = '/server0';
        })
        .catch(error => {
            console.error('Error: /insert_data_server0', error);
        });
    }

    function searchData(event){
        event.preventDefault();
        const pxid = document.getElementById('search').value;

        fetch('/search_data_server0', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                pxid_b: pxid
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            document.getElementById('searchForm').reset();//check later
            document.body.innerHTML = html;
        })
        .catch(error => {
            console.error('Error: /search_data_server0', error);
        });
    }

});