export type GameSummaryType = {
  userId: number;
  totalCount: number;
  wonCount: number;
  lostCount: number;
};

export type UserType = {
  id: number;
  username: string;
  avatar: Uint8Array;
  email: string;
  staff: boolean;
  password: string;
  twoFactorAuthEnabled: boolean;
  twoFactorAuthSecret: string;
};

export type MatchType = {
  gameId: number;
  user1Id: number;
  user2Id: number;
  user1Score: number;
  user2Score: number;
  startedAt: string;
  endedAt: string;
};



  // {
  //   "gameId": 2,
  //   "user1Id": 6,
  //   "user2Id": 2,
  //   "user1Score": 3,
  //   "user2Score": 0,
  //   "startedAt": "2023-09-25T15:23:27.295Z",
  //   "endedAt": "2023-09-25T15:23:40.395Z",
  //   "user1": {
  //     "id": 6,
  //     "username": "hosuzuki",
  //     "avatar": null,
  //     "email": "hosuzuki@student.42tokyo.jp",
  //     "staff": false,
  //     "password": null,
  //     "twoFactorAuthEnabled": false,
  //     "twoFactorAuthSecret": null
  //   },
  //   "user2": {
  //     "id": 2,
  //     "username": "Bob",
  //     "avatar": null,
  //     "email": "bob@example.com",
  //     "staff": true,
  //     "password": "$2b$10$C7uCl9iLbfQqPrEEJ89bmOP6cjwY.e.QFtgz/6zlwVexzs7Pl.RXW",
  //     "twoFactorAuthEnabled": false,
  //     "twoFactorAuthSecret": null
  //   },
  //   "gameSettings": {
  //     "id": 2,
  //     "gameId": 2,
  //     "points": 3,
  //     "isSpeedUp": false
  //   }
  // }