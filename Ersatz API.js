/*
Standardised API controller for Ersatz Website
Contains: Theme Controller, General Functions, Global Functions, Error Handling

Developed by Jonah

  Group Information:
Group: Group 4\
Members: Jonah, Karl, Tilda and Rahul

  API Information:
For use within Ersatz Enterprises Website
Home Page must be redirect "/"
Each individual page should be a folder with "index.html" inside for "/pagename" redirect.
Pages: Home (/), Contact Us (/Contact-Us), About Us (/About-Us), Banks (/Banks), Error (/err or /Error) and Login (/Login) / Create Account (/Login/Create)
Version: */ let APIVersion = 1.1
const APIName = 'Ersatz Enterprises API'

// Configuration Variables
const themesArray = [ // Avaliable Types: Text; Background; Button
  {Class:'DefaultText', Type:'Text', Themes:{DarkMode:'white', LightMode:'black'}},
  {Class:'DefaultBack', Type:'Background', Themes:{DarkMode:'white', LightMode:'black'}},
  {Class:'Heading', Type:'Text', Themes:{DarkMode:'pink', LightMode:'red'}},
  {Class:'Paragraph', Type:'Text', Themes:{DarkMode:'orange', LightMode:'yellow'}},
  {Class:'MHeading',Type:'Text', Themes:{DarkMode:'purple', LightMode:'green'}},
  {Class:'Background', Type:'Background', Themes:{DarkMode:'black', LightMode:'white'}}
]
const banksList = [ // {bankName:'bankName', bankType:'Partner/Owned', contractedSince:'date/00/00/2000', Notes:""}
  {bankName:'North Bank', bankType:'Partner', contractedSince:'07/10/2020', City:"Ottwa", Country: "Canada", Notes:"No Notes"},
  {bankName:'South Bank', bankType:'Owned', contractedSince:'11/09/2021', City:"Mexico City", Country: "Mexico", Notes:"We paid for this bank"},
  {bankName:'Floodbanks', bankType:'Owned', contractedSince:'11/09/2021', City:"York", Country: "United Kingdom", Notes:"Has a lot of rain"},
  {bankName:'The Breadwinner', bankType:'Partner', contractedSince:'11/09/2021', City:"Paris", Country: "France", Notes:"No Notes"},
  {bankName:'East Bank', bankType:'Partner', contractedSince:'20/01/2025', City:"Berlin", Country: "Germany", Notes:"Builds financial roads to success"},
  {bankName:"Thatcher's bank", bankType:'Partner', contractedSince:'20/01/2025', City:"New York", Country: "USA", Notes:"No Notes"},
   
]
const defaultTheme = 'LightMode' // Theme applied on first load
const themeStorageName = 'EE-Theme' // localstorage name used for saving theme.
const loginsStorageName = 'EE-Logins' // localstorage name used for saving loginsDatabase
const activeLoginStorageName = 'EE-Login-Active' // localstorage name used for saving active login information for user.
let hasLoggedIn = {State: false, UsedCredentials: {User:"", Pass:""}}
const subURL = "ersatz.github.io"
const baseURL = "https://30263522.github.io/ersatz.github.io"
const template = [{User: 'Temp', Pass:obfuscate('Temp')}]
const Database = [] // JavaScript database array. 

// Versions
let newLoginsDB = []
function logAPIVersion() {
  console.info(APIName+': Version: || '+APIVersion);
}

function getAPIVersion() {
  return APIVersion
}
// End of Versions

