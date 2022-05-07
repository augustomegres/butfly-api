export class ProductVariant {
  uid: string;
  images: string[];
  properties: { [key: string]: string }[];
  price: number;
  quantity: number;

  constructor({
    uid,
    images,
    properties,
    price,
    quantity,
  }: {
    uid: string;
    images: string[];
    properties: { [key: string]: string }[];
    price: number;
    quantity: number;
  }) {
    this.uid = uid;
    this.images = images;
    this.properties = properties;
    this.price = price;
    this.quantity = quantity;
  }
}
