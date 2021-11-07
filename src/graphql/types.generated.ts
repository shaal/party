export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  DateTime: string
}

export type AcceptCocAndTosInput = {
  coc: Scalars['Boolean']
  tos: Scalars['Boolean']
}

export type AnswerPollInput = {
  id: Scalars['ID']
}

export type AttachBadgeToUserInput = {
  badgeId: Scalars['ID']
  userId: Scalars['ID']
}

export type Attachment = {
  __typename?: 'Attachment'
  id: Scalars['ID']
  index: Scalars['Int']
  type: Scalars['String']
  url: Scalars['String']
}

export type Badge = {
  __typename?: 'Badge'
  description?: Maybe<Scalars['String']>
  id: Scalars['ID']
  image: Scalars['String']
  name: Scalars['String']
  users: BadgeUsersConnection
}

export type BadgeUsersArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type BadgeUsersConnection = {
  __typename?: 'BadgeUsersConnection'
  edges: Array<Maybe<BadgeUsersConnectionEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type BadgeUsersConnectionEdge = {
  __typename?: 'BadgeUsersConnectionEdge'
  cursor: Scalars['String']
  node: User
}

export type Bookmark = {
  __typename?: 'Bookmark'
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  post: Post
  user: User
}

export type ChangePasswordInput = {
  currentPassword: Scalars['String']
  newPassword: Scalars['String']
}

export type Community = {
  __typename?: 'Community'
  avatar?: Maybe<Scalars['String']>
  createdAt: Scalars['DateTime']
  description?: Maybe<Scalars['String']>
  hasJoined: Scalars['Boolean']
  id: Scalars['ID']
  members: CommunityMembersConnection
  moderators: CommunityModeratorsConnection
  name: Scalars['String']
  owner: User
  ownerId: Scalars['ID']
  posts: CommunityPostsConnection
  rules: CommunityRulesConnection
  slug: Scalars['String']
}

export type CommunityMembersArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type CommunityModeratorsArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type CommunityPostsArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type CommunityRulesArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type CommunityMembersConnection = {
  __typename?: 'CommunityMembersConnection'
  edges: Array<Maybe<CommunityMembersConnectionEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type CommunityMembersConnectionEdge = {
  __typename?: 'CommunityMembersConnectionEdge'
  cursor: Scalars['String']
  node: User
}

export type CommunityModeratorsConnection = {
  __typename?: 'CommunityModeratorsConnection'
  edges: Array<Maybe<CommunityModeratorsConnectionEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type CommunityModeratorsConnectionEdge = {
  __typename?: 'CommunityModeratorsConnectionEdge'
  cursor: Scalars['String']
  node: User
}

export type CommunityPostsConnection = {
  __typename?: 'CommunityPostsConnection'
  edges: Array<Maybe<CommunityPostsConnectionEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type CommunityPostsConnectionEdge = {
  __typename?: 'CommunityPostsConnectionEdge'
  cursor: Scalars['String']
  node: Post
}

export type CommunityRulesConnection = {
  __typename?: 'CommunityRulesConnection'
  edges: Array<Maybe<CommunityRulesConnectionEdge>>
  pageInfo: PageInfo
}

export type CommunityRulesConnectionEdge = {
  __typename?: 'CommunityRulesConnectionEdge'
  cursor: Scalars['String']
  node: Rule
}

export type CreateBadgeInput = {
  description: Scalars['String']
  image: Scalars['String']
  name: Scalars['String']
}

export type CreateCommunityInput = {
  description?: Maybe<Scalars['String']>
  name: Scalars['String']
  slug: Scalars['String']
}

export type CreatePostInput = {
  address?: Maybe<Scalars['String']>
  attachments?: Maybe<Scalars['String']>
  body: Scalars['String']
  done?: Scalars['Boolean']
  parentId?: Maybe<Scalars['ID']>
  polls?: Maybe<Scalars['String']>
  targetId?: Maybe<Scalars['ID']>
  targetType?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  tokenId?: Maybe<Scalars['String']>
  type?: Scalars['String']
}

export type CreateProductInput = {
  description?: Maybe<Scalars['String']>
  name: Scalars['String']
  slug: Scalars['String']
  website: Scalars['String']
}

export type CreateReportInput = {
  message: Scalars['String']
  type: Scalars['String']
}

export type DeletePostInput = {
  id: Scalars['ID']
}

export type DeleteProductInput = {
  id: Scalars['ID']
}

export type EditIntegrationInput = {
  ethAddress?: Maybe<Scalars['String']>
  spotifyRefreshToken?: Maybe<Scalars['String']>
  wakatimeAPIKey?: Maybe<Scalars['String']>
}

export type EditNftAvatarInput = {
  avatar: Scalars['String']
  nftSource: Scalars['String']
}

export type EditPostInput = {
  body?: Maybe<Scalars['String']>
  done?: Maybe<Scalars['Boolean']>
  id: Scalars['ID']
}

export type EditProductProfileInput = {
  avatar?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  id: Scalars['ID']
  name: Scalars['String']
  slug: Scalars['String']
}

export type EditProductSocialInput = {
  discord?: Maybe<Scalars['String']>
  github?: Maybe<Scalars['String']>
  id: Scalars['ID']
  twitter?: Maybe<Scalars['String']>
  website?: Maybe<Scalars['String']>
}

export type EditSocialInput = {
  discord?: Maybe<Scalars['String']>
  github?: Maybe<Scalars['String']>
  twitter?: Maybe<Scalars['String']>
  website?: Maybe<Scalars['String']>
}

export type EditTipsInput = {
  bitcoin?: Maybe<Scalars['String']>
  buymeacoffee?: Maybe<Scalars['String']>
  cash?: Maybe<Scalars['String']>
  ethereum?: Maybe<Scalars['String']>
  github?: Maybe<Scalars['String']>
  paypal?: Maybe<Scalars['String']>
  solana?: Maybe<Scalars['String']>
}

export type EditUserInput = {
  avatar: Scalars['String']
  bio?: Maybe<Scalars['String']>
  cover: Scalars['String']
  email: Scalars['String']
  location?: Maybe<Scalars['String']>
  name: Scalars['String']
  username: Scalars['String']
}

export type Integration = {
  __typename?: 'Integration'
  ethAddress?: Maybe<Scalars['String']>
  githubId?: Maybe<Scalars['String']>
  id: Scalars['ID']
  spotifyRefreshToken?: Maybe<Scalars['String']>
  user: User
  wakatimeAPIKey?: Maybe<Scalars['String']>
}

export type Invite = {
  __typename?: 'Invite'
  code?: Maybe<Scalars['String']>
  id: Scalars['ID']
  usedTimes?: Maybe<Scalars['Int']>
  user: User
}

export type JoinWaitlistInput = {
  email: Scalars['String']
  password: Scalars['String']
  username: Scalars['String']
}

export type Like = {
  __typename?: 'Like'
  id: Scalars['ID']
  post: Post
  user: User
}

export type Log = {
  __typename?: 'Log'
  action: Scalars['String']
  createdAt: Scalars['DateTime']
  entityId?: Maybe<Scalars['String']>
  id: Scalars['ID']
  user: User
}

export type LoginInput = {
  email: Scalars['String']
  password: Scalars['String']
}

export type LoginWithWalletInput = {
  nonce: Scalars['String']
  signature: Scalars['String']
}

export type MintNftInput = {
  address: Scalars['String']
  postId: Scalars['ID']
  tokenId: Scalars['String']
}

export type ModTopicInput = {
  description?: Maybe<Scalars['String']>
  featuredAt?: Maybe<Scalars['Boolean']>
  id: Scalars['ID']
}

export type ModUserInput = {
  featuredAt?: Maybe<Scalars['Boolean']>
  isStaff?: Maybe<Scalars['Boolean']>
  isVerified?: Maybe<Scalars['Boolean']>
  spammy?: Maybe<Scalars['Boolean']>
  userId: Scalars['ID']
}

export type Mutation = {
  __typename?: 'Mutation'
  acceptCocAndTos: User
  answerPoll?: Maybe<PollAnswer>
  attachBadge: User
  changePassword: Result
  createBadge: Badge
  createCommunity: Community
  createPost: Post
  createProduct?: Maybe<Product>
  createReport: Report
  deleteAccount: Result
  deletePost: Result
  deleteProduct: Result
  editIntegration: Integration
  editNFTAvatar?: Maybe<User>
  editPost: Post
  editProductProfile?: Maybe<Product>
  editProductSocial?: Maybe<Product>
  editSocial: User
  editTips: Tip
  editUser: User
  joinWaitlist: User
  login?: Maybe<User>
  loginWithWallet?: Maybe<User>
  mint: Nft
  modTopic?: Maybe<Topic>
  modUser?: Maybe<User>
  onboardUser?: Maybe<User>
  readNotification: Result
  regenerateInvite: Invite
  resolveReport?: Maybe<Result>
  revokeSession: Result
  signUp: User
  toggleBookmark?: Maybe<Post>
  toggleCommunityJoin?: Maybe<Community>
  toggleFollow?: Maybe<User>
  togglePostLike?: Maybe<Post>
  toggleProductSubscribe?: Maybe<Product>
  toggleTopicStar?: Maybe<Topic>
}

export type MutationAcceptCocAndTosArgs = {
  input: AcceptCocAndTosInput
}

export type MutationAnswerPollArgs = {
  input: AnswerPollInput
}

export type MutationAttachBadgeArgs = {
  input: AttachBadgeToUserInput
}

export type MutationChangePasswordArgs = {
  input: ChangePasswordInput
}

export type MutationCreateBadgeArgs = {
  input: CreateBadgeInput
}

export type MutationCreateCommunityArgs = {
  input: CreateCommunityInput
}

export type MutationCreatePostArgs = {
  input: CreatePostInput
}

export type MutationCreateProductArgs = {
  input: CreateProductInput
}

export type MutationCreateReportArgs = {
  input: CreateReportInput
}

export type MutationDeletePostArgs = {
  input: DeletePostInput
}

export type MutationDeleteProductArgs = {
  input: DeleteProductInput
}

export type MutationEditIntegrationArgs = {
  input: EditIntegrationInput
}

export type MutationEditNftAvatarArgs = {
  input: EditNftAvatarInput
}

export type MutationEditPostArgs = {
  input: EditPostInput
}

export type MutationEditProductProfileArgs = {
  input: EditProductProfileInput
}

export type MutationEditProductSocialArgs = {
  input: EditProductSocialInput
}

export type MutationEditSocialArgs = {
  input: EditSocialInput
}

export type MutationEditTipsArgs = {
  input: EditTipsInput
}

export type MutationEditUserArgs = {
  input: EditUserInput
}

export type MutationJoinWaitlistArgs = {
  input: JoinWaitlistInput
}

export type MutationLoginArgs = {
  input: LoginInput
}

export type MutationLoginWithWalletArgs = {
  input: LoginWithWalletInput
}

export type MutationMintArgs = {
  input: MintNftInput
}

export type MutationModTopicArgs = {
  input: ModTopicInput
}

export type MutationModUserArgs = {
  input: ModUserInput
}

export type MutationOnboardUserArgs = {
  input: OnboardUserInput
}

export type MutationReadNotificationArgs = {
  input: ReadNotificationInput
}

export type MutationResolveReportArgs = {
  input: ResolveReportInput
}

export type MutationRevokeSessionArgs = {
  input: RevokeSessionInput
}

export type MutationSignUpArgs = {
  input: SignupInput
}

export type MutationToggleBookmarkArgs = {
  input: ToggleBookmarkInput
}

export type MutationToggleCommunityJoinArgs = {
  input: ToggleCommunityJoinInput
}

export type MutationToggleFollowArgs = {
  input: ToggleFollowInput
}

export type MutationTogglePostLikeArgs = {
  input: TogglePostLikeInput
}

export type MutationToggleProductSubscribeArgs = {
  input: ToggleProductSubscribeInput
}

export type MutationToggleTopicStarArgs = {
  input: ToggleTopicStarInput
}

export type Nft = {
  __typename?: 'NFT'
  address: Scalars['String']
  id: Scalars['ID']
  tokenId: Scalars['String']
}

export type Notification = {
  __typename?: 'Notification'
  createdAt: Scalars['DateTime']
  dispatcher: User
  id: Scalars['ID']
  like?: Maybe<Like>
  post?: Maybe<Post>
  product?: Maybe<Product>
  receiver: User
  type: Scalars['String']
  updatedAt: Scalars['DateTime']
}

export type OnboardUserInput = {
  userId: Scalars['ID']
}

export type PageInfo = {
  __typename?: 'PageInfo'
  endCursor?: Maybe<Scalars['String']>
  hasNextPage: Scalars['Boolean']
  hasPreviousPage: Scalars['Boolean']
  startCursor?: Maybe<Scalars['String']>
}

export type Poll = {
  __typename?: 'Poll'
  answers: Array<PollAnswer>
  hasVoted: Scalars['Boolean']
  id: Scalars['ID']
  post: Post
  totalCount: Scalars['Int']
}

export type PollAnswer = {
  __typename?: 'PollAnswer'
  hasAnswered: Scalars['Boolean']
  id: Scalars['ID']
  poll: Poll
  title: Scalars['String']
  voters: PollAnswerVotersConnection
}

export type PollAnswerVotersArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type PollAnswerVotersConnection = {
  __typename?: 'PollAnswerVotersConnection'
  edges: Array<Maybe<PollAnswerVotersConnectionEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type PollAnswerVotersConnectionEdge = {
  __typename?: 'PollAnswerVotersConnectionEdge'
  cursor: Scalars['String']
  node: User
}

export type Post = {
  __typename?: 'Post'
  attachments: Array<Attachment>
  body: Scalars['String']
  community?: Maybe<Community>
  createdAt: Scalars['DateTime']
  done: Scalars['Boolean']
  hasBookmarked: Scalars['Boolean']
  hasLiked: Scalars['Boolean']
  id: Scalars['ID']
  likes: PostLikesConnection
  nft?: Maybe<Nft>
  oembedUrl?: Maybe<Scalars['String']>
  parent?: Maybe<Post>
  poll?: Maybe<Poll>
  product?: Maybe<Product>
  replies: PostRepliesConnection
  title?: Maybe<Scalars['String']>
  type: Scalars['String']
  updatedAt: Scalars['DateTime']
  user: User
}

export type PostLikesArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type PostRepliesArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type PostLikesConnection = {
  __typename?: 'PostLikesConnection'
  edges: Array<Maybe<PostLikesConnectionEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type PostLikesConnectionEdge = {
  __typename?: 'PostLikesConnectionEdge'
  cursor: Scalars['String']
  node: Like
}

export type PostRepliesConnection = {
  __typename?: 'PostRepliesConnection'
  edges: Array<Maybe<PostRepliesConnectionEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type PostRepliesConnectionEdge = {
  __typename?: 'PostRepliesConnectionEdge'
  cursor: Scalars['String']
  node: Post
}

export type Product = {
  __typename?: 'Product'
  avatar?: Maybe<Scalars['String']>
  createdAt: Scalars['DateTime']
  description?: Maybe<Scalars['String']>
  discord?: Maybe<Scalars['String']>
  github?: Maybe<Scalars['String']>
  hasSubscribed: Scalars['Boolean']
  id: Scalars['ID']
  name: Scalars['String']
  owner: User
  posts: ProductPostsConnection
  producthunt?: Maybe<Scalars['String']>
  slug: Scalars['String']
  subscribers: ProductSubscribersConnection
  twitter?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
  website?: Maybe<Scalars['String']>
}

export type ProductPostsArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type ProductSubscribersArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type ProductPostsConnection = {
  __typename?: 'ProductPostsConnection'
  edges: Array<Maybe<ProductPostsConnectionEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type ProductPostsConnectionEdge = {
  __typename?: 'ProductPostsConnectionEdge'
  cursor: Scalars['String']
  node: Post
}

export type ProductSubscribersConnection = {
  __typename?: 'ProductSubscribersConnection'
  edges: Array<Maybe<ProductSubscribersConnectionEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type ProductSubscribersConnectionEdge = {
  __typename?: 'ProductSubscribersConnectionEdge'
  cursor: Scalars['String']
  node: User
}

export type Profile = {
  __typename?: 'Profile'
  avatar: Scalars['String']
  bio?: Maybe<Scalars['String']>
  cover: Scalars['String']
  coverBg: Scalars['String']
  discord?: Maybe<Scalars['String']>
  github?: Maybe<Scalars['String']>
  id: Scalars['ID']
  location?: Maybe<Scalars['String']>
  name: Scalars['String']
  nftSource?: Maybe<Scalars['String']>
  twitter?: Maybe<Scalars['String']>
  website?: Maybe<Scalars['String']>
}

export type Query = {
  __typename?: 'Query'
  badges: QueryBadgesConnection
  community: Community
  exploreFeed: QueryExploreFeedConnection
  featuredTopics: QueryFeaturedTopicsConnection
  featuredUsers: QueryFeaturedUsersConnection
  homeFeed: QueryHomeFeedConnection
  integration?: Maybe<Integration>
  invite?: Maybe<Invite>
  logs: QueryLogsConnection
  me?: Maybe<User>
  morePostsByUser: QueryMorePostsByUserConnection
  notifications: QueryNotificationsConnection
  post: Post
  product: Product
  products: QueryProductsConnection
  reports: QueryReportsConnection
  searchTopics: QuerySearchTopicsConnection
  searchUsers: QuerySearchUsersConnection
  sessions?: Maybe<QuerySessionsConnection>
  spotify?: Maybe<Spotify>
  stats?: Maybe<Stats>
  suggestedUsers: QuerySuggestedUsersConnection
  topic: Topic
  user?: Maybe<User>
  users: QueryUsersConnection
  waitlistCount: WaitlistCount
  wakatime?: Maybe<Wakatime>
  whoToFollow: QueryWhoToFollowConnection
}

export type QueryBadgesArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type QueryCommunityArgs = {
  slug: Scalars['String']
}

export type QueryExploreFeedArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type QueryFeaturedTopicsArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type QueryFeaturedUsersArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type QueryHomeFeedArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  type?: Scalars['String']
}

export type QueryIntegrationArgs = {
  userId?: Maybe<Scalars['ID']>
}

export type QueryInviteArgs = {
  code: Scalars['String']
}

export type QueryLogsArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type QueryMorePostsByUserArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  type: Scalars['String']
  userId: Scalars['ID']
}

export type QueryNotificationsArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  isRead?: Scalars['Boolean']
  last?: Maybe<Scalars['Int']>
}

export type QueryPostArgs = {
  id: Scalars['ID']
}

export type QueryProductArgs = {
  slug: Scalars['String']
}

export type QueryProductsArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type QueryReportsArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type QuerySearchTopicsArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  keyword: Scalars['String']
  last?: Maybe<Scalars['Int']>
}

export type QuerySearchUsersArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  keyword: Scalars['String']
  last?: Maybe<Scalars['Int']>
}

export type QuerySessionsArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type QuerySpotifyArgs = {
  userId: Scalars['ID']
}

export type QuerySuggestedUsersArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type QueryTopicArgs = {
  name: Scalars['String']
}

export type QueryUserArgs = {
  username: Scalars['String']
}

export type QueryUsersArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type QueryWakatimeArgs = {
  userId: Scalars['ID']
}

export type QueryWhoToFollowArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type QueryBadgesConnection = {
  __typename?: 'QueryBadgesConnection'
  edges: Array<Maybe<QueryBadgesConnectionEdge>>
  pageInfo: PageInfo
}

export type QueryBadgesConnectionEdge = {
  __typename?: 'QueryBadgesConnectionEdge'
  cursor: Scalars['String']
  node: Badge
}

export type QueryExploreFeedConnection = {
  __typename?: 'QueryExploreFeedConnection'
  edges: Array<Maybe<QueryExploreFeedConnectionEdge>>
  pageInfo: PageInfo
}

export type QueryExploreFeedConnectionEdge = {
  __typename?: 'QueryExploreFeedConnectionEdge'
  cursor: Scalars['String']
  node: Post
}

export type QueryFeaturedTopicsConnection = {
  __typename?: 'QueryFeaturedTopicsConnection'
  edges: Array<Maybe<QueryFeaturedTopicsConnectionEdge>>
  pageInfo: PageInfo
}

export type QueryFeaturedTopicsConnectionEdge = {
  __typename?: 'QueryFeaturedTopicsConnectionEdge'
  cursor: Scalars['String']
  node: Topic
}

export type QueryFeaturedUsersConnection = {
  __typename?: 'QueryFeaturedUsersConnection'
  edges: Array<Maybe<QueryFeaturedUsersConnectionEdge>>
  pageInfo: PageInfo
}

export type QueryFeaturedUsersConnectionEdge = {
  __typename?: 'QueryFeaturedUsersConnectionEdge'
  cursor: Scalars['String']
  node: User
}

export type QueryHomeFeedConnection = {
  __typename?: 'QueryHomeFeedConnection'
  edges: Array<Maybe<QueryHomeFeedConnectionEdge>>
  pageInfo: PageInfo
}

export type QueryHomeFeedConnectionEdge = {
  __typename?: 'QueryHomeFeedConnectionEdge'
  cursor: Scalars['String']
  node: Post
}

export type QueryLogsConnection = {
  __typename?: 'QueryLogsConnection'
  edges: Array<Maybe<QueryLogsConnectionEdge>>
  pageInfo: PageInfo
}

export type QueryLogsConnectionEdge = {
  __typename?: 'QueryLogsConnectionEdge'
  cursor: Scalars['String']
  node: Log
}

export type QueryMorePostsByUserConnection = {
  __typename?: 'QueryMorePostsByUserConnection'
  edges: Array<Maybe<QueryMorePostsByUserConnectionEdge>>
  pageInfo: PageInfo
}

export type QueryMorePostsByUserConnectionEdge = {
  __typename?: 'QueryMorePostsByUserConnectionEdge'
  cursor: Scalars['String']
  node: Post
}

export type QueryNotificationsConnection = {
  __typename?: 'QueryNotificationsConnection'
  edges: Array<Maybe<QueryNotificationsConnectionEdge>>
  pageInfo: PageInfo
}

export type QueryNotificationsConnectionEdge = {
  __typename?: 'QueryNotificationsConnectionEdge'
  cursor: Scalars['String']
  node: Notification
}

export type QueryProductsConnection = {
  __typename?: 'QueryProductsConnection'
  edges: Array<Maybe<QueryProductsConnectionEdge>>
  pageInfo: PageInfo
}

export type QueryProductsConnectionEdge = {
  __typename?: 'QueryProductsConnectionEdge'
  cursor: Scalars['String']
  node: Product
}

export type QueryReportsConnection = {
  __typename?: 'QueryReportsConnection'
  edges: Array<Maybe<QueryReportsConnectionEdge>>
  pageInfo: PageInfo
}

export type QueryReportsConnectionEdge = {
  __typename?: 'QueryReportsConnectionEdge'
  cursor: Scalars['String']
  node: Report
}

export type QuerySearchTopicsConnection = {
  __typename?: 'QuerySearchTopicsConnection'
  edges: Array<Maybe<QuerySearchTopicsConnectionEdge>>
  pageInfo: PageInfo
}

export type QuerySearchTopicsConnectionEdge = {
  __typename?: 'QuerySearchTopicsConnectionEdge'
  cursor: Scalars['String']
  node: Topic
}

export type QuerySearchUsersConnection = {
  __typename?: 'QuerySearchUsersConnection'
  edges: Array<Maybe<QuerySearchUsersConnectionEdge>>
  pageInfo: PageInfo
}

export type QuerySearchUsersConnectionEdge = {
  __typename?: 'QuerySearchUsersConnectionEdge'
  cursor: Scalars['String']
  node: User
}

export type QuerySessionsConnection = {
  __typename?: 'QuerySessionsConnection'
  edges: Array<Maybe<QuerySessionsConnectionEdge>>
  pageInfo: PageInfo
}

export type QuerySessionsConnectionEdge = {
  __typename?: 'QuerySessionsConnectionEdge'
  cursor: Scalars['String']
  node: Session
}

export type QuerySuggestedUsersConnection = {
  __typename?: 'QuerySuggestedUsersConnection'
  edges: Array<Maybe<QuerySuggestedUsersConnectionEdge>>
  pageInfo: PageInfo
}

export type QuerySuggestedUsersConnectionEdge = {
  __typename?: 'QuerySuggestedUsersConnectionEdge'
  cursor: Scalars['String']
  node: User
}

export type QueryUsersConnection = {
  __typename?: 'QueryUsersConnection'
  edges: Array<Maybe<QueryUsersConnectionEdge>>
  pageInfo: PageInfo
}

export type QueryUsersConnectionEdge = {
  __typename?: 'QueryUsersConnectionEdge'
  cursor: Scalars['String']
  node: User
}

export type QueryWhoToFollowConnection = {
  __typename?: 'QueryWhoToFollowConnection'
  edges: Array<Maybe<QueryWhoToFollowConnectionEdge>>
  pageInfo: PageInfo
}

export type QueryWhoToFollowConnectionEdge = {
  __typename?: 'QueryWhoToFollowConnectionEdge'
  cursor: Scalars['String']
  node: User
}

export type ReadNotificationInput = {
  id: Scalars['ID']
}

export type Report = {
  __typename?: 'Report'
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  message: Scalars['String']
  post?: Maybe<Post>
  type: Scalars['String']
  user: User
}

export type ResolveReportInput = {
  id: Scalars['ID']
}

export enum Result {
  Success = 'SUCCESS'
}

export type RevokeSessionInput = {
  id: Scalars['ID']
}

export type Rule = {
  __typename?: 'Rule'
  community: Community
  description?: Maybe<Scalars['String']>
  id: Scalars['ID']
  index: Scalars['Int']
  name: Scalars['String']
}

export type Session = {
  __typename?: 'Session'
  createdAt: Scalars['DateTime']
  current: Scalars['Boolean']
  expiresAt: Scalars['DateTime']
  id: Scalars['ID']
  ipAddress?: Maybe<Scalars['String']>
  isStaff: Scalars['Boolean']
  user: User
  userAgent?: Maybe<Scalars['String']>
}

export type SignupInput = {
  email: Scalars['String']
  invite: Scalars['String']
  password: Scalars['String']
  username: Scalars['String']
}

export type Spotify = {
  __typename?: 'Spotify'
  artist?: Maybe<Scalars['String']>
  image?: Maybe<Scalars['String']>
  isPlaying?: Maybe<Scalars['Boolean']>
  name?: Maybe<Scalars['String']>
  url?: Maybe<Scalars['String']>
}

export type Stats = {
  __typename?: 'Stats'
  badges: Scalars['Int']
  communities: Scalars['Int']
  likes: Scalars['Int']
  notifications: Scalars['Int']
  posts: Scalars['Int']
  products: Scalars['Int']
  reports: Scalars['Int']
  sessions: Scalars['Int']
  topics: Scalars['Int']
  users: Scalars['Int']
}

export type Tip = {
  __typename?: 'Tip'
  bitcoin?: Maybe<Scalars['String']>
  buymeacoffee?: Maybe<Scalars['String']>
  cash?: Maybe<Scalars['String']>
  ethereum?: Maybe<Scalars['String']>
  github?: Maybe<Scalars['String']>
  id: Scalars['ID']
  paypal?: Maybe<Scalars['String']>
  solana?: Maybe<Scalars['String']>
  user: User
}

export type ToggleBookmarkInput = {
  id: Scalars['ID']
}

export type ToggleCommunityJoinInput = {
  id: Scalars['ID']
}

export type ToggleFollowInput = {
  userId: Scalars['ID']
}

export type TogglePostLikeInput = {
  id: Scalars['ID']
}

export type ToggleProductSubscribeInput = {
  id: Scalars['ID']
}

export type ToggleTopicStarInput = {
  id: Scalars['ID']
}

export type Topic = {
  __typename?: 'Topic'
  description?: Maybe<Scalars['String']>
  featuredAt?: Maybe<Scalars['DateTime']>
  hasStarred: Scalars['Boolean']
  id: Scalars['ID']
  image?: Maybe<Scalars['String']>
  name: Scalars['String']
  posts: TopicPostsConnection
  postsCount: Scalars['Int']
  starrers: TopicStarrersConnection
}

export type TopicPostsArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type TopicStarrersArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type TopicPostsConnection = {
  __typename?: 'TopicPostsConnection'
  edges: Array<Maybe<TopicPostsConnectionEdge>>
  pageInfo: PageInfo
}

export type TopicPostsConnectionEdge = {
  __typename?: 'TopicPostsConnectionEdge'
  cursor: Scalars['String']
  node: Post
}

export type TopicStarrersConnection = {
  __typename?: 'TopicStarrersConnection'
  edges: Array<Maybe<TopicStarrersConnectionEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type TopicStarrersConnectionEdge = {
  __typename?: 'TopicStarrersConnectionEdge'
  cursor: Scalars['String']
  node: User
}

export type User = {
  __typename?: 'User'
  badges: UserBadgesConnection
  bookmarks: UserBookmarksConnection
  communities: UserCommunitiesConnection
  createdAt: Scalars['DateTime']
  email?: Maybe<Scalars['String']>
  featuredAt?: Maybe<Scalars['DateTime']>
  followers: UserFollowersConnection
  following: UserFollowingConnection
  hasFollowed: Scalars['Boolean']
  hasSpotifyIntegration: Scalars['Boolean']
  hasWakatimeIntegration: Scalars['Boolean']
  id: Scalars['ID']
  inWaitlist: Scalars['Boolean']
  integrations?: Maybe<Integration>
  invite?: Maybe<Invite>
  isFollowing: Scalars['Boolean']
  isStaff: Scalars['Boolean']
  isVerified: Scalars['Boolean']
  masquerading?: Maybe<Scalars['Boolean']>
  notificationsCount: Scalars['Int']
  ownedProducts: UserOwnedProductsConnection
  posts: UserPostsConnection
  profile: Profile
  spammy: Scalars['Boolean']
  tip?: Maybe<Tip>
  topics: UserTopicsConnection
  updatedAt: Scalars['DateTime']
  username: Scalars['String']
}

export type UserBadgesArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type UserBookmarksArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type UserCommunitiesArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type UserFollowersArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type UserFollowingArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type UserOwnedProductsArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type UserPostsArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type UserTopicsArgs = {
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type UserBadgesConnection = {
  __typename?: 'UserBadgesConnection'
  edges: Array<Maybe<UserBadgesConnectionEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type UserBadgesConnectionEdge = {
  __typename?: 'UserBadgesConnectionEdge'
  cursor: Scalars['String']
  node: Badge
}

export type UserBookmarksConnection = {
  __typename?: 'UserBookmarksConnection'
  edges: Array<Maybe<UserBookmarksConnectionEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type UserBookmarksConnectionEdge = {
  __typename?: 'UserBookmarksConnectionEdge'
  cursor: Scalars['String']
  node: Bookmark
}

export type UserCommunitiesConnection = {
  __typename?: 'UserCommunitiesConnection'
  edges: Array<Maybe<UserCommunitiesConnectionEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type UserCommunitiesConnectionEdge = {
  __typename?: 'UserCommunitiesConnectionEdge'
  cursor: Scalars['String']
  node: Community
}

export type UserFollowersConnection = {
  __typename?: 'UserFollowersConnection'
  edges: Array<Maybe<UserFollowersConnectionEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type UserFollowersConnectionEdge = {
  __typename?: 'UserFollowersConnectionEdge'
  cursor: Scalars['String']
  node: User
}

export type UserFollowingConnection = {
  __typename?: 'UserFollowingConnection'
  edges: Array<Maybe<UserFollowingConnectionEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type UserFollowingConnectionEdge = {
  __typename?: 'UserFollowingConnectionEdge'
  cursor: Scalars['String']
  node: User
}

export type UserOwnedProductsConnection = {
  __typename?: 'UserOwnedProductsConnection'
  edges: Array<Maybe<UserOwnedProductsConnectionEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type UserOwnedProductsConnectionEdge = {
  __typename?: 'UserOwnedProductsConnectionEdge'
  cursor: Scalars['String']
  node: Product
}

export type UserPostsConnection = {
  __typename?: 'UserPostsConnection'
  edges: Array<Maybe<UserPostsConnectionEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type UserPostsConnectionEdge = {
  __typename?: 'UserPostsConnectionEdge'
  cursor: Scalars['String']
  node: Post
}

export type UserTopicsConnection = {
  __typename?: 'UserTopicsConnection'
  edges: Array<Maybe<UserTopicsConnectionEdge>>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type UserTopicsConnectionEdge = {
  __typename?: 'UserTopicsConnectionEdge'
  cursor: Scalars['String']
  node: Topic
}

export type WaitlistCount = {
  __typename?: 'WaitlistCount'
  count: Scalars['Int']
}

export type Wakatime = {
  __typename?: 'Wakatime'
  hours?: Maybe<Scalars['String']>
}

export type SignupMutationVariables = Exact<{
  input: SignupInput
}>

export type SignupMutation = {
  __typename?: 'Mutation'
  signUp: { __typename?: 'User'; id: string }
}

export type GetInviteQueryVariables = Exact<{
  code: Scalars['String']
}>

export type GetInviteQuery = {
  __typename?: 'Query'
  invite?:
    | {
        __typename?: 'Invite'
        user: { __typename?: 'User'; id: string; username: string }
      }
    | null
    | undefined
  waitlistCount: { __typename?: 'WaitlistCount'; count: number }
}

export type LoginFormMutationVariables = Exact<{
  input: LoginInput
}>

export type LoginFormMutation = {
  __typename?: 'Mutation'
  login?:
    | { __typename?: 'User'; id: string; inWaitlist: boolean }
    | null
    | undefined
}

export type LoginWithWalletMutationVariables = Exact<{
  input: LoginWithWalletInput
}>

export type LoginWithWalletMutation = {
  __typename?: 'Mutation'
  loginWithWallet?: { __typename?: 'User'; id: string } | null | undefined
}

export type JoinWaitlistFormMutationVariables = Exact<{
  input: JoinWaitlistInput
}>

export type JoinWaitlistFormMutation = {
  __typename?: 'Mutation'
  joinWaitlist: { __typename?: 'User'; id: string; inWaitlist: boolean }
}

export type ModeratorsQueryVariables = Exact<{
  after?: Maybe<Scalars['String']>
  slug: Scalars['String']
}>

export type ModeratorsQuery = {
  __typename?: 'Query'
  community: {
    __typename?: 'Community'
    moderators: {
      __typename?: 'CommunityModeratorsConnection'
      totalCount: number
      pageInfo: {
        __typename?: 'PageInfo'
        endCursor?: string | null | undefined
        hasNextPage: boolean
      }
      edges: Array<
        | {
            __typename?: 'CommunityModeratorsConnectionEdge'
            node: {
              __typename?: 'User'
              id: string
              username: string
              isVerified: boolean
              isFollowing: boolean
              hasFollowed: boolean
              profile: {
                __typename?: 'Profile'
                id: string
                name: string
                avatar: string
                bio?: string | null | undefined
              }
            }
          }
        | null
        | undefined
      >
    }
  }
}

export type CommunitiesQueryVariables = Exact<{ [key: string]: never }>

export type CommunitiesQuery = {
  __typename?: 'Query'
  products: {
    __typename?: 'QueryProductsConnection'
    edges: Array<
      | {
          __typename?: 'QueryProductsConnectionEdge'
          node: {
            __typename?: 'Product'
            id: string
            name: string
            slug: string
            avatar?: string | null | undefined
            description?: string | null | undefined
          }
        }
      | null
      | undefined
    >
  }
}

export type CommunityFeedQueryVariables = Exact<{
  after?: Maybe<Scalars['String']>
  slug: Scalars['String']
}>

export type CommunityFeedQuery = {
  __typename?: 'Query'
  community: {
    __typename?: 'Community'
    id: string
    posts: {
      __typename?: 'CommunityPostsConnection'
      pageInfo: {
        __typename?: 'PageInfo'
        endCursor?: string | null | undefined
        hasNextPage: boolean
      }
      edges: Array<
        | {
            __typename?: 'CommunityPostsConnectionEdge'
            node: {
              __typename?: 'Post'
              id: string
              title?: string | null | undefined
              body: string
              done: boolean
              type: string
              oembedUrl?: string | null | undefined
              hasLiked: boolean
              hasBookmarked: boolean
              createdAt: string
              parent?:
                | {
                    __typename?: 'Post'
                    id: string
                    user: { __typename?: 'User'; id: string; username: string }
                  }
                | null
                | undefined
              attachments: Array<{
                __typename?: 'Attachment'
                id: string
                url: string
              }>
              replies: {
                __typename?: 'PostRepliesConnection'
                totalCount: number
              }
              likes: {
                __typename?: 'PostLikesConnection'
                totalCount: number
                edges: Array<
                  | {
                      __typename?: 'PostLikesConnectionEdge'
                      node: {
                        __typename?: 'Like'
                        user: {
                          __typename?: 'User'
                          id: string
                          username: string
                          profile: {
                            __typename?: 'Profile'
                            id: string
                            avatar: string
                          }
                        }
                      }
                    }
                  | null
                  | undefined
                >
              }
              user: {
                __typename?: 'User'
                id: string
                username: string
                hasFollowed: boolean
                isVerified: boolean
                profile: {
                  __typename?: 'Profile'
                  id: string
                  name: string
                  avatar: string
                  bio?: string | null | undefined
                }
              }
              product?:
                | {
                    __typename?: 'Product'
                    id: string
                    name: string
                    slug: string
                    avatar?: string | null | undefined
                  }
                | null
                | undefined
              community?:
                | {
                    __typename?: 'Community'
                    id: string
                    name: string
                    slug: string
                    avatar?: string | null | undefined
                  }
                | null
                | undefined
              nft?:
                | {
                    __typename?: 'NFT'
                    id: string
                    address: string
                    tokenId: string
                  }
                | null
                | undefined
            }
          }
        | null
        | undefined
      >
    }
  }
}

export type ToggleCommunityJoinMutationVariables = Exact<{
  input: ToggleCommunityJoinInput
}>

export type ToggleCommunityJoinMutation = {
  __typename?: 'Mutation'
  toggleCommunityJoin?:
    | { __typename?: 'Community'; id: string; slug: string; hasJoined: boolean }
    | null
    | undefined
}

export type MembersQueryVariables = Exact<{
  after?: Maybe<Scalars['String']>
  slug: Scalars['String']
}>

export type MembersQuery = {
  __typename?: 'Query'
  community: {
    __typename?: 'Community'
    members: {
      __typename?: 'CommunityMembersConnection'
      totalCount: number
      pageInfo: {
        __typename?: 'PageInfo'
        endCursor?: string | null | undefined
        hasNextPage: boolean
      }
      edges: Array<
        | {
            __typename?: 'CommunityMembersConnectionEdge'
            node: {
              __typename?: 'User'
              id: string
              username: string
              isVerified: boolean
              isFollowing: boolean
              hasFollowed: boolean
              profile: {
                __typename?: 'Profile'
                id: string
                name: string
                avatar: string
                bio?: string | null | undefined
              }
            }
          }
        | null
        | undefined
      >
    }
  }
}

export type CreateCommunityMutationVariables = Exact<{
  input: CreateCommunityInput
}>

export type CreateCommunityMutation = {
  __typename?: 'Mutation'
  createCommunity: {
    __typename?: 'Community'
    id: string
    slug: string
    description?: string | null | undefined
  }
}

export type CommunityRulesQueryVariables = Exact<{
  slug: Scalars['String']
}>

export type CommunityRulesQuery = {
  __typename?: 'Query'
  community: {
    __typename?: 'Community'
    id: string
    rules: {
      __typename?: 'CommunityRulesConnection'
      edges: Array<
        | {
            __typename?: 'CommunityRulesConnectionEdge'
            node: {
              __typename?: 'Rule'
              id: string
              name: string
              description?: string | null | undefined
            }
          }
        | null
        | undefined
      >
    }
  }
}

export type ViewCommunityQueryVariables = Exact<{
  slug: Scalars['String']
}>

export type ViewCommunityQuery = {
  __typename?: 'Query'
  community: {
    __typename?: 'Community'
    id: string
    name: string
    slug: string
    avatar?: string | null | undefined
    description?: string | null | undefined
    hasJoined: boolean
    createdAt: string
    owner: {
      __typename?: 'User'
      id: string
      username: string
      profile: { __typename?: 'Profile'; id: string; avatar: string }
    }
    members: { __typename?: 'CommunityMembersConnection'; totalCount: number }
    moderators: {
      __typename?: 'CommunityModeratorsConnection'
      totalCount: number
    }
  }
}

export type FeaturedUsersQueryVariables = Exact<{ [key: string]: never }>

export type FeaturedUsersQuery = {
  __typename?: 'Query'
  featuredUsers: {
    __typename?: 'QueryFeaturedUsersConnection'
    edges: Array<
      | {
          __typename?: 'QueryFeaturedUsersConnectionEdge'
          node: {
            __typename?: 'User'
            id: string
            username: string
            hasFollowed: boolean
            isVerified: boolean
            profile: {
              __typename?: 'Profile'
              id: string
              avatar: string
              name: string
            }
          }
        }
      | null
      | undefined
    >
  }
}

export type ExploreFeedQueryVariables = Exact<{
  after?: Maybe<Scalars['String']>
}>

export type ExploreFeedQuery = {
  __typename?: 'Query'
  posts: {
    __typename?: 'QueryExploreFeedConnection'
    pageInfo: {
      __typename?: 'PageInfo'
      endCursor?: string | null | undefined
      hasNextPage: boolean
    }
    edges: Array<
      | {
          __typename?: 'QueryExploreFeedConnectionEdge'
          node: {
            __typename?: 'Post'
            id: string
            title?: string | null | undefined
            body: string
            done: boolean
            type: string
            oembedUrl?: string | null | undefined
            hasLiked: boolean
            hasBookmarked: boolean
            createdAt: string
            parent?:
              | {
                  __typename?: 'Post'
                  id: string
                  user: { __typename?: 'User'; id: string; username: string }
                }
              | null
              | undefined
            attachments: Array<{
              __typename?: 'Attachment'
              id: string
              url: string
            }>
            replies: {
              __typename?: 'PostRepliesConnection'
              totalCount: number
            }
            likes: {
              __typename?: 'PostLikesConnection'
              totalCount: number
              edges: Array<
                | {
                    __typename?: 'PostLikesConnectionEdge'
                    node: {
                      __typename?: 'Like'
                      user: {
                        __typename?: 'User'
                        id: string
                        username: string
                        profile: {
                          __typename?: 'Profile'
                          id: string
                          avatar: string
                        }
                      }
                    }
                  }
                | null
                | undefined
              >
            }
            user: {
              __typename?: 'User'
              id: string
              username: string
              hasFollowed: boolean
              isVerified: boolean
              profile: {
                __typename?: 'Profile'
                id: string
                name: string
                avatar: string
                bio?: string | null | undefined
              }
            }
            product?:
              | {
                  __typename?: 'Product'
                  id: string
                  name: string
                  slug: string
                  avatar?: string | null | undefined
                }
              | null
              | undefined
            community?:
              | {
                  __typename?: 'Community'
                  id: string
                  name: string
                  slug: string
                  avatar?: string | null | undefined
                }
              | null
              | undefined
            nft?:
              | {
                  __typename?: 'NFT'
                  id: string
                  address: string
                  tokenId: string
                }
              | null
              | undefined
          }
        }
      | null
      | undefined
    >
  }
}

export type GetExploreUserQueryVariables = Exact<{ [key: string]: never }>

export type GetExploreUserQuery = {
  __typename?: 'Query'
  me?:
    | {
        __typename?: 'User'
        id: string
        username: string
        profile: {
          __typename?: 'Profile'
          id: string
          name: string
          avatar: string
        }
        topics: {
          __typename?: 'UserTopicsConnection'
          totalCount: number
          edges: Array<
            | {
                __typename?: 'UserTopicsConnectionEdge'
                node: {
                  __typename?: 'Topic'
                  id: string
                  name: string
                  image?: string | null | undefined
                }
              }
            | null
            | undefined
          >
        }
      }
    | null
    | undefined
}

export type HomeFeedQueryVariables = Exact<{
  after?: Maybe<Scalars['String']>
  type: Scalars['String']
}>

export type HomeFeedQuery = {
  __typename?: 'Query'
  posts: {
    __typename?: 'QueryHomeFeedConnection'
    pageInfo: {
      __typename?: 'PageInfo'
      endCursor?: string | null | undefined
      hasNextPage: boolean
    }
    edges: Array<
      | {
          __typename?: 'QueryHomeFeedConnectionEdge'
          node: {
            __typename?: 'Post'
            id: string
            title?: string | null | undefined
            body: string
            done: boolean
            type: string
            oembedUrl?: string | null | undefined
            hasLiked: boolean
            hasBookmarked: boolean
            createdAt: string
            parent?:
              | {
                  __typename?: 'Post'
                  id: string
                  user: { __typename?: 'User'; id: string; username: string }
                }
              | null
              | undefined
            attachments: Array<{
              __typename?: 'Attachment'
              id: string
              url: string
            }>
            replies: {
              __typename?: 'PostRepliesConnection'
              totalCount: number
            }
            likes: {
              __typename?: 'PostLikesConnection'
              totalCount: number
              edges: Array<
                | {
                    __typename?: 'PostLikesConnectionEdge'
                    node: {
                      __typename?: 'Like'
                      user: {
                        __typename?: 'User'
                        id: string
                        username: string
                        profile: {
                          __typename?: 'Profile'
                          id: string
                          avatar: string
                        }
                      }
                    }
                  }
                | null
                | undefined
              >
            }
            user: {
              __typename?: 'User'
              id: string
              username: string
              hasFollowed: boolean
              isVerified: boolean
              profile: {
                __typename?: 'Profile'
                id: string
                name: string
                avatar: string
                bio?: string | null | undefined
              }
            }
            product?:
              | {
                  __typename?: 'Product'
                  id: string
                  name: string
                  slug: string
                  avatar?: string | null | undefined
                }
              | null
              | undefined
            community?:
              | {
                  __typename?: 'Community'
                  id: string
                  name: string
                  slug: string
                  avatar?: string | null | undefined
                }
              | null
              | undefined
            nft?:
              | {
                  __typename?: 'NFT'
                  id: string
                  address: string
                  tokenId: string
                }
              | null
              | undefined
          }
        }
      | null
      | undefined
    >
  }
}

export type RecentProductsQueryVariables = Exact<{ [key: string]: never }>

export type RecentProductsQuery = {
  __typename?: 'Query'
  products: {
    __typename?: 'QueryProductsConnection'
    edges: Array<
      | {
          __typename?: 'QueryProductsConnectionEdge'
          node: {
            __typename?: 'Product'
            id: string
            name: string
            slug: string
            avatar?: string | null | undefined
          }
        }
      | null
      | undefined
    >
  }
}

export type WhoToFollowQueryVariables = Exact<{ [key: string]: never }>

export type WhoToFollowQuery = {
  __typename?: 'Query'
  whoToFollow: {
    __typename?: 'QueryWhoToFollowConnection'
    edges: Array<
      | {
          __typename?: 'QueryWhoToFollowConnectionEdge'
          node: {
            __typename?: 'User'
            id: string
            username: string
            hasFollowed: boolean
            isVerified: boolean
            profile: {
              __typename?: 'Profile'
              id: string
              avatar: string
              name: string
            }
          }
        }
      | null
      | undefined
    >
  }
}

export type ReadNotificationMutationVariables = Exact<{
  input: ReadNotificationInput
}>

export type ReadNotificationMutation = {
  __typename?: 'Mutation'
  readNotification: Result
}

export type NotificationsQueryVariables = Exact<{
  after?: Maybe<Scalars['String']>
  isRead?: Maybe<Scalars['Boolean']>
}>

export type NotificationsQuery = {
  __typename?: 'Query'
  notifications: {
    __typename?: 'QueryNotificationsConnection'
    pageInfo: {
      __typename?: 'PageInfo'
      hasNextPage: boolean
      endCursor?: string | null | undefined
    }
    edges: Array<
      | {
          __typename?: 'QueryNotificationsConnectionEdge'
          node: {
            __typename?: 'Notification'
            id: string
            type: string
            createdAt: string
            dispatcher: {
              __typename?: 'User'
              id: string
              username: string
              hasFollowed: boolean
              profile: {
                __typename?: 'Profile'
                id: string
                name: string
                avatar: string
              }
            }
            like?:
              | {
                  __typename?: 'Like'
                  id: string
                  post: {
                    __typename?: 'Post'
                    id: string
                    title?: string | null | undefined
                    body: string
                    done: boolean
                    type: string
                    oembedUrl?: string | null | undefined
                    hasLiked: boolean
                    hasBookmarked: boolean
                    createdAt: string
                    parent?:
                      | {
                          __typename?: 'Post'
                          id: string
                          user: {
                            __typename?: 'User'
                            id: string
                            username: string
                          }
                        }
                      | null
                      | undefined
                    attachments: Array<{
                      __typename?: 'Attachment'
                      id: string
                      url: string
                    }>
                    replies: {
                      __typename?: 'PostRepliesConnection'
                      totalCount: number
                    }
                    likes: {
                      __typename?: 'PostLikesConnection'
                      totalCount: number
                      edges: Array<
                        | {
                            __typename?: 'PostLikesConnectionEdge'
                            node: {
                              __typename?: 'Like'
                              user: {
                                __typename?: 'User'
                                id: string
                                username: string
                                profile: {
                                  __typename?: 'Profile'
                                  id: string
                                  avatar: string
                                }
                              }
                            }
                          }
                        | null
                        | undefined
                      >
                    }
                    user: {
                      __typename?: 'User'
                      id: string
                      username: string
                      hasFollowed: boolean
                      isVerified: boolean
                      profile: {
                        __typename?: 'Profile'
                        id: string
                        name: string
                        avatar: string
                        bio?: string | null | undefined
                      }
                    }
                    product?:
                      | {
                          __typename?: 'Product'
                          id: string
                          name: string
                          slug: string
                          avatar?: string | null | undefined
                        }
                      | null
                      | undefined
                    community?:
                      | {
                          __typename?: 'Community'
                          id: string
                          name: string
                          slug: string
                          avatar?: string | null | undefined
                        }
                      | null
                      | undefined
                    nft?:
                      | {
                          __typename?: 'NFT'
                          id: string
                          address: string
                          tokenId: string
                        }
                      | null
                      | undefined
                  }
                }
              | null
              | undefined
            post?:
              | {
                  __typename?: 'Post'
                  id: string
                  title?: string | null | undefined
                  body: string
                  done: boolean
                  type: string
                  oembedUrl?: string | null | undefined
                  hasLiked: boolean
                  hasBookmarked: boolean
                  createdAt: string
                  parent?:
                    | {
                        __typename?: 'Post'
                        id: string
                        user: {
                          __typename?: 'User'
                          id: string
                          username: string
                        }
                      }
                    | null
                    | undefined
                  attachments: Array<{
                    __typename?: 'Attachment'
                    id: string
                    url: string
                  }>
                  replies: {
                    __typename?: 'PostRepliesConnection'
                    totalCount: number
                  }
                  likes: {
                    __typename?: 'PostLikesConnection'
                    totalCount: number
                    edges: Array<
                      | {
                          __typename?: 'PostLikesConnectionEdge'
                          node: {
                            __typename?: 'Like'
                            user: {
                              __typename?: 'User'
                              id: string
                              username: string
                              profile: {
                                __typename?: 'Profile'
                                id: string
                                avatar: string
                              }
                            }
                          }
                        }
                      | null
                      | undefined
                    >
                  }
                  user: {
                    __typename?: 'User'
                    id: string
                    username: string
                    hasFollowed: boolean
                    isVerified: boolean
                    profile: {
                      __typename?: 'Profile'
                      id: string
                      name: string
                      avatar: string
                      bio?: string | null | undefined
                    }
                  }
                  product?:
                    | {
                        __typename?: 'Product'
                        id: string
                        name: string
                        slug: string
                        avatar?: string | null | undefined
                      }
                    | null
                    | undefined
                  community?:
                    | {
                        __typename?: 'Community'
                        id: string
                        name: string
                        slug: string
                        avatar?: string | null | undefined
                      }
                    | null
                    | undefined
                  nft?:
                    | {
                        __typename?: 'NFT'
                        id: string
                        address: string
                        tokenId: string
                      }
                    | null
                    | undefined
                }
              | null
              | undefined
            product?:
              | {
                  __typename?: 'Product'
                  id: string
                  slug: string
                  name: string
                  description?: string | null | undefined
                  avatar?: string | null | undefined
                }
              | null
              | undefined
          }
        }
      | null
      | undefined
    >
  }
}

export type OnboardingUsersQueryVariables = Exact<{
  after?: Maybe<Scalars['String']>
}>

export type OnboardingUsersQuery = {
  __typename?: 'Query'
  suggestedUsers: {
    __typename?: 'QuerySuggestedUsersConnection'
    edges: Array<
      | {
          __typename?: 'QuerySuggestedUsersConnectionEdge'
          node: {
            __typename?: 'User'
            id: string
            username: string
            isVerified: boolean
            hasFollowed: boolean
            profile: {
              __typename?: 'Profile'
              id: string
              name: string
              avatar: string
              bio?: string | null | undefined
            }
          }
        }
      | null
      | undefined
    >
  }
}

export type OnboardingProfileSettingsMutationVariables = Exact<{
  input: EditUserInput
}>

export type OnboardingProfileSettingsMutation = {
  __typename?: 'Mutation'
  editUser: {
    __typename?: 'User'
    id: string
    profile: {
      __typename?: 'Profile'
      id: string
      bio?: string | null | undefined
      location?: string | null | undefined
    }
  }
}

export type OnboardingTopicsQueryVariables = Exact<{
  after?: Maybe<Scalars['String']>
}>

export type OnboardingTopicsQuery = {
  __typename?: 'Query'
  featuredTopics: {
    __typename?: 'QueryFeaturedTopicsConnection'
    edges: Array<
      | {
          __typename?: 'QueryFeaturedTopicsConnectionEdge'
          node: {
            __typename?: 'Topic'
            id: string
            name: string
            description?: string | null | undefined
            postsCount: number
            hasStarred: boolean
            starrers: {
              __typename?: 'TopicStarrersConnection'
              totalCount: number
            }
          }
        }
      | null
      | undefined
    >
  }
}

export type AcceptCocAndTosMutationVariables = Exact<{
  input: AcceptCocAndTosInput
}>

export type AcceptCocAndTosMutation = {
  __typename?: 'Mutation'
  acceptCocAndTos: { __typename?: 'User'; id: string }
}

export type MintNftMutationVariables = Exact<{
  input: MintNftInput
}>

export type MintNftMutation = {
  __typename?: 'Mutation'
  mint: { __typename?: 'NFT'; id: string; address: string; tokenId: string }
}

export type MorePostsByUserQueryVariables = Exact<{
  userId: Scalars['ID']
  type: Scalars['String']
}>

export type MorePostsByUserQuery = {
  __typename?: 'Query'
  morePostsByUser: {
    __typename?: 'QueryMorePostsByUserConnection'
    edges: Array<
      | {
          __typename?: 'QueryMorePostsByUserConnectionEdge'
          node: {
            __typename?: 'Post'
            id: string
            title?: string | null | undefined
            user: {
              __typename?: 'User'
              id: string
              username: string
              profile: {
                __typename?: 'Profile'
                id: string
                name: string
                avatar: string
              }
            }
          }
        }
      | null
      | undefined
    >
  }
}

export type SelectTargetQueryVariables = Exact<{ [key: string]: never }>

export type SelectTargetQuery = {
  __typename?: 'Query'
  me?:
    | {
        __typename?: 'User'
        ownedProducts: {
          __typename?: 'UserOwnedProductsConnection'
          edges: Array<
            | {
                __typename?: 'UserOwnedProductsConnectionEdge'
                node: {
                  __typename?: 'Product'
                  id: string
                  name: string
                  avatar?: string | null | undefined
                  subscribers: {
                    __typename?: 'ProductSubscribersConnection'
                    totalCount: number
                  }
                }
              }
            | null
            | undefined
          >
        }
        communities: {
          __typename?: 'UserCommunitiesConnection'
          edges: Array<
            | {
                __typename?: 'UserCommunitiesConnectionEdge'
                node: {
                  __typename?: 'Community'
                  id: string
                  name: string
                  avatar?: string | null | undefined
                  members: {
                    __typename?: 'CommunityMembersConnection'
                    totalCount: number
                  }
                }
              }
            | null
            | undefined
          >
        }
      }
    | null
    | undefined
}

export type CreateIssueMutationVariables = Exact<{
  input: CreatePostInput
}>

export type CreateIssueMutation = {
  __typename?: 'Mutation'
  createPost: { __typename?: 'Post'; id: string; body: string }
}

export type CreatePollMutationVariables = Exact<{
  input: CreatePostInput
}>

export type CreatePollMutation = {
  __typename?: 'Mutation'
  createPost: { __typename?: 'Post'; id: string }
}

export type CreatePostMutationVariables = Exact<{
  input: CreatePostInput
}>

export type CreatePostMutation = {
  __typename?: 'Mutation'
  createPost: { __typename?: 'Post'; id: string; body: string }
}

export type CreateQuestionMutationVariables = Exact<{
  input: CreatePostInput
}>

export type CreateQuestionMutation = {
  __typename?: 'Mutation'
  createPost: { __typename?: 'Post'; id: string; body: string }
}

export type CreateTaskMutationVariables = Exact<{
  input: CreatePostInput
}>

export type CreateTaskMutation = {
  __typename?: 'Mutation'
  createPost: { __typename?: 'Post'; id: string; body: string }
}

export type NewReplyMutationVariables = Exact<{
  input: CreatePostInput
}>

export type NewReplyMutation = {
  __typename?: 'Mutation'
  createPost: { __typename?: 'Post'; id: string; body: string }
}

export type RepliesQueryVariables = Exact<{
  after?: Maybe<Scalars['String']>
  id: Scalars['ID']
}>

export type RepliesQuery = {
  __typename?: 'Query'
  post: {
    __typename?: 'Post'
    id: string
    replies: {
      __typename?: 'PostRepliesConnection'
      pageInfo: {
        __typename?: 'PageInfo'
        endCursor?: string | null | undefined
        hasNextPage: boolean
      }
      edges: Array<
        | {
            __typename?: 'PostRepliesConnectionEdge'
            node: {
              __typename?: 'Post'
              id: string
              title?: string | null | undefined
              body: string
              done: boolean
              type: string
              oembedUrl?: string | null | undefined
              hasLiked: boolean
              hasBookmarked: boolean
              createdAt: string
              parent?:
                | {
                    __typename?: 'Post'
                    id: string
                    user: { __typename?: 'User'; id: string; username: string }
                  }
                | null
                | undefined
              attachments: Array<{
                __typename?: 'Attachment'
                id: string
                url: string
              }>
              replies: {
                __typename?: 'PostRepliesConnection'
                totalCount: number
              }
              likes: {
                __typename?: 'PostLikesConnection'
                totalCount: number
                edges: Array<
                  | {
                      __typename?: 'PostLikesConnectionEdge'
                      node: {
                        __typename?: 'Like'
                        user: {
                          __typename?: 'User'
                          id: string
                          username: string
                          profile: {
                            __typename?: 'Profile'
                            id: string
                            avatar: string
                          }
                        }
                      }
                    }
                  | null
                  | undefined
                >
              }
              user: {
                __typename?: 'User'
                id: string
                username: string
                hasFollowed: boolean
                isVerified: boolean
                profile: {
                  __typename?: 'Profile'
                  id: string
                  name: string
                  avatar: string
                  bio?: string | null | undefined
                }
              }
              product?:
                | {
                    __typename?: 'Product'
                    id: string
                    name: string
                    slug: string
                    avatar?: string | null | undefined
                  }
                | null
                | undefined
              community?:
                | {
                    __typename?: 'Community'
                    id: string
                    name: string
                    slug: string
                    avatar?: string | null | undefined
                  }
                | null
                | undefined
              nft?:
                | {
                    __typename?: 'NFT'
                    id: string
                    address: string
                    tokenId: string
                  }
                | null
                | undefined
            }
          }
        | null
        | undefined
      >
    }
  }
}

export type ToggleBookmarkMutationVariables = Exact<{
  input: ToggleBookmarkInput
}>

export type ToggleBookmarkMutation = {
  __typename?: 'Mutation'
  toggleBookmark?:
    | { __typename?: 'Post'; id: string; hasBookmarked: boolean }
    | null
    | undefined
}

export type DeletePostMutationVariables = Exact<{
  input: DeletePostInput
}>

export type DeletePostMutation = { __typename?: 'Mutation'; deletePost: Result }

export type ToggleFollowMutationVariables = Exact<{
  input: ToggleFollowInput
}>

export type ToggleFollowMutation = {
  __typename?: 'Mutation'
  toggleFollow?:
    | {
        __typename?: 'User'
        id: string
        username: string
        hasFollowed: boolean
      }
    | null
    | undefined
}

export type PostPollQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type PostPollQuery = {
  __typename?: 'Query'
  post: {
    __typename?: 'Post'
    id: string
    poll?:
      | {
          __typename?: 'Poll'
          id: string
          hasVoted: boolean
          totalCount: number
          answers: Array<{
            __typename?: 'PollAnswer'
            id: string
            title: string
            hasAnswered: boolean
            voters: {
              __typename?: 'PollAnswerVotersConnection'
              totalCount: number
            }
          }>
        }
      | null
      | undefined
  }
}

export type AnswerPollMutationVariables = Exact<{
  input: AnswerPollInput
}>

export type AnswerPollMutation = {
  __typename?: 'Mutation'
  answerPoll?:
    | { __typename?: 'PollAnswer'; id: string; title: string }
    | null
    | undefined
}

export type EditPostMutationVariables = Exact<{
  input: EditPostInput
}>

export type EditPostMutation = {
  __typename?: 'Mutation'
  editPost: { __typename?: 'Post'; id: string; body: string; done: boolean }
}

export type PostFragmentFragment = {
  __typename?: 'Post'
  id: string
  title?: string | null | undefined
  body: string
  done: boolean
  type: string
  oembedUrl?: string | null | undefined
  hasLiked: boolean
  hasBookmarked: boolean
  createdAt: string
  parent?:
    | {
        __typename?: 'Post'
        id: string
        user: { __typename?: 'User'; id: string; username: string }
      }
    | null
    | undefined
  attachments: Array<{ __typename?: 'Attachment'; id: string; url: string }>
  replies: { __typename?: 'PostRepliesConnection'; totalCount: number }
  likes: {
    __typename?: 'PostLikesConnection'
    totalCount: number
    edges: Array<
      | {
          __typename?: 'PostLikesConnectionEdge'
          node: {
            __typename?: 'Like'
            user: {
              __typename?: 'User'
              id: string
              username: string
              profile: { __typename?: 'Profile'; id: string; avatar: string }
            }
          }
        }
      | null
      | undefined
    >
  }
  user: {
    __typename?: 'User'
    id: string
    username: string
    hasFollowed: boolean
    isVerified: boolean
    profile: {
      __typename?: 'Profile'
      id: string
      name: string
      avatar: string
      bio?: string | null | undefined
    }
  }
  product?:
    | {
        __typename?: 'Product'
        id: string
        name: string
        slug: string
        avatar?: string | null | undefined
      }
    | null
    | undefined
  community?:
    | {
        __typename?: 'Community'
        id: string
        name: string
        slug: string
        avatar?: string | null | undefined
      }
    | null
    | undefined
  nft?:
    | { __typename?: 'NFT'; id: string; address: string; tokenId: string }
    | null
    | undefined
}

export type TogglePostLikeMutationVariables = Exact<{
  input: TogglePostLikeInput
}>

export type TogglePostLikeMutation = {
  __typename?: 'Mutation'
  togglePostLike?: { __typename?: 'Post'; id: string } | null | undefined
}

export type PostQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type PostQuery = {
  __typename?: 'Query'
  post: {
    __typename?: 'Post'
    id: string
    title?: string | null | undefined
    body: string
    done: boolean
    type: string
    oembedUrl?: string | null | undefined
    hasLiked: boolean
    hasBookmarked: boolean
    createdAt: string
    parent?:
      | {
          __typename?: 'Post'
          id: string
          user: { __typename?: 'User'; id: string; username: string }
        }
      | null
      | undefined
    attachments: Array<{ __typename?: 'Attachment'; id: string; url: string }>
    replies: { __typename?: 'PostRepliesConnection'; totalCount: number }
    likes: {
      __typename?: 'PostLikesConnection'
      totalCount: number
      edges: Array<
        | {
            __typename?: 'PostLikesConnectionEdge'
            node: {
              __typename?: 'Like'
              user: {
                __typename?: 'User'
                id: string
                username: string
                profile: { __typename?: 'Profile'; id: string; avatar: string }
              }
            }
          }
        | null
        | undefined
      >
    }
    user: {
      __typename?: 'User'
      id: string
      username: string
      hasFollowed: boolean
      isVerified: boolean
      profile: {
        __typename?: 'Profile'
        id: string
        name: string
        avatar: string
        bio?: string | null | undefined
      }
    }
    product?:
      | {
          __typename?: 'Product'
          id: string
          name: string
          slug: string
          avatar?: string | null | undefined
        }
      | null
      | undefined
    community?:
      | {
          __typename?: 'Community'
          id: string
          name: string
          slug: string
          avatar?: string | null | undefined
        }
      | null
      | undefined
    nft?:
      | { __typename?: 'NFT'; id: string; address: string; tokenId: string }
      | null
      | undefined
  }
}

export type ProductFeedQueryVariables = Exact<{
  after?: Maybe<Scalars['String']>
  slug: Scalars['String']
}>

export type ProductFeedQuery = {
  __typename?: 'Query'
  product: {
    __typename?: 'Product'
    id: string
    posts: {
      __typename?: 'ProductPostsConnection'
      pageInfo: {
        __typename?: 'PageInfo'
        endCursor?: string | null | undefined
        hasNextPage: boolean
      }
      edges: Array<
        | {
            __typename?: 'ProductPostsConnectionEdge'
            node: {
              __typename?: 'Post'
              id: string
              title?: string | null | undefined
              body: string
              done: boolean
              type: string
              oembedUrl?: string | null | undefined
              hasLiked: boolean
              hasBookmarked: boolean
              createdAt: string
              parent?:
                | {
                    __typename?: 'Post'
                    id: string
                    user: { __typename?: 'User'; id: string; username: string }
                  }
                | null
                | undefined
              attachments: Array<{
                __typename?: 'Attachment'
                id: string
                url: string
              }>
              replies: {
                __typename?: 'PostRepliesConnection'
                totalCount: number
              }
              likes: {
                __typename?: 'PostLikesConnection'
                totalCount: number
                edges: Array<
                  | {
                      __typename?: 'PostLikesConnectionEdge'
                      node: {
                        __typename?: 'Like'
                        user: {
                          __typename?: 'User'
                          id: string
                          username: string
                          profile: {
                            __typename?: 'Profile'
                            id: string
                            avatar: string
                          }
                        }
                      }
                    }
                  | null
                  | undefined
                >
              }
              user: {
                __typename?: 'User'
                id: string
                username: string
                hasFollowed: boolean
                isVerified: boolean
                profile: {
                  __typename?: 'Profile'
                  id: string
                  name: string
                  avatar: string
                  bio?: string | null | undefined
                }
              }
              product?:
                | {
                    __typename?: 'Product'
                    id: string
                    name: string
                    slug: string
                    avatar?: string | null | undefined
                  }
                | null
                | undefined
              community?:
                | {
                    __typename?: 'Community'
                    id: string
                    name: string
                    slug: string
                    avatar?: string | null | undefined
                  }
                | null
                | undefined
              nft?:
                | {
                    __typename?: 'NFT'
                    id: string
                    address: string
                    tokenId: string
                  }
                | null
                | undefined
            }
          }
        | null
        | undefined
      >
    }
  }
}

export type CreateProductMutationVariables = Exact<{
  input: CreateProductInput
}>

export type CreateProductMutation = {
  __typename?: 'Mutation'
  createProduct?:
    | {
        __typename?: 'Product'
        id: string
        slug: string
        description?: string | null | undefined
      }
    | null
    | undefined
}

export type ProductsQueryVariables = Exact<{
  after?: Maybe<Scalars['String']>
}>

export type ProductsQuery = {
  __typename?: 'Query'
  products: {
    __typename?: 'QueryProductsConnection'
    pageInfo: {
      __typename?: 'PageInfo'
      endCursor?: string | null | undefined
      hasNextPage: boolean
    }
    edges: Array<
      | {
          __typename?: 'QueryProductsConnectionEdge'
          node: {
            __typename?: 'Product'
            id: string
            name: string
            slug: string
            avatar?: string | null | undefined
            description?: string | null | undefined
          }
        }
      | null
      | undefined
    >
  }
}

export type DeleteProductMutationVariables = Exact<{
  input: DeleteProductInput
}>

export type DeleteProductMutation = {
  __typename?: 'Mutation'
  deleteProduct: Result
}

export type EditProductProfileSettingsMutationVariables = Exact<{
  input: EditProductProfileInput
}>

export type EditProductProfileSettingsMutation = {
  __typename?: 'Mutation'
  editProductProfile?:
    | {
        __typename?: 'Product'
        id: string
        slug: string
        name: string
        description?: string | null | undefined
      }
    | null
    | undefined
}

export type GetProductSettingsQueryVariables = Exact<{
  slug: Scalars['String']
}>

export type GetProductSettingsQuery = {
  __typename?: 'Query'
  product: {
    __typename?: 'Product'
    id: string
    slug: string
    name: string
    description?: string | null | undefined
    avatar?: string | null | undefined
    owner: { __typename?: 'User'; id: string }
  }
}

export type EditProductSocialSettingsMutationVariables = Exact<{
  input: EditProductSocialInput
}>

export type EditProductSocialSettingsMutation = {
  __typename?: 'Mutation'
  editProductSocial?:
    | {
        __typename?: 'Product'
        id: string
        twitter?: string | null | undefined
        github?: string | null | undefined
        website?: string | null | undefined
        discord?: string | null | undefined
      }
    | null
    | undefined
}

export type GetProductSocialSettingsQueryVariables = Exact<{
  slug: Scalars['String']
}>

export type GetProductSocialSettingsQuery = {
  __typename?: 'Query'
  product: {
    __typename?: 'Product'
    id: string
    slug: string
    website?: string | null | undefined
    producthunt?: string | null | undefined
    discord?: string | null | undefined
    github?: string | null | undefined
    twitter?: string | null | undefined
    owner: { __typename?: 'User'; id: string }
  }
}

export type ToggleProductSubscribeMutationVariables = Exact<{
  input: ToggleProductSubscribeInput
}>

export type ToggleProductSubscribeMutation = {
  __typename?: 'Mutation'
  toggleProductSubscribe?:
    | {
        __typename?: 'Product'
        id: string
        slug: string
        hasSubscribed: boolean
      }
    | null
    | undefined
}

export type ProductQueryVariables = Exact<{
  slug: Scalars['String']
}>

export type ProductQuery = {
  __typename?: 'Query'
  product: {
    __typename?: 'Product'
    id: string
    name: string
    slug: string
    avatar?: string | null | undefined
    description?: string | null | undefined
    website?: string | null | undefined
    twitter?: string | null | undefined
    producthunt?: string | null | undefined
    github?: string | null | undefined
    discord?: string | null | undefined
    hasSubscribed: boolean
    owner: {
      __typename?: 'User'
      id: string
      username: string
      profile: {
        __typename?: 'Profile'
        id: string
        name: string
        avatar: string
        bio?: string | null | undefined
      }
    }
  }
}

export type CurrentUserQueryVariables = Exact<{ [key: string]: never }>

export type CurrentUserQuery = {
  __typename?: 'Query'
  me?:
    | {
        __typename?: 'User'
        id: string
        username: string
        isStaff: boolean
        spammy: boolean
        masquerading?: boolean | null | undefined
        profile: { __typename?: 'Profile'; id: string; avatar: string }
      }
    | null
    | undefined
}

export type StaffToolsReportsQueryVariables = Exact<{
  after?: Maybe<Scalars['String']>
}>

export type StaffToolsReportsQuery = {
  __typename?: 'Query'
  reports: {
    __typename?: 'QueryReportsConnection'
    pageInfo: {
      __typename?: 'PageInfo'
      endCursor?: string | null | undefined
      hasNextPage: boolean
    }
    edges: Array<
      | {
          __typename?: 'QueryReportsConnectionEdge'
          node: {
            __typename?: 'Report'
            id: string
            message: string
            type: string
            user: { __typename?: 'User'; id: string; username: string }
            post?: { __typename?: 'Post'; id: string } | null | undefined
          }
        }
      | null
      | undefined
    >
  }
}

export type ResolveReportMutationVariables = Exact<{
  input: ResolveReportInput
}>

export type ResolveReportMutation = {
  __typename?: 'Mutation'
  resolveReport?: Result | null | undefined
}

export type StaffToolsUsersQueryVariables = Exact<{
  after?: Maybe<Scalars['String']>
}>

export type StaffToolsUsersQuery = {
  __typename?: 'Query'
  users: {
    __typename?: 'QueryUsersConnection'
    pageInfo: {
      __typename?: 'PageInfo'
      endCursor?: string | null | undefined
      hasNextPage: boolean
    }
    edges: Array<
      | {
          __typename?: 'QueryUsersConnectionEdge'
          node: {
            __typename?: 'User'
            id: string
            username: string
            email?: string | null | undefined
            inWaitlist: boolean
            isVerified: boolean
            hasFollowed: boolean
            hasSpotifyIntegration: boolean
            hasWakatimeIntegration: boolean
            createdAt: string
            updatedAt: string
            followers: {
              __typename?: 'UserFollowersConnection'
              totalCount: number
            }
            following: {
              __typename?: 'UserFollowingConnection'
              totalCount: number
            }
            invite?:
              | {
                  __typename?: 'Invite'
                  id: string
                  code?: string | null | undefined
                  usedTimes?: number | null | undefined
                }
              | null
              | undefined
            profile: {
              __typename?: 'Profile'
              id: string
              name: string
              bio?: string | null | undefined
              avatar: string
            }
            integrations?:
              | {
                  __typename?: 'Integration'
                  githubId?: string | null | undefined
                  ethAddress?: string | null | undefined
                }
              | null
              | undefined
          }
        }
      | null
      | undefined
    >
  }
}

export type OnboardUserMutationVariables = Exact<{
  input: OnboardUserInput
}>

export type OnboardUserMutation = {
  __typename?: 'Mutation'
  onboardUser?:
    | { __typename?: 'User'; id: string; inWaitlist: boolean }
    | null
    | undefined
}

export type StaffToolsDashboardQueryVariables = Exact<{ [key: string]: never }>

export type StaffToolsDashboardQuery = {
  __typename?: 'Query'
  stats?:
    | {
        __typename?: 'Stats'
        users: number
        products: number
        communities: number
        posts: number
        likes: number
        topics: number
        badges: number
        notifications: number
        sessions: number
        reports: number
      }
    | null
    | undefined
}

export type TopicFeedQueryVariables = Exact<{
  after?: Maybe<Scalars['String']>
  name: Scalars['String']
}>

export type TopicFeedQuery = {
  __typename?: 'Query'
  topic: {
    __typename?: 'Topic'
    id: string
    posts: {
      __typename?: 'TopicPostsConnection'
      pageInfo: {
        __typename?: 'PageInfo'
        endCursor?: string | null | undefined
        hasNextPage: boolean
      }
      edges: Array<
        | {
            __typename?: 'TopicPostsConnectionEdge'
            node: {
              __typename?: 'Post'
              id: string
              title?: string | null | undefined
              body: string
              done: boolean
              type: string
              oembedUrl?: string | null | undefined
              hasLiked: boolean
              hasBookmarked: boolean
              createdAt: string
              parent?:
                | {
                    __typename?: 'Post'
                    id: string
                    user: { __typename?: 'User'; id: string; username: string }
                  }
                | null
                | undefined
              attachments: Array<{
                __typename?: 'Attachment'
                id: string
                url: string
              }>
              replies: {
                __typename?: 'PostRepliesConnection'
                totalCount: number
              }
              likes: {
                __typename?: 'PostLikesConnection'
                totalCount: number
                edges: Array<
                  | {
                      __typename?: 'PostLikesConnectionEdge'
                      node: {
                        __typename?: 'Like'
                        user: {
                          __typename?: 'User'
                          id: string
                          username: string
                          profile: {
                            __typename?: 'Profile'
                            id: string
                            avatar: string
                          }
                        }
                      }
                    }
                  | null
                  | undefined
                >
              }
              user: {
                __typename?: 'User'
                id: string
                username: string
                hasFollowed: boolean
                isVerified: boolean
                profile: {
                  __typename?: 'Profile'
                  id: string
                  name: string
                  avatar: string
                  bio?: string | null | undefined
                }
              }
              product?:
                | {
                    __typename?: 'Product'
                    id: string
                    name: string
                    slug: string
                    avatar?: string | null | undefined
                  }
                | null
                | undefined
              community?:
                | {
                    __typename?: 'Community'
                    id: string
                    name: string
                    slug: string
                    avatar?: string | null | undefined
                  }
                | null
                | undefined
              nft?:
                | {
                    __typename?: 'NFT'
                    id: string
                    address: string
                    tokenId: string
                  }
                | null
                | undefined
            }
          }
        | null
        | undefined
      >
    }
  }
}

export type ModTopicMutationVariables = Exact<{
  input: ModTopicInput
}>

export type ModTopicMutation = {
  __typename?: 'Mutation'
  modTopic?:
    | {
        __typename?: 'Topic'
        id: string
        description?: string | null | undefined
        featuredAt?: string | null | undefined
      }
    | null
    | undefined
}

export type ToggleTopicStarMutationVariables = Exact<{
  input: ToggleTopicStarInput
}>

export type ToggleTopicStarMutation = {
  __typename?: 'Mutation'
  toggleTopicStar?:
    | { __typename?: 'Topic'; id: string; name: string; hasStarred: boolean }
    | null
    | undefined
}

export type TopicQueryVariables = Exact<{
  name: Scalars['String']
}>

export type TopicQuery = {
  __typename?: 'Query'
  topic: {
    __typename?: 'Topic'
    id: string
    name: string
    image?: string | null | undefined
    description?: string | null | undefined
    postsCount: number
    hasStarred: boolean
    featuredAt?: string | null | undefined
  }
}

export type UserBadgesQueryVariables = Exact<{
  username: Scalars['String']
}>

export type UserBadgesQuery = {
  __typename?: 'Query'
  user?:
    | {
        __typename?: 'User'
        id: string
        badges: {
          __typename?: 'UserBadgesConnection'
          edges: Array<
            | {
                __typename?: 'UserBadgesConnectionEdge'
                node: {
                  __typename?: 'Badge'
                  id: string
                  name: string
                  description?: string | null | undefined
                  image: string
                }
              }
            | null
            | undefined
          >
        }
      }
    | null
    | undefined
}

export type BookmarkFeedQueryVariables = Exact<{
  after?: Maybe<Scalars['String']>
}>

export type BookmarkFeedQuery = {
  __typename?: 'Query'
  me?:
    | {
        __typename?: 'User'
        id: string
        bookmarks: {
          __typename?: 'UserBookmarksConnection'
          totalCount: number
          pageInfo: {
            __typename?: 'PageInfo'
            endCursor?: string | null | undefined
            hasNextPage: boolean
          }
          edges: Array<
            | {
                __typename?: 'UserBookmarksConnectionEdge'
                node: {
                  __typename?: 'Bookmark'
                  post: {
                    __typename?: 'Post'
                    id: string
                    title?: string | null | undefined
                    body: string
                    done: boolean
                    type: string
                    oembedUrl?: string | null | undefined
                    hasLiked: boolean
                    hasBookmarked: boolean
                    createdAt: string
                    parent?:
                      | {
                          __typename?: 'Post'
                          id: string
                          user: {
                            __typename?: 'User'
                            id: string
                            username: string
                          }
                        }
                      | null
                      | undefined
                    attachments: Array<{
                      __typename?: 'Attachment'
                      id: string
                      url: string
                    }>
                    replies: {
                      __typename?: 'PostRepliesConnection'
                      totalCount: number
                    }
                    likes: {
                      __typename?: 'PostLikesConnection'
                      totalCount: number
                      edges: Array<
                        | {
                            __typename?: 'PostLikesConnectionEdge'
                            node: {
                              __typename?: 'Like'
                              user: {
                                __typename?: 'User'
                                id: string
                                username: string
                                profile: {
                                  __typename?: 'Profile'
                                  id: string
                                  avatar: string
                                }
                              }
                            }
                          }
                        | null
                        | undefined
                      >
                    }
                    user: {
                      __typename?: 'User'
                      id: string
                      username: string
                      hasFollowed: boolean
                      isVerified: boolean
                      profile: {
                        __typename?: 'Profile'
                        id: string
                        name: string
                        avatar: string
                        bio?: string | null | undefined
                      }
                    }
                    product?:
                      | {
                          __typename?: 'Product'
                          id: string
                          name: string
                          slug: string
                          avatar?: string | null | undefined
                        }
                      | null
                      | undefined
                    community?:
                      | {
                          __typename?: 'Community'
                          id: string
                          name: string
                          slug: string
                          avatar?: string | null | undefined
                        }
                      | null
                      | undefined
                    nft?:
                      | {
                          __typename?: 'NFT'
                          id: string
                          address: string
                          tokenId: string
                        }
                      | null
                      | undefined
                  }
                }
              }
            | null
            | undefined
          >
        }
      }
    | null
    | undefined
}

export type UserFeedQueryVariables = Exact<{
  after?: Maybe<Scalars['String']>
  username: Scalars['String']
}>

export type UserFeedQuery = {
  __typename?: 'Query'
  user?:
    | {
        __typename?: 'User'
        id: string
        posts: {
          __typename?: 'UserPostsConnection'
          totalCount: number
          pageInfo: {
            __typename?: 'PageInfo'
            endCursor?: string | null | undefined
            hasNextPage: boolean
          }
          edges: Array<
            | {
                __typename?: 'UserPostsConnectionEdge'
                node: {
                  __typename?: 'Post'
                  id: string
                  title?: string | null | undefined
                  body: string
                  done: boolean
                  type: string
                  oembedUrl?: string | null | undefined
                  hasLiked: boolean
                  hasBookmarked: boolean
                  createdAt: string
                  parent?:
                    | {
                        __typename?: 'Post'
                        id: string
                        user: {
                          __typename?: 'User'
                          id: string
                          username: string
                        }
                      }
                    | null
                    | undefined
                  attachments: Array<{
                    __typename?: 'Attachment'
                    id: string
                    url: string
                  }>
                  replies: {
                    __typename?: 'PostRepliesConnection'
                    totalCount: number
                  }
                  likes: {
                    __typename?: 'PostLikesConnection'
                    totalCount: number
                    edges: Array<
                      | {
                          __typename?: 'PostLikesConnectionEdge'
                          node: {
                            __typename?: 'Like'
                            user: {
                              __typename?: 'User'
                              id: string
                              username: string
                              profile: {
                                __typename?: 'Profile'
                                id: string
                                avatar: string
                              }
                            }
                          }
                        }
                      | null
                      | undefined
                    >
                  }
                  user: {
                    __typename?: 'User'
                    id: string
                    username: string
                    hasFollowed: boolean
                    isVerified: boolean
                    profile: {
                      __typename?: 'Profile'
                      id: string
                      name: string
                      avatar: string
                      bio?: string | null | undefined
                    }
                  }
                  product?:
                    | {
                        __typename?: 'Product'
                        id: string
                        name: string
                        slug: string
                        avatar?: string | null | undefined
                      }
                    | null
                    | undefined
                  community?:
                    | {
                        __typename?: 'Community'
                        id: string
                        name: string
                        slug: string
                        avatar?: string | null | undefined
                      }
                    | null
                    | undefined
                  nft?:
                    | {
                        __typename?: 'NFT'
                        id: string
                        address: string
                        tokenId: string
                      }
                    | null
                    | undefined
                }
              }
            | null
            | undefined
          >
        }
      }
    | null
    | undefined
}

export type FollowersQueryVariables = Exact<{
  after?: Maybe<Scalars['String']>
  username: Scalars['String']
}>

export type FollowersQuery = {
  __typename?: 'Query'
  user?:
    | {
        __typename?: 'User'
        followers: {
          __typename?: 'UserFollowersConnection'
          totalCount: number
          pageInfo: {
            __typename?: 'PageInfo'
            endCursor?: string | null | undefined
            hasNextPage: boolean
          }
          edges: Array<
            | {
                __typename?: 'UserFollowersConnectionEdge'
                node: {
                  __typename?: 'User'
                  id: string
                  username: string
                  isVerified: boolean
                  isFollowing: boolean
                  hasFollowed: boolean
                  profile: {
                    __typename?: 'Profile'
                    id: string
                    name: string
                    avatar: string
                    bio?: string | null | undefined
                  }
                }
              }
            | null
            | undefined
          >
        }
      }
    | null
    | undefined
}

export type FollowingQueryVariables = Exact<{
  after?: Maybe<Scalars['String']>
  username: Scalars['String']
}>

export type FollowingQuery = {
  __typename?: 'Query'
  user?:
    | {
        __typename?: 'User'
        following: {
          __typename?: 'UserFollowingConnection'
          totalCount: number
          pageInfo: {
            __typename?: 'PageInfo'
            endCursor?: string | null | undefined
            hasNextPage: boolean
          }
          edges: Array<
            | {
                __typename?: 'UserFollowingConnectionEdge'
                node: {
                  __typename?: 'User'
                  id: string
                  username: string
                  isVerified: boolean
                  isFollowing: boolean
                  hasFollowed: boolean
                  profile: {
                    __typename?: 'Profile'
                    id: string
                    name: string
                    avatar: string
                    bio?: string | null | undefined
                  }
                }
              }
            | null
            | undefined
          >
        }
      }
    | null
    | undefined
}

export type SpotifyIntegrationsQueryVariables = Exact<{
  userId: Scalars['ID']
}>

export type SpotifyIntegrationsQuery = {
  __typename?: 'Query'
  spotify?:
    | {
        __typename?: 'Spotify'
        name?: string | null | undefined
        isPlaying?: boolean | null | undefined
        image?: string | null | undefined
        url?: string | null | undefined
        artist?: string | null | undefined
      }
    | null
    | undefined
}

export type WakatimeIntegrationsQueryVariables = Exact<{
  userId: Scalars['ID']
}>

export type WakatimeIntegrationsQuery = {
  __typename?: 'Query'
  wakatime?:
    | { __typename?: 'Wakatime'; hours?: string | null | undefined }
    | null
    | undefined
}

export type ModUserMutationVariables = Exact<{
  input: ModUserInput
}>

export type ModUserMutation = {
  __typename?: 'Mutation'
  modUser?:
    | {
        __typename?: 'User'
        id: string
        isVerified: boolean
        isStaff: boolean
        featuredAt?: string | null | undefined
        spammy: boolean
      }
    | null
    | undefined
}

export type UserProductsQueryVariables = Exact<{
  username: Scalars['String']
}>

export type UserProductsQuery = {
  __typename?: 'Query'
  user?:
    | {
        __typename?: 'User'
        ownedProducts: {
          __typename?: 'UserOwnedProductsConnection'
          edges: Array<
            | {
                __typename?: 'UserOwnedProductsConnectionEdge'
                node: {
                  __typename?: 'Product'
                  id: string
                  slug: string
                  name: string
                  avatar?: string | null | undefined
                }
              }
            | null
            | undefined
          >
        }
      }
    | null
    | undefined
}

export type DeleteAccountMutationVariables = Exact<{ [key: string]: never }>

export type DeleteAccountMutation = {
  __typename?: 'Mutation'
  deleteAccount: Result
}

export type WalletSettingsMutationVariables = Exact<{
  input: EditIntegrationInput
}>

export type WalletSettingsMutation = {
  __typename?: 'Mutation'
  editIntegration: {
    __typename?: 'Integration'
    id: string
    ethAddress?: string | null | undefined
  }
}

export type EditIntegrationSettingsMutationVariables = Exact<{
  input: EditIntegrationInput
}>

export type EditIntegrationSettingsMutation = {
  __typename?: 'Mutation'
  editIntegration: {
    __typename?: 'Integration'
    id: string
    wakatimeAPIKey?: string | null | undefined
    spotifyRefreshToken?: string | null | undefined
  }
}

export type GetIntegrationSettingsQueryVariables = Exact<{
  [key: string]: never
}>

export type GetIntegrationSettingsQuery = {
  __typename?: 'Query'
  integration?:
    | {
        __typename?: 'Integration'
        id: string
        wakatimeAPIKey?: string | null | undefined
        spotifyRefreshToken?: string | null | undefined
        ethAddress?: string | null | undefined
      }
    | null
    | undefined
}

export type LogsSettingsQueryVariables = Exact<{
  after?: Maybe<Scalars['String']>
}>

export type LogsSettingsQuery = {
  __typename?: 'Query'
  logs: {
    __typename?: 'QueryLogsConnection'
    pageInfo: {
      __typename?: 'PageInfo'
      endCursor?: string | null | undefined
      hasNextPage: boolean
    }
    edges: Array<
      | {
          __typename?: 'QueryLogsConnectionEdge'
          node: {
            __typename?: 'Log'
            id: string
            entityId?: string | null | undefined
            action: string
            createdAt: string
            user: {
              __typename?: 'User'
              id: string
              username: string
              profile: { __typename?: 'Profile'; id: string; avatar: string }
            }
          }
        }
      | null
      | undefined
    >
  }
}

export type ProfileSettingsMutationVariables = Exact<{
  input: EditUserInput
}>

export type ProfileSettingsMutation = {
  __typename?: 'Mutation'
  editUser: {
    __typename?: 'User'
    id: string
    username: string
    email?: string | null | undefined
    profile: {
      __typename?: 'Profile'
      id: string
      name: string
      bio?: string | null | undefined
      location?: string | null | undefined
      avatar: string
      cover: string
    }
  }
}

export type AvatarSettingsMutationVariables = Exact<{
  input: EditNftAvatarInput
}>

export type AvatarSettingsMutation = {
  __typename?: 'Mutation'
  editNFTAvatar?:
    | {
        __typename?: 'User'
        id: string
        username: string
        profile: { __typename?: 'Profile'; id: string; avatar: string }
      }
    | null
    | undefined
}

export type GetProfileSettingsQueryVariables = Exact<{ [key: string]: never }>

export type GetProfileSettingsQuery = {
  __typename?: 'Query'
  me?:
    | {
        __typename?: 'User'
        id: string
        username: string
        email?: string | null | undefined
        profile: {
          __typename?: 'Profile'
          id: string
          name: string
          bio?: string | null | undefined
          location?: string | null | undefined
          avatar: string
          cover: string
          coverBg: string
        }
        integrations?:
          | {
              __typename?: 'Integration'
              ethAddress?: string | null | undefined
            }
          | null
          | undefined
      }
    | null
    | undefined
}

export type ChangePasswordMutationVariables = Exact<{
  input: ChangePasswordInput
}>

export type ChangePasswordMutation = {
  __typename?: 'Mutation'
  changePassword: Result
}

export type RevokeSessionMutationVariables = Exact<{
  input: RevokeSessionInput
}>

export type RevokeSessionMutation = {
  __typename?: 'Mutation'
  revokeSession: Result
}

export type SessionsSettingsQueryVariables = Exact<{
  after?: Maybe<Scalars['String']>
}>

export type SessionsSettingsQuery = {
  __typename?: 'Query'
  sessions?:
    | {
        __typename?: 'QuerySessionsConnection'
        pageInfo: {
          __typename?: 'PageInfo'
          endCursor?: string | null | undefined
          hasNextPage: boolean
        }
        edges: Array<
          | {
              __typename?: 'QuerySessionsConnectionEdge'
              node: {
                __typename?: 'Session'
                id: string
                current: boolean
                isStaff: boolean
                ipAddress?: string | null | undefined
                userAgent?: string | null | undefined
                createdAt: string
                expiresAt: string
                user: {
                  __typename?: 'User'
                  id: string
                  username: string
                  profile: {
                    __typename?: 'Profile'
                    id: string
                    name: string
                    avatar: string
                  }
                }
              }
            }
          | null
          | undefined
        >
      }
    | null
    | undefined
}

export type EditSocialSettingsMutationVariables = Exact<{
  input: EditSocialInput
}>

export type EditSocialSettingsMutation = {
  __typename?: 'Mutation'
  editSocial: {
    __typename?: 'User'
    profile: {
      __typename?: 'Profile'
      id: string
      twitter?: string | null | undefined
      github?: string | null | undefined
      website?: string | null | undefined
      discord?: string | null | undefined
    }
  }
}

export type GetSocialSettingsQueryVariables = Exact<{ [key: string]: never }>

export type GetSocialSettingsQuery = {
  __typename?: 'Query'
  me?:
    | {
        __typename?: 'User'
        id: string
        profile: {
          __typename?: 'Profile'
          id: string
          website?: string | null | undefined
          twitter?: string | null | undefined
          github?: string | null | undefined
          discord?: string | null | undefined
        }
      }
    | null
    | undefined
}

export type EditTipsSettingsMutationVariables = Exact<{
  input: EditTipsInput
}>

export type EditTipsSettingsMutation = {
  __typename?: 'Mutation'
  editTips: {
    __typename?: 'Tip'
    id: string
    cash?: string | null | undefined
    paypal?: string | null | undefined
    github?: string | null | undefined
    buymeacoffee?: string | null | undefined
    bitcoin?: string | null | undefined
    ethereum?: string | null | undefined
    solana?: string | null | undefined
  }
}

export type GetTipsSettingsQueryVariables = Exact<{ [key: string]: never }>

export type GetTipsSettingsQuery = {
  __typename?: 'Query'
  me?:
    | {
        __typename?: 'User'
        id: string
        tip?:
          | {
              __typename?: 'Tip'
              id: string
              cash?: string | null | undefined
              paypal?: string | null | undefined
              github?: string | null | undefined
              buymeacoffee?: string | null | undefined
              bitcoin?: string | null | undefined
              ethereum?: string | null | undefined
              solana?: string | null | undefined
            }
          | null
          | undefined
      }
    | null
    | undefined
}

export type UserTipsQueryVariables = Exact<{
  username: Scalars['String']
}>

export type UserTipsQuery = {
  __typename?: 'Query'
  user?:
    | {
        __typename?: 'User'
        id: string
        tip?:
          | {
              __typename?: 'Tip'
              id: string
              cash?: string | null | undefined
              paypal?: string | null | undefined
              github?: string | null | undefined
              buymeacoffee?: string | null | undefined
              bitcoin?: string | null | undefined
              ethereum?: string | null | undefined
              solana?: string | null | undefined
              user: { __typename?: 'User'; id: string }
            }
          | null
          | undefined
      }
    | null
    | undefined
}

export type UserFragmentFragment = {
  __typename?: 'User'
  id: string
  username: string
  hasFollowed: boolean
  isFollowing: boolean
  hasWakatimeIntegration: boolean
  hasSpotifyIntegration: boolean
  isVerified: boolean
  isStaff: boolean
  spammy: boolean
  createdAt: string
  featuredAt?: string | null | undefined
  followers: { __typename?: 'UserFollowersConnection'; totalCount: number }
  following: { __typename?: 'UserFollowingConnection'; totalCount: number }
  posts: { __typename?: 'UserPostsConnection'; totalCount: number }
  profile: {
    __typename?: 'Profile'
    id: string
    avatar: string
    nftSource?: string | null | undefined
    cover: string
    coverBg: string
    name: string
    bio?: string | null | undefined
    location?: string | null | undefined
    website?: string | null | undefined
    twitter?: string | null | undefined
    github?: string | null | undefined
    discord?: string | null | undefined
  }
  tip?: { __typename?: 'Tip'; id: string } | null | undefined
}

export type ViewUserQueryVariables = Exact<{
  username: Scalars['String']
}>

export type ViewUserQuery = {
  __typename?: 'Query'
  user?:
    | {
        __typename?: 'User'
        id: string
        username: string
        hasFollowed: boolean
        isFollowing: boolean
        hasWakatimeIntegration: boolean
        hasSpotifyIntegration: boolean
        isVerified: boolean
        isStaff: boolean
        spammy: boolean
        createdAt: string
        featuredAt?: string | null | undefined
        followers: {
          __typename?: 'UserFollowersConnection'
          totalCount: number
        }
        following: {
          __typename?: 'UserFollowingConnection'
          totalCount: number
        }
        posts: { __typename?: 'UserPostsConnection'; totalCount: number }
        profile: {
          __typename?: 'Profile'
          id: string
          avatar: string
          nftSource?: string | null | undefined
          cover: string
          coverBg: string
          name: string
          bio?: string | null | undefined
          location?: string | null | undefined
          website?: string | null | undefined
          twitter?: string | null | undefined
          github?: string | null | undefined
          discord?: string | null | undefined
        }
        tip?: { __typename?: 'Tip'; id: string } | null | undefined
      }
    | null
    | undefined
}

export type InviteCodeQueryVariables = Exact<{ [key: string]: never }>

export type InviteCodeQuery = {
  __typename?: 'Query'
  me?:
    | {
        __typename?: 'User'
        id: string
        username: string
        invite?:
          | {
              __typename?: 'Invite'
              id: string
              code?: string | null | undefined
              usedTimes?: number | null | undefined
            }
          | null
          | undefined
      }
    | null
    | undefined
}

export type RegenerateInviteMutationVariables = Exact<{ [key: string]: never }>

export type RegenerateInviteMutation = {
  __typename?: 'Mutation'
  regenerateInvite: {
    __typename?: 'Invite'
    id: string
    code?: string | null | undefined
    usedTimes?: number | null | undefined
  }
}

export type NotificationCountQueryVariables = Exact<{ [key: string]: never }>

export type NotificationCountQuery = {
  __typename?: 'Query'
  me?: { __typename?: 'User'; notificationsCount: number } | null | undefined
}

export type SearchUsersQueryVariables = Exact<{
  keyword: Scalars['String']
}>

export type SearchUsersQuery = {
  __typename?: 'Query'
  searchUsers: {
    __typename?: 'QuerySearchUsersConnection'
    edges: Array<
      | {
          __typename?: 'QuerySearchUsersConnectionEdge'
          node: {
            __typename?: 'User'
            id: string
            username: string
            isVerified: boolean
            profile: {
              __typename?: 'Profile'
              id: string
              name: string
              avatar: string
            }
          }
        }
      | null
      | undefined
    >
  }
}

export type SearchTopicsQueryVariables = Exact<{
  keyword: Scalars['String']
}>

export type SearchTopicsQuery = {
  __typename?: 'Query'
  searchTopics: {
    __typename?: 'QuerySearchTopicsConnection'
    edges: Array<
      | {
          __typename?: 'QuerySearchTopicsConnectionEdge'
          node: { __typename?: 'Topic'; id: string; name: string }
        }
      | null
      | undefined
    >
  }
}
