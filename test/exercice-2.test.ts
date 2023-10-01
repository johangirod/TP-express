import { JSDOM } from "jsdom";
import { beforeAll, describe, expect, it } from "vitest";
import { getAllMenus, getRestaurant } from "../src/models";

const restaurant = getRestaurant();
const menus = getAllMenus();

const SERVER_HOST = "http://localhost:3000";

describe("Exercice 1 - Home", () => {
  it("should use data from restaurant model for the landing page", async () => {
    const res = await fetch(`${SERVER_HOST}/`);
    expect(res.status).toBe(200);
    const dom = new JSDOM(await res.text());

    expect(
      dom.window.document
        .querySelector("[data-test-restaurant-title]")
        ?.textContent?.trim(),
    ).toBe(restaurant.name);

    expect(
      dom.window.document
        .querySelector("[data-test-restaurant-description]")
        ?.textContent?.trim(),
    ).toBe(restaurant.description);
  });

  it("should have the accueil in the title", async () => {
    const res = await fetch(`${SERVER_HOST}/`);
    expect(res.status).toBe(200);
    const dom = new JSDOM(await res.text());
    expect(dom.window.document.title).toBe(`${restaurant.name}`);
  });
});

describe("Exercice 1 - Menus", () => {
  let dom = new JSDOM();
  beforeAll(async () => {
    const res = await fetch(`${SERVER_HOST}/menus`);
    expect(res.status).toBe(200);
    dom = new JSDOM(await res.text());
  });

  it("have for title « Menus - <restaurant name> »", async () => {
    expect(dom.window.document.title).toBe(`Menus - ${restaurant.name}`);
  });

  it("should list the menus", async () => {
    const displayedMenus =
      dom.window.document.querySelectorAll("[data-test-menu]");
    expect(displayedMenus.length).toBe(menus.length);
    expect(
      displayedMenus.item(0).querySelector("h2")?.textContent?.trim(),
    ).toBe(menus[0].name);
  });

  it("should have a button to start a command", async () => {
    const displayedMenus =
      dom.window.document.querySelectorAll("[data-test-menu]");
    expect(displayedMenus.item(0).querySelector("a")?.href).toBe(
      `/commander?menu=${menus[0].id}`,
    );
  });

  it("should have the name of the menu on the command page", async () => {
    const res = await fetch(`${SERVER_HOST}/commander?menu=${menus[0].id}`);
    expect(res.status).toBe(200);
    const dom = new JSDOM(await res.text());
    expect(dom.window.document.title).toBe(`Commander - ${restaurant.name}`);
    const title = dom.window.document.querySelector("h1")?.textContent;
    expect(title).toContain("Votre commande : menu");
    expect(title).toContain(menus[0].name);
  });

  it("should return a 404 if the menu does not exist", async () => {
    const res = await fetch(`${SERVER_HOST}/commander?menu=does-not-exist`);
    expect(res.status).toBe(404);
  });
});
