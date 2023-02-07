import React from "react";
import express, { IRouter, NextFunction, Request, Response } from "express";
import pdf from "pdfkit"
import fs from "fs"
import devisdb from "../modeles/devisdb";
import { ObjectId } from "bson";
import tiersdb from "../modeles/tiersdb";
import lignedb from "../modeles/lignedb";
import totauxdb from "../modeles/totauxdb";
import { addDays, addMonths } from "date-fns";

const routeur: IRouter = express.Router()

type devis = {
    _id: ObjectId,
    ref: string,
    status: string,
    client: string,
    date: string,
    dureeValid: string,
    conditionReg: string,
    modeReglement: string,
    dateLivraison: string
}

type tiers = {
    _id: ObjectId,
    code: string,
    nom: string,
    prenom: string
    adresse: string,
    adresse2: string,
    codepostal: string,
    ville: string,
    pays: string,
    departement: string,
    telephone:string,
    email:string,
    type: string,
    commercial: string
}
routeur.post("/create", async(req: Request, res: Response) => {

    const { clientid, date, dureevalid, conditionreg, modereglement, datelivraison} = req.body.data

    let listeDevis : Array<devis> = await devisdb.find({}).toArray()

    let infosClient: tiers = await tiersdb.findOne({"_id": new ObjectId(clientid)})

    let nbdevis : number = Number(listeDevis.length) + Number(1)

    let code : string = String(nbdevis).padStart(2, "0")

    let codeFinal = "PROV"+code

    console.log(infosClient)

    let resultat = await devisdb.insertOne({
        code : codeFinal,
        status: "brouillon",
        client: infosClient,
        date: date,
        dureevalid: dureevalid, 
        conditionreg: conditionreg, 
        modereglement: modereglement,
        datelivraison: datelivraison
    })

    totauxdb.insertOne({
        totalht: 0,
        totaltva: 0,
        totalttc: 0,
        element: resultat.insertedId
    })

    res.json(resultat.insertedId)
})

routeur.get("/liste", async(req:Request, res: Response) => {
    let listeDevis : Array<devis> = await devisdb.find({}).toArray()

    res.json(listeDevis)
})

routeur.post("/listebyid", async(req:Request, res:Response) => {

    let infosDevisById = await devisdb.findOne({
        "_id": new ObjectId(req.body.id),
    })

    res.json(infosDevisById)

    
})

routeur.post("/modifier", async(req:Request, res: Response) => {
    const { id } = req.body.data

    let reponse = await devisdb.find({
        "_id" : new ObjectId(id),
    })

    res.json(reponse)
})

routeur.get("/getpdf", (req: Request, res: Response) => {

    let devisid = req.query.id

    const path : string = "/var/appli/serveur/documents/devis/"+devisid+".pdf"
    if(fs.existsSync(path))
    {
        var file : any = fs.createReadStream(path)
        var stat: any = fs.statSync(path);
        res.setHeader('Content-Length', stat.size);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
        file.pipe(res);
    }
    else
    {
        res.json('NOTPDF')
    }

})

routeur.post('/valider', async(req: Request, res: Response) => {

    let dateMonthInt : Date = addMonths(new Date(), 1)
    let dateMonthDate: number = new Date(dateMonthInt).getMonth()
    let dateMonth: string = String(dateMonthDate).padStart(2, "0")

    let dateDayInt : Date = new Date()
    let dateDayDate : number = new Date(dateDayInt).getDate()
    let dateDay: string = String(dateDayDate).padStart(2, "0")


    let listeDevis : Array<devis> = await devisdb.find({}).toArray()

    let nbdevis : number = Number(listeDevis.length)

    let code : string = String(nbdevis).padStart(4, "0")

    let codeFinal : String = "PR"+dateDay+dateMonth+"-"+code

    let devisid = req.body.id
    devisdb.updateOne({"_id": new ObjectId(devisid)}, {$set:{
        code: codeFinal,
        status : "finale"
    }})

})

routeur.post("/genpdf", async(req:Request, res:Response) => {
    genpdf(req.body.id)

    console.log(req.body.id)
    
    res.json("ok")

})

