function mailMe(){
    let emailName = document.getElementById("myMail").value
    console.log(emailName)
    let emailText = document.getElementById("myMessage").value
    console.log(emailText)
    emailText = emailText.replaceAll(" ",'%20')
    console.log(emailName)
    console.log(emailText)
}