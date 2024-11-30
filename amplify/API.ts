/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateFamilyInput = {
  name: string,
};

export type Family = {
  __typename: "Family",
  id: string,
  name: string,
  users?:  Array<User | null > | null,
  categories?:  Array<Category | null > | null,
};

export type User = {
  __typename: "User",
  id: string,
  name: string,
  email?: string | null,
  family?: Family | null,
  accounts?:  Array<Account | null > | null,
};

export type Account = {
  __typename: "Account",
  id: string,
  name: string,
  description?: string | null,
  type: string,
  owner: User,
  overAllTotal: number,
};

export type Category = {
  __typename: "Category",
  id: string,
  name: string,
  type: string,
  subCategories?: Array< string | null > | null,
  isDefault: boolean,
};

export type CreateUserInput = {
  name: string,
  familyId?: string | null,
  email?: string | null,
};

export type linkUserToFamilyInput = {
  userId: string,
  familyId: string,
};

export type CreateAccountInput = {
  name: string,
  description?: string | null,
  type: string,
  userId: string,
  overAllTotal: number,
};

export type CreateCategoryInput = {
  name: string,
  type: string,
  subCategories?: Array< string | null > | null,
  isDefault: boolean,
  familyId?: string | null,
};

export type CreateMovementInput = {
  description: string,
  amount: number,
  type: string,
  categoryId: string,
  subCategory?: string | null,
  date: string,
  bill?: string | null,
  sourceId: string,
  note?: string | null,
  familyId: string,
};

export type Movement = {
  __typename: "Movement",
  id: string,
  description: string,
  amount: number,
  type: string,
  category: Category,
  subCategory?: string | null,
  date: string,
  bill?: string | null,
  source: Account,
  note?: string | null,
};

export type getMovementsInput = {
  startDate?: string | null,
  endDate?: string | null,
  type?: string | null,
  categoryId?: string | null,
  sourceId?: string | null,
  familyId?: string | null,
  nextToken?: string | null,
  limit?: number | null,
};

export type Movements = {
  __typename: "Movements",
  items?:  Array<Movement | null > | null,
  nextToken?: string | null,
  count?: number | null,
};

export type CreateFamilyMutationVariables = {
  input?: CreateFamilyInput | null,
};

export type CreateFamilyMutation = {
  createFamily?:  {
    __typename: "Family",
    id: string,
    name: string,
    users?:  Array< {
      __typename: "User",
      id: string,
      name: string,
      email?: string | null,
      family?:  {
        __typename: "Family",
        id: string,
        name: string,
      } | null,
      accounts?:  Array< {
        __typename: "Account",
        id: string,
        name: string,
        description?: string | null,
        type: string,
        overAllTotal: number,
      } | null > | null,
    } | null > | null,
    categories?:  Array< {
      __typename: "Category",
      id: string,
      name: string,
      type: string,
      subCategories?: Array< string | null > | null,
      isDefault: boolean,
    } | null > | null,
  } | null,
};

export type CreateUserMutationVariables = {
  input?: CreateUserInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    name: string,
    email?: string | null,
    family?:  {
      __typename: "Family",
      id: string,
      name: string,
      users?:  Array< {
        __typename: "User",
        id: string,
        name: string,
        email?: string | null,
      } | null > | null,
      categories?:  Array< {
        __typename: "Category",
        id: string,
        name: string,
        type: string,
        subCategories?: Array< string | null > | null,
        isDefault: boolean,
      } | null > | null,
    } | null,
    accounts?:  Array< {
      __typename: "Account",
      id: string,
      name: string,
      description?: string | null,
      type: string,
      owner:  {
        __typename: "User",
        id: string,
        name: string,
        email?: string | null,
      },
      overAllTotal: number,
    } | null > | null,
  } | null,
};

export type LinkUserToFamilyMutationVariables = {
  input?: linkUserToFamilyInput | null,
};

export type LinkUserToFamilyMutation = {
  linkUserToFamily?:  {
    __typename: "User",
    id: string,
    name: string,
    email?: string | null,
    family?:  {
      __typename: "Family",
      id: string,
      name: string,
      users?:  Array< {
        __typename: "User",
        id: string,
        name: string,
        email?: string | null,
      } | null > | null,
      categories?:  Array< {
        __typename: "Category",
        id: string,
        name: string,
        type: string,
        subCategories?: Array< string | null > | null,
        isDefault: boolean,
      } | null > | null,
    } | null,
    accounts?:  Array< {
      __typename: "Account",
      id: string,
      name: string,
      description?: string | null,
      type: string,
      owner:  {
        __typename: "User",
        id: string,
        name: string,
        email?: string | null,
      },
      overAllTotal: number,
    } | null > | null,
  } | null,
};

export type CreateAccountMutationVariables = {
  input?: CreateAccountInput | null,
};

export type CreateAccountMutation = {
  createAccount?:  {
    __typename: "Account",
    id: string,
    name: string,
    description?: string | null,
    type: string,
    owner:  {
      __typename: "User",
      id: string,
      name: string,
      email?: string | null,
      family?:  {
        __typename: "Family",
        id: string,
        name: string,
      } | null,
      accounts?:  Array< {
        __typename: "Account",
        id: string,
        name: string,
        description?: string | null,
        type: string,
        overAllTotal: number,
      } | null > | null,
    },
    overAllTotal: number,
  } | null,
};

