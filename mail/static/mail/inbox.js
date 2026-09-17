/*
// note : pour le rendu dynamique, permettant de mettre à jour les boites mails sans rechargment de navigateur
// Dans ton app.js ou inbox.js
const ws = new WebSocket(`ws://${window.location.host}/ws/inbox/`);
ws.onmessage = function(event) {
    const data = JSON.parse(event.data);
    // Ajouter le nouveau mail au DOM dynamiquement
};

*/


document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', async () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', async () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', async () => load_mailbox('archive'));
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

  formEl.addEventListener('submit', async (event) => {

    event.preventDefault();

    await send_email();

  });

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';

}

const send_email = async () => {

  console.log('init email compose form submission');

  const mailContent = {
    "recipients": document.querySelector('#compose-recipients').value,
    "subject": document.querySelector('#compose-subject').value,
    "body": document.querySelector('#compose-body').value
  }

  console.log("mailContent");
  console.log(mailContent);

  console.log("init database insertion");

  try {

    const response = await fetch('/emails', {
      method: 'POST',
      body: JSON.stringify(mailContent),
      headers: { 'Content-Type': 'application/json' },
    });

    const result = await response.json();

    // console.log(result);

    if (result.error) {

      console.error(result.error);
      return false;

    } else {

      console.log(result.message);
      return true;

    }

  } catch(err) {

    console.error(err);
    return false

  }

  // Once the email has been sent, load the user’s sent mailbox.
  // load_mailbox('sent');

}

const retrieve_mail_data = async (mailbox) => {

  console.log("init retrieve_mail_data func");
  console.log(`mailbox: ${mailbox}`);

  try {

    const response = await fetch(`/emails/${mailbox}`);
    const result = await response.json();

    if (result.error) {

      console.error(result.error);
      return false;

    } else {

      console.log(result);
      return true;

    }


  } catch (err) {

    console.error(err);
    return false;

  }

}

async function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

  // retrieve data

  await retrieve_mail_data(mailbox);

}