const Validation = require('./Validations');
const Author = {};

/**
 * Autoriaus  irasymas i duombaze.
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {string} authorFirstname Autoriaus vardas
 * @param {string} authorLastname Autoriaus pavarde
 * @returns {Promise<string>} Sukurtas autorius.
 */
Author.create = async (connection, authorFirstname, authorLastname) => {
    if (!Validation.isText(authorFirstname)) {
        return `Parametras turi buti ne tuscias tekstas!`;
    }
    if (!Validation.isText(authorLastname)) {
        return `Parametras turi buti ne tuscias tekstas!`;
    }

    const sql = 'INSERT INTO `authors` \
                    (`id`, `firstname`, `lastname`)\
                     VALUES (NULL, "'+ authorFirstname + '", "' + authorLastname + '")';
    const [rows] = await connection.execute(sql);
    return `${authorFirstname} ${authorLastname} sekmingai irasytas!`;
}

/**
 * Autoriu saraso spausdinimas
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @returns {Promise<string>} Autoriu sarasas.
 */
Author.listAll = async (connection) => {
    const sql = 'SELECT * \
        FROM `authors`';
    const [rows] = await connection.execute(sql);
    // validacija if(tuscia lentele)
    if (rows.length === 0) {
        return 'sarasas yra tuscias'
    }
    count = 0;
    const infoList = [];
    for (let { firstname, lastname } of rows) {
        infoList.push(`${++count}) ${firstname} ${lastname}`)
    };
    const title = `Autoriu sarasas:\n`;
    return title + infoList.join(`\n`);

}

/**
 * Autoriaus paieska pagal ID
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {number} authorId Autoriaus ID
 * @returns {Promise<string>} Autorius pagal pasirinkta ID
 */
Author.findById = async (connection, authorId) => {
    if (!Validation.IDisValid(authorId)) {
        return `Autoriaus ID turi buti teigiamas sveikasis skaicius!`;
    }

    const sql = 'SELECT * FROM `authors` WHERE `id` =' + authorId;
    const [rows] = await connection.execute(sql);
    // if (rows.length === 0) {
    //     return 'Nera tokio autoriaus'
    // }
    // else {
    //     return `Pasirinktas autorius: ${rows[0].firstname}, ${rows[0].lastname}`;
    // }
    return rows.length ? `Pasirinktas autorius: ${rows[0].firstname}, ${rows[0].lastname}` : 'Nera tokio autoriaus';

}

/**
 * Autoriaus paieska pagal Varda
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {String} authorFirstname Autoriaus Vardas
 * @returns {Promise<string>} Autorius pagal Varda
 */
Author.findByFirstname = async (connection, authorFirstname) => {
    if (!Validation.isValidFirstName(authorFirstname)) {
        return `Parametras turi buti ne tuscias tekstas!`;
    }

    const sql = 'SELECT * FROM `authors` WHERE `firstname` LIKE "%' + authorFirstname + '%"';
    const [rows] = await connection.execute(sql);
    console.log(rows)
    if (rows.length === 0) {
        return 'Nera tokio autoriaus'
    }
    else {
        const names = rows.map(obj => obj.firstname + ' ' + obj.lastname);
        return `Rastas Autorius pagal varda ${authorFirstname}: ${names.join(', ')}.`;
    }
    //const map1 = array1.map(x => x * 2)

}

/**
 * Autoriaus paieska pagal Pavarde
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {String} authorFirstname Autoriaus Pavarde
 * @returns {Promise<string>} Autorius  paieska pagal Pavarde
 */
Author.findByLastname = async (connection, authorLastname) => {
    if (!Validation.isValidFirstName(authorLastname)) {
        return `Parametras turi buti ne tuscias tekstas!`;
    }

    const sql = 'SELECT * FROM `authors` WHERE `lastname` LIKE "%' + authorLastname + '%"';
    const [rows] = await connection.execute(sql);
    let response = 'Nera tokio autoriaus'

    if (rows.length > 0) {
        const names = rows.map(obj => obj.firstname + ' ' + obj.lastname);
        response = `Rastas Autorius pagal varda ${authorLastname}: ${names.join(', ')}.`
    }
    return response;
}

/**
 * Autoriaus atnaujinimas
  * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {number} authorId Autoriaus ID.
 * @param {string} propertyName Atnaujinamos savybes pavadinimas.
 * @param {string} propertyValue Atnaujinamos savybes verte.
 * @returns { Promise < string >} Tekstas, skelbiantis kokia savybe, pagal duota ID, buvo atnaujinta i kokia verte.
 */
Author.updatePropertyById = async (connection, authorId, propertyName, propertyValue) => {
    const props = ['id', 'firstname', 'lastname'];
    if (!props.includes(propertyName)) {
        return 'BLOGIS, stulpelis nerastas';
    }

    const sql = 'UPDATE `authors`\
                     SET `' + propertyName + '` = "' + propertyValue + '"\
                      WHERE `authors`.`id` =' + authorId;
    [rows] = await connection.execute(sql);
    if (rows.changedRows === 0) {
        return `Pagal duota ID - ${authorId} autorius nerastas, atnaujinti nepavyko!`;
    } else {
        return `Autoriaus duomenys atnaujinti sekmingai!`;
    }
}

/**
  * Autoriaus trinimas pagal pavarde.
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {number} authorId Autoriaus ID.
 * @returns {Promise<string>} Istrintas Autorius pagal ID.
 */
Author.delete = async (connection, authorId) => {
    const sql = 'DELETE FROM `authors`\
                      WHERE `authors`.`id` =' + authorId;
    const [rows] = await connection.execute(sql);

    if (rows.affectedRows === 0) {
        return `Pagal duota ID - ${authorId} autorius nerastas, atnaujinti nepavyko!`;
    } else {
        return `Autoriaus nurodytu ID: ${authorId} istrintas sekmingai!`;
    }
}

module.exports = Author;