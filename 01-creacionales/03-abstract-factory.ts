import { COLORS } from '../helpers/colors.ts';
/**
 * ! Abstract Factory:
 * Es un patrón de diseño que permite crear familias de objetos relacionados
 * sin especificar sus clases concretas.
 *
 * En lugar de crear objetos individuales directamente,
 * creamos fábricas que producen un conjunto de objetos relacionados.
 *
 * * Es útil cuando necesitas crear objetos que son parte de una familia
 * * y quieres asegurarte de que estos objetos se complementen entre sí.
 *
 * https://refactoring.guru/es/design-patterns/abstract-factory
 */

/**
 *  El propósito del Abstract Factory es crear familias de objetos relacionados
 *  (en este caso, hamburguesas y bebidas) sin especificar las clases concretas
 *  de cada uno de esos objetos en el código principal.
 */

interface Burger {
    prepare(): void;
}

interface Drink {
    pour(): void;
}

class ChickenBurger implements Burger {
    prepare(): void {
        console.log('Preparing Chicken %cBurger', COLORS.yellow);
    }
}

class BeefBurger implements Burger {
    prepare(): void {
        console.log('Preparing Beef %cBurger', COLORS.red);
    }
}

class Water implements Drink {
    pour(): void {
        console.log('Pouring %cWater', COLORS.blue);
    }
}

class Coke implements Drink {
    pour(): void {
        console.log('Pouring %cCoke', COLORS.brown);
    }
}

interface RestaurantFactory {
    createBurger(): Burger;
    createDrink(): Drink;
}

class FastFoodRestaurant implements RestaurantFactory {
    createBurger(): Burger {
        return new BeefBurger();
    }

    createDrink(): Drink {
        return new Coke();
    }
}

class HealthyFoodRestaurant implements RestaurantFactory {
    createBurger(): Burger {
        return new ChickenBurger();
    }

    createDrink(): Drink {
        return new Water();
    }
}

function main( factory: RestaurantFactory ) {
    const burger = factory.createBurger();
    const drink = factory.createDrink();

    burger.prepare();
    drink.pour();
}

console.log('\nc%Order from regular menu:', COLORS.green);
main(new FastFoodRestaurant());

console.log('\n%cOrder from healthy menu:', COLORS.green);
main(new HealthyFoodRestaurant());