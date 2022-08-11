use bmp;


insert into brands (id, name) values 
(1, 'Nike'),
(2, 'Samsung'),
(3, 'Adidas'),
(4, 'Ombú'),
(5, 'Arcor'),
(6, 'Black+Decker'),
(7, 'Bosch'),
(8, 'Mueble Pivas'),
(9, 'Epson'),
(10, 'Xerox'),
(11, 'Apple'),
(12, 'Ledesma'),
(13, 'LG'),
(14, 'Aero'),
(15, 'VIGOMAQ'),
(16, 'Riosul'),
(17, 'Bagley'),
(18, 'Huggies'),
(19, 'Mobilarg'),
(20, 'GOOD GAME'),
(21, 'Filgo'),
(22, 'TP'),
(23, 'Todo Cuadernos');

insert into productCategories (id, name, description) values 
 (1, 'Almacen', 'Comestibles, etc.'),
 (2, 'Herramientas', 'Herrarmientas de todo tipo.'),
 (3, 'Libreria', 'Papel, lapiceras, etc.'),
 (4, 'Muebles', 'De oficina.'),
 (5, 'Tecnologia', 'De últimisima generación.'),
 (6, 'Vestimenta', 'De primera calidad.');
 
 insert into userCategories (id, type) values (1, 'admin'),
(2, 'user');

 insert into models (id, brand_id, name, description) values 
(1, 5, 'Azucar 1kg', 'descripcion de modelo'),
(2, 12, 'Azucar 1000 sobres', 'descripcion de modelo'),
(3, 8, 'QUINN COMBINADA', 'descripcion de modelo'),
(4, 9, 'EcoTank L3250 con wifi negra 220V', 'descripcion de modelo'),
(5, 14, 'Large', 'descripcion de modelo'),
(6, 6, 'G720N 820 W 220 V', 'descripcion de modelo'),
(7, 7, '220 2200w 3800rpm 355mm 1 Disco', 'descripcion de modelo'),
(8, 10, 'Phaser 3020/BI con wifi blanca y azul 220V - 240V', 'descripcion de modelo'),
(9, 11, '2020', 'descripcion de modelo'),
(10, 13, '24MK430H led 23.8" negro 100V/240V', 'descripcion de modelo'),
(11, 2, 'Slim fit', 'descripcion de modelo'),
(12, 2, 'Slim fit', 'descripcion de modelo'),
(13, 1, 'Reforzado', 'descripcion de modelo'),
(14, 12, 'Hojas Tamaño A4', 'descripcion de modelo'),
(15, 14, 'Unisex', 'descripcion de modelo'),
(16, 14, 'Unisex', 'descripcion de modelo'),
(17, 8, 'Fan ', 'descripcion de modelo'),
(18, 11, 'MQD32LL ', 'descripcion de modelo'),
(19, 15, 'VIG08 ', 'descripcion de modelo'),
(20, 16, 'CB.10RS', 'descripcion de modelo'),
(21, 17, '250gr', 'descripcion de modelo'),
(22, 18, 'Triple Protección', 'descripcion de modelo'),
(23, 19, 'sillas SAPT', 'descripcion de modelo'),
(24, 20, 'Gamer', 'descripcion de modelo'),
(25, 21, 'X12 Colores Largos', 'descripcion de modelo'),
(26, 22, 'Cinta de papel', 'descripcion de modelo'),
(27, 22, 'Liso tamaño A5 con cierre elástico', 'descripcion de modelo');

insert into users (id, userName, firstName, lastName, email, cuit, companyName, phoneNumber, password, companyImg, userCategory_id) values  
 (1, 'admin@admin.com', 'admin', 'admin', 'admin@admin.com', 828437021, 'BMP (admin)', 615252920, '$2a$10$3JRBBvulx7pqYfMP8vqE.eR7YNBEqSPk4kqDTWu9qCFZy/gki3SyO', 'default-avatar.png', 1), 
 (2, 'user@user.com', 'user', 'user', 'user@user.com', 828437021, 'BMP (user)', 615252920, '$2a$10$3JRBBvulx7pqYfMP8vqE.eR7YNBEqSPk4kqDTWu9qCFZy/gki3SyO', 'default-avatar.png', 2);

