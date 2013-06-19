    /*
        Adam Gillfillan
        ORNL csVIZ
        Cyber Security Visualization

    */

    /*
        TODO:
            -Put viz in different div than "body"
                -this allows for separate div inside of body to be used for displaying data
            -Fit the RADAR inside of div circle, no matter the scale, etc.
                -Perhaps need to figure out a multiplier for w, h, xmin, xmax variables

    */
    var loadcsVIZ = function(){
        doAll();
    }

    var doAll = function(){

    /****   VARIABLES   ****/
    
    var 
        w = 1500, //width and height of viz
        h = 1500,

    //variables for scaling.
        xmin = -1.5
        xmax = 3.5
        ymin = -h * (xmax - xmin) / w / 2
        ymax = -ymin
        time = 1.575  //DO NOT CHANGE //start the radar line at 12 o'clock
        FIXED_TIME = 1.575 // DO NOT CHANGe

        xScale  = d3.scale.linear()
        yScale  = d3.scale.linear()

        magicBoundaryNum       = 385       //Distance Formula Magic Number
        MAGIC_CIRCLE_DATA_SPOT = 145       //constant for position (max, min) of circle data points
        RADIAN_CHANGE          = 0.00872664625  //DO NOT CHANGE   //constants for drawing time
        REFRESH_TIME           = 10
        timer                  = 0 //(seconds) counts # of cycles through update()

        CIRCLE_COLOR         = "red"
        CIRCLE_SIZE          =  "3"
        CHANGED_CIRCLE_COLOR = "orange"

        RADAR_CIRCLE_FILL         = "white"
        RADAR_CIRCLE_STROKE_COLOR = "green"
        RADAR_CIRCLE_STROKE_WIDTH = 3

        RADAR_COLOR = "black"
        RADAR_WIDTH = 4;


    xScale
        .domain([xmin, xmax])
        .range([0, w]);
    yScale
        .domain([ymin, ymax])
        .range([0, h]);


    /*

    //Dynamic, random dataset
    var dataset = [];
    var numDataPoints = 1000;
    var xRange = Math.random() * 1000;
    var yRange = Math.random() * 1000;
    for (var i = 0; i < numDataPoints; i++) {
        var newNumber1 = Math.round(Math.random() * 1000);
        var newNumber2 = Math.round(Math.random() * 1000);
        //alert(newNumber1);

        //Distance Formula
        var placeA = ((xPosn - newNumber1)*(xPosn - newNumber1));
        var placeB = ((yPosn - newNumber2)*(yPosn - newNumber2));
        var resultant = (Math.sqrt(placeA + placeB));

        if (resultant < magicBoundaryNum){
        	dataset.push([newNumber1, newNumber2]);
        }
    }
    */

    var dataset = [
            { "x_axis": 430, "y_axis": 430, "radius": 10, "color" : "green" },
    		{ "x_axis": 270, "y_axis": 70, "radius": 10, "color" : "purple"},
    		{ "x_axis": 210, "y_axis": 100, "radius": 10, "color" : "red"}
    		];

	var realDataset = [
    	{
    		"timestamp": "3",
    		"likelihood": 99,
    		"src_ip_addr": "10.78.25.209",
    		"dst_ip_addr": "183.60.18.111",
    		"src_port": 51843,
    		"dst_port": 8000,
            "color": "white"
        },
        {
            "timestamp": "235",
            "likelihood": 50.376498662489468,
            "src_ip_addr": "10.78.25.209",
            "dst_ip_addr": "183.60.18.111",
            "src_port": 51843,
            "dst_port": 8000,
            "color": "white"
        },
        {
            "timestamp": "235",
            "likelihood": 1,
            "src_ip_addr": "10.78.25.209",
            "dst_ip_addr": "183.60.18.111",
            "src_port": 51843,
            "dst_port": 8000,
            "color": "white"
        }
    ];


    //Create SVG element
    var svg = d3.select("body")
    			.append("svg")
    			.attr("width", w)
    			.attr("height", h)
                .attr("class", "trig");


    //Define the invisible clipping path / mask circle
    svg.append("clipPath")
    	.attr("id", "chart-area")
    	.append("circle")
    	.attr("cx", xScale(0))
    	.attr("cy", yScale(0))
    	.attr("r", xScale(1) - xScale(0));

    //VISIBLE RADAR CIRCLE
    //PERHAPS ONLY FOR TESTING
    var radarCircle = svg.append("circle");
    var radarCircleAttributes = radarCircle
        .attr({
            cx: xScale(0),
            cy: yScale(0),
            r: xScale(1) - xScale(0),
            stroke: RADAR_CIRCLE_STROKE_COLOR,
            fill: RADAR_CIRCLE_FILL,
            "stroke-width": RADAR_CIRCLE_STROKE_WIDTH
        });


    /*----------CLIPPING PATH + SVG CIRCLES + ATTRIBUTES + MOUSE EVENTS----------*/

    //append all the circles in a group to the clip path.
    var clippingPath = svg.append("g")
        .attr("id", "circles")
        .attr("clip-path", "url(#chart-area)");

    //bind the dataset to SVG circles
    var circles = clippingPath   
        .selectAll("circle")
        .data(realDataset)
        .enter()
        .append("circle");

    //All the attributes for the circles
    //position the x and y based on the 'likelihood' of an alert.
    var circleAttributes = circles
    	.attr({
    	    cx:   function(d) { return xScale(d.likelihood / MAGIC_CIRCLE_DATA_SPOT); },
    	    cy:   function(d) { return yScale(d.likelihood / MAGIC_CIRCLE_DATA_SPOT); },
    	    r:    CIRCLE_SIZE, //function(d) { return d.radius; },
    	    fill: CIRCLE_COLOR //function(d) { return d.color;  }
    	});

    //event listeners
    var mouseEvents = circleAttributes
    	.on("click", function(){
            alert("Sup bro!");
        })
        .on("mouseover", function(){
            d3.select(this)
                .attr("fill", CHANGED_CIRCLE_COLOR);
        })
        .on("mouseout", function(){
            d3.select(this)
                .transition()
                .duration(250)
                .attr("fill", CIRCLE_COLOR);
        })

        //Tooltip
        .append("title")
        .text(function(d) {
            return d;
        });



    /*

        KEY NUMBERS:
            12 minutes =
                720 seconds
                720,000 milliseconds
            1 minute =
                60 seconds
                60,000 milliseconds

            Every 1 second is 1000 milliseconds

    */
    //RADAR LINE INITILIZE

    var radarLine = svg.append("line");
    var radarLineAttributes = radarLine
        .attr({
            x1: xScale(0),
            y1: yScale(0),
            x2: xScale(0),
            y2: yScale(0),
            "stroke-width": RADAR_WIDTH,
            stroke: RADAR_COLOR
        });

    /*
    var compareTime = function(d){
        while (1){
            alert(d3.selectAll("circles")d.timestamp);
        }

    };

    compareTime();
    */

    var update = setInterval(function() {
        var xPosn = xScale(-Math.cos(time));
        var yPosn = yScale(-Math.sin(time));
        radarLineAttributes
            .attr({
                x2: xPosn,
                y2: yPosn,
            });

        //if(timer == realDataset.timestamp) alert("Hi");
        circleAttributes
            .attr({
                //cx: function(d) { return xPosn },
                cx: function(d) { if (timer >= d.timestamp){ 
                    return xScale(-Math.cos((FIXED_TIME + (RADIAN_CHANGE * d.timestamp))) * ((d.likelihood/110) +.08))
                                    } 
                                },
                cy: function(d) { if (timer >= d.timestamp){ 
                                    if ((timer - 719) >= d.timestamp) { return 10000 }
                                  return yScale(-Math.sin((FIXED_TIME + (RADIAN_CHANGE * d.timestamp))) * ((d.likelihood/110) + .08))
                                    }
                                }
                /*fill: function(d) { if (timer >= (d.timestamp + 10)) { return d.color }
                                 }*/
                });
            /*
        var helperFunc = function(d) {
                if (timer >= (d.timestamp + 10))


        }
        */

        time  += RADIAN_CHANGE;
        timer++;
        //alert(timer);
    }, REFRESH_TIME);

    

    };



