const checkList = document.querySelectorAll('.item #listen');
console.log(checkList);

checkList.forEach(box => {
    box.addEventListener('click', () => {
        const index = box.getAttribute("class"); // This might need to be adjusted based on your HTML structure
        const url = '/box';
        console.log("index>> help ", index);
        const data = { index: index };

        fetch('/box', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), // Send the data object, not index directly
        })
        .then(response => {
            console.log(response);
            if (!response.ok) {
                throw new Error('Network response was not ok', index);
            }
            // box.classList.add('kire'); 
            window.location.reload()
            return response.json(); // Parse response as JSON
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
        });

    })
})
