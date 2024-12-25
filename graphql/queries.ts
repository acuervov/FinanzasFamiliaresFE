/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../amplify/API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getAccount = /* GraphQL */ `query GetAccount($id: String) {
  getAccount(id: $id) {
    description
    id
    name
    overAllTotal
    owner {
      accounts {
        description
        id
        name
        overAllTotal
        type
        __typename
      }
      email
      family {
        id
        name
        __typename
      }
      id
      name
      __typename
    }
    type
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetAccountQueryVariables,
  APITypes.GetAccountQuery
>;
export const getAccountsByUserGroups = /* GraphQL */ `query GetAccountsByUserGroups($ids: [String]) {
  getAccountsByUserGroups(ids: $ids) {
    description
    id
    name
    overAllTotal
    owner {
      accounts {
        description
        id
        name
        overAllTotal
        type
        __typename
      }
      email
      family {
        id
        name
        __typename
      }
      id
      name
      __typename
    }
    type
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetAccountsByUserGroupsQueryVariables,
  APITypes.GetAccountsByUserGroupsQuery
>;
export const getFamily = /* GraphQL */ `query GetFamily($id: String) {
  getFamily(id: $id) {
    categories {
      id
      isDefault
      name
      subCategories
      type
      __typename
    }
    id
    name
    users {
      accounts {
        description
        id
        name
        overAllTotal
        type
        __typename
      }
      email
      family {
        id
        name
        __typename
      }
      id
      name
      __typename
    }
    __typename
  }
}
` as GeneratedQuery<APITypes.GetFamilyQueryVariables, APITypes.GetFamilyQuery>;
export const getMovement = /* GraphQL */ `query GetMovement($id: String) {
  getMovement(id: $id) {
    amount
    bill
    category {
      id
      isDefault
      name
      subCategories
      type
      __typename
    }
    date
    description
    id
    note
    source {
      description
      id
      name
      overAllTotal
      owner {
        email
        id
        name
        __typename
      }
      type
      __typename
    }
    subCategory
    type
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetMovementQueryVariables,
  APITypes.GetMovementQuery
>;
export const getMovements = /* GraphQL */ `query GetMovements($input: getMovementsInput) {
  getMovements(input: $input) {
    count
    items {
      amount
      bill
      category {
        id
        isDefault
        name
        subCategories
        type
        __typename
      }
      date
      description
      id
      note
      source {
        description
        id
        name
        overAllTotal
        type
        __typename
      }
      subCategory
      type
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetMovementsQueryVariables,
  APITypes.GetMovementsQuery
>;
export const getUser = /* GraphQL */ `query GetUser($id: String) {
  getUser(id: $id) {
    accounts {
      description
      id
      name
      overAllTotal
      owner {
        email
        id
        name
        __typename
      }
      type
      __typename
    }
    email
    family {
      categories {
        id
        isDefault
        name
        subCategories
        type
        __typename
      }
      id
      name
      users {
        email
        id
        name
        __typename
      }
      __typename
    }
    id
    name
    __typename
  }
}
` as GeneratedQuery<APITypes.GetUserQueryVariables, APITypes.GetUserQuery>;
