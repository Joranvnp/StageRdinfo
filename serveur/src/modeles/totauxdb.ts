import * as mongoDB from "mongodb"

let Totauxdb = function () {
    let url : string = 'mongodb://'+process.env.DB_USER+':'+process.env.DB_PASS+"@"+process.env.DB_HOST+'/'+process.env.DB_NAME    
    let client: mongoDB.MongoClient = new mongoDB.MongoClient(url)
    try {
        client.connect()
        let totaux: mongoDB.Collection = client.db('rdinfodb').collection('totaux');
        return totaux;
    }
    catch (erreur) {
        console.log(erreur)
    }
}
let totauxdb: any = Totauxdb()

export default totauxdb