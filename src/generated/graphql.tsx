import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type CredentialsInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type DeleteLabelImageInput = {
  imageId: Scalars['Int'];
  labelId: Scalars['Int'];
};

export type DeleteLabelImageResponse = {
  __typename?: 'DeleteLabelImageResponse';
  deleteSuccessful: Scalars['Boolean'];
  imagesLeftInLabel: Scalars['Int'];
};

export type Image = {
  __typename?: 'Image';
  id: Scalars['Float'];
  location: Scalars['String'];
  label: Scalars['String'];
  createdAt: Scalars['String'];
};

export type ImageInput = {
  file: Scalars['Upload'];
  label: Scalars['String'];
};

export type ImageSaveInput = {
  imageId: Scalars['Int'];
  labelName: Scalars['String'];
};

export type InputError = {
  __typename?: 'InputError';
  fieldName: Scalars['String'];
  description: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  signup: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  upload: Scalars['Boolean'];
  deleteSavedImage: DeleteLabelImageResponse;
  saveImage: SaveImageResponse;
  deleteUploadedImage: Scalars['Boolean'];
};


export type MutationSignupArgs = {
  credentials: CredentialsInput;
};


export type MutationLoginArgs = {
  credentials: CredentialsInput;
};


export type MutationUploadArgs = {
  image: ImageInput;
};


export type MutationDeleteSavedImageArgs = {
  imageInfo: DeleteLabelImageInput;
};


export type MutationSaveImageArgs = {
  imageInfo: ImageSaveInput;
};


export type MutationDeleteUploadedImageArgs = {
  imageId: Scalars['Int'];
};

export type PaginatedImageResponse = {
  __typename?: 'PaginatedImageResponse';
  entities: Array<Image>;
  hasMore: Scalars['Boolean'];
};

export type PaginatedInput = {
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
};

export type PaginatedUserLabelResponse = {
  __typename?: 'PaginatedUserLabelResponse';
  entities: Array<UserLabel>;
  hasMore: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  uploadedImages: PaginatedImageResponse;
  labelsForUser: PaginatedUserLabelResponse;
  savedImages: PaginatedImageResponse;
  discoverImages: PaginatedImageResponse;
};


export type QueryUploadedImagesArgs = {
  paginatedInput: PaginatedInput;
};


export type QueryLabelsForUserArgs = {
  paginatedInput: PaginatedInput;
};


export type QuerySavedImagesArgs = {
  labelId: Scalars['Int'];
  paginatedInput: PaginatedInput;
};


export type QueryDiscoverImagesArgs = {
  search: Scalars['String'];
  paginatedInput: PaginatedInput;
};

export type SaveImageResponse = {
  __typename?: 'SaveImageResponse';
  saveSuccessful: Scalars['Boolean'];
  descrtiption: Scalars['String'];
};


export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  username: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type UserLabel = {
  __typename?: 'UserLabel';
  id: Scalars['Float'];
  labelName: Scalars['String'];
  createdAt: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<InputError>>;
  user?: Maybe<User>;
};

export type DeleteSavedImageMutationVariables = Exact<{
  imageInfo: DeleteLabelImageInput;
}>;


export type DeleteSavedImageMutation = (
  { __typename?: 'Mutation' }
  & { deleteSavedImage: (
    { __typename?: 'DeleteLabelImageResponse' }
    & Pick<DeleteLabelImageResponse, 'deleteSuccessful' | 'imagesLeftInLabel'>
  ) }
);

export type DeleteUploadedImageMutationVariables = Exact<{
  imageId: Scalars['Int'];
}>;


export type DeleteUploadedImageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteUploadedImage'>
);

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'createdAt'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'InputError' }
      & Pick<InputError, 'fieldName' | 'description'>
    )>> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type SaveImageMutationVariables = Exact<{
  imageInfo: ImageSaveInput;
}>;


export type SaveImageMutation = (
  { __typename?: 'Mutation' }
  & { saveImage: (
    { __typename?: 'SaveImageResponse' }
    & Pick<SaveImageResponse, 'saveSuccessful' | 'descrtiption'>
  ) }
);

export type SignupMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignupMutation = (
  { __typename?: 'Mutation' }
  & { signup: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'createdAt'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'InputError' }
      & Pick<InputError, 'fieldName' | 'description'>
    )>> }
  ) }
);

