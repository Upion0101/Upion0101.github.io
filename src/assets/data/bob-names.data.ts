// src/assets/data/bob-names.data.ts

export interface NameCategoryData {
  name: string;
  children: (string | NameCategoryData)[];
}

export const BOB_NAMES_TREE: NameCategoryData = {
  name: "Bob's Names",
  children: [
    {
      name: "Bob",
      children: [
        "Bob",
        "Bobby",
        "Bobby girl",
        "Bobs",
        "Bob-ob",
        "Bobsicle",
        "Bob Popsicle",
        "Bobatha",
        "Bob Bibby",
        "Bob house",
        "Bob Professor Kimby"
      ]
    },
    {
      name: "Buba",
      children: ["Buba", "Bubbas"]
    },
    {
      name: "Mom/Momma",
      children: [
        "Mom",
        "Mom-om",
        "Mom Mimmy",
        "Mommy",
        "Mommy pie",
        "Momma",
        "Mommas world",
        "Mommas mama",
        "Momma cat",
        "Mamma girl",
        "Mommy pie",
        "Mommas bubbas",
        "Mommy girl",
        "Mommy cat",
        "Big momma"
      ]
    },
    {
      name: "Baby",
      children: [
        "Baby girl",
        "Baby world",
        "Baby",
        "Baby boy",
        "Baby mommy",
        "Baby cat",
        "Baby pie",
        "Baby, my sweet maymie maymie maymie",
        "Baby, my sweet lady lady lady"
      ]
    },
    {
      name: "Maymie",
      children: ["Maymie", "Maymie baby", "Maymie, my sweet baby baby baby"]
    },
    {
      name: "World",
      children: ["World", "Worldy", "Worldy baby girl", "Worley baby girly", "Window world", "Big world"]
    },
    {
      name: "Sweet",
      children: [
        "Sweet baby",
        "Sweet maymie",
        "Sweet girl",
        "Sweet boy",
        "Sweetie",
        "Sweetie weetie",
        "Sweet heart baby fart",
        "Sweet heart",
        "Sweet pie",
        "Sweet world",
        "Sweetness",
        "Sweetness girl",
        "Sweetness girl in a baby world"
      ]
    },
    {
      name: "Girly/Cutie",
      children: ["Cutie pie", "Girly pie", "Girly cat", "Pretty", "Pretty baby", "Pretty lady", "Pretty Mimmy"]
    },
    {
      name: "Mim/Bib",
      children: ["Mim", "Mimmy", "Bibby", "Bib", "Kimby", "Kiiiiiiiimby", "Kimby Cat", "Kim"]
    },
    {
      name: "Phrases",
      children: [
        "How can you say you love a Mink, when the only time you love her is when she stinks.",
        "Bobba binky momma so stinky.",
        "Boy Boy Boy Bobby Doy Doy Doy"
      ]
    },
    {
      name: "Precious-Themed",
      children: ["Memcious", "Precious", "Mommy Precious", "Premcious", "Precious Mommy Premcious", "Mommy Memcious"]
    },
    {
      name: "Yum-Themed",
      children: [
        "Yummy",
        "Yummy Mommy",
        "Yum yums",
        "Yum yum girl",
        "Yum yum",
        "Yum yum cat",
        "Yum yum mommy num num(s)",
        "Yum yum baby num num(s)",
        "Num nums"
      ]
    },
    {
      name: "Miscellaneous",
      children: [
        "Madness",
        "Boy",
        "Oisee mommy",
        "Doy doy doy mommy boy",
        "Fat girl",
        "Big girl",
        "Shamamma",
        "Chamamma",
        "Ptza ptza ptza ptza *ptza",
        "Ruey baby rue",
        "Waybie",
        "Lady",
        "Waymie baby",
        "Mommy Origami",
        "Quantic Bobby Girl",
        "Quigersby"
      ]
    }
  ]
};
