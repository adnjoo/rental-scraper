-- select prices for an apartment
SELECT p.*
FROM "Price" p
JOIN "Apartment" a ON p."apartmentId" = a.id
WHERE a.name = 'Avalon Silicon Valley';
