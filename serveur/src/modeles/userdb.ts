import * as mongoDB from "mongodb"

let dbusers = function () {
    let url : string = 'mongodb://'+process.env.DB_USER+':'+process.env.DB_PASS+"@"+process.env.DB_HOST+'/'+process.env.DB_NAME    
    let client: mongoDB.MongoClient = new mongoDB.MongoClient(url)
    try {
        client.connect()
        let users: mongoDB.Collection = client.db('rdinfodb').collection('users');
        return users;
    }
    catch (erreur) {
        console.log(erreur)
    }
}
let usersdb: any = dbusers()

export default usersdb