export type InstagramProfileResponse = {
  data: Data;
  status: string;
};

export type Data = {
  user: DataUser;
};

export type DataUser = {
  biography: string;
  bio_links: BioLink[];
  biography_with_entities: BiographyWithEntities;
  blocked_by_viewer: boolean;
  restricted_by_viewer: boolean;
  country_block: boolean;
  eimu_id: string;
  external_url: string;
  external_url_linkshimmed: string;
  edge_followed_by: EdgeFollowClass;
  fbid: string;
  followed_by_viewer: boolean;
  edge_follow: EdgeFollowClass;
  follows_viewer: boolean;
  full_name: string;
  group_metadata: null;
  has_ar_effects: boolean;
  has_clips: boolean;
  has_guides: boolean;
  has_channel: boolean;
  has_blocked_viewer: boolean;
  highlight_reel_count: number;
  has_requested_viewer: boolean;
  hide_like_and_view_counts: boolean;
  id: string;
  is_business_account: boolean;
  is_professional_account: boolean;
  is_supervision_enabled: boolean;
  is_guardian_of_viewer: boolean;
  is_supervised_by_viewer: boolean;
  is_supervised_user: boolean;
  is_embeds_disabled: boolean;
  is_joined_recently: boolean;
  guardian_id: null;
  business_address_json: null;
  business_contact_method: string;
  business_email: null;
  business_phone_number: null;
  business_category_name: string;
  overall_category_name: null;
  category_enum: string;
  category_name: string;
  is_private: boolean;
  is_verified: boolean;
  is_verified_by_mv4b: boolean;
  edge_mutual_followed_by: EdgeMutualFollowedBy;
  profile_pic_url: string;
  profile_pic_url_hd: string;
  requested_by_viewer: boolean;
  should_show_category: boolean;
  should_show_public_contacts: boolean;
  show_account_transparency_details: boolean;
  transparency_label: null;
  transparency_product: string;
  username: Name;
  connected_fb_page: null;
  pronouns: any[];
  edge_felix_video_timeline: EdgeFelixVideoTimelineClass;
  edge_owner_to_timeline_media: EdgeFelixVideoTimelineClass;
  edge_saved_media: EdgeFelixVideoTimelineClass;
  edge_media_collections: EdgeFelixVideoTimelineClass;
};

export type BioLink = {
  title: string;
  lynx_url: string;
  url: string;
  link_type: string;
};

export type BiographyWithEntities = {
  raw_text: string;
  entities: Entity[];
};

export type Entity = {
  user: EntityUser;
  hashtag: null;
};

export type EntityUser = {
  username: string;
};

export type EdgeFelixVideoTimelineClass = {
  count: number;
  page_info: PageInfo;
  edges: EdgeFelixVideoTimelineEdge[];
};

export type EdgeFelixVideoTimelineEdge = {
  node: PurpleNode;
};

export type PurpleNode = {
  __typename: Typename;
  id: string;
  shortcode: string;
  dimensions: Dimensions;
  display_url: string;
  edge_media_to_tagged_user: EdgeMediaToTaggedUser;
  fact_check_overall_rating: null;
  fact_check_information: null;
  gating_info: null;
  sharing_friction_info: SharingFrictionInfo;
  media_overlay_info: null;
  media_preview: null | string;
  owner: Owner;
  is_video: boolean;
  has_upcoming_event: boolean;
  accessibility_caption: null | string;
  dash_info?: DashInfo;
  has_audio?: boolean;
  tracking_token?: string;
  video_url?: string;
  video_view_count?: number;
  edge_media_to_caption: EdgeMediaTo;
  edge_media_to_comment: EdgeFollowClass;
  comments_disabled: boolean;
  taken_at_timestamp: number;
  edge_liked_by: EdgeFollowClass;
  edge_media_preview_like: EdgeFollowClass;
  location: Location | null;
  nft_asset_info: null;
  thumbnail_src: string;
  thumbnail_resources: ThumbnailResource[];
  felix_profile_grid_crop?: null;
  coauthor_producers: CoauthorProducer[];
  pinned_for_users: CoauthorProducer[];
  viewer_can_reshare: boolean;
  encoding_status?: null;
  is_published?: boolean;
  product_type?: ProductType;
  title?: string;
  video_duration?: number;
  clips_music_attribution_info?: ClipsMusicAttributionInfo;
  edge_sidecar_to_children?: EdgeSidecarToChildren;
};

export enum Typename {
  GraphSidecar = 'GraphSidecar',
  GraphVideo = 'GraphVideo',
}

export type ClipsMusicAttributionInfo = {
  artist_name: Name;
  song_name: SongName;
  uses_original_audio: boolean;
  should_mute_audio: boolean;
  should_mute_audio_reason: string;
  audio_id: string;
};

export enum Name {
  Mrnigelng = 'mrnigelng',
  The9Gag = '9gag',
}

export enum SongName {
  OriginalAudio = 'Original audio',
}

export type CoauthorProducer = {
  id: string;
  is_verified: boolean;
  profile_pic_url: string;
  username: Name;
};

export type DashInfo = {
  is_dash_eligible: boolean;
  video_dash_manifest: string;
  number_of_qualities: number;
};

export type Dimensions = {
  height: number;
  width: number;
};

export type EdgeFollowClass = {
  count: number;
};

export type EdgeMediaTo = {
  edges: EdgeMediaToCaptionEdge[];
};

export type EdgeMediaToCaptionEdge = {
  node: FluffyNode;
};

export type FluffyNode = {
  text: string;
};

export type EdgeMediaToTaggedUser = {
  edges: PurpleEdge[];
};

export type PurpleEdge = {
  node: TentacledNode;
};

export type TentacledNode = {
  user: NodeUser;
  x: number;
  y: number;
};

export type NodeUser = {
  full_name: string;
  followed_by_viewer: boolean;
  id: string;
  is_verified: boolean;
  profile_pic_url: string;
  username: string;
};

export type EdgeSidecarToChildren = {
  edges: EdgeSidecarToChildrenEdge[];
};

export type EdgeSidecarToChildrenEdge = {
  node: StickyNode;
};

export type StickyNode = {
  __typename: string;
  id: string;
  shortcode: string;
  dimensions: Dimensions;
  display_url: string;
  edge_media_to_tagged_user: EdgeMediaTo;
  fact_check_overall_rating: null;
  fact_check_information: null;
  gating_info: null;
  sharing_friction_info: SharingFrictionInfo;
  media_overlay_info: null;
  media_preview: string;
  owner: Owner;
  is_video: boolean;
  has_upcoming_event: boolean;
  accessibility_caption: string;
};

export type Owner = {
  id: string;
  username: Name;
};

export type SharingFrictionInfo = {
  should_have_sharing_friction: boolean;
  bloks_app_url: null;
};

export type Location = {
  id: string;
  has_public_page: boolean;
  name: string;
  slug: string;
};

export enum ProductType {
  Clips = 'clips',
  Igtv = 'igtv',
}

export type ThumbnailResource = {
  src: string;
  config_width: number;
  config_height: number;
};

export type PageInfo = {
  has_next_page: boolean;
  end_cursor: null | string;
};

export type EdgeMutualFollowedBy = {
  count: number;
  edges: any[];
};
