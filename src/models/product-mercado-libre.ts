export interface ProductMercadoLibre {
  site_id:                   SiteID;
  country_default_time_zone: string;
  query:                     string;
  paging:                    Paging;
  results:                   Result[];
  sort:                      Sort;
  available_sorts:           Sort[];
  filters:                   Filter[];
  available_filters:         AvailableFilter[];
}

export interface AvailableFilter {
  id:     string;
  name:   string;
  type:   string;
  values: AvailableFilterValue[];
}

export interface AvailableFilterValue {
  id:      string;
  name:    string;
  results: number;
}

export interface Sort {
  id:   string;
  name: string;
}

export interface Filter {
  id:     string;
  name:   string;
  type:   string;
  values: FilterValue[];
}

export interface FilterValue {
  id:              string;
  name:            string;
  path_from_root?: Sort[];
}

export interface Paging {
  total:           number;
  primary_results: number;
  offset:          number;
  limit:           number;
}

export interface Result {
  id:                    string;
  title:                 string;
  condition:             Condition;
  thumbnail_id:          string;
  catalog_product_id:    string;
  listing_type_id:       ListingTypeID;
  permalink:             string;
  buying_mode:           BuyingMode;
  site_id:               SiteID;
  category_id:           CategoryID;
  domain_id:             DomainID;
  thumbnail:             string;
  currency_id:           CurrencyID;
  order_backend:         number;
  price:                 number;
  original_price:        number | null;
  sale_price:            null;
  sold_quantity:         number;
  available_quantity:    number;
  official_store_id:     number | null;
  official_store_name?:  string;
  use_thumbnail_id:      boolean;
  accepts_mercadopago:   boolean;
  tags:                  ResultTag[];
  shipping:              Shipping;
  stop_time:             Date;
  seller:                Seller;
  seller_address:        SellerAddress;
  address:               Address;
  attributes:            Attribute[];
  installments:          Installments;
  winner_item_id:        null;
  catalog_listing?:      boolean;
  discounts:             null;
  promotions:            null;
  inventory_id:          null | string;
  differential_pricing?: DifferentialPricing;
  variation_id?:         string;
  variation_filters?:    VariationFilter[];
  variations_data?:      { [key: string]: VariationsDatum };
}

export interface Address {
  state_id:   string;
  state_name: string;
  city_id:    string;
  city_name:  string;
}

export interface Attribute {
  id:                   ID;
  name:                 Name;
  value_id:             null | string;
  value_name:           string;
  attribute_group_id:   AttributeGroupID;
  attribute_group_name: AttributeGroupName;
  value_struct:         Struct | null;
  values:               AttributeValue[];
  source:               number;
  value_type:           ValueType;
}

export enum AttributeGroupID {
  Others = "OTHERS",
}

export enum AttributeGroupName {
  Otros = "Otros",
}

export enum ID {
  Brand = "BRAND",
  DetailedModel = "DETAILED_MODEL",
  GPUModel = "GPU_MODEL",
  ItemCondition = "ITEM_CONDITION",
  Line = "LINE",
  Model = "MODEL",
  PackageLength = "PACKAGE_LENGTH",
  PackageWeight = "PACKAGE_WEIGHT",
  ProcessorModel = "PROCESSOR_MODEL",
  Weight = "WEIGHT",
}

export enum Name {
  CondiciónDelÍtem = "Condición del ítem",
  LargoDelPaquete = "Largo del paquete",
  Línea = "Línea",
  Marca = "Marca",
  Modelo = "Modelo",
  ModeloDeGPU = "Modelo de GPU",
  ModeloDelProcesador = "Modelo del procesador",
  ModeloDetallado = "Modelo detallado",
  Peso = "Peso",
  PesoDelPaquete = "Peso del paquete",
}

export interface Struct {
  number: number;
  unit:   Unit;
}

export enum Unit {
  CM = "cm",
  G = "g",
}

export enum ValueType {
  List = "list",
  NumberUnit = "number_unit",
  String = "string",
}

export interface AttributeValue {
  id:     null | string;
  name:   string;
  struct: Struct | null;
  source: number;
}

export enum BuyingMode {
  BuyItNow = "buy_it_now",
}

export enum CategoryID {
  Mlm1055 = "MLM1055",
}

export enum Condition {
  New = "new",
}

export enum CurrencyID {
  Mxn = "MXN",
}

