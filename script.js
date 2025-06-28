// Cart badge update
function updateCartBadge() {
  const badge = document.getElementById('cart-badge');
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let count = cart.reduce((sum, item) => sum + item.quantity, 0);
  badge.textContent = count;
}

// Product Data (with your images)
const products = [
  {
    id: 1,
    name: 'Organic Puree',
    desc: 'Nutritious blend of organic fruits and veggies.',
    price: 4.99,
    image: 'https://img.drz.lazcdn.com/static/pk/p/57363cec7be3b738051a2736e853018f.jpg_720x720q80.jpg',
    category: 'puree'
  },
  {
    id: 2,
    name: 'Veggie Bites',
    desc: 'Delicious finger food for little hands.',
    price: 5.99,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQblJx-hVFfaqUZT5smNk9UltWkCTwjYjZ97Q&s',
    category: 'bites'
  },
  {
    id: 3,
    name: 'Fruit Medley',
    desc: 'Sweet and healthy snack for any time.',
    price: 3.99,
    image: 'https://images.squarespace-cdn.com/content/v1/62d854c18f242012fa13016b/03d1ac3e-c2b4-497d-8fd4-1aaea9672428/berry-salad.jpeg',
    category: 'snack'
  },
  {
    id: 4,
    name: 'Berry Oatmeal',
    desc: 'Wholesome oats with organic berries.',
    price: 6.49,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9gBjTJnLa6A4Kpv69N86A6KuSULFho_oC7w&s',
    category: 'puree'
  },
  {
    id: 5,
    name: 'Carrot Stars',
    desc: 'Crunchy carrot-shaped snacks.',
    price: 4.49,
    image: 'https://www.shutterstock.com/image-photo/fresh-carrots-sliced-star-shape-260nw-748497733.jpg',
    category: 'bites'
  },
  {
    id: 6,
    name: 'Green Veggie Mash',
    desc: 'A mash of peas, spinach, and broccoli.',
    price: 5.29,
    image: 'https://www.organix.com/sites/hero_organix/files/inline-images/Green%20Bean%20Mash_Step%206_2.jpg',
    category: 'puree'
  },
  {
    id: 7,
    name: 'Apple Cinnamon Bites',
    desc: 'Tasty apple and cinnamon snack.',
    price: 4.99,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR50k7gRLJxGDsAHoC2UuJScfxhpKusHkpVbQ&s',
    category: 'bites'
  },
  {
    id: 8,
    name: 'Banana Bliss',
    desc: 'Creamy banana puree for babies.',
    price: 3.79,
    image: 'https://orioudh.com/cdn/shop/files/banana-bliss-by-ministry-of-gourmand-unisex-perfume-edp-100-ml-ministry-of-gourmand-308628-1146183791.jpg?v=1741745023',
    category: 'puree'
  },
  {
    id: 9,
    name: 'Sweet Potato Puffs',
    desc: 'Light and airy sweet potato snacks.',
    price: 4.59,
    image: 'https://www.alexiafoods.com/sites/g/files/qyyrlu521/files/images/products/sweet-potato-puffs-47056.png',
    category: 'snack'
  },
  {
    id: 10,
    name: 'Mango Tango',
    desc: 'Tropical mango snack for toddlers.',
    price: 5.19,
    image: 'https://www.britvic.com/media/dsoodyus/mango-tango-editions-britvic.jpg?width=1200&height=600&v=1da52a70276b100',
    category: 'snack'
  }
];

// Render products on products.html or product.html (grid)
function renderProducts(productList) {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;
  grid.innerHTML = '';
  productList.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-id', product.id);
    card.innerHTML = `
      <a href="product.html?id=${product.id}" class="product-img-link">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
      </a>
      <h3>${product.name}</h3>
      <p>${product.desc}</p>
      <span class="price">$${product.price.toFixed(2)}</span>
      <button class="btn add-to-cart-btn" data-id="${product.id}"><i class="fas fa-cart-plus"></i> Add to Cart</button>
    `;
    grid.appendChild(card);
  });
}

// Add to Cart logic
function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const product = products.find(p => p.id === productId);
  if (!product) return;
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartBadge();
}

// Event listeners for Add to Cart
function setupAddToCartButtons() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;
  grid.addEventListener('click', function(e) {
    if (e.target.classList.contains('add-to-cart-btn')) {
      const id = parseInt(e.target.getAttribute('data-id'));
      addToCart(id);
      e.target.textContent = 'Added!';
      setTimeout(() => {
        e.target.innerHTML = '<i class="fas fa-cart-plus"></i> Add to Cart';
      }, 1000);
    }
  });
}