// Global Functions
// Get URL elements
function getURLElements() {
  const urlElements = {
    host, hostname, href, origin, pathname, port, protocol, search
  } = window.location // Collects parts of the URL for JS for use
  return urlElements // Returns the collected parts broken down into a object.
}
// End of Get URL Elements
// Redirect Function
function redirectURL(redirectLink, redirectType) { // Used for page redirects across the API.
  const dr = getDatabaseRule()
  if (redirectType !=null) {redirectType=redirectType}
  else {redirectType='default'}
  if (redirectLink !=null) {
    if (dr == false) {
      // HTTPS
      if (redirectType=='default') {location.assign('/'+subURL+redirectLink)}
      if (redirectType=='replace') {location.replace('/'+subURL+redirectLink)}
      if (redirectType=='newTab-E') {window.open(redirectLink, '_blank').focus()}
    }
    else if (dr == true) {
      // HTTP
      const newstring = redirectLink.slice(1)
      console.log(newstring)
      if (redirectType=='default') {location.assign(redirectLink)}
      if (redirectType=='replace') {location.replace(redirectLink)}
      if (redirectType=='newTab-E') {window.open(redirectLink, '_blank').focus()}
    }
  }
  else {
    window.alert(APIName+": An error occured while redirecting: Server returned: URL not provided.")
  }
}
// End of Redirect Function
// Login Page Rule Function
function getDatabaseRule() {
  // Return Information: True = PhP, False = JavaScript, Error = Error
  if (getURLElements().protocol == 'http:') {
    return true
  }
  else if (getURLElements().protocol == 'https:') {
    return false
  }
  else {
    console.error('Database Type Error: '+getURLElements().protocol,' is invalid.')
    return error
  }
}
// End of Login Page Rule function
// End of Global Functions

// Theme Management
let themeVar = '' // Local variable used for active theme.

// AutoExec 

// Theme Save - Retrieve
if (localStorage.getItem(themeStorageName) !=null) { // Checks if a theme is already saved in localstorage, if so, applies it.
  themeVar = localStorage.getItem(themeStorageName)
  executeTheme()
} else { // If no theme in localstorage, Applies the configurable default theme.
  console.info('New user detected: No Theme saved, defaulting to default theme.')
  themeVar = defaultTheme
  executeTheme()
}
// End of Retrieve
// Local Storage - Logins Retrieve
if (localStorage.getItem(loginsStorageName) == null) {
  localStorage.setItem(loginsStorageName, JSON.stringify(template))
}
// End of Logins Retrival
// Login Change
let parsedALSN = JSON.parse(localStorage.getItem(activeLoginStorageName))
if (localStorage.getItem(activeLoginStorageName) !=null && parsedALSN.State == true) {
  hasLoggedIn = parsedALSN
}

function initaliseLoggedIn() {
  const findAccountTopbar = document.getElementById('account')
  const findButton = document.getElementById('loginPageButton')
  if (hasLoggedIn.State == true) {
    findAccountTopbar.innerText = hasLoggedIn.UsedCredentials.User
    findAccountTopbar.style.visibility = 'visible'
    findButton.style.visibility = 'hidden'
  }
  findAccountTopbar.addEventListener('click', function() {
    console.log('Signing out...')
    localStorage.removeItem(activeLoginStorageName)
    findButton.style.visibility = 'visible'
    findAccountTopbar.style.visibility = 'hidden'
  })
}

// End of AutoExec

// Theme Execution - Function
function executeTheme() { // Applies theme changes to the client side (HTML)
  themesArray.forEach(cls => { // cls represents object actively being looped through.
    if (cls.Type == 'Text') {
      let elements = document.getElementsByClassName(cls.Class)
      for (let a = 0; a<elements.length; a++) {
        console.log(a+elements[a])
        elements[a].style.color = cls.Themes[themeVar]
      }
    }
    else if (cls.Type == 'Background') {
    try {    
      let elements2 = document.getElementsByClassName(cls.Class)
      for (let b = 0; b<elements2.length; b++) {
        elements2[b].style.backgroundColor = cls.Themes[themeVar]
      }
    }
    catch {
      let elements2 = document.getElementsByClassName(cls.Class)
      for (let b = 0; b<elements2.length; b++) {
        themesArray.forEach(test1 => {
          if (test1.Class == 'DefaultBack' && test1.Type=='Background' && test1.Themes[defaultTheme] !=null) {
            elements2[b].style.backgroundColor = test1.Themes[defaultTheme]
          }
          else {
            console.error(APIName+' Error: An issue occured while setting a background Class. This may occur because either the theme does not exist or the defaultTheme is not implemented to this Class.')
          }
        })
      }
    }


  }})} /*END of ExecuteTheme function*/
