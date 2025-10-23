export interface ProductInformation {
  description?: string;
  language?: string;
  name?: string;
  url?: string;
  webshopUrl?: string;
}

export interface Company {
  businessName: string;
}

export interface PostalAddress {
  location: string;
  postalCode: string;
  streetName: string;
  city: string;
}

export interface ProductAvailableMonth {
  month: string;
}

export interface ProductImage {
  copyright: string;
  filename: string;
  altText: string;
  largeUrl: string;
  originalUrl: string;
  thumbnailUrl: string;
  coverPhoto: boolean;
  orientation: string;
  originalWidth: number;
  originalHeight: number;
}

export interface ProductPricing {
  toPrice: number;
  fromPrice: number;
  pricingUnit: string;
  pricingType: string;
}

export interface ProductTag {
  tag: string;
}

export interface ProductTargetGroup {
  targetGroupId: string;
}

export interface ProductVideo {
  title: string;
  url: string;
}

export interface ContactDetail {
  email: string;
  phone: string;
}

export interface ProductAvailability {
  endDate: string;
  startDate: string;
}

export interface ProductCapacity {
  max: number;
  min: number;
}

export interface CertificateDetails {
  description: string;
  name: string;
  logoUrl: string;
  websiteUrl: string;
}

export interface ProductCertificate {
  certificateDetails: CertificateDetails;
  certificate: string;
}

export interface ProductAvailabilityLanguage {
  language: string;
}

export interface SocialMediaLink {
  linkType: string;
  verifiedLink: {
    url: string;
  };
}

export interface SocialMedia {
  socialMediaLinks: SocialMediaLink[];
}

export interface Product {
  id: string;
  type: string;
  duration: number;
  durationType: string;
  company: Company;
  postalAddresses: PostalAddress[];
  productAvailableMonths: ProductAvailableMonth[];
  productInformations: ProductInformation[];
  productImages: ProductImage[];
  productPricings: ProductPricing[];
  productTags: ProductTag[];
  productTargetGroups: ProductTargetGroup[];
  productVideos: ProductVideo[];
  accessible: boolean;
  contactDetails: ContactDetail[];
  productAvailabilities: ProductAvailability[];
  productCapacities: ProductCapacity[];
  productCertificates: ProductCertificate[];
  updatedAt: string;
  productAvailabilityLanguages: ProductAvailabilityLanguage[];
  socialMedia: SocialMedia;
}

export interface GetProductsResponse {
  data: {
    product: Product[];
  };
}