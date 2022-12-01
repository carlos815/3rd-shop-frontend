import { gql, useQuery } from '@apollo/client';

const CURRENT_USER_QUERY = gql`
  query {
    authenticatedItem {
      ... on User {
        id
        email
        name  
        cart {
          id
          quantity
          product {
            id
            price
            name
            description
            photo {
              altText
              image {
                publicUrlTransformed
              }
            }
          }
      }  
      }
    }
  }
`;



export function useUser() {
  // useQuery(CURRENT_USER_QUERY)
  const { data, loading, error } = useQuery(CURRENT_USER_QUERY);
  return data?.authenticatedItem;
}

export { CURRENT_USER_QUERY };
