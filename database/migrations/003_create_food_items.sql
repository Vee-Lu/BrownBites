CREATE TABLE food_items (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    serving_size TEXT,
    calories NUMERIC(8, 2) NOT NULL,
    protein_g NUMERIC(8, 2) NOT NULL,
    carbs_g NUMERIC(8, 2) NOT NULL,
    fat_g NUMERIC(8, 2) NOT NULL
);
