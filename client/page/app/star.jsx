import React from "react";
import { PerspectiveCamera, Scene, WebGLRenderer, PointsMaterial, Vector3, Points, Geometry } from '../../vendor/three.js';
import Stats from '../../vendor/stats.js';

class Star extends React.Component {
    constructor() {
        super();

        this.state = {
            scene: new Scene(),
            camera: new PerspectiveCamera(35, window.innerWidth/window.innerHeight, 2, 4000),
            starsGeometry: new Geometry(),
            renderer: new WebGLRenderer(),
            mouseX: 0,
            mouseY: 0
        }
        this.animate = this.animate.bind(this);
    }
    componentDidMount() {
        const { scene, camera, renderer} = this.state;
        this.init();
        this.makeMaterial();
        this.animate();
        // document.addEventListener('mousemove', this.update, false);
        // setInterval(this.update, 1000/30);
    }
    init() {
        const { camera, scene ,renderer} = this.state;
        camera.position.z = 1000;
        scene.add(camera);

        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.setClearColor(0xdddddd, 0.9);
        document.body.appendChild( renderer.domElement );
        
    }
    makeMaterial() {
        const { starsGeometry, scene } = this.state;
        // 将z坐标从-1000（最远处）逐步增加至1000（相机所在处）
        // 每一个位置加入一个随机的粒子
        for (var zpos = -1000; zpos < 1000; zpos += 0.5) {

            var star = new Vector3();
            star.x = window.Math.random() * 1000 - 500;//随机位置
            star.y = window.Math.random() * 1000 - 500;
            star.z = window.Math.random() * 1000 - 500;
            starsGeometry.vertices.push( star );
            
        } 
        var starsMaterial = new PointsMaterial({ size: 5, sizeAttenuation: true, alphaTest: 0.5, transparent: true, opacity: .8 })
        // starsMaterial.color.setHSL( 1.0, 1, 0.9 );
        var starField = new Points( starsGeometry, starsMaterial );

        // 把它加入到场景中
        scene.add(starField);
        
    }
    getRandomColor() {
        var r = 255*Math.random()|0,
            g = 255*Math.random()|0,
            b = 255*Math.random()|0;
        // return 'rgb(' + r + ',' + g + ',' + b + ')';
        return '0x' + parseInt(r, 16) + parseInt(g, 16) + parseInt( b, 16);
    }
    renderMaterial() {
        const { camera, scene, mouseX, mouseY, starsGeometry , renderer} = this.state;
        // const { materials } = starsGeometry.vertices;
        var time = Date.now() * 0.00005;
        camera.position.x += ( mouseX - camera.position.x ) * 0.05;
        camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
        camera.lookAt( scene.position );
        for ( var i = 0; i < scene.children.length; i ++ ) {
            var object = scene.children[ i ];
            if ( object instanceof Points ) {
                object.rotation.y = time * ( i < 4 ? i + 1 : - ( i + 1 ) );
            }
        }
        // for ( var i = 0; i < materials.length; i ++ ) {
        //     var color = parameters[ i ][ 0 ];
        //     var h = ( 360 * ( color[ 0 ] + time ) % 360 ) / 360;
        //     materials[ i ].color.setHSL( h, color[ 1 ], color[ 2 ] );
        // }
        renderer.render( scene, camera );
    }
    animate() {
        requestAnimationFrame( this.animate );
        this.renderMaterial();
    }
    render() {
        
        return <div></div>
    }
}

export default Star;
