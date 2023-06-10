vDataJSON.initdb ={
    "castype": "maxima",
    "title4cas": "Computer Algebra System",
    "title4commands": "Commands",
    "title4functions": "Functions",
    "title4variables": "Variables",
    "commands": [
        {
            "cmdtitle": "Define Function g(x,y)",
            "cmd": "g(x,y):=(cos(x/3)+sin(y/3)+2 + 1/(1+((x-1)/2)^2+((y+1)/2)^2) + 2/(1+((x+4.5)/1)^2+((y+3.6)/1)^2) - 1/(1+((x-4.4)/2)^2+((y-3.0)/2)^2)  - 2/(1+((x-0.2)/2)^2+((y-3.6)/2)^2) )/4",
            "result4cmd": "g(x,y):=0.5+0.25cos(0.333333...x)+\\frac{0.25}{(1.5-0.5x+0.5y+0.25x^2+0.25y^2)}-\\frac{0.5}{(4.25-0.1x-1.8y+0.25x^2+0.25y^2)}-\\frac{0.25}{(8.09-2.2x-1.5y+0.25x^2+0.25y^2)}+\\frac{0.5}{(34.21+9.0x+7.2y+1.0x^2+1.0y^2)}+0.25sin(0.333333...y)"
        },
        {
            "cmdtitle": "Plot3D g(x,y)",
            "cmd": "plot3d(g(x,y),x[-5,5],y[-4,6])",
            "result4cmd": "plot3d: g(x,y)=(cos(x/3)+sin(y/3)+2 + 1/(1+((x-1)/2)^2+((y+1)/2)^2) + 2/(1+((x+4.5)/1)^2+((y+3.6)/1)^2) - 1/(1+((x-4.4)/2)^2+((y-3.0)/2)^2)  - 2/(1+((x-0.2)/2)^2+((y-3.6)/2)^2) )/4   \\quad "
        }
    ],
    "casfunctions": [
        {
            "name": "g",
            "args": "x,y",
            "def": "(cos(x/3)+sin(y/3)+2 + 1/(1+((x-1)/2)^2+((y+1)/2)^2) + 2/(1+((x+4.5)/1)^2+((y+3.6)/1)^2) - 1/(1+((x-4.4)/2)^2+((y-3.0)/2)^2)  - 2/(1+((x-0.2)/2)^2+((y-3.6)/2)^2) )/4"
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
            "name": "f_1",
            "args": "t",
            "def": "sin(t)^4-2*cos(t/2)^3*sin(t)"
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
