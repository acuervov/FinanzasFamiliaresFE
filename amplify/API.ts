/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateAccountInput = {
  description?: string | null,
  name: string,
  overAllTotal: number,
  type: string,
  userId: string,
};

export type Account = {
  __typename: "Account",
  description?: string | null,
  id: string,
  name: string,
  overAllTotal: number,
  owner: User,
  type: string,
};

export type User = {
  __typename: "User",
  accounts?:  Array<Account | null > | null,
  email?: string | null,
  family?: Family | null,
  id: string,
  name: string,
};

export type Family = {
  __typename: "Family",
  categories?:  Array<Category | null > | null,
  id: string,
  name: string,
  users?:  Array<User | null > | null,
};

export type Category = {
  __typename: "Category",
  id: string,
  isDefault: boolean,
  name: string,
  subCategories?: Array< string | null > | null,
  type: string,
};

export type CreateCategoryInput = {
  familyId?: string | null,
  isDefault: boolean,
  name: string,
  subCategories?: Array< string | null > | null,
  type: string,
};

export type CreateFamilyInput = {
  name: string,
};

export type CreateMovementInput = {
  amount: number,
  bill?: string | null,
  categoryId: string,
  date: string,
  description: string,
  familyId: string,
  note?: string | null,
  sourceId: string,
  subCategory?: string | null,
  type: string,
};

export type Movement = {
  __typename: "Movement",
  amount: number,
  bill?: string | null,
  category: Category,
  date: string,
  description: string,
  id: string,
  note?: string | null,
  source: Account,
  subCategory?: string | null,
  type: string,
};

export type CreateUserInput = {
  email?: string | null,
  familyId?: string | null,
  name: string,
};

export type linkUserToFamilyInput = {
  familyId: string,
  userId: string,
};

export type getMovementsInput = {
  categoryId?: string | null,
  endDate?: string | null,
  familyId?: string | null,
  limit?: number | null,
  nextToken?: string | null,
  sourceId?: string | null,
  startDate?: string | null,
  type?: string | null,
};

export type Movements = {
  __typename: "Movements",
  count?: number | null,
  items?:  Array<Movement | null > | null,
  nextToken?: string | null,
};

export type CreateAccountMutationVariables = {
  input?: CreateAccountInput | null,
};

export type CreateAccountMutation = {
  createAccount?:  {
    __typename: "Account",
    description?: string | null,
    id: string,
    name: string,
    overAllTotal: number,
    owner:  {
      __typename: "User",
      accounts?:  Array< {
        __typename: "Account",
        description?: string | null,
        id: string,
        name: string,
        overAllTotal: number,
        type: string,
      } | null > | null,
      email?: string | null,
      family?:  {
        __typename: "Family",
        id: string,
        name: string,
      } | null,
      id: string,
      name: string,
    },
    type: string,
  } | null,
};

export type CreateCategoryMutationVariables = {
  input?: CreateCategoryInput | null,
};

export type CreateCategoryMutation = {
  createCategory?:  {
    __typename: "Category",
    id: string,
    isDefault: boolean,
    name: string,
    subCategories?: Array< string | null > | null,
    type: string,
  } | null,
};

export type CreateFamilyMutationVariables = {
  input?: CreateFamilyInput | null,
};

export type CreateFamilyMutation = {
  createFamily?:  {
    __typename: "Family",
    categories?:  Array< {
      __typename: "Category",
      id: string,
      isDefault: boolean,
      name: string,
      subCategories?: Array< string | null > | null,
      type: string,
    } | null > | null,
    id: string,
    name: string,
    users?:  Array< {
      __typename: "User",
      accounts?:  Array< {
        __typename: "Account",
        description?: string | null,
        id: string,
        name: string,
        overAllTotal: number,
        type: string,
      } | null > | null,
      email?: string | null,
      family?:  {
        __typename: "Family",
        id: string,
        name: string,
      } | null,
      id: string,
      name: string,
    } | null > | null,
  } | null,
};

export type CreateMovementMutationVariables = {
  input?: CreateMovementInput | null,
};

export type CreateMovementMutation = {
  createMovement?:  {
    __typename: "Movement",
    amount: number,
    bill?: string | null,
    category:  {
      __typename: "Category",
      id: string,
      isDefault: boolean,
      name: string,
      subCategories?: Array< string | null > | null,
      type: string,
    },
    date: string,
    description: string,
    id: string,
    note?: string | null,
    source:  {
      __typename: "Account",
      description?: string | null,
      id: string,
      name: string,
      overAllTotal: number,
      owner:  {
        __typename: "User",
        email?: string | null,
        id: string,
        name: string,
      },
      type: string,
    },
    subCategory?: string | null,
    type: string,
  } | null,
};

export type CreateUserMutationVariables = {
  input?: CreateUserInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    accounts?:  Array< {
      __typename: "Account",
      description?: string | null,
      id: string,
      name: string,
      overAllTotal: number,
      owner:  {
        __typename: "User",
        email?: string | null,
        id: string,
        name: string,
      },
      type: string,
    } | null > | null,
    email?: string | null,
    family?:  {
      __typename: "Family",
      categories?:  Array< {
        __typename: "Category",
        id: string,
        isDefault: boolean,
        name: string,
        subCategories?: Array< string | null > | null,
        type: string,
      } | null > | null,
      id: string,
      name: string,
      users?:  Array< {
        __typename: "User",
        email?: string | null,
        id: string,
        name: string,
      } | null > | null,
    } | null,
    id: string,
    name: string,
  } | null,
};

