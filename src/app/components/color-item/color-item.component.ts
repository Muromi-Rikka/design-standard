import { Component, Input } from '@angular/core';
import { ColorConfigItem } from 'src/app/glob.interface';

@Component({
  selector: 'app-color-item',
  templateUrl: './color-item.component.html',
  styleUrls: ['./color-item.component.scss'],
})
export class ColorItemComponent {
  @Input()
  public color?: ColorConfigItem & { isLight: boolean };

  public handleCopy(text: string) {
    navigator.clipboard.writeText(text);
  }
}
