const db = require('./db');
const Author = require('./Author');
const Books = require('./Books');
const { updatePropertyById } = require('./Author');

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
    console.log('');

    const sarasas = await Author.listAll(conn);
    console.log(sarasas);
    console.log('');

    const sarasaPagalId = await Author.findById(conn, 3)
    console.log(sarasaPagalId);
    console.log('');

    const sarasaPagalVarda = await Author.findByFirstname(conn, 'Mike');
    console.log(sarasaPagalVarda);
    console.log('');

    const sarasaPagalPavarde = await Author.findByLastname(conn, 'P');
    console.log(sarasaPagalPavarde);
    console.log('');

    const sarasaPagalAutoriausID = await Author.updatePropertyById(conn, 2, 'lastname', 'Kepenis');
    console.log(sarasaPagalAutoriausID);
    console.log('');


}

app.init();

module.exports = app;