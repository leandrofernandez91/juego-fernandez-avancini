/// <reference path="../tsDefinitions/phaser.d.ts" />
/// <reference path="./Personaje.ts" />
/// <reference path="./Basurero.ts" />
/// <reference path="./Hamburguesa.ts" />
/// <reference path="./Bonus.ts" />
/// <reference path="./UnaVida.ts" />

module JuegoCostanera {
	export class Costanera{
		game:Phaser.Game;
		ancho: number;
		alto:number;
		personaje: Personaje;
		basurero: Basurero;
		hamburguesa: Hamburguesa;
		unaVida:UnaVida;
		cursores:Phaser.CursorKeys;
		saltarBtn:Phaser.Key;
		textoVidas: Phaser.Text;
		textoPuntos: Phaser.Text;

//--	------------------setters y getters --------------------------------------
		setGame(game: Phaser.Game ){
			this.game = game;
		}

		getGame (){
			return this.game;
		}

		setAncho(ancho: number ){
			this.ancho = ancho;
		}

		getAncho (){
			return this.ancho;
		}

		setAlto(alto: number ){
			this.alto = alto;
		}

		getAlto (){
			return this.alto;
		}

		setPersonaje(personaje: Personaje ){
			this.personaje = personaje;
		}

		getPersonaje ():Personaje{
			return this.personaje;
		}

		setBasurero(value:Basurero){
			this.basurero = value;
		}

		getBasurero ():Basurero{
			return this.basurero;
		}
		setUnaVida(value:UnaVida){
			this.unaVida = value;
		}

		getUnaVida ():UnaVida{
			return this.unaVida;
		}

		setHamburguesa(value: Hamburguesa){
			this.hamburguesa = value;
		}

		getHamburguesa (){
			return this.hamburguesa;
		}

		setCursores(cursores: Phaser.CursorKeys ){
			this.cursores = cursores;
		}

		getCursores (){
			return this.cursores;
		}

		setSaltarBtn(saltarBtn: Phaser.Key ){
			this.saltarBtn = saltarBtn;
		}

		getSaltarBtn (){
			return this.saltarBtn;
		}

		getTextoPuntos(){
			return this.textoPuntos;
		}

		setTextoPuntos(value:Phaser.Text){
			this.textoPuntos = value;
		}

		getTextoVidas(){
			return this.textoVidas;
		}

		setTextoVidas(value:Phaser.Text){
			this.textoVidas = value;
		}

		constructor(ancho: number,alto:number)
		{
			this.setGame(new Phaser.Game( ancho, alto, Phaser.CANVAS, 'content', { 
				preload:this.preload, 
				create:this.create, 
				update: this.update,
				setGame: this.setGame,
				getGame: this.getGame,
				setAncho: this.setAncho,
				getAncho: this.getAncho,
				setAlto: this.setAlto,
				getAlto: this.getAlto,
				setPersonaje: this.setPersonaje,
				getPersonaje: this.getPersonaje,
				setBasurero: this.setBasurero,
				getBasurero: this.getBasurero,
				setUnaVida: this.setUnaVida,
				getUnaVida: this.getUnaVida,
				setHamburguesa: this.setHamburguesa,
				getHamburguesa: this.getHamburguesa,
				setCursores: this.setCursores,
				getCursores: this.getCursores,
				setSaltarBtn: this.setSaltarBtn,
				getSaltarBtn: this.getSaltarBtn,
				collisionBasurero: this.collisionBasurero,
				collisionUnaVida: this.collisionUnaVida,
				collisionHamburguesa: this.collisionHamburguesa,
				listener: this.listener,
				getTextoPuntos: this.getTextoPuntos,
				setTextoPuntos: this.setTextoPuntos,
				getTextoVidas: this.getTextoVidas,
				setTextoVidas: this.setTextoVidas
			} ));
		}

		preload()
		{ 
			// add our logo image to the assets class under the
			// key 'logo'. We're also setting the background colour
			// so it's the same as the background colour in the image
			this.getGame().load.image('basurero', 'assets/basurero.png');
			this.getGame().load.image('unavida', 'assets/unavida.png');
			this.getGame().load.image('bonus', 'assets/hamburguesa.png');
			this.getGame().load.spritesheet('player', 'sprites/dude.png', 32, 48);
			this.getGame().load.image( 'costanera', "assets/costanera.jpg" );
			this.getGame().load.image('gameover', "assets/gameover.jpg" );
		}

