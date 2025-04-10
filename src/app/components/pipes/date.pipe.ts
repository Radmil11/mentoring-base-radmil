import { DatePipe } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe ({
    name: 'DatePipe',
    standalone:true,
})
export class DateFormatPipe implements PipeTransform {
    constructor(private datePipe: DatePipe) {}

    transform(value: any, format: string = 'shortDate'): string | null {
      return this.datePipe.transform(value, format);
    }
}