let registri = [];

function creaRegistro() {
  let nomeSezione = document.getElementById('sezione').value;
  let nomeMateria = document.getElementById('materia').value;

  if (nomeSezione && nomeMateria) {
    let registro = {
      nomeSezione: nomeSezione,
      nomeMateria: nomeMateria,
    };

    registri.push(registro);

    aggiornaInterfaccia();

    document.getElementById('formContainer').style.display = 'block';
    document.getElementById('creaRegistroContainer').style.display = 'none';
  } else {
    alert('Inserisci entrambi i nomi.');
  }
}

function aggiornaInterfaccia() {
  let registriContainer = document.getElementById('registri');
  registriContainer.innerHTML = '';

  registri.forEach((registro, index) => {
    let registroElement = document.createElement('div');
    registroElement.innerHTML = `<p>Sezione: ${registro.nomeSezione}, Materia: ${registro.nomeMateria}</p>`;
    registriContainer.appendChild(registroElement);
  });
}

function aggiungiStudente() {
  let nome = document.getElementById('nome').value;
  let cognome = document.getElementById('cognome').value;
  let telefono = document.getElementById('telefono').value;
  let email = document.getElementById('email').value;

  if (nome === '' || cognome === '' || telefono === '' || email === '') {
    alert('Si prega di compilare tutti i campi.');
    return;
  }

  let row = `<tr>
               <td>${nome}</td>
               <td>${cognome}</td>
               <td>${telefono}</td>
               <td>${email}</td>
             </tr>`;

  document.querySelector('#registro tbody').insertAdjacentHTML('beforeend', row);

  document.getElementById('studentForm').reset();
}
