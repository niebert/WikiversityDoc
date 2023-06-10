vDataJSON.db["initdb"] = {
    "castype": "maxima",
    "title4cas": "Computer Algebra System",
    "title4commands": "Commands",
    "title4functions": "Functions",
    "title4variables": "Variables",
    "commands": [
        {
            "cmdtitle": "Plot curve2d() - Spiral",
            "cmd": "curve2d([t*cos(t),t*sin(t)],t[0,16],color[green],linewidth[3])",
            "result4cmd": "curve2d: curve2d(t)=[t \\cdot cos(t)  ,t \\cdot sin(t)  ] \\quad "
        },
        {
            "cmdtitle": "Convex Comb - K(t)",
            "cmd": "curve3d(K(t),t[0,1],color[blue],linewidth[10])",
            "result4cmd": "curve3d: K(t)=\\left(\\begin{array}{c}3 \\\\ 4 \\\\ 5\\end{array}\\right) \\cdot  (1-t)^3 +\\left(\\begin{array}{c}5 \\\\ 4 \\\\ -3\\end{array}\\right) \\cdot 3 \\cdot (1-t)^2 \\cdot t+ \\left(\\begin{array}{c}-6 \\\\ -6 \\\\ 6\\end{array}\\right) \\cdot 3 \\cdot (1-t) \\cdot t^2 +\\left(\\begin{array}{c}-3 \\\\ -7 \\\\ 0\\end{array}\\right) \\cdot t^3   \\quad "
        },
        {
            "cmdtitle": "Plot curve3d - cur(t)",
            "cmd": "curve3d(cur(t),cur(t)*2,t[0,18],color[blue],linewidth[10])",
            "result4cmd": "curve3d: cur(t)=[cos(t),sin(t),t]   \\quad  curve3d(t)=[cos(t),sin(t),t]   \\cdot 2 \\quad "
        },
        {
            "cmdtitle": "Plot3D  g(x,y)",
            "cmd": "g(x,y):=cos(x)+sin(y)\nplot3d(g(x,y),x[-5,5],y[-3,8])",
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
            "name": "cur",
            "args": "t",
            "def": "[cos(t),sin(t),t]"
        },
        {
            "name": "K",
            "args": "t",
            "def": "v1* (1-t)^3 +v2*3*(1-t)^2*t+ v3*3*(1-t)*t^2 +v4*t^3"
        }
    ],
    "casvariables": [
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
