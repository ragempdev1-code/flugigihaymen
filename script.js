/* =========================================
   ГАЧИЛЕНД — cart + catalog logic
   ========================================= */

// ---- PRODUCT DATA ----
const PRODUCTS = [
    {
        id: 'p01',
        title: 'Classic Pink',
        category: 'classic',
        categoryLabel: 'Классика',
        desc: 'Базовая модель из медицинского силикона. Мягкая текстура, удобная форма.',
        price: 3490,
        oldPrice: 3990,
        badge: 'Хит',
        colors: ['#ff6fa1', '#ff2e63'],
        image: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=600&h=600&fit=crop&q=80'
    },
    {
        id: 'p02',
        title: 'Midnight Black',
        category: 'premium',
        categoryLabel: 'Премиум',
        desc: 'Чёрный матовый силикон, 10 режимов вибрации, беспроводной пульт.',
        price: 7990,
        badge: 'Премиум',
        colors: ['#2c2c2c', '#0f0f10'],
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop&q=80'
    },
    {
        id: 'p03',
        title: 'Sunrise Gold',
        category: 'limited',
        categoryLabel: 'Лимитка',
        desc: 'Ограниченная серия в золотом цвете. Коллекционная коробка.',
        price: 12990,
        badge: 'Лимитка',
        colors: ['#ffd166', '#ff9966'],
        image: 'https://images.unsplash.com/photo-1604076913837-52ab5629fba9?w=600&h=600&fit=crop&q=80'
    },
    {
        id: 'p04',
        title: 'Aurora Violet',
        category: 'premium',
        categoryLabel: 'Премиум',
        desc: 'Подогрев до 38°C, датчик касания, зарядка USB-C. 4 часа работы.',
        price: 9490,
        oldPrice: 10990,
        badge: '−14%',
        colors: ['#8a2be2', '#c471ed'],
        image: 'https://images.unsplash.com/photo-1548247416-93bfc3a2d29c?w=600&h=600&fit=crop&q=80'
    },
    {
        id: 'p05',
        title: 'Ocean Blue',
        category: 'classic',
        categoryLabel: 'Классика',
        desc: 'Водостойкость IPX7. Идеален для душа и ванной. Гипоаллергенно.',
        price: 4290,
        colors: ['#4ea8de', '#64dfdf'],
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop&q=80'
    },
    {
        id: 'p06',
        title: 'Fantasy Unicorn',
        category: 'fantasy',
        categoryLabel: 'Фэнтези',
        desc: 'Необычная форма единорога. Градиент пастельных цветов.',
        price: 5990,
        badge: 'New',
        colors: ['#ffafcc', '#bde0fe'],
        image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=600&h=600&fit=crop&q=80'
    },
    {
        id: 'p07',
        title: 'Neon Dragon',
        category: 'fantasy',
        categoryLabel: 'Фэнтези',
        desc: 'Рельефная текстура дракона. Светится в темноте. UV-пигмент.',
        price: 6490,
        colors: ['#06ffa5', '#3a86ff'],
        image: 'https://images.unsplash.com/photo-1550684376-3cbd604457d3?w=600&h=600&fit=crop&q=80'
    },
    {
        id: 'p08',
        title: 'Starter Kit',
        category: 'classic',
        categoryLabel: 'Классика',
        desc: 'Стартовый набор для новичков. Инструкция, смазка, 2 модели в комплекте.',
        price: 2990,
        oldPrice: 3890,
        badge: 'Старт',
        colors: ['#ffafcc', '#ff6fa1'],
        image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600&h=600&fit=crop&q=80'
    },
    {
        id: 'p09',
        title: 'Ruby Elite',
        category: 'limited',
        categoryLabel: 'Лимитка',
        desc: 'Рубиновая серия. Кристаллическая отделка основания. Деревянная шкатулка.',
        price: 15990,
        badge: 'Elite',
        colors: ['#e63946', '#9d0208'],
        image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=600&h=600&fit=crop&q=80'
    }
];

// ---- IMAGE RENDERER ----
function productImage(product) {
    if (product.image) {
        return `<img src="${product.image}" alt="${product.title}" loading="lazy" style="width:100%;height:100%;object-fit:cover;">`;
    }
    return productSVG(product.colors);
}

