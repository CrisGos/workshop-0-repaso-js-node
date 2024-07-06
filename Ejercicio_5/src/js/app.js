const products = [
    { id: 1, name: 'Laptop', category: 'Electronics', price: 1500, stock: 10 },
    { id: 2, name: 'Smartphone', category: 'Electronics', price: 800, stock: 20 },
    { id: 3, name: 'Headphones', category: 'Electronics', price: 100, stock: 30 },
    { id: 4, name: 'T-shirt', category: 'Clothing', price: 20, stock: 50 },
    { id: 5, name: 'Jeans', category: 'Clothing', price: 50, stock: 40 },
    { id: 6, name: 'Sneakers', category: 'Clothing', price: 80, stock: 30 },
    { id: 7, name: 'Backpack', category: 'Accessories', price: 40, stock: 25 },
    { id: 8, name: 'Watch', category: 'Accessories', price: 60, stock: 20 },
    { id: 9, name: 'Sunglasses', category: 'Accessories', price: 30, stock: 35 }
];

const tbody = document.getElementById('tbody');

document.getElementById('load-products').addEventListener('click', () => {
    displayPosts(products);
});

document.getElementById('sum-products').addEventListener('click', () => {
    totalPrice(products);
});

document.getElementById('verify-av').addEventListener('click', () => {
    verifyAvailable(products);
});

document.getElementById('load-list').addEventListener('click', () => {
    createList(products);
});



const filterOption = document.getElementById('filter-option');
filterOption.addEventListener('change', async () => {
    const category = filterOption.value;
    InfoFiltered(category)
})

document.getElementById('search-product').addEventListener('click', () => {
    const wordToSearch = document.getElementById('search-by').value;
    InfoFound(wordToSearch)
})


const displayPosts = (products) => {
    tbody.innerHTML = '';
    products.forEach(product => {
        tbody.innerHTML += `
        <tr>
            <td scope="col">${product.id}</td>
            <td scope="col">${product.category}</td>
            <td scope="col">${product.name}</td>
            <td scope="col">$${product.price}</td>
            <td scope="col">${product.stock}</td>
        </tr>
        `;
    });
};


const totalPrice = (products) => {
    tbody.innerHTML = '';
    const total = products.reduce((accumulator, product) => accumulator + product.price, 0);
    console.log('Precio total de todos los productos:', total);
    const totalView = document.createElement('p');
    totalView.textContent = `Precio total de todos los productos: $${total}`;
    tbody.appendChild(totalView);
}


const InfoFiltered = (word) => {
    console.log(word)
    const resultsFiltered = products.filter((product) => product.category === word)
    console.log(resultsFiltered)
    displayPosts(resultsFiltered)
}


const InfoFound = (wordToSearch) => {
    if (wordToSearch) {
        resultsFound = products.filter((product) => product.name.includes(wordToSearch));
        console.log(resultsFound)
        displayPosts(resultsFound)
    }
}

const verifyAvailable = (products) => {
    const allAvailable = products.every(product => product.stock > 0);
    if (allAvailable) {
        const Available = document.createElement('p');
        Available.textContent = 'Todos los productos están disponibles.';
        tbody.appendChild(Available);
        console.log('Todos los productos están disponibles.');
    } else {
        const Available = document.createElement('p');
        Available.textContent = 'No todos los productos están disponibles.';
        tbody.appendChild(Available);
        console.log('No todos los productos están disponibles.');
    }
}


const createList = (products) => {
    const productNames = products.map(product => product.name);
    const list = document.createElement('p');
    list.textContent = `Lista de nombres de productos:, ${productNames}`;
    tbody.appendChild(list);
    console.log('Lista de nombres de productos:', productNames);
}

