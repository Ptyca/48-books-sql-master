const db = require('./db');
const Author = require('./Author');
const Books = require('./Books');

const app = {}

app.init = async () => {
    // prisijungti prie duomenu bazes
    const conn = await db.init({
        host: 'localhost',
        user: 'root',
        database: 'books',
    });

    // LOGIC BELOW

    const paula = await Author.create(conn, 'Paula', 'Abdul');
    const vardenis = await Author.create(conn, 'Vardenis', 'Pavardenis');
    const mike = await Author.create(conn, 'Mike', 'Pukuotukas');
    const kestas = await Author.create(conn, 'Kestas', 'Kubilinskas');
    console.log(vardenis);
    console.log(mike);
    console.log(paula);
    console.log(kestas);

    const sarasas = await Author.listAll(conn);
    console.log(sarasas);




}

app.init();

module.exports = app;