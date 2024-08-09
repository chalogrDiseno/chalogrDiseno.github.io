document.addEventListener('DOMContentLoaded', function() {
    const productsContainer = document.getElementById('products-container');

    function renderProducts(products) {
        productsContainer.innerHTML = ''; // Clear any existing content

        products.forEach((product, index) => {
            const styleClass = index % 2 === 0 ? 'style1' : 'style2';
            const productElement = document.createElement('section');
            productElement.classList.add('wrapper', 'spotlight', styleClass);

            // Construct the HTML for the product with initial image src
            productElement.innerHTML = `
                <div class="inner">
                    <a href="${product.link}" class="image">
                        <img id="product-image-${index}" src="${product.image}" alt="${product.title}">
                    </a>
                    <div class="content">
                        <h2 class="major">${product.title}</h2>
                        <p>${product.description}</p>
                        <a href="${product.link}" class="special">Ver producto</a>
                    </div>
                </div>
            `;

            productsContainer.appendChild(productElement);

            const imgElement = document.getElementById(`product-image-${index}`);
            imgElement.onerror = function() {
                console.error('Failed to load image:', product.image);
                this.src = 'https://via.placeholder.com/300?text=Image+Not+Available'; // Fallback image URL
            };

            imgElement.onload = function() {
                console.log('Image loaded successfully:', product.image);
            };
        });
    }

    function loadProductsFromFirebase() {
        const dbRef = firebase.database().ref('products'); // Correct reference to Firebase
        dbRef.once('value', (snapshot) => {
            const products = snapshot.val() || [];
            renderProducts(Object.values(products)); // Render products retrieved from Firebase
        }, (error) => {
            console.error('Error fetching products from Firebase:', error);
        });
    }

    function checkExpiration() {
        const urlParams = new URLSearchParams(window.location.search);
        const expires = urlParams.get('expires');
        if (expires && Date.now() > parseInt(expires)) {
            alert('This link has expired.');
            window.location.href = 'index.html';
        } else {
            loadProductsFromFirebase();
        }
    }

    checkExpiration();
});
