const {delay,askQuestion} = require('../utils/misc')
const {Builder, By, Key, until} = require('selenium-webdriver');
const {captchaSolverApi} = require("../utils/captchaSolver")
const {parse} = require('node-html-parser')
const {createUserObject} = require('../utils/generatingFunctions')
const fs = require('fs')
let FinalUser
const GetVoterByDetails =async(data)=>new Promise(async(resolve,reject)=>{
    let ListOfDict=[]
    let driver = await new Builder().forBrowser('firefox').build();
    try {
        await driver.get('https://electoralsearch.in/');
        let swapButton = await driver.findElement(By.id('continue'))
        swapButton.click();
        result = await driver.findElement(By.id("captchaDetailImg"))
        const image_data = await result.takeScreenshot()
        //fs.writeFile('image.txt',image_data)
        let name = await driver.findElement(By.id('name1'))
        name.sendKeys(data.Name, Key.RETURN);
        let dadName = await driver.findElement(By.id('txtFName'))
        dadName.sendKeys(data.FatherName,Key.RETURN)
        let age = await driver.findElement(By.xpath(`/html/body/div[4]/div[2]/div/div/div[1]/form/fieldset/div/div[1]/div[1]/div[2]/div/div[1]/div[2]/div[1]/select/option[${data.Age-16}]`));
        age.click()
        let gender = await driver.findElement(By.id('listGender'))
        gender.sendKeys(data.Gender,Key.RETURN)
        //TODO: Fix the state to be dynamic
        let state = await driver.findElement(By.xpath("/html/body/div[4]/div[2]/div/div/div[1]/form/fieldset/div/div[1]/div[2]/div/div/div/div/div[1]/div[2]/select/option[33]"))
        state.click()
        try{
            let captcha = await captchaSolverApi(image_data,driver)
            console.log(captcha)
            const ans = await askQuestion("Are you sure you want to deploy to PRODUCTION? ");
            let cap = await driver.findElement(By.id('txtCaptcha'))
            await cap.sendKeys(ans,Key.ENTER)
            try{
              await delay(4000)
              //block()
              let resultTreeMain = await driver.executeScript("return document.body.innerHTML")
              let rootMain = parse(resultTreeMain)
              let table = rootMain.querySelectorAll('td')
              //let ListOfDict = []
              let captionNumberId = rootMain.querySelector("#captionId")
              let numberOfElem = captionNumberId.childNodes[0]._rawText
              numberOfElem= Number(numberOfElem.substring(numberOfElem.indexOf(":")+2))
              let elem  = Math.min(numberOfElem*10,150)
              for(let i=0;i<elem;i+=10){
                  let currentUser = createUserObject(table[i+1].childNodes[0]._rawText.trim(),table[i+2].childNodes[0]._rawText.trim(),table[i+3].childNodes[0]._rawText.trim(),table[i+4].childNodes[0]._rawText.trim(),table[i+5].childNodes[0]._rawText.trim(),table[i+6].childNodes[0]._rawText.trim(),table[i+7].childNodes[0]._rawText.trim(),table[i+8].childNodes[0]._rawText.trim(),table[i+9].childNodes[0]._rawText.trim());
                  ListOfDict.push(currentUser)
                  if(i%10==0){
                      continue
                  }
              }
              console.log(ListOfDict)
              let currentElement = Math.abs(numberOfElem-elem);
              while(currentElement>0){
                  let nextElement = await driver.findElement(By.xpath("/html/body/div[5]/div[3]/div[3]/div/div/ul/li[5]/a"))
                  nextElement.click()
                  await delay(4000);
                  let resultTreeMain = await driver.executeScript("return document.body.innerHTML")
                  let rootMain = parse(resultTreeMain)
                  let table = rootMain.querySelectorAll('td')
                  let captionNumberId = rootMain.querySelector("#captionId")
                   let numberOfElem = captionNumberId.childNodes[0]._rawText
                  numberOfElem= Number(numberOfElem.substring(numberOfElem.indexOf(":")+2))
                  let elem  = Math.min(currentElement*10,150)
                  if(elem<150){
                      break;
                  }
                  for(let i=0;i<elem;i+=10){
                      let currentUser = createUserObject(table[i+1].childNodes[0]._rawText.trim(),table[i+2].childNodes[0]._rawText.trim(),table[i+3].childNodes[0]._rawText.trim(),table[i+4].childNodes[0]._rawText.trim(),table[i+5].childNodes[0]._rawText.trim(),table[i+6].childNodes[0]._rawText.trim(),table[i+7].childNodes[0]._rawText.trim(),table[i+8].childNodes[0]._rawText.trim(),table[i+9].childNodes[0]._rawText.trim());
                      ListOfDict.push(currentUser)
                       if(i%10==0){
                          continue
                      }
                  }
                  currentElement = Math.abs(numberOfElem-currentElement);
              }
              console.log(ListOfDict)
  resolve(ListOfDict)

          }catch(e){
            console.log(ListOfDict)

  resolve(ListOfDict)

            //console.log(e)
            //throw new Error("Something went wrong")
          }

        } catch(error){
            console.log(ListOfDict)

  return ListOfDict

            console.log(error)
        }

  }catch(e){
    console.log(ListOfDict)

  resolve(ListOfDict)


  }
  console.log(ListOfDict)
  resolve(ListOfDict)

})

