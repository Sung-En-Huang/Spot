/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getOwner = /* GraphQL */ `
  query GetOwner($id: ID!) {
    getOwner(id: $id) {
      id
      name
      email
      createdAt
      updatedAt
    }
  }
`;
export const listOwners = /* GraphQL */ `
  query ListOwners(
    $filter: ModelOwnerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOwners(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getHouse = /* GraphQL */ `
  query GetHouse($id: ID!) {
    getHouse(id: $id) {
      id
      address
      ownerId
      price
      durationStart
      durationEnd
      wifi
      kitchen
      ac
      parking
      bedrooms
      bathrooms
      createdAt
      updatedAt
    }
  }
`;
export const listHouses = /* GraphQL */ `
  query ListHouses(
    $filter: ModelHouseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHouses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        address
        ownerId
        price
        durationStart
        durationEnd
        wifi
        kitchen
        ac
        parking
        bedrooms
        bathrooms
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
