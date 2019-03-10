
grayscale = false;
flashActivateTimer = 0;
flashStayTimer = 0;
gameLength = -1000;
magnetCollected = 0;
magnetTimer = 0;

function  setReset(when) {
  if(when == 0){
    //Vertex Shader Program

  vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec4 aVertexColor;
    attribute vec2 aTextureCoord;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    varying lowp vec4 vColor;
    varying highp vec2 vTextureCoord;

    void main(void) {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vColor = aVertexColor;
      vTextureCoord = aTextureCoord;
    }
  `;

  // Fragment shader program

  fsSource = `
    precision mediump float;
    varying lowp vec4 vColor;
    varying highp vec2 vTextureCoord;

    uniform sampler2D uTexture;

    void main(void) {
      vec4 color = texture2D(uTexture, vTextureCoord)*vColor;
      gl_FragColor = color;
    }
  `;
    canvas = document.querySelector('#glcanvas');
    gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  }
  shaderProgram = initShaderProgram(gl, vsSource, fsSource);
  // Collect all the info needed to use the shader program.
  // Look up which attributes our shader program is using
  // for aVertexPosition, aVevrtexColor and also
  // look up uniform locations.
  programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
      textureCoord: gl.getAttribLocation(shaderProgram, "aTextureCoord"),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
      uTexture: gl.getUniformLocation(shaderProgram, "uTexture"),
    },
  };
}

function chamko(on) {
  grayscale = false
  if(on){
    fsSource = `
        precision mediump float;
        varying lowp vec4 vColor;
        varying highp vec2 vTextureCoord;
    
        uniform sampler2D uTexture;
    
        void main(void) {
          vec4 color = texture2D(uTexture, vTextureCoord)*vColor;
          gl_FragColor = vec4(2.0 * color.r, 2.0 * color.g, 2.0 * color.b, color.a);
        }
      `;
  }
  else {
    fsSource = `
    precision mediump float;
    varying lowp vec4 vColor;
    varying highp vec2 vTextureCoord;

    uniform sampler2D uTexture;

    void main(void) {
      vec4 color = texture2D(uTexture, vTextureCoord)*vColor;
      gl_FragColor = color;
    }
  `;
  }
    setReset(1);
}

function keyDownHandler(event) {
  if(event.keyCode == 39) {
    right = true;
  }
  else if(event.keyCode == 37) {
    left = true;
  }
  else if(event.keyCode == 32) {
    up = true;
  }
  else if(event.keyCode == 40) {
    down = true;
  }
  else if(event.keyCode == 86) {
    flash = false;
    grayscale = !grayscale;
    if(grayscale) {
      fsSource = `
        precision mediump float;
        varying lowp vec4 vColor;
        varying highp vec2 vTextureCoord;

        uniform sampler2D uTexture;

        void main(void) {
          vec4 color = texture2D(uTexture, vTextureCoord)*vColor;
          float grayColor = 0.299 * color.r + 0.587 * color.g + 0.114 * color.b;
          gl_FragColor = vec4(vec3(grayColor), color.a);
        }
      `;
    }
    else {
      fsSource = `
        precision mediump float;
        varying lowp vec4 vColor;
        varying highp vec2 vTextureCoord;

        uniform sampler2D uTexture;

        void main(void) {
          vec4 color = texture2D(uTexture, vTextureCoord)*vColor;
          gl_FragColor = color;
        }
      `;
    }
    setReset(1);
  }
}

function keyUpHandler(event) {
  if(event.keyCode == 39) {
    right = false;
  }
  else if(event.keyCode == 37) {
    left = false;
  }
  else if(event.keyCode == 32) {
    up = false;
  }
  else if(event.keyCode == 40) {
    down = false;
  }
}

main();

//
// Start here
//
function main() {

  setReset(0);

  //event listeners
  document.addEventListener('keydown', keyDownHandler, false);
  document.addEventListener('keyup', keyUpHandler, false);


  //event recorders
  right = false
  left = false
  up = false
  down = false

  // If we don't have a GL context, give up now

  if (!gl) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.');
    return;
  }

  tracks = new tracks(gl, [0, 0, 0]);
  ground = new ground(gl, [0, 0, 0]);
  sky = new sky(gl, [0, 0, 0]);
  walls = new walls(gl, [0, 0, 0]);
  player = new player(gl, [tracks.track1, 0.3, 0], tracks.track2, tracks.track1);
  policeman = new policeman(gl, [tracks.track1, 0.3, 4.5], tracks.track2, tracks.track1);
  flag = new victoryFlag(gl, [0, 0.5, gameLength]);
  coinArray = [];
  noCoins = 300;
  for(var i = 0; i < noCoins; i++) {
    if(Math.random() > 0.5) {
      if(Math.random() > 0.5) {
        for(var j = 0; j < 10; j++) {
          coinArray.push(new coins(gl, [tracks.track1, 0.3, -5 - i*30 - j*2]));
        }
      }
      else {
        for(var j = 0; j < 10; j++) {
          coinArray.push(new coins(gl, [tracks.track1, 1.2, -5 - i*30 - j*2]));
        }
      }
    }
    else {
      if(Math.random() > 0.5) {
        for(var j = 0; j < 10; j++) {
          coinArray.push(new coins(gl, [tracks.track2, 0.3, -5 - i*30 - j*2]));
        }
      }
      else {
        for(var j = 0; j < 10; j++) {
          coinArray.push(new coins(gl, [tracks.track2, 1.2, -5 - i*30 - j*2]));
        }
      }
    }
  }

  noJumpPowerups = 100;
  jumpPowerupArray = [];
  for(var i = 0; i < noJumpPowerups; i++) {
    if(Math.random() > 0.5) {
      jumpPowerupArray.push(new jumpPowerup(gl, [tracks.track1, 0.2, -50 - i*170 - Math.random()*30]));
    }
    else {
      jumpPowerupArray.push(new jumpPowerup(gl, [tracks.track2, 0.2, -50 - i*170 - Math.random()*30]));
    }
  }

  noFlyPowerups = 100;
  flyPowerupArray = [];
  for(var i = 0; i < noFlyPowerups; i++) {
    if(Math.random() > 0.5) {
      flyPowerupArray.push(new flyPowerup(gl, [tracks.track1, 0.3, -120 - i*260 - Math.random()*40]));
    }
    else {
      flyPowerupArray.push(new flyPowerup(gl, [tracks.track2, 0.3, -120 - i*260 - Math.random()*40]));
    }
  }

  noMagnetPowerups = 100;
  magnetPowerupArray = [];
  for(var i = 0; i < noMagnetPowerups; i++) {
    if(Math.random() > 0.5) {
      magnetPowerupArray.push(new magnetPowerup(gl, [tracks.track1, 0.3, -70 - i*200 - Math.random()*50]));
    }
    else {
      magnetPowerupArray.push(new magnetPowerup(gl, [tracks.track2, 0.3, -70 - i*200 - Math.random()*50]));
    }
  }

  barricadeArray = [];
  noBarricades = 300;
  for(var i = 0; i < noBarricades; i++) {
    if(Math.random() > 0.5) {
      if(Math.random() > 0.5){
        barricadeArray.push(new barricade(gl, [tracks.track1, 0.25, -(i+1)*30 - Math.random()*30]));
      }
      else {
        barricadeArray.push(new highBarricade(gl, [tracks.track2, 0.2, -(i+1)*50 - Math.random()*30]));
      }
    }
    else {
      if(Math.random() > 0.5){
        barricadeArray.push(new barricade(gl, [tracks.track1, 0.25, -(i+1)*30 - Math.random()*30]));
      }
      else {
        barricadeArray.push(new highBarricade(gl, [tracks.track2, 0.25, -(i+1)*50 - Math.random()*30]));
      }
    }
  }

  trafficPoleArray = [];
  noTrafficPoles = 200;
  for(var i = 0; i < noTrafficPoles; i++) {
    if(Math.random() > 0.5){
      trafficPoleArray.push(new trafficPole(gl, [0, 0.75, -(i+1)*60 - Math.random()*50]));
    }
    else {
      trafficPoleArray.push(new trafficPole(gl, [0, 0.75, -(i+1)*60 - Math.random()*50]));
    }
  }

  standingTrainArray = [];
  noStandingTrain = 300;
  for(var i = 0; i < noStandingTrain; i++) {
    if(Math.random() > 0.5) {
      standingTrainArray.push(new standingTrain(gl, [tracks.track1, 0.5, -(i+1)*75 - Math.random()*50]));
    }
    else {
      standingTrainArray.push(new standingTrain(gl, [tracks.track2, 0.5, -(i+1)*75 - Math.random()*50]));
    }
  }  
  
  var then = 0;

  // Draw the scene repeatedly
  function render(now) {
    now *= 0.001;  // convert to seconds
    const deltaTime = now - then;
    then = now;

    flashActivateTimer += deltaTime
    if(flashActivateTimer > 10) {
      chamko(1)
      if(flashStayTimer >= 0){
        flashStayTimer += deltaTime
        if(flashStayTimer > 2) {
          flashActivateTimer = 0;
          flashStayTimer = 0;
          chamko(0)
        }
      }
    }

    if(player.placed_position[2] < gameLength - 0.2) {
      document.getElementById("gameOver").innerHTML = "<h1><b>Player Safe!<br>Game Won!</b></h1>"
      return;
    }

    if(magnetCollected) {
      magnetTimer += deltaTime;
      if(magnetTimer > 10) {
        magnetCollected = 0;
        magnetTimer = 0;
      }
    }

    // collisions handling
    var i = coinArray.length
    while(i--) {
      if(cuboidCuboidCollision(coinArray[i].bb, player.bb)){
        coinArray.splice(i, 1);
        player.coins += 1;
      }
    }

    var i = jumpPowerupArray.length
    while(i--) {
      if(cuboidCuboidCollision(jumpPowerupArray[i].bb, player.bb)){
        jumpPowerupArray.splice(i, 1);
        player.collectJumpPowerup()
      }
    }

    var i = flyPowerupArray.length
    while(i--) {
      if(cuboidCuboidCollision(flyPowerupArray[i].bb, player.bb)){
        flyPowerupArray.splice(i, 1);
        player.collectFlyPowerup()
      }
    }

    var i = magnetPowerupArray.length
    while(i--) {
      if(cuboidCuboidCollision(magnetPowerupArray[i].bb, player.bb)){
        magnetPowerupArray.splice(i, 1);
        magnetCollected = 1;
        magnetTimer = 0;
      }
    }

    var i = barricadeArray.length
    while(i--) {
      if(cuboidCuboidCollision(barricadeArray[i].bb, player.bb)) {
         document.getElementById("gameOver").innerHTML = "<h1><b>Player Down!<br>Game Over!</b></h1>"
         return;
      }
    }

    var i = trafficPoleArray.length
    while(i--) {
      if(cuboidCuboidCollision(trafficPoleArray[i].bb, player.bb)) {
        player.trip(now);
        policeman.attack(player.placed_position[2]);
      }
    }

    var i = standingTrainArray.length
    while(i--) {
      if(cuboidCuboidCollision(standingTrainArray[i].bb, player.bb)) {
        document.getElementById("gameOver").innerHTML = "<h1><b>Player Down!<br>Game Over!</b></h1>"
        return;
      }
    }

    if(gameFinishCollision(player.bb, policeman.bb)) {
      document.getElementById("gameOver").innerHTML = "<h1><b>Player Caught!<br>Game Over!</b></h1>"
      return;
    }


    // event handling
    if(left == true) {
      player.move[1] = -1;
      policeman.move[1] = -1;
    }
    if(right == true) {
      player.move[1] = 1;
      policeman.move[1] = 1;
    }
    if((areSame(player.placed_position[1], 0.3) || areSame(player.placed_position[1], 0.15)) && down == true) {
      player.move[3] = -1;
    }
    else {
      player.move[3] = 0;
    }
    if(areSame(player.placed_position[1], 0.3) && up == true) {
      player.move[2] = 1;
    }
    if(areSame(policeman.placed_position[1], 0.3) && up == true) {
      policeman.move[2] = 1;
    }

    player.translate(deltaTime);
    policeman.translate(deltaTime);
    if(magnetCollected) {
      for(var i = 0; i < coinArray.length; i++) {
        if(Math.abs(player.placed_position[2] - coinArray[i].placed_position[2]) < 3) {
          coinArray[i].translate(player.placed_position, deltaTime);
        }
      }
    }

    drawScene(gl, programInfo, deltaTime);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

//
// Draw the scene
//
function drawScene(gl, programInfo, deltaTime) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
    gl.clearDepth(1.0);                 // Clear everything
    gl.enable(gl.DEPTH_TEST);           // Enable depth testing
    gl.depthFunc(gl.LEQUAL);            // Near things obscure far things
  
    // Clear the canvas before we start drawing on it.
  
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  
    // Create a perspective matrix, a special matrix that is
    // used to simulate the distortion of perspective in a camera.
    // Our field of view is 45 degrees, with a width/height
    // ratio that matches the display size of the canvas
    // and we only want to see objects between 0.1 units
    // and 100 units away from the camera.
  
    const fieldOfView = 45 * Math.PI / 180;   // in radians
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100000;
    const projectionMatrix = mat4.create();
  
    // note: glmatrix.js always has the first argument
    // as the destination to receive the result.
    mat4.perspective(projectionMatrix,
                     fieldOfView,
                     aspect,
                     zNear,
                     zFar);


    //common matrices
    var viewMatrix = mat4.create();
    var up = [0, 1, 0];
    mat4.lookAt(viewMatrix, [0, player.placed_position[1] + 0.8, player.placed_position[2] + 4], [0, player.placed_position[1], player.placed_position[2]], up)
    var VP = mat4.create();
    mat4.multiply(VP, projectionMatrix, viewMatrix);

    //stats
    document.getElementById("coins").innerHTML = "<b>Coins: </b>" + player.coins;
    if(player.jumpPowerupCollected) {
      document.getElementById("jump").innerHTML = "<b>Jump Powerup Time Left: </b>" + Math.round(10 - player.jumpPowerupTimer);
    }
    else {
      document.getElementById("jump").innerHTML = "";
    }
    if(player.flyPowerupCollected) {
      document.getElementById("fly").innerHTML = "<b>Jetpack Powerup Time Left: </b>" + Math.round(10 - player.flyPowerupTimer);
    }
    else {
      document.getElementById("fly").innerHTML = "";
    }
    if(magnetCollected) {
      document.getElementById("magnet").innerHTML = "<b>Magnet Powerup Time Left: </b>" + Math.round(10 - magnetTimer);
    }
    else {
      document.getElementById("magnet").innerHTML = "";
    }

    //draw elements
    tracks.draw(gl, VP, programInfo, deltaTime);
    ground.draw(gl, VP, programInfo, deltaTime);
    sky.draw(gl, VP, programInfo, deltaTime);
    walls.draw(gl, VP, programInfo, deltaTime);
    player.draw(gl, VP, programInfo, deltaTime);
    policeman.draw(gl, VP, programInfo, deltaTime);
    flag.draw(gl, VP, programInfo, deltaTime);
    for(var i = 0; i < coinArray.length; i++) {
      coinArray[i].draw(gl, VP, programInfo, deltaTime);
    }
    for(var i = 0; i < jumpPowerupArray.length; i++) {
      jumpPowerupArray[i].draw(gl, VP, programInfo, deltaTime);
    }
    for(var i = 0; i < flyPowerupArray.length; i++) {
      flyPowerupArray[i].draw(gl, VP, programInfo, deltaTime);
    }
    for(var i = 0; i < magnetPowerupArray.length; i++) {
      magnetPowerupArray[i].draw(gl, VP, programInfo, deltaTime);
    }
    for(var i = 0; i < barricadeArray.length; i++) {
      barricadeArray[i].draw(gl, VP, programInfo, deltaTime);
    }
    for(var i = 0; i < standingTrainArray.length; i++) {
      standingTrainArray[i].draw(gl, VP, programInfo, deltaTime);
    }
    for(var i = 0; i < trafficPoleArray.length; i++) {
      trafficPoleArray[i].draw(gl, VP, programInfo, deltaTime);
    }
  }

  //
// Initialize a shader program, so WebGL knows how to draw our data
//
function initShaderProgram(gl, vsSource, fsSource) {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
  
    // Create the shader program
  
    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
  
    // If creating the shader program failed, alert
  
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
      return null;
    }
  
    return shaderProgram;
  }
  
  //
  // creates a shader of the given type, uploads the source and
  // compiles it.
  //
  function loadShader(gl, type, source) {
    const shader = gl.createShader(type);
  
    // Send the source to the shader object
  
    gl.shaderSource(shader, source);
  
    // Compile the shader program
  
    gl.compileShader(shader);
  
    // See if it compiled successfully
  
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
  
    return shader;
  }
  