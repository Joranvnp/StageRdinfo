import * as mongoDB from "mongodb"

let Tiersdb = function () {
    let url : string = 'mongodb://'+process.env.DB_USER+':'+process.env.DB_PASS+"@"+process.env.DB_HOST+'/'+process.env.DB_NAME    
    let client: mongoDB.MongoClient = new mongoDB.MongoClient(url)
    try {
        client.connect()
        let tiers: mongoDB.Collection = client.db('rdinfodb').collection('tiers');
        return tiers;
    }
    catch (erreur) {
        console.log(erreur)
    }
}
let tiersdb: any = Tiersdb()

export default tiersdb