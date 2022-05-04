const sqlite3 = require('sqlite3').verbose()

const dbSource = "./lab4.db"

let db = new sqlite3.Database(dbSource, (err) => {
    if(err){
        console.error(err.message)
        throw err
    } else {
        console.log("Conneced to Sqlite3 database\n")
        // db.run(`
            
        //     INSERT INTO carData
        //     SELECT Car_ID, Year, Make, Model, Name, Email 
        //     FROM data;

        //     CREATE TABLE car_scores(
        //         Car_ID INT PRIMARY KEY,
        //         Car_Score INT
        //     );
            
        //     INSERT INTO car_scores
        //     SELECT Car_ID, Racer_Turbo+Racer_Supercharged+Racer_Performance+Racer_Horsepower+Car_Overall+Engine_Modifications+Engine_Performance+Engine_Chrome+Engine_Detailing+Engine_Cleanliness+Body_Frame_Undercarriage+Body_Frame_Suspension+Body_Frame_Chrome+Body_Frame_Detailing+Body_Frame_Cleanliness+Mods_Paint+Mods_Body+Mods_Wrap+Mods_Rims+Mods_Interior+Mods_Other+Mods_ICE+Mods_Aftermarket+Mods_WIP+Mods_Overall as Car_Score
        //     FROM data;
        // `)
    }
})

module.exports = db

