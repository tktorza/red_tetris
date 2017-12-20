

function initialiseElem(elem) {

}

function isChock(e1, e2){
    
}

function background(dom) {
    screen.height;
    screen.width;
    let elems = [
        {type: "carre", color: colors[0], x: 2.222, y: 2.222},
        {type: "L", color: colors[1], x: 2.222, y: 2.222},
        {type: "L-inverse", color: colors[2], x: 2.222, y: 2.222},
        {type: "Z", color: colors[3], x: 2.222, y: 2.222},
        {type: "S", color: colors[4], x: 2.222, y: 2.222},
        {type: "carre", color: colors[1], x: 2.222, y: 2.222},
        {type: "S", color: colors[2], x: 2.222, y: 2.222},
        {type: "Z", color: colors[4], x: 2.222, y: 2.222},
        {type: "L-inverse", color: colors[3], x: 2.222, y: 2.222},
        {type: "S", color: colors[0], x: 2.222, y: 2.222},
        {type: "Z", color: colors[0], x: 2.222, y: 2.222},
        {type: "carre", color: colors[0], x: 2.222, y: 2.222},
        {type: "Z", color: colors[1], x: 2.222, y: 2.222},
        {type: "carre", color: colors[2], x: 2.222, y: 2.222}
    ];
    elems.map((elem, key) => {
        elem.form = initialiseElem(elem);
    });
    let dejaTest = [];
    let chock = 0;
    elems.map((elem, key) => {
        for (let i = key + 1;i < elems.length - 1;i++)
        {
             chock = isChoc(elem, elems[i]);
             chock = chock ? choc(elem, elem[chock]) : 0;
        }
    });
}