		create()
		{
			//Seteamos la imagen del juego en la posicion '0,0'
		    //y el ancho y alto de la misma según el tamaño de la ventana actual
			var logo = this.getGame().add.sprite( this.getGame().world.centerX, this.getGame().world.centerY, 'costanera' );
			logo.x = 0;
			logo.y = 0;
			logo.height = this.getGame().height;
			logo.width = this.getGame().width;

			this.getGame().physics.startSystem(Phaser.Physics.ARCADE);
			this.getGame().time.desiredFps = 60;
			this.getGame().physics.arcade.gravity.y = 250;

			//Personaje
			var personaje = new Personaje(this.getGame(),this.getGame().world.centerX, this.getGame().world.top, 'player');
			this.setPersonaje(personaje);
		
			//Basurero
			var basurero = new Basurero(this.getGame(),300, 50, 'basurero');
			this.setBasurero(basurero);
			this.getGame().physics.enable(this.getBasurero(), Phaser.Physics.ARCADE);

			//Vida
			var unaVida = new UnaVida(this.getGame(),300, 50, 'unavida');
			this.setUnaVida(unaVida);
			this.getGame().physics.enable(this.getUnaVida(), Phaser.Physics.ARCADE);

			//Hamburguesa
			var hamburguesa = new Hamburguesa(this.getGame(),300, 50, 'bonus');
			this.setHamburguesa(hamburguesa);
			hamburguesa.name = 'bonus';
			this.getGame().physics.enable(hamburguesa, Phaser.Physics.ARCADE);

			//Click event
			logo.inputEnabled = true;
			logo.events.onInputDown.add(this.listener, this);
			this.setCursores(this.getGame().input.keyboard.createCursorKeys());
			this.setSaltarBtn(this.getGame().input.keyboard.addKey(Phaser.Keyboard.SPACEBAR));

 			//  Puntos
			var scoreString = 'Puntos: ';
    		var scoreText = this.getGame().add.text(10, 10, scoreString + this.getPersonaje().getPuntos(), { font: '34px Arial', fill: '#fff' });
			this.setTextoPuntos(scoreText);

			//  Vidas
			var vidasString = 'Vidas: ';
 			var vidasText = this.getGame().add.text(this.getGame().world.width - 140, 10, vidasString + this.getPersonaje().getVidas(), { font: '34px Arial', fill: '#fff' });
			this.setTextoVidas(vidasText); 
		}

		update () 
		{
			this.getGame().physics.arcade.collide(this.getBasurero().getEmitterBasureros(),this.getPersonaje(),this.collisionBasurero,null, this);
			this.getGame().physics.arcade.collide(this.getHamburguesa().getEmitterHamburguesas(),this.getPersonaje(),this.collisionHamburguesa,null, this);
			this.getGame().physics.arcade.collide(this.getUnaVida().getEmitterUnaVida(),this.getPersonaje(),this.collisionUnaVida,null, this);
			this.getPersonaje().body.velocity.x = 0;
			if (this.getCursores().left.isDown)
			{
				this.getPersonaje().body.velocity.x = -500;
				if (this.getPersonaje().getOrientacion() != 'left'){
						this.getPersonaje().animations.play('left');
						this.getPersonaje().setOrientacion('left');
				}
			}
			else if (this.getCursores().right.isDown){
				this.getPersonaje().body.velocity.x = 500;
				if (this.getPersonaje().getOrientacion() != 'right'){
						this.getPersonaje().animations.play('right');
						this.getPersonaje().setOrientacion('right');
				}
			} else {
				if (this.getPersonaje().getOrientacion() != 'idle'){
						this.getPersonaje().animations.stop();
				
						if (this.getPersonaje().getOrientacion() == 'left'){
							this.getPersonaje().frame = 0;
						}
						else{
							this.getPersonaje().frame = 5;
						}
						this.getPersonaje().setOrientacion('idle')
				}
			}

			if (this.getSaltarBtn().isDown && (this.getPersonaje().body.onFloor()))
			{
				this.getPersonaje().body.velocity.y = -550;
			}
		}

		collisionHamburguesa (hamburguesa, personaje) 
		{
			hamburguesa.kill();
			personaje.kill();

			//  Reduce the lives
			this.getPersonaje().setVidas(this.getPersonaje().getVidas() - 1);
			this.getTextoVidas().text = "Vidas: " + this.getPersonaje().getVidas().toString();
			//this.getPersonaje().setPuntos(this.getPersonaje().getPuntos() + 20);
			//this.getTextoPuntos().text = "Puntos: " + this.getPersonaje().getPuntos().toString();		
		}

		collisionBasurero (basurero, personaje) 
		{
			personaje.kill();
			//  Increase the score
			this.getPersonaje().setPuntos(this.getPersonaje().getPuntos() + 1);
			this.getTextoPuntos().text = "Puntos: " + this.getPersonaje().getPuntos().toString();
			if ((this.getPersonaje().getPuntos() % 10) == 0) {
				this.getPersonaje().setVidas(this.getPersonaje().getVidas() + 1);
				this.getTextoVidas().text = "Vidas: " + this.getPersonaje().getVidas().toString();

			}
			//this.getPersonaje().setVidas(this.getPersonaje().getVidas() - 1);
			//this.getTextoVidas().text = "Vidas: " + this.getPersonaje().getVidas().toString();	
		}
		collisionUnaVida (unaVida, personaje) 
		{
			personaje.kill();
			//  Increase the score
			this.getPersonaje().setVidas(this.getPersonaje().getVidas() + 1);
			this.getTextoVidas().text = "Vidas: " + this.getPersonaje().getVidas().toString();	
		}

		listener () 
		{
			if (this.getPersonaje().getVidas() == 0){
				var logo = this.getGame().add.image( this.getGame().world.centerX, this.getGame().world.centerY, 'gameover' );
				logo.x = 0;
				logo.y = 0;
				logo.height = this.getGame().height;
				logo.width = this.getGame().width;
				this.getTextoPuntos().text = "Puntos: " + this.getPersonaje().getPuntos().toString();			
			
			}
			else {
				this.getPersonaje().revive();
				
			}

		}

	}

	// when the page has finished loading, create our game
	window.onload = () => 
	{
		var game = new Costanera(window.innerWidth,window.innerHeight);
	}

}