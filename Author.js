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
}

Author.findByFirstname = async (connection, authorFirstname) => {
}

Author.findByLastname = async (connection, authorLastname) => {
}

Author.updatePropertyById = async (connection, authorId, propertyName, propertyValue) => {
}

Author.delete = async (connection, authorId) => {
}

module.exports = Author;