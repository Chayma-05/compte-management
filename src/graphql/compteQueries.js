import { gql } from "@apollo/client";

export const GET_ALL_COMPTES = gql`
  query GetAllComptes {
    allComptes {
      id
      solde
      dateCreation
      type
    }
  }
`;

export const CREATE_COMPTE = gql`
  mutation CreateCompte($compte: CompteRequest!) {
    saveCompte(compte: $compte) {
      id
      solde
      dateCreation
      type
    }
  }
`;

export const DELETE_COMPTE = gql`
  mutation DeleteCompte($id: ID!) {
    deleteById(id: $id)
  }
`;
