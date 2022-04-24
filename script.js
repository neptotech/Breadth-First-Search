Time1 = Date.now();
var Maze = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], //1
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1], //2
  [1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1], //3
  [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1], //4
  [1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1], //5
  [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1], //6
  [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1], //7
  [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1], //8
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1], //9
  [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1], //10
  [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1], //11
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //12
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], //13
];

/*var Maze = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //1
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //2
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //3
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //4
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //5
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //6
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //7
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //8
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //9
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //10
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //11
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //12
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //13
];*/
sx = 1;
sy = 2;

ex = 13;
ey = 12;

cx = sx;
cy = sy;
visited = [];
visited.push([sx, sy]);
var CurrentCellList = [];

var Text, Doc;
Text =
  `
<Cell class="x:` +
  sx +
  ` y:` +
  sy +
  ` root">
</Cell>
`;

Doc = new DOMParser().parseFromString(Text, 'text/xml');

const ArrayIncludes = (data, arr) => {
  return data.some(
    (e) => Array.isArray(e) && e.every((o, i) => Object.is(arr[i], o))
  );
};
function Uniqer(array) {
  let OutArray = [];
  array.forEach((c) => {
    if (!ArrayIncludes(OutArray, c) && !ArrayIncludes(visited, c)) {
      OutArray.push(c);
    }
  });
  return OutArray;
}
function GetByXY(x, y) {
  var k = Doc.getElementsByClassName('x:' + x + ' y:' + y)[0];
  return k == undefined ? false : k;
}
function AddTo(parent, x, y) {
  parent.innerHTML +=
    `<Cell class="x:` +
    x +
    ` y:` +
    y +
    `">
  </Cell>
  `;
}
function Tree(x, y) {
  k = Doc.getElementsByClassName('x:' + x + ' y:' + y)[0];
  var tree = [];
  tree.unshift(k.classList[0] + ' ' + k.classList[1]);
  do {
    k = k.parentNode;
    tree.unshift(k.classList[0] + ' ' + k.classList[1]);
  } while (k.parentNode.location === undefined);
  return tree;
}

function AvailableMoveCell(x, y) {
  y--;
  x--;
  cell = Maze[y][x];
  resultList = [];
  if (!(y == 0) && Maze[y - 1][x] == 0) {
    resultList.push([x + 1, y - 1 + 1]);
  }

  if (!(x == Maze[y].length - 1) && Maze[y][x + 1] == 0) {
    resultList.push([x + 1 + 1, y + 1]);
  }

  if (!(y == Maze.length - 1) && Maze[y + 1][x] == 0) {
    resultList.push([x + 1, y + 1 + 1]);
  }

  if (!(x == 0) && Maze[y][x - 1] == 0) {
    resultList.push([x - 1 + 1, y + 1]);
  }
  return resultList;
} //Up|Right|Down|Left [[x,y],[x,y],[x,y],[x,y]]

CurrentCellList = AvailableMoveCell(sx, sy);
CurrentCellList.forEach(function (NewElement) {
  nx = NewElement[0];
  ny = NewElement[1];
  AddTo(GetByXY(sx, sy), nx, ny);
});
do {
  CurrentCellList.forEach(function (VisitedElement) {
    visited.push(VisitedElement);
  });

  CopyCellList = [];
  CurrentCellList.forEach(function (element) {
    cx = element[0];
    cy = element[1];
    CopyCellList = CopyCellList.concat(AvailableMoveCell(cx, cy));
    Uniqer(AvailableMoveCell(cx, cy)).forEach(function (NewElement) {
      nx = NewElement[0];
      ny = NewElement[1];
      AddTo(GetByXY(cx, cy), nx, ny);
    });
  });
  CurrentCellList = CopyCellList;

  CurrentCellList = Uniqer(CurrentCellList);
} while (!ArrayIncludes(CurrentCellList, [ex, ey]));

function LogXML() {
  console.log(GetByXY(sx, sy).outerHTML);
}

Time2 = Date.now();
console.log(
  Tree(ex, ey).join('\n\n') + '\n\n' + (Time2 - Time1 + ' Millisecond(s)')
);
/*document.body.innerHTML+="<br>"+Tree(ex,ey).join("<br>")+"<br>"+(Time2 - Tim1 + ' Millisecond(s)');*/
