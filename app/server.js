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

// UPDATED: 16 PRODUCTS
// (Retained working links, Fixed Drone, Controller, and swapped Hub for Action Camera)
const products = [
    { id: 1, name: "Mechanical Keyboard", price: 120, image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500&q=80" },
    { id: 2, name: "Gaming Mouse Pad", price: 60, image: "https://images.unsplash.com/photo-1527698266440-12104e498b76?w=500&q=80" },
    { id: 3, name: "HD Monitor", price: 300, image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80" },
    
    // FIXED: Swapped broken USB Hub for Action Camera (High reliability image)
    { id: 4, name: "Action Camera", price: 299, image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&q=80" },

    { id: 5, name: "Headphones", price: 199, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80" },
    { id: 6, name: "Office Chair", price: 250, image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=500&q=80" },
    { id: 7, name: "Webcam Pro", price: 80, image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80" },
    { id: 8, name: "Laptop Stand", price: 35, image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=500&q=80" },
    
    // FIXED: Drone Camera (New reliable link)
    { id: 9, name: "Drone Camera", price: 450, image: "https://images.unsplash.com/photo-1506947411487-a56738267384?w=500&q=80" },

    { id: 10, name: "Smart Speaker", price: 50, image: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=500&q=80" },
    { id: 11, name: "Gaming Headset", price: 85, image: "https://images.unsplash.com/photo-1612444530582-fc66183b16f7?w=500&q=80" },
    { id: 12, name: "Power Bank", price: 40, image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&q=80" },
    { id: 13, name: "VR Headset", price: 299, image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=500&q=80" },
    { id: 14, name: "Smart Watch", price: 220, image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&q=80" },
    { id: 15, name: "Streaming Mic", price: 120, image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500&q=80" },
    
    // FIXED: Game Controller (New reliable PS5 style link)
    { id: 16, name: "Game Controller", price: 60, image: "https://images.unsplash.com/photo-1580327344181-c1163234e5a0?w=500&q=80" }
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
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    console.log(`Order received. Total: $${total}`);
    res.json({ success: true, message: `Order processed! Total: $${total}` });
});

// Start Server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});