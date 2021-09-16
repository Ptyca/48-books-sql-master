const Author = {};

/**
 * Autoriaus  irasymas i duombaze.
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {string} authorFirstname Autoriaus vardas
 * @param {string} authorLastname Autoriaus pavarde
 * @returns {Promise<string>} koks autorius isleido knyga.
 */
Author.create = async (connection, authorFirstname, authorLastname) => {
    const sql = 'INSERT INTO `authors` \
                    (`id`, `firstname`, `lastname`)\
                     VALUES (NULL, "'+ authorFirstname + '", "' + authorLastname + '")';
    const [rows] = await connection.execute(sql);
    return `${authorFirstname} ${authorLastname} sekmingai irasytas!`;
}

Author.listAll = async (connection) => {
    const sql = 'SELECT * \
        FROM `authors`';
    const [rows] = await connection.execute(sql);

    count = 0;
    const infoList = [];
    for (let { firstname, lastname } of rows) {
        infoList.push(`${++count}) ${firstname} ${lastname}`)
    };
    const title = `Autoriu sarasas:\n`;
    return title + infoList.join(`\n`);

    return `${authorFirstname} ${authorLastname} sekmingai irasytas!`;
}

Author.findById = async (connection, authorId) => {
    const sql = 'SELECT * FROM `authors` WHERE `id` =' + authorId;
    const [rows] = await connection.execute(sql);
    if (rows.length === 0) {
        return 'Nera tokio autoriaus'
    }
    else {
        return `Pasirinktas autorius: ${rows[0].firstname}, ${rows[0].lastname}`;
    }
}

Author.findByFirstname = async (connection, authorFirstname) => {
    const sql = 'SELECT * FROM `authors` WHERE `firstname` LIKE "%' + authorFirstname + '%"';
    const [rows] = await connection.execute(sql);

    if (rows.length === 0) {
        return 'Nera tokio autoriaus'
    }
    else {
        return `Rastas Autorius pagal varda ${authorFirstname}: ${rows[0].firstname}, ${rows[0].lastname}`
    }

}

Author.findByLastname = async (connection, authorLastname) => {
    const sql = 'SELECT * FROM `authors` WHERE `lastname` LIKE "%' + authorLastname + '%"';
    const [rows] = await connection.execute(sql);

    if (rows.length === 0) {
        return 'Nera tokio autoriaus'
    }
    else {
        return `Rastas Autorius pagal pavarde ${authorLastname}: ${rows[0].lastname}, ${rows[0].firstname}`
    }
}

Author.updatePropertyById = async (connection, authorId, propertyName, propertyValue) => {
    const sql = 'UPDATE `authors`\
                     SET `' + propertyName + '` = "' + propertyValue + '"\
                      WHERE `authors`.`id` =' + authorId;
    [rows] = await connection.execute(sql);

    if (rows.length === 0) {
        return `Pagal duota ID - ${authorId} autorius nerastas, atnaujinti nepavyko!`;
    } else {
        return `Autoriaus duomenys atnaujinti sekmingai!`;
    }
}
Author.delete = async (connection, authorId) => {
    const sql = 'DELETE FROM `authors`\
                      WHERE `authors`.`id` =' + authorId;
    const [rows] = await connection.execute(sql);
    if (rows.length === 0) {
        return `Pagal duota ID - ${authorId} autorius nerastas, atnaujinti nepavyko!`;
    } else {
        return `Autoriaus nurodytu ID: ${authorId} istrintas sekmingai!`;
    }
}

module.exports = Author;