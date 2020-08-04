let min = 99;
let max = 999999;
let polygonMode = true;
let pointArray = [];
let lineArray = [];
let activeLine;
let activeShape = false;
let canvas;

$(window).on('load', function () {
    prototypefabric.initCanvas();
    $('#create-polygon').click(function () {
        prototypefabric.polygon.drawPolygon();
    });
});

let prototypefabric = new function () {
    this.initCanvas = function () {
        canvas = window._canvas = new fabric.Canvas('c');
        canvas.setWidth($(window).width());
        canvas.setHeight($(window).height() - $('#nav-bar').height());
        //canvas.selection = false;

        canvas.on('mouse:down', function (options) {
            if (options.target && options.target.id === pointArray[0].id) {
                prototypefabric.polygon.generatePolygon(pointArray);
            }
            if (polygonMode) {
                prototypefabric.polygon.addPoint(options);
            }
        });
        canvas.on('mouse:up', function (options) {

        });
        canvas.on('mouse:move', function (options) {
            if (activeLine && activeLine.class === "line") {
                let pointer = canvas.getPointer(options.e);
                activeLine.set({ x2: pointer.x, y2: pointer.y });

                let points = activeShape.get("points");
                points[pointArray.length] = {
                    x: pointer.x,
                    y: pointer.y
                }
                activeShape.set({
                    points: points
                });
                canvas.renderAll();
            }
            canvas.renderAll();
        });
    };
};
