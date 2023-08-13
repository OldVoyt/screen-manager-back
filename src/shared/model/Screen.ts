export type ScreenModel = {
  Screens: ScreenDefinition[];
};

export type ScreenDefinition = {
  Id: string;
  Name: string;
  PlaylistId?: string;
  ConnectionId: string;
};
