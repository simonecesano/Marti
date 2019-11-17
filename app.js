import foo from './components/foo.js';

paper.install(window);
paper.setup('canvas');

const Foo = { template: `<div>foo</div>` }
const Bar = { template: '<div>bar</div>' }

const routes = [
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar },
]

const router = new VueRouter({
    routes: routes 
})

console.log(router);

var app = new Vue({
    el: '#app',
    router: router,
    components: {
        'Foo': httpVueLoader('./components/foo.vue')
    },
    
    data: {
	paper: paper,
	mainColor: 'rgb(230, 231, 236)',
	decorationColors: [],
	stampo: '',
	variantCount: 0,
	areaCount: 0,
	colors: [
	    "#CB7C77",
	    "#565A64",
	    "#E6E7EC",
	    "#717372",
	    "#F4F3E0",
	    "#6E7D6F",
	    "#E9D290",
	    "#7e9cb0",
	    "#9DB88F",
	    "#D7D3CF",
	    "#AA7984",
	    "#C1766D",
	    "#E5E6E2"
	],
	stampi: [
	    "decoro-gallipoli.svg",
	    "decoro-iride.svg",
	    "decoro-iris.svg",
	    "decoro-lecce.svg",
	    "decoro-narciso.svg",
	    "decoro-pompei.svg",
	    "decoro-quadratino.svg",
	    "decoro-siena.svg",
	    "diana-angolo-1.svg",
	    "diana-fascia-1.svg",
	    "edera-angolo-1.svg",
	    "edera-fascia-1.svg",
	    "penelope-angolo-1.svg",
	    "penelope-fascia-1.svg",
	    "tellus-angolo.svg",
	    "tellus-fascia.svg",
	    "tozzetto-angolo-1.svg",
	    "tozzetto-fascia-1.svg"
	]
    },
    mounted: function () {
	var app = this;
	// paper.setup('canvas');

	var canvas = document.querySelector('canvas');
	// canvas.style.width ='100%';
	// canvas.style.height='100%';
	
	// canvas.width  = canvas.offsetWidth;
	// canvas.height = canvas.offsetHeight;
    },
    methods: {
	toggleColor: function(color, add, type){
	    console.log(color, add, type)
	    if (type == 'decoration') {
		if (this.decorationColors.filter(e => { return e == color} ).length) {
		    this.decorationColors = this.decorationColors.filter(e => { return e != color} )
		} else {
		    this.decorationColors.push(color)
		}
	    } else if (type == 'main') {
		this.mainColor = color
	    }
	},
	toggleTile: function(tile){
	    this.stampo = tile;
	},
	makeVars: function(){
	    var combinations = Combinatorics.baseN(this.decorationColors, 4);
	    console.log('making vars')
	    console.log(combinations.length)
	    console.log(this.stampo);
	    $.get('stampi/' + this.stampo)
		.then(svg => {
		    var s = paper.project.importSVG(svg);

		    console.log('area', s.bounds.area);
		    // areas of tile
		    var areas = [];
		    s.getItems({ recursive: true }).filter(i => {
			// console.log(i.fillColor.toCSS(true));
			return (i.fillColor) && (Math.abs(i.area) > 100);
		    }).forEach(i => {
			console.log('color', i.fillColor.toCSS(true));
			areas.push({ item: i, area: Math.abs(i.area), color: i.fillColor.toCSS(true) });
		    })
		    console.log(areas.sort((a, b) => { return b.area - a.area }))

		    // filling in

		    console.log('areas', areas.length);
		    var combinations = Combinatorics.baseN(this.decorationColors, areas.length);
		    var seen = {};


		    console.log('combinations', combinations.length);

		    this.variantCount = combinations.length;
		    this.areaCount    = areas.length;

		    // for (var k = 0; k < combinations.length; k++) {
		    // 	var c = combinations.next()
			
		    // 	seen[c.join(':')] = seen[c.join(':')] ? seen[c.join(':')] + 1 : 1;
			
		    // 	if (seen[c.join(':')] == 1) {
		    // 	    // filled.forEach((e, i) => { e.setAttribute('fill', c.shift()) })
		    // 	    areas.forEach(a => { a.item.fillColor = c.shift() })
		    // 	    console.log(s.exportSVG({ asString: true }));
		    // 	}
		    // }
		})
	}
    },
    watch: {

    }
})
		  
		  
