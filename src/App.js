import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [ repositories, setRepositories ] = useState([]);
  
  useEffect(
    () => {
      api.get('/repositories').then( response => setRepositories(response.data) );
    },
    []
  );

  async function handleAddRepository() {
    // TODO
    const response = await api.post('/repositories', {
      title: `Novo Repositório ${Date.now()}`,
      url: `http://novorepositorio${Date.now()}.com`,
      techs: ['tec1', 'tec2']
    });

    const newRepository = response.data

    setRepositories([ ...repositories, newRepository ]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete(`/repositories/${id}`).then( response => {
      if(response.status === 204) {
        return setRepositories(repositories.filter(repositorie => repositorie.id !== id ));
      }
      return console.log('Repositorie not found.');
    });

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(
            repositorie => (
              <li key={repositorie.id}>
                {repositorie.title}
                <button onClick={() => handleRemoveRepository(repositorie.id)}>
                  Remover
                </button>
              </li>
            )
          )
        }
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
