const axios = require('axios');

async function test() {
    try {
        const res = await axios.post('http://localhost:5000/api/auth/login', {
            email: 'admin@hr-talent.local',
            password: '123456'
        });
        console.log('SUCCESS:', res.data);
    } catch (err) {
        if (err.response) {
            console.log('ERROR STATUS:', err.response.status);
            console.log('ERROR DATA:', err.response.data);
        } else {
            console.log('ERROR NO RESPONSE:', err.message);
        }
    }
}

test();
