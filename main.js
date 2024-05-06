


let getformvalue =  document.getElementById("submitbutton").addEventListener("click", getValue )
let animate = document.getElementById('main')
  
 function getValue(){
  let firstname = document.getElementById('firstname').value
   let lastname= document.getElementById('lastname').value
   let email= document.getElementById('Email').value
   let phoneNumber= document.getElementById('phoneNumber').value
  let password = document.getElementById('newpassword').value
   let confirmpassword= document.getElementById('confirmpassword').value
 
 
  let updatedata = {
  firstname:firstname,
  lastname :lastname,
  email :email,
  phoneNumber:phoneNumber,
  password:password,
  confirmpassword:confirmpassword,
  }
  if(email!==''&& confirmpassword!==''){
 
   fetch("/data",{
    method:"post",
    Headers:{"content-type":"application/json" },
    body:JSON.stringify(updatedata)
   })
 }
}

 let loginvalue = document.getElementById('login').addEventListener('click', logindata)

 function logindata(){
  let email = document.getElementById('username').value
  let password = document.getElementById('password').value
  console.log(email)
  let matchdata = {
    email,
    password,
  }
  console.log(matchdata)
  fetch("/logininfo", {
    method: "post",
    Headers:{"content-type":"application/json"},
    body:JSON.stringify(matchdata)
  }).then((data)=>{
      let resdata = data.text()
     return(resdata) 
  }).then((finalresult)=>{

    animate.innerHTML = finalresult

    console.log(finalresult)
  }).catch((err)=>{
    animate.innerHTML = `'<h1>sorry we don't have account with you</br>
    please signup for login </h1>'`
    console.log(err)
  })
 }
  
 let ani = document.getElementById('logedin').addEventListener('click',swapdivs)

 function swapdivs(){
  console.log(animate)
  animate.style.flexDirection = 'row-reverse';
  
 }

  