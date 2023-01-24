import express, { Request, Response ,Express, IRouter } from 'express'
import tiersdb from '../modeles/tiersdb';
import { ObjectID } from "bson";

const routeur: IRouter = express.Router()

type tiers = {
    _id: ObjectID,
    nomTiers: string,
    nomAlternatifTiers: string,
    prospectClientTiers: string,
    codeClientTiers: string,
    fournisseurTiers: string,
    codeFournisseurTiers: string,
    etatTiers: string,
    codeBarresTiers: string,
    adresseTiers: string,
    codePostalTiers: string,
    villeTiers: string,
    paysTiers: string,
    departmentCantonTiers: string,
    telephoneTiers: string,
    faxTiers: string,
    emailTiers: string,
    webTiers: string,
    skypeTiers: string,
    twitterTiers: string,
    linkedinTiers: string,
    githubTiers: string,
    idProf1Tiers: string,
    idProf2Tiers: string,
    idProf3Tiers: string,
    idProf4Tiers: string,
    idProf5Tiers: string,
    assujettiTVATiers: string,
    numeroTVATiers: string,
    assujettiDeuxiemeTaxeTiers: string,
    assujettiTroisiemeTaxeTiers: string,
    typeTiers: string,
    effectifsTiers: string,
    typeEntiteLegaleTiers: string,
    capitalTiers: string,
    langueDefautTiers: string,
    incotermsTiers: string,
    tagsClientsProspTiers: string,
    tagsFournisseursTiers: string,
    tierseTiers: string,
    hauteurTiers: string,
    poidsTiers: string,
    professionTiers: string,
    dateNaissanceTiers: string,
    maisonMereTiers: string,
    commercialAffecteTiers: string,
}

routeur.post('/creertiers', async(req:Request, res: Response) => {
    console.log("salut")

    const { 
        nomTiers,
            nomAlternatifTiers,
            prospectClientTiers,
            codeClientTiers,
            fournisseurTiers,
            codeFournisseurTiers,
            etatTiers,
            codeBarresTiers,
            adresseTiers,
            codePostalTiers,
            villeTiers,
            paysTiers,
            departmentCantonTiers,
            telephoneTiers,
            faxTiers,
            emailTiers,
            webTiers,
            skypeTiers,
            twitterTiers,
            linkedinTiers,
            githubTiers,
            idProf1Tiers,
            idProf2Tiers,
            idProf3Tiers,
            idProf4Tiers,
            idProf5Tiers,
            assujettiTVATiers,
            numeroTVATiers,
            assujettiDeuxiemeTaxeTiers,
            assujettiTroisiemeTaxeTiers,
            typeTiers,
            effectifsTiers,
            typeEntiteLegaleTiers,
            capitalTiers,
            langueDefautTiers,
            incotermsTiers,
            tagsClientsProspTiers,
            tagsFournisseursTiers,
            deviseTiers,
            hauteurTiers,
            poidsTiers,
            professionTiers,
            dateNaissanceTiers,
            maisonMereTiers,
            commercialAffecteTiers,
    } = req.body.data;

    let tiers = await tiersdb.findOne({"tiers" : nomTiers})

    if(tiers)
    {
        res.json("existe")
    } else {
        tiersdb.insertOne({
            nomTiers: nomTiers,
            nomAlternatifTiers: nomAlternatifTiers,
            prospectClientTiers: prospectClientTiers,
            codeClientTiers: codeClientTiers,
            fournisseurTiers: fournisseurTiers,
            codeFournisseurTiers: codeFournisseurTiers,
            etatTiers: etatTiers,
            codeBarresTiers: codeBarresTiers,
            adresseTiers: adresseTiers,
            codePostalTiers: codePostalTiers,
            villeTiers: villeTiers,
            paysTiers: paysTiers,
            departmentCantonTiers: departmentCantonTiers,
            telephoneTiers: telephoneTiers,
            faxTiers: faxTiers,
            emailTiers: emailTiers,
            webTiers: webTiers,
            skypeTiers: skypeTiers,
            twitterTiers: twitterTiers,
            linkedinTiers: linkedinTiers,
            githubTiers: githubTiers,
            idProf1Tiers: idProf1Tiers,
            idProf2Tiers: idProf2Tiers,
            idProf3Tiers: idProf3Tiers,
            idProf4Tiers: idProf4Tiers,
            idProf5Tiers: idProf5Tiers,
            assujettiTVATiers: assujettiTVATiers,
            numeroTVATiers: numeroTVATiers,
            assujettiDeuxiemeTaxeTiers: assujettiDeuxiemeTaxeTiers,
            assujettiTroisiemeTaxeTiers: assujettiTroisiemeTaxeTiers,
            typeTiers: typeTiers,
            effectifsTiers: effectifsTiers,
            typeEntiteLegaleTiers: typeEntiteLegaleTiers,
            capitalTiers: capitalTiers,
            langueDefautTiers: langueDefautTiers,
            incotermsTiers: incotermsTiers,
            tagsClientsProspTiers: tagsClientsProspTiers,
            tagsFournisseursTiers: tagsFournisseursTiers,
            deviseTiers: deviseTiers,
            hauteurTiers: hauteurTiers,
            poidsTiers: poidsTiers,
            professionTiers: professionTiers,
            dateNaissanceTiers: dateNaissanceTiers,
            maisonMereTiers: maisonMereTiers,
            commercialAffecteTiers: commercialAffecteTiers,
        });
    }
    
    res.json("ok")
})

routeur.get('/listetiers', async (req:Request, res: Response) => {
    let listeTiers : Array<tiers> = await tiersdb.find({}).toArray()

    res.json(listeTiers)

    console.log(listeTiers)
})

export default routeur