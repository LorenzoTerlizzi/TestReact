

# Progetto Accademia - Gestione Dati

Questo progetto è stato sviluppato per l'esame del modulo di WEB 2, composto da due principali componenti:

1. **Backend (Flask)** 
- Utilizza Flask per creare un'API che interagisce con un database PostgreSQL e fornisce dati in formato JSON.
- **eserciziodb.py**: Il server Api che interagisce con il database.
- **persone.json, attivitanProg.json, assenze.json**: Il file json contenete i dati precedentementi estratti dal database.



2. **Frontend (React)** 
- Una web app che consente agli utenti di visualizzare e interagire con i dati attraverso interfacce utente interattive.
- **Home.jsx**: Componente che visualizza la schermata di benvenuto dell'applicazione con un semplice messaggio.
- **App.jsx**:  Componente principale dell'applicazione React, che gestisce la navigazione tra le diverse sezioni dell'app (Persona.jsx, Attivita.jsx, Assenza.jsx, Home.jsx).
- **Navbar.jsx**: Barra di navigazione per accedere alle diverse parti dell'applicazione.
- **File di stile**: File .CSS contenenti le configurazioni per migliorare l'aspetto dell'interfaccia utente.



### Requisiti:
- Python 3.x
- Flask
- Flask-CORS
- psycopg2 (per interagire con PostgreSQL)
- Node.js
- Npm

## Installazione  Backend

1. Clonare la repository:
- git clone https://github.com/LorenzoTerlizzi/TestReact.git

2. Scaricare le dipendenze:
- sudo apt install python3-pip
- pip install Flask

3. Avviare il server:
- python3 eserciziodb.py (il server andrà in esecuzione su http://127.0.0.1:5010)


## Installazione  Frontend

1. Scaricare le dipendenze:
- npm install

2. Avviare l'applicazione:
- npm run dev
