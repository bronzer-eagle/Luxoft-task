function insertToTable(db, data, id) {
    db.insert(data, null || id, function(err) {
        if (err){
            console.log(err);
        }
    });
}

dataBase = {
    insert : insertToTable
};

module.exports = dataBase;