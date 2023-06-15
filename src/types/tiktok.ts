export type TiktokUserResponse = {
  extra: Extra;
  log_pb: LogPb;
  shareMeta: ShareMeta;
  statusCode: number;
  status_code: number;
  userInfo: UserInfo;
};

export type Extra = {
  fatal_item_ids: any[];
  logid: string;
  now: number;
};

export type LogPb = {
  impr_id: string;
};

export type ShareMeta = {
  desc: string;
  title: string;
};

export type UserInfo = {
  stats: Stats;
  user: User;
};

export type Stats = {
  diggCount: number;
  followerCount: number;
  followingCount: number;
  heart: number;
  heartCount: number;
  videoCount: number;
};

export type User = {
  avatarLarger: string;
  avatarMedium: string;
  avatarThumb: string;
  bioLink: BioLink;
  canExpPlaylist: boolean;
  commentSetting: number;
  commerceUserInfo: CommerceUserInfo;
  duetSetting: number;
  followingVisibility: number;
  ftc: boolean;
  id: string;
  isADVirtual: boolean;
  isEmbedBanned: boolean;
  nickname: string;
  openFavorite: boolean;
  privateAccount: boolean;
  profileEmbedPermission: number;
  profileTab: ProfileTab;
  relation: number;
  secUid: string;
  secret: boolean;
  signature: string;
  stitchSetting: number;
  ttSeller: boolean;
  uniqueId: string;
  verified: boolean;
};

export type BioLink = {
  link: string;
  risk: number;
};

export type CommerceUserInfo = {
  category: string;
  categoryButton: boolean;
  commerceUser: boolean;
};

export type ProfileTab = {
  showPlayListTab: boolean;
  showQuestionTab: boolean;
};
