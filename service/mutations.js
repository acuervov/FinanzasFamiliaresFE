/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createFamily = /* GraphQL */ `
  mutation CreateFamily($input: CreateFamilyInput) {
    createFamily(input: $input) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser($input: CreateUserInput) {
    createUser(input: $input) {
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
export const linkUserToFamily = /* GraphQL */ `
  mutation LinkUserToFamily($input: linkUserToFamilyInput) {
    linkUserToFamily(input: $input) {
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
export const createAccount = /* GraphQL */ `
  mutation CreateAccount($input: CreateAccountInput) {
    createAccount(input: $input) {
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
export const createCategory = /* GraphQL */ `
  mutation CreateCategory($input: CreateCategoryInput) {
    createCategory(input: $input) {
      id
      name
      type
      subCategories
      isDefault
      __typename
    }
  }
`;
export const createMovement = /* GraphQL */ `
  mutation CreateMovement($input: CreateMovementInput) {
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
