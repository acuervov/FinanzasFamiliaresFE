/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../amplify/API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createAccount = /* GraphQL */ `mutation CreateAccount($input: CreateAccountInput) {
  createAccount(input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateAccountMutationVariables,
  APITypes.CreateAccountMutation
>;
export const createCategory = /* GraphQL */ `mutation CreateCategory($input: CreateCategoryInput) {
  createCategory(input: $input) {
    id
    isDefault
    name
    subCategories
    type
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateCategoryMutationVariables,
  APITypes.CreateCategoryMutation
>;
export const createFamily = /* GraphQL */ `mutation CreateFamily($input: CreateFamilyInput) {
  createFamily(input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateFamilyMutationVariables,
  APITypes.CreateFamilyMutation
>;
export const createMovement = /* GraphQL */ `mutation CreateMovement($input: CreateMovementInput) {
  createMovement(input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateMovementMutationVariables,
  APITypes.CreateMovementMutation
>;
export const createUser = /* GraphQL */ `mutation CreateUser($input: CreateUserInput) {
  createUser(input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateUserMutationVariables,
  APITypes.CreateUserMutation
>;
export const linkUserToFamily = /* GraphQL */ `mutation LinkUserToFamily($input: linkUserToFamilyInput) {
  linkUserToFamily(input: $input) {
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
` as GeneratedMutation<
  APITypes.LinkUserToFamilyMutationVariables,
  APITypes.LinkUserToFamilyMutation
>;
