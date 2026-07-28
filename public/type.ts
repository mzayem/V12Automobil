export interface StockList {
  data: DealerKitVehicle[];
  meta: ListMeta;
}

export interface Stock {
  data: DealerKitVehicle;
}

export interface DealerKitVehicle {
  id: string;
  vehicle: VehicleDetails;
  previous_keepers: number;
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
  trim: string;
  body_type: string;
  engine_size: number;
  fuel_type: string;
  transmission_type: string;
  colour: string;
  drive_train: string;
  number_of_doors: number;
  number_of_seats: number;
  mileage: number;
  year: number;
  height_mm: number;
  length_mm: number;
  width_mm: number;
  wheelbase_mm: number;
  cylinders: number;
  fuel_tank_capacity_litres: number;
  registration_date: string;
}

export interface VehiclePrices {
  cash: {
    amount: number;
    vat_amount: 0;
  };
  advertised: {
    amount: number;
    vat_status: string;
    indicator_rating: string;
  };
  monthly: {
    amount: number;
    examples: [
      {
        lender: string;
        product_type: number;
        cash_price: number;
        deposit: number;
        total_credit: number;
        first_payment: number;
        monthly_payment: number;
        final_payment: number;
        term: number;
        option_to_purchase_fee: number;
        admin_fee: number;
        total_amount_payable: number;
        fixed_rate: number;
        representative_apr: number;
        annual_mileage: number;
      },
    ];
  };
}

export interface VehicleAdvertising {
  attention_grabber: string;
  comments: string;
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
  guid: string;
  name: string;
  telephone: string;
  email: string;
}

export interface VehicleLinks {
  website: string;
  reservation: string;
  silent_salesman: string;
}

export interface VehicleMeta {
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ListMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  from: number;
  to: number;
  total: number;
}

export type LeadType = "buying" | "sales";

export type LeadPersonTitle =
  | "Mr"
  | "Mrs"
  | "Ms"
  | "Mx"
  | "Master"
  | "Miss"
  | "Dr"
  | "Prof"
  | "Dame"
  | "Sir"
  | "Lord"
  | "Lady"
  | "Rev";

export interface LeadMarketingConsent {
  sms: boolean;
  email: boolean;
  telephone: boolean;
}

export interface LeadPerson {
  title?: LeadPersonTitle;
  first_name: string;
  last_name: string;
  company_name?: string;
  email?: string;
  telephone?: string;
  marketing_consent: LeadMarketingConsent;
  updated_at: string;
}

export type VehicleServiceHistory =
  | "none"
  | "partial"
  | "full"
  | "full_main_dealer";

export type VehicleCondition = "poor" | "average" | "good" | "excellent";

export interface LeadVehicle {
  vrm: string;
  mileage: number;
  service_history?: VehicleServiceHistory;
  condition?: VehicleCondition;
  appraised_value?: number;
  outstanding_finance_amount?: number;
  outstanding_finance_provider?: string;
}

export interface LeadMessage {
  plain?: string;
  html?: string;
}

export interface LeadTracking {
  landing_page_url?: string;
  referrer?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_medium?: string;
  utm_source?: string;
  utm_term?: string;
}

export interface CreateBuyLeadPayload {
  type: LeadType;
  person: LeadPerson;
  vehicle: LeadVehicle;
  note?: string;
  message?: LeadMessage;
  tracking?: LeadTracking;
}

export interface CreateSaleLeadPayload {
  type: LeadType;
  person: LeadPerson;
  stock_listing_id: string;
  part_exchange?: LeadVehicle;
  note?: string;
  message?: LeadMessage;
  tracking?: LeadTracking;
}

export interface LeadResponse {
  data: {
    id: string;
    type: LeadType;
  };
}
