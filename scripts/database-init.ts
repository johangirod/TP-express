import mysql from "mysql2/promise";
async function main() {
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DB,
    password: process.env.MYSQL_PASSWORD,
  });

  await connection.execute(`
    CREATE TABLE IF NOT EXISTS menus (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        price INT NOT NULL,
        PRIMARY KEY (id)
    );
`);
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS orders (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        phone VARCHAR(255) NOT NULL,
        menu_id INT NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (menu_id) REFERENCES menus(id)
    );
  `);

  // Delete all orders and menus
  await connection.execute(`
    TRUNCATE TABLE orders;
  `);
  await connection.execute(`
    SET FOREIGN_KEY_CHECKS = 0; 
  `);
  await connection.execute(`
    TRUNCATE TABLE menus;
  `);
  await connection.execute(`
    SET FOREIGN_KEY_CHECKS = 1; 
  `);

  // Insert 8 new kebab menus, with random prices and varied names and descriptions
  await connection.execute(`
    INSERT INTO menus (name, description, price)
    VALUES
      ("Kebab", "Le Kebab classique, salade tomate oignon", 8),
      ("Falafel", "Le sandwish falafel, végétarien", 7),
      ("Kefta", "Le sandwish kefta avec de la viande hachée grillée et des épices", 9),
      ("Poulet", "Brochettes de poulet marinées avec une sauce secrète", 8),
      ("Tacos", "Le célèbre tacos de Grenoble", 8),
      ("Cheeseburger", "Steak, pain et cheddar, le classique toujours efficace", 8),
      ("Kebab Maxi", "Le Kebab version XXL, pour les personnes qui ont crocs", 10);
  `);
  await connection.end();
}

main().then(() => console.log("Database initialized"));
