export interface RequestStores {
  data: StoresData;
}

export interface StoresData {
  storeAndItsMenus: StoreInfo;
  allStores: number | string | undefined | null;
  itemsPerPage: number | string | undefined | null;
}

export interface StoreInfo {
  id: string | number;
  name: string | undefined | null;
  description: string;
  geo: Geo;
  menus: Menu[];
}

export interface Geo {
  lat: string;
  long: string;
  address: string;
}

export interface Menu {
  id: number | string;
  storeId: number | string;
  name: string | undefined | null;
  description: string;
  channel: string;
  workingHours: MenuWorkingHours;
}

export interface MenuWorkingHours {
  to: string;
  from: string;
}

export interface ServiceType {
  type: React.ReactElement;
  text: string;
  id: string | number;
}

export interface DateType {
  hour: number | string;
  minutes: number | string;
}
