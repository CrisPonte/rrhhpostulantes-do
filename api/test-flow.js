const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

async function test() {
    try {
        console.log('1. Logging in as admin...');
        const adminLogin = await axios.post(`${API_URL}/auth/login`, {
            email: 'admin@hr-talent.local',
            password: '123456'
        });
        const token = adminLogin.data.token;
        console.log('Admin logged in.');

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        const testEmail = `test_${Date.now()}@test.com`;
        const testPass = 'admin123';

        console.log(`2. Creating new user: ${testEmail}...`);
        await axios.post(`${API_URL}/usuarios`, {
            nombre: 'Test',
            apellido: 'User',
            email: testEmail,
            password: testPass,
            rol: 'jefe de rrhh'
        }, config);
        console.log('User created.');

        console.log(`3. Trying to login with new user: ${testEmail}...`);
        const userLogin = await axios.post(`${API_URL}/auth/login`, {
            email: testEmail,
            password: testPass
        });
        console.log('User logged in successfully!', userLogin.data.user.email);

    } catch (error) {
        console.error('Test failed:', error.response?.data || error.message);
    }
}

test();