const genpdf = async (id :string) => {

    let x : number = 20;
    let y : number = 20;
  
    const doc = new pdf({
        size:'A4',
        autoFirstPage:false,
        bufferPages: true,
        margins: {
            top: 125,
            bottom: 80,
            left: 72,
            right: 72
          }
    })
  
    doc.addPage()
    
    let path = '/var/appli/serveur/documents/devis/'+id+'.pdf'

    doc.pipe(fs.createWriteStream(path)); 

    // Register a font
    doc.registerFont('SegUI', '/var/appli/serveur/documents/polices/seguibl.ttf')

    const devis = await devisdb.findOne({"_id": new ObjectId(id)})
    const lignes = await lignedb.find({"element": id}).sort({index: 1}).toArray()
    const totaux = await totauxdb.findOne({"element": new ObjectId(id)})

    console.log(totaux)
    //Entete
    const DisplayEntete = () => {

        let x : number = 20
        let y : number = 10

        doc.image('/var/appli/serveur/documents/images/logoweb.png', x, y-10, {width: 80, height:80}) 
        
        doc.font("Helvetica-Bold")
        doc.fontSize(14)
        doc.fillColor("#1e3f64")
        doc.text("Proposition commerciale", doc.page.width - 200, y+10, {
            width: 200,
        })
        doc.fillColor("black")

        doc.font("Helvetica-Bold")
        doc.fontSize(10)
        doc.fillColor("#1e3f64")
        doc.text("Réf.:", doc.page.width - 100, y+25, {
            width: 100,
        })

        doc.font("Helvetica-Bold")
        doc.fontSize(10)
        doc.fillColor("#1e3f64")
        doc.text(devis.code, doc.page.width - 70, y+25, {
            width: 100,
        })

        doc.font("Helvetica")
        doc.fontSize(8)
        doc.fillColor("#1e3f64")
        doc.text("Date : "+new Date(devis.date).toLocaleDateString(), doc.page.width - 102, y+40, {
            width: 100,
        })

        doc.font("Helvetica")
        doc.fontSize(8)
        doc.fillColor("#1e3f64")
        doc.text("Date de fin de validité : "+new Date(devis.datevalid).toLocaleDateString(), doc.page.width - 162, y+50, {
            width: 200,
        })

        let client = devis.client
        doc.font("Helvetica")
        doc.fontSize(8)
        doc.fillColor("#1e3f64")
        doc.text("Code Client : "+client.code, doc.page.width - 135, y+60, {
            width: 100,
        })

        doc.fillColor("black")

        return doc.y

    }

    //Tiers
    const DisplayTiers = (y : number) => {
        
        let x : number = 20
        let longrect : number = 220
        let largrect : number = 110

        //Partie Gauche
        doc.font("Helvetica")
        doc.fontSize(8)
        doc.fillColor("black")
        doc.text("Emetteur :", x+10, y+40, {
            width: 100,
        })

        doc.rect(x, y+50, longrect, largrect).fillAndStroke("lightgrey");

        doc.font("Helvetica-Bold")
        doc.fontSize(10)
        doc.fillColor("#1e3f64")
        doc.text("RDInfo", x+10, y+60, {
            width: 100,
        })

        doc.font("Helvetica")
        doc.fontSize(8)
        doc.fillColor("#1e3f64")
        doc.text("2 Rue Maréchal Lannes", x+10, y+75, {
            width: 200,
        })

        doc.font("Helvetica")
        doc.fontSize(8)
        doc.fillColor("#1e3f64")
        doc.text("55000 Savonnières-devant-bar", x+10, y+85, {
            width: 200,
        })

        doc.font("Helvetica")
        doc.fontSize(8)
        doc.fillColor("#1e3f64")
        doc.text("Tèl : 09.70.19.51.90", x+10, y+105, {
            width: 200,
        })

        doc.font("Helvetica")
        doc.fontSize(8)
        doc.fillColor("#1e3f64")
        doc.text("Email : contact@rdinfo.fr", x+10, y+115, {
            width: 200,
        })

        doc.font("Helvetica")
        doc.fontSize(8)
        doc.fillColor("#1e3f64")
        doc.text("Site Internet : https://www.rdinfo.fr", x+10, y+125, {
            width: 200,
        })

        //Partie Droite
        doc.font("Helvetica")
        doc.fontSize(8)
        doc.fillColor("black")
        doc.text("Adressé à :", x+280, y+40, {
            width: 100,
        })

        let longrect2 : number = 270
        let largrect2 : number = 110

        doc.rect(x+270, y+50, longrect2, largrect2).stroke("grey")

        let client = devis.client
        
        x = 270
        doc.font("Helvetica-Bold")
        doc.fontSize(10)
        doc.fillColor("black")
        doc.text(client.nom, x+30, y+60, {
            width: 100,
        })

        doc.font("Helvetica")
        doc.fontSize(8)
        doc.fillColor("black")
        doc.text(client.adresse, x+30, y+75, {
            width: 200,
        })

        if(client.adresse2)
        {
            doc.font("Helvetica")
            doc.fontSize(8)
            doc.fillColor("black")
            doc.text(client.adresse2, x+30, y+85, {
                width: 200,
            })

            doc.font("Helvetica")
            doc.fontSize(8)
            doc.fillColor("black")
            doc.text(client.codepostal+(" ")+client.ville, x+30, y+95, {
                width: 200,
            })
        }
        else
        {
            doc.font("Helvetica")
            doc.fontSize(8)
            doc.fillColor("black")
            doc.text(client.codepostal+(" ")+client.ville, x+30, y+85, {
                width: 200,
            })
        }
              
        doc.font("Helvetica")
        doc.fontSize(8)
        doc.fillColor("black")
        doc.text("Tèl "+client.telephone, x+30, y+105, {
            width: 200,
        })

        doc.font("Helvetica")
        doc.fontSize(8)
        doc.fillColor("black")
        doc.text("Email: "+client.email, x+30, y+115, {
            width: 200,
        })

        return doc.y
    }

    
    const DisplayTabEntete = (y : number) => {

        let x :number = 20

        doc.font("Helvetica")
        doc.fontSize(8)
        doc.fillColor("black")
        doc.text("Montants Exprimés en Euros", doc.page.width - 140, y+45, {
            width: 150,
        })

        let longueur = 540
        let hauteur = 15
        let debuttab = y + 55

        doc.rect(x, debuttab, longueur, hauteur).fillAndStroke("black");

        //Designation
        doc.font("Helvetica")
        doc.fontSize(8)
        doc.fillColor("white")
        doc.text("Désignation", x, debuttab+4, {
            width: 320,
            align:'left'
        })

        .strokeColor("black")
        .lineWidth(1)
        .moveTo(x+320,debuttab)
        .lineTo(x+320,debuttab+15)
        .stroke()

        //TVA
        doc.font("Helvetica")
        doc.fontSize(8)
        doc.fillColor("white")
        doc.text("TVA", x+320, debuttab+4, {
            width: 50,
            align:'center'
        })

        .strokeColor("black")
        .lineWidth(1)
        .moveTo(x+370,debuttab)
        .lineTo(x+370,debuttab+15)
        .stroke()

        //P.U HT
        doc.font("Helvetica")
        doc.fontSize(8)
        doc.fillColor("white")
        doc.text("P.U HT", x+370, debuttab+4, {
            width: 50,
            align:'center'
        })

        .strokeColor("black")
        .lineWidth(1)
        .moveTo(x+420,debuttab)
        .lineTo(x+420,debuttab+15)
        .stroke()

        //Quantité
        doc.font("Helvetica")
        doc.fontSize(8)
        doc.fillColor("white")
        doc.text("Qté", x+420, debuttab+4, {
            width: 50,
            align:'center'
        })

        .strokeColor("black")
        .lineWidth(1)
        .moveTo(x+470,debuttab)
        .lineTo(x+470,debuttab+15)
        .stroke()

        doc.font("Helvetica")
        doc.fontSize(8)
        doc.fillColor("white")
        doc.text("Total HT", x+470, debuttab+4, {
            width: 80,
            align:'center'
        })

        return doc.y
    }  

    
    const DisplayTabStruct = (debuttab : number, tailletableau: number, y: number) => {

        let longueur = 540
        let taillerect = tailletableau - debuttab
       
        //Structure
        doc.rect(x, debuttab, longueur, taillerect).stroke("grey")
       
        //Désignation
        doc
        .strokeColor("black")
        .lineWidth(1)
        .moveTo(x+320,debuttab)
        .lineTo(x+320,tailletableau)
        .stroke()

        //TVA
        .strokeColor("black")
        .lineWidth(1)
        .moveTo(x+370,debuttab)
        .lineTo(x+370,tailletableau)
        .stroke()

        //P.U HT
        .strokeColor("black")
        .lineWidth(1)
        .moveTo(x+420,debuttab)
        .lineTo(x+420,tailletableau)
        .stroke()

        //Quantité
        .strokeColor("black")
        .lineWidth(1)
        .moveTo(x+470,debuttab)
        .lineTo(x+470,tailletableau)
        .stroke()

        return y
        
    }

    const DisplayLigneData = (posy: number, data: any) => {

        let x = 20
       
        doc.font("Helvetica")
        doc.fontSize(9)
        doc.fillColor("black")
        doc.text(data.desc, x+15, posy,{
            lineBreak:false,
            align:'left',
            height:50,
            width:320,
        })

        doc.font("Helvetica")
        doc.fontSize(9)
        doc.fillColor("black")
        doc.text(data.tva,x+320,posy,{
            lineBreak:false,
            align:'right',
            height:50,
            width:50,
        })
            
        doc.font("Helvetica")
        doc.fontSize(9)
        doc.fillColor("black")
        doc.text(data.pu,x+370,posy,{
            lineBreak:false,
            align:'right',
            height:50,
            width:50,
        })

        doc.font("Helvetica")
        doc.fontSize(9)
        doc.fillColor("black")
        doc.text(data.qte,x+420,posy,{
            lineBreak:false,
            align:'right',
            height:50,
            width:50,
           
        })

        doc.font("Helvetica")
        doc.fontSize(9)
        doc.fillColor("black")
        doc.text(data.montantht,x+450,posy, {
            lineBreak:false,
            align:'right',
            height:50,
            width:80,
        }) 
    
        doc.moveDown(2)

        return doc.y

    }

    const DisplayTabData = (y : number) => {

        let ligney = 0
        let pos = []

        for(let i = 0 ; i < lignes.length ; i++)
        {          
            y = y + 15

            pos[i] = y

            if(lignes[i].type === "titre")
            {
                doc.font("Helvetica-Bold")
                doc.fontSize(10)
                doc.fillColor("blue")
                doc.text(lignes[i].desc,x+5,y, {
                    align:'left',
                    underline: true,
                })
                
                doc.fillColor("black")

                doc.moveDown(0.5)

            }
            else if(lignes[i].type === "soustotal")
            {
                                 
                doc.rect(x,y,540,15).fillAndStroke("lightgrey")

                doc.font("Helvetica-Bold")
                doc.fontSize(9)
                doc.fillColor("black")
                doc.text("Sous Total "+lignes[i].desc,30,Number(y) + 3, {
                    width:250,
                    align:'left'
                })

                doc.font("Helvetica-Bold")
                doc.fontSize(9)
                doc.fillColor("black")
                doc.text(lignes[i].montantsoustotal,450,Number(y) + 3,{
                    width:100,
                    align:'right',
                })  

                y = doc.y + 1
            }
            else
            {
                ligney = DisplayLigneData(pos[i], lignes[i])   
            }
                      
        }

        return doc.y
    }

    const DisplayPied = (y : number) => 
    {
        let x =  20
        
        const DisplayPiedGauche = (x : number, y: number) => {

            doc.fontSize(7)
            doc.font('Helvetica-Bold')
            doc.text("Date prévue de livraison:",x, y)
            
            //Condition de Reglement
            doc.font('Helvetica-Bold')
            doc.text("Conditions de règlement:",x,y+15)
            doc.font('Helvetica')
            doc.text(devis.conditionreg,x+100,y+15)
    
            if(devis.modreg === "Virement")
            {
                doc.font('Helvetica-Bold')
                doc.text("Reglement par virement sur le compte bancaire suivant:",x,y+35)
                doc.font('Helvetica')
                doc.fontSize(6)
                doc.text("Banque : Banque Populaire",x,y+45)
    
                //Code Banque
                .strokeColor("black")
                .lineWidth(1)
                .moveTo(x,y+55)
                .lineTo(x,y+70)
                .stroke()
    
                doc.font('Helvetica-Bold')
                doc.text("Code Banque",x+5,y+57.5,{
                    align:'left',
                    width:50,
                })
    
                doc.font('Helvetica')
                doc.text("14707",x+15,y+65,{
                    align:'left',
                    width:50,
                })
    
                //Code Guichet
                .strokeColor("black")
                .lineWidth(1)
                .moveTo(x+50,y+55)
                .lineTo(x+50,y+70)
                .stroke()
    
                doc.font('Helvetica-Bold')
                doc.text("Code Guichet",x+55,y+57.5,{
                    align:'left',
                    width:50,
                })
    
                doc.font('Helvetica')
                doc.text("00021",x+65,y+65,{
                    align:'left',
                    width:50,
                })
    
                //Numéro de Compte
                .strokeColor("black")
                .lineWidth(1)
                .moveTo(x+100,y+55)
                .lineTo(x+100,y+70)
                .stroke()
    
                doc.font('Helvetica-Bold')
                doc.text("Numéro de Compte",x+105,y+57.5,{
                    align:'left',
                    width:80,
                })
    
                doc.font('Helvetica')
                doc.text("32221158879",x+115,y+65,{
                    align:'left',
                    width:50,
                })
    
                //CLE
                .strokeColor("black")
                .lineWidth(1)
                .moveTo(x+170,y+55)
                .lineTo(x+170,y+70)
                .stroke()
    
                doc.font('Helvetica-Bold')
                doc.text("Clé",x+180,y+57.5,{
                    align:'left',
                    width:50,
                })
    
                doc.font('Helvetica')
                doc.text("70",x+180,y+65,{
                    align:'left',
                    width:50,
                })
    
                //FINTABLEAU
                .strokeColor("black")
                .lineWidth(1)
                .moveTo(x+200,y+55)
                .lineTo(x+200,y+70)
                .stroke()
    
                doc.font('Helvetica')
                doc.fontSize(6)
                doc.text("Adresse Bar-le-Duc",x,y+80)
    
                doc.font('Helvetica')
                doc.fontSize(6)
                doc.text("Nom du Propriétaire du compte",x,y+90)
    
                doc.font('Helvetica-Bold')
                doc.fontSize(6)
                doc.text("Code IBAN :FR76 1470 7000 2132 2211 5887 970",x,y+100)
    
                doc.font('Helvetica-Bold')
                doc.fontSize(6)
                doc.text("Code BIC/SWIFT: CCBPFRPPMTZ",x,y+110)
    
            }
        } 

        const DisplayPiedDroite = (x: number, y: number) => {

            x = 20

            doc.fontSize(8)
            doc.font('Helvetica')
            doc.text("Total HT", x+320, y-5, {
                width:100,
                align:'left'
            })

            doc.text(Number(totaux.totalht).toFixed(2),x+490, y-5, {
                width: 50,
                align:'right'
            })

            doc.text("Total TVA 20%", x+320, y+5,{
                width:100,
                align:'left'
            })

            doc.text(Number(totaux.totaltva).toFixed(2),x+490, y+5, {
                width: 50,
                align:'right'
            })

            doc.rect(x+320,y+15, 222,10).fillAndStroke("lightgrey")

            doc.fillColor("#1e3f64")
            doc.text("Total TTC", x+320, y+17.5,{
                width:100,
                align:'left'
            })

            doc.text(Number(totaux.totalttc).toFixed(2), x+490, y+17.5,{
                width:50,
                align:'right'
            })
            doc.fillColor('black')
        }
        
        DisplayPiedGauche(x,y) 
        DisplayPiedDroite(x,y)  
        
        
    }

    const DisplayInfosPage = (page: number,nbpages: number) => {
        
        doc.switchToPage(page)
        x = 20
        y = doc.page.height - 20
                        
        doc.fontSize(6)
        doc.strokeColor("grey")
        .lineWidth(1)
        .moveTo(x,y)
        .lineTo(550,y)
        .stroke()

        doc.font('Helvetica')
        doc.text("Entreprise Unipersonnelle à Responsabilité Limitée (EURL) - Capital de 10 000 € - SIRET : 84172731600017",x,y+5,{
            width: 570,
            height:50,
            align:'center'
        })

        let pagefinal = Number(page) + Number(1)
        let nbpagesfinal = Number(nbpages) 
        
        doc.text(pagefinal+"/"+nbpagesfinal,x+500,y+5,{
            width: 10,
            height:50,
            align:'left'
        })

        
    }
    
    const DisplayTableau = (y: number,tailleentete : number) => {

        let debuttab = 68
        const debutentete = 5
        let marge = doc.page.height - 50
  
        y = DisplayTabEntete(y)
        y = DisplayTabData(y)
    
        let tailletableau : number = y - tailleentete
        let limite = 600
    
        let range = doc.bufferedPageRange()
        
        let nbpages = range.count + range.start
        
        for(let i = 0 ; i < nbpages ; i ++)
        {    
            DisplayInfosPage(i,nbpages)
            if(i == 0 && nbpages == 1)
            {                
                if(y > limite)
                {
                    debuttab = 274
                    tailletableau = marge
                    doc.switchToPage(0)
                    DisplayTabStruct(debuttab,tailletableau,y) 
                    doc.addPage()
                    
                                        
                    if(i == nbpages - 1)
                    {
                        doc.switchToPage(i+1)
                        debuttab = 120
                        tailletableau = 600
                        DisplayEntete()
                        DisplayTabEntete(50) 
                        y = DisplayTabStruct(debuttab,tailletableau,y) 
                        DisplayPied(tailletableau+10)
                    }
                }
                else
                {
                    debuttab = 274
                    marge = 600
                    doc.switchToPage(0)
                    y = DisplayTabStruct(debuttab,marge,y) 
                    DisplayPied(marge+10)   
                }                
            }
            else if(i >= 1 && nbpages > 1)
            {
                if(y > limite)
                {
                    debuttab = 274
                    tailletableau = marge
                    doc.switchToPage(0)
                    DisplayTabStruct(debuttab,tailletableau,y)
                   
                    if(i == nbpages - 1)
                    {
                        doc.addPage()
                        //pagereel++
                        doc.switchToPage(i)
                        DisplayEntete()
                        DisplayTabEntete(50)
                        debuttab = 120
                        tailletableau = marge
                        y = DisplayTabStruct(debuttab,tailletableau,y) 
                        doc.switchToPage(i+1)
                        DisplayEntete()
                        DisplayTabEntete(50)
                        debuttab = 120
                        tailletableau = 600
                        y = DisplayTabStruct(debuttab,tailletableau,y) 
                        DisplayPied(tailletableau+10)
                    }
                    else
                    {
                        doc.switchToPage(i)
                        debuttab = 120
                        tailletableau = 600
                        DisplayEntete()
                        DisplayTabEntete(50) 
                        y = DisplayTabStruct(debuttab,marge,y) 
                    }
                }
                else
                {                   
                    debuttab = 274
                    tailletableau = marge
                    doc.switchToPage(0)
                    DisplayTabStruct(debuttab,tailletableau,y) 
                    
                    if(i == nbpages - 1)
                    {
                        
                        doc.switchToPage(i)
                        debuttab = 120
                        tailletableau = 600
                        DisplayEntete()
                        DisplayTabEntete(50) 
                        y = DisplayTabStruct(debuttab,tailletableau,y) 
                        DisplayPied(tailletableau+10) 
                    }
                    else
                    {
                        
                        doc.switchToPage(i)
                        debuttab = 120
                        tailletableau = 600
                        DisplayEntete()
                        DisplayTabEntete(50) 
                        y = DisplayTabStruct(debuttab,marge,i) 
                    
                    }
                     
                }  
            }
            
        }
       
        return y
    }

    y = DisplayEntete()
    y = DisplayTiers(y)
   
    let taillentete : number = y 

    y = DisplayTableau(y, taillentete)

    doc.end()
}  

export default routeur