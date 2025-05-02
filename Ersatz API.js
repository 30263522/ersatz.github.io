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
Version: */ let APIVersion = 0.8+"5Beta"
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
const banksList = [ // {bankName:'bankName', bankType:'Partner/Owned', contractedSince:'date/00/00/2000', contractUpdate:'date/00/00/2001', Notes:{}}
]
const defaultTheme = 'LightMode' // Theme applied on first load
const themeStorageName = 'EE-Theme' // localstorage name used for saving theme.
const loginsStorageName = 'EE-Logins' // localstorage name used for saving loginsDatabase
const activeLoginStorageName = 'EE-Login-Active' // localstorage name used for saving active login information for user.
let hasLoggedIn = {State: false, UsedCredentials: {User:"", Pass:""}}
const subURL = "ersatz.github.io"
const baseURL = "https://30263522.github.io/ersatz.github.io"
let loginsDatabase = [
  {User:'User', Pass:'User'},
]
const Database = [] // JavaScript database array. 

// Versions
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
function redirectURL(URL, redirectType) { // Used for page redirects across the API.
  if (redirectType !=null) {redirectType=redirectType}
  else {redirectType='default'}
  if (getDatabaseRule() == false) {
    // HTTPS
    if (redirectType=='default') {location.assign('/'+subURL+URL)}
    if (redirectType=='replace') {location.replace('/'+subURL+URL)}
    if (redirectType=='returnAsset') {return baseURL+URL}
    if (redirectType=='newTab-E') {window.open(URL, '_blank').focus()}
  }
  else if (getDatabaseRule() == true) {
    // HTTP
    if (redirectType == 'default') {location.assign('/'+URL)}
    if (redirectType=='replace') {location.replace('/'+URL)}
    if (redirectType=='newTab-E') {window.open(URL, '_blank').focus()}
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
if (localStorage.getItem(loginsStorageName) !=null) {
  let fetchedArray = JSON.parse(localStorage.getItem(loginsStorageName))
  for (let a = 0; a<fetchedArray.length; a++) {
    loginsDatabase.push(fetchedArray[a])
  }
} else {
  console.info('New user detected: No Logins saved. Default logins only.')
  initaliseLogins()
}
// End of Logins Retrival
// Login Change
let parsedALSN = JSON.parse(localStorage.getItem(activeLoginStorageName))
if (localStorage.getItem(activeLoginStorageName) !=null && parsedALSN.State == true) {
  const findButton = document.getElementById('loginPageButton')
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
  localStorage.setItem(loginsStorageName, JSON.stringify(loginsDatabase))
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
  if (getDatabaseRule() == false) {
    const findUserBox = document.getElementById('userBox').value
    const findPassBox = document.getElementById('passBox').value
    let wrongpass = false;
    let wronguser = false;
    if (findUserBox !=null && findPassBox !=null) {
      // Code
      loginsDatabase.forEach(currlgn => {
        if (findUserBox == currlgn.User) {
          wronguser=false
          if (findPassBox == currlgn.Pass) {
            hasLoggedIn = {State: true, UsedCredentials: {User:findUserBox, Pass:findPassBox}}
            redirectURL('/', 'replace')
            saveLogins()
          }
          else {
            wrongpass=true
          }
        }
        else {
          wronguser=true
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
  if (getDatabaseRule() == false) {
    const findNewUserBox = document.getElementById('newUser').value
    const findNewPassBox = document.getElementById('newPass').value
    if (findNewUserBox !=null && findNewPassBox !=null) {
      let alreadyExists
      loginsDatabase.forEach(act => {
        if (findNewUserBox === act.User) {
          alreadyExists = true
        }
      })
      if (alreadyExists !=true) {
        loginsDatabase.push({User:findNewUserBox, Pass:findNewPassBox})
        hasLoggedIn = {State: true, UsedCredentials: {User:findNewUserBox, Pass:findNewPassBox}}
        saveLogins()
        redirectURL('/', 'replace')
      }
    }
    else {
      window.alert(APIName+": Missing either Username or Password, Field box is empty. Creation aborting...")
    }
  }
}
// End
// Login Initalisation
function initaliseLogins() {
  // Remove duplicates
  let oldArr = loginsDatabase
  let uniqueLogins = [];
  let uniqueObjects = {};

  oldArr.forEach(function(value) {
    if (!uniqueObjects[value]) {
      uniqueLogins.push(value);
      uniqueObjects[value] = true;
  }
  loginsDatabase = uniqueLogins
});
// End of Removing Duplicates
}
// End for initaliseLogins
// Login Page Initalisation
function initaliseLoginPage() {
  if (hasLoggedIn.State == true) {
    window.alert('404 - Access to this page was denied. This may be because you are already logged in!')
    redirectURL('/', 'replace')
  }
  document.getElementById('submitMyAnswers').addEventListener('click', function() {
    Login()
  })
}
// End of Login Page Initalisation
function initaliseCreatePage() {
  if (hasLoggedIn.State == true) {
    window.alert('404 - Access to this page was denied. This may be because you are already logged in!')
    redirectURL('/', 'replace')
  }
  document.getElementById('newSub').addEventListener('click', function() {
    createAccount()
  })
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