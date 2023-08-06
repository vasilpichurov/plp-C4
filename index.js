const menuIcon = document.querySelector('.menu-icon');
const navMenu = document.querySelector('.nav-menu');
const currentCategory = document.querySelector('.current-category')
const productList = document.querySelector('.js-product-grid')
const closeBtnBurgerMenu = document.querySelector('.close-btn')
const dropdownSort = document.querySelector('.select-dropdown-menu')
const dropdownSortDesktop = document.querySelector('.js-select-dropdown-menu-desktop')
const filterBtn = document.querySelector('.filter-icon')
const filterSection = document.querySelector('.filter-container')
const btnFilterClose = document.querySelector('.btn-close')
const filterXbutton = document.querySelector('.filter-close-btn')


const minPriceInput = document.getElementById('min-price');
const maxPriceInput = document.getElementById('max-price');
const minPriceInputDesktop = document.getElementById('min-price-desktop');
const maxPriceInputDesktop = document.getElementById('max-price-desktop');

const filterColorCheckboxes = document.querySelectorAll('.color-filter')

const applyFiltersBtn = document.querySelector('.apply-filters')
const applyFiltersBtnDesktop = document.querySelector('.js-apply-filters-desktop')

const loadMoreBtn = document.querySelector('.load-more-btn')
const navLinks = document.querySelectorAll('.nav-menu a');
const navLinksDesktop = document.querySelectorAll('.categories-desktop a');

let loadedProducts = [];
let allMensProducts = [];
let allWomensProducts = [];
let allChildrensProducts = [];

let filteredProducts = [];

menuIcon.addEventListener('click', () => {
  navMenu.classList.toggle('show');
  document.body.classList.add('fixed-position')
});



// Close the menu when a link is clicked
closeBtnBurgerMenu.addEventListener('click', ()=>{
    navMenu.classList.toggle('show');
    document.body.classList.remove('fixed-position')
})

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('show');
    if(link.innerHTML === 'Mens'){
        productList.innerHTML = ''
        currentCategory.innerHTML = "Mens"
        loadedProducts = []
        displayMensCategory()
        loadMoreBtn.disabled = false;
        
    } else if(link.innerHTML === 'Womens'){
        loadedProducts = []
        productList.innerHTML = ''
        currentCategory.innerHTML = "Womens"
        // console.log(loadedProducts)
        
        displayWomensCategory()
        loadMoreBtn.disabled = false;
    } else if(link.innerHTML === 'Childrens'){
        productList.innerHTML = ''
        currentCategory.innerHTML = "Childrens"
        loadedProducts = []
        displayChildrenCategory()
        loadMoreBtn.disabled = false;
    }
  });
});

navLinksDesktop.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('show');
      if(link.innerHTML === 'Mens'){
          productList.innerHTML = ''
          currentCategory.innerHTML = "Mens"
          loadedProducts = []
          displayMensCategory()
          loadMoreBtn.disabled = false;
          
      } else if(link.innerHTML === 'Womens'){
          loadedProducts = []
          productList.innerHTML = ''
          currentCategory.innerHTML = "Womens"
          // console.log(loadedProducts)
          
          displayWomensCategory()
          loadMoreBtn.disabled = false;
      } else if(link.innerHTML === 'Childrens'){
          productList.innerHTML = ''
          currentCategory.innerHTML = "Childrens"
          loadedProducts = []
          displayChildrenCategory()
          loadMoreBtn.disabled = false;
      }
    });
  });


// filter logic
filterBtn.addEventListener('click', () => {
    filterSection.classList.toggle('show');
    document.body.classList.add('fixed-position')
});

btnFilterClose.addEventListener('click', () => {
    filterSection.classList.remove('show');
    document.body.classList.remove('fixed-position')
})

filterXbutton.addEventListener('click', () => {
    filterSection.classList.remove('show');
    document.body.classList.remove('fixed-position')
})

function setupFilterEventListeners() {
    minPriceInput.addEventListener('onchange', applyFilters);
    maxPriceInput.addEventListener('onchange', applyFilters);

    filterColorCheckboxes.forEach(checkbox =>{
        checkbox.addEventListener('change', applyFilters);
    })
}

function applyFilters() {
    const minPrice = parseFloat(minPriceInput.value) || 0;
    const maxPrice = parseFloat(maxPriceInput.value) || Number.POSITIVE_INFINITY;

    const checkedColorCheckboxes = Array.from(filterColorCheckboxes)
                                        .filter(checkbox => checkbox.checked)
                                        .map(checkbox => checkbox.value);
    
    const filteredProducts = loadedProducts.filter(product => {
        const priceMatch = product.price >= minPrice && product.price <= maxPrice;
        const colorMatch = checkedColorCheckboxes.length === 0 || checkedColorCheckboxes.includes(product.color);
        
        return colorMatch && priceMatch;
    });
    
    displayProducts(filteredProducts);
}

// add event listener for filter products
applyFiltersBtn.addEventListener('click', ()=>{
    setupFilterEventListeners();
    filterSection.classList.remove('show');
    document.body.classList.remove('fixed-position')
})


applyFiltersBtnDesktop.addEventListener('click', ()=>{
    setupFilterEventListenersDesktop();
    document.body.classList.remove('fixed-position')
})








// fetch data from json
function fetchAllProducts(){
    fetch('products.json')
    .then(response => response.json())
    .then(data =>{
        data.mens.forEach((product) =>{
            allMensProducts.push(product)
        })
        data.womens.forEach((product) =>{
            allWomensProducts.push(product)
        })
        data.children.forEach((product) =>{
            allChildrensProducts.push(product)
        })
    })
}
fetchAllProducts()

