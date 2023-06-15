export type Influencer = {
  id: string;
  username: string;
  fullName: string;
  platform: 'instagram' | 'tiktok';
  bio: string;
  profilePicUrl: string;
  externalUrl: string;
  followerCount: number;
  followingCount: number;
  isPrivate: boolean;
  isVerified: boolean;
  isBusinessAccount?: boolean;
  businessCategoryName?: string;
  businessEmail?: string;
  businessPhoneNumber?: string;
  engagementRate: number;
};
