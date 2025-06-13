// Daftar produk
const products = {
  rosella: {
    name: "Teh Rosella",
    price: 25000,
    image: "images/produk-rosella.png",
    description: "Teh Rosella terbuat dari kelopak bunga rosella..."
  },
  chamomile: {
    name: "Teh Chamomile",
    price: 28000,
    image: "images/produk-chamomile.png",
    description: "Teh Chamomile dikenal karena efek menenangkannya..."
  },
  telang: {
    name: "Teh Bunga Telang",
    price: 22000,
    image: "images/produk-telang.png",
    description: "Teh Bunga Telang memiliki warna biru alami..."
  },
  lavender: {
    name: "Teh Lavender",
    price: 30000,
    image: "images/produk-lavender.png",
    description: "Teh Lavender memberikan aroma yang menenangkan..."
  },
  mawar: {
    name: "Teh Mawar",
    price: 27000,
    image: "images/produk-mawar.png",
    description: "Teh Mawar memiliki aroma yang harum..."
  },
  krisan: {
    name: "Teh Krisan",
    price: 24000,
    image: "images/produk-krisan.png",
    description: "Teh Krisan dikenal dengan khasiatnya..."
  },
  blimbingwuluh: {
    name: "Teh Bunga Blimbing Wuluh",
    price: 23000,
    image: "images/produk-bunga blimbing wuluh.png",
    description: "Teh Bunga Blimbing Wuluh memiliki rasa segar..."
  },
  melati: {
    name: "Teh Melati",
    price: 26000,
    image: "images/produk-melati.png",
    description: "Teh Melati dengan aroma bunga yang lembut..."
  },
  hibiscus: {
    name: "Teh Bunga Sepatu",
    price: 25000,
    image: "images/produk-hibiscus.png",
    description: "Teh Bunga Sepatu kaya akan vitamin C..."
  },
  dandelion: {
    name: "Teh Dandelion",
    price: 29000,
    image: "images/produk-dandelion.png",
    description: "Teh Dandelion membantu detoksifikasi hati..."
  },
  sakura: {
    name: "Teh Sakura",
    price: 31000,
    image: "images/produk-sakura.png",
    description: "Teh Sakura memberikan aroma bunga yang lembut..."
  },
  mekarchina: {
    name: "Teh Mekar China",
    price: 33000,
    image: "images/produk-mekar-china.png",
    description: "Teh Mekar China adalah teh seni yang mekar..."
  },
  peony: {
    name: "Teh Peony",
    price: 26000,
    image: "images/produk-peony.png",
    description: "Teh Peony memiliki aroma floral yang elegan..."
  },
  lotus: {
    name: "Teh Lotus",
    price: 30000,
    image: "images/produk-lotus.png",
    description: "Teh Lotus memberikan aroma yang menenangkan..."
  },
  lily: {
    name: "Teh Lily",
    price: 28000,
    image: "images/produk-lily.png",
    description: "Teh Lily memiliki rasa lembut dan manis..."
  }
};

// Fungsi Cart
function getCart() {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(productId, quantity) {
  const cart = getCart();
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ id: productId, quantity });
  }

  saveCart(cart);
  alert(`${products[productId].name} telah ditambahkan ke keranjang!`);
}

function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== productId);
  saveCart(cart);
  window.location.reload();
}

function updateCartQuantity(productId, quantity) {
  const cart = getCart();
  const item = cart.find(item => item.id === productId);

  if (item) {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      item.quantity = quantity;
      saveCart(cart);
    }
  }
  window.location.reload();
}

function calculateTotal() {
  const cart = getCart();
  return cart.reduce((total, item) => {
    const product = products[item.id];
    return total + (product.price * item.quantity);
  }, 0);
}

function formatPrice(price) {
  return `Rp ${price.toLocaleString('id-ID')}`;
}

function clearCart() {
  localStorage.removeItem('cart');
}






function confirmOrder() {
  const cart = getCart();
  if (cart.length === 0) {
    alert("Keranjang kosong!");
    return;
  }

  const name = document.getElementById('shipping-name').value;
  const address = document.getElementById('shipping-address').value;
  const phone = document.getElementById('shipping-phone').value;

  if (!name || !address || !phone) {
    alert("Lengkapi data pengiriman!");
    return;
  }

  const newTransaction = {
    items: cart,
    shipping: { name, address, phone },
    total: calculateTotal(),
    date: new Date().toISOString()
  };

  const history = JSON.parse(localStorage.getItem('checkoutHistory')) || [];
  history.push(newTransaction);
  localStorage.setItem('checkoutHistory', JSON.stringify(history));

  alert("Pesanan Anda berhasil dikonfirmasi!");
  clearCart();
  window.location.href = "index.html";
}

