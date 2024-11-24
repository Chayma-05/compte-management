import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import '../style/CreateCompte.css'; 

const ADD_COMPTE = gql`
  mutation saveCompte($compte: CompteRequest!) {
    saveCompte(compte: $compte) {
      id
      solde
      dateCreation
      type
    }
  }
`;

const CreateCompte = () => {
  const [solde, setSolde] = useState('');
  const [dateCreation, setDateCreation] = useState('');
  const [type, setType] = useState('');

  const [addCompte] = useMutation(ADD_COMPTE, {
    onCompleted: (data) => {
      alert('Account Created: ' + data.saveCompte.type);
      setSolde('');
      setDateCreation('');
      setType('');
    },
  });

  const formatDate = (date) => {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedDate = formatDate(dateCreation);

    const compteRequest = {
      solde: parseFloat(solde),
      dateCreation: formattedDate,
      type: type,
    };

    addCompte({ variables: { compte: compteRequest } });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="create-compte-form">
        <h2>Create Account</h2>
        <input
          type="number"
          placeholder="Solde"
          value={solde}
          onChange={(e) => setSolde(e.target.value)}
          required
          className="input-field"
        />
        <input
          type="date"
          placeholder="Date Creation"
          value={dateCreation}
          onChange={(e) => setDateCreation(e.target.value)}
          required
          className="input-field"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
          className="input-field"
        >
          <option value="">Select Type</option>
          <option value="COURANT">COURANT</option>
          <option value="EPARGNE">EPARGNE</option>
        </select>
        <button type="submit" className="submit-button">Create Account</button>
      </form>
    </div>
  );
};

export default CreateCompte;
