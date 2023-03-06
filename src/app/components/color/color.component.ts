import { Component, Input } from '@angular/core';
import * as Color from 'color';
import { ColorConfigItem } from 'src/app/glob.interface';
@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss'],
})
export class ColorComponent {
  @Input()
  public title: string = '';

  @Input()
  public list: Array<ColorConfigItem> = [];
  public get color_list() {
    return this.list.map((item) => {
      return { ...item, isLight: Color(item.color).isLight() };
    });
  }

  public handleCopy(text: string) {
    navigator.clipboard.writeText(text);
  }
}
