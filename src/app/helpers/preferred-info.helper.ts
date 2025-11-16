import { ProductInformation } from '../interfaces/product.interface';

export function getPreferredInfo(
  infos: ProductInformation[],
  lang: string = 'en'
) {
  if (!infos) return undefined;
  return infos.find(i => i.language === lang) || infos[0];
}