// End of Theme Execution

// Update avaliable themes
// To be added
// End
// Save Theme (Function)
function saveTheme() { // Executes automatically when page unloads, saves theme to localstorage.
  if (themeVar !=null) { // Ensures somehow the themeVar isn't blank.
    localStorage.setItem(themeStorageName, themeVar) // Sets the localstorage save with value.
  }
}
// End of Save Theme (Function)
// Save Logins (Function)
function saveLogins() {
  if (hasLoggedIn.State == true) {
    localStorage.setItem(activeLoginStorageName, JSON.stringify(hasLoggedIn))
  }
}
// End of Save Logins
// Retrive Active Login
function getActiveLogin() {
  if (localStorage.getItem(activeLoginStorageName) !=null) {
    let actLogin = JSON.parse(JSON.getItem(activeLoginStorageName))
    hasLoggedIn = actLogin
  }
}
// End of Retrive Active Login
// Login Function
function Login() {
  if (getDatabaseRule() == false || getDatabaseRule() == true) {
    const newLoginsDatabase = JSON.parse(localStorage.getItem(loginsStorageName))
    const findUserBox = document.getElementById('userBox').value
    const findPassBox = document.getElementById('passBox').value
    let wrongpass = true;
    let wronguser = true;
    if (findUserBox !=null && findPassBox !=null) {
      // Code
      newLoginsDatabase.forEach(currlgn => {
        if (findUserBox == currlgn.User) {
          wronguser=false
          if (findPassBox == deObfuscate(currlgn.Pass)) {
            hasLoggedIn = {State: true, UsedCredentials: {User:findUserBox, Pass:obfuscate(findPassBox)}}
            saveLogins()
            wrongpass=false
            redirectURL('/', 'replace')
          }
        }
      })
    }
    else {
      window.alert(APIName+": Missing either Username or Password, Field box is empty. Login aborting...")
    }
    if (wrongpass==true) {window.alert('Password is incorrect')}
    if (wronguser==true) {window.alert('Username is incorrect')}
  }
}
// End of Login Function
// Create Account
function createAccount() {
  if (getDatabaseRule() == false || getDatabaseRule() == true) {
    const findNewUserBox = document.getElementById('newUser').value
    const findNewPassBox = document.getElementById('newPass').value
    if (obfuscate(findNewPassBox) === false) {window.alert(APIName+': Failed to create account; Password contained one of these illegal characters: "|", "/", "`". Please avoid using these characters.')}
    else {
      const newLoginsDatabase = JSON.parse(localStorage.getItem(loginsStorageName))
      if (findNewUserBox !=null && findNewPassBox !=null) {
        let alreadyExists = false
        newLoginsDatabase.forEach(act => {
          if (findNewUserBox === act.User) {
            alreadyExists = true
        }
      })
      if (alreadyExists !=true) {
        hasLoggedIn = {State: true, UsedCredentials:{User:findNewUserBox, Pass:obfuscate(findNewPassBox)}}
        newLoginsDatabase.push({User:findNewUserBox, Pass:obfuscate(findNewPassBox)})
        localStorage.setItem(loginsStorageName, JSON.stringify(newLoginsDatabase))
        saveLogins()
        redirectURL('/', 'replace')
      }
      else {
        window.alert(APIName+': That Username is already taken!')
      }
    }
    else {
      window.alert(APIName+": Missing either Username or Password, Field box is empty. Creation aborting...")
    }
  }
}
}
// End
// End for initaliseLogins
// Login Page Initalisation
function initaliseLoginPage() {
  if (getURLElements().pathname === '/Login/' || getURLElements().pathname === subURL+'/Login/') {
    if (hasLoggedIn.State == true) {
      window.alert('404 - Access to this page was denied. This may be because you are already logged in!')
      redirectURL('/', 'replace')
    }
    document.getElementById('submitMyAnswers').addEventListener('click', function() {
      Login()
    })
    document.getElementById('createPageButton').addEventListener('click', function() {
      redirectURL('/Login/Create')
    })
  } else {
    console.error(APIName+': Something went wrong! initaliseLoginPage() called outside of Login page. This function is page limited.')
  }
}
// End of Login Page Initalisation
function initaliseCreatePage() {
  if (getURLElements().pathname === '/Login/Create/' || getURLElements().pathname === subURL+'/Login/Create/') {
      if (hasLoggedIn.State == true) {
        window.alert('404 - Access to this page was denied. This may be because you are already logged in!')
        redirectURL('/', 'replace')
      }
  document.getElementById('newSub').addEventListener('click', function() {
    createAccount()
  })
  } else {
    console.error(APIName+': Something went wrong! initaliseCreatePage() called outside of Create Account page. This function is page limited.')
  }
}
// End

