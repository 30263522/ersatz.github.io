/*
Standardised API controller for Ersatz Website
Contains: Theme Controller, General Functions, Global Functions, Error Handling

Developed by Jonah

  Group Information:
Group: Group 4
Members: Jonah, Karl, Tilda and Rahul

  API Information:
For use within Ersatz Enterprises Website
Home Page must be redirect "/"
Each individual page should be a folder with "index.html" inside for "/pagename" redirect.
Pages: Home (/), Contact Us (/Contact-Us), About Us (/About-Us), Banks (/Banks), Error (/err or /Error) and Login (/Login) / Create Account (/Login/Create)
Version: */ let APIVersion = 0.4+"Beta"
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
const baseURL = "ersatz.github.io"
const loginSystem = [
  {User:'Template', Pass:'Template'}
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
  if (redirectType !=null) {redirectType=redirectType} // Checks if redirectType has a value
  else {redirectType='default', console.warn('urlRedirect() called without redirectType, Defaulted to redirectType: Default; Provide this parameter for custom type.')} // Sets default if no value
  if (URL !=null) { // Ensures URL has a parameter, or prevents the function running.
    if (redirectType=='replace') {location.replace(URL)}
    else if (redirectType=='default') {location.assign(URL)}
    else if (redirectType=='newTab') {window.open(URL, '_blank')}
    else if (redirectType=='newTab-F') {window.open(URL, '_blank').focus()}
  } else { // Prevents function running if no URL.
    console.error('urlRedirect() called expecting parameter "URL" but "URL" not provided. urlRedirect-Types: replace, default, newTab, newTab-F')
  }
}
// End of Redirect Function
// Login Page Rule Function
function getDatabaseRule() {
  // Return Information: True = PhP, False = JavaScript, Error = Error
  if (getURLElements().protocol = 'http:') {
    console.info('JS Database Management will be handled under the HTTP rule: PhP will handle database requests.')
    return true
  }
  else if (getURLElements().protocol = 'https:') {
    console.info('JS Database Management will be handled under the HTTPS rule: JavaScript will handle database requests.')
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

// Theme Button - Function
// To be added
// End

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
// Login Function
function Login() {
  if (getDatabaseRule() == false) {
    const findUserBox = document.getElementById('userBox')
    const findPassBox = document.getElementById('passBox')
    if (findUserBox.Value !=null && findPassBox.Value !=null) {
      // Code

    }
    else {
      window.prompt(APIName+" Missing either Username or Password, Field box is empty. Login aborting...")
    }
  }
}
// End of Login Function

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
      returnAddress = '/'+baseURL
      localStorage.setItem('EEA-errHandle-Return', returnAddress)
    }
    location.replace("/"+baseURL+"/Error") // Sends user to Error web page.
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
    redirectURL('/'+baseURL, 'replace')
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
    redirectURL('/'+baseURL, 'replace')
  }
}
// End of Error Handling

// Button Handlers
function initialiseSocialButtons() {
  const youtubeURL = 'https://youtube.com/@ErsatzEnterprises'
  const blueskyURL = 'https://bsky.app/profile/ErsatzEnterprises.bsky.social'
  const whatsappURL = 'https://whatsapp.com/download'
  const tiktokURL = 'https://tiktok.com/@ErsatzEnterprises'
// YouTube
  document.getElementById('YT').addEventListener('click', function(){
    redirectURL(youtubeURL, 'newTab-F')
})
// End of YouTube
// Bluesky
  document.getElementById('BS').addEventListener('click', function(){
    redirectURL(blueskyURL, 'newTab-F')
})
// End of Bluesky
// Whatsapp
  document.getElementById('WA').addEventListener('click', function(){
    redirectURL(whatsappURL, 'newTab-F')
})
// End of WhatsApp
// TikTok
  document.getElementById('TT').addEventListener('click', function(){
    redirectURL(tiktokURL, 'newTab-F')
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