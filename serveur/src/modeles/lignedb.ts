import * as mongoDB from "mongodb" 

let Lignedb = function () {
    let url : string = 'mongodb://'+process.env.DB_USER+':'+process.env.DB_PASS+"@"+process.env.DB_HOST+'/'+process.env.DB_NAME    
    let client: mongoDB.MongoClient = new mongoDB.MongoClient(url)
    try {
        client.connect()
        let users: mongoDB.Collection = client.db('rdinfodb').collection('ligne');
        return users;
    }
    catch (erreur) {
        console.log(erreur)
    }
}
let lignedb: any = Lignedb()

export default lignedb
