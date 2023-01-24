
const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const number = document.querySelector('#Phone');
const msg = document.querySelector('.msg');
const userList = document.getElementById('users');


// Listen for form submit
myForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
    e.preventDefault();
  if(nameInput.value === '' || emailInput.value === '' || number.value === '') {
    // alert('Please enter all fields');
    msg.classList.add('error');
    msg.innerHTML = 'Please enter all fields';

    // Remove error after 3 seconds
    setTimeout(() => msg.remove(), 3000);
  } else {
    const userDetails = {
      name :nameInput.value,
      email: emailInput.value,
      phone :number.value
    }
   
    //showNewUserOnScreen(userDetails)

    axios.post('https://crudcrud.com/api/af31aca9e62348c8bb8fb49cb296b577/BookingApp',
      userDetails)
    .then(res=>{
      console.log('data succesfully loaded')
      showNewUserOnScreen(res.data)
    })
    .catch(err=>console.log(err))
    //clearFields
    nameInput.value = ""
    emailInput.value =""
    number.value =""
  }
}
   window.addEventListener("DOMContentLoaded",()=>{
     axios.get('https://crudcrud.com/api/af31aca9e62348c8bb8fb49cb296b577/BookingApp')
     .then(res=>{
        
        for(let i=0;i<res.data.length;i++){
          showNewUserOnScreen((res.data)[i])
        }
       
     })
     .catch(err=>console.error(err))
     }) 
    function showNewUserOnScreen(user){
      const parentNode = userList
      const childHTML = `<li id=${user._id}>${user.name} - ${user.email} - ${user.phone} 
                          <button onclick=deleteUser('${user._id}')>Delete</button>
                          <button onclick=editDetails('${user.name}','${user.email}','${user.phone}',${user._id})>Edit</button></li>`
       parentNode.innerHTML = parentNode.innerHTML + childHTML
    }
function deleteUser(id){
  if(confirm("sure delete?")){
      axios.delete(`https://crudcrud.com/api/af31aca9e62348c8bb8fb49cb296b577/BookingApp/${id}`)
      .then(console.log('delete success'))
      .catch(err=>console.log(err))
     removeUserFromScreen(id)
  }
    
  } 
  function removeUserFromScreen(id){
    const parentNode = userList
    const childNodeToBeDeleted = document.getElementById(id);
    parentNode.removeChild(childNodeToBeDeleted)
  }
function editDetails(name,email,phone,id){
  document.getElementById('name').value=name
  document.getElementById('email').value=email
  document.getElementById('Phone').value=phone
  deleteUser(id) 
  removeUserFromScreen(id)
} 