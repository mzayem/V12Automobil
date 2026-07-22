export interface DealerKitResponse {
  data: DealerKitVehicle[];
  meta: ListMeta;
}
export interface DealerKitVehicle {
  id: string;
  vehicle: VehicleDetails;
  prices: VehiclePrices;
  advertising: VehicleAdvertising;
  media: VehicleMedia;
  location: VehicleLocation;
  links: VehicleLinks;
  meta: VehicleMeta;
}

export interface VehicleDetails {
  registration: string;
  manufacturer: string;
  model: string;
  derivative: string;
  body_type: string;
  transmission: string;
  fuel_type: string;
  colour: string;
  doors: number;
  seats: number;
  mileage: number;
  year: number;
  engine_size: number;
  previous_keepers: number;
}

export interface VehiclePrices {
  cash: {
    amount: number;
    currency: string;
  };

  finance?: {
    monthly_payment: number;
  };
}

export interface VehicleAdvertising {
  comments: string;
  features: string[];
}

export interface VehicleMedia {
  images: VehicleImage[];
}

export interface VehicleImage {
  id: string;
  url: string;
  order: number;
}

export interface VehicleLocation {
  name: string;
  city?: string;
  postcode?: string;
}

export interface VehicleLinks {
  self: string;
  public: string;
}

export interface VehicleMeta {
  status: string;
  created_at?: string;
  updated_at?: string;
}

export interface ListMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  from: number;
  to: number;
  total: number;
}