// Error Handling
// Initiate
function initiateError(err, errType, returnAddress) { // Called with params in this order: err(Error), errType(errorType), returnAddress
  if (err !=null) {
    localStorage.setItem('EEA-errHandle-err', err)
    if (errType !=null) {errType=errType} else {errType='default'}
    localStorage.setItem('EEA-errHandle-type', errType)
    if (returnAddress !=null) {
      localStorage.setItem('EEA-errHandle-Return', returnAddress)
    }  else {
      returnAddress = '/'
      localStorage.setItem('EEA-errHandle-Return', returnAddress)
    }
    redirectURL('/Error', 'replace')
  } else {
    console.error('initiateError() called, but no Error provided.')
  }
}
// End of Initiate
// Initialise Error Page
function initialiseErrorPage() { // Called onload within Error page. No params required. To handle an error, use initiateError() with its params (err, errType, Return), See that function above.
  pathname = getURLElements().pathname
  if (pathname == '/Error' || pathname == '/Error/Fatal' || pathname == '/ersatz.github.io/Error') {
    // On Error page
  } else {
    window.alert(APIName+': Failed to initalise Error page. This may occur either because there is no active Error or page is not an Error page.')
    redirectURL('/', 'replace')
  }
}
// End of Initalise Error Page
// Unitialise Error Page
function uninitialiseErrorPage() { // Called onunload within Error page. No params required. To handle an error, use initiateError() with its params (err, errType, Return), See that function above.
  pathname = getURLElements().pathname
  if (pathname == '/Error' || pathname == '/Error/Fatal' || pathname == '/ersatz.github.io/Error') {
    // Uninitalise Code
  }
  else {
    window.alert(APIName+': Failed to uninitalise Error page. This may occur either because there is no active Error or page is not an Error page.')
    redirectURL('/', 'replace')
  }
}
// End of Error Handling

// Button Handlers
function initialiseSocialButtons() {
  const youtubeURL = 'https://youtube.com/@ErsatzEnterprises'
  const blueskyURL = 'https://bsky.app/profile/ErsatzEnterprises.bsky.social'
  const whatsappURL = 'https://whatsapp.com/download'
  const tiktokURL = 'https://tiktok.com/@ErsatzEnterprises'
  initaliseLoggedIn()
  // Login Button
  document.getElementById('loginPageButton').addEventListener('click', function(){
    redirectURL('/Login')
})
// End of Login Button
// YouTube
  document.getElementById('YT').addEventListener('click', function(){
    redirectURL(youtubeURL, 'newTab-E')
})
// End of YouTube
// Bluesky
  document.getElementById('BS').addEventListener('click', function(){
    redirectURL(blueskyURL, 'newTab-E')
})
// End of Bluesky
// Whatsapp
  document.getElementById('WA').addEventListener('click', function(){
    redirectURL(whatsappURL, 'newTab-E')
})
// End of WhatsApp
// TikTok
  document.getElementById('TT').addEventListener('click', function(){
    redirectURL(tiktokURL, 'newTab-E')
// End of TikTok  
})
}
function initialiseThemeButton() {
  document.getElementById('themesButton').addEventListener('mouseover', d=> {
    // Code for hover
  })
  document.getElementById('themesButton').addEventListener('mouseout', e=>{
     // Code for dehover
  })
}
function loginButton() {

}
// End of Button Handlers


