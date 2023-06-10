vDataJSON.db['derivatives'] = {
  "castype": "maxima",
  "title4cas": "Computer Algebra System",
  "title4commands": "Commands",
  "title4functions": "Functions",
  "title4variables": "Variables",
  "commands": [
    {
      "cmdtitle": "Derivative x^2+3x",
      "cmd": "d(x^2+3x)",
      "result4cmd": ""
    },
    {
      "cmdtitle": "Partial Derivative g(x,y) ",
      "cmd": "g(x,y)\nd(g(x,y),y)",
      "result4cmd": ""
    },
    {
      "cmdtitle": "Gradient r(x,y)",
      "cmd": "r(x,y):=sqrt(x^2+y^2)\nd(r(x,y),[x,y])",
      "result4cmd": ""
    }
  ],
  "casfunctions": [
    {
      "name": "g",
      "args": "x,y",
      "def": "x^3+y^2"
    },
    {
      "name": "f",
      "args": "x",
      "def": "x^5"
    },
    {
      "name": "h",
      "args": "x",
      "def": "10*sin(x)"
    },
    {
      "name": "cur",
      "args": "t",
      "def": "[cos(t),sin(t),t]"
    },
    {
      "name": "K",
      "args": "t",
      "def": "v1* (1-t)^3 +v2*3*(1-t)^2*t+ v3*3*(1-t)*t^2 +v4*t^3"
    },
    {
      "name": "r",
      "args": "x,y",
      "def": "sqrt(x^2+y^2)"
    }
  ],
  "casvariables": [
    {
      "name": "c1",
      "def": "12!"
    },
    {
      "name": "c2",
      "def": "23^5-4+sin(13)"
    },
    {
      "name": "c3",
      "def": "f1(x)"
    },
    {
      "name": "v1",
      "def": "[3,4,5]"
    },
    {
      "name": "v2",
      "def": "[5,4,-3]"
    },
    {
      "name": "v3",
      "def": "[-6,-6,6]"
    },
    {
      "name": "v4",
      "def": "[-3,-7,0]"
    }
  ]
}
