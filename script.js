/* ===================================================================
   Rakhi's Homemade – Bakery Business Management System
   script.js – Complete Application Logic
   =================================================================== */

'use strict';

// ─── DATA DEFINITIONS ────────────────────────────────────────────────────────

const DEFAULT_MATERIALS = [
  // Packaging
  { id:'m1',  name:'Cake Box – 500 gm',        category:'Packaging Materials',           unit:'pcs',   img:'Product Photos/Cake Box.jfif' },
  { id:'m2',  name:'Cake Box – 1 kg',           category:'Packaging Materials',           unit:'pcs',   img:'Product Photos/Cake Box.jfif' },
  { id:'m3',  name:'Cake Box – 2 kg',           category:'Packaging Materials',           unit:'pcs',   img:'Product Photos/Cake Box Large.jfif' },
  { id:'m4',  name:'Large Bag',                 category:'Packaging Materials',           unit:'pcs',   img:'Product Photos/Large Carry Bag.jfif' },
  { id:'m5',  name:'Extra Large Bag',           category:'Packaging Materials',           unit:'pcs',   img:'Product Photos/Extra Large Bag.jfif' },
  { id:'m6',  name:'Bake & Serve Box – 250 gm', category:'Packaging Materials',           unit:'pcs',   img:'Product Photos/Bake & Serve Box.jfif' },
  { id:'m7',  name:'Bake & Serve Box – 500 gm', category:'Packaging Materials',           unit:'pcs',   img:'Product Photos/Bake & Serve Box.jfif' },
  { id:'m8',  name:'Cookie Box – 250 gm',       category:'Packaging Materials',           unit:'pcs',   img:'Product Photos/Cookie Box.jfif' },
  { id:'m9',  name:'Cookie Box – 500 gm',       category:'Packaging Materials',           unit:'pcs',   img:'Product Photos/Cookie Box.jfif' },
  { id:'m10', name:'Brownie Box – 250 gm',      category:'Packaging Materials',           unit:'pcs',   img:'Product Photos/Brownie Box.webp' },
  { id:'m11', name:'Brownie Box – 500 gm',      category:'Packaging Materials',           unit:'pcs',   img:'Product Photos/Brownie Box.webp' },
  { id:'m12', name:'Logo Stickers',             category:'Packaging Materials',           unit:'pcs',   img:'Product Photos/Stickers.jpg' },
  // Dairy
  { id:'m13', name:'Mithai Mate – 400 gm',      category:'Dairy Products',                unit:'tin',   img:'Product Photos/Mithai Mate.jpg' },
  { id:'m14', name:'Mithai Mate – 7 Litre',     category:'Dairy Products',                unit:'can',   img:'Product Photos/Mithai Mate.jpg' },
  { id:'m15', name:'Butter – 500 gm',           category:'Dairy Products',                unit:'pack',  img:'Product Photos/Delicious Butter.jpg' },
  { id:'m16', name:'Amul Fresh Cream – 1 Litre',category:'Dairy Products',                unit:'litre', img:'Product Photos/Amul Fresh Cream.jpeg' },
  // Baking
  { id:'m17', name:'Maida – 1 kg',              category:'Baking Ingredients',            unit:'kg',    img:'Product Photos/Maida.jpg' },
  { id:'m18', name:'Vanilla Essence – 1 Litre', category:'Baking Ingredients',            unit:'litre', img:'Product Photos/Vanilla Essence.jpg' },
  { id:'m19', name:'Baking Powder',             category:'Baking Ingredients',            unit:'gm',    img:'Product Photos/Baking Soda.jpg' },
  { id:'m20', name:'Baking Soda',               category:'Baking Ingredients',            unit:'gm',    img:'Product Photos/Baking Soda.jpg' },
  // Dry Fruits
  { id:'m21', name:'Dates',                     category:'Dry Fruits',                    unit:'kg',    img:'Product Photos/Dates.jfif' },
  { id:'m22', name:'Walnut',                    category:'Dry Fruits',                    unit:'kg',    img:'Product Photos/Walnut.jfif' },
  { id:'m23', name:'Almond',                    category:'Dry Fruits',                    unit:'kg',    img:'Product Photos/Almond.jfif' },
  { id:'m24', name:'Cashew Nut',                category:'Dry Fruits',                    unit:'kg',    img:'Product Photos/Cashew Nut.jfif' },
  { id:'m25', name:'Pistachio',                 category:'Dry Fruits',                    unit:'kg',    img:'Product Photos/Almond.jfif' },
  // Chocolate
  { id:'m26', name:'Morde Chocolate – 500 gm',  category:'Chocolate & Baking Products',   unit:'pack',  img:'Product Photos/CP16 Chocolate.jpg' },
  { id:'m27', name:'Chocolate Chips – 1 kg',    category:'Chocolate & Baking Products',   unit:'kg',    img:'Product Photos/Chocolate Chips.jfif' },
  { id:'m28', name:'Nutella',                   category:'Chocolate & Baking Products',   unit:'jar',   img:'Product Photos/Nutella.jfif' },
  { id:'m29', name:'Hazelnut Spread',           category:'Chocolate & Baking Products',   unit:'jar',   img:'Product Photos/Hazelnut Spread.jfif' },
  { id:'m30', name:'Biscoff Spread',            category:'Chocolate & Baking Products',   unit:'jar',   img:'Product Photos/Biscoff Spread.jfif' },
  { id:'m31', name:'Biscuits',                  category:'Chocolate & Baking Products',   unit:'pack',  img:'Product Photos/Biscuits.jfif' },
];

const DEFAULT_PRODUCTS = [
  // Healthy Cakes
  ...['Mawa Badam','Rich Beet Root','Honey Oat','Coffee Caramel','Cocoa Walnut Chia Seed','Chocolate Walnut','Banana Walnut','Bundt Chocolate','Wheat & Jaggery','Dates & Walnut','Rose Pistachio','Dry Fruit Mix','Orange, Carrot & Fig'].map((name,i)=>({
    id:`p${i+1}`, name, category:'Healthy Cakes', emoji:'🎂', description:`Freshly baked ${name} healthy cake, made with wholesome ingredients.`,
    prices:{ '500gm':0, '1kg':0, '2kg':0 }, hasSize:true
  })),
  // Cookies
  ...['Whole Wheat','Nutty Fantasy','Chocolate Chips','Red Velvet','Oat Crunch','Coffee Caramel','Classic Vanilla','Pistachio Mix','Stuffed Nutella','Oreo Crunch','Double Chocolate Chip'].map((name,i)=>({
    id:`p${i+14}`, name, category:'Cookies', emoji:'🍪', description:`Crispy, homemade ${name} cookies baked fresh.`,
    price:0, hasSize:false
  })),
  // Cupcakes & Muffins
  ...['Chocolate Chip','Smooth Vanilla','Fruit & Nut','Cookies & Cream','Royal Fudge','Hazelnut Crunch','Honey Oat','Mawa Honey Almond','Banana Walnut','Carrot & Fig','Oreo Magic','Coffee Caramel','Dates & Walnut'].map((name,i)=>({
    id:`p${i+25}`, name, category:'Cupcakes & Muffins', emoji:'🧁', description:`Fluffy, delicious ${name} cupcake / muffin.`,
    price:0, hasSize:false
  })),
  // Brownies
  ...['Classic Walnut Brownie','Cocoa Walnut Chia Seed','Rich Chocolate','Nutella Nirvana'].map((name,i)=>({
    id:`p${i+38}`, name, category:'Brownies', emoji:'🍫', description:`Fudgy, rich ${name} brownie made with love.`,
    price:0, hasSize:false
  })),
];

const MATERIAL_CATEGORIES = ['All','Packaging Materials','Dairy Products','Baking Ingredients','Dry Fruits','Chocolate & Baking Products'];
const CATEGORY_EMOJIS = { 'All':'🧺','Packaging Materials':'📦','Dairy Products':'🥛','Baking Ingredients':'🌾','Dry Fruits':'🌰','Chocolate & Baking Products':'🍫','Other':'📦' };
const PRODUCT_CATEGORIES = ['All','Healthy Cakes','Cookies','Cupcakes & Muffins','Brownies'];
const PRODUCT_CAT_SVGS = {
  'All': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`,
  'Healthy Cakes': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><path d="M12 3c0 0-4 2-4 6h8c0-4-4-6-4-6z"/><path d="M8 9h8"/><rect x="4" y="13" width="16" height="2" rx="1"/><path d="M9 3.5C9 3.5 9 2 12 2s3 1.5 3 1.5"/></svg>`,
  'Cookies': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="9" cy="9" r="1" fill="currentColor"/><circle cx="14" cy="8" r="1" fill="currentColor"/><circle cx="8" cy="14" r="1" fill="currentColor"/><circle cx="14" cy="14" r="1" fill="currentColor"/><circle cx="11" cy="12" r="1" fill="currentColor"/></svg>`,
  'Cupcakes & Muffins': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c-1.5 0-3 1-3 2.5C9 6 10.5 7 12 7s3-1 3-2.5C15 3 13.5 2 12 2z"/><path d="M7 10h10l-1.5 8H8.5L7 10z"/><path d="M5 10c0-1.1 3.1-2 7-2s7 .9 7 2"/></svg>`,
  'Brownies': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="12" rx="2"/><path d="M3 13h18"/><path d="M10 8V6a2 2 0 0 1 4 0v2"/><path d="M8 13v7"/><path d="M16 13v7"/></svg>`,
};

// ─── STORAGE HELPERS ─────────────────────────────────────────────────────────

const LS = {
  get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch(e) { console.error(e); } },
  remove(k) { localStorage.removeItem(k); }
};

// ─── APP STATE ────────────────────────────────────────────────────────────────

const app = (() => {

  let state = {
    materials: [],
    products: [],
    purchases: [],   // [{ id, date, items:[{matId,qty,price,unit,name,emoji}], total }]
    sales: [],       // [{ id, date, productId, productName, category, size, qty, unitPrice, total }]
    cart: [],        // [{ matId, name, emoji, unit, qty, price }]
    activePage: 'dashboard',
    activeMaterialCategory: 'All',
    activeProductCategory: 'All',
    dashRange: 'month',
    salesRange: 'month',
    financeRange: 'month',
    customFrom: null,
    customTo: null,
    theme: 'light',
    currentPurchaseMat: null,
    charts: {},
    pendingConfirm: null,
    currentProductDetail: null,
  };

  // ─── INIT ─────────────────────────────────────────────────────────

  function init() {
    loadFromStorage();
    applyTheme(state.theme);
    setupNav();
    setupEventListeners();
    renderMaterials();
    // renderProducts(); // Products section temporarily disabled
    showPage('dashboard');
    updateDashboard();
    updateSales();
    updateFinance();
    document.getElementById('dashDate').textContent = new Date().toLocaleDateString('en-IN',{weekday:'short',day:'numeric',month:'long',year:'numeric'});
  }

  function loadFromStorage() {
    const storedMats = LS.get('rh_materials');
    // Migrate: re-seed if stored data still uses old emoji field instead of img
    state.materials = (storedMats && storedMats[0] && !storedMats[0].emoji)
      ? storedMats
      : JSON.parse(JSON.stringify(DEFAULT_MATERIALS));
    state.products   = LS.get('rh_products')   || JSON.parse(JSON.stringify(DEFAULT_PRODUCTS));
    state.purchases  = LS.get('rh_purchases')  || [];
    state.sales      = LS.get('rh_sales')      || [];
    state.theme      = LS.get('rh_theme')      || 'light';
  }

  function save() {
    LS.set('rh_materials', state.materials);
    LS.set('rh_products', state.products);
    LS.set('rh_purchases', state.purchases);
    LS.set('rh_sales', state.sales);
    LS.set('rh_theme', state.theme);
  }

  // ─── NAVIGATION ───────────────────────────────────────────────────

  function setupNav() {
    document.querySelectorAll('.nav-item').forEach(btn => {
      btn.addEventListener('click', () => showPage(btn.dataset.page));
    });
  }

  function showPage(page) {
    state.activePage = page;
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
    document.getElementById(`page-${page}`).classList.add('active');
    document.querySelector(`.nav-item[data-page="${page}"]`).classList.add('active');

    if (page === 'dashboard') updateDashboard();
    if (page === 'sales') updateSales();
    if (page === 'finance') updateFinance();
  }

  // ─── THEME ────────────────────────────────────────────────────────

  function applyTheme(theme) {
    state.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    const icon = document.getElementById('themeIcon');
    if (icon) icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    const settingsToggle = document.getElementById('themeToggleSettings');
    if (settingsToggle) settingsToggle.checked = theme === 'dark';
    save();
    // Redraw charts on theme change
    updateDashboard();
    updateFinance();
  }

  // ─── EVENT LISTENERS ──────────────────────────────────────────────

  function setupEventListeners() {
    // Theme
    document.getElementById('themeToggle').addEventListener('click', () => applyTheme(state.theme === 'dark' ? 'light' : 'dark'));
    document.getElementById('themeToggleSettings').addEventListener('change', e => applyTheme(e.target.checked ? 'dark' : 'light'));

    // Dashboard filter
    document.querySelectorAll('.filter-btn:not([data-ctx])').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn:not([data-ctx])').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.dashRange = btn.dataset.range;
        updateDashboard();
      });
    });

    // Sales filter
    document.querySelectorAll('.filter-btn[data-ctx="sales"]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn[data-ctx="sales"]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.salesRange = btn.dataset.range;
        updateSales();
      });
    });

    // Finance filter
    document.querySelectorAll('.filter-btn[data-ctx="finance"]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn[data-ctx="finance"]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.financeRange = btn.dataset.range;
        document.getElementById('customDatePicker').style.display = btn.dataset.range === 'custom' ? 'flex' : 'none';
        if (btn.dataset.range !== 'custom') updateFinance();
      });
    });

    document.getElementById('applyCustomDate').addEventListener('click', () => {
      state.customFrom = document.getElementById('customFrom').value;
      state.customTo = document.getElementById('customTo').value;
      updateFinance();
    });

    // Cart
    document.getElementById('cartFab').addEventListener('click', openCartModal);
    document.getElementById('closeCartModal').addEventListener('click', () => closeModal('cartModal'));
    document.getElementById('checkoutBtn').addEventListener('click', checkout);

    // Add Material
    document.getElementById('addMaterialBtn').addEventListener('click', () => openModal('addMaterialModal'));
    document.getElementById('closeAddMaterialModal').addEventListener('click', () => closeModal('addMaterialModal'));
    document.getElementById('saveNewMaterial').addEventListener('click', saveNewMaterial);

    // Purchase modal
    document.getElementById('closePurchaseModal').addEventListener('click', () => closeModal('purchaseModal'));
    document.getElementById('purchaseQty').addEventListener('input', updatePurchaseSubtotal);
    document.getElementById('purchasePrice').addEventListener('input', updatePurchaseSubtotal);
    document.getElementById('addToCartBtn').addEventListener('click', addToCart);

    // Sale modal
    document.getElementById('newSaleBtn').addEventListener('click', () => openModal('saleModal'));
    document.getElementById('closeSaleModal').addEventListener('click', () => closeModal('saleModal'));
    document.getElementById('salePrice').addEventListener('input', updateSaleTotalPreview);
    document.getElementById('saleQty').addEventListener('input', updateSaleTotalPreview);
    document.getElementById('saveSaleBtn').addEventListener('click', recordSale);

    // Edit sale modal
    document.getElementById('closeEditSaleModal').addEventListener('click', () => closeModal('editSaleModal'));
    document.getElementById('editSalePrice').addEventListener('input', updateEditSaleTotalPreview);
    document.getElementById('editSaleQty').addEventListener('input', updateEditSaleTotalPreview);
    document.getElementById('saveEditSaleBtn').addEventListener('click', saveEditSale);
    document.getElementById('deleteSaleBtn').addEventListener('click', deleteEditingSale);

    // Product detail
    document.getElementById('closeProductDetailModal').addEventListener('click', () => closeModal('productDetailModal'));
    document.getElementById('recordSaleFromDetail').addEventListener('click', () => {
      closeModal('productDetailModal');
      const p = state.currentProductDetail;
      if (p) {
        openModal('saleModal');
        setTimeout(() => {
          const sc = document.getElementById('saleCategory');
          sc.value = p.category;
          onSaleCategoryChange();
          setTimeout(() => {
            const sp = document.getElementById('saleProduct');
            sp.value = p.id;
            onSaleProductChange();
          }, 50);
        }, 50);
      }
    });

    // Material search
    document.getElementById('materialSearch').addEventListener('input', e => {
      renderMaterialCards(e.target.value.toLowerCase());
    });

    // Product search (disabled — Products section commented out)
    const productSearchEl = document.getElementById('productSearch');
    if (productSearchEl) {
      productSearchEl.addEventListener('input', e => {
        renderProductCards(e.target.value.toLowerCase());
      });
    }

    // Backup / Settings
    document.getElementById('backupBtn').addEventListener('click', downloadBackup);
    document.getElementById('downloadBackupBtn').addEventListener('click', downloadBackup);
    document.getElementById('uploadBackupBtn').addEventListener('click', () => document.getElementById('restoreFileInput').click());
    document.getElementById('restoreFileInput').addEventListener('change', restoreBackup);
    document.getElementById('downloadLedgerBtn').addEventListener('click', downloadLedger);
    document.getElementById('exportExcelBtn').addEventListener('click', exportExcel);
    document.getElementById('clearDataBtn').addEventListener('click', () => {
      confirm('Clear All Data', 'This will permanently delete all purchases, sales and settings. Are you sure?', () => {
        localStorage.clear();
        showToast('All data cleared');
        setTimeout(() => location.reload(), 1000);
      });
    });

    // Confirm modal
    document.getElementById('confirmCancel').addEventListener('click', () => {
      closeModal('confirmModal');
      state.pendingConfirm = null;
    });
    document.getElementById('confirmOk').addEventListener('click', () => {
      closeModal('confirmModal');
      if (state.pendingConfirm) { state.pendingConfirm(); state.pendingConfirm = null; }
    });
  }

  // ─── MODALS ───────────────────────────────────────────────────────

  function openModal(id) {
    document.getElementById(id).classList.add('open');
  }
  function closeModal(id) {
    document.getElementById(id).classList.remove('open');
  }
  function confirm(title, message, callback) {
    document.getElementById('confirmTitle').textContent = title;
    document.getElementById('confirmMessage').textContent = message;
    state.pendingConfirm = callback;
    openModal('confirmModal');
  }

  // ─── MATERIALS ────────────────────────────────────────────────────

  function renderMaterials() {
    const cats = MATERIAL_CATEGORIES;
    const catContainer = document.getElementById('materialCategories');
    catContainer.innerHTML = '';
    cats.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = `cat-chip${cat === state.activeMaterialCategory ? ' active' : ''}`;
      btn.innerHTML = `<span class="cat-emoji">${CATEGORY_EMOJIS[cat]||'📦'}</span>${cat}`;
      btn.addEventListener('click', () => {
        state.activeMaterialCategory = cat;
        catContainer.querySelectorAll('.cat-chip').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderMaterialCards(document.getElementById('materialSearch').value.toLowerCase());
      });
      catContainer.appendChild(btn);
    });
    renderMaterialCards('');
  }

  function renderMaterialCards(search = '') {
    const grid = document.getElementById('materialsGrid');
    let mats = state.materials;
    if (state.activeMaterialCategory !== 'All') mats = mats.filter(m => m.category === state.activeMaterialCategory);
    if (search) mats = mats.filter(m => m.name.toLowerCase().includes(search) || m.category.toLowerCase().includes(search));

    if (!mats.length) {
      grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><div class="empty-icon">🔍</div><p>No materials found</p></div>`;
      return;
    }

    grid.innerHTML = mats.map(m => {
      const stock = getPurchasedQty(m.id);
      const imgSrc = m.img || '';
      return `
      <div class="material-card" data-id="${m.id}">
        <div class="mat-img-wrap">
          <img class="mat-img" src="${imgSrc}" alt="${m.name}" onerror="this.parentElement.innerHTML='<div class=mat-img-placeholder><i class=\\'fa-solid fa-image\\'></i></div>'" />
        </div>
        <div class="mat-name">${m.name}</div>
        <div class="mat-cat">${m.category}</div>
        <div class="mat-stock">Stock: <span>${stock} ${m.unit}</span></div>
        <button class="mat-add-btn" onclick="app.openPurchaseModal('${m.id}')">+ Add to Cart</button>
      </div>`;
    }).join('');
  }

  function getPurchasedQty(matId) {
    let total = 0;
    state.purchases.forEach(p => {
      const item = p.items.find(i => i.matId === matId);
      if (item) total += Number(item.qty);
    });
    return parseFloat(total.toFixed(3));
  }

  function openPurchaseModal(matId) {
    const mat = state.materials.find(m => m.id === matId);
    if (!mat) return;
    state.currentPurchaseMat = mat;
    document.getElementById('purchaseModalTitle').textContent = `Add to Cart`;
    const imgSrc2 = mat.img || '';
    document.getElementById('purchaseMatPreview').innerHTML = `
      <div class="mat-img-wrap sm">
        <img class="mat-img" src="${imgSrc2}" alt="${mat.name}" onerror="this.parentElement.innerHTML='<div class=mat-img-placeholder><i class=\\'fa-solid fa-image\\'></i></div>'" />
      </div>
      <div class="material-preview-info">
        <div class="mat-name">${mat.name}</div>
        <div class="mat-cat">${mat.category} · ${mat.unit}</div>
      </div>`;
    document.getElementById('purchaseQty').value = '';
    document.getElementById('purchasePrice').value = '';
    document.getElementById('purchaseSubtotal').textContent = '₹0.00';
    openModal('purchaseModal');
  }

  function updatePurchaseSubtotal() {
    const qty = parseFloat(document.getElementById('purchaseQty').value) || 0;
    const price = parseFloat(document.getElementById('purchasePrice').value) || 0;
    document.getElementById('purchaseSubtotal').textContent = `₹${(qty * price).toFixed(2)}`;
  }

  function addToCart() {
    const mat = state.currentPurchaseMat;
    if (!mat) return;
    const qty = parseFloat(document.getElementById('purchaseQty').value);
    const price = parseFloat(document.getElementById('purchasePrice').value);
    if (!qty || qty <= 0) { showToast('Enter a valid quantity'); return; }
    if (!price || price < 0) { showToast('Enter a valid price'); return; }

    const existing = state.cart.find(c => c.matId === mat.id && c.price === price);
    if (existing) {
      existing.qty += qty;
    } else {
      state.cart.push({ matId: mat.id, name: mat.name, img: mat.img, unit: mat.unit, qty, price });
    }
    closeModal('purchaseModal');
    updateCartFab();
    showToast(`${mat.name} added to cart`);
  }

  function updateCartFab() {
    const fab = document.getElementById('cartFab');
    const count = document.getElementById('cartCount');
    if (state.cart.length > 0) {
      fab.style.display = 'flex';
      count.textContent = state.cart.length;
    } else {
      fab.style.display = 'none';
    }
  }

  function openCartModal() {
    renderCartItems();
    openModal('cartModal');
  }

  function renderCartItems() {
    const container = document.getElementById('cartItems');
    if (!state.cart.length) {
      container.innerHTML = `<div class="empty-state"><div class="empty-icon">🛒</div><p>Cart is empty</p></div>`;
      document.getElementById('cartTotal').textContent = '₹0.00';
      return;
    }
    let total = 0;
    container.innerHTML = state.cart.map((item, idx) => {
      const sub = item.qty * item.price;
      total += sub;
      const imgSrc3 = item.img || '';
      return `
      <div class="cart-item">
        <div class="mat-img-wrap xs">
          <img class="mat-img" src="${imgSrc3}" alt="${item.name}" onerror="this.parentElement.innerHTML='<div class=mat-img-placeholder xs><i class=\\'fa-solid fa-image\\'></i></div>'" />
        </div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-meta">${item.qty} ${item.unit} × ₹${item.price.toFixed(2)}</div>
        </div>
        <span class="cart-item-total">₹${sub.toFixed(2)}</span>
        <button class="cart-item-remove" onclick="app.removeFromCart(${idx})"><i class="fa-solid fa-trash"></i></button>
      </div>`;
    }).join('');
    document.getElementById('cartTotal').textContent = `₹${total.toFixed(2)}`;
  }

  function removeFromCart(idx) {
    state.cart.splice(idx, 1);
    renderCartItems();
    updateCartFab();
  }

  function checkout() {
    if (!state.cart.length) { showToast('Cart is empty'); return; }
    const total = state.cart.reduce((s, i) => s + i.qty * i.price, 0);
    const purchase = {
      id: `pur_${Date.now()}`,
      date: new Date().toISOString(),
      items: state.cart.map(c => ({ matId: c.matId, name: c.name, img: c.img, qty: c.qty, price: c.price, unit: c.unit })),
      total
    };
    state.purchases.push(purchase);
    state.cart = [];
    save();
    closeModal('cartModal');
    updateCartFab();
    renderMaterialCards(document.getElementById('materialSearch').value.toLowerCase());
    showToast(`Purchase saved – ₹${total.toFixed(2)}`);
    if (state.activePage === 'dashboard') updateDashboard();
    if (state.activePage === 'finance') updateFinance();
  }

  function saveNewMaterial() {
    const name = document.getElementById('newMatName').value.trim();
    const category = document.getElementById('newMatCategory').value;
    const unit = document.getElementById('newMatUnit').value.trim();
    if (!name) { showToast('Enter material name'); return; }
    if (!unit) { showToast('Enter unit'); return; }
    const id = `cm_${Date.now()}`;
    state.materials.push({ id, name, category, unit });
    save();
    closeModal('addMaterialModal');
    document.getElementById('newMatName').value = '';
    document.getElementById('newMatUnit').value = '';
    document.getElementById('newMatEmoji').value = '';
    renderMaterials();
    showToast(`${name} added`);
  }

  // ─── PRODUCTS ─────────────────────────────────────────────────────

  function renderProducts() {
    const cats = PRODUCT_CATEGORIES;
    const catContainer = document.getElementById('productCategories');
    catContainer.innerHTML = '';
    cats.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = `cat-chip${cat === state.activeProductCategory ? ' active' : ''}`;
      btn.innerHTML = `<span class="cat-svg-icon">${PRODUCT_CAT_SVGS[cat]||PRODUCT_CAT_SVGS['All']}</span>${cat}`;
      btn.addEventListener('click', () => {
        state.activeProductCategory = cat;
        catContainer.querySelectorAll('.cat-chip').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderProductCards(document.getElementById('productSearch').value.toLowerCase());
      });
      catContainer.appendChild(btn);
    });
    renderProductCards('');
  }

  function renderProductCards(search = '') {
    const grid = document.getElementById('productsGrid');
    let prods = state.products;
    if (state.activeProductCategory !== 'All') prods = prods.filter(p => p.category === state.activeProductCategory);
    if (search) prods = prods.filter(p => p.name.toLowerCase().includes(search) || p.category.toLowerCase().includes(search));

    if (!prods.length) {
      grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><div class="empty-icon">🔍</div><p>No products found</p></div>`;
      return;
    }

    grid.innerHTML = prods.map(p => {
      const priceStr = p.hasSize
        ? `From ₹${Math.min(...Object.values(p.prices).map(Number).filter(v=>v>0)) || '–'}`
        : `₹${p.price || '–'}`;
      return `
      <div class="product-card" onclick="app.openProductDetail('${p.id}')">
        <div class="product-cat-icon">${PRODUCT_CAT_SVGS[p.category]||PRODUCT_CAT_SVGS['All']}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-cat">${p.category}</div>
        <div class="product-price">${priceStr}</div>
      </div>`;
    }).join('');
  }

  function openProductDetail(productId) {
    const p = state.products.find(x => x.id === productId);
    if (!p) return;
    state.currentProductDetail = p;
    document.getElementById('productDetailTitle').textContent = p.name;
    let body = `
      <div class="product-detail-svg">${PRODUCT_CAT_SVGS[p.category]||PRODUCT_CAT_SVGS['All']}</div>
      <p class="product-detail-desc">${p.description}</p>
      <div style="font-size:12px;font-weight:600;color:var(--text-3);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;">${p.category}</div>`;
    if (p.hasSize) {
      body += `<div class="product-price-table">
        <div class="price-row"><span class="size">500 gm</span><span class="price">${p.prices['500gm'] ? '₹'+p.prices['500gm'] : 'Not set'}</span></div>
        <div class="price-row"><span class="size">1 kg</span><span class="price">${p.prices['1kg'] ? '₹'+p.prices['1kg'] : 'Not set'}</span></div>
        <div class="price-row"><span class="size">2 kg</span><span class="price">${p.prices['2kg'] ? '₹'+p.prices['2kg'] : 'Not set'}</span></div>
      </div>`;
    } else {
      body += `<div class="product-price-table">
        <div class="price-row"><span class="size">Selling Price</span><span class="price">${p.price ? '₹'+p.price : 'Not set'}</span></div>
      </div>`;
    }
    document.getElementById('productDetailBody').innerHTML = body;
    openModal('productDetailModal');
  }

  // ─── SALES ────────────────────────────────────────────────────────

  function onSaleCategoryChange() {
    const cat = document.getElementById('saleCategory').value;
    const productSelect = document.getElementById('saleProduct');
    const prods = state.products.filter(p => p.category === cat);
    productSelect.innerHTML = '<option value="">Select product…</option>' +
      prods.map(p => `<option value="${p.id}">${p.name}</option>`).join('');
    document.getElementById('saleSizeGroup').style.display = 'none';
    document.getElementById('salePrice').value = '';
    updateSaleTotalPreview();
  }

  function onSaleProductChange() {
    const id = document.getElementById('saleProduct').value;
    const p = state.products.find(x => x.id === id);
    if (!p) return;
    const sizeGroup = document.getElementById('saleSizeGroup');
    if (p.hasSize) {
      sizeGroup.style.display = 'flex';
      onSaleSizeChange();
    } else {
      sizeGroup.style.display = 'none';
      document.getElementById('salePrice').value = p.price || '';
    }
    updateSaleTotalPreview();
  }

  function onSaleSizeChange() {
    const id = document.getElementById('saleProduct').value;
    const size = document.getElementById('saleSize').value;
    const p = state.products.find(x => x.id === id);
    if (p && p.hasSize) {
      document.getElementById('salePrice').value = p.prices[size] || '';
    }
    updateSaleTotalPreview();
  }

  function updateSaleTotalPreview() {
    const price = parseFloat(document.getElementById('salePrice').value) || 0;
    const qty = parseFloat(document.getElementById('saleQty').value) || 0;
    document.getElementById('saleTotalPreview').textContent = `₹${(price * qty).toFixed(2)}`;
  }

  function recordSale() {
    const category = document.getElementById('saleCategory').value;
    const productId = document.getElementById('saleProduct').value;
    const unitPrice = parseFloat(document.getElementById('salePrice').value);
    const qty = parseFloat(document.getElementById('saleQty').value);
    if (!productId) { showToast('Select a product'); return; }
    if (!unitPrice || unitPrice <= 0) { showToast('Enter selling price'); return; }
    if (!qty || qty <= 0) { showToast('Enter quantity'); return; }

    const p = state.products.find(x => x.id === productId);
    const size = p && p.hasSize ? document.getElementById('saleSize').value : null;

    // Update product price
    if (p) {
      if (p.hasSize && size) p.prices[size] = unitPrice;
      else p.price = unitPrice;
    }

    const sale = {
      id: `sal_${Date.now()}`,
      date: new Date().toISOString(),
      productId,
      productName: p ? p.name : 'Unknown',
      category,
      size,
      qty,
      unitPrice,
      total: qty * unitPrice
    };
    state.sales.push(sale);
    save();
    closeModal('saleModal');
    document.getElementById('saleCategory').value = '';
    document.getElementById('saleProduct').innerHTML = '<option value="">Select product…</option>';
    document.getElementById('salePrice').value = '';
    document.getElementById('saleQty').value = '1';
    document.getElementById('saleSizeGroup').style.display = 'none';
    showToast(`Sale recorded – ₹${sale.total.toFixed(2)}`);
    if (state.activePage === 'sales') updateSales();
    if (state.activePage === 'dashboard') updateDashboard();
    if (state.activePage === 'finance') updateFinance();
  }

  // ─── EDIT / DELETE SALE ───────────────────────────────────────────

  let editingSaleId = null;

  function openEditSale(saleId) {
    const sale = state.sales.find(s => s.id === saleId);
    if (!sale) return;
    editingSaleId = saleId;
    document.getElementById('editSaleProductName').value = `${sale.productName}${sale.size ? ' ('+formatSize(sale.size)+')' : ''}`;
    document.getElementById('editSalePrice').value = sale.unitPrice;
    document.getElementById('editSaleQty').value = sale.qty;
    updateEditSaleTotalPreview();
    openModal('editSaleModal');
  }

  function updateEditSaleTotalPreview() {
    const price = parseFloat(document.getElementById('editSalePrice').value) || 0;
    const qty = parseFloat(document.getElementById('editSaleQty').value) || 0;
    document.getElementById('editSaleTotalPreview').textContent = `₹${(price * qty).toFixed(2)}`;
  }

  function saveEditSale() {
    const sale = state.sales.find(s => s.id === editingSaleId);
    if (!sale) return;
    const unitPrice = parseFloat(document.getElementById('editSalePrice').value);
    const qty = parseFloat(document.getElementById('editSaleQty').value);
    if (!unitPrice || unitPrice <= 0) { showToast('Enter selling price'); return; }
    if (!qty || qty <= 0) { showToast('Enter quantity'); return; }
    sale.unitPrice = unitPrice;
    sale.qty = qty;
    sale.total = unitPrice * qty;
    save();
    closeModal('editSaleModal');
    editingSaleId = null;
    showToast('Sale updated');
    refreshAllViews();
  }

  function deleteEditingSale() {
    if (!editingSaleId) return;
    confirm('Delete Sale', 'This will permanently remove this sale record. Continue?', () => {
      state.sales = state.sales.filter(s => s.id !== editingSaleId);
      save();
      closeModal('editSaleModal');
      editingSaleId = null;
      showToast('Sale deleted');
      refreshAllViews();
    });
  }

  function refreshAllViews() {
    if (state.activePage === 'sales') updateSales();
    if (state.activePage === 'dashboard') updateDashboard();
    if (state.activePage === 'finance') updateFinance();
  }

  function updateSales() {
    const { from, to } = getDateRange(state.salesRange);
    const filtered = filterByDate(state.sales, from, to);
    const revenue = filtered.reduce((s, x) => s + x.total, 0);
    const items = filtered.reduce((s, x) => s + x.qty, 0);
    document.getElementById('salesRevenue').textContent = `₹${revenue.toFixed(0)}`;
    document.getElementById('salesItemsSold').textContent = items;

    renderSalesList('salesList', filtered);

    const filteredPurchases = filterByDate(state.purchases, from, to);
    renderPurchaseHistory('salesPurchaseHistoryList', filteredPurchases);
  }

  function renderSalesList(elId, filtered) {
    const list = document.getElementById(elId);
    if (!list) return;
    if (!filtered.length) {
      list.innerHTML = `<div class="empty-state"><div class="empty-icon">📊</div><p>No sales in this period</p></div>`;
      return;
    }
    const sorted = [...filtered].sort((a,b) => new Date(b.date)-new Date(a.date));
    list.innerHTML = sorted.map(s => `
      <div class="transaction-item">
        <div class="tx-icon sale"><i class="fa-solid fa-bag-shopping"></i></div>
        <div class="tx-body">
          <div class="tx-name">${s.productName}${s.size ? ' ('+formatSize(s.size)+')' : ''}</div>
          <div class="tx-meta">${s.category} · Qty: ${s.qty} · ${formatDateTime(s.date)}</div>
        </div>
        <span class="tx-amount credit">+₹${s.total.toFixed(0)}</span>
        <button class="tx-edit-btn" onclick="app.openEditSale('${s.id}')" title="Edit sale"><i class="fa-solid fa-pen"></i></button>
      </div>`).join('');
  }

  // ─── FINANCE ──────────────────────────────────────────────────────

  function updateFinance() {
    const { from, to } = getDateRange(state.financeRange, state.customFrom, state.customTo);
    const filteredSales = filterByDate(state.sales, from, to);
    const filteredPurchases = filterByDate(state.purchases, from, to);

    const revenue = filteredSales.reduce((s, x) => s + x.total, 0);
    const expenses = filteredPurchases.reduce((s, x) => s + x.total, 0);
    const profit = revenue - expenses;
    const productsSold = filteredSales.reduce((s, x) => s + x.qty, 0);

    document.getElementById('finRevenue').textContent = `₹${revenue.toFixed(0)}`;
    document.getElementById('finExpenses').textContent = `₹${expenses.toFixed(0)}`;
    document.getElementById('finProductsSold').textContent = productsSold;
    document.getElementById('finPurchaseCount').textContent = filteredPurchases.length;
    document.getElementById('finProfit').textContent = `₹${profit.toFixed(0)}`;

    renderFinanceCharts(filteredSales, filteredPurchases);
    renderPurchaseHistory('purchaseHistoryList', filteredPurchases);
    renderSalesList('financeSalesList', filteredSales);
  }

  function renderPurchaseHistory(elId, purchases) {
    const list = document.getElementById(elId);
    if (!list) return;
    if (!purchases.length) {
      list.innerHTML = `<div class="empty-state"><div class="empty-icon">🛒</div><p>No purchases in this period</p></div>`;
      return;
    }
    const sorted = [...purchases].sort((a,b) => new Date(b.date)-new Date(a.date));
    list.innerHTML = sorted.map(p => `
      <div class="transaction-item">
        <div class="tx-icon purchase"><i class="fa-solid fa-cart-shopping"></i></div>
        <div class="tx-body">
          <div class="tx-name">${p.items.map(i=>i.name).join(', ').slice(0,40)}${p.items.length>1?'…':''}</div>
          <div class="tx-meta">${p.items.length} item(s) · ${formatDateTime(p.date)}</div>
        </div>
        <span class="tx-amount debit">-₹${p.total.toFixed(0)}</span>
      </div>`).join('');
  }

  // ─── DASHBOARD ────────────────────────────────────────────────────

  function updateDashboard() {
    const { from, to } = getDateRange(state.dashRange);
    const filteredSales = filterByDate(state.sales, from, to);
    const filteredPurchases = filterByDate(state.purchases, from, to);

    const revenue = filteredSales.reduce((s,x)=>s+x.total,0);
    const purchases = filteredPurchases.reduce((s,x)=>s+x.total,0);
    const itemsSold = filteredSales.reduce((s,x)=>s+x.qty,0);
    const profit = revenue - purchases;

    document.getElementById('dashRevenue').textContent = `₹${revenue.toFixed(0)}`;
    document.getElementById('dashPurchases').textContent = `₹${purchases.toFixed(0)}`;
    document.getElementById('dashItemsSold').textContent = itemsSold;
    document.getElementById('dashSalesCount').textContent = filteredSales.length;
    document.getElementById('dashProfit').textContent = `₹${profit.toFixed(0)}`;

    renderDashCharts(filteredSales, filteredPurchases);
    renderSalesList('dashSalesList', filteredSales);
    renderPurchaseHistory('dashPurchaseHistoryList', filteredPurchases);
  }

  // ─── CHARTS ───────────────────────────────────────────────────────

  function getChartColors() {
    const dark = document.documentElement.getAttribute('data-theme') === 'dark';
    return {
      grid: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
      text: dark ? '#AAAABD' : '#9999AA',
      brand: '#FF6B35',
      brandAlpha: 'rgba(255,107,53,0.15)',
      palette: ['#FF6B35','#2563EB','#16A34A','#7C3AED','#0891B2','#EA580C','#059669'],
    };
  }

  function destroyChart(id) {
    if (state.charts[id]) { state.charts[id].destroy(); delete state.charts[id]; }
  }

  function makeTrendData(items, dateKey='date') {
    const days = {};
    items.forEach(i => {
      const d = i[dateKey].slice(0,10);
      days[d] = (days[d]||0) + i.total;
    });
    const sorted = Object.entries(days).sort(([a],[b])=>a.localeCompare(b)).slice(-14);
    return { labels: sorted.map(([d])=>d.slice(5)), data: sorted.map(([,v])=>v) };
  }

  function renderDashCharts(sales, purchases) {
    const c = getChartColors();
    const opts = (title) => ({
      responsive: true, maintainAspectRatio: true,
      plugins: { legend:{display:false}, tooltip:{ callbacks:{ label: v=>`₹${v.raw.toFixed(0)}` } } },
      scales: { x:{ticks:{color:c.text,font:{size:10}},grid:{color:c.grid}}, y:{ticks:{color:c.text,font:{size:10},callback:v=>`₹${v}`},grid:{color:c.grid}} }
    });

    // Revenue Trend
    destroyChart('dashRev');
    const revTrend = makeTrendData(sales);
    const ctx1 = document.getElementById('chartRevenue').getContext('2d');
    state.charts['dashRev'] = new Chart(ctx1, { type:'line', data:{ labels:revTrend.labels, datasets:[{ data:revTrend.data, borderColor:c.brand, backgroundColor:c.brandAlpha, tension:0.4, fill:true, pointRadius:3 }] }, options:opts() });

    // Purchase Trend
    destroyChart('dashPur');
    const purTrend = makeTrendData(purchases);
    const ctx2 = document.getElementById('chartPurchases').getContext('2d');
    state.charts['dashPur'] = new Chart(ctx2, { type:'bar', data:{ labels:purTrend.labels, datasets:[{ data:purTrend.data, backgroundColor:'rgba(234,88,12,0.7)', borderRadius:4 }] }, options:opts() });

    // Product-wise Sales (Doughnut)
    destroyChart('dashProd');
    const prodMap = {};
    sales.forEach(s => { prodMap[s.productName] = (prodMap[s.productName]||0) + s.total; });
    const prodEntries = Object.entries(prodMap).sort(([,a],[,b])=>b-a).slice(0,6);
    const ctx3 = document.getElementById('chartProducts').getContext('2d');
    state.charts['dashProd'] = new Chart(ctx3, { type:'doughnut', data:{ labels:prodEntries.map(([k])=>k), datasets:[{ data:prodEntries.map(([,v])=>v), backgroundColor:c.palette }] }, options:{ responsive:true, maintainAspectRatio:true, plugins:{ legend:{position:'bottom', labels:{color:c.text,font:{size:10},boxWidth:12}} } } });

    // Expense Breakdown (categories)
    destroyChart('dashExp');
    const catMap = {};
    purchases.forEach(p => p.items.forEach(i => {
      const mat = state.materials.find(m=>m.id===i.matId);
      const cat = mat ? mat.category : 'Other';
      catMap[cat] = (catMap[cat]||0) + (i.qty * i.price);
    }));
    const catEntries = Object.entries(catMap);
    const ctx4 = document.getElementById('chartExpenses').getContext('2d');
    state.charts['dashExp'] = new Chart(ctx4, { type:'pie', data:{ labels:catEntries.map(([k])=>k), datasets:[{ data:catEntries.map(([,v])=>v), backgroundColor:c.palette }] }, options:{ responsive:true, maintainAspectRatio:true, plugins:{ legend:{position:'bottom', labels:{color:c.text,font:{size:9},boxWidth:10}} } } });

    // Monthly Comparison
    destroyChart('dashMon');
    const monthMap = {};
    state.sales.forEach(s => {
      const m = s.date.slice(0,7);
      monthMap[m] = (monthMap[m]||0) + s.total;
    });
    const monthEntries = Object.entries(monthMap).sort(([a],[b])=>a.localeCompare(b)).slice(-12);
    const ctx5 = document.getElementById('chartMonthly').getContext('2d');
    state.charts['dashMon'] = new Chart(ctx5, { type:'bar', data:{ labels:monthEntries.map(([k])=>formatMonth(k)), datasets:[{ label:'Revenue', data:monthEntries.map(([,v])=>v), backgroundColor:c.brand, borderRadius:6 }] }, options:{ responsive:true, maintainAspectRatio:true, plugins:{ legend:{display:false} }, scales:{ x:{ticks:{color:c.text,font:{size:10}},grid:{color:c.grid}}, y:{ticks:{color:c.text,font:{size:10},callback:v=>`₹${v}`},grid:{color:c.grid}} } } });
  }

  function renderFinanceCharts(sales, purchases) {
    const c = getChartColors();

    destroyChart('finRev');
    const revTrend = makeTrendData(sales);
    const fc1 = document.getElementById('finChartRevenue').getContext('2d');
    state.charts['finRev'] = new Chart(fc1, { type:'line', data:{ labels:revTrend.labels, datasets:[{ data:revTrend.data, borderColor:c.brand, backgroundColor:c.brandAlpha, tension:0.4, fill:true, pointRadius:3 }] }, options:{ responsive:true, maintainAspectRatio:true, plugins:{legend:{display:false}}, scales:{x:{ticks:{color:c.text,font:{size:10}},grid:{color:c.grid}},y:{ticks:{color:c.text,font:{size:10},callback:v=>`₹${v}`},grid:{color:c.grid}}} } });

    destroyChart('finPur');
    const purTrend = makeTrendData(purchases);
    const fc2 = document.getElementById('finChartPurchases').getContext('2d');
    state.charts['finPur'] = new Chart(fc2, { type:'bar', data:{ labels:purTrend.labels, datasets:[{ data:purTrend.data, backgroundColor:'rgba(234,88,12,0.7)', borderRadius:4 }] }, options:{ responsive:true, maintainAspectRatio:true, plugins:{legend:{display:false}}, scales:{x:{ticks:{color:c.text,font:{size:10}},grid:{color:c.grid}},y:{ticks:{color:c.text,font:{size:10},callback:v=>`₹${v}`},grid:{color:c.grid}}} } });

    destroyChart('finExp');
    const catMap = {};
    purchases.forEach(p => p.items.forEach(i => {
      const mat = state.materials.find(m=>m.id===i.matId);
      const cat = mat ? mat.category : 'Other';
      catMap[cat] = (catMap[cat]||0) + (i.qty * i.price);
    }));
    const catEntries = Object.entries(catMap);
    const fc3 = document.getElementById('finChartExpenses').getContext('2d');
    state.charts['finExp'] = new Chart(fc3, { type:'pie', data:{ labels:catEntries.map(([k])=>k), datasets:[{ data:catEntries.map(([,v])=>v), backgroundColor:c.palette }] }, options:{ responsive:true, maintainAspectRatio:true, plugins:{ legend:{position:'bottom', labels:{color:c.text,font:{size:9},boxWidth:10}} } } });

    destroyChart('finProd');
    const prodMap = {};
    sales.forEach(s => { prodMap[s.productName] = (prodMap[s.productName]||0) + s.total; });
    const prodEntries = Object.entries(prodMap).sort(([,a],[,b])=>b-a).slice(0,6);
    const fc4 = document.getElementById('finChartProducts').getContext('2d');
    state.charts['finProd'] = new Chart(fc4, { type:'doughnut', data:{ labels:prodEntries.map(([k])=>k), datasets:[{ data:prodEntries.map(([,v])=>v), backgroundColor:c.palette }] }, options:{ responsive:true, maintainAspectRatio:true, plugins:{ legend:{position:'bottom', labels:{color:c.text,font:{size:10},boxWidth:12}} } } });

    destroyChart('finMon');
    const monthMap = {};
    state.sales.forEach(s => {
      const m = s.date.slice(0,7);
      monthMap[m] = (monthMap[m]||0) + s.total;
    });
    const monthEntries = Object.entries(monthMap).sort(([a],[b])=>a.localeCompare(b)).slice(-12);
    const fc5 = document.getElementById('finChartMonthly').getContext('2d');
    state.charts['finMon'] = new Chart(fc5, { type:'bar', data:{ labels:monthEntries.map(([k])=>formatMonth(k)), datasets:[{ label:'Revenue', data:monthEntries.map(([,v])=>v), backgroundColor:c.brand, borderRadius:6 }] }, options:{ responsive:true, maintainAspectRatio:true, plugins:{legend:{display:false}}, scales:{x:{ticks:{color:c.text,font:{size:10}},grid:{color:c.grid}},y:{ticks:{color:c.text,font:{size:10},callback:v=>`₹${v}`},grid:{color:c.grid}}} } });
  }

  // ─── DATE UTILITIES ───────────────────────────────────────────────

  function getDateRange(range, customFrom, customTo) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    switch(range) {
      case 'today':     return { from: today, to: new Date(today.getTime()+86399999) };
      case 'yesterday': { const y=new Date(today); y.setDate(y.getDate()-1); return { from:y, to:new Date(y.getTime()+86399999) }; }
      case 'week':      { const w=new Date(today); w.setDate(w.getDate()-6); return { from:w, to:new Date(today.getTime()+86399999) }; }
      case 'month':     return { from: new Date(now.getFullYear(),now.getMonth(),1), to: new Date(now.getFullYear(),now.getMonth()+1,0,23,59,59) };
      case 'lastmonth': return { from: new Date(now.getFullYear(),now.getMonth()-1,1), to: new Date(now.getFullYear(),now.getMonth(),0,23,59,59) };
      case 'quarter':   return { from: new Date(now.getFullYear(),now.getMonth()-2,1), to: new Date(now.getFullYear(),now.getMonth()+1,0,23,59,59) };
      case 'year':      return { from: new Date(now.getFullYear(),0,1), to: new Date(now.getFullYear(),11,31,23,59,59) };
      case 'custom':    return { from: customFrom ? new Date(customFrom) : new Date(0), to: customTo ? new Date(customTo+'T23:59:59') : new Date() };
      default:          return { from: new Date(0), to: new Date() };
    }
  }

  function filterByDate(items, from, to) {
    return items.filter(i => {
      const d = new Date(i.date);
      return d >= from && d <= to;
    });
  }

  // ─── BACKUP & RESTORE ─────────────────────────────────────────────

  function downloadBackup() {
    const data = {
      version: 1,
      exportDate: new Date().toISOString(),
      materials: state.materials,
      products: state.products,
      purchases: state.purchases,
      sales: state.sales,
      theme: state.theme,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type:'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rakhis-homemade-backup-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Backup downloaded');
  }

  function restoreBackup(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        if (!data.version || !data.materials || !data.products) throw new Error('Invalid backup');
        confirm('Restore Backup', 'This will replace all current data with the backup. Continue?', () => {
          state.materials = data.materials;
          state.products = data.products;
          state.purchases = data.purchases || [];
          state.sales = data.sales || [];
          state.theme = data.theme || 'light';
          save();
          showToast('Backup restored successfully');
          setTimeout(() => location.reload(), 1200);
        });
      } catch(err) {
        showToast('Invalid or corrupted backup file');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  function downloadLedger() {
    const allTx = [
      ...state.purchases.map(p => ({ date: p.date, type:'PURCHASE', items: p.items.map(i=>`${i.name}: ${i.qty} ${i.unit} @ ₹${i.price} = ₹${(i.qty*i.price).toFixed(2)}`).join('; '), total: p.total })),
      ...state.sales.map(s => ({ date: s.date, type:'SALE', items: `${s.productName}${s.size?' ('+formatSize(s.size)+')':''} x${s.qty} @ ₹${s.unitPrice}`, total: s.total })),
    ].sort((a,b) => new Date(a.date)-new Date(b.date));

    let totalPurchases = 0, totalSales = 0;
    let txt = `RAKHI'S HOMEMADE – BUSINESS LEDGER\n`;
    txt += `Generated: ${new Date().toLocaleString('en-IN')}\n`;
    txt += `${'─'.repeat(70)}\n\n`;

    allTx.forEach((tx,i) => {
      const d = new Date(tx.date);
      const dateStr = d.toLocaleDateString('en-IN');
      const timeStr = d.toLocaleTimeString('en-IN');
      txt += `[${i+1}] ${dateStr} ${timeStr}\n`;
      txt += `    Type    : ${tx.type}\n`;
      txt += `    Details : ${tx.items}\n`;
      txt += `    Amount  : ₹${tx.total.toFixed(2)}\n`;
      if (tx.type === 'PURCHASE') totalPurchases += tx.total;
      else totalSales += tx.total;
      txt += `\n`;
    });

    txt += `${'─'.repeat(70)}\n`;
    txt += `TOTALS\n`;
    txt += `  Total Purchases : ₹${totalPurchases.toFixed(2)}\n`;
    txt += `  Total Sales     : ₹${totalSales.toFixed(2)}\n`;
    txt += `  Est. Profit     : ₹${(totalSales - totalPurchases).toFixed(2)}\n`;
    txt += `${'─'.repeat(70)}\n`;
    txt += `  Total Records: ${allTx.length}\n`;

    const blob = new Blob([txt], { type:'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ledger-${new Date().toISOString().slice(0,10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Ledger downloaded');
  }

  function exportExcel() {
    function escapeHtml(str) {
      return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    }
    function tableHtml(title, headers, rows) {
      let html = `<h3>${escapeHtml(title)}</h3><table border="1"><tr>${headers.map(h=>`<th>${escapeHtml(h)}</th>`).join('')}</tr>`;
      rows.forEach(r => { html += `<tr>${r.map(c=>`<td>${escapeHtml(c)}</td>`).join('')}</tr>`; });
      html += `</table><br/>`;
      return html;
    }

    const salesRows = [...state.sales].sort((a,b)=>new Date(a.date)-new Date(b.date)).map(s => [
      formatDateTime(s.date), s.productName, s.category, s.size ? formatSize(s.size) : '', s.qty, s.unitPrice.toFixed(2), s.total.toFixed(2)
    ]);
    const purchaseRows = [];
    [...state.purchases].sort((a,b)=>new Date(a.date)-new Date(b.date)).forEach(p => {
      p.items.forEach(i => {
        purchaseRows.push([formatDateTime(p.date), i.name, i.unit, i.qty, i.price.toFixed(2), (i.qty*i.price).toFixed(2)]);
      });
    });

    const totalSales = state.sales.reduce((s,x)=>s+x.total,0);
    const totalPurchases = state.purchases.reduce((s,x)=>s+x.total,0);

    let html = `<html><head><meta charset="UTF-8"></head><body>`;
    html += tableHtml('Sales', ['Date','Product','Category','Size','Qty','Unit Price (₹)','Total (₹)'], salesRows);
    html += tableHtml('Purchases', ['Date','Material','Unit','Qty','Unit Price (₹)','Total (₹)'], purchaseRows);
    html += tableHtml('Summary', ['Metric','Value'], [
      ['Total Sales Revenue', totalSales.toFixed(2)],
      ['Total Purchase Expense', totalPurchases.toFixed(2)],
      ['Est. Profit', (totalSales-totalPurchases).toFixed(2)],
    ]);
    html += `</body></html>`;

    const blob = new Blob([html], { type:'application/vnd.ms-excel' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rakhis-homemade-export-${new Date().toISOString().slice(0,10)}.xls`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Excel file exported');
  }

  // ─── TOAST ────────────────────────────────────────────────────────

  let toastTimeout;
  function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => t.classList.remove('show'), 2800);
  }

  // ─── FORMAT HELPERS ───────────────────────────────────────────────

  function formatDateTime(iso) {
    const d = new Date(iso);
    return d.toLocaleDateString('en-IN',{day:'numeric',month:'short'}) + ' ' + d.toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'});
  }
  function formatSize(s) {
    return s === '500gm' ? '500 gm' : s === '1kg' ? '1 kg' : '2 kg';
  }
  function formatMonth(ym) {
    const [y,m] = ym.split('-');
    return new Date(y,m-1).toLocaleDateString('en-IN',{month:'short',year:'2-digit'});
  }

  // ─── PUBLIC API ───────────────────────────────────────────────────

  return {
    init,
    openPurchaseModal,
    removeFromCart,
    openProductDetail,
    onSaleCategoryChange,
    onSaleProductChange,
    onSaleSizeChange,
    openEditSale,
  };

})();

// Kick off
document.addEventListener('DOMContentLoaded', () => app.init());
