const bcrypt = require('bcryptjs');

async function test() {
    const pass = 'admin123';
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(pass, salt);
    console.log(`Password: ${pass}`);
    console.log(`Salt: ${salt}`);
    console.log(`Hash: ${hash}`);

    const match = await bcrypt.compare(pass, hash);
    console.log(`Match: ${match}`);

    const matchWrong = await bcrypt.compare('Wrong', hash);
    console.log(`Match Wrong: ${matchWrong}`);
}

test();