export interface DifferentialPricing {
  id: number;
}

export enum DomainID {
  MlmCellphones = "MLM-CELLPHONES",
}

export interface Installments {
  quantity:    number;
  amount:      number;
  rate:        number;
  currency_id: CurrencyID;
}

export enum ListingTypeID {
  GoldPro = "gold_pro",
  GoldSpecial = "gold_special",
}

export interface Seller {
  id:                 number;
  nickname:           string;
  car_dealer:         boolean;
  real_estate_agency: boolean;
  _:                  boolean;
  registration_date:  Date;
  tags:               SellerTag[];
  car_dealer_logo:    string;
  permalink:          string;
  seller_reputation:  SellerReputation;
  eshop?:             Eshop;
}

export interface Eshop {
  eshop_id:         number;
  seller:           number;
  nick_name:        string;
  eshop_status_id:  number;
  site_id:          SiteID;
  eshop_experience: number;
  eshop_rubro:      null;
  eshop_locations:  any[];
  eshop_logo_url:   string;
}

export enum SiteID {
  Mlm = "MLM",
}

export interface SellerReputation {
  level_id:            LevelID | null;
  power_seller_status: PowerSellerStatus | null;
  transactions:        Transactions;
  metrics:             Metrics;
}

export enum LevelID {
  The3_Yellow = "3_yellow",
  The5_Green = "5_green",
}

export interface Metrics {
  sales:                 Sales;
  claims:                Cancellations;
  delayed_handling_time: Cancellations;
  cancellations:         Cancellations;
}

export interface Cancellations {
  period: CancellationsPeriod;
  rate:   number;
  value:  number;
}

export enum CancellationsPeriod {
  The365Days = "365 days",
  The60Days = "60 days",
}

export interface Sales {
  period:    CancellationsPeriod;
  completed: number;
}

export enum PowerSellerStatus {
  Gold = "gold",
  Platinum = "platinum",
  Silver = "silver",
}

export interface Transactions {
  canceled:  number;
  completed: number;
  period:    TransactionsPeriod;
  ratings:   Ratings;
  total:     number;
}

export enum TransactionsPeriod {
  Historic = "historic",
}

export interface Ratings {
  negative: number;
  neutral:  number;
  positive: number;
}

export enum SellerTag {
  Brand = "brand",
  CreditsProfile = "credits_profile",
  Developer = "developer",
  Eshop = "eshop",
  LargeSeller = "large_seller",
  MessagesAsSeller = "messages_as_seller",
  Mshops = "mshops",
  Normal = "normal",
}

export interface SellerAddress {
  comment:      string;
  address_line: string;
  zip_code:     string;
  id:           null;
  latitude:     null;
  longitude:    null;
  country:      Sort;
  state:        Sort;
  city:         Sort;
}

export interface Shipping {
  logistic_type: LogisticType;
  mode:          Mode;
  store_pick_up: boolean;
  free_shipping: boolean;
  tags:          ShippingTag[];
  promise:       null;
}

export enum LogisticType {
  CrossDocking = "cross_docking",
  DropOff = "drop_off",
  Fulfillment = "fulfillment",
  XdDropOff = "xd_drop_off",
}

export enum Mode {
  Me2 = "me2",
}

export enum ShippingTag {
  FbmInProcess = "fbm_in_process",
  Fulfillment = "fulfillment",
  MandatoryFreeShipping = "mandatory_free_shipping",
  SelfServiceIn = "self_service_in",
  SelfServiceOut = "self_service_out",
}

export enum ResultTag {
  CartEligible = "cart_eligible",
  ExtendedWarrantyEligible = "extended_warranty_eligible",
  GoodQualityPicture = "good_quality_picture",
  GoodQualityThumbnail = "good_quality_thumbnail",
  ImmediatePayment = "immediate_payment",
  LoyaltyDiscountEligible = "loyalty_discount_eligible",
  ModerationPenalty = "moderation_penalty",
  Mshops3XCampaign = "mshops_3x_campaign",
  ShippingGuaranteed = "shipping_guaranteed",
  StandardPriceByChannel = "standard_price_by_channel",
}

export enum VariationFilter {
  Color = "COLOR",
}

export interface VariationsDatum {
  thumbnail:     string;
  ratio:         string;
  name:          string;
  pictures_qty:  number;
  inventory_id?: string;
}