// The Mailto function
function mailMe(){
  if (getURLElements().pathname === '/Contact-Us/' || getURLElements().pathname === '/ersatz.github.io/Contact-Us/') {
    let emailName = document.getElementById("myMail").value
    let emailText = document.getElementById("myMessage").value
    if (emailName !=null && emailName !="") {
       if (emailText !=null && emailText !="") {
        emailText = emailText.replaceAll(" ",'%20')
        console.log(emailName)
        console.log(emailText)
        const mailtoHandle = document.createElement('a')
        mailtoHandle.id = "mailto-Click"
        mailtoHandle.href = `mailto:Support@ersatz.com?subject=Ersatz Contact&body=${emailText}`
        document.body.appendChild(mailtoHandle)
        mailtoHandle.click()
        emailName = ""
        emailText = ""
    }
  }
  }
  else {
    console.error(APIName+': Something went wrong! mailMe() called outside of Contact Us page. This function is page limited.')
  }
}

// Bank Add
function addToBankTable(bankName="", bankType="", contractedSince="", city="", country="", notes="No Notes") {
  if (getURLElements().pathname == '/Banks/' || getURLElements().pathname == "/"+subURL+"/Banks/") {
    const getHTML = document.getElementById('bankTable');
    if (bankName !="" && bankType !="" && contractedSince !="" && notes!="" && city!="" && country!="") {
      const newElement = document.createElement('tr');
      newElement.className = "bankPageElements";
      newElement.innerHTML = `
      <td class='bankPageElements'>${bankName}</td>
      <td class='bankPageElements'>${bankType}</td>
      <td class='bankPageElements'>${contractedSince}</td>
      <td class='bankPageElements'>${city}</td>
      <td class='bankPageElements'>${country}</td>
      <td class='bankPageElements'>${notes}</td>`
      getHTML.appendChild(newElement)
    }
    else {
      console.error(APIName+": Attempt to call addToBankTable() without 1 or more required arguments.")
    }
  }
  else {
    console.error(APIName+": Attempt to run updateBanksPage() on a non-banks page. 411")
  }
}

// Banks Page
function updateBanksPage() {
  if (getURLElements().pathname == '/Banks/' || getURLElements().pathname == "/"+subURL+"/Banks/") {
    const findAllBanksElements = document.getElementsByClassName('bankPageElements')
    for (let a = 0; a<findAllBanksElements.length; a++) {
      findAllBanksElements[a].remove()
    }
    for (let b = 0; b<banksList.length; b++) {
      const findElement = banksList[b]
      addToBankTable(findElement.bankName, findElement.bankType, findElement.contractedSince, findElement.City ,findElement.Country, findElement.Notes)
    }
  }
  else {
    console.error(APIName+": Attempt to run updateBanksPage() on a non-banks page. 411")
  }
}

