import express from "express";
import { engine } from "express-handlebars";
import path from "path";
import { getAllMenus, getMenuById, getRestaurant } from "./models";

const app = express();

app.engine("handlebars", engine());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.use("/assets", express.static(path.join(__dirname, "..", "assets")));

app.use((req, res, next) => {
  next();
  if (res.statusCode === 404) {
    res.render("erreur", { code: 404, message: "Page non trouvée" });
  }
  if (res.statusCode === 500) {
    res.render("erreur", { code: 500, message: "Erreur serveur" });
  }
});

app.get("/ping", (req, res) => res.sendStatus(200));
app.get("/", (req, res) => {
  const restaurant = getRestaurant();
  res.render("home", {
    title: restaurant.name,
    name: restaurant.name,
    description: restaurant.description,
  });
});

app.get("/menus", (req, res) => {
  const restaurant = getRestaurant();
  const menus = getAllMenus();
  res.render("menus", {
    menus,
    title: `Menus - ${restaurant.name}`,
  });
});

app.get("/commander", (req, res) => {
  const menuId = req.query.menu;
  const restaurant = getRestaurant();
  const menu = getMenuById(menuId as string);
  if (!menu) return res.status(404);
  res.render("commander", {
    menu,
    title: `Commander - ${restaurant.name}`,
  });
});

app.post("/commander", (req, res) => {
  const { name, address, phone, menuId } = req.body;

  const restaurant = getRestaurant();
  const menu = getMenuById(menuId as string);
  if (!menu) return res.status(404);

  res.render("commander", {
    commandeInfo: {
      name,
      address,
      phone,
    },
    title: `Commander - ${restaurant.name}`,
    menu,
  });
});

const server = app.listen(3000, () =>
  console.log("Server started on http://localhost:3000"),
);

// Code à ne pas toucher, permet le hot reload
if (import.meta.hot) {
  import.meta.hot.on("vite:beforeFullReload", () => {
    server.close();
  });
}
