import { PipeTransform, Pipe } from '@angular/core';
import { Photo } from './photo/photo';

@Pipe({
    name: 'photoFilter'
})
export class FilterPipe implements PipeTransform {
    transform(list: Photo[], searchTerm: string): Photo[] {
        if (!list || !searchTerm)
        {
            return list;
        }

        return list.filter(photo => 
            photo.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
    }
}