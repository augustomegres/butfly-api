export class ProductVariant {
  uid: string;
  type: string;
  images: string[];
  properties: { [key: string]: string }[];
  price: number;

  constructor({
    uid,
    type,
    images,
    properties,
    price,
  }: {
    uid: string;
    type: string;
    images: string[];
    properties: { [key: string]: string }[];
    price: number;
  }) {
    this.uid = uid;
    this.type = type;
    this.images = images;
    this.properties = properties;
    this.price = price;
  }
}
