/**
 * ----------------
 * Menu model
 * ----------------
 * */

type Menu = {
  id: string;
  name: string;
  price: number;
  description: string;
};

export function getMenuById(id: string): Menu | undefined {
  return menus.find((m) => m.id === id);
}

export function getAllMenus(): Array<Menu> {
  return menus;
}

/**
 * ----------------
 * Restaurant model
 * ----------------
 * */

export function getRestaurant() {
  return restaurant;
}

/**
 * ----
 * Data
 * ----
 * */

const menus = [
  {
    id: "61mixabq",
    name: "Kebab",
    price: 8,
    description: "Le Kebab classique, salade tomate oignon",
  },
  {
    id: "8s6op8k3",
    name: "Falafel",
    price: 7,
    description: "Le sandwish falafel, végétarien",
  },
  {
    id: "9t9ram2z",
    name: "Kefta",
    price: 8,
    description:
      "Le sandwish kefta avec de la viande hachée grillée et des épices",
  },
];

const restaurant = {
  name: "Fraternité Kebab's",
  description:
    "Le meilleur kebab de la ville, avec des frites maison et une sauce secrète.",
};
