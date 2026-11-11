CREATE TABLE menu_items(
    menu_id INTEGER REFERENCES menus(id) NOT NULL,
    food_item_id INTEGER REFERENCES food_items(id) NOT NULL,
    PRIMARY KEY (menu_id, food_item_id)
);