let policeman = class {
    constructor(gl, placed_position, leftLimit, rightLimit) {

        this.placed_position = placed_position;
        this.move = [-1, 0];
        this.forwardSpeed = 4;
        this.leftLimit = leftLimit;
        this.rightLimit = rightLimit;
        this.lrSpeed = 3;
        // Create a buffer for the cube's vertex positions.

        this.positionBuffer = gl.createBuffer();

        // Select the positionBuffer as the one to apply buffer
        // operations to from here out.

        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);

        // Now create an array of positions for the cube.

        this.positions = [
           //head
           //face front
           0.1, 0.15, 0.15,
           -0.1, 0.15, 0.15,
           0.1, 0.3, 0.15,
           -0.1, 0.3, 0.15,

           //face back
           0.1, 0.15, -0.15,
           -0.1, 0.15, -0.15,
           0.1, 0.3, -0.15,
           -0.1, 0.3, -0.15,

           //face right
           0.1, 0.15, 0.15,
           0.1, 0.15, -0.15,
           0.1, 0.3, 0.15,
           0.1, 0.3, -0.15,

           //face left
           -0.1, 0.15, 0.15,
           -0.1, 0.15, -0.15,
           -0.1, 0.3, 0.15,
           -0.1, 0.3, -0.15,

           //face top
           0.1, 0.3, 0.15,
           0.1, 0.3, -0.15,
           -0.1, 0.3, 0.15,
           -0.1, 0.3, -0.15,

           //face bottom
           0.1, 0.15, 0.15,
           0.1, 0.15, -0.15,
           -0.1, 0.15, 0.15,
           -0.1, 0.15, -0.15,

           //neck
           //face front
           0.05, 0.10, 0.15,
           -0.05, 0.10, 0.15,
           0.05, 0.15, 0.15,
           -0.05, 0.15, 0.15,

           //face back
           0.05, 0.10, -0.15,
           -0.05, 0.10, -0.15,
           0.05, 0.15, -0.15,
           -0.05, 0.15, -0.15,

           //face right
           0.05, 0.10, 0.15,
           0.05, 0.10, -0.15,
           0.05, 0.15, 0.15,
           0.05, 0.15, -0.15,

           //face left
           -0.05, 0.10, 0.15,
           -0.05, 0.10, -0.15,
           -0.05, 0.15, 0.15,
           -0.05, 0.15, -0.15,

           //face top
           0.05, 0.15, 0.15,
           0.05, 0.15, -0.15,
           -0.05, 0.15, 0.15,
           -0.05, 0.15, -0.15,

           //face bottom
           0.05, 0.10, 0.15,
           0.05, 0.10, -0.15,
           -0.05, 0.10, 0.15,
           -0.05, 0.10, -0.15,

           //body
            //face front
           0.17, -0.1, 0.15,
           -0.17, -0.1, 0.15,
           0.17, 0.1, 0.15,
           -0.17, 0.1, 0.15,

           //face back
           0.17, -0.1, -0.15,
           -0.17, -0.1, -0.15,
           0.17, 0.1, -0.15,
           -0.17, 0.1, -0.15,

           //face right
           0.17, -0.1, 0.15,
           0.17, -0.1, -0.15,
           0.17, 0.1, 0.15,
           0.17, 0.1, -0.15,

           //face left
           -0.17, -0.1, 0.15,
           -0.17, -0.1, -0.15,
           -0.17, 0.1, 0.15,
           -0.17, 0.1, -0.15,

           //face top
           0.17, 0.1, 0.15,
           0.17, 0.1, -0.15,
           -0.17, 0.1, 0.15,
           -0.17, 0.1, -0.15,

           //face bottom
           0.17, -0.1, 0.15,
           0.17, -0.1, -0.15,
           -0.17, -0.1, 0.15,
           -0.17, -0.1, -0.15,

            //hand left
            //face front
           -0.17, -0.07, 0.1,
           -0.2, -0.07, 0.1,
           -0.17, 0.1, 0.1,
           -0.2, 0.1, 0.1,

           //face back
           -0.17, -0.07, -0.1,
           -0.2, -0.07, -0.1,
           -0.17, 0.1, -0.1,
           -0.2, 0.1, -0.1,

           //face right
           -0.17, -0.07, 0.1,
           -0.17, -0.07, -0.1,
           -0.17, 0.1, 0.1,
           -0.17, 0.1, -0.1,

           //face left
           -0.2, -0.07, 0.1,
           -0.2, -0.07, -0.1,
           -0.2, 0.1, 0.1,
           -0.2, 0.1, -0.1,

           //face top
           -0.17, 0.1, 0.1,
           -0.17, 0.1, -0.1,
           -0.2, 0.1, 0.1,
           -0.2, 0.1, -0.1,

           //face bottom
           -0.17, -0.07, 0.1,
           -0.17, -0.07, -0.1,
           -0.2, -0.07, 0.1,
           -0.2, -0.07, -0.1,

           //hand right
            //face front
            0.17, -0.07, 0.1,
            0.2, -0.07, 0.1,
            0.17, 0.1, 0.1,
            0.2, 0.1, 0.1,
 
            //face back
            0.17, -0.07, -0.1,
            0.2, -0.07, -0.1,
            0.17, 0.1, -0.1,
            0.2, 0.1, -0.1,
 
            //face right
            0.17, -0.07, 0.1,
            0.17, -0.07, -0.1,
            0.17, 0.1, 0.1,
            0.17, 0.1, -0.1,
 
            //face left
            0.2, -0.07, 0.1,
            0.2, -0.07, -0.1,
            0.2, 0.1, 0.1,
            0.2, 0.1, -0.1,
 
            //face top
            0.17, 0.1, 0.1,
            0.17, 0.1, -0.1,
            0.2, 0.1, 0.1,
            0.2, 0.1, -0.1,
 
            //face bottom
            0.17, -0.07, 0.1,
            0.17, -0.07, -0.1,
            0.2, -0.07, 0.1,
            0.2, -0.07, -0.1,


           //leg left
           //face front
           -0.05, -0.1, 0.1,
           -0.15, -0.1, 0.1,
           -0.05, -0.25, 0.1,
           -0.15, -0.25, 0.1,

           //face back
           -0.05, -0.1, -0.1,
           -0.15, -0.1, -0.1,
           -0.05, -0.25, -0.1,
           -0.15, -0.25, -0.1,

           //face right
           -0.05, -0.1, 0.1,
           -0.05, -0.1, -0.1,
           -0.05, -0.25, 0.1,
           -0.05, -0.25, -0.1,

           //face left
           -0.15, -0.1, 0.1,
           -0.15, -0.1, -0.1,
           -0.15, -0.25, 0.1,
           -0.15, -0.25, -0.1,

           //face top
           -0.05, -0.25, 0.1,
           -0.05, -0.25, -0.1,
           -0.15, -0.25, 0.1,
           -0.15, -0.25, -0.1,

           //face bottom
           -0.05, -0.1, 0.1,
           -0.05, -0.1, -0.1,
           -0.15, -0.1, 0.1,
           -0.15, -0.1, -0.1,

           //right leg
           //face front
           0.05, -0.1, 0.1,
           0.15, -0.1, 0.1,
           0.05, -0.25, 0.1,
           0.15, -0.25, 0.1,

           //face back
           0.05, -0.1, -0.1,
           0.15, -0.1, -0.1,
           0.05, -0.25, -0.1,
           0.15, -0.25, -0.1,

           //face right
           0.05, -0.1, 0.1,
           0.05, -0.1, -0.1,
           0.05, -0.25, 0.1,
           0.05, -0.25, -0.1,

           //face left
           0.15, -0.1, 0.1,
           0.15, -0.1, -0.1,
           0.15, -0.25, 0.1,
           0.15, -0.25, -0.1,

           //face top
           0.05, -0.25, 0.1,
           0.05, -0.25, -0.1,
           0.15, -0.25, 0.1,
           0.15, -0.25, -0.1,

           //face bottom
           0.05, -0.1, 0.1,
           0.05, -0.1, -0.1,
           0.15, -0.1, 0.1,
           0.15, -0.1, -0.1,

           //shoe left
           //face front
           -0.05, -0.25, 0.15,
           -0.15, -0.25, 0.15,
           -0.05, -0.3, 0.15,
           -0.15, -0.3, 0.15,

           //face back
           -0.05, -0.25, -0.15,
           -0.15, -0.25, -0.15,
           -0.05, -0.3, -0.15,
           -0.15, -0.3, -0.15,

           //face right
           -0.05, -0.25, 0.15,
           -0.05, -0.25, -0.15,
           -0.05, -0.3, 0.15,
           -0.05, -0.3, -0.15,

           //face left
           -0.15, -0.25, 0.15,
           -0.15, -0.25, -0.15,
           -0.15, -0.3, 0.15,
           -0.15, -0.3, -0.15,

           //face top
           -0.05, -0.3, 0.15,
           -0.05, -0.3, -0.15,
           -0.15, -0.3, 0.15,
           -0.15, -0.3, -0.15,

           //face bottom
           -0.05, -0.25, 0.15,
           -0.05, -0.25, -0.15,
           -0.15, -0.25, 0.15,
           -0.15, -0.25, -0.15,

           //shoe right
           //face front
           0.05, -0.25, 0.15,
           0.15, -0.25, 0.15,
           0.05, -0.3, 0.15,
           0.15, -0.3, 0.15,

           //face back
           0.05, -0.25, -0.15,
           0.15, -0.25, -0.15,
           0.05, -0.3, -0.15,
           0.15, -0.3, -0.15,

           //face right
           0.05, -0.25, 0.15,
           0.05, -0.25, -0.15,
           0.05, -0.3, 0.15,
           0.05, -0.3, -0.15,

           //face left
           0.15, -0.25, 0.15,
           0.15, -0.25, -0.15,
           0.15, -0.3, 0.15,
           0.15, -0.3, -0.15,

           //face top
           0.05, -0.3, 0.15,
           0.05, -0.3, -0.15,
           0.15, -0.3, 0.15,
           0.15, -0.3, -0.15,

           //face bottom
           0.05, -0.25, 0.15,
           0.05, -0.25, -0.15,
           0.15, -0.25, 0.15,
           0.15, -0.25, -0.15,


        ];

        this.bb = [this.placed_position, 0.4, 0.6, 0.3];

        // Now pass the list of positions into WebGL to build the
        // shape. We do this by creating a Float32Array from the
        // JavaScript array, then use it to fill the current buffer.

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positions), gl.STATIC_DRAW);

        // Now set up the colors for the faces. We'll use solid colors
        // for each face.

        this.faceColors = [
            [1, 1, 1, 1],
            [0.831, 0.776, 0.588, 1],
            [0.831, 0.776, 0.588, 1],
            [0.831, 0.776, 0.588, 1],
            [1, 1, 1, 1],
            [0.831, 0.776, 0.588, 1],
            
            [0.831, 0.776, 0.588, 1],
            [0.831, 0.776, 0.588, 1],
            [0.831, 0.776, 0.588, 1],
            [0.831, 0.776, 0.588, 1],
            [0.831, 0.776, 0.588, 1],
            [0.831, 0.776, 0.588, 1],

            [1, 1, 1, 1],
            [1, 1, 1, 1],
            [1, 1, 1, 1],
            [1, 1, 1, 1],
            [1, 1, 1, 1],
            [1, 1, 1, 1],

            [0.831, 0.776, 0.588, 1],
            [0.831, 0.776, 0.588, 1],
            [0.831, 0.776, 0.588, 1],
            [0.831, 0.776, 0.588, 1],
            [0.831, 0.776, 0.588, 1],
            [0.831, 0.776, 0.588, 1],

            [0.831, 0.776, 0.588, 1],
            [0.831, 0.776, 0.588, 1],
            [0.831, 0.776, 0.588, 1],
            [0.831, 0.776, 0.588, 1],
            [0.831, 0.776, 0.588, 1],
            [0.831, 0.776, 0.588, 1],

            [1, 1, 1, 1],
            [1, 1, 1, 1],
            [1, 1, 1, 1],
            [1, 1, 1, 1],
            [1, 1, 1, 1],
            [1, 1, 1, 1],

            [1, 1, 1, 1],
            [1, 1, 1, 1],
            [1, 1, 1, 1],
            [1, 1, 1, 1],
            [1, 1, 1, 1],
            [1, 1, 1, 1],

            [1, 1, 1, 1],
            [1, 1, 1, 1],
            [1, 1, 1, 1],
            [1, 1, 1, 1],
            [1, 1, 1, 1],
            [1, 1, 1, 1],

            [1, 1, 1, 1],
            [1, 1, 1, 1],
            [1, 1, 1, 1],
            [1, 1, 1, 1],
            [1, 1, 1, 1],
            [1, 1, 1, 1],

        ];

        // Convert the array of colors into a table for all the vertices.2000

        this.colors = [];

        for (var j = 0; j < this.faceColors.length; ++j) {
            const c = this.faceColors[j];

            // Repeat each color four times for the four vertices of the face
            this.colors = this.colors.concat(c, c, c, c);
        }

        this.colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.colors), gl.STATIC_DRAW);

        // Build the element array buffer; this specifies the indices
        // into the vertex arrays for each face's vertices.

        //texture buffer
        this.tex = [
            0.5 ,0,
            1 ,0,
            0.5 ,0.5,
            1 ,0.5,
            
            0 ,0,
            0, 0,
            0 ,0,
            0 ,0,
            
            0 ,0,
            0 ,0,
            0 ,0,
            0 ,0,

            0 ,0,
            0 ,0,
            0 ,0,
            0 ,0,

            0.5 ,0,
            1 ,0,
            0.5 ,0.5,
            1 ,0.5,

            0 ,0,
            0 ,0,
            0 ,0,
            0 ,0,
///////////////////////////////
            0 ,0,
            0, 0,
            0 ,0,
            0 ,0,

            0 ,0,
            0 ,0,
            0 ,0,
            0 ,0,
            
            0 ,0,
            0 ,0,
            0 ,0,
            0 ,0,

            0 ,0,
            0 ,0,
            0 ,0,
            0 ,0,

            0 ,0,
            0 ,0,
            0 ,0,
            0 ,0,

            0 ,0,
            0 ,0,
            0 ,0,
            0 ,0,
////////////////////////////////
            0.5, 1,
            0, 1,
            0.5, 0.5,
            0, 0.5,

            0.5, 1,
            0, 1,
            0.5, 0.5,
            0, 0.5,
            
            0, 0,
            0, 0,
            0, 0,
            0, 0,

            0, 0,
            0, 0,
            0, 0,
            0, 0,

            0, 0,
            0, 0,
            0, 0,
            0, 0,

            0, 0,
            0, 0,
            0, 0,
            0, 0,
/////////////////////////////////////
            0 ,0,
            0, 0,
            0 ,0,
            0 ,0,

            0 ,0,
            0 ,0,
            0 ,0,
            0 ,0,
            
            0 ,0,
            0 ,0,
            0 ,0,
            0 ,0,

            0 ,0,
            0 ,0,
            0 ,0,
            0 ,0,

            0 ,0,
            0 ,0,
            0 ,0,
            0 ,0,

            0 ,0,
            0 ,0,
            0 ,0,
            0 ,0,

            0 ,0,
            0, 0,
            0 ,0,
            0 ,0,

            0 ,0,
            0 ,0,
            0 ,0,
            0 ,0,
            
            0 ,0,
            0 ,0,
            0 ,0,
            0 ,0,

            0 ,0,
            0 ,0,
            0 ,0,
            0 ,0,

            0 ,0,
            0 ,0,
            0 ,0,
            0 ,0,

            0 ,0,
            0 ,0,
            0 ,0,
            0 ,0,
/////////////////////////////////
            0.5 ,0,
            0, 0,
            0.5, 0.5,
            0.5, 0,

            0.5 ,0,
            0, 0,
            0.5, 0.5,
            0.5, 0,
            
            0 ,0,
            0, 0.5,
            0.5, 0,
            0.5, 0.5,

            0 ,0,
            0, 0.5,
            0.5, 0,
            0.5, 0.5,

            0 ,0,
            0, 0.5,
            0.5, 0,
            0.5, 0.5,

            0 ,0,
            0, 0.5,
            0.5, 0,
            0.5, 0.5,
/////////////////////////////////////
            0.5 ,0,
            0, 0,
            0.5, 0.5,
            0.5, 0,

            0.5 ,0,
            0, 0,
            0.5, 0.5,
            0.5, 0,
            
            0 ,0,
            0, 0.5,
            0.5, 0,
            0.5, 0.5,

            0 ,0,
            0, 0.5,
            0.5, 0,
            0.5, 0.5,

            0 ,0,
            0, 0.5,
            0.5, 0,
            0.5, 0.5,

            0 ,0,
            0, 0.5,
            0.5, 0,
            0.5, 0.5,
///////////////////////////////
            1 ,0.5,
            0.5, 0.5,
            1, 1,
            1, 0.5,

            1 ,0.5,
            0.5, 0.5,
            1, 1,
            1, 0.5,
            
            0.5 ,0.5,
            0.5, 1,
            1, 0.5,
            1, 1,

            0.5 ,0.5,
            0.5, 1,
            1, 0.5,
            1, 1,

            0.5 ,0.5,
            0.5, 1,
            1, 0.5,
            1, 1,

            0.5 ,0.5,
            0.5, 1,
            1, 0.5,
            1, 1,
/////////////////////////////////
            1 ,0.5,
            0.5, 0.5,
            1, 1,
            1, 0.5,

            1 ,0.5,
            0.5, 0.5,
            1, 1,
            1, 0.5,
            
            0.5 ,0.5,
            0.5, 1,
            1, 0.5,
            1, 1,

            0.5 ,0.5,
            0.5, 1,
            1, 0.5,
            1, 1,

            0.5 ,0.5,
            0.5, 1,
            1, 0.5,
            1, 1,

            0.5 ,0.5,
            0.5, 1,
            1, 0.5,
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
        img.src = "police.png";
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

            0 + 72, 1 + 72, 2 + 72,        1 + 72, 2 + 72, 3 + 72,
            4 + 72, 5 + 72, 6 + 72,        5 + 72, 6 + 72, 7 + 72,
            8 + 72, 9 + 72, 10 + 72,       9 + 72, 10 + 72, 11 + 72,
            12 + 72, 13 + 72, 14 + 72,     13 + 72, 14 + 72, 15 + 72,
            16 + 72, 17 + 72, 18 + 72,     17 + 72, 18 + 72, 19 + 72,
            20 + 72, 21 + 72, 22 + 72,      21 + 72, 22 + 72, 23 + 72,

            0 + 96, 1 + 96, 2 + 96,        1 + 96, 2 + 96, 3 + 96,
            4 + 96, 5 + 96, 6 + 96,        5 + 96, 6 + 96, 7 + 96,
            8 + 96, 9 + 96, 10 + 96,       9 + 96, 10 + 96, 11 + 96,
            12 + 96, 13 + 96, 14 + 96,     13 + 96, 14 + 96, 15 + 96,
            16 + 96, 17 + 96, 18 + 96,     17 + 96, 18 + 96, 19 + 96,
            20 + 96, 21 + 96, 22 + 96,      21 + 96, 22 + 96, 23 + 96,

            0 + 120, 1 + 120, 2 + 120,        1 + 120, 2 + 120, 3 + 120,
            4 + 120, 5 + 120, 6 + 120,        5 + 120, 6 + 120, 7 + 120,
            8 + 120, 9 + 120, 10 + 120,       9 + 120, 10 + 120, 11 + 120,
            12 + 120, 13 + 120, 14 + 120,     13 + 120, 14 + 120, 15 + 120,
            16 + 120, 17 + 120, 18 + 120,     17 + 120, 18 + 120, 19 + 120,
            20 + 120, 21 + 120, 22 + 120,      21 + 120, 22 + 120, 23 + 120,

            0 + 144, 1 + 144, 2 + 144,        1 + 144, 2 + 144, 3 + 144,
            4 + 144, 5 + 144, 6 + 144,        5 + 144, 6 + 144, 7 + 144,
            8 + 144, 9 + 144, 10 + 144,       9 + 144, 10 + 144, 11 + 144,
            12 + 144, 13 + 144, 14 + 144,     13 + 144, 14 + 144, 15 + 144,
            16 + 144, 17 + 144, 18 + 144,     17 + 144, 18 + 144, 19 + 144,
            20 + 144, 21 + 144, 22 + 144,      21 + 144, 22 + 144, 23 + 144,

            0 + 168, 1 + 168, 2 + 168,        1 + 168, 2 + 168, 3 + 168,
            4 + 168, 5 + 168, 6 + 168,        5 + 168, 6 + 168, 7 + 168,
            8 + 168, 9 + 168, 10 + 168,       9 + 168, 10 + 168, 11 + 168,
            12 + 168, 13 + 168, 14 + 168,     13 + 168, 14 + 168, 15 + 168,
            16 + 168, 17 + 168, 18 + 168,     17 + 168, 18 + 168, 19 + 168,
            20 + 168, 21 + 168, 22 + 168,      21 + 168, 22 + 168, 23 + 168,

            0 + 192, 1 + 192, 2 + 192,        1 + 192, 2 + 192, 3 + 192,
            4 + 192, 5 + 192, 6 + 192,        5 + 192, 6 + 192, 7 + 192,
            8 + 192, 9 + 192, 10 + 192,       9 + 192, 10 + 192, 11 + 192,
            12 + 192, 13 + 192, 14 + 192,     13 + 192, 14 + 192, 15 + 192,
            16 + 192, 17 + 192, 18 + 192,     17 + 192, 18 + 192, 19 + 192,
            20 + 192, 21 + 192, 22 + 192,      21 + 192, 22 + 192, 23 + 192,
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
            const vertexCount = 3*2*6*9;
            const type = gl.UNSIGNED_SHORT;
            const offset = 0;
            gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
        }
    }

    translate(deltaTime) {
        this.placed_position[2] -= this.forwardSpeed*deltaTime;

        if(this.placed_position[0] > this.leftLimit && this.move[1] == -1) {
            this.placed_position[0] -= deltaTime*this.lrSpeed;
        }
        else if(this.placed_position[0] < this.rightLimit && this.move[1] == 1) {
            this.placed_position[0] += deltaTime*this.lrSpeed;
        }
        
        if(this.placed_position[0] < this.leftLimit) {
            this.placed_position[0] = this.leftLimit;
        }
        else if(this.placed_position[0] > this.rightLimit) {
            this.placed_position[0] = this.rightLimit;
        }
    }

    attack(playerPos) {
        this.placed_position[2] = playerPos + 4
    }
}