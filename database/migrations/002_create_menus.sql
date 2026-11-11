CREATE TABLE menus (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    menu_date DATE NOT NULL,
    meal_type TEXT NOT NULL,
    dining_location_id INTEGER NOT NULL,
    FOREIGN KEY (dining_location_id) REFERENCES dining_locations(id)
);