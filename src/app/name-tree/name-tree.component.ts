import { Component } from '@angular/core';
import { BOB_NAMES_TREE, NameCategoryData } from 'src/assets/data/bob-names.data';

interface NameCategory {
  name: string;
  isOpen: boolean;
  children: (string | NameCategory)[];
}

@Component({
  selector: 'app-names-list',
  templateUrl: './name-tree.component.html',
  styleUrls: ['./name-tree.component.scss'],
})
export class NameTreeComponent {
  // Root open by default, children closed
  data: NameCategory = this.withOpenState(BOB_NAMES_TREE, true);

  toggleCategory(item: string | NameCategory): void {
    if (this.isNameCategory(item)) item.isOpen = !item.isOpen;
  }

  isNameCategory(item: any): item is NameCategory {
    return typeof item === 'object' && item !== null && 'name' in item && 'children' in item;
  }

  private withOpenState(node: NameCategoryData, openByDefault = false): NameCategory {
    return {
      name: node.name,
      isOpen: openByDefault,
      children: node.children.map(child => {
        if (typeof child === 'string') return child;
        return this.withOpenState(child, false);
      }),
    };
  }
}
