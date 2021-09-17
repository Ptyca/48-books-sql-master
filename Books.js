/**
 * Kaip rasyti JSDOc'sus?
 * Link: https://jsdoc.app
 */

const Books = {};

/**
 * Autoriaus isleistos knygos irasymas i duombaze.
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {number} authorId Autoriaus ID.
 * @param {string} bookName Knygos pavadinimas.
 * @param {number} bookReleaseYear Knygos isleidimo metai.
 * @returns {Promise<string>} Tekstas, apibudinantis, koks autorius ir kurias metais isleido knyga.
 */
Books.create = async (connection, authorId, bookName, bookReleaseYear) => {
    const sql = 'INSERT INTO books (authorId,title, releaseYear)\
    VALUES ("'+ authorId + '", "' + bookName + '", "' + bookReleaseYear + '")';
    [rows] = await connection.execute(sql);
    const createBook = `book added!: author with ID ${authorId}, book title "${bookName}", release year ${bookReleaseYear}.`
    return createBook;
}

/**
 * Visu autoriu isleistu knygu sarasas.
 * @param {object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @returns {Promise<Object[]>} Tekstas, apibudinantis, koks autorius ir kurias metais isleido knyga.
 */
Books.listAll = async (connection) => {
    const sql = 'SELECT * \
        FROM `books`';
    const [rows] = await connection.execute(sql);
    console.log(rows)
    if (rows.length === 0) {
        return 'sarasas yra tuscias'
    }
    count = 0;
    const infoList = [];
    for (let { title, releaseYear } of rows) {
        infoList.push(`${++count}) ${title} ${releaseYear}`)
    };
    const title = `Knygu sarasas:\n`;
    return title + infoList.join(`\n`);
}

/**
 * Knygos paieska pagal pavadinima.
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {string} bookName Knygos pavadinimas.
 * @returns {Promise<Object[]>} Sarasas su knygu objektais.
 */
Books.findByName = async (connection, bookName) => {
    const sql = 'SELECT * FROM `books` WHERE `title` LIKE "%' + bookName + '%"';
    const [rows] = await connection.execute(sql);
    console.log(rows)
    if (rows.length === 0) {
        return 'Nera tokios knygos'
    }
    else {
        const names = rows.map(obj => obj.title + ' ' + obj.releaseYear);
        return `Rastas knyga (pgl varda): ${names.join(', ')}.`;
    }
}

/**
 * Knygu paieska pagal metus
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {number} bookReleaseYear Knygos Leidimo metai
 * @returns Knygu sarasas pagal metus
 */

Books.findByYear = async (connection, bookReleaseYear) => {
    const sql = 'SELECT * FROM `books` WHERE `releaseYear` LIKE "%' + bookReleaseYear + '%"';
    const [rows] = await connection.execute(sql);
    if (rows.length === 0) {
        return 'Nera tokios knygos'
    }
    else {
        const names = rows.map(obj => obj.title + ' ' + obj.releaseYear);
        return `Rastas knyga:(pagal metus) ${names.join(', ')}.`;
    }
}

/**
 * Atnaujinti pagal knygos ID
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {number} bookId KNygos ID
 * @param {*} propertyName Atnaujinamas stulpelis
 * @param {*} propertyValue Atnaujinto stulpelio pavadinimas
 * @returns Atnaujintas pasirinktas knygos stulpelis
 */
Books.updateById = async (connection, bookId, propertyName, propertyValue) => {
    const props = ['id', 'title', 'releaseYear'];
    if (!props.includes(propertyName)) {
        return 'BLOGIS, stulpelis nerastas';
    }

    const sql = 'UPDATE `books`\
                     SET `' + propertyName + '` = "' + propertyValue + '"\
                      WHERE `books`.`id` =' + bookId;
    [rows] = await connection.execute(sql);
    if (rows.changedRows === 0) {
        return `Pagal duota ID - ${bookId} autorius nerastas, atnaujinti nepavyko!`;
    } else {
        return `Knygos duomenys (pagal ID) atnaujinti sekmingai!`;
    }
}

/**
 * Atnaujinti pagal knygos pavadinimas
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {number} bookId Knygos ID
 * @param {string} bookName Knygos Pavadinimas
 * @returns Atnaujina informacija pagal pavadinima
 */
Books.updateNameById = async (connection, bookId, bookName) => {

    const sql = 'UPDATE books SET title = "' + bookName + '" WHERE books.id =' + bookId;
    [rows] = await connection.execute(sql);
    const updatedTitleById = `Book with ID ${bookId} has a new title now as "${bookName}."`
    return updatedTitleById;
}

/**
 * Atnaujinti knygos info pagal metus
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {number} bookId 
 * @param {number} bookReleaseYear 
 * @returns atnaujina knygos info pagal metus
 */
Books.updateYearById = async (connection, bookId, bookReleaseYear) => {
    const sql = 'UPDATE books SET releaseYear = "' + bookReleaseYear + '" WHERE books.id =' + bookId;
    [rows] = await connection.execute(sql);
    const updatedTitleById = `Book with ID ${bookId} has a new release year "${bookReleaseYear}."`
    return updatedTitleById;
}

/**
 * Istrina knyga pagal ID
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {number} bookId Knygos ID
 * @returns istrina knyga
 */
Books.delete = async (connection, bookId) => {
    const sql = 'DELETE FROM `books`\
                      WHERE `books`.`id` =' + bookId;
    const [rows] = await connection.execute(sql);

    if (rows.affectedRows === 0) {
        return `Pagal duota ID - ${bookId} knyga nerasta, istrinti nepavyko!`;
    } else {
        return `knyga nurodytu KNYGOSID: ${bookId} istrinta sekmingai!`;
    }

}

/**
 * Istrinti visas autoriaus knygas pagal Autoriaus ID
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {number} authorId Autoriaus ID
 * @returns istrina VISAS autoriaus knyga pagal autoriaus ID
 */
Books.deleteAllByAuthorId = async (connection, authorId) => {
    const sql = 'DELETE FROM `books`\
                      WHERE `books`.`authorId` =' + authorId;
    const [rows] = await connection.execute(sql);

    if (rows.affectedRows === 0) {
        return `Pagal duota AUTORIAUS ID - ${authorId} knyga nerasta, istrinti nepavyko!`;
    } else {
        return `knyga nurodytu AUTORIAUS ID: ${authorId} istrintas sekmingai!`;
    }

}

module.exports = Books;