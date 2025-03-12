import { COLORS } from '../helpers/colors.ts';
/**
 * ! Singleton:
 * Es un patrón de diseño creacional que garantiza que una clase
 * tenga una única instancia y proporciona un punto de acceso global a ella.
 *
 * * Es útil cuando necesitas controlar el acceso a una única instancia
 * * de una clase, como por ejemplo, en un objeto de base de datos o en un
 * * objeto de configuración.
 *
 * https://refactoring.guru/es/design-patterns/singleton
 */

class DragonBalls {

    private static instance: DragonBalls;
    private ballsCollected: number;

    private constructor() {
        this.ballsCollected = 0;
    }

    public static getInstance(): DragonBalls {
        if ( !DragonBalls.instance ) {
            DragonBalls.instance = new DragonBalls();
            console.log('%cSe han creado las esferas del dragón', COLORS.green);
        }
        return DragonBalls.instance;
    }
    collectBall(): void {
        if ( this.ballsCollected < 7) {
            this.ballsCollected++;
            console.log(`%cSe ha recolectado una esfera del dragón. Total de esferas: ${ this.ballsCollected }`, COLORS.cyan);
            return;
        }
        console.log('%cYa se han recolectado todas las esferas del dragón', COLORS.red);
    }

    summonShenLong() {
        if ( this.ballsCollected === 7 ) {
            console.log('%cSe ha invocado a Shen Long, pide tu deseo', COLORS.yellow);
            this.ballsCollected = 0;
            return;
        }
        console.log(`%cAun faltan ${ 7 - this.ballsCollected} esferas para invocar a Shen Long`, COLORS.red);
    }
}

function main() {
    const goku = DragonBalls.getInstance();

    goku.collectBall();
    goku.collectBall();
    goku.collectBall();

    goku.summonShenLong();

    const vegeta = DragonBalls.getInstance();

    vegeta.collectBall();
    vegeta.collectBall();
    vegeta.collectBall();
    vegeta.collectBall();

    goku.summonShenLong();

    vegeta.summonShenLong();
}

main();