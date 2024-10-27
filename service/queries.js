/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getFamily = /* GraphQL */ `
  query GetFamily($id: String) {
    getFamily(id: $id) {
      id
      name
      users {
        id
        name
        family {
          id
          name
          __typename
        }
        accounts {
          id
          name
          description
          type
          overAllTotal
          __typename
        }
        __typename
      }
      categories {
        id
        name
        type
        subCategories
        isDefault
        __typename
      }
      __typename
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: String) {
    getUser(id: $id) {
      id
      name
      family {
        id
        name
        users {
          id
          name
          __typename
        }
        categories {
          id
          name
          type
          subCategories
          isDefault
          __typename
        }
        __typename
      }
      accounts {
        id
        name
        description
        type
        owner {
          id
          name
          __typename
        }
        overAllTotal
        __typename
      }
      __typename
    }
  }
`;
export const getAccount = /* GraphQL */ `
  query GetAccount($id: String) {
    getAccount(id: $id) {
      id
      name
      description
      type
      owner {
        id
        name
        family {
          id
          name
          __typename
        }
        accounts {
          id
          name
          description
          type
          overAllTotal
          __typename
        }
        __typename
      }
      overAllTotal
      __typename
    }
  }
`;
export const getMovements = /* GraphQL */ `
  query GetMovements($input: getMovementsInput) {
    getMovements(input: $input) {
      items {
        id
        description
        amount
        type
        category {
          id
          name
          type
          subCategories
          isDefault
          __typename
        }
        subCategory
        date
        bill
        source {
          id
          name
          description
          type
          overAllTotal
          __typename
        }
        note
        __typename
      }
      nextToken
      count
      __typename
    }
  }
`;
export const getMovement = /* GraphQL */ `
  query GetMovement($id: String) {
    getMovement(id: $id) {
      id
      description
      amount
      type
      category {
        id
        name
        type
        subCategories
        isDefault
        __typename
      }
      subCategory
      date
      bill
      source {
        id
        name
        description
        type
        owner {
          id
          name
          __typename
        }
        overAllTotal
        __typename
      }
      note
      __typename
    }
  }
`;
