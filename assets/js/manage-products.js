document.addEventListener('DOMContentLoaded', function() {
    const productForm = document.getElementById('product-form');
    const productLinksContainer = document.getElementById('product-links');
    const addProductButton = document.getElementById('add-product');
    const removeAllButton = document.getElementById('remove-all-products');
    const linkForm = document.getElementById('link-form');
    const generatedLinkContainer = document.getElementById('generated-link');

    let products = JSON.parse(localStorage.getItem('products')) || [];

    function renderProductLinks() {
        productLinksContainer.innerHTML = '';
        products.forEach((product, index) => {
            const container = document.createElement('div');
            container.classList.add('product-input');
            container.dataset.index = index;
            container.innerHTML = `
                <input type="text" name="product-title-${index}" value="${product.title}" placeholder="Product ${index + 1} Title" required />
                <input type="text" name="product-link-${index}" value="${product.link}" placeholder="Product ${index + 1} Link" required />
                <input type="text" name="product-image-${index}" value="${product.image}" placeholder="Product ${index + 1} Image URL" required />
                <textarea name="product-description-${index}" placeholder="Product ${index + 1} Description" required>${product.description}</textarea>
                <button type="button" class="remove-product" data-index="${index}">Remove</button>
            `;
            productLinksContainer.appendChild(container);
        });

        // Attach event listeners to the remove buttons
        document.querySelectorAll('.remove-product').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                console.log('Removing product at index:', index);
                products = products.filter((_, i) => i !== index);
                saveProducts();
                renderProductLinks();
            });
        });
    }

    function saveProducts() {
        console.log('Saving products:', products);
        localStorage.setItem('products', JSON.stringify(products));
        renderProductLinks();
    }

    productForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const inputs = productLinksContainer.querySelectorAll('.product-input');
        products = Array.from(inputs).map((input, index) => ({
            title: input.querySelector(`input[name="product-title-${index}"]`).value,
            link: input.querySelector(`input[name="product-link-${index}"]`).value,
            image: input.querySelector(`input[name="product-image-${index}"]`).value,
            description: input.querySelector(`textarea[name="product-description-${index}"]`).value
        }));
        saveProducts();
        alert('Products updated successfully!');
    });

    addProductButton.addEventListener('click', function() {
        console.log('Adding new product');
        products.push({
            title: '',
            link: '',
            image: '',
            description: ''
        });
        renderProductLinks();
    });

    removeAllButton.addEventListener('click', function() {
        console.log('Removing all products');
        products = [];
        saveProducts();
    });

    linkForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const duration = parseInt(document.getElementById('link-duration').value);
        const expirationTime = Date.now() + duration * 60 * 1000; // Duration in milliseconds
        const link = `${window.location.origin}/index.html?expires=${expirationTime}`;
        generatedLinkContainer.innerHTML = `<a href="${link}">${link}</a>`;
    });

    

    renderProductLinks();
});