// --- Product Search and Category Filter ---
function setupProductFilters() {
  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');
  if (!searchInput || !categoryFilter) return;

  function filterProducts() {
    const search = searchInput.value.trim().toLowerCase();
    const category = categoryFilter.value;
    let filtered = products.filter(product => {
      const matchesSearch =
        product.name.toLowerCase().includes(search) ||
        product.desc.toLowerCase().includes(search);
      const matchesCategory =
        category === 'all' || product.category === category;
      return matchesSearch && matchesCategory;
    });
    renderProducts(filtered);
    setupAddToCartButtons();
  }

  searchInput.addEventListener('input', filterProducts);
  categoryFilter.addEventListener('change', filterProducts);
}

// Render cart items on cart.html
function renderCart() {
  const cartItemsDiv = document.getElementById('cartItems');
  const cartSummaryDiv = document.getElementById('cartSummary');
  if (!cartItemsDiv || !cartSummaryDiv) return;
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart.length === 0) {
    cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
    cartSummaryDiv.innerHTML = '';
    return;
  }
  let total = 0;
  cartItemsDiv.innerHTML = '';
  cart.forEach(item => {
    const subtotal = item.price * item.quantity;
    total += subtotal;
    const itemDiv = document.createElement('div');
    itemDiv.className = 'cart-item';
    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-details">
        <div class="cart-item-title">${item.name}</div>
        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
        <div class="cart-item-qty">
          <label>Qty:</label>
          <input type="number" min="1" value="${item.quantity}" data-id="${item.id}" class="cart-qty-input">
        </div>
      </div>
      <button class="cart-item-remove" data-id="${item.id}">Remove</button>
      <div class="cart-item-subtotal">$${subtotal.toFixed(2)}</div>
    `;
    cartItemsDiv.appendChild(itemDiv);
  });
  cartSummaryDiv.innerHTML = `
    Total: $${total.toFixed(2)}
    <br>
    <button class="checkout-btn" id="checkoutBtn">Proceed to Checkout</button>
  `;
}

// Cart event listeners
function setupCartEvents() {
  const cartItemsDiv = document.getElementById('cartItems');
  const cartSummaryDiv = document.getElementById('cartSummary');
  if (!cartItemsDiv || !cartSummaryDiv) return;
  cartItemsDiv.addEventListener('input', function(e) {
    if (e.target.classList.contains('cart-qty-input')) {
      const id = parseInt(e.target.getAttribute('data-id'));
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const item = cart.find(i => i.id === id);
      if (item) {
        let qty = parseInt(e.target.value);
        if (isNaN(qty) || qty < 1) qty = 1;
        item.quantity = qty;
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
        updateCartBadge();
      }
    }
  });
  cartItemsDiv.addEventListener('click', function(e) {
    if (e.target.classList.contains('cart-item-remove')) {
      const id = parseInt(e.target.getAttribute('data-id'));
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart = cart.filter(i => i.id !== id);
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
      updateCartBadge();
    }
  });
  cartSummaryDiv.addEventListener('click', function(e) {
    if (e.target.id === 'checkoutBtn') {
      window.location.href = 'checkout.html';
    }
  });
}

// Render cart summary on checkout.html
function renderCheckoutCartSummary() {
  const summaryDiv = document.getElementById('checkoutCartSummary');
  if (!summaryDiv) return;
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart.length === 0) {
    summaryDiv.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }
  let total = 0;
  let itemsHtml = cart.map(item => {
    const subtotal = item.price * item.quantity;
    total += subtotal;
    return `<li class="checkout-summary-item">
      <span class="checkout-summary-name">${item.name}</span>
      <span class="checkout-summary-qty">x${item.quantity}</span>
      <span class="checkout-summary-price">$${item.price.toFixed(2)}</span>
      <span class="checkout-summary-price">$${subtotal.toFixed(2)}</span>
    </li>`;
  }).join('');
  summaryDiv.innerHTML = `
    <div class="checkout-summary-title">Your Order</div>
    <ul class="checkout-summary-list">${itemsHtml}</ul>
    <div class="checkout-summary-total">Total: $${total.toFixed(2)}</div>
  `;
}

// Checkout form logic
function setupCheckoutForm() {
  const form = document.getElementById('checkoutForm');
  const paymentMethod = document.getElementById('paymentMethod');
  const cardFields = document.getElementById('cardFields');
  if (!form) return;

  // Toggle card fields
  paymentMethod.addEventListener('change', function() {
    if (this.value === 'card') {
      cardFields.style.display = 'block';
    } else {
      cardFields.style.display = 'none';
    }
  });

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    // Basic validation
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const address = form.address.value.trim();
    const contact = form.contact.value.trim();
    const payMethod = form.paymentMethod.value;
    if (!name || !email || !address || !contact) {
      alert('Please fill in all required fields.');
      return;
    }
    if (payMethod === 'card') {
      const cardNumber = form.cardNumber.value.trim();
      const cardExpiry = form.cardExpiry.value.trim();
      const cardCVC = form.cardCVC.value.trim();
      if (!cardNumber || !cardExpiry || !cardCVC) {
        alert('Please fill in all card details.');
        return;
      }
      if (!/^\d{16,19}$/.test(cardNumber.replace(/\s/g, ''))) {
        alert('Invalid card number.');
        return;
      }
      if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) {
        alert('Invalid expiry format. Use MM/YY.');
        return;
      }
      if (!/^\d{3,4}$/.test(cardCVC)) {
        alert('Invalid CVC.');
        return;
      }
    }
    // Generate order ID
    const orderId = 'TNY' + Date.now().toString().slice(-6) + Math.floor(Math.random()*1000);
    localStorage.setItem('orderId', orderId);
    localStorage.removeItem('cart');
    window.location.href = 'thankyou.html';
  });
}

// Thank you page logic
function setupThankYouPage() {
  const orderIdSpan = document.getElementById('orderId');
  const thankYouBox = document.querySelector('.thankyou-box');
  if (orderIdSpan) {
    const orderId = localStorage.getItem('orderId') || 'N/A';
    orderIdSpan.textContent = orderId;
    localStorage.removeItem('orderId');
  }
  if (thankYouBox) {
    thankYouBox.querySelector('h1').innerHTML = '✅ Thanks for Using Usama Dev Application!';
    const p = thankYouBox.querySelectorAll('p');
    if (p[0]) p[0].innerHTML = 'Your order will be delivered soon. 😊';
  }
}

// Contact form logic
function setupContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = form.contactName.value.trim();
    const email = form.contactEmail.value.trim();
    const message = form.contactMessage.value.trim();
    if (!name || !email || !message) {
      alert('Please fill in all fields.');
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      alert('Please enter a valid email.');
      return;
    }
    alert('Thank you for contacting us! We will get back to you soon.');
    form.reset();
  });
}

// Product detail/grid logic for product.html
function renderProductDetail() {
  const detailDiv = document.getElementById('productDetail');
  if (!detailDiv) return;
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));
  const product = products.find(p => p.id === id);
  if (!product) {
    detailDiv.innerHTML = '<p>Product not found.</p>';
    return;
  }
  detailDiv.innerHTML = `
    <div class="product-detail-img">
      <img src="${product.image}" alt="${product.name}">
    </div>
    <div class="product-detail-info">
      <div class="product-detail-title">${product.name}</div>
      <div class="product-detail-desc">${product.desc}</div>
      <div class="product-detail-price">$${product.price.toFixed(2)}</div>
      <button class="product-detail-add" id="detailAddToCart"><i class="fas fa-cart-plus"></i> Add to Cart</button>
    </div>
  `;
  document.getElementById('detailAddToCart').addEventListener('click', function() {
    addToCart(product.id);
    this.textContent = 'Added!';
    setTimeout(() => {
      this.innerHTML = '<i class="fas fa-cart-plus"></i> Add to Cart';
    }, 1000);
  });
}

function showProductPageContent() {
  const grid = document.getElementById('productsGrid');
  const detailDiv = document.getElementById('productDetail');
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (id && detailDiv) {
    if (grid) grid.style.display = 'none';
    detailDiv.style.display = 'block';
    renderProductDetail();
  } else if (grid) {
    if (detailDiv) detailDiv.style.display = 'none';
    grid.style.display = 'flex';
    renderProducts(products);
    setupAddToCartButtons();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  // Navbar shadow on scroll
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  // Animate CTA button
  const ctaBtn = document.querySelector('.cta-btn');
  if (ctaBtn) {
    ctaBtn.addEventListener('mouseenter', () => {
      ctaBtn.style.transform = 'scale(1.07)';
    });
    ctaBtn.addEventListener('mouseleave', () => {
      ctaBtn.style.transform = '';
    });
  }
  if (document.getElementById('productsGrid')) {
    setupProductFilters();
    renderProducts(products);
    setupAddToCartButtons();
  }
  if (document.getElementById('cartItems')) {
    renderCart();
    setupCartEvents();
  }
  if (document.getElementById('checkoutCartSummary')) {
    renderCheckoutCartSummary();
  }
  setupCheckoutForm();
  setupThankYouPage();
  setupContactForm();
  if (window.location.pathname.includes('product.html')) {
    showProductPageContent();
  }
}); 