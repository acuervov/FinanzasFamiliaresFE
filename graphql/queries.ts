/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../amplify/API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getFamily = /* GraphQL */ `query GetFamily($id: String) {
  getFamily(id: $id) {
    id
    name
    users {
      id
      name
      email
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
` as GeneratedQuery<APITypes.GetFamilyQueryVariables, APITypes.GetFamilyQuery>;
export const getUser = /* GraphQL */ `query GetUser($id: String) {
  getUser(id: $id) {
    id
    name
    email
    family {
      id
      name
      users {
        id
        name
        email
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
        email
        __typename
      }
      overAllTotal
      __typename
    }
    __typename
  }
}
` as GeneratedQuery<APITypes.GetUserQueryVariables, APITypes.GetUserQuery>;
export const getAccount = /* GraphQL */ `query GetAccount($id: String) {
  getAccount(id: $id) {
    id
    name
    description
    type
    owner {
      id
      name
      email
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
` as GeneratedQuery<
  APITypes.GetAccountQueryVariables,
  APITypes.GetAccountQuery
>;
export const getMovements = /* GraphQL */ `query GetMovements($input: getMovementsInput) {
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
` as GeneratedQuery<
  APITypes.GetMovementsQueryVariables,
  APITypes.GetMovementsQuery
>;
export const getMovement = /* GraphQL */ `query GetMovement($id: String) {
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
        email
        __typename
      }
      overAllTotal
      __typename
    }
    note
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetMovementQueryVariables,
  APITypes.GetMovementQuery
>;