export type CreateCategoryMutationVariables = {
  input?: CreateCategoryInput | null,
};

export type CreateCategoryMutation = {
  createCategory?:  {
    __typename: "Category",
    id: string,
    name: string,
    type: string,
    subCategories?: Array< string | null > | null,
    isDefault: boolean,
  } | null,
};

export type CreateMovementMutationVariables = {
  input?: CreateMovementInput | null,
};

export type CreateMovementMutation = {
  createMovement?:  {
    __typename: "Movement",
    id: string,
    description: string,
    amount: number,
    type: string,
    category:  {
      __typename: "Category",
      id: string,
      name: string,
      type: string,
      subCategories?: Array< string | null > | null,
      isDefault: boolean,
    },
    subCategory?: string | null,
    date: string,
    bill?: string | null,
    source:  {
      __typename: "Account",
      id: string,
      name: string,
      description?: string | null,
      type: string,
      owner:  {
        __typename: "User",
        id: string,
        name: string,
        email?: string | null,
      },
      overAllTotal: number,
    },
    note?: string | null,
  } | null,
};

export type GetFamilyQueryVariables = {
  id?: string | null,
};

export type GetFamilyQuery = {
  getFamily?:  {
    __typename: "Family",
    id: string,
    name: string,
    users?:  Array< {
      __typename: "User",
      id: string,
      name: string,
      email?: string | null,
      family?:  {
        __typename: "Family",
        id: string,
        name: string,
      } | null,
      accounts?:  Array< {
        __typename: "Account",
        id: string,
        name: string,
        description?: string | null,
        type: string,
        overAllTotal: number,
      } | null > | null,
    } | null > | null,
    categories?:  Array< {
      __typename: "Category",
      id: string,
      name: string,
      type: string,
      subCategories?: Array< string | null > | null,
      isDefault: boolean,
    } | null > | null,
  } | null,
};

export type GetUserQueryVariables = {
  id?: string | null,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    name: string,
    email?: string | null,
    family?:  {
      __typename: "Family",
      id: string,
      name: string,
      users?:  Array< {
        __typename: "User",
        id: string,
        name: string,
        email?: string | null,
      } | null > | null,
      categories?:  Array< {
        __typename: "Category",
        id: string,
        name: string,
        type: string,
        subCategories?: Array< string | null > | null,
        isDefault: boolean,
      } | null > | null,
    } | null,
    accounts?:  Array< {
      __typename: "Account",
      id: string,
      name: string,
      description?: string | null,
      type: string,
      owner:  {
        __typename: "User",
        id: string,
        name: string,
        email?: string | null,
      },
      overAllTotal: number,
    } | null > | null,
  } | null,
};

export type GetAccountQueryVariables = {
  id?: string | null,
};

export type GetAccountQuery = {
  getAccount?:  {
    __typename: "Account",
    id: string,
    name: string,
    description?: string | null,
    type: string,
    owner:  {
      __typename: "User",
      id: string,
      name: string,
      email?: string | null,
      family?:  {
        __typename: "Family",
        id: string,
        name: string,
      } | null,
      accounts?:  Array< {
        __typename: "Account",
        id: string,
        name: string,
        description?: string | null,
        type: string,
        overAllTotal: number,
      } | null > | null,
    },
    overAllTotal: number,
  } | null,
};

export type GetMovementsQueryVariables = {
  input?: getMovementsInput | null,
};

export type GetMovementsQuery = {
  getMovements?:  {
    __typename: "Movements",
    items?:  Array< {
      __typename: "Movement",
      id: string,
      description: string,
      amount: number,
      type: string,
      category:  {
        __typename: "Category",
        id: string,
        name: string,
        type: string,
        subCategories?: Array< string | null > | null,
        isDefault: boolean,
      },
      subCategory?: string | null,
      date: string,
      bill?: string | null,
      source:  {
        __typename: "Account",
        id: string,
        name: string,
        description?: string | null,
        type: string,
        overAllTotal: number,
      },
      note?: string | null,
    } | null > | null,
    nextToken?: string | null,
    count?: number | null,
  } | null,
};

export type GetMovementQueryVariables = {
  id?: string | null,
};

export type GetMovementQuery = {
  getMovement?:  {
    __typename: "Movement",
    id: string,
    description: string,
    amount: number,
    type: string,
    category:  {
      __typename: "Category",
      id: string,
      name: string,
      type: string,
      subCategories?: Array< string | null > | null,
      isDefault: boolean,
    },
    subCategory?: string | null,
    date: string,
    bill?: string | null,
    source:  {
      __typename: "Account",
      id: string,
      name: string,
      description?: string | null,
      type: string,
      owner:  {
        __typename: "User",
        id: string,
        name: string,
        email?: string | null,
      },
      overAllTotal: number,
    },
    note?: string | null,
  } | null,
};
