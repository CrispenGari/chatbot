import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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
};

export type BotAnswer = {
  __typename?: 'BotAnswer';
  response: Scalars['String'];
};

export type BotResponse = {
  __typename?: 'BotResponse';
  answer: BotAnswer;
  classification: ClassificationType;
  meta: MetaType;
  question: UserQuestion;
};

export type ClassificationType = {
  __typename?: 'ClassificationType';
  intent: Scalars['String'];
  label: Scalars['Int'];
  probability: Scalars['Float'];
};

export type MetaType = {
  __typename?: 'MetaType';
  main: Scalars['String'];
  programmer: Scalars['String'];
  project: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  getResponse?: Maybe<RespondBot>;
};


export type MutationGetResponseArgs = {
  input: UserInput;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
};

export type RespondBot = {
  __typename?: 'RespondBot';
  res?: Maybe<BotResponse>;
};

export type UserInput = {
  text: Scalars['String'];
};

export type UserQuestion = {
  __typename?: 'UserQuestion';
  text: Scalars['String'];
};

export type ChatBotResponseMutationVariables = Exact<{
  input: UserInput;
}>;


export type ChatBotResponseMutation = { __typename?: 'Mutation', getResponse?: { __typename?: 'RespondBot', res?: { __typename?: 'BotResponse', question: { __typename?: 'UserQuestion', text: string }, answer: { __typename?: 'BotAnswer', response: string }, classification: { __typename?: 'ClassificationType', probability: number, intent: string, label: number }, meta: { __typename?: 'MetaType', programmer: string, project: string, main: string } } | null | undefined } | null | undefined };


export const ChatBotResponseDocument = gql`
    mutation ChatBotResponse($input: UserInput!) {
  getResponse(input: $input) {
    res {
      question {
        text
      }
      answer {
        response
      }
      classification {
        probability
        intent
        label
      }
      meta {
        programmer
        project
        main
      }
    }
  }
}
    `;
export type ChatBotResponseMutationFn = Apollo.MutationFunction<ChatBotResponseMutation, ChatBotResponseMutationVariables>;

/**
 * __useChatBotResponseMutation__
 *
 * To run a mutation, you first call `useChatBotResponseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChatBotResponseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [chatBotResponseMutation, { data, loading, error }] = useChatBotResponseMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChatBotResponseMutation(baseOptions?: Apollo.MutationHookOptions<ChatBotResponseMutation, ChatBotResponseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChatBotResponseMutation, ChatBotResponseMutationVariables>(ChatBotResponseDocument, options);
      }
export type ChatBotResponseMutationHookResult = ReturnType<typeof useChatBotResponseMutation>;
export type ChatBotResponseMutationResult = Apollo.MutationResult<ChatBotResponseMutation>;
export type ChatBotResponseMutationOptions = Apollo.BaseMutationOptions<ChatBotResponseMutation, ChatBotResponseMutationVariables>;