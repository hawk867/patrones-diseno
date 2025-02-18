/**
 * ! Factory Method:
 * El patrón Factory Method permite crear objetos sin especificar
 * la clase exacta del objeto que se creará.
 *
 * En lugar de eso, delegamos la creación de objetos a subclases o métodos
 * que encapsulan esta lógica.
 *
 * * Es útil cuando una clase no puede anticipar la clase
 * * de objetos que debe crear.
 *
 * https://refactoring.guru/es/design-patterns/factory-method
 *
 */

import { COLORS } from "../helpers/colors.ts";

interface Burger {
    prepare(): void;
}

class ChickenBurger implements Burger {
    prepare(): void {
        console.log('Preparing %cChicken Burger', COLORS.yellow);
    }
}

class BeefBurger implements Burger {
    prepare(): void {
        console.log('Preparing %cBeef Burger', COLORS.red);
    }
}

class BeanBurger implements Burger {
    prepare(): void {
        console.log('Preparing %cBean Burger', COLORS.green);
    }
}

// una clase abstracta sirve para definir el esqueleto de otra clase
abstract class Restaurant {

    abstract createBurger(): Burger;

    orderBurger(): void {
        const burger = this.createBurger();
        burger.prepare();
    }
}

class ChickenRestaurant extends Restaurant {
    override createBurger(): Burger {
        return new ChickenBurger();
    }
}

class BeefRestaurant extends Restaurant {
    override createBurger(): Burger {
        return new BeefBurger();
    }
}

class BeanRestaurant extends Restaurant {
    override createBurger(): Burger {
        return new BeanBurger();
    }
}

function main() {
    let restaurant: Restaurant;
    const burgerType = prompt('What burger do you want? (chicken/beef/bean)');

    switch (burgerType) {
        case 'chicken':
            restaurant = new ChickenRestaurant();
            break;
        case 'beef':
            restaurant = new BeefRestaurant();
            break;
        case 'bean':
            restaurant = new BeanRestaurant();
            break;
        default:
            throw new Error('Invalid burger type');
    }
    restaurant.orderBurger();
}

main();