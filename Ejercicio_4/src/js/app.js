let data
const fetchPosts = () => {
    fetch('https://api.escuelajs.co/api/v1/products')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(posts => {
            data = posts
            console.log(posts)
            displayPosts(posts);
        })
        .catch(error => {
            displayError(error);
        });
};

const displayPosts = (posts) => {
    const tbody = document.getElementById('tbodyt');
    tbody.innerHTML = '';
    posts.forEach(post => {
        tbody.innerHTML += `
        <tr>
            <td scope="col">${post.id}</td>
            <td scope="col">${post.category.name}</td>
            <td scope="col">${post.title}</td>
            <td scope="col">$${post.price}</td>
            <td scope="col"><img src=${post.images[0]} width="100px" alt="${post.title}"></td>
            <td scope="col">${post.description}</td>
        </tr>
        `;
    });
}

const InfoFiltered = (word) => {
    console.log(word)
    const resultsFiltered = data.filter((post) => post.category.name === word)
    console.log(resultsFiltered)
    displayPosts(resultsFiltered)
}

const InfoFound = (wordToSearch) => {
    if (wordToSearch) {
        resultsFound = data.filter((post) => post.title.includes(wordToSearch));
        console.log(resultsFound)
        displayPosts(resultsFound)
        
    }
}


const displayError = (error) => {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = `Error: ${error.message}`;
};

const filterOption = document.getElementById('filter-option');
filterOption.addEventListener('change', async () => {
    const category = filterOption.value;
    InfoFiltered(category)
})

document.getElementById('search-product').addEventListener('click', () => {
    const wordToSearch = document.getElementById('search-by').value;
    InfoFound(wordToSearch)
})

fetchPosts()