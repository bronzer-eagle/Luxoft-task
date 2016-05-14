function insertToTable(db, data) {
    db.insert({ crazy: true }, 'rabbit', function (err, body) {
        if (!err) {
            console.log(body);
        }
        console.log(body);
    });
}

module.exports = insertToTable;

//# sourceMappingURL=index-compiled.js.map