function obfuscate(Text) {
  const randomStrings = ["LnJytyTIYE36hA10Om", "xioPLXcP0o2by5PBDf", "MgGs6wTB7bHAnwVRMO", "G9yQwJwz7Oi4VPqDaW", "Prw5zU8YxElbBUoZML", "wPbMe4lB5H1hTiMRIZ","nShXk3lXzGWjOTwiwS","8hUDtvs2s7LubhzJKI","B1jPSAPs7Iphik9DlP","ACQkuuGC3H8YvA2hhY","8yly8gatbAFhLDefqo","XUygDBEPuaSNOqpGls","9zlfDvNUrq2h4aguch","uNEUBQ0EbkjySeCbj8","AZUC0YymGyI7XvbUax","L2m7GnfNwUf82515w0","L6Kkxb3lOW6LqSWlt9","InMMdYNx4YOzYDSxOT","WT7yKPIU97ARuw0Kc0","7puo6hNkHOLu4fT2d7","qVq8Ba24JQY6mSCY76","3VHLstmFp2jbU5XnbI","c5Nn66aIfgKlOZWxLS","nwahAbLKNIgsqT5AHQ","XoT6Bt5pZAYNFbUCvD","XdlnKNOfMQCEcLA1YX","GxkeWCM4JXJXLvBz12","lTecmtp9IG8RmjxQpL","EEn7wSGek5p9XC1ljk","CND6pqXRbVdubeys56",]
  const smallStrings = ["lXmop","kq7jy","Vhr63","hjchX","oIFhc","2l9oZ","rzrNB","lBBOw","LKFlC","ta5Pd","6xbWT","Zl1g7","wiUEl","w2Nzj","v4vJn","Z8p6n","HbGIZ","YY0Bu","0MoRn","BIiWi","wn0yA","OWYPA","uT3QV","qbK6n","AA9Xy","GvVFV","WfCBJ","C7emo","3dEWt","AiABC","nRis9","n9EaO","HNQBj","CcCHU","ppmUi","aJQ9o","NuJ5O","6Dqow","xXPCH","QvDt1",]
  const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M','N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  let randomStrings_len = 18
  let smallStrings_len = 5
  let allowed = true
  let input_len = Text.length
  let finals = []
  let endString = ""

  // Test String
  for (let test = 0; test<Text.length; test++) {
    let curr = Text.charAt(test);
    if (curr === "|" || curr === "/" || curr === "`") {
      allowed = false
    }
  }
  if (allowed === false) {return false}
  else {
    function getRnd(maxNum) {
    return Math.floor(Math.random() * maxNum);
  }

  function SlashChars() {
    for (let a = 0; a<Text.length; a++) {
      let currLetter = Text.charAt(a);

      finals.push(`${smallStrings[getRnd(smallStrings.length)]}@${alphabet[getRnd(alphabet.length)]}@|?|${currLetter}-|-z\@;`)
    }
  }
  SlashChars()
  finals.forEach(curr => {
    endString = endString+curr
  });

  function finishIt() {
    return `${randomStrings[getRnd(randomStrings.length)]}:)${endString}:(${randomStrings[getRnd(randomStrings.length)]}`
  }
  return finishIt()
  }
}

function deObfuscate(Text) {
  let randomStrings_len = 18
  let smallStrings_len = 5
  let endString = ""

  let Splitted = Text.split('|')
  for (let a = 2; a<Splitted.length; a=a+3) {
    let char = Splitted[a].slice(0,1)
    endString = endString+char
  }
  return endString
}

// Console - Creditor
console.warn(`
${APIName} (Version: ${APIVersion}) successfully started running in the background;
Ready for use.

Developed by Jonah  {Jonah@print3designs.uk}
Originally developed for: Ersatz Enterprise project
Project Team: Jonah, Karl, Tilda and Rahul
Team Number: 4
Team HTML Developer: Karl
Team JavaScript Programmer: Jonah
Quality Assurance Testers (QAT): Tilda and Rahul

This API handles all backend (JavaScript) functions of the website.
Current Version: ${APIVersion}
Selected Default Theme: ${defaultTheme}
API Name: ${APIName}

Error handling avaliable by function "initiateError(err, errType, ReturnURL)"

URL Handling avaliable, returned:
Current URL: ${getURLElements().href}
Current Host: ${getURLElements().host}
Current HostName: ${getURLElements().hostname}
Current Path: ${getURLElements().pathname}
Current Protocol: ${getURLElements().protocol}
`)