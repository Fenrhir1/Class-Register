let registri = [];
let studenti = 0;

function creaRegistro() {
  let nomeSezione = document.getElementById('sezione').value;
  let nomeMateria = document.getElementById('materia').value;

  if (nomeSezione && nomeMateria) {
    let registro = {
      nomeSezione: nomeSezione,
      nomeMateria: nomeMateria,
      elencoStudenti: [],
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
    let modificaButton = document.createElement('button');
    modificaButton.innerText = 'Modifica';
    modificaButton.onclick = function() {
      modificaRegistro(index);
    };
    let cancellaButton = document.createElement('button');
    cancellaButton.innerText = 'Cancella';
    cancellaButton.onclick = function() {
      cancellaRegistro(index);
    };
    let dettaglioButton = document.createElement('button');
    dettaglioButton.innerText = 'Visualizza Dettaglio';
    dettaglioButton.onclick = function() {
      mostraDettaglioRegistro(index);
    };
    registroElement.appendChild(modificaButton);
    registroElement.appendChild(cancellaButton);
    registroElement.appendChild(dettaglioButton);
    registriContainer.appendChild(registroElement);
  });

  aggiornaContatoreStudenti();
}

function mostraDettaglioRegistro(index) {
  let registro = registri[index];
  let dettaglioRegistro = document.getElementById('dettaglioRegistro');
  let infoRegistro = document.getElementById('infoRegistro');
  let dettaglioStudenti = document.getElementById('dettaglioStudenti');

  infoRegistro.innerText = `Sezione: ${registro.nomeSezione}, Materia: ${registro.nomeMateria}`;

  dettaglioStudenti.innerHTML = '';

  registro.elencoStudenti.forEach((studente, studenteIndex) => {
    let row = `<tr>
                 <td>${studente.nome}</td>
                 <td>${studente.cognome}</td>
                 <td>${studente.telefono}</td>
                 <td>${studente.email}</td>
                 <td><button onclick="modificaStudente(${index}, ${studenteIndex})">Modifica</button></td>
                 <td><button onclick="cancellaStudente(${index}, ${studenteIndex})">Cancella</button></td>
               </tr>`;
    dettaglioStudenti.insertAdjacentHTML('beforeend', row);
  });

  dettaglioRegistro.style.display = 'block';
  document.getElementById('formContainer').style.display = 'none';
  document.getElementById('creaRegistroContainer').style.display = 'none';
  document.getElementById('registri').style.display = 'none';
}

function tornaAllaListaRegistri() {
  document.getElementById('dettaglioRegistro').style.display = 'none';
  document.getElementById('formContainer').style.display = 'block';
  document.getElementById('registri').style.display = 'block';
  if (registri.length > 0) {
    document.getElementById('creaRegistroContainer').style.display = 'none';
  }
}

function modificaRegistro(index) {
  let nuovoNomeSezione = prompt('Inserisci il nuovo nome della sezione:', registri[index].nomeSezione);
  let nuovoNomeMateria = prompt('Inserisci il nuovo nome della materia:', registri[index].nomeMateria);

  if (nuovoNomeSezione !== null && nuovoNomeMateria !== null) {
    registri[index].nomeSezione = nuovoNomeSezione;
    registri[index].nomeMateria = nuovoNomeMateria;
    aggiornaInterfaccia();
  }
}

function cancellaRegistro(index) {
  let conferma = confirm('Sei sicuro di voler cancellare questo registro?');
  if (conferma) {
    registri.splice(index, 1);
    aggiornaInterfaccia();
  }
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

  let registroCorrente = registri[registri.length - 1];
  let studente = {
    nome: nome,
    cognome: cognome,
    telefono: telefono,
    email: email,
  };

  registroCorrente.elencoStudenti.push(studente);

  let row = `<tr>
               <td>${nome}</td>
               <td>${cognome}</td>
               <td>${telefono}</td>
               <td>${email}</td>
               <td><button onclick="modificaStudente(${registri.length - 1}, ${registroCorrente.elencoStudenti.length - 1})">Modifica</button></td>
               <td><button onclick="cancellaStudente(${registri.length - 1}, ${registroCorrente.elencoStudenti.length - 1})">Cancella</button></td>
             </tr>`;

  document.querySelector('#registro tbody').insertAdjacentHTML('beforeend', row);

  document.getElementById('studentForm').reset();

  aggiornaContatoreStudenti();
}

function modificaStudente(registroIndex, studenteIndex) {
  let nuovoNome = prompt('Inserisci il nuovo nome:', registri[registroIndex].elencoStudenti[studenteIndex].nome);
  let nuovoCognome = prompt('Inserisci il nuovo cognome:', registri[registroIndex].elencoStudenti[studenteIndex].cognome);
  let nuovoTelefono = prompt('Inserisci il nuovo numero di telefono:', registri[registroIndex].elencoStudenti[studenteIndex].telefono);
  let nuovaEmail = prompt('Inserisci la nuova email:', registri[registroIndex].elencoStudenti[studenteIndex].email);

  if (nuovoNome !== null && nuovoCognome !== null && nuovoTelefono !== null && nuovaEmail !== null) {
    registri[registroIndex].elencoStudenti[studenteIndex].nome = nuovoNome;
    registri[registroIndex].elencoStudenti[studenteIndex].cognome = nuovoCognome;
    registri[registroIndex].elencoStudenti[studenteIndex].telefono = nuovoTelefono;
    registri[registroIndex].elencoStudenti[studenteIndex].email = nuovaEmail;

    // Aggiorna la tabella HTML con i nuovi dati
    aggiornaInterfaccia();
  }
}

function cancellaStudente(registroIndex, studenteIndex) {
  let conferma = confirm('Sei sicuro di voler cancellare questo studente?');
  if (conferma) {
    // Rimuovi lo studente dall'array
    registri[registroIndex].elencoStudenti.splice(studenteIndex, 1);

    // Aggiorna la tabella HTML
    aggiornaInterfaccia();

    aggiornaContatoreStudenti();
  }
}

function aggiornaContatoreStudenti() {
  studenti = registri.reduce((total, registro) => total + registro.elencoStudenti.length, 0);
  document.getElementById('contatoreStudenti').innerText = `Totale studenti: ${studenti}`;
}

// Chiamato all'inizio per inizializzare l'interfaccia utente
creaRegistro();