// ---- SVG FALLBACK ----
function productSVG(colors) {
    const [c1, c2] = colors;
    const gradId = 'g' + Math.random().toString(36).slice(2, 9);
    return `
    <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <defs>
            <linearGradient id="${gradId}" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="${c1}"/>
                <stop offset="100%" stop-color="${c2}"/>
            </linearGradient>
            <filter id="${gradId}b" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="14"/>
            </filter>
        </defs>
        <rect width="300" height="300" fill="#f4f4f0"/>
        <circle cx="220" cy="80" r="80" fill="${c1}" opacity="0.25" filter="url(#${gradId}b)"/>
        <circle cx="60" cy="240" r="60" fill="${c2}" opacity="0.3" filter="url(#${gradId}b)"/>
        <g transform="translate(150 160)">
            <ellipse cx="0" cy="40" rx="58" ry="18" fill="rgba(0,0,0,0.08)"/>
            <path d="M 0 -110 C 42 -110, 52 -60, 52 -10 C 52 40, 28 70, 0 70 C -28 70, -52 40, -52 -10 C -52 -60, -42 -110, 0 -110 Z" fill="url(#${gradId})"/>
            <ellipse cx="-18" cy="-70" rx="14" ry="26" fill="#fff" opacity="0.35"/>
            <ellipse cx="-22" cy="-60" rx="5" ry="10" fill="#fff" opacity="0.6"/>
        </g>
    </svg>`;
}

// ---- STATE ----
let cart = JSON.parse(localStorage.getItem('gl_cart') || '[]');
let currentFilter = 'all';
let favorites = JSON.parse(localStorage.getItem('gl_favs') || '[]');

// ---- UTILS ----
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);
const price = (n) => n.toLocaleString('ru-RU') + ' ₽';
const saveCart = () => localStorage.setItem('gl_cart', JSON.stringify(cart));
const saveFavs = () => localStorage.setItem('gl_favs', JSON.stringify(favorites));

function toast(msg) {
    const t = $('#toast');
    t.textContent = msg;
    t.classList.add('is-show');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => t.classList.remove('is-show'), 2400);
}

// ---- RENDER CATALOG ----
function renderProducts() {
    const grid = $('#products');
    const list = currentFilter === 'all'
        ? PRODUCTS
        : PRODUCTS.filter(p => p.category === currentFilter);

    grid.innerHTML = list.map(p => `
        <article class="product" data-id="${p.id}">
            <div class="product__media">
                ${productImage(p)}
                ${p.badge ? `<span class="product__badge">${p.badge}</span>` : ''}
                <button class="product__fav ${favorites.includes(p.id) ? 'is-active' : ''}"
                        data-fav="${p.id}" aria-label="В избранное">♥</button>
            </div>
            <div class="product__body">
                <span class="product__cat">${p.categoryLabel}</span>
                <h3 class="product__title">${p.title}</h3>
                <p class="product__desc">${p.desc}</p>
                <div class="product__foot">
                    <div class="product__price">
                        ${p.oldPrice ? `<del>${price(p.oldPrice)}</del>` : ''}
                        ${price(p.price)}
                    </div>
                    <button class="product__add" data-add="${p.id}" aria-label="Добавить в корзину">+</button>
                </div>
            </div>
        </article>
    `).join('');

    $$('[data-add]').forEach(btn => {
        btn.addEventListener('click', () => addToCart(btn.dataset.add));
    });
    $$('[data-fav]').forEach(btn => {
        btn.addEventListener('click', () => toggleFav(btn.dataset.fav, btn));
    });
}

// ---- FILTERS ----
function initFilters() {
    $$('#filters .filter-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            $$('#filters .filter-chip').forEach(c => c.classList.remove('is-active'));
            chip.classList.add('is-active');
            currentFilter = chip.dataset.filter;
            renderProducts();
        });
    });
}

// ---- FAVORITES ----
function toggleFav(id, btn) {
    if (favorites.includes(id)) {
        favorites = favorites.filter(f => f !== id);
        btn.classList.remove('is-active');
    } else {
        favorites.push(id);
        btn.classList.add('is-active');
        toast('Добавлено в избранное');
    }
    saveFavs();
}

// ---- CART ----
function addToCart(id) {
    const existing = cart.find(i => i.id === id);
    if (existing) existing.qty += 1;
    else cart.push({ id, qty: 1 });
    saveCart();
    updateCartUI();
    toast('Добавлено в корзину');
    const countEl = $('#cartCount');
    countEl.animate(
        [{ transform: 'scale(1)' }, { transform: 'scale(1.4)' }, { transform: 'scale(1)' }],
        { duration: 300 }
    );
}

function changeQty(id, delta) {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
    saveCart();
    updateCartUI();
}

function removeFromCart(id) {
    cart = cart.filter(i => i.id !== id);
    saveCart();
    updateCartUI();
    toast('Товар удалён');
}

