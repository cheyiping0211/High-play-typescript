import gql from 'graphql-tag';
export const USER_LOGIN = gql`
mutation($user:UserLoginInput!) {
    userLogin(user:$user) {
      code
      data
      message
    }
  }
  
`;

export const GET_USER_FIND = gql`
    query($id:Int!) {
        findOneUser(id:$id) {
        code
        message
        data
         {
            id
            username
            avatar
         }
        }
    }
`;

export const GET_USER_LIST = gql`
    {
        findUsers {
        code
        data {
            username
        }
        message
        }
    }
`;