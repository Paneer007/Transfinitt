const pdfDownload = require('../utils/downloadPdf')
const DelhiScript =(num = '40', part = '9') =>{
    num = num.toString(),part=part.toString()
    let URL = `https://ceodelhi.gov.in/engdata/AC${num}/U05A${num}P${part}.pdf`;
    pdfDownload(URL, './', '/pdfs/English.pdf')
}
const GoaScript =(num = '4', part = '5') =>{
    num = num.toString(),part=part.toString()

    let URL = `https://ceogoa.nic.in/PDF/EROLL/MOTHERROLL/2021/${num}/S05A${num}P${part}.pdf`;
    pdfDownload(URL, './', '/pdfs/English.pdf')
}
const KarnatakaScript =(num, part) =>{
    num = num.toString(),part=part.toString()

    let URL = `https://www.elections.tn.gov.in/SSR2022_MR_05012022/dt4/ac${num}/ac${num}${part}.pdf`;
    pdfDownload(URL, './', '/pdfs/Kannada.pdf')
}
const KeralaScript =(num = '035', part = '2') =>{
    num = num.toString(),part=part.toString()

    let URL = `http://www.ceo.kerala.gov.in/pdf/voterslist/2022/ML/AC${num}/S11A35P${part}.pdf?download=1ZNEMLBOUI%2F59Jkt0qxLAw%3D%3D`;
    pdfDownload(URL, './', '/pdfs/Malayalam.pdf')
}
const ManipurScript =(num = '2', part = '1') =>{
    num = num.toString(),part=part.toString()

    let URL = `https://ceomanipur.nic.in/SSR2022/CU2022/1-Khundrakpam/MotherRoll/English/Integrated/2/S14A${num}P${part}.pdf`;
    pdfDownload(URL, './', '/pdfs/English.pdf')
}
const MeghalayaScript =(num = '60', part = '46') =>{
    num = num.toString(),part=part.toString()

    let siz = num.length
    let adder = ""
    for(let i=0; i<3-siz; i++){
        adder += "0"
    }
    num = adder + num
    adder = ""
    siz = part.length
    for(let i=0; i<4- siz; i++){
        adder += "0"
    }
    part = adder + part
    let URL = `https://ceomeghalaya.nic.in/erolls/pdf/english/A${num}/A${num}${part}.pdf`;
    pdfDownload(URL, './', '/pdfs/English.pdf')
}

const NagalandScript = (num = '6', part = '1')=>{
    num = num.toString(),part=part.toString()

    let URL = `https://ceo.nagaland.gov.in/Downloads/FinalRoll2022/9/S17A${num}P${part}.pdf`;
    pdfDownload(URL, './', '/pdfs/English.pdf')
}

const SikkimScript =(num = '6', part = '1') =>{
    num = num.toString(),part=part.toString()

    let URL = `https://ceosikkim.nic.in/UploadedFiles/ElectoralRollPolling/S21A${num}P${part}.pdf`;
    pdfDownload(URL, './', '/pdfs/English.pdf')
}

const TamilNaduScript =(num = '40', part = '100') =>{
    num = num.toString(),part=part.toString()
    let siz = num.length
    let adder = ""
    for(let i=0; i<3-siz; i++){
        adder += "0"
    }
    num = adder + num
    adder = ""
    siz = part.length
    for(let i=0; i<3- siz; i++){
        adder += "0"
    }
    part = adder + part
    let URL = `https://www.elections.tn.gov.in/SSR2022_MR_05012022/dt4/ac${num}/ac${num}${part}.pdf`;
    pdfDownload(URL, './', 'pdfs/Tamil.pdf')
}

let grandStateScript = {DelhiScript,GoaScript,KarnatakaScript,KeralaScript,ManipurScript,MeghalayaScript,NagalandScript,SikkimScript,TamilNaduScript}

module.exports = grandStateScript