function cartTotal() {
    return cart.reduce((sum, it) => {
        const p = PRODUCTS.find(x => x.id === it.id);
        return sum + (p ? p.price * it.qty : 0);
    }, 0);
}

function updateCartUI() {
    const count = cart.reduce((s, i) => s + i.qty, 0);
    $('#cartCount').textContent = count;

    const listEl = $('#cartList');
    const emptyEl = $('#drawerEmpty');
    const footEl = $('#drawerFoot');

    if (cart.length === 0) {
        listEl.innerHTML = '';
        emptyEl.style.display = 'flex';
        footEl.hidden = true;
    } else {
        emptyEl.style.display = 'none';
        footEl.hidden = false;
        listEl.innerHTML = cart.map(it => {
            const p = PRODUCTS.find(x => x.id === it.id);
            if (!p) return '';
            return `
                <li class="cart-item" data-id="${p.id}">
                    <div class="cart-item__media">${productImage(p)}</div>
                    <div>
                        <p class="cart-item__title">${p.title}</p>
                        <p class="cart-item__price">${price(p.price)}</p>
                        <div class="cart-item__qty">
                            <button data-dec="${p.id}" aria-label="−">−</button>
                            <span>${it.qty}</span>
                            <button data-inc="${p.id}" aria-label="+">+</button>
                        </div>
                    </div>
                    <button class="cart-item__remove" data-rm="${p.id}" aria-label="Удалить">✕</button>
                </li>
            `;
        }).join('');

        $$('[data-inc]').forEach(b => b.addEventListener('click', () => changeQty(b.dataset.inc, 1)));
        $$('[data-dec]').forEach(b => b.addEventListener('click', () => changeQty(b.dataset.dec, -1)));
        $$('[data-rm]').forEach(b => b.addEventListener('click', () => removeFromCart(b.dataset.rm)));
    }

    $('#cartTotal').textContent = price(cartTotal());
    $('#formTotal').textContent = price(cartTotal());
}

// ---- DRAWER ----
function openDrawer() {
    $('#drawer').classList.add('is-open');
    $('#drawer').setAttribute('aria-hidden', 'false');
    document.body.classList.add('is-locked');
}
function closeDrawer() {
    $('#drawer').classList.remove('is-open');
    $('#drawer').setAttribute('aria-hidden', 'true');
    document.body.classList.remove('is-locked');
}

// ---- MODAL ----
function openModal() {
    if (cart.length === 0) {
        toast('Корзина пуста');
        return;
    }
    closeDrawer();
    setTimeout(() => {
        $('#checkoutView').hidden = false;
        $('#successView').hidden = true;
        $('#modal').classList.add('is-open');
        $('#modal').setAttribute('aria-hidden', 'false');
        document.body.classList.add('is-locked');
    }, 200);
}
function closeModal() {
    $('#modal').classList.remove('is-open');
    $('#modal').setAttribute('aria-hidden', 'true');
    document.body.classList.remove('is-locked');
}

// ---- CHECKOUT ----
function handleCheckout(e) {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    const orderId = 'GL-' + Date.now().toString(36).toUpperCase().slice(-6);
    $('#orderId').textContent = orderId;
    $('#checkoutView').hidden = true;
    $('#successView').hidden = false;

    cart = [];
    saveCart();
    updateCartUI();
    form.reset();
}

// ---- AGE GATE ----
function initAgeGate() {
    const passed = localStorage.getItem('gl_age_ok');
    if (passed) {
        $('#ageGate').classList.add('is-hidden');
        return;
    }
    $('#ageYes').addEventListener('click', () => {
        localStorage.setItem('gl_age_ok', '1');
        $('#ageGate').classList.add('is-hidden');
    });
}

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
    initAgeGate();
    renderProducts();
    initFilters();
    updateCartUI();

    $('#cartBtn').addEventListener('click', openDrawer);
    $('#drawerClose').addEventListener('click', closeDrawer);
    $('#drawerBackdrop').addEventListener('click', closeDrawer);
    $('#drawerEmptyClose').addEventListener('click', () => {
        closeDrawer();
        setTimeout(() => document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' }), 300);
    });

    $('#checkoutBtn').addEventListener('click', openModal);
    $('#modalClose').addEventListener('click', closeModal);
    $('#modalBackdrop').addEventListener('click', closeModal);
    $('#successClose').addEventListener('click', closeModal);
    $('#checkoutForm').addEventListener('submit', handleCheckout);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if ($('#modal').classList.contains('is-open')) closeModal();
            else if ($('#drawer').classList.contains('is-open')) closeDrawer();
        }
    });
});
