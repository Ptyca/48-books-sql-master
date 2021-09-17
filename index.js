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

    const sarasaPagalVarda = await Author.findByFirstname(conn, 'a');
    console.log(sarasaPagalVarda);
    console.log('');

    const sarasaPagalPavarde = await Author.findByLastname(conn, 'P');
    console.log(sarasaPagalPavarde);
    console.log('');

    const sarasaPagalAutoriausID = await Author.updatePropertyById(conn, 3, 'lastname', 'Kepenis');
    console.log(sarasaPagalAutoriausID);
    console.log('');



    const sarasaPagalVarda2 = await Author.findByFirstname(conn, 'a');
    console.log(sarasaPagalVarda2);
    console.log('');

    const sarasaPagalAutoriausID2 = await Author.updatePropertyById(conn, 1, 'lastname', 'Kepenis');
    console.log(sarasaPagalAutoriausID2);
    console.log('');

    const istrintiPagalAutoriausID = await Author.delete(conn, 78);
    console.log(istrintiPagalAutoriausID);
    console.log('');

    const knygaCreate = await Books.create(conn, 1, 'Taika ir Taika', 1222);
    console.log(knygaCreate);

    const knygaCreate2 = await Books.create(conn, 2, 'Nieko nebus', 2020);
    console.log(knygaCreate2);

    const knygaCreate3 = await Books.create(conn, 3, 'Grybu karas', 2021);
    console.log(knygaCreate3);

    const knygaCreate4 = await Books.create(conn, 4, 'Gerkles skausmai', 2021);
    console.log(knygaCreate4);
    console.log('')

    const sarasas1 = await Books.listAll(conn);
    console.log(sarasas1);
    console.log('');


    const sarasaPagalVarda3 = await Books.findByName(conn, 'ka');
    console.log(sarasaPagalVarda3);
    console.log('');

    const sarasaPagalMetus = await Books.findByYear(conn, 20);
    console.log(sarasaPagalMetus);
    console.log('');

    const updPagalID1 = await Books.updateById(conn, 3, 'releaseYear', 77777);
    console.log(updPagalID1);
    console.log('');


    const updPagalName = await Books.updateNameById(conn, 3, 33333333);
    console.log(updPagalName);
    console.log('');

    const updYearPagalName = await Books.updateNameById(conn, 1, 334444433);
    console.log(updYearPagalName);
    console.log('');

    const istrintiPagalID = await Books.delete(conn, 1);
    console.log(istrintiPagalID);
    console.log('');

    const istrintiPagalKnygosID = await Books.deleteAllByAuthorId(conn, 2);
    console.log(istrintiPagalKnygosID);
    console.log('');

}


app.init();

module.exports = app;