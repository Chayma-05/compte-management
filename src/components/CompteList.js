import React from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import CreateCompte from '../components/CreateCompte'; 
import '../style/AllComptes.css';

const GET_COMPTES = gql`
  query allComptes {
    allComptes {
      id
      solde
      dateCreation
      type
    }
  }
`;

const DELETE_COMPTE = gql`
  mutation deleteById($id: ID!) {
    deleteById(id: $id)
  }
`;

const AllComptes = () => {
  const { loading, error, data, refetch } = useQuery(GET_COMPTES); 

  const [deleteCompte] = useMutation(DELETE_COMPTE, {
    onCompleted: () => {
      alert('Compte deleted successfully.');
      refetch();
    },
    onError: (error) => {
      alert('Error deleting compte: ' + error.message);
    },
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this compte?')) {
      deleteCompte({ variables: { id } });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="table-container">
      <h2>All Comptes</h2>
      <table className="compte-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Solde</th>
            <th>Date Creation</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.allComptes.map((compte) => (
            <tr key={compte.id}>
              <td>{compte.id}</td>
              <td>{compte.solde}</td>
              <td>{compte.dateCreation}</td>
              <td>{compte.type}</td>
              <td>
                <button
                  onClick={() => handleDelete(compte.id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ComptesPage = () => {
  return (
    <div className="container">
      <CreateCompte />
      <AllComptes />
    </div>
  );
};

export default ComptesPage;
