import { Pipe, PipeTransform } from '@angular/core';
import { ProductInformation } from '../interfaces/product.interface';
import { getPreferredInfo } from '../helpers/preferred-info.helper';

@Pipe({
  name: 'preferredInfo',
  pure: true,
  standalone: true
})
export class PreferredInfoPipe implements PipeTransform {

  transform(infos: ProductInformation[] | null | undefined, lang = 'en') {
    return getPreferredInfo(infos ?? [], lang);
  }

}