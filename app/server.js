const express = require('express');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// --- MOCK DATA ---
const users = [
    { username: "admin", password: "123" },
    { username: "user",  password: "password" }
];

// UPDATED: REAL PRODUCT PHOTOS
const products = [
    { 
        id: 1, 
        name: "Mechanical Keyboard", 
        price: 120, 
        image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=400&h=300&fit=crop" 
    },
    { 
        id: 2, 
        name: "Gaming Mouse", 
        price: 60, 
        image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&h=300&fit=crop" 
    },
    { 
        id: 3, 
        name: "HD Monitor", 
        price: 300, 
        image: "https://images.unsplash.com/photo-1544207796-244c24d8f660?w=400&h=300&fit=crop" 
    },
    { 
        id: 4, 
        name: "USB Hub", 
        price: 25, 
        image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&h=300&fit=crop" 
    }
];

// --- API ROUTES ---

// 1. Login Endpoint
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        res.json({ success: true, message: "Login successful!" });
    } else {
        res.status(401).json({ success: false, message: "Invalid credentials" });
    }
});

// 2. Get Products
app.get('/api/products', (req, res) => {
    res.json(products);
});

// 3. Checkout
app.post('/api/checkout', (req, res) => {
    const { cart } = req.body;
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    console.log(`Order received. Total: $${total}`);
    res.json({ success: true, message: `Order processed! Total: $${total}` });
});

// Start Server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});