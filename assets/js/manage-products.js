import { database } from '../../firebase.js';
import { ref, get, set, remove, onValue } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js';

document.addEventListener('DOMContentLoaded', function() {
    const productForm = document.getElementById('product-form');
    const productLinksContainer = document.getElementById('product-links');
    const addProductButton = document.getElementById('add-product');
    const removeAllButton = document.getElementById('remove-all-products');
    const linkForm = document.getElementById('link-form');
    const generatedLinkContainer = document.getElementById('generated-link');

    const productsRef = ref(database, 'products');
    let products = [];

    function loadProducts() {
        get(productsRef).then((snapshot) => {
            if (snapshot.exists()) {
                products = snapshot.val() || [];
                renderProductLinks();
            } else {
                console.log("No products available");
            }
        }).catch((error) => {
            console.error('Error loading products:', error);
        });
    }

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

        document.querySelectorAll('.remove-product').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                products.splice(index, 1);
                saveProducts();
            });
        });
    }

    function saveProducts() {
        set(productsRef, products)
            .then(() => {
                console.log('Products saved successfully.');
                renderProductLinks();
            })
            .catch(error => {
                console.error('Error saving products:', error);
            });
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
        products.push({
            title: '',
            link: '',
            image: '',
            description: ''
        });
        renderProductLinks();
    });

    removeAllButton.addEventListener('click', function() {
        remove(productsRef)
            .then(() => {
                products = [];
                renderProductLinks();
            })
            .catch(error => {
                console.error('Error removing products:', error);
            });
    });

    linkForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const duration = parseInt(document.getElementById('link-duration').value);
        const expirationTime = Date.now() + duration * 60 * 1000; // Duration in milliseconds
        const link = `${window.location.origin}/index.html?expires=${expirationTime}`;
        generatedLinkContainer.innerHTML = `<a href="${link}">${link}</a>`;
    });

    loadProducts();
});