insert into products (id, productName, price, minBuy, productImages, description, models_id, category_id,vendor_id) values 
 (1, 'Azucar', 300, 10, 'azucar.jpg', 'azucar de primera calidad', 1, 1, 1),
 (2, 'Azucar Ledesma 1000 sobres', 500, 5, 'azucarEnSobre.jpg', 'azucar de primera calidad en sobre', 2, 1, 1),
 (3, 'Amoladora angular Black+Decker', 14890, 5, 'amoladora.jpg', 'amoladora naranja', 6, 2, 1),
 (4, 'Sierra Sensitiva ', 88520, 5, 'sierraSensitiva.jpg', 'Bosch Gco 220 2200w 3800rpm 355mm 1 Disco', 7, 2, 1),
 (5, 'Escritorio', 98424, 10, 'escritorioOficina.webp', 'escritorio pc Su-Office Fan melamina de 163cm x 75cm x 60cm x 140cm blanco y negro', 17, 4, 1),
 (6, 'Cajonera', 30324, 5, 'cajonera.webp', '4 Cajones / Escritorio / Oficina Con Ruedas', 3, 4, 1),
 (7, 'Impresora', 150124, 5, 'impresora.jpg','color multifunción Epson EcoTank L3210 negra 220V', 4, 5, 2),
 (8, 'Impresora', 13255, 5, 'impresoraXerox.jpg', 'Impresora simple función Xerox Phaser 3020/BI con wifi blanca y azul 220V - 240V', 8, 5, 2),
 (9, 'Apple Macbook Air', 300524, 2, 'macbook1.webp','computadora Apple primera generacion', 9, 5, 2), 
 (10, 'Monitor LG 24MK430H', 150909, 10, 'monitorLg.jpeg','led 23.8 negro 100V/240V', 10, 5, 2),
 (11, 'Delantal', 5200, 30, 'delantalCocina.jpg', 'Delantal de cocina Universal', 5, 6, 1),
 (12, 'Remera Clásica', 4000, 10, 'remeraLisa.jpg', 'Remera Clásica Manga Corta Blanca', 16, 6, 1),
 (13, 'Resma A4 Papel Autor 75grs 500 Hojas', 2500, 4, 'cajaHojasA4.jpg','Papel Autor 75grs 500 Hojas', 14, 3, 1),
 (14, 'Casaca', 66883, 5, 'uniformeCocina.jpg', 'De Cocina Unisex Edulchef Mangas Cortas', 15, 6, 1),
 (15, 'MacBook Air A1466 plata 13.3"', 310524, 2, 'macbookPlateada.webp','La notebook Apple MacBook Air A1466 es una solución tanto para trabajar y estudiar como para entretenerte. Al ser portátil, el escritorio dejará de ser tu único espacio de uso para abrirte las puertas a otros ambientes ya sea en tu casa o en la oficina.', 18, 5, 1),
 (16, 'Terraja 4 Funciones Para Gomeria', 999, 10, 'terraja.webp','HERRAMIENTA MULTIFUNCIÓN: TERRAJA - MACHO DE ROSCA Y EXTRACTOR OVULO INTERIOR VALVULA SCHRADER / PICO TIPO AUTO MATERIAL : ACERO PESO: 18 GRAMOS', 19, 2, 1),
 (17, 'Crique Hidráulico', 45500, 10, 'crique.webp','Información Técnica: Carga máxima soportada: 10 Toneladas. Altura de construcción: 200 mm Dimensión de la base de apoyo: 122x115 mm Carrera de elevación hidráulica: 125 mm Altura de husillo: 60 mm Altura total: 385 mm Peso total: 5,5 Kg', 20, 2, 1),
 (18, 'Chocolinas ', 1200, 15, 'chocolinas.webp','Son las mejores, probalas', 21, 1, 1),
 (19, 'Toallitas húmedas Huggies Triple Protección 48 u', 2500, 20, 'toallitasHumedas.webp','Es libre de alcohol: Sí Es hipoalergénica: Sí', 22, 1, 1),
 (20, 'Silla de escritorio', 50000, 10, 'sillaEscritorioo.webp','La selección de una silla adecuada es muy importante para prevenir futuras lesiones. Con esta silla Rastasabalero sillas, vas a tener la comodidad y el bienestar que necesitás a lo largo de tu jornada. Además, podés ubicarla en cualquier parte de tu casa u oficina ya que su diseño se adapta a múltiples entornos. ¡Dale a tus espacios un toque más moderno!', 23, 4, 1),
 (21, 'Silla de escritorio Good Game Pro', 124550, 3, 'sillaGAmer.webp','Jugá sin límites Diseñada para quienes pasan muchas horas frente a la computadora. El asiento y el respaldo se adaptan a tus diferentes posiciones a lo largo del juego. Disfrutá sin descuidar las zonas lumbar, dorsal y cervical.', 24, 4, 1),
 (22, 'Lapiz Lapices Filgo Color', 66883, 5, 'lapices.webp', 'Los mejores lapices del mercado, Leonardo Da Vinci aclamaba por ellos', 25, 3, 1),
 (23, 'Cinta De Papel Enmascarar P/pintor', 8050, 50, 'cinta.webp', 'Ancho: 12/18/24/36/48 mm Largo de rollo: 50 Metros Espesor: 140 Micrones Cinta de uso profesional, excelente adhesión a la mayoría de superficies. Viene en caja de 18, 24, 36, 48, 72 unidades. (Dependiendo la medida) Con un espesor de 140 micrones brinda máxima resistencia y efectividad. No daña la superficie que se adhiere.', 26, 3, 1),
 (24, 'Cuaderno Ecológico', 4999, 10, 'cuadernoVegetariano.webp', 'Cuaderno Ecológico/Reciclado Tamaño A5 liso tapa dura 1,5 mm forrado en papel kraft FSC Ecológico con 100 hojas interiores lisas en papel reciclado. Anillado doble ring wire color negro.', 27, 3, 1);
 
 
 



