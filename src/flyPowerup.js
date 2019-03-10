let flyPowerup = class {
    constructor(gl, placed_position) {

        this.angleOfRotation = 0
        this.placed_position = placed_position;
        // Create a buffer for the cube's vertex positions.

        this.positionBuffer = gl.createBuffer();

        // Select the positionBuffer as the one to apply buffer
        // operations to from here out.

        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);

        // Now create an array of positions for the cube.

        this.positions = [
            //first
           //face front
           0.2, -0.2, 0.05,
           0.05, -0.2, 0.05,
           0.2, 0.3, 0.05,
           0.05, 0.3, 0.05,

           //face back
           0.2, -0.2, -0.05,
           0.05, -0.2, -0.05,
           0.2, 0.3, -0.05,
           0.05, 0.3, -0.05,

           //face right
           0.2, -0.2, 0.05,
           0.2, -0.2, -0.05,
           0.2, 0.3, 0.05,
           0.2, 0.3, -0.05,

           //face left
           0.05, -0.2, 0.05,
           0.05, -0.2, -0.05,
           0.05, 0.3, 0.05,
           0.05, 0.3, -0.05,

           //face top
           0.2, 0.3, 0.05,
           0.2, 0.3, -0.05,
           0.05, 0.3, 0.05,
           0.05, 0.3, -0.05,

           //face bottom
           0.2, -0.2, 0.05,
           0.2, -0.2, -0.05,
           0.05, -0.2, 0.05,
           0.05, -0.2, -0.05,

           //second
           //face front
           -0.05, -0.2, 0.05,
           -0.2, -0.2, 0.05,
           -0.05, 0.3, 0.05,
           -0.2, 0.3, 0.05,

           //face back
           -0.05, -0.2, -0.05,
           -0.2, -0.2, -0.05,
           -0.05, 0.3, -0.05,
           -0.2, 0.3, -0.05,

           //face right
           -0.05, -0.2, 0.05,
           -0.05, -0.2, -0.05,
           -0.05, 0.3, 0.05,
           -0.05, 0.3, -0.05,

           //face left
           -0.2, -0.2, 0.05,
           -0.2, -0.2, -0.05,
           -0.2, 0.3, 0.05,
           -0.2, 0.3, -0.05,

           //face top
           -0.05, 0.3, 0.05,
           -0.05, 0.3, -0.05,
           -0.2, 0.3, 0.05,
           -0.2, 0.3, -0.05,

           //face bottom
           -0.05, -0.2, 0.05,
           -0.05, -0.2, -0.05,
           -0.2, -0.2, 0.05,
           -0.2, -0.2, -0.05,

           //third
           //face front
           0.1, -0.05, 0.05,
           -0.1, -0.05, 0.05,
           0.1, 0.05, 0.05,
           -0.1, 0.05, 0.05,

           //face back
           0.1, -0.05, -0.05,
           -0.1, -0.05, -0.05,
           0.1, 0.05, -0.05,
           -0.1, 0.05, -0.05,

           //face right
           0.1, -0.05, 0.05,
           0.1, -0.05, -0.05,
           0.1, 0.05, 0.05,
           0.1, 0.05, -0.05,

           //face left
           -0.1, -0.05, 0.05,
           -0.1, -0.05, -0.05,
           -0.1, 0.05, 0.05,
           -0.1, 0.05, -0.05,

           //face top
           0.1, 0.05, 0.05,
           0.1, 0.05, -0.05,
           -0.1, 0.05, 0.05,
           -0.1, 0.05, -0.05,

           //face bottom
           0.1, -0.05, 0.05,
           0.1, -0.05, -0.05,
           -0.1, -0.05, 0.05,
           -0.1, -0.05, -0.05,

           //flames
           0.2, -0.2, -0.05,
           0.05, -0.2, -0.05,
           0.125, -0.3, -0.05,

           0.2, -0.2, 0.05,
           0.05, -0.2, 0.05,
           0.125, -0.3, 0.05,

           -0.05, -0.2, -0.05,
           -0.2, -0.2, -0.05,
           -0.125, -0.3, -0.05,

           -0.05, -0.2, 0.05,
           -0.2, -0.2, 0.05,
           -0.125, -0.3, 0.05,
        ];
        console.log(this.positions[72*3], this.positions[72*3+1], this.positions[72*3+2])
        this.bb = [this.placed_position, 0.4, 0.6, 0.1];

        // Now pass the list of positions into WebGL to build the
        // shape. We do this by creating a Float32Array from the
        // JavaScript array, then use it to fill the current buffer.

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positions), gl.STATIC_DRAW);

        // Now set up the colors for the faces. We'll use solid colors
        // for each face.

        this.squareFaceColors = [
            [0, 1, 0, 1],
            [0, 1, 0, 1],
            [0, 1, 0, 1],
            [0, 1, 0, 1],
            [0, 1, 0, 1],
            [0, 1, 0, 1],

            [0, 1, 0, 1],
            [0, 1, 0, 1],
            [0, 1, 0, 1],
            [0, 1, 0, 1],
            [0, 1, 0, 1],
            [0, 1, 0, 1],

            [0, 1, 0, 1],
            [0, 1, 0, 1],
            [0, 1, 0, 1],
            [0, 1, 0, 1],
            [0, 1, 0, 1],
            [0, 1, 0, 1],

        ];

        this.triangleFaceColors = [
            [0.964, 0.274, 0.117 ,1],
            [0.964, 0.274, 0.117 ,1],
            [0.964, 0.274, 0.117 ,1],
            [0.964, 0.274, 0.117 ,1],
        ];

        // Convert the array of colors into a table for all the vertices.2000

        this.colors = [];

        for (var j = 0; j < this.squareFaceColors.length; ++j) {
            const c = this.squareFaceColors[j];

            // Repeat each color four times for the four vertices of the face
            this.colors = this.colors.concat(c, c, c, c);
        }

        for (var j = 0; j < this.triangleFaceColors.length; ++j) {
            const c = this.triangleFaceColors[j];

            // Repeat each color four times for the four vertices of the face
            this.colors = this.colors.concat(c, c, c);
        }

        this.colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.colors), gl.STATIC_DRAW);

        // Build the element array buffer; this specifies the indices
        // into the vertex arrays for each face's vertices.

        //texture buffer
        this.tex = [
            0 ,0,
            0, 1,
            1, 0,
            1, 1,

            0 ,0,
            0, 1,
            1, 0,
            1, 1,
            
            0 ,0,
            0, 1,
            1, 0,
            1, 1,

            0 ,0,
            0, 1,
            1, 0,
            1, 1,

            0 ,0,
            0, 1,
            1, 0,
            1, 1,

            0 ,0,
            0, 1,
            1, 0,
            1, 1,

            0 ,0,
            0, 1,
            1, 0,
            1, 1,

            0 ,0,
            0, 1,
            1, 0,
            1, 1,
            
            0 ,0,
            0, 1,
            1, 0,
            1, 1,

            0 ,0,
            0, 1,
            1, 0,
            1, 1,

            0 ,0,
            0, 1,
            1, 0,
            1, 1,

            0 ,0,
            0, 1,
            1, 0,
            1, 1,

            0 ,0,
            0, 1,
            1, 0,
            1, 1,

            0 ,0,
            0, 1,
            1, 0,
            1, 1,
            
            0 ,0,
            0, 1,
            1, 0,
            1, 1,

            0 ,0,
            0, 1,
            1, 0,
            1, 1,

            0 ,0,
            0, 1,
            1, 0,
            1, 1,

            0 ,0,
            0, 1,
            1, 0,
            1, 1,

            0, 0,
            0, 1,
            1, 1,

            0, 0,
            0, 1,
            1, 1,

            0, 0,
            0, 1,
            1, 1,

            0, 0,
            0, 1,
            1, 1,
        ];
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
        img.src = "white.png";
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

        this.indices = [
            0, 1, 2,        1, 2, 3,
            4, 5, 6,        5, 6, 7,
            8, 9, 10,       9, 10, 11,
            12, 13, 14,     13, 14, 15,
            16, 17, 18,     17, 18, 19,
            20, 21, 22,      21, 22, 23,

            0 + 24, 1 + 24, 2 + 24,        1 + 24, 2 + 24, 3 + 24,
            4 + 24, 5 + 24, 6 + 24,        5 + 24, 6 + 24, 7 + 24,
            8 + 24, 9 + 24, 10 + 24,       9 + 24, 10 + 24, 11 + 24,
            12 + 24, 13 + 24, 14 + 24,     13 + 24, 14 + 24, 15 + 24,
            16 + 24, 17 + 24, 18 + 24,     17 + 24, 18 + 24, 19 + 24,
            20 + 24, 21 + 24, 22 + 24,      21 + 24, 22 + 24, 23 + 24,

            0 + 48, 1 + 48, 2 + 48,        1 + 48, 2 + 48, 3 + 48,
            4 + 48, 5 + 48, 6 + 48,        5 + 48, 6 + 48, 7 + 48,
            8 + 48, 9 + 48, 10 + 48,       9 + 48, 10 + 48, 11 + 48,
            12 + 48, 13 + 48, 14 + 48,     13 + 48, 14 + 48, 15 + 48,
            16 + 48, 17 + 48, 18 + 48,     17 + 48, 18 + 48, 19 + 48,
            20 + 48, 21 + 48, 22 + 48,      21 + 48, 22 + 48, 23 + 48,

            72, 73, 74,

            75, 76, 77,

            78, 79, 80,

            81, 82, 83,
        ];

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

        // mat4.rotate(this.modelViewMatrix,
        //             this.modelViewMatrix,
        //             this.angleOfRotation,
        //             [0, 1, 0])

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
            const vertexCount = 3*2*6*3 + 3*4;
            const type = gl.UNSIGNED_SHORT;
            const offset = 0;
            gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
        }

        this.angleOfRotation += deltaTime;
    }
}