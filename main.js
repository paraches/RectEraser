var page = MOON.getCurrentPage();
var backing = page.backing;
var paperJSON = MOON.getPaperJSON(backing);

var strokes = paperJSON.strokes;
var strokeSize = strokes.length;
if (strokeSize<3) {
    MOON.finish();
}

var rectLeft = strokes[strokeSize-2].data[0];
var rectTop = strokes[strokeSize-2].data[1];
var rectRight = strokes[strokeSize-1].data[0];
var rectBottom = strokes[strokeSize-1].data[1];
if (rectLeft>rectRight) {
    rectLeft = strokes[strokeSize-1].data[0];
    rectRight = strokes[strokeSize-2].data[0];
}
if (rectTop>rectBottom) {
    rectTop = strokes[strokeSize-1].data[1];
    rectBottom = strokes[strokeSize-2].data[1];
}

function inRect(x,y) {
    if ((x<rectLeft) || (rectRight<x) || (y<rectTop) || (rectBottom<y)) {
        return false;
    }
    else {
        return true;
    }
}

function copyEmptyStroke(oStroke) {
    var lineWidth = oStroke.width;
    var lineColor = oStroke.color;
    var lineType = oStroke.type;
    var cStroke = {width:lineWidth,color:lineColor,type:lineType,data:[]};
    return cStroke;
}

var newStrokes = [];
for (var index = 0; index<strokeSize-2; index++) {
    var stroke = strokes[index];
    var strokeData = stroke.data;
    var newStroke = copyEmptyStroke(stroke);
    var newData = newStroke.data;
    var pointCount = strokeData.length / 3;
    var eraseArea = false;
    for (var pointIndex=0; pointIndex<pointCount; pointIndex++) {
        var x = strokeData[pointIndex*3];
        var y = strokeData[pointIndex*3+1];
        var p = strokeData[pointIndex*3+2];
        if (inRect(x,y)) {
            if (eraseArea) {
            }
            else {
                if (newData.length!=0) {
                    newStroke.data = newData;
                    newStrokes.push(newStroke);
                }
                newStroke = copyEmptyStroke(stroke);
                newData = newStroke.data;
                eraseArea = true;
            }
        }
        else {
            eraseArea = false;
            newData.push(x);
            newData.push(y);
            newData.push(p);
        }
    }
    if (newStroke.data.length!=0) {
        newStrokes.push(newStroke);
    }
}
paperJSON.strokes = newStrokes;

MOON.setPaperJSON(backing,paperJSON);

MOON.finish();