export type UploadImageMutationVariables = Exact<{
  image: ImageInput;
}>;


export type UploadImageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'upload'>
);

export type DiscoverImagesQueryVariables = Exact<{
  search: Scalars['String'];
  paginatedInput: PaginatedInput;
}>;


export type DiscoverImagesQuery = (
  { __typename?: 'Query' }
  & { discoverImages: (
    { __typename?: 'PaginatedImageResponse' }
    & Pick<PaginatedImageResponse, 'hasMore'>
    & { entities: Array<(
      { __typename?: 'Image' }
      & Pick<Image, 'id' | 'location' | 'label' | 'createdAt'>
    )> }
  ) }
);

export type LabelsForUserQueryVariables = Exact<{
  paginatedInput: PaginatedInput;
}>;


export type LabelsForUserQuery = (
  { __typename?: 'Query' }
  & { labelsForUser: (
    { __typename?: 'PaginatedUserLabelResponse' }
    & Pick<PaginatedUserLabelResponse, 'hasMore'>
    & { entities: Array<(
      { __typename?: 'UserLabel' }
      & Pick<UserLabel, 'id' | 'labelName' | 'createdAt'>
    )> }
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'username' | 'id'>
  )> }
);

export type SavedImagesQueryVariables = Exact<{
  paginatedInput: PaginatedInput;
  labelId: Scalars['Int'];
}>;


export type SavedImagesQuery = (
  { __typename?: 'Query' }
  & { savedImages: (
    { __typename?: 'PaginatedImageResponse' }
    & Pick<PaginatedImageResponse, 'hasMore'>
    & { entities: Array<(
      { __typename?: 'Image' }
      & Pick<Image, 'id' | 'location'>
    )> }
  ) }
);

export type UserUploadedImagesQueryVariables = Exact<{
  paginatedInput: PaginatedInput;
}>;


export type UserUploadedImagesQuery = (
  { __typename?: 'Query' }
  & { uploadedImages: (
    { __typename?: 'PaginatedImageResponse' }
    & Pick<PaginatedImageResponse, 'hasMore'>
    & { entities: Array<(
      { __typename?: 'Image' }
      & Pick<Image, 'id' | 'location' | 'label' | 'createdAt'>
    )> }
  ) }
);


export const DeleteSavedImageDocument = gql`
    mutation DeleteSavedImage($imageInfo: DeleteLabelImageInput!) {
  deleteSavedImage(imageInfo: $imageInfo) {
    deleteSuccessful
    imagesLeftInLabel
  }
}
    `;
export type DeleteSavedImageMutationFn = Apollo.MutationFunction<DeleteSavedImageMutation, DeleteSavedImageMutationVariables>;

/**
 * __useDeleteSavedImageMutation__
 *
 * To run a mutation, you first call `useDeleteSavedImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSavedImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSavedImageMutation, { data, loading, error }] = useDeleteSavedImageMutation({
 *   variables: {
 *      imageInfo: // value for 'imageInfo'
 *   },
 * });
 */
export function useDeleteSavedImageMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSavedImageMutation, DeleteSavedImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSavedImageMutation, DeleteSavedImageMutationVariables>(DeleteSavedImageDocument, options);
      }
export type DeleteSavedImageMutationHookResult = ReturnType<typeof useDeleteSavedImageMutation>;
export type DeleteSavedImageMutationResult = Apollo.MutationResult<DeleteSavedImageMutation>;
export type DeleteSavedImageMutationOptions = Apollo.BaseMutationOptions<DeleteSavedImageMutation, DeleteSavedImageMutationVariables>;
export const DeleteUploadedImageDocument = gql`
    mutation DeleteUploadedImage($imageId: Int!) {
  deleteUploadedImage(imageId: $imageId)
}
    `;
export type DeleteUploadedImageMutationFn = Apollo.MutationFunction<DeleteUploadedImageMutation, DeleteUploadedImageMutationVariables>;

/**
 * __useDeleteUploadedImageMutation__
 *
 * To run a mutation, you first call `useDeleteUploadedImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUploadedImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUploadedImageMutation, { data, loading, error }] = useDeleteUploadedImageMutation({
 *   variables: {
 *      imageId: // value for 'imageId'
 *   },
 * });
 */
