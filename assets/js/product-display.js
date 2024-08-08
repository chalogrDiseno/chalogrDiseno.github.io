document.addEventListener('DOMContentLoaded', function() {
    const productsContainer = document.getElementById('products-container');
    const products = JSON.parse(localStorage.getItem('products')) || [];

    function renderProducts() {
        productsContainer.innerHTML = ''; // Clear any existing content

        products.forEach((product, index) => {
            const styleClass = (index % 2 === 0) ? 'style1' : 'style2';
            const productElement = document.createElement('section');
            productElement.classList.add('wrapper', 'spotlight', styleClass);

            // Debugging: Check that the image URL is being used correctly
            console.log('Rendering product:', product.title);
            console.log('Image URL:', product.image);

            // Construct the HTML for the product with initial image src
            productElement.innerHTML = `
                <div class="inner">
                    <a href="${product.link}" class="image">
                        <img id="product-image-${index}" src="${product.image}" alt="${product.title}" />
                    </a>
                    <div class="content">
                        <h2 class="major">${product.title}</h2>
                        <p>${product.description}</p>
                        <a href="${product.link}" class="special">Ver producto</a>
                    </div>
                </div>
            `;

            // Append the constructed product to the container
            productsContainer.appendChild(productElement);

            // Add error handling for image loading
            const imgElement = document.getElementById(`product-image-${index}`);
            imgElement.onerror = function() {
                console.error('Failed to load image:', product.image);
                this.src = 'https://via.placeholder.com/300?text=Image+Not+Available'; // Fallback image URL
            };

            // Add a check to verify if the image URL is accessible
            imgElement.onload = function() {
                console.log('Image loaded successfully:', product.image);
            };
        });
    }

    function checkExpiration() {
        const urlParams = new URLSearchParams(window.location.search);
        const expires = urlParams.get('expires');
        if (expires && Date.now() > parseInt(expires)) {
            alert('This link has expired.');
            window.location.href = 'index.html';
        } else {
            renderProducts();
        }
    }

    checkExpiration();
});