function displayMensCategory(){
    allMensProducts.forEach((product, index) =>{
        if(index < 5){
            loadedProducts.push(product)
            const productItem = `
            <div class="product-tile">
                <img src="${product.image}" alt="Product Image">
                <h2 class="product-title">${product.name}</h2>
                <p class="product-description">${product.description}</p>
                <div class="row">
                    <span class="product-price">${product.price} $</span>
                    <button class="add-to-cart">Add to Cart</button>
                </div>
            </div>
            `
            productList.innerHTML += productItem
        }
    })
}

function initialFetch(){
    fetch('products.json')
    .then(response => response.json())
    .then(data => {
      data.mens.forEach((product, index) =>{
        if(index < 5){
                loadedProducts.push(product)
                // console.log(product)
                const productItem = `
                <div class="product-tile">
                    <img src="${product.image}" alt="Product Image">
                    <h2 class="product-title">${product.name}</h2>
                    <p class="product-description">${product.description}</p>
                    <div class="row">
                        <span class="product-price">${product.price} $</span>
                        <button class="add-to-cart">Add to Cart</button>
                    </div>
                </div>
                `
                productList.innerHTML += productItem
            }
        })
    })
    .catch(error => {
      console.error('Error loading products:', error);
    });
}
initialFetch()

function displayWomensCategory(){
    allWomensProducts.forEach((product, index) =>{
        if(index < 5){
            loadedProducts.push(product)
            // console.log(product)
            const productItem = `
            <div class="product-tile">
                <img src="${product.image}" alt="Product Image">
                <h2 class="product-title">${product.name}</h2>
                <p class="product-description">${product.description}</p>
                <div class="row">
                    <span class="product-price">${product.price} $</span>
                    <button class="add-to-cart">Add to Cart</button>
                </div>
            </div>
            `
            productList.innerHTML += productItem
        }
    })
}

function displayChildrenCategory(){
    allChildrensProducts.forEach((product, index) =>{
        if(index < 5){
        loadedProducts.push(product)
        // console.log(product)
        const productItem = `
        <div class="product-tile">
            <img src="${product.image}" alt="Product Image">
            <h2 class="product-title">${product.name}</h2>
            <p class="product-description">${product.description}</p>
            <div class="row">
                <span class="product-price">${product.price} $</span>
                <button class="add-to-cart">Add to Cart</button>
            </div>
        </div>
        `
        productList.innerHTML += productItem
        }
    })
}




function applySorting() {
    const selectedValue = dropdownSort.value;
    console.log(selectedValue)
    if (selectedValue === 'alphabetical-AZ') {
      // Sort products alphabetically by name
      loadedProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if(selectedValue === 'alphabetical-ZA'){
        loadedProducts.sort((a, b) => b.name.localeCompare(a.name));
    } else if(selectedValue === 'priceAscending'){
        loadedProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if(selectedValue === 'priceDescending'){
        loadedProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }
    
    // Update the product list with sorted products
    updateProductList();
}
dropdownSort.addEventListener('change', applySorting);
dropdownSortDesktop.addEventListener('change', applySorting);

function updateProductList(){
    productList.innerHTML = ''
     // Add each product to the product list
    loadedProducts.forEach(product => {
        
        const productItem = `
            <div class="product-tile">
                <img src="${product.image}" alt="Product Image">
                <h2 class="product-title">${product.name}</h2>
                <p class="product-description">${product.description}</p>
                <span class="product-price">${product.price} $</span>
                <button class="add-to-cart">Add to Cart</button>
            </div>
            `
            productList.innerHTML += productItem
  });
}


function displayProducts(products) {
    // console.log(products)
    productList.innerHTML = '';
  
    products.forEach(product => {
        const productItem = `
        <div class="product-tile">
            <img src="${product.image}" alt="Product Image">
            <h2 class="product-title">${product.name}</h2>
            <p class="product-description">${product.description}</p>
            <div class="row">
                <span class="product-price">${product.price} $</span>
                <button class="add-to-cart">Add to Cart</button>
            </div>
        </div>
        `
        productList.innerHTML += productItem
    });
}

function createProductElement(product) {
    // console.log(product)
    productList.innerHTML += `
    <div class="product-tile">
        <img src="${product.image}" alt="Product Image">
        <h2 class="product-title">${product.name}</h2>
        <p class="product-description">${product.description}</p>
        <div class="row">
            <span class="product-price">${product.price} $</span>
            <button class="add-to-cart">Add to Cart</button>
        </div>
    </div>
    `;

  }

function loadMoreProducts(){
    const productsToShow = 5;
    
    for(let i=loadedProducts.length; i < (loadedProducts.length + productsToShow); i++){
        
        if(currentCategory.innerHTML === "Mens"){
            if(i < allMensProducts.length){
                
                createProductElement(allMensProducts[i])
            }else {
                loadMoreBtn.disabled = true; // Hide the button when no more products are available
                break;
            }
        } else if(currentCategory.innerHTML === 'Womens'){
            if(i < allWomensProducts.length){
                createProductElement(allWomensProducts[i])
            }else {
                loadMoreBtn.disabled = true; // Hide the button when no more products are available
                break;
            }
        } else if(currentCategory.innerHTML === 'Childrens'){
            if(i < allChildrensProducts.length){
                createProductElement(allChildrensProducts[i])
            }else {
                loadMoreBtn.disabled = true; // Hide the button when no more products are available
                break;
            }
        }
    }
}

// Load more products when the "Load More" button is clicked
loadMoreBtn.addEventListener('click', loadMoreProducts);