export function useDeleteUploadedImageMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUploadedImageMutation, DeleteUploadedImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUploadedImageMutation, DeleteUploadedImageMutationVariables>(DeleteUploadedImageDocument, options);
      }
export type DeleteUploadedImageMutationHookResult = ReturnType<typeof useDeleteUploadedImageMutation>;
export type DeleteUploadedImageMutationResult = Apollo.MutationResult<DeleteUploadedImageMutation>;
export type DeleteUploadedImageMutationOptions = Apollo.BaseMutationOptions<DeleteUploadedImageMutation, DeleteUploadedImageMutationVariables>;
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(credentials: {username: $username, password: $password}) {
    user {
      id
      username
      createdAt
    }
    errors {
      fieldName
      description
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const SaveImageDocument = gql`
    mutation SaveImage($imageInfo: ImageSaveInput!) {
  saveImage(imageInfo: $imageInfo) {
    saveSuccessful
    descrtiption
  }
}
    `;
export type SaveImageMutationFn = Apollo.MutationFunction<SaveImageMutation, SaveImageMutationVariables>;

/**
 * __useSaveImageMutation__
 *
 * To run a mutation, you first call `useSaveImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveImageMutation, { data, loading, error }] = useSaveImageMutation({
 *   variables: {
 *      imageInfo: // value for 'imageInfo'
 *   },
 * });
 */
export function useSaveImageMutation(baseOptions?: Apollo.MutationHookOptions<SaveImageMutation, SaveImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveImageMutation, SaveImageMutationVariables>(SaveImageDocument, options);
      }
export type SaveImageMutationHookResult = ReturnType<typeof useSaveImageMutation>;
export type SaveImageMutationResult = Apollo.MutationResult<SaveImageMutation>;
export type SaveImageMutationOptions = Apollo.BaseMutationOptions<SaveImageMutation, SaveImageMutationVariables>;
export const SignupDocument = gql`
    mutation Signup($username: String!, $password: String!) {
  signup(credentials: {username: $username, password: $password}) {
    user {
      id
      username
      createdAt
    }
    errors {
      fieldName
      description
    }
  }
}
    `;
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const UploadImageDocument = gql`
    mutation UploadImage($image: ImageInput!) {
  upload(image: $image)
}
    `;
export type UploadImageMutationFn = Apollo.MutationFunction<UploadImageMutation, UploadImageMutationVariables>;

/**
 * __useUploadImageMutation__
 *
 * To run a mutation, you first call `useUploadImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadImageMutation, { data, loading, error }] = useUploadImageMutation({
 *   variables: {
 *      image: // value for 'image'
 *   },
 * });
 */
export function useUploadImageMutation(baseOptions?: Apollo.MutationHookOptions<UploadImageMutation, UploadImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadImageMutation, UploadImageMutationVariables>(UploadImageDocument, options);
      }
export type UploadImageMutationHookResult = ReturnType<typeof useUploadImageMutation>;
export type UploadImageMutationResult = Apollo.MutationResult<UploadImageMutation>;
export type UploadImageMutationOptions = Apollo.BaseMutationOptions<UploadImageMutation, UploadImageMutationVariables>;
export const DiscoverImagesDocument = gql`
    query DiscoverImages($search: String!, $paginatedInput: PaginatedInput!) {
  discoverImages(search: $search, paginatedInput: $paginatedInput) {
    entities {
      id
      location
      label
      createdAt
    }
    hasMore
  }
}
    `;

/**
 * __useDiscoverImagesQuery__
 *
 * To run a query within a React component, call `useDiscoverImagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useDiscoverImagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDiscoverImagesQuery({
 *   variables: {
 *      search: // value for 'search'
 *      paginatedInput: // value for 'paginatedInput'
 *   },
 * });
 */
export function useDiscoverImagesQuery(baseOptions: Apollo.QueryHookOptions<DiscoverImagesQuery, DiscoverImagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DiscoverImagesQuery, DiscoverImagesQueryVariables>(DiscoverImagesDocument, options);
      }
export function useDiscoverImagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DiscoverImagesQuery, DiscoverImagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DiscoverImagesQuery, DiscoverImagesQueryVariables>(DiscoverImagesDocument, options);
        }
export type DiscoverImagesQueryHookResult = ReturnType<typeof useDiscoverImagesQuery>;
export type DiscoverImagesLazyQueryHookResult = ReturnType<typeof useDiscoverImagesLazyQuery>;
export type DiscoverImagesQueryResult = Apollo.QueryResult<DiscoverImagesQuery, DiscoverImagesQueryVariables>;
export const LabelsForUserDocument = gql`
    query LabelsForUser($paginatedInput: PaginatedInput!) {
  labelsForUser(paginatedInput: $paginatedInput) {
    entities {
      id
      labelName
      createdAt
    }
    hasMore
  }
}
    `;

/**
 * __useLabelsForUserQuery__
 *
 * To run a query within a React component, call `useLabelsForUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useLabelsForUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLabelsForUserQuery({
 *   variables: {
 *      paginatedInput: // value for 'paginatedInput'
 *   },
 * });
 */
export function useLabelsForUserQuery(baseOptions: Apollo.QueryHookOptions<LabelsForUserQuery, LabelsForUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LabelsForUserQuery, LabelsForUserQueryVariables>(LabelsForUserDocument, options);
      }
export function useLabelsForUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LabelsForUserQuery, LabelsForUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LabelsForUserQuery, LabelsForUserQueryVariables>(LabelsForUserDocument, options);
        }