export type LinkUserToFamilyMutationVariables = {
  input?: linkUserToFamilyInput | null,
};

export type LinkUserToFamilyMutation = {
  linkUserToFamily?:  {
    __typename: "User",
    accounts?:  Array< {
      __typename: "Account",
      description?: string | null,
      id: string,
      name: string,
      overAllTotal: number,
      owner:  {
        __typename: "User",
        email?: string | null,
        id: string,
        name: string,
      },
      type: string,
    } | null > | null,
    email?: string | null,
    family?:  {
      __typename: "Family",
      categories?:  Array< {
        __typename: "Category",
        id: string,
        isDefault: boolean,
        name: string,
        subCategories?: Array< string | null > | null,
        type: string,
      } | null > | null,
      id: string,
      name: string,
      users?:  Array< {
        __typename: "User",
        email?: string | null,
        id: string,
        name: string,
      } | null > | null,
    } | null,
    id: string,
    name: string,
  } | null,
};

export type GetAccountQueryVariables = {
  id?: string | null,
};

export type GetAccountQuery = {
  getAccount?:  {
    __typename: "Account",
    description?: string | null,
    id: string,
    name: string,
    overAllTotal: number,
    owner:  {
      __typename: "User",
      accounts?:  Array< {
        __typename: "Account",
        description?: string | null,
        id: string,
        name: string,
        overAllTotal: number,
        type: string,
      } | null > | null,
      email?: string | null,
      family?:  {
        __typename: "Family",
        id: string,
        name: string,
      } | null,
      id: string,
      name: string,
    },
    type: string,
  } | null,
};

export type GetAccountsByUserGroupsQueryVariables = {
  ids?: Array< string | null > | null,
};

export type GetAccountsByUserGroupsQuery = {
  getAccountsByUserGroups?:  Array< {
    __typename: "Account",
    description?: string | null,
    id: string,
    name: string,
    overAllTotal: number,
    owner:  {
      __typename: "User",
      accounts?:  Array< {
        __typename: "Account",
        description?: string | null,
        id: string,
        name: string,
        overAllTotal: number,
        type: string,
      } | null > | null,
      email?: string | null,
      family?:  {
        __typename: "Family",
        id: string,
        name: string,
      } | null,
      id: string,
      name: string,
    },
    type: string,
  } | null > | null,
};

export type GetFamilyQueryVariables = {
  id?: string | null,
};

export type GetFamilyQuery = {
  getFamily?:  {
    __typename: "Family",
    categories?:  Array< {
      __typename: "Category",
      id: string,
      isDefault: boolean,
      name: string,
      subCategories?: Array< string | null > | null,
      type: string,
    } | null > | null,
    id: string,
    name: string,
    users?:  Array< {
      __typename: "User",
      accounts?:  Array< {
        __typename: "Account",
        description?: string | null,
        id: string,
        name: string,
        overAllTotal: number,
        type: string,
      } | null > | null,
      email?: string | null,
      family?:  {
        __typename: "Family",
        id: string,
        name: string,
      } | null,
      id: string,
      name: string,
    } | null > | null,
  } | null,
};

export type GetMovementQueryVariables = {
  id?: string | null,
};

export type GetMovementQuery = {
  getMovement?:  {
    __typename: "Movement",
    amount: number,
    bill?: string | null,
    category:  {
      __typename: "Category",
      id: string,
      isDefault: boolean,
      name: string,
      subCategories?: Array< string | null > | null,
      type: string,
    },
    date: string,
    description: string,
    id: string,
    note?: string | null,
    source:  {
      __typename: "Account",
      description?: string | null,
      id: string,
      name: string,
      overAllTotal: number,
      owner:  {
        __typename: "User",
        email?: string | null,
        id: string,
        name: string,
      },
      type: string,
    },
    subCategory?: string | null,
    type: string,
  } | null,
};

export type GetMovementsQueryVariables = {
  input?: getMovementsInput | null,
};

export type GetMovementsQuery = {
  getMovements?:  {
    __typename: "Movements",
    count?: number | null,
    items?:  Array< {
      __typename: "Movement",
      amount: number,
      bill?: string | null,
      category:  {
        __typename: "Category",
        id: string,
        isDefault: boolean,
        name: string,
        subCategories?: Array< string | null > | null,
        type: string,
      },
      date: string,
      description: string,
      id: string,
      note?: string | null,
      source:  {
        __typename: "Account",
        description?: string | null,
        id: string,
        name: string,
        overAllTotal: number,
        type: string,
      },
      subCategory?: string | null,
      type: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetUserQueryVariables = {
  id?: string | null,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    accounts?:  Array< {
      __typename: "Account",
      description?: string | null,
      id: string,
      name: string,
      overAllTotal: number,
      owner:  {
        __typename: "User",
        email?: string | null,
        id: string,
        name: string,
      },
      type: string,
    } | null > | null,
    email?: string | null,
    family?:  {
      __typename: "Family",
      categories?:  Array< {
        __typename: "Category",
        id: string,
        isDefault: boolean,
        name: string,
        subCategories?: Array< string | null > | null,
        type: string,
      } | null > | null,
      id: string,
      name: string,
      users?:  Array< {
        __typename: "User",
        email?: string | null,
        id: string,
        name: string,
      } | null > | null,
    } | null,
    id: string,
    name: string,
  } | null,
};
