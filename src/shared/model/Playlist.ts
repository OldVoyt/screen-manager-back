export type PlaylistModel = {
  Playlists: Playlist[]
}

export type Playlist = {
  Id: string,
  Name: string,
  PlaylistItems: PlaylistItem[]
}

export type PlaylistItem = {
  Id: string,
  StorageItemId: string
}
