function mailMe(){
    let emailName = document.getElementById("myMail").value
    console.log(emailName)
    let emailText = document.getElementById("myMessage").value
    console.log(emailText)
    emailText = emailText.replaceAll(" ",'%20')
    console.log(emailName)
    console.log(emailText)
    const mailtoHandle = document.createElement('a')
    mailtoHandle.id = "mailto-Click"
    mailtoHandle.href = `mailto:Support@ersatz.com?subject="Ersatz Contact"&body=${emailText}`
    document.body.appendChild(mailtoHandle)
    mailtoHandle.click()

}