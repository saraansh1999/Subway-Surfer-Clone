var N = 25;

let coins = class {
    constructor(gl, placed_position) {

        this.placed_position = placed_position;
        // Create a buffer for the cube's vertex positions.

        this.positionBuffer = gl.createBuffer();

        // Select the positionBuffer as the one to apply buffer
        // operations to from here out.

        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);

        // Now create an array of positions for the cube.

        var xval = 0;
        var yval = 0.1;
        var zval = 0.05;
        var angle = Math.PI*2/N;
        this.positions = new Array(12*N + 9*N);
        for(var i = 0; i < N; i++)
        {
            this.positions[12*i + 0] = xval;
            this.positions[12*i + 1] = yval;
            this.positions[12*i + 2] = zval;

            this.positions[12*i + 3] = xval;
            this.positions[12*i + 4] = yval;
            this.positions[12*i + 5] = -zval;

            var newxval = xval*Math.cos(angle) - yval*Math.sin(angle);
            var newyval = xval*Math.sin(angle) + yval*Math.cos(angle);
            xval = newxval;
            yval = newyval;
            
            this.positions[12*i + 6] = xval;
            this.positions[12*i + 7] = yval;
            this.positions[12*i + 8] = zval;

            // this.positions[12*i + 9] = xval;
            // this.positions[12*i + 10] = yval;
            // this.positions[12*i + 11] = zval;

            // this.positions[12*i + 12] = this.positions[12*i + 3];
            // this.positions[12*i + 13] = this.positions[12*i + 4];
            // this.positions[12*i + 14] = this.positions[12*i + 5];

            this.positions[12*i + 9] = xval;
            this.positions[12*i + 10] = yval;
            this.positions[12*i + 11] = -zval;
        }


        angle = 0;
        var r = 0.1;
        for(var i = 0; i < N; i++)
        {
            this.positions[12*N + 9*i] = 0;
            this.positions[12*N + 9*i + 1] = 0;
            this.positions[12*N + 9*i + 2] = zval;
            this.positions[12*N + 9*i + 3] = r*Math.cos(angle);
            this.positions[12*N + 9*i + 4] = r*Math.sin(angle);
            this.positions[12*N + 9*i + 5] = zval;
            this.positions[12*N + 9*i + 6] = r*Math.cos(angle + Math.PI*2/N);
            this.positions[12*N + 9*i + 7] = r*Math.sin(angle + Math.PI*2/N);
            this.positions[12*N + 9*i + 8] = zval;
            angle += Math.PI*2/N;
        }

        this.bb = [this.placed_position, 0.2, 0.2, 0.1];

        // Now pass the list of positions into WebGL to build the
        // shape. We do this by creating a Float32Array from the
        // JavaScript array, then use it to fill the current buffer.

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positions), gl.STATIC_DRAW);

        // Now set up the colors for the faces. We'll use solid colors
        // for each face.

        this.quadFaceColors = new Array(N);
        for(var i = 0; i < N; i++) {
            this.quadFaceColors[i] = [1, 1, 1, 1];
        }
        this.triFaceColors = new Array(N);
        for(var i = 0; i < N; i++) {
            this.triFaceColors[i] = [1, 1, 1, 1];
        }

        // Convert the array of colors into a table for all the vertices.2000

        this.colors = [];

        for (var j = 0; j < this.quadFaceColors.length; ++j) {
            const c = this.quadFaceColors[j];

            // Repeat each color four times for the four vertices of the face
            this.colors = this.colors.concat(c, c, c, c);
        }
        for (var j = 0; j < this.triFaceColors.length; ++j) {
            const c = this.triFaceColors[j];

            // Repeat each color four times for the four vertices of the face
            this.colors = this.colors.concat(c, c, c);
        }

        this.colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.colors), gl.STATIC_DRAW);

        // Build the element array buffer; this specifies the indices
        // into the vertex arrays for each face's vertices.

        //texture buffer
        this.tex = new Array(8*N + 6*N);
        for(var i = 0; i < N; i++) {
            this.tex[8*i + 0] = 0; this.tex[8*i + 1] = 0;
            this.tex[8*i + 2] = 0; this.tex[8*i + 3] = 1;
            this.tex[8*i + 4] = 1; this.tex[8*i + 5] = 0;
            this.tex[8*i + 5] = 1; this.tex[8*i + 7] = 1;
        }
        for(var i = 0; i < N; i++) {
            this.tex[8*N + 6*i + 0] = 0; this.tex[8*N + 6*i + 1] = 0;
            this.tex[8*N + 6*i + 2] = 0; this.tex[8*N + 6*i + 3] = 1;
            this.tex[8*N + 6*i + 4] = 1; this.tex[8*N + 6*i + 5] = 1;
        }
        this.textureBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.textureBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.tex), gl.STATIC_DRAW);

        //create texture
        var texture = gl.createTexture();
        this.texture = texture;
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 255, 255, 255]));
        var img = new Image();
        img.crossOrigin = "";
        img.src = "coin.png";
        img.addEventListener("load", function () {
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
            if (powerOf2(img.width) && powerOf2(img.height)) {
                gl.generateMipmap(gl.TEXTURE_2D);
            }
            else {
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            }
        });

        this.indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

        // This array defines each face as two triangles, using the
        // indices into the vertex array to specify each triangle's
        // position.

        this.indices = new Array(N*6 + 3*N);
        for(var i = 0; i < N; i++){
            this.indices[6*i + 0] = 4*i + 0;
            this.indices[6*i + 1] = 4*i + 1;
            this.indices[6*i + 2] = 4*i + 2;
            this.indices[6*i + 3] = 4*i + 1;
            this.indices[6*i + 4] = 4*i + 2;
            this.indices[6*i + 5] = 4*i + 3;
        }
        for(var i = 0; i < N; i++) {
            this.indices[6*N + 3*i + 0] = 4*N + 3*i + 0;
            this.indices[6*N + 3*i + 1] = 4*N + 3*i + 1;
            this.indices[6*N + 3*i + 2] = 4*N + 3*i + 2;
        }

        // Now send the element array to GL

        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
            new Uint16Array(this.indices), gl.STATIC_DRAW);

        this.buffers =  {
            position: this.positionBuffer,
            color: this.colorBuffer,
            indices: this.indexBuffer,
            texture: this.textureBuffer,
        };
    }

    draw(gl, VP, programInfo, deltaTime) {
        // Set the drawing position to the "identity" point, which is
        this.modelViewMatrix = mat4.create();

        // Now move the drawing position a bit to where we want to
        // start drawing the square.

        mat4.translate(this.modelViewMatrix,     // destination matrix
                        this.modelViewMatrix,     // matrix to translate
                        this.placed_position);  // amount to translate;

        // Tell WebGL how to pull out the positions from the position
        // buffer into the vertexPosition attribute
        {
            const numComponents = 3;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.position);
            gl.vertexAttribPointer(
                programInfo.attribLocations.vertexPosition,
                numComponents,
                type,
                normalize,
                stride,
                offset);
            gl.enableVertexAttribArray(
                programInfo.attribLocations.vertexPosition);
        }

        // Tell WebGL how to pull out the colors from the color buffer
        // into the vertexColor attribute.
        {
            const numComponents = 4;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.color);
            gl.vertexAttribPointer(
                programInfo.attribLocations.vertexColor,
                numComponents,
                type,
                normalize,
                stride,
                offset);
            gl.enableVertexAttribArray(
                programInfo.attribLocations.vertexColor);
        }

        {
            const numComponents = 2;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.texture);
            gl.vertexAttribPointer(
                programInfo.attribLocations.textureCoord,
                numComponents,
                type,
                normalize,
                stride,
                offset);
            gl.enableVertexAttribArray(
                programInfo.attribLocations.textureCoord);
        }

        // Tell WebGL which indices to use to index the vertices
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffers.indices);

        // Tell WebGL to use our program when drawing

        gl.useProgram(programInfo.program);

        // Set the shader uniforms

        gl.uniformMatrix4fv(
            programInfo.uniformLocations.projectionMatrix,
            false,
            VP);

        gl.uniformMatrix4fv(
            programInfo.uniformLocations.modelViewMatrix,
            false,
            this.modelViewMatrix);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.uniform1i(programInfo.uniformLocations.uTexture, 0)

        {
            const vertexCount = 3*2*N + 3*N;
            const type = gl.UNSIGNED_SHORT;
            const offset = 0;
            gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
        }
    }

    translate(playerPos, deltaTime) {
        this.placed_position[0] += (playerPos[0] - this.placed_position[0])*deltaTime*10;
        this.placed_position[1] += (playerPos[1] - this.placed_position[1])*deltaTime*10;
        this.placed_position[2] += (playerPos[2] - this.placed_position[2])*deltaTime*10;

        this.bb[0] = this.placed_position;
    }
}