export type LabelsForUserQueryHookResult = ReturnType<typeof useLabelsForUserQuery>;
export type LabelsForUserLazyQueryHookResult = ReturnType<typeof useLabelsForUserLazyQuery>;
export type LabelsForUserQueryResult = Apollo.QueryResult<LabelsForUserQuery, LabelsForUserQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    username
    id
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const SavedImagesDocument = gql`
    query SavedImages($paginatedInput: PaginatedInput!, $labelId: Int!) {
  savedImages(paginatedInput: $paginatedInput, labelId: $labelId) {
    entities {
      id
      location
    }
    hasMore
  }
}
    `;

/**
 * __useSavedImagesQuery__
 *
 * To run a query within a React component, call `useSavedImagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSavedImagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSavedImagesQuery({
 *   variables: {
 *      paginatedInput: // value for 'paginatedInput'
 *      labelId: // value for 'labelId'
 *   },
 * });
 */
export function useSavedImagesQuery(baseOptions: Apollo.QueryHookOptions<SavedImagesQuery, SavedImagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SavedImagesQuery, SavedImagesQueryVariables>(SavedImagesDocument, options);
      }
export function useSavedImagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SavedImagesQuery, SavedImagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SavedImagesQuery, SavedImagesQueryVariables>(SavedImagesDocument, options);
        }
export type SavedImagesQueryHookResult = ReturnType<typeof useSavedImagesQuery>;
export type SavedImagesLazyQueryHookResult = ReturnType<typeof useSavedImagesLazyQuery>;
export type SavedImagesQueryResult = Apollo.QueryResult<SavedImagesQuery, SavedImagesQueryVariables>;
export const UserUploadedImagesDocument = gql`
    query UserUploadedImages($paginatedInput: PaginatedInput!) {
  uploadedImages(paginatedInput: $paginatedInput) {
    hasMore
    entities {
      id
      location
      label
      createdAt
    }
  }
}
    `;

/**
 * __useUserUploadedImagesQuery__
 *
 * To run a query within a React component, call `useUserUploadedImagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserUploadedImagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserUploadedImagesQuery({
 *   variables: {
 *      paginatedInput: // value for 'paginatedInput'
 *   },
 * });
 */
export function useUserUploadedImagesQuery(baseOptions: Apollo.QueryHookOptions<UserUploadedImagesQuery, UserUploadedImagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserUploadedImagesQuery, UserUploadedImagesQueryVariables>(UserUploadedImagesDocument, options);
      }
export function useUserUploadedImagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserUploadedImagesQuery, UserUploadedImagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserUploadedImagesQuery, UserUploadedImagesQueryVariables>(UserUploadedImagesDocument, options);
        }
export type UserUploadedImagesQueryHookResult = ReturnType<typeof useUserUploadedImagesQuery>;
export type UserUploadedImagesLazyQueryHookResult = ReturnType<typeof useUserUploadedImagesLazyQuery>;
export type UserUploadedImagesQueryResult = Apollo.QueryResult<UserUploadedImagesQuery, UserUploadedImagesQueryVariables>;