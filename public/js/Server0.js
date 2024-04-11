document.addEventListener("DOMContentLoaded", function(){

    buttons();

    function buttons(){
        var submit_button = document.getElementById('submit-button');
        submit_button.addEventListener('click', insertData);

        var search_button = document.getElementById('search-button');
        search_button.addEventListener('click', searchData);

        var delete_button = document.getElementById('delete-button');
        delete_button.addEventListener('click', deleteData);

        var edit_button = document.getElementById('edit-button');
        edit_button.addEventListener('click', editData);

        function insertData(event) {
            event.preventDefault();
            const apptid = document.getElementById('appt_id').value;
            const pxid = document.getElementById('patient_id').value;
            const RegionName = document.getElementById('region').value;
            
            fetch('/insert_data_server0', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    apptid_b: apptid,
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
                console.log(html);
                document.getElementById('appointmentForm').reset();
                location.reload();
                buttons();
            })
            .catch(error => {
                console.error('Error: /insert_data_server0', error);
            });
        }

        function searchData(event){
            event.preventDefault();
            const apptid = document.getElementById('search').value;

            fetch('/search_data_server0', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    apptid_b: apptid
                }),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                document.getElementById('searchForm').reset();
                document.body.innerHTML = html;
                buttons();
            })
            .catch(error => {
                console.error('Error: /search_data_server0', error);
            });
        }

        function deleteData(event){
            event.preventDefault();
            const apptid = document.getElementById('delete_appt_id').value;
            console.log("apptid: ",  apptid);


            fetch('/delete_data_server0', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    apptid_b: apptid
                }),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                document.body.innerHTML = html;
                location.reload();
                buttons();
            })
            .catch(error => {
                console.error('Error: /delete_data_server0', error);
            });
        }

        function editData(event){
            event.preventDefault();
            const apptid = document.getElementById('edit_appt_id').value;
            const pxid = document.getElementById('edit_patient_id').value;
            const RegionName = document.getElementById('edit_region').value;

            fetch('/edit_data_server0', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    apptid_b: apptid,
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
                console.log(html);
                document.getElementById('appointmentForm').reset();
                location.reload();
                buttons();
            })
            .catch(error => {
                console.error('Error: /edit_data_server0', error);
            });
        }
    }

    

});