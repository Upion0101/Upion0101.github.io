import { Component } from '@angular/core';

interface NameCategory {
  name: string;
  isOpen: boolean;
  children: (string | NameCategory)[]; // This allows both strings and NameCategory objects in the array
}



@Component({
  selector: 'app-names-list',
  templateUrl: './name-tree.component.html',
  styleUrls: ['./name-tree.component.scss']
})
export class NameTreeComponent {
  data: NameCategory = {
    name: "Bob's Names",
    isOpen: true,
    children: [
      {
        name: "Bob",
        isOpen: false,
        children: ["Bob", "Bobby", "Bobby girl", "Bobs", "Bob-ob", "Bobsicle", "Bob Popsicle", "Bobatha", "Bob Bibby", "Bob house", "Bob Professor Kimby"]
      },
      {
        name: "Buba",
        isOpen: false,
        children: ["Buba", "Bubbas"]
      },
      {
        name: "Mom/Momma",
        isOpen: false,
        children: ["Mom", "Mom-om", "Mom Mimmy", "Mommy", "Mommy pie", "Momma", "Mommas world", "Mommas mama", "Momma cat", "Mamma girl", "Mommy pie", "Mommas bubbas", "Mommy girl", "Mommy cat", "Big momma"]
      },
      {
        name: "Baby",
        isOpen: false,
        children: ["Baby girl", "Baby world", "Baby", "Baby boy", "Baby mommy", "Baby cat", "Baby pie", "Baby, my sweet maymie maymie maymie", "Baby, my sweet lady lady lady"]
      },
      {
        name: "Maymie",
        isOpen: false,
        children: ["Maymie", "Maymie baby", "Maymie, my sweet baby baby baby"]
      },
      {
        name: "World",
        isOpen: false,
        children: ["World", "Worldy", "Worldy baby girl", "Worley baby girly", "Window world", "Big world"]
      },
      {
        name: "Sweet",
        isOpen: false,
        children: ["Sweet baby", "Sweet maymie", "Sweet girl", "Sweet boy", "Sweetie", "Sweetie weetie", "Sweet heart baby fart", "Sweet heart", "Sweet pie", "Sweet world", "Sweetness", "Sweetness girl", "Sweetness girl in a baby world"]
      },
      {
        name: "Girly/Cutie",
        isOpen: false,
        children: ["Cutie pie", "Girly pie", "Girly cat", "Pretty", "Pretty baby", "Pretty lady", "Pretty Mimmy"]
      },
      {
        name: "Mim/Bib",
        isOpen: false,
        children: ["Mim", "Mimmy", "Bibby", "Bib"]
      },
      {
        name: "Yum-Themed",
        isOpen: false,
        children: ["Yummy", "Yummy Mommy", "Yum yums", "Yum yum girl", "Yum yum", "Yum yum cat", "Yum yum mommy num num(s)", "Yum yum baby num num(s)", "Num nums"]
      },
      {
        name: "Miscellaneous",
        isOpen: false,
        children: ["Madness", "Boy", "Oisee mommy", "Doy doy doy mommy boy", "Fat girl", "Big girl", "Shamamma", "Chamamma", "Ptza ptza ptza ptza *ptza", "Ruey baby rue", "Waybie", "Lady", "Waymie baby", "Mommy Origami", "Quantic Bobby Girl"]
      }
    ]
  };

  toggleCategory(item: any): void {
    if (this.isNameCategory(item)) {
      item.isOpen = !item.isOpen;
    }
  }
  isNameCategory(item: any): item is NameCategory {
    return typeof item === 'object' && 'name' in item;
  }

}
