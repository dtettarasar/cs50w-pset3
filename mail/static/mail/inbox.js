document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // get the form html element + add the function to trigger on submission
  const formEl = document.querySelector("#compose-form");

  formEl.addEventListener('submit', (event) => {

    event.preventDefault();

    send_email();

  });

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';

}

const send_email = () => {

  console.log('init email compose form submission');

  const mailContent = {
    "recipients": document.querySelector('#compose-recipients').value,
    "subject": document.querySelector('#compose-subject').value,
    "body": document.querySelector('#compose-body').value
  }

  console.log("mailContent");
  console.log(mailContent);

  // Once the email has been sent, load the user’s sent mailbox.
  // load_mailbox('sent');

}

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
}