document.addEventListener("DOMContentLoaded", function(){
    
    buttons();

    function buttons(){

        var search_button = document.getElementById('search-button');
        search_button.addEventListener('click', searchData);

        async function searchData(event){
            event.preventDefault();
            const apptd = document.getElementById('search').value;

            fetch('/search_data_server1', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    apptid_b: apptd
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
                console.error('Error: /search_data_server1', error);
            });
        }
    }
    

});

module.exports = searchData