const GetVoterByEPIC =async(data)=>new Promise(async(resolve,reject)=>{
    try{
        let EPICId = data.EPICNo

    let updateFinalUserFromEpic
    let driver = await new Builder().forBrowser('firefox').build();
    await driver.get('https://electoralsearch.in/');
    let swapButton = await driver.findElement(By.id('continue'))
    swapButton.click();
    const element = await driver.findElement(By.xpath(`/html/body/div[4]/div[2]/div/div/ul/li[2]`))
    element.click()
    await delay(4000)
    const EpicInput = await driver.findElement(By.xpath(`//*[@id="name"]`))
    EpicInput.sendKeys(EPICId,Key.ENTER)
    let EpicCaptchaThing = await driver.findElement(By.xpath(`//*[@id="captchaEpicImg"]`))
    const image_data = await EpicCaptchaThing.takeScreenshot()
    //fs.writeFile('image.txt',image_data)

    //Captcha Solver
    //let captchaAnswer = await captchaSolverApi(image_data)
    const ans = await askQuestion("Are you sure you want to deploy to PRODUCTION? ");
    const EpicCaptcha = await driver.findElement(By.xpath(`//*[@id="txtEpicCaptcha"]`))
    EpicCaptcha.sendKeys(ans,Key.RETURN)
    const result = await delay(6000)
    const resultPage = await driver.findElement(By.xpath(`/html/body/div[5]/div[3]/div[2]/div/table/tbody/tr/td[1]/form/input[25]`))
    resultPage.click()
    const secondResult = await delay(6000)
    let windows = await driver.getAllWindowHandles()
    let new_window = windows[1]
    await driver.switchTo().window(new_window)
    let stateData = await driver.findElement(By.xpath(`/html/body/bo/div[2]/div/div[1]/form/table/tbody/tr[3]/td[2]`)).getText()
    let ACData = await driver.findElement(By.xpath(`/html/body/bo/div[2]/div/div[1]/form/table/tbody/tr[4]/td[2]`)).getText()
    let PCData = await driver.findElement(By.xpath(`/html/body/bo/div[2]/div/div[1]/form/table/tbody/tr[5]/td[2]`)).getText()
    let NameData = await driver.findElement(By.xpath(`/html/body/bo/div[2]/div/div[1]/form/table/tbody/tr[7]/td`)).getText()
    let EpicData = await driver.findElement(By.xpath(`/html/body/bo/div[2]/div/div[1]/form/table/tbody/tr[9]/td[2]`)).getText()
    let PartNumber = Number(await driver.findElement(By.xpath(`/html/body/bo/div[2]/div/div[1]/form/table/tbody/tr[12]/td[2]`)).getText())
    let SerialNumber = Number(await driver.findElement(By.xpath(`/html/body/bo/div[2]/div/div[1]/form/table/tbody/tr[14]/td[2]`)).getText())
    let PollingNumber = await driver.findElement(By.xpath(`/html/body/bo/div[2]/div/div[1]/form/table/tbody/tr[15]/td[2]`)).getText()
    let ACNumber = Number(ACData.substring(ACData.indexOf('-')+2).trim())
    updateFinalUserFromEpic = {stateData,ACData,PCData,NameData,EpicData,PartNumber,SerialNumber,PollingNumber,ACNumber}
    resolve(updateFinalUserFromEpic)
    
    }catch(e){
        reject(e.message)
    }
    
})
module.exports = {GetVoterByDetails,GetVoterByEPIC}