import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

async function main() {
    console.log('--- Iniciando el Seed ---');

    await prisma.topping.deleteMany();
    await prisma.package.deleteMany();
    console.log('Tablas limpiadas.');

    // 2. Insertar Toppings iniciales
    const resultToppings = await prisma.topping.createMany({
        data: [
            { nombre: 'Ruffles', iconURL: '/toppings/ruffles_icon.png', stock: true },
            { nombre: 'Tostitos Flaming Hot', iconURL: '/toppings/tostitos_flaming_hot_icon.png', stock: true },
            { nombre: 'Tostitos Salsa Verde', iconURL: '/toppings/tostitos_icon.png', stock: true },
            { nombre: 'Takis Fuego', iconURL: '/toppings/takis_icon.png', stock: true },
            { nombre: 'Doritos Nachos', iconURL: '/toppings/doritos_icon.png', stock: true },
            { nombre: 'Chips Jalapeño', iconURL: '/toppings/chips_jalapeño_icon.png', stock: true },
            { nombre: 'Cheetos Torciditos', iconURL: '/toppings/cheetos_torciditos_icon.png', stock: true },
            { nombre: 'Cheetos Flaming Hot', iconURL: '/toppings/cheetos_flaming_hot_icon.png', stock: true },
            { nombre: 'Baston de Chile', iconURL: '/toppings/baston_chile_icon.png', stock: true },
            { nombre: 'Cacahuates Japoneses', iconURL: '/toppings/cacahuates_japoneses_icon.png', stock: true },
            { nombre: 'Cacahuates Enchilados', iconURL: '/toppings/cacahuates_enchilados_icon.png', stock: true },
            { nombre: 'Gomitas Aritos', iconURL: '/toppings/gomitas_aritos_icon.png', stock: true },
            { nombre: 'Gomitas Gusanitos', iconURL: '/toppings/gomitas_gusanito_icon.png', stock: true },
            { nombre: 'Gomitas Tiburones', iconURL: '/toppings/gomitas_tiburon_icon.png', stock: true },
            { nombre: 'Jicama', iconURL: '/toppings/jicama_icon.png', stock: true },
            { nombre: 'Pepino', iconURL: '/toppings/pepino_icon.png', stock: true },
            { nombre: 'Pica Fresas', iconURL: '/toppings/picafresas_icon.png', stock: true },
            { nombre: 'Piña', iconURL: '/toppings/pinia_icon.png', stock: true },
            { nombre: 'Realitos', iconURL: '/toppings/realitos_icon.png', stock: true },
            { nombre: 'Sandia', iconURL: '/toppings/sandia_icon.png', stock: true },
        ],
    });
    console.log(`Se insertaron ${resultToppings.count} toppings.`);

    const resultPackages = await prisma.package.createMany({
        data: [
            { nombre: '30 vasitos', descripcion: 'Ideal para reuniones pequeñas', precio: 1050, activo: true },
            { nombre: '50 vasitos', descripcion: 'El favorito de las fiestas', precio: 1750, activo: true },
            { nombre: '100 vasitos', descripcion: 'Para eventos grandes', precio: 3500, activo: true },
        ],
    });

    console.log(`Se insertaron ${resultPackages.count} paquetes.`);

    console.log('--- Seed finalizado con éxito ---');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });