/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../amplify/API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createFamily = /* GraphQL */ `mutation CreateFamily($input: CreateFamilyInput) {
  createFamily(input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateFamilyMutationVariables,
  APITypes.CreateFamilyMutation
>;
export const createUser = /* GraphQL */ `mutation CreateUser($input: CreateUserInput) {
  createUser(input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateUserMutationVariables,
  APITypes.CreateUserMutation
>;
export const linkUserToFamily = /* GraphQL */ `mutation LinkUserToFamily($input: linkUserToFamilyInput) {
  linkUserToFamily(input: $input) {
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
` as GeneratedMutation<
  APITypes.LinkUserToFamilyMutationVariables,
  APITypes.LinkUserToFamilyMutation
>;
export const createAccount = /* GraphQL */ `mutation CreateAccount($input: CreateAccountInput) {
  createAccount(input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateAccountMutationVariables,
  APITypes.CreateAccountMutation
>;
export const createCategory = /* GraphQL */ `mutation CreateCategory($input: CreateCategoryInput) {
  createCategory(input: $input) {
    id
    name
    type
    subCategories
    isDefault
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateCategoryMutationVariables,
  APITypes.CreateCategoryMutation
>;
export const createMovement = /* GraphQL */ `mutation CreateMovement($input: CreateMovementInput) {
  createMovement(input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateMovementMutationVariables,
  APITypes.CreateMovementMutation
>;
