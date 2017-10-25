// import {Bonus} from './Bonus'
module JuegoCostanera {
    export class UnaVida extends Bonus {
        emitterUnaVida: Phaser.Particles.Arcade.Emitter
        unaVida: Phaser.Sprite
        
        constructor(game: Phaser.Game, x: number, y: number,frame: string) {
            super(game, x, y, frame);

            var unaVida = game.add.sprite(x, y, frame)
            this.setUnaVida(unaVida);
            this.getUnaVida().name = frame;
            game.physics.enable(this.getUnaVida(), Phaser.Physics.ARCADE);
            //  This adjusts the collision body size.
            this.getUnaVida().body.setSize(10, 10, 0, 0);
                            
            var emitter = game.add.emitter(game.world.centerX,game.world.top, 5);
            this.setEmitterUnaVida(emitter);
            this.getEmitterUnaVida().width = game.world.width;
            this.getEmitterUnaVida().makeParticles(frame,null,1,true);
            this.getEmitterUnaVida().setYSpeed(100, 500);
            this.getEmitterUnaVida().setXSpeed(-5, 5);
            this.getEmitterUnaVida().start(false, 15000, 1, 0);
            //Para agregar el objeto al juego
            
            //game.add.existing(this);

        }

        setEmitterUnaVida(value: Phaser.Particles.Arcade.Emitter){
            this.emitterUnaVida = value;
        }

        getEmitterUnaVida(){
            return this.emitterUnaVida;
        }

        setUnaVida(value: Phaser.Sprite){
            this.unaVida = value;
        }

        getUnaVida(){
            return this.unaVida;
        }
    }
}

