
// ---------------------------------------
// --- Math4JS ---------------------------
// ---------------------------------------
// --- Version:   2.4.2
// --- Date/Time: 2023/01/28 18:38:38
// ---------------------------------------
/* Package Name: math4js
 * Based on Mathematical Expression Parser by  Matthew Crumley - "silentmatt" (GitHub User Name)- https://github.com/silentmatt/expr-eval.git
 * Released under the MIT license
 *
 * Created: 2022/11/22
 * Build:   2023/01/28 18:38:38
 * Repository of current build: https://github.com/niebert/WikiversityDoc
 *
 * This repository is used for educational purpose for the Wikiversity Learning resource
 * https://en.wikiversity.org/wiki/AppLSAC
 */

// Configuration Code:
// the configuration code will be used to create some constants


function Math4JS () {
  var TEOF = 'TEOF';
  var TOP = 'TOP';
  var TNUMBER = 'TNUMBER';
  var TSTRING = 'TSTRING';
  var TPAREN = 'TPAREN';
  var TBRACKET = 'TBRACKET';
  var TCOMMA = 'TCOMMA';
  var TNAME = 'TNAME';
  var TSEMICOLON = 'TSEMICOLON';

function Parser4MathJS(options) {
  this.options = options || {};
  this.unaryOps = {
    sin: Math.sin,
    cos: Math.cos,
    tan: Math.tan,
    asin: Math.asin,
    acos: Math.acos,
    atan: Math.atan,
    sinh: Math.sinh || sinh,
    cosh: Math.cosh || cosh,
    tanh: Math.tanh || tanh,
    asinh: Math.asinh || asinh,
    acosh: Math.acosh || acosh,
    atanh: Math.atanh || atanh,
    sqrt: Math.sqrt,
    cbrt: Math.cbrt || cbrt,
    log: Math.log,
    log2: Math.log2 || log2,
    ln: Math.log,
    lg: Math.log10 || log10,
    log10: Math.log10 || log10,
    expm1: Math.expm1 || expm1,
    log1p: Math.log1p || log1p,
    abs: Math.abs,
    ceil: Math.ceil,
    floor: Math.floor,
    round: Math.round,
    trunc: Math.trunc || trunc,
    '-': neg,
    '+': Number,
    exp: Math.exp,
    not: not,
    length: stringOrArrayLength,
    '!': factorial,
    sign: Math.sign || sign
  };

  this.binaryOps = {
    '+': add,
    '-': sub,
    '*': mul,
    '/': div,
    '%': mod,
    '^': Math.pow,
    '||': concat,
    '==': equal,
    '!=': notEqual,
    '>': greaterThan,
    '<': lessThan,
    '>=': greaterThanEqual,
    '<=': lessThanEqual,
    and: andOperator,
    or: orOperator,
    'in': inOperator,
    '=': setVar,
    '[': arrayIndex
  };

  this.ternaryOps = {
    '?': condition
  };

  this.functions = {
    random: random,
    fac: factorial,
    min: min,
    max: max,
    hypot: Math.hypot || hypot,
    pyt: Math.hypot || hypot, 
    pow: Math.pow,
    atan2: Math.atan2,
    'if': condition,
    gamma: gamma,
    roundTo: roundTo,
    map: arrayMap,
    fold: arrayFold,
    filter: arrayFilter,
    indexOf: stringOrArrayIndexOf,
    join: arrayJoin,
    sum: sum
  };

  this.consts = {
    E: Math.E,
    PI: Math.PI,
    'true': true,
    'false': false
  };
}

Parser4MathJS.prototype.parse = function (expr) {
  var instr = [];
  var parserState = new ParserState4MathJS(
    this,
    new TokenStream4MathJS(this, expr),
    { allowMemberAccess: this.options.allowMemberAccess }
  );

  parserState.parseExpression(instr);
  parserState.expect(TEOF, 'EOF');

   var tokens = new Expression4MathJS(instr, this);
   return tokens;
};

Parser4MathJS.prototype.simplify = function (expr, variables) {
  
  var tokens = this.parse(expr);
  expr = tokens.toSimplified();
  return expr;
};

Parser4MathJS.prototype.evaluate = function (expr, variables) {
  
  var tokens = this.parse(expr);
  return tokens.evaluate(variables);
};

Parser4MathJS.prototype.evaluate4array = function (expr,vname,arr4val) {
  var tokens = this.parse(expr);
  return tokens.evaluate4array(vname,arr4val);
};

Parser4MathJS.prototype.evaluate4array2d = function (expr,vname1,vname2,arr1,arr2) {
  var tokens = this.parse(expr);
  
  return tokens.evaluate4array2d(vname1,vname2,arr1,arr2);
}

Parser4MathJS.prototype.evaluate4array3d = function (expr,vname1,vname2,vnam3,arr1,arr2,arr3) {
  var tokens = this.parse(expr);
  
  return tokens.evaluate4array3d(vname1,vname2,vname3,arr1,arr2,arr3);
}

var sharedParser = new Parser4MathJS();

Parser4MathJS.parse = function (expr) {
  return sharedParser.parse(expr);
};

Parser4MathJS.evaluate = function (expr, variables) {
  return sharedParser.parse(expr).evaluate(variables);
};

Parser4MathJS.evaluate4array = function (expr,vname,arr4val) {
  return sharedParser.parse(expr).evaluate4array(expr,vname,arr4val);
};

Parser4MathJS.evaluate4array2d = function (expr,vname1,vname2,arr1,arr2) {
  return sharedParser.parse(expr).evaluate4array2d(vname1,vname2,arr1,arr2);
}

Parser4MathJS.evaluate4array3d = function (expr,vname1,vname2,arr1,arr2) {
  return sharedParser.parse(expr).evaluate4array3d(vname1,vname2,vname3,arr1,arr2,arr3);
}

var optionNameMap = {
  '+': 'add',
  '-': 'subtract',
  '*': 'multiply',
  '/': 'divide',
  '%': 'remainder',
  '^': 'power',
  '!': 'factorial',
  '<': 'comparison',
  '>': 'comparison',
  '<=': 'comparison',
  '>=': 'comparison',
  '==': 'comparison',
  '!=': 'comparison',
  '||': 'concatenate',
  'and': 'logical',
  'or': 'logical',
  'not': 'logical',
  '?': 'conditional',
  ':': 'conditional',
  '=': 'assignment',
  '[': 'array',
  '()=': 'fndef'
};

Parser4MathJS.prototype.getOptionName = function (op) {
  return optionNameMap.hasOwnProperty(op) ? optionNameMap[op] : op;
}

Parser4MathJS.prototype.isOperatorEnabled = function (op) {
  var optionName = this.getOptionName(op);
  var operators = this.options.operators || {};

  return !(optionName in operators) || !!operators[optionName];
};

function ParserState4MathJS(parser, tokenStream, options) {
  this.parser = parser;
  this.tokens = tokenStream;
  this.current = null;
  this.nextToken = null;
  this.next();
  this.savedCurrent = null;
  this.savedNextToken = null;
  this.allowMemberAccess = options.allowMemberAccess !== false;
}

ParserState4MathJS.prototype.next = function () {
  this.current = this.nextToken;
  return (this.nextToken = this.tokens.next());
};

ParserState4MathJS.prototype.tokenMatches = function (token, value) {
  if (typeof value === 'undefined') {
    return true;
  } else if (Array.isArray(value)) {
    return contains(value, token.value);
  } else if (typeof value === 'function') {
    return value(token);
  } else {
    return token.value === value;
  }
};

ParserState4MathJS.prototype.save = function () {
  this.savedCurrent = this.current;
  this.savedNextToken = this.nextToken;
  this.tokens.save();
};

ParserState4MathJS.prototype.restore = function () {
  this.tokens.restore();
  this.current = this.savedCurrent;
  this.nextToken = this.savedNextToken;
};

ParserState4MathJS.prototype.accept = function (type, value) {
  if (this.nextToken.type === type && this.tokenMatches(this.nextToken, value)) {
    this.next();
    return true;
  }
  return false;
};

ParserState4MathJS.prototype.expect = function (type, value) {
  if (!this.accept(type, value)) {
    var coords = this.tokens.getCoordinates();
    throw new Error('parse error [' + coords.line + ':' + coords.column + ']: Expected ' + (value || type));
  }
};

ParserState4MathJS.prototype.parseAtom = function (instr) {
  var unaryOps = this.tokens.unaryOps;
  function isPrefixOperator(token) {
    return token.value in unaryOps;
  }

  if (this.accept(TNAME) || this.accept(TOP, isPrefixOperator)) {
    instr.push(new Instruction4MathJS(IVAR, this.current.value));
  } else if (this.accept(TNUMBER)) {
    instr.push(new Instruction4MathJS(INUMBER, this.current.value));
  } else if (this.accept(TSTRING)) {
    instr.push(new Instruction4MathJS(INUMBER, this.current.value));
  } else if (this.accept(TPAREN, '(')) {
    this.parseExpression(instr);
    this.expect(TPAREN, ')');
  } else if (this.accept(TBRACKET, '[')) {
    if (this.accept(TBRACKET, ']')) {
      instr.push(new Instruction4MathJS(IARRAY, 0));
    } else {
      var argCount = this.parseArrayList(instr);
      instr.push(new Instruction4MathJS(IARRAY, argCount));
    }
  } else {
    throw new Error('unexpected ' + this.nextToken);
  }
};

ParserState4MathJS.prototype.parseExpression = function (instr) {
  var exprInstr = [];
  if (this.parseUntilEndStatement(instr, exprInstr)) {
    return;
  }
  this.parseVariableAssignmentExpression(exprInstr);
  if (this.parseUntilEndStatement(instr, exprInstr)) {
    return;
  }
  this.pushExpression(instr, exprInstr);
};

ParserState4MathJS.prototype.pushExpression = function (instr, exprInstr) {
  for (var i = 0, len = exprInstr.length; i < len; i++) {
    instr.push(exprInstr[i]);
  }
};

ParserState4MathJS.prototype.parseUntilEndStatement = function (instr, exprInstr) {
  if (!this.accept(TSEMICOLON)) return false;
  if (this.nextToken && this.nextToken.type !== TEOF && !(this.nextToken.type === TPAREN && this.nextToken.value === ')')) {
    exprInstr.push(new Instruction4MathJS(IENDSTATEMENT));
  }
  if (this.nextToken.type !== TEOF) {
    this.parseExpression(exprInstr);
  }
  instr.push(new Instruction4MathJS(IEXPR, exprInstr));
  return true;
};

ParserState4MathJS.prototype.parseArrayList = function (instr) {
  var argCount = 0;

  while (!this.accept(TBRACKET, ']')) {
    this.parseExpression(instr);
    ++argCount;
    while (this.accept(TCOMMA)) {
      this.parseExpression(instr);
      ++argCount;
    }
  }

  return argCount;
};

ParserState4MathJS.prototype.parseVariableAssignmentExpression = function (instr) {
  this.parseConditionalExpression(instr);
  while (this.accept(TOP, '=')) {
    var varName = instr.pop();
    var varValue = [];
    var lastInstrIndex = instr.length - 1;
    if (varName.type === IFUNCALL) {
      if (!this.tokens.isOperatorEnabled('()=')) {
        throw new Error('function definition is not permitted');
      }
      for (var i = 0, len = varName.value + 1; i < len; i++) {
        var index = lastInstrIndex - i;
        if (instr[index].type === IVAR) {
          instr[index] = new Instruction4MathJS(IVARNAME, instr[index].value);
        }
      }
      this.parseVariableAssignmentExpression(varValue);
      instr.push(new Instruction4MathJS(IEXPR, varValue));
      instr.push(new Instruction4MathJS(IFUNDEF, varName.value));
      continue;
    }
    if (varName.type !== IVAR && varName.type !== IMEMBER) {
      throw new Error('expected variable for assignment');
    }
    this.parseVariableAssignmentExpression(varValue);
    instr.push(new Instruction4MathJS(IVARNAME, varName.value));
    instr.push(new Instruction4MathJS(IEXPR, varValue));
    instr.push(binaryInstruction('='));
  }
};

ParserState4MathJS.prototype.parseConditionalExpression = function (instr) {
  this.parseOrExpression(instr);
  while (this.accept(TOP, '?')) {
    var trueBranch = [];
    var falseBranch = [];
    this.parseConditionalExpression(trueBranch);
    this.expect(TOP, ':');
    this.parseConditionalExpression(falseBranch);
    instr.push(new Instruction4MathJS(IEXPR, trueBranch));
    instr.push(new Instruction4MathJS(IEXPR, falseBranch));
    instr.push(ternaryInstruction('?'));
  }
};

ParserState4MathJS.prototype.parseOrExpression = function (instr) {
  this.parseAndExpression(instr);
  while (this.accept(TOP, 'or')) {
    var falseBranch = [];
    this.parseAndExpression(falseBranch);
    instr.push(new Instruction4MathJS(IEXPR, falseBranch));
    instr.push(binaryInstruction('or'));
  }
};

ParserState4MathJS.prototype.parseAndExpression = function (instr) {
  this.parseComparison(instr);
  while (this.accept(TOP, 'and')) {
    var trueBranch = [];
    this.parseComparison(trueBranch);
    instr.push(new Instruction4MathJS(IEXPR, trueBranch));
    instr.push(binaryInstruction('and'));
  }
};

var COMPARISON_OPERATORS = ['==', '!=', '<', '<=', '>=', '>', 'in'];

ParserState4MathJS.prototype.parseComparison = function (instr) {
  this.parseAddSub(instr);
  while (this.accept(TOP, COMPARISON_OPERATORS)) {
    var op = this.current;
    this.parseAddSub(instr);
    instr.push(binaryInstruction(op.value));
  }
};

var ADD_SUB_OPERATORS = ['+', '-', '||'];

ParserState4MathJS.prototype.parseAddSub = function (instr) {
  this.parseTerm(instr);
  while (this.accept(TOP, ADD_SUB_OPERATORS)) {
    var op = this.current;
    this.parseTerm(instr);
    instr.push(binaryInstruction(op.value));
  }
};

var TERM_OPERATORS = ['*', '/', '%'];

ParserState4MathJS.prototype.parseTerm = function (instr) {
  this.parseFactor(instr);
  while (this.accept(TOP, TERM_OPERATORS)) {
    var op = this.current;
    this.parseFactor(instr);
    instr.push(binaryInstruction(op.value));
  }
};

ParserState4MathJS.prototype.parseFactor = function (instr) {
  var unaryOps = this.tokens.unaryOps;
  function isPrefixOperator(token) {
    return token.value in unaryOps;
  }

  this.save();
  if (this.accept(TOP, isPrefixOperator)) {
    if (this.current.value !== '-' && this.current.value !== '+') {
      if (this.nextToken.type === TPAREN && this.nextToken.value === '(') {
        this.restore();
        this.parseExponential(instr);
        return;
      } else if (this.nextToken.type === TSEMICOLON || this.nextToken.type === TCOMMA || this.nextToken.type === TEOF || (this.nextToken.type === TPAREN && this.nextToken.value === ')')) {
        this.restore();
        this.parseAtom(instr);
        return;
      }
    }

    var op = this.current;
    this.parseFactor(instr);
    instr.push(unaryInstruction(op.value));
  } else {
    this.parseExponential(instr);
  }
};

ParserState4MathJS.prototype.parseExponential = function (instr) {
  this.parsePostfixExpression(instr);
  while (this.accept(TOP, '^')) {
    this.parseFactor(instr);
    instr.push(binaryInstruction('^'));
  }
};

ParserState4MathJS.prototype.parsePostfixExpression = function (instr) {
  this.parseFunctionCall(instr);
  while (this.accept(TOP, '!')) {
    instr.push(unaryInstruction('!'));
  }
};

ParserState4MathJS.prototype.parseFunctionCall = function (instr) {
  var unaryOps = this.tokens.unaryOps;
  function isPrefixOperator(token) {
    return token.value in unaryOps;
  }

  if (this.accept(TOP, isPrefixOperator)) {
    var op = this.current;
    this.parseAtom(instr);
    instr.push(unaryInstruction(op.value));
  } else {
    this.parseMemberExpression(instr);
    while (this.accept(TPAREN, '(')) {
      if (this.accept(TPAREN, ')')) {
        instr.push(new Instruction4MathJS(IFUNCALL, 0));
      } else {
        var argCount = this.parseArgumentList(instr);
        instr.push(new Instruction4MathJS(IFUNCALL, argCount));
      }
    }

  }
};

ParserState4MathJS.prototype.parseArgumentList = function (instr) {
  var argCount = 0;

  while (!this.accept(TPAREN, ')')) {
    this.parseExpression(instr);
    ++argCount;
    while (this.accept(TCOMMA)) {
      this.parseExpression(instr);
      ++argCount;
    }
  }

  return argCount;
};

ParserState4MathJS.prototype.parseMemberExpression = function (instr) {
  this.parseAtom(instr);
  while (this.accept(TOP, '.') || this.accept(TBRACKET, '[')) {
    var op = this.current;

    if (op.value === '.') {
      if (!this.allowMemberAccess) {
        throw new Error('unexpected ".", member access is not permitted');
      }

      this.expect(TNAME);
      instr.push(new Instruction4MathJS(IMEMBER, this.current.value));
    } else if (op.value === '[') {
      if (!this.tokens.isOperatorEnabled('[')) {
        throw new Error('unexpected "[]", arrays are disabled');
      }

      this.parseExpression(instr);
      this.expect(TBRACKET, ']');
      instr.push(binaryInstruction('['));
    } else {
      throw new Error('unexpected symbol: ' + op.value);
    }
  }
};

function simplify(tokens, unaryOps, binaryOps, ternaryOps, values) {
  var nstack = [];
  var newexpression = [];
  var n1, n2, n3;
  var f;
  for (var i = 0; i < tokens.length; i++) {
    var item = tokens[i];
    var type = item.type;
    if (type === INUMBER || type === IVARNAME) {
      if (Array.isArray(item.value)) {
        nstack.push.apply(nstack, simplify(item.value.map(function (x) {
          return new Instruction(INUMBER, x);
        }).concat(new Instruction(IARRAY, item.value.length)), unaryOps, binaryOps, ternaryOps, values));
      } else {
        nstack.push(item);
      }
    } else if (type === IVAR && values.hasOwnProperty(item.value)) {
      item = new Instruction(INUMBER, values[item.value]);
      nstack.push(item);
    } else if (type === IOP2 && nstack.length > 1) {
      n2 = nstack.pop();
      n1 = nstack.pop();
      f = binaryOps[item.value];
      item = new Instruction(INUMBER, f(n1.value, n2.value));
      nstack.push(item);
    } else if (type === IOP3 && nstack.length > 2) {
      n3 = nstack.pop();
      n2 = nstack.pop();
      n1 = nstack.pop();
      if (item.value === '?') {
        nstack.push(n1.value ? n2.value : n3.value);
      } else {
        f = ternaryOps[item.value];
        item = new Instruction(INUMBER, f(n1.value, n2.value, n3.value));
        nstack.push(item);
      }
    } else if (type === IOP1 && nstack.length > 0) {
      n1 = nstack.pop();
      f = unaryOps[item.value];
      item = new Instruction(INUMBER, f(n1.value));
      nstack.push(item);
    } else if (type === IEXPR) {
      while (nstack.length > 0) {
        newexpression.push(nstack.shift());
      }
      newexpression.push(new Instruction(IEXPR, simplify(item.value, unaryOps, binaryOps, ternaryOps, values)));
    } else if (type === IMEMBER && nstack.length > 0) {
      n1 = nstack.pop();
      nstack.push(new Instruction(INUMBER, n1.value[item.value]));
    } /* else if (type === IARRAY && nstack.length >= item.value) {
      var length = item.value;
      while (length-- > 0) {
        newexpression.push(nstack.pop());
      }
      newexpression.push(new Instruction(IARRAY, item.value));
    } */ else {
      while (nstack.length > 0) {
        newexpression.push(nstack.shift());
      }
      newexpression.push(item);
    }
  }
  while (nstack.length > 0) {
    newexpression.push(nstack.shift());
  }
  return newexpression;
}

function substitute(tokens, variable, expr) {
  var newexpression = [];
  for (var i = 0; i < tokens.length; i++) {
    var item = tokens[i];
    var type = item.type;
    if (type === IVAR && item.value === variable) {
      for (var j = 0; j < expr.tokens.length; j++) {
        var expritem = expr.tokens[j];
        var replitem;
        if (expritem.type === IOP1) {
          replitem = unaryInstruction(expritem.value);
        } else if (expritem.type === IOP2) {
          replitem = binaryInstruction(expritem.value);
        } else if (expritem.type === IOP3) {
          replitem = ternaryInstruction(expritem.value);
        } else {
          replitem = new Instruction(expritem.type, expritem.value);
        }
        newexpression.push(replitem);
      }
    } else if (type === IEXPR) {
      newexpression.push(new Instruction(IEXPR, substitute(item.value, variable, expr)));
    } else {
      newexpression.push(item);
    }
  }
  return newexpression;
}

function TokenStream4MathJS (parser, expression) {
  this.pos = 0;
  this.current = null;
  this.unaryOps = parser.unaryOps;
  this.binaryOps = parser.binaryOps;
  this.ternaryOps = parser.ternaryOps;
  this.consts = parser.consts;
  this.expression = expression;
  this.savedPosition = 0;
  this.savedCurrent = null;
  this.options = parser.options;
  this.parser = parser;
}

TokenStream4MathJS.prototype.newToken = function (type, value, pos) {
  return new Token4MathJS(type, value, pos != null ? pos : this.pos);
};

TokenStream4MathJS.prototype.save = function () {
  this.savedPosition = this.pos;
  this.savedCurrent = this.current;
};

TokenStream4MathJS.prototype.restore = function () {
  this.pos = this.savedPosition;
  this.current = this.savedCurrent;
};

TokenStream4MathJS.prototype.next = function () {
  if (this.pos >= this.expression.length) {
    return this.newToken(TEOF, 'EOF');
  }

  if (this.isWhitespace() || this.isComment()) {
    return this.next();
  } else if (this.isRadixInteger() ||
      this.isNumber() ||
      this.isOperator() ||
      this.isString() ||
      this.isParen() ||
      this.isBracket() ||
      this.isComma() ||
      this.isSemicolon() ||
      this.isNamedOp() ||
      this.isConst() ||
      this.isName()) {
    return this.current;
  } else {
    this.parseError('Unknown character "' + this.expression.charAt(this.pos) + '"');
  }
};

TokenStream4MathJS.prototype.isString = function () {
  var r = false;
  var startPos = this.pos;
  var quote = this.expression.charAt(startPos);

  if (quote === '\'' || quote === '"') {
    var index = this.expression.indexOf(quote, startPos + 1);
    while (index >= 0 && this.pos < this.expression.length) {
      this.pos = index + 1;
      if (this.expression.charAt(index - 1) !== '\\') {
        var rawString = this.expression.substring(startPos + 1, index);
        this.current = this.newToken(TSTRING, this.unescape(rawString), startPos);
        r = true;
        break;
      }
      index = this.expression.indexOf(quote, index + 1);
    }
  }
  return r;
};

TokenStream4MathJS.prototype.isParen = function () {
  var c = this.expression.charAt(this.pos);
  if (c === '(' || c === ')') {
    this.current = this.newToken(TPAREN, c);
    this.pos++;
    return true;
  }
  return false;
};

TokenStream4MathJS.prototype.isBracket = function () {
  var c = this.expression.charAt(this.pos);
  if ((c === '[' || c === ']') && this.isOperatorEnabled('[')) {
    this.current = this.newToken(TBRACKET, c);
    this.pos++;
    return true;
  }
  return false;
};

TokenStream4MathJS.prototype.isComma = function () {
  var c = this.expression.charAt(this.pos);
  if (c === ',') {
    this.current = this.newToken(TCOMMA, ',');
    this.pos++;
    return true;
  }
  return false;
};

TokenStream4MathJS.prototype.isSemicolon = function () {
  var c = this.expression.charAt(this.pos);
  if (c === ';') {
    this.current = this.newToken(TSEMICOLON, ';');
    this.pos++;
    return true;
  }
  return false;
};

TokenStream4MathJS.prototype.isConst = function () {
  var startPos = this.pos;
  var i = startPos;
  for (; i < this.expression.length; i++) {
    var c = this.expression.charAt(i);
    if (c.toUpperCase() === c.toLowerCase()) {
      if (i === this.pos || (c !== '_' && c !== '.' && (c < '0' || c > '9'))) {
        break;
      }
    }
  }
  if (i > startPos) {
    var str = this.expression.substring(startPos, i);
    if (str in this.consts) {
      this.current = this.newToken(TNUMBER, this.consts[str]);
      this.pos += str.length;
      return true;
    }
  }
  return false;
};

TokenStream4MathJS.prototype.isNamedOp = function () {
  var startPos = this.pos;
  var i = startPos;
  for (; i < this.expression.length; i++) {
    var c = this.expression.charAt(i);
    if (c.toUpperCase() === c.toLowerCase()) {
      if (i === this.pos || (c !== '_' && (c < '0' || c > '9'))) {
        break;
      }
    }
  }
  if (i > startPos) {
    var str = this.expression.substring(startPos, i);
    if (this.isOperatorEnabled(str) && (str in this.binaryOps || str in this.unaryOps || str in this.ternaryOps)) {
      this.current = this.newToken(TOP, str);
      this.pos += str.length;
      return true;
    }
  }
  return false;
};

TokenStream4MathJS.prototype.isName = function () {
  var startPos = this.pos;
  var i = startPos;
  var hasLetter = false;
  for (; i < this.expression.length; i++) {
    var c = this.expression.charAt(i);
    if (c.toUpperCase() === c.toLowerCase()) {
      if (i === this.pos && (c === '$' || c === '_')) {
        if (c === '_') {
          hasLetter = true;
        }
        continue;
      } else if (i === this.pos || !hasLetter || (c !== '_' && (c < '0' || c > '9'))) {
        break;
      }
    } else {
      hasLetter = true;
    }
  }
  if (hasLetter) {
    var str = this.expression.substring(startPos, i);
    this.current = this.newToken(TNAME, str);
    this.pos += str.length;
    return true;
  }
  return false;
};

TokenStream4MathJS.prototype.isWhitespace = function () {
  var r = false;
  var c = this.expression.charAt(this.pos);
  while (c === ' ' || c === '\t' || c === '\n' || c === '\r') {
    r = true;
    this.pos++;
    if (this.pos >= this.expression.length) {
      break;
    }
    c = this.expression.charAt(this.pos);
  }
  return r;
};

var codePointPattern = /^[0-9a-f]{4}$/i;

TokenStream4MathJS.prototype.unescape = function (v) {
  var index = v.indexOf('\\');
  if (index < 0) {
    return v;
  }

  var buffer = v.substring(0, index);
  while (index >= 0) {
    var c = v.charAt(++index);
    switch (c) {
      case '\'':
        buffer += '\'';
        break;
      case '"':
        buffer += '"';
        break;
      case '\\':
        buffer += '\\';
        break;
      case '/':
        buffer += '/';
        break;
      case 'b':
        buffer += '\b';
        break;
      case 'f':
        buffer += '\f';
        break;
      case 'n':
        buffer += '\n';
        break;
      case 'r':
        buffer += '\r';
        break;
      case 't':
        buffer += '\t';
        break;
      case 'u':
        
        var codePoint = v.substring(index + 1, index + 5);
        if (!codePointPattern.test(codePoint)) {
          this.parseError('Illegal escape sequence: \\u' + codePoint);
        }
        buffer += String.fromCharCode(parseInt(codePoint, 16));
        index += 4;
        break;
      default:
        throw this.parseError('Illegal escape sequence: "\\' + c + '"');
    }
    ++index;
    var backslash = v.indexOf('\\', index);
    buffer += v.substring(index, backslash < 0 ? v.length : backslash);
    index = backslash;
  }

  return buffer;
};

TokenStream4MathJS.prototype.isComment = function () {
  var c = this.expression.charAt(this.pos);
  if (c === '/' && this.expression.charAt(this.pos + 1) === '*') {
    this.pos = this.expression.indexOf('*/', this.pos) + 2;
    if (this.pos === 1) {
      this.pos = this.expression.length;
    }
    return true;
  }
  return false;
};

TokenStream4MathJS.prototype.isRadixInteger = function () {
  var pos = this.pos;

  if (pos >= this.expression.length - 2 || this.expression.charAt(pos) !== '0') {
    return false;
  }
  ++pos;

  var radix;
  var validDigit;
  if (this.expression.charAt(pos) === 'x') {
    radix = 16;
    validDigit = /^[0-9a-f]$/i;
    ++pos;
  } else if (this.expression.charAt(pos) === 'b') {
    radix = 2;
    validDigit = /^[01]$/i;
    ++pos;
  } else {
    return false;
  }

  var valid = false;
  var startPos = pos;

  while (pos < this.expression.length) {
    var c = this.expression.charAt(pos);
    if (validDigit.test(c)) {
      pos++;
      valid = true;
    } else {
      break;
    }
  }

  if (valid) {
    this.current = this.newToken(TNUMBER, parseInt(this.expression.substring(startPos, pos), radix));
    this.pos = pos;
  }
  return valid;
};

TokenStream4MathJS.prototype.isNumber = function () {
  var valid = false;
  var pos = this.pos;
  var startPos = pos;
  var resetPos = pos;
  var foundDot = false;
  var foundDigits = false;
  var c;

  while (pos < this.expression.length) {
    c = this.expression.charAt(pos);
    if ((c >= '0' && c <= '9') || (!foundDot && c === '.')) {
      if (c === '.') {
        foundDot = true;
      } else {
        foundDigits = true;
      }
      pos++;
      valid = foundDigits;
    } else {
      break;
    }
  }

  if (valid) {
    resetPos = pos;
  }

  if (c === 'e' || c === 'E') {
    pos++;
    var acceptSign = true;
    var validExponent = false;
    while (pos < this.expression.length) {
      c = this.expression.charAt(pos);
      if (acceptSign && (c === '+' || c === '-')) {
        acceptSign = false;
      } else if (c >= '0' && c <= '9') {
        validExponent = true;
        acceptSign = false;
      } else {
        break;
      }
      pos++;
    }

    if (!validExponent) {
      pos = resetPos;
    }
  }

  if (valid) {
    this.current = this.newToken(TNUMBER, parseFloat(this.expression.substring(startPos, pos)));
    this.pos = pos;
  } else {
    this.pos = resetPos;
  }
  return valid;
};

TokenStream4MathJS.prototype.isOperator = function () {
  var startPos = this.pos;
  var c = this.expression.charAt(this.pos);

  if (c === '+' || c === '-' || c === '*' || c === '/' || c === '%' || c === '^' || c === '?' || c === ':' || c === '.') {
    this.current = this.newToken(TOP, c);
  } else if (c === '∙' || c === '•') {
    this.current = this.newToken(TOP, '*');
  } else if (c === '>') {
    if (this.expression.charAt(this.pos + 1) === '=') {
      this.current = this.newToken(TOP, '>=');
      this.pos++;
    } else {
      this.current = this.newToken(TOP, '>');
    }
  } else if (c === '<') {
    if (this.expression.charAt(this.pos + 1) === '=') {
      this.current = this.newToken(TOP, '<=');
      this.pos++;
    } else {
      this.current = this.newToken(TOP, '<');
    }
  } else if (c === '|') {
    if (this.expression.charAt(this.pos + 1) === '|') {
      this.current = this.newToken(TOP, '||');
      this.pos++;
    } else {
      return false;
    }
  } else if (c === '=') {
    if (this.expression.charAt(this.pos + 1) === '=') {
      this.current = this.newToken(TOP, '==');
      this.pos++;
    } else {
      this.current = this.newToken(TOP, c);
    }
  } else if (c === '!') {
    if (this.expression.charAt(this.pos + 1) === '=') {
      this.current = this.newToken(TOP, '!=');
      this.pos++;
    } else {
      this.current = this.newToken(TOP, c);
    }
  } else {
    return false;
  }
  this.pos++;

  if (this.isOperatorEnabled(this.current.value)) {
    return true;
  } else {
    this.pos = startPos;
    return false;
  }
};

TokenStream4MathJS.prototype.isOperatorEnabled = function (op) {
  return this.parser.isOperatorEnabled(op);
};

TokenStream4MathJS.prototype.getCoordinates = function () {
  var line = 0;
  var column;
  var newline = -1;
  do {
    line++;
    column = this.pos - newline;
    newline = this.expression.indexOf('\n', newline + 1);
  } while (newline >= 0 && newline < this.pos);

  return {
    line: line,
    column: column
  };
};

TokenStream4MathJS.prototype.parseError = function (msg) {
  var coords = this.getCoordinates();
  throw new Error('parse error [' + coords.line + ':' + coords.column + ']: ' + msg);
};

var Token4MathJS =  function Token(type, value, index) {
  this.type = type;
  this.value = value;
  this.index = index;
}

Token4MathJS.prototype.toString = function () {
  return this.type + ': ' + this.value;
};

function Expression4MathJS(tokens, parser) {
  this.tokens = tokens;
  this.parser = parser;
  this.unaryOps = parser.unaryOps;
  this.binaryOps = parser.binaryOps;
  this.ternaryOps = parser.ternaryOps;
  this.functions = parser.functions;
}

Expression4MathJS.prototype.simplify = function (values) {
  values = values || {};
  return new Expression(simplify(this.tokens, this.unaryOps, this.binaryOps, this.ternaryOps, values), this.parser);
};

Expression4MathJS.prototype.replace4values = function (values) {
  values = values || {};
  return expressionToString(this.tokens, "expr",values);
};

Expression4MathJS.prototype.substitute = function (variable, expr) {
  
  if (expr) {
    if (!(expr instanceof Expression)) {
      expr = this.parser.parse(String(expr));
    }
    return new Expression4MathJS(substitute(this.tokens, variable, expr), this.parser);
  } else {
    console.warn("substituted expression 'expr' is missing");
    return this;
  }
};

Expression4MathJS.prototype.evaluate = function (values) {
  values = values || {};
  return evaluate(this.tokens, this, values);
};

Expression4MathJS.prototype.evaluate4array = function (vname,arr4val) {
  arr4val = arr4val || [];
  var values = {};
  var retarr = [];
  var ret = null;
  for (var i = 0; i < arr4val.length; i++) {
    values[vname] = arr4val[i];
    
    ret = evaluate(this.tokens, this, values);
    
    retarr.push(ret);
  }
  return retarr;
};

Expression4MathJS.prototype.evaluate4array2d = function (vname1,vname2,arr1,arr2) {
  var values = {};
  var retarr = [];
  var ret = null;
  
  for (var i2 = 0; i2 < arr2.length; i2++) {
    values[vname2] = arr2[i2];
    var y1 = [];
    for (var i1 = 0; i1 < arr1.length; i1++) {
      values[vname1] = arr1[i1];
      ret = evaluate(this.tokens, this, values);
      y1.push(ret);
    }
    retarr[i2]=y1;
  }
  return retarr;
};

Expression4MathJS.prototype.evaluate4array3d = function (vname1,vname2,vname3,arr1,arr2,arr3) {
  var values = {};
  var retarr = [];
  var ret = null;
  
  for (var i3 = 0; i3 < arr3.length; i3++) {
    values[vname3] = arr3[i3];
    var y2 = [];
    for (var i2 = 0; i2 < arr2.length; i2++) {
      values[vname2] = arr2[i2];
      var y1 = [];
      for (var i1 = 0; i1 < arr1.length; i1++) {
        values[vname1] = arr1[i1];
        ret = evaluate(this.tokens, this, values);
        y1.push(ret);
      }
      y2[i2] = y1;
    }
    retarr[i3] = y2;
  }
  return retarr;
};

Expression4MathJS.prototype.toJS = function (format) {
  
  return expressionToJS(this.tokens,format);
};

Expression4MathJS.prototype.toString = function () {
  
  return expressionToJS(this.tokens, "string");
};

Expression4MathJS.prototype.toSimplified = function () {
  return expressionToJS(this.tokens, "simplified");
};

Expression4MathJS.prototype.toLatex = function (largebrackets,options) {
  
  return expressionToLatex(this.tokens, largebrackets,options);
};

Expression4MathJS.prototype.symbols = function (options) {
  options = options || {};
  var vars = [];
  getSymbols(this.tokens, vars, options);
  return vars;
};

Expression4MathJS.prototype.variables = function (options) {
  options = options || {};
  var vars = [];
  getSymbols(this.tokens, vars, options);
  var functions = this.functions;
  return vars.filter(function (name) {
    return !(name in functions);
  });
};

Expression4MathJS.prototype.toJSFunction = function (param, variables) {
  var expr = this;
  var f = new Function(param, 'with(this.functions) with (this.ternaryOps) with (this.binaryOps) with (this.unaryOps) { return ' + expressionToString(this.simplify(variables).tokens, "js") + '; }'); 
  return function () {
    return f.apply(expr, arguments);
  };
};

function contains(array, obj) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] === obj) {
      return true;
    }
  }
  return false;
}

function evaluate(tokens, expr, values) {
  var nstack = [];
  var n1, n2, n3;
  var f, args, argCount;

  if (isExpressionEvaluator(tokens)) {
    return resolveExpression(tokens, values);
  }

  var numTokens = tokens.length;

  for (var i = 0; i < numTokens; i++) {
    var item = tokens[i];
    var type = item.type;
    if (type === INUMBER || type === IVARNAME) {
      nstack.push(item.value);
    } else if (type === IOP2) {
      n2 = nstack.pop();
      n1 = nstack.pop();
      if (item.value === 'and') {
        nstack.push(n1 ? !!evaluate(n2, expr, values) : false);
      } else if (item.value === 'or') {
        nstack.push(n1 ? true : !!evaluate(n2, expr, values));
      } else if (item.value === '=') {
        f = expr.binaryOps[item.value];
        nstack.push(f(n1, evaluate(n2, expr, values), values));
      } else {
        f = expr.binaryOps[item.value];
        nstack.push(f(resolveExpression(n1, values), resolveExpression(n2, values)));
      }
    } else if (type === IOP3) {
      n3 = nstack.pop();
      n2 = nstack.pop();
      n1 = nstack.pop();
      if (item.value === '?') {
        nstack.push(evaluate(n1 ? n2 : n3, expr, values));
      } else {
        f = expr.ternaryOps[item.value];
        nstack.push(f(resolveExpression(n1, values), resolveExpression(n2, values), resolveExpression(n3, values)));
      }
    } else if (type === IVAR) {
      if (/^__proto__|prototype|constructor$/.test(item.value)) {
        throw new Error('prototype access detected');
      }
      if (item.value in expr.functions) {
        nstack.push(expr.functions[item.value]);
      } else if (item.value in expr.unaryOps && expr.parser.isOperatorEnabled(item.value)) {
        nstack.push(expr.unaryOps[item.value]);
      } else {
        var v = values[item.value];
        if (v !== undefined) {
          nstack.push(v);
        } else {
          throw new Error('undefined variable: ' + item.value);
        }
      }
    } else if (type === IOP1) {
      n1 = nstack.pop();
      f = expr.unaryOps[item.value];
      nstack.push(f(resolveExpression(n1, values)));
    } else if (type === IFUNCALL) {
      argCount = item.value;
      args = [];
      while (argCount-- > 0) {
        args.unshift(resolveExpression(nstack.pop(), values));
      }
      f = nstack.pop();
      if (f.apply && f.call) {
        nstack.push(f.apply(undefined, args));
      } else {
        throw new Error(f + ' is not a function');
      }
    } else if (type === IFUNDEF) {
      
      nstack.push((function () {
        var n2 = nstack.pop();
        var args = [];
        var argCount = item.value;
        while (argCount-- > 0) {
          args.unshift(nstack.pop());
        }
        var n1 = nstack.pop();
        var f = function () {
          var scope = Object.assign({}, values);
          for (var i = 0, len = args.length; i < len; i++) {
            scope[args[i]] = arguments[i];
          }
          return evaluate(n2, expr, scope);
        };
        
        Object.defineProperty(f, 'name', {
          value: n1,
          writable: false
        });
        values[n1] = f;
        return f;
      })());
    } else if (type === IEXPR) {
      nstack.push(createExpressionEvaluator(item, expr, values));
    } else if (type === IEXPREVAL) {
      nstack.push(item);
    } else if (type === IMEMBER) {
      n1 = nstack.pop();
      nstack.push(n1[item.value]);
    } else if (type === IENDSTATEMENT) {
      nstack.pop();
    } else if (type === IARRAY) {
      argCount = item.value;
      args = [];
      while (argCount-- > 0) {
        args.unshift(nstack.pop());
      }
      nstack.push(args);
    } else {
      throw new Error('invalid Expression');
    }
  }
  if (nstack.length > 1) {
    throw new Error('invalid Expression (parity)');
  }
  
  return nstack[0] === 0 ? 0 : resolveExpression(nstack[0], values);
}

function createExpressionEvaluator(token, expr, values) {
  if (isExpressionEvaluator(token)) return token;
  return {
    type: IEXPREVAL,
    value: function (scope) {
      return evaluate(token.value, expr, scope);
    }
  };
}

function isExpressionEvaluator(n) {
  return n && n.type === IEXPREVAL;
}

function resolveExpression(n, values) {
  return isExpressionEvaluator(n) ? n.value(values) : n;
}

function expressionToString(tokens, format, values) {
  if (format == "js") {
    return expressionToJS(tokens, format, values);
  }
  Values = values || {};
  format = format || "expr";
  var nstack = [];
  var vstack = [];
  var tstack = [];
  var n1, n2, n3;
  var t1, t2, t3;
  var v1, v2, v3;
  var ft, fv;
  var prefix,infix,infix2,postfix;
  var f, args, targs, argCount, varname;
  var out = "";
  
  var ft;
  for (var i = 0; i < tokens.length; i++) {
    var item = tokens[i];
    var type = item.type;
    
    if (type === INUMBER) {
      if (typeof item.value === 'number' && item.value < 0) {
        nstack.push('(' + item.value + ')');
      } else if (Array.isArray(item.value)) {
        nstack.push('[' + item.value.map(escapeValue).join(', ') + ']');
      } else {
        nstack.push(escapeValue(item.value));
      }
      tstack.push(type);
    } else if (type === IOP2) {

      n2 = nstack.pop();
      n1 = nstack.pop();
      t2 = tstack.pop();
      t1 = tstack.pop();
      f = item.value;
      if (format == "js") {
        if (f === '^') {
          nstack.push('Math.pow(' + n1 + ', ' + n2 + ')');
          tstack.push(INUMBER);
        } else if (f === 'and') {
          nstack.push('(!!' + n1 + ' && !!' + n2 + ')');
          tstack.push(IBOOLEAN);
        } else if (f === 'or') {
          nstack.push('(!!' + n1 + ' || !!' + n2 + ')');
          tstack.push(IBOOLEAN);
        } else if (f === '||') {
          nstack.push('(function(a,b){ return Array.isArray(a) && Array.isArray(b) ? a.concat(b) : String(a) + String(b); }((' + n1 + '),(' + n2 + ')))');
          if ((t1 == IARRAY) || (t2 == IARRAY)) {
            tstack.push(ISTRING);
          } else if ((t1 == ISTRING) || (t2 == ISTRING)) {
            tstack.push(ISTRING);
          } else {
            tstack.push(IARRAY);
          }
        } else if (f === '==') {
          nstack.push('(' + n1 + ' === ' + n2 + ')');
          tstack.push(IBOOLEAN);
        } else if (f === '!=') {
          nstack.push('(' + n1 + ' !== ' + n2 + ')');
          tstack.push(IBOOLEAN);
        } else if (f === '[') {
          nstack.push(n1 + '[(' + n2 + ') | 0]');
        } else if (f === '*') {
          nstack.push('((' + n1 + ') ' + f + ' (' + n2 + '))');
        } else if (f === '/') {
          nstack.push('((' + n1 + ') ' + f + ' (' + n2 + '))');
        } else {
          nstack.push('(' + n1 + ' ' + f + ' ' + n2 + ')');
        }
      } else {
        if (f === '[') {
          nstack.push(n1 + '[' + n2 + ']');
        } else {
          nstack.push('(' + n1 + ' ' + f + ' ' + n2 + ')');
        }
        tstack.push(IEXPRESSION);
      }
    } else if (type === IOP3) {

      n3 = nstack.pop();
      n2 = nstack.pop();
      n1 = nstack.pop();
      t3 = tstack.pop();
      t2 = tstack.pop();
      t1 = tstack.pop();
      v3 = vstack.pop();
      v2 = vstack.pop();
      v1 = vstack.pop();
      f = item.value;
      if (f === '?') {
        nstack.push('(' + n1 + ' ? ' + n2 + ' : ' + n3 + ')');
        vstack.push('(' + n1 + ' ? ' + n2 + ' : ' + n3 + ')');
        tstack.push(ICONDITIONAL);
      } else {
        throw new Error('invalid Expression');
      }
    } else if (type === IVAR || type === IVARNAME) {
      var varname = item.value;
      if (values[varname]) {
        nstack.push(values[varname]);
        vstack.push(values[varname]);
        tstack.push(type);
      } else {
        nstack.push(varname);
        vstack.push(varname);
        tstack.push(type);
      }
    } else if (type === IOP1) {

      n1 = nstack.pop();
      t1 = tstack.pop();
      v1 = vstack.pop();
      f = item.value;
      if (f === '-' || f === '+') {
        
        tstack.push(IVAR);
        nstack.push('(' + f + " "+ n1 + ')');
        vstack.push('(' + f + " "+ n1 + ')');
      } else if (format == "js") {
        if (f === 'not') {
          tstack.push(IBOOLEAN);
          nstack.push('(' + '!' + n1 + ')');
          vstack.push('(' + '!' + n1 + ')');
        } else if (f === '!') {
          tstack.push(INUMBER);
          nstack.push('fac(' + n1 + ')');
          vstack.push('fac(' + n1 + ')');
        } else {
          tstack.push(IRETURN);
          nstack.push(f + '(' + n1 + ')');
          vstack.push(f + '(' + n1 + ')');
        }
      } else if (f === '!') {
        tstack.push(INUMBER);
        nstack.push('(' + n1 + '!)');
        vstack.push('(' + n1 + '!)');
      } else {
        tstack.push(IRETURN+"1");
        nstack.push(' ' + f + '(' + n1 + ')');
        vstack.push(' ' + f + '(' + n1 + ')');
      }
    } else if (type === IFUNCALL) {

      argCount = item.value;
      args = [];
      targs = [];
      vargs = [];
      while (argCount-- > 0) {
        args.unshift(nstack.pop());
        targs.unshift(tstack.pop());
        vargs.unshift(vstack.pop());
        
      }
      f = nstack.pop();
      ft = tstack.pop();
      fv = vstack.pop();
      var argstr = "";
      if (f == "cases") {
        
        prefix = '';
        infix  = ' ';
        postfix= ' ';

        var max = Math.round(args.length/2 - 0.01);
        var closebrackets = "";
        for (var i = 0; i < max; i++) {
          argstr += "("+args[2*i+1]+" ? "+args[2*i] + " : ";
          closebrackets += ")";
        }
        if (2*max < args.length) {

            argstr += " "+args[2*max]+" ";
        } else {
          argstr += " false ";
        }
        argstr += closebrackets;
        nstack.push(map2string(prefix, f , infix , argstr , postfix));
        vstack.push(map2vector(prefix, f , infix , argstr , postfix));
        tstack.push(ICONDITIONAL);
      } else {
        prefix = ' ';
        infix  = left+'(';
        postfix= right + ')';
        argstr = args.join(', ');
        
        nstack.push(map2string(prefix, f , infix , argstr , postfix));
        vstack.push(map2vector(prefix, f , infix , argstr , postfix));
        tstack.push(IFUNCTIONCALL);
      }
      
      tstack.push(IRETURN+"2");
    } else if (type === IFUNDEF) {
      n2 = nstack.pop();
      v2 = vstack.pop();
      t2 = tstack.pop();
      argCount = item.value;
      args = [];
      while (argCount-- > 0) {
        args.unshift(nstack.pop());
        tstack.pop();
      }
      n1 = nstack.pop();
      v1 = vstack.pop();
      t1 = tstack.pop();
      if (format == "js") {
        nstack.push('(' + n1 + ' = function(' + args.join(', ') + ') { return ' + n2 + ' })');
      } else {
        nstack.push('(' + n1 + '(' + args.join(', ') + ') = ' + n2 + ')');
      }
      tstack.push(IEXPRESSION);
    } else if (type === IMEMBER) {
      n1 = nstack.pop();
      v1 = vstack.pop();
      t1 = tstack.pop();
      nstack.push(n1 + '.' + item.value);
      tstack.push(t1);
    } else if (type === IARRAY) {
      argCount = item.value;
      args = [];
      targs = [];
      vargs = [];
      while (argCount-- > 0) {
        args.unshift(nstack.pop());
        targs.unshift(tstack.pop());
        vargs.unshift(vstack.pop());
      }
      nstack.push('[' + args.join(', ') + ']');
      vstack.push('[' + vargs.join(', ') + ']');
      tstack.push('[' + targs.join(', ') + ']');
    } else if (type === IEXPR) {
      nstack.push('(' + expressionToString(item.value, format) + ')');
      vstack.push('(' + expressionToString(item.value, format) + ')');
      tstack.push(IEXPRESSION);
    } else if (type === IENDSTATEMENT) {
      
    } else {
      throw new Error('invalid Expression');
    }

  }
  if (nstack.length > 1) {
    
    var vChar = ";";
    if (format == "js") {
      vChar = ","
    }
    nstack = [ nstack.join(vChar) ];
    vstack = [ vstack.join(vChar) ];
    tstack = [ tstack.join(vChar) ];

  }
  return String(nstack[0]);
}

function expressionToJS(tokens,format) {
  format = format || "js";
  var nstack = [];
  var vstack = [];
  var tstack = [];
  var n1, n2, n3;
  var t1, t2, t3;
  var v1, v2, v3;
  var ft, fv, varr;
  var prefix,infix,infix2,postfix;
  var f, args, targs, vargs, argCount;
  var out = "";
  for (var i = 0; i < tokens.length; i++) {
    var item = tokens[i];
    var type = item.type;
    
    if (type === INUMBER) {
    
      if (typeof item.value === 'number' && item.value < 0) {
        
        nstack.push('(' + item.value + ')');
        vstack.push('(' + item.value + ')');
        tstack.push(INUMBER);
      } else if (Array.isArray(item.value)) {
        
        nstack.push('[' + item.value.map(escapeValue).join(', ') + ']');
        vstack.push( item.value.map(escapeValue) );
        tstack.push(IARRAY);
      } else {
        
        nstack.push(escapeValue(item.value));
        vstack.push(escapeValue(item.value));
        tstack.push(INUMBER);
      }
    } else if (type === IOP2) {

      n2 = nstack.pop();
      n1 = nstack.pop();
      t2 = tstack.pop();
      t1 = tstack.pop();
      v2 = vstack.pop();
      v1 = vstack.pop();
      f = item.value;
      if (f === '^') {
        if (format == "simplified") {
          prefix = '(';
          infix  = ')^(';
          postfix= ')';
        } else {
          prefix = 'Math.pow(';
          infix  = ', ';
          postfix= ')';
        }
        
        vstack.push(map2vector(prefix , v1 , infix , v2 , postfix,"0","1"));
        nstack.push(map2nstack(t1 ,t2 ,prefix , n1 , v1 , infix , n2, v2 , postfix,"0","1"));
        tstack.push(map2tstack(t1,t2));
      } else if (f === 'and') {
        if (format == "simplified") {
          prefix = '(';
          infix  = ' and ';
          postfix= ')';
        } else {
          prefix = '(!!'
          infix  = ' && !!'
          postfix= ')';
        }

        vstack.push(map2vector(prefix , v1 , infix , v2 , postfix,STRUE,STRUE));
        nstack.push(map2nstack(t1 ,t2 ,prefix , n1 , v1 , infix , n2, v2 , postfix, STRUE, STRUE));
        tstack.push(map2tstack(t1,t2,IBOOLEAN,IBOOLEAN));
        
      } else if (f === 'or') {
        if (format == "simplified") {
          prefix = '(';
          infix  = ' or ';
          postfix= ')';
        } else {
          prefix = '(!!'
          infix  = ' || !!'
          postfix= ')';
        }
        vstack.push(map2vector(prefix , v1 , infix , v2 , postfix,STRUE,STRUE));
        nstack.push(map2nstack(t1 ,t2 ,prefix , n1 , v1 , infix , n2, v2 , postfix, STRUE, STRUE));
        tstack.push(map2tstack(t1,t2,IBOOLEAN,IBOOLEAN));
        
        tstack.push(IBOOLEAN);
      } else if (f === '||') {
        
        if (format == "simplified") {
          prefix = '[';
          infix  = ',';
          postfix= ']';
        } else {
          prefix = '(function(a,b){ return Array.isArray(a) && Array.isArray(b) ? a.concat(b) : String(a) + String(b); }((';
          infix  = '),('
          postfix=  ')))';
        }
        vstack.push(map2vector(prefix , v1 , infix , v2 , postfix,STRUE,STRUE));
        nstack.push(map2nstack(t1 ,t2 ,prefix , n1 , v1 , infix , n2, v2 , postfix, STRUE, STRUE));
        tstack.push(map2tstack(t1,t2,IBOOLEAN,IBOOLEAN));
        
        tstack.push(IARRAY);
      } else if (f === '==') {
        if (format == "simplified") {
          prefix = '[';
          infix  = ',';
          postfix= ']';
        } else {
          prefix = '(';
          infix  = ' === ';
          postfix= ')';
        }
        vstack.push(map2vector(prefix , v1 , infix , v2 , postfix,STRUE,STRUE));
        nstack.push(map2nstack(t1 ,t2 ,prefix , n1 , v1 , infix , n2, v2 , postfix, STRUE, STRUE));
        tstack.push(map2tstack(t1,t2,IBOOLEAN,IBOOLEAN));
        
      } else if (f === '!=') {
        prefix = '(';
        infix  = ' !== ';
        postfix= ')';
        vstack.push(map2vector(prefix , v1 , infix , v2 , postfix,STRUE,STRUE));
        nstack.push(map2nstack(t1 ,t2 ,prefix , n1 , v1 , infix , n2, v2 , postfix, STRUE, STRUE));
        tstack.push(map2tstack(t1,t2,IBOOLEAN,IBOOLEAN));
        
      } else if ((f === '+') || (f === '-')) {
        prefix = '((';
        infix  = ') '+f+' (';
        postfix= '))';
        varr = map2vector(prefix , v1 , infix , v2 , postfix,0,0,"ADDSUB4JS");
        
        vstack.push(varr);
        tstack.push(type4operands(t1,t2));
        nstack.push(nonterm4array(varr));
        
      } else if (f === '*') {
        prefix = '((';
        infix  = ') * (';
        postfix= '))';
        varr = map2vector(prefix , v1 , infix , v2 , postfix,1,1,"MULT4JS");
        
        vstack.push(varr);
        tstack.push(type4operands(t1,t2));
        nstack.push(nonterm4array(varr));
        
      } else if (f === '/') {
        prefix = '((';
        infix  = ' / ';
        postfix= '))';
        varr = map2vector(prefix , v1 , infix , v2 , postfix,1,1,"DIV4JS");
        
        vstack.push(varr);
        tstack.push(type4operands(t1,t2));
        nstack.push(nonterm4array(varr));
        
      } else if (f === '[') {
        if (format == "simplified") {
          prefix = '';
          infix  = '[';
          postfix= ']';
        } else {
          prefix = '[(';
          infix  = ' ';
          postfix= ') | 0]';
        }

        varr = map2vector(prefix , v1 , infix , v2 , postfix,1,1,"DIV4JS");
        
        vstack.push(varr);
        tstack.push(type4operands(t1,t2));
        nstack.push(nonterm4array(varr));

      } else {
        prefix = '(';
        infix  = ' '+f+' ';
        postfix= ')';
        varr = map2vector(prefix , v1 , infix , v2 , postfix,0,0,"OP2");
        
        vstack.push(varr);
        tstack.push(type4operands(t1,t2));
        nstack.push(nonterm4array(varr));
        
      }
    } else if (type === IOP3) {

      n3 = nstack.pop();
      n2 = nstack.pop();
      n1 = nstack.pop();
      t3 = tstack.pop();
      t2 = tstack.pop();
      t1 = tstack.pop();
      f = item.value;
      if (f === '?') {
        prefix = '(';
        infix  = ' '+f+' ';
        infix2 = ' : ';
        postfix= ')';
        nstack.push(map3string(prefix , n1 , infix , n2 , infix2, n3 , postfix,"CONDITIONAL"));
        vstack.push(map3vector(prefix , v1 , infix , v2 , infix2, n3 , null, null, postfix,"CONDITIONAL"));
        tstack.push(ICONDITIONAL);
        if (t2 !== t3) {
          console.warn("toJS-convert: Type mismatch for if-condition '"+t2+"' not equal to '"+t3+"'");
        }
        
      } else {
        throw new Error('invalid Expression');
      }
    } else if (type === IVAR || type === IVARNAME) {
      tstack.push(type);
      nstack.push(item.value);
      vstack.push(item.value);
    } else if (type === IOP1) {

      n1 = nstack.pop();
      t1 = tstack.pop();
      v1 = vstack.pop();
      f = item.value;
      if (f === '-' || f === '+') {
        prefix = '(';
        infix  = ' ';
        postfix= ')';
        nstack.push(map2string(prefix, f , infix , n1 , postfix,"SIGNVAL"));
        vstack.push(map2vector(prefix, f , infix , v1 , postfix,"+",0,"SIGNVAL"));
        tstack.push(IEXPRESSION);

      } else if (f === 'not') {
        
        prefix = '(';
        infix  = '';
        postfix= ')';
        nstack.push(map2string(prefix, "!" , infix , n1 , postfix,"NOT"));
        vstack.push(map2vector(prefix, "!" , infix , v1 , postfix, "!","true", "NOT"));
        tstack.push(IBOOLEAN);
        
      } else if (f === '!') {
        
        if (format == "simplified") {
          prefix = ' ';
          infix  = '';
          postfix= '!';
        } else {
          prefix = 'fac(';
          infix  = '';
          postfix= ')';
        }
        nstack.push(map2string(prefix, "" , infix , n1 , postfix,"FACULTY1OP"));
        vstack.push(map2vector(prefix, "" , infix , v1 , postfix," ",0,"FACULTY1OP"));
        tstack.push(INUMBER);
        
      } else {
        
        prefix = ' ';
        infix  = '(';
        postfix= ')';
        nstack.push(map2string(prefix, f , infix , n1 , postfix,"FUNCTION1OP"));
        vstack.push(map2vector(prefix, f , infix , v1 , postfix,null,null,"FUNCTION1OP"));
        tstack.push(IEXPRESSION);
        
      }
    } else if (type === IFUNCALL) {

      argCount = item.value;
      args = [];
      targs = [];
      vargs = [];
      while (argCount-- > 0) {
        args.unshift(nstack.pop());
        targs.unshift(tstack.pop());
        vargs.unshift(vstack.pop());
        
      }
      f  = nstack.pop();
      ft = tstack.pop();
      fv = vstack.pop();
      prefix = '';
      infix  = '(';
      postfix= ')';
      var argstr = args.join(', ');
      if (f == "cases") {
        
      } else {
        nstack.push(map2string(prefix, f , infix , argstr , postfix,"FUNCTION4JS"));
        vstack.push(map2vector(prefix, f , infix , argstr , postfix,null,null,"FUNCTION4JS"));
        tstack.push(IEXPRESSION);
      }
    
    } else if (type === IFUNDEF) {

      n2 = nstack.pop();
      t2 = tstack.pop();
      argCount = item.value;
      args = [];
      targs = []; 
      vargs = [];
      while (argCount-- > 0) {
        args.unshift(nstack.pop());
        targs.unshift(tstack.pop());
        vargs.unshift(vstack.pop());
      }
      var type4arr = typecast4array(targs);
      
      n1 = nstack.pop();
      t1 = tstack.pop();
      v1 = vstack.pop();
      if (format == "simplified") {
        prefix = ' ';
        infix  = '(';
        infix2  = ') = ';
        postfix= ' ';
      } else {
        prefix = '(';
        infix  = ' = function(';
        infix2 = ') { return ';
        postfix= ' })';
      }
      var argstr = args.join(', ');
      nstack.push(map3string(prefix , n1 , infix , argstr , infix2, n2 , postfix,"FUNCTION4JS"));
      vstack.push(map3vector(prefix , v1 , infix , argstr , infix2, v2 , postfix,null,null,null,"FUNCTION4JS"));
      tstack.push(IDEFINITION);

    } else if (type === IMEMBER) {
      n1 = nstack.pop();
      t1 = tstack.pop();
      v1 = vstack.pop();
      nstack.push(n1 + '.' + item.value);
      tstack.push(t1);
      vstack.push(IMEMBERPATH);
    } else if (type === IARRAY) {
      argCount = item.value;
      args = [];
      targs = []; 
      vargs = []; 
      while (argCount-- > 0) {
        args.unshift(nstack.pop());
        targs.unshift(tstack.pop());
        vargs.unshift(vstack.pop());
      }
      var type4arr = typecast4array(targs);
      if (type4arr == IARRAY) {
        nstack.push('[' + args.join(', ') + ']');
        vstack.push(vargs);
        tstack.push(IMATRIX);
      } else {
        nstack.push('[' + args.join(', ') + ']');
        vstack.push(vargs);
        tstack.push(IARRAY);
      }
    } else if (type === IEXPR) {
      nstack.push('(' + expressionToJS(item.value) + ')');
    } else if (type === IENDSTATEMENT) {
      
    } else {
      throw new Error('invalid Expression');
    }
  }
  if (nstack.length > 1) {
    
    nstack = [ nstack.join(',') ];
    tstack = [ tstack.join(',') ];
  }
  return String(nstack[0]);
}

function vector2string(vec) {
  var out = " ";
  if (vec) {
    out = JSON.stringify(vec);
  };
  return vec;
}

function vector2jsstring(vec) {
  var out = "[";
  var sep = "";
  if (vec && Array.isArray(vec)) {
    for (var i = 0; i < vec.length; i++) {
      if (Array.isArray(vec[i])) {
        out += sep + vector2jsstring(vec[i])
      } else {
        out += sep + vec[i]
      }
      sep = ","
    }
  }
  out += "]"
  return
}

function get_args4stack(s,argCount) {
  var ret = {
    "type":"UNDEF",
    "args": [],
    "targs": [],
    "vargs": []
  };
  while (argCount-- > 0) {
    ret.args.unshift(s.nstack.pop());
    ret.targs.unshift(s.tstack.pop());
    ret.vargs.unshift(s.vstack.pop());
  }
  
  ret.type = typecast4array(ret.targs);
  return ret;
}

function map1variable(v) {
  v = v || " ";
  var ret = v;
  if (Array.isArray(ret)) {
    if (ret.length == 0) {
      ret.push("vundef");
    }
  } else {
    ret = [v]
  }
  return ret;
}

function map2vector(prefix,v1,infix,v2,postfix,v1default,v2default,label) {
  var ret = "";
  var arr = [];
  var arrcount = 0;
  v1 = map1variable(v1);
  v2 = map1variable(v2);
  v1default = v1default || v1[0] || "v1undef";
  v2default = v2default || v2[0] || "v2undef";
  var max = Math.max(v1.length,v2.length);
  if (max > 0) {
    
    if (max == 1) {

      ret = prefix+v1[0]+infix+v2[0]+postfix;
    } else {
      
      if (v1.length == 1) v1default = v1[0];
      if (v2.length == 1) v2default = v2[0];

      var matcount = 0;
      if (hasMatrixElements(v1) > 0) {
        matcount++
      }
      if (hasMatrixElements(v2) > 0) {
        matcount++
      }
      if (matcount == 0) {
        for (var i = 0; i < max; i++) {
          var n1 = v1[i] || v1default;
          var n2 = v2[i] || v2default;
          arr.push(prefix+n1+infix+n2+postfix);
        }
        ret = arr;
      } else {
        for (var i = 0; i < max; i++) {
          var v1i = v1[i] || v1default;
          var v2i = v2[i] || v2default;
          arr.push(map2vector(prefix,v1i,infix,v2i,postfix,v1default,v2default));
        }
        ret = arr;
      }
    }
  } else {
    console.warn("map2vector(...,v1,...,v2,...) both v1 and v2 are of length 0.");
  }
  return ret;
};

function map2string(prefix,n1,infix,n2,postfix,n1default,n2default,label) {
  var out = "";
  n1 = n1 || n1default;
  n2 = n2 || n2default;
  return prefix+n1+infix+n2+postfix
}

function map3vector(prefix,v1,infix,v2,infix2,v3,postfix,v1default,v2default,v3default,label) {
  var arr = [];
  var arrcount = 0;
  v1 = map1variable(v1);
  v2 = map1variable(v2);
  v3 = map1variable(v3);
  v1default = v1default || v1[0];
  v2default = v2default || v2[0];
  v3default = v3default || v3[0];
  var max = Math.max(v1.length,v2.length,v3.length);
  if (max == 1) {
    var n1 = v1[0] || v1default;
    var n2 = v2[0] || v2default;
    var n3 = v3[0] || v3default;
    ret = prefix+n1+infix+n2+infix2+n3+postfix;
  } else {
    for (var i = 0; i < max; i++) {
      var n1 = v1[i] || v1default;
      var n2 = v2[i] || v2default;
      var n3 = v3[i] || v3default;
      arr.push(prefix+n1+infix+n2+infix2+n3+postfix);
    }
    ret = arr;
  }
  return ret;
};

function map3string(prefix,n1,infix,n2,infix2,v3,postfix,n1default,n2default,n3default,label) {
  var out = "";
  n1 = n1 || n1default;
  n2 = n2 || n2default;
  n3 = n3 || n3default;
  return prefix+n1+infix+n2+infix3+n3+postfix
}

function map2nstack(t1 ,t2 ,prefix , n1, v1 , infix , n2, v2 , postfix, n1default, n2default,label) {
  var nt = "NONTERM";
  if ((t1 === IARRAY) || (t2 === IARRAY) || (t1 === IMATRIX) || (t2 === IMATRIX)) {
    var vec = map2vector(prefix , v1 , infix , v2 , postfix, n1default, n2default, label);
    nt = "["+vec.join(",")+"]";
  } else {
    nt = map2string(prefix, n1 , infix , n2 , postfix);
  }
  return nt;
}

function map2tstack(t1 ,t2, t1default, t2default) {
  var type = INUMBER;
  if ((t2default !== IARRAY) && (t2default !== IMATRIX)) {
    type = t2default;
  }
  if ((t1default !== IARRAY) && (t1default !== IMATRIX)) {
    type = t1default;
  }
  if ((t1 === IARRAY) || (t2 === IARRAY)) {
    type = IARRAY
  }
  if ((t1 === IMATRIX) || (t2 === IMATRIX)) {
    type = IMATRIX
  }
  return type;
}

function jstr(pJSON,indent) {
  if (indent) {
    return JSON.stringify(pJSON,null,indent)
  } else {
    return JSON.stringify(pJSON)
  }
}

function type4operands(t1,t2,default4type) {
  var type = default4type || INUMBER;
  if ((t1 == IARRAY) || (t2 == IARRAY)) {
    type = IARRAY;
  }
  if ((t1 == IMATRIX) || (t2 == IMATRIX)) {
    type = IMATRIX;
  }
  return type
}

function nonterm4array(varr) {
  var out = "undefarray";
  if (varr) {
    if (Array.isArray(varr)) {
      if (varr.length > 1) {
        out = "["+varr.join(",")+"]";
      } else {
        if (varr.length == 1) {
          out = varr[0];
        } else {
          out += "0len"
        }
      }
    } else {
      out = varr;
    }
    return out;
  }

}

/*
var INUMBER = 'INUMBER';
var IOP1 = 'IOP1';
var IOP2 = 'IOP2';
var IOP3 = 'IOP3';
var IVAR = 'IVAR';
var IVARNAME = 'IVARNAME';
var IFUNCALL = 'IFUNCALL';
var IFUNDEF = 'IFUNDEF';
var ICONDIF = 'ICONDIF';
var ISIGN = 'ISIGN';
var IEXPR = 'IEXPR';
var IEXPRESSION = 'IEXPRESSION';
var IEXPREVAL = 'IEXPREVAL';
var IMEMBER = 'IMEMBER';
var IENDSTATEMENT = 'IENDSTATEMENT';
var IARRAY = 'IARRAY';
var IMATRIX = 'IMATRIX';
var IBOOLEAN = 'IBOOLEAN';
*/

function types4array(pTArgs) {
  var ret = [];
  if (Array.isArray(pTArgs)) {
    
    for (var i = 0; i < pTArgs.length; i++) {
      if (ret.indexOf(pTArgs[i])< 0) {
        ret.push(pTArgs[i])
      } else {
      }
    }
  }
  return ret;
}

function typecast4op2(t1,t2) {
  var ret = IMIXEDTYPE;
  
  if (t1 == IARRAY) {
    ret = IARRAY;
  } else if (t2 == IARRAY) {
    ret = IARRAY;
  };
  
  if (t1 == IMATRIX) {
    ret = IMATRIX;
  } else if (t2 == IMATRIX) {
    ret = IMATRIX;
  };
  return ret;
}

function typecast4array(pTArgs) {
  var ret = types4array(pTArgs);
  if (ret.length == 1) {
    return ret[0]
  } else {
    if (ret.length == 0) {
      return IUNDEFINED;
    } else {
      return IMIXEDTYPE
    }
  }
}

function hasMatrixElements(pValue) {
  var ret = 0;
  if (pValue && Array.isArray(pValue)) {
    
    for (var i = 0; i < pValue.length; i++) {
      
      if (Array.isArray(pValue[i])) {
        if (pValue[i].length > ret) {
          ret = pValue[i].length;
        };
      }
    }
  }

  return ret;
}

function getMatrixColDef(pCol,pAlign,pPrefixColdef) {
  var coldef = pPrefixColdef || "";
  pAlign = pAlign || "c";
  pCol = pCol || 0;
  for (var i = (coldef.length); i < pCol; i++) {
    coldef += pAlign
  }
  return coldef;
}
function begin4matrix(pCol,pAlign,pPrefixColdef) {
  pPrefixColdef = pPrefixColdef || "";
  var coldef = getMatrixColDef(pCol,pAlign,pPrefixColdef);
  var out = "\n\\left(\n  \\begin{array}{"+coldef+"}\n";
  return out
}

function lines4matrx(pRow,pItem) {
  var out = "";
  if (pItem) {
    if (pItem && Array.isArray(pItem)) {
      
      if ((pItem[0].length > 0) && (Array.isArray(pItem[0]))) {
        
          var rows = pItem;
          for (var r = 0; r < rows.length; r++) {
            var row = rows[r];
            var vSep = "  ";
            if (Array.isArray(row)) {
              for (var c = 0; c < row.length; c++) {
                out += vSep + row[c];
                vSep = " & "
              }
            } else {
              out += vSep + row
            }
            out += " \\\\\n";
          }
      } else {

        for (var i = 0; i < pItem.length; i++) {
          out += "    "+pItem[i]+" \\\\\n";
        }
      }
    }
  } else {
  }
  return out;
}

function end4matrix(pCol,pItem) {
  var out = "";
  if (pItem) {
    out += lines4matrx(pCol,pItem);
  }
  out += "  \\end{array}\n\\right)\n";
  
  return out
}

function handleMatrix4Output(mat,prefix,rowsep,colsep,postfix) {
  var out = prefix || "";
  var row;
  var csep = "";
  var colvalue;
  
  for (var r = 0; r < mat.length; r++) {
    
    csep = "";
    for (var c = 0; c < row.length; i++) {
        colvalue = (mat[c][r]) || "0";
        out += " " + csep + " "+ colvalue;
        csep = colsep;
    }
    out += rowsep
  }
  return out;
}

function expressionToLatex(tokens, toBracket, options) {
  
  options = options || {};
  var nstack = [];
  var vstack = [];
  var tstack = [];
  var n1, n2, n3;
  var t1, t2, t3;
  var v1, v2, v3;
  var ft, fv;
  var prefix,infix,infix2,postfix;
  var f, args, targs, argCount, varname;
  var left = "";
  var right = "";
  var out = "";
  if (toBracket) {
    left = "\\left";
    right = "\\right"
  }
  var array_level = 0;

  for (var i = 0; i < tokens.length; i++) {
    var item = tokens[i];
    var type = item.type;
    if (type === INUMBER) {
      if (typeof item.value === 'number' && item.value < 0) {
        
        nstack.push('(' + item.value + ')');
        vstack.push('(' + item.value + ')');
        tstack.push(type);
      } else if (Array.isArray(item.value)) {
        
        nstack.push('(' + item.value.map(escapeValue).join(',') + ')');
        vstack.push( item.value.map(escapeValue) );
        tstack.push(IARRAY);
      } else {
        
        nstack.push(escapeValue(item.value));
        vstack.push('' + item.value + '');
        tstack.push(type)
      }
    } else if (type === IOP2) {

      n2 = nstack.pop();
      n1 = nstack.pop();
      t2 = tstack.pop();
      t1 = tstack.pop();
      v2 = vstack.pop();
      v1 = vstack.pop();
      f = item.value;
      if (f === '^') {
          
          prefix = '{';
          infix  = '}^{';
          postfix= '}';

          vstack.push(map2vector(prefix , v1 , infix , v2 , postfix,"0","1","POWER4TEX"));
          nstack.push(map2nstack4latex(t1 ,t2 ,prefix , n1 , v1 , infix , n2, v2 , postfix,"0","1","POWER4TEX"));
          tstack.push(map2tstack(t1,t2,INUMBER,INUMBER));
      } else if (f === 'and') {
          
          prefix = '{';
          infix  = " \\wedge ";
          postfix= '}';

          vstack.push(map2vector(prefix , v1 , infix , v2 , postfix,"true","true","AND4TEX"));
          nstack.push(map2nstack(t1 ,t2 ,prefix , n1 , v1 , infix , n2, v2 , postfix,"true","true","AND4TEX"));
          tstack.push(map2tstack(t1,t2,IBOOLEAN,IBOOLEAN));
      } else if (f === 'or') {
          
          prefix = '{';
          infix  = " \\vee ";
          postfix= '}';

          vstack.push(map2vector(prefix , v1 , infix , v2 , postfix,"true","true","OR4TEX"));
          nstack.push(map2nstack(t1 ,t2 ,prefix , n1 , v1 , infix , n2, v2 , postfix,"true","true","OR4TEX"));
          tstack.push(map2tstack(t1,t2,IBOOLEAN,IBOOLEAN));
      } else if (f === '==') {
          
          prefix = '{';
          infix  = " = ";
          postfix= '}';
          vstack.push(map2vector(prefix , v1 , infix , v2 , postfix,"true","true","EQUALS4TEX"));
          nstack.push(map2nstack(t1 ,t2 ,prefix , n1 , v1 , infix , n2, v2 , postfix,"true","true","EQUALS4TEX"));
          tstack.push(map2tstack(t1,t2,IBOOLEAN,IBOOLEAN));
      } else if (f === '!=') {
          
          prefix = '{';
          infix  = " \\not= ";
          postfix= '}';
          vstack.push(map2vector(prefix , v1 , infix , v2 , postfix,"true","true","NOT4TEX"));
          nstack.push(map2nstack(t1 ,t2 ,prefix , n1 , v1 , infix , n2, v2 , postfix,"true","true","NOT4TEX"));
          tstack.push(map2tstack(t1,t2,IBOOLEAN,IBOOLEAN));
      } else if (f === '*') {
          
          prefix = '{';
          infix  = " \\cdot ";
          postfix= '}';
          vstack.push(map2vector(prefix , v1 , infix , v2 , postfix,"1","1","MULT4TEX"));
          nstack.push(map2nstack(t1 ,t2 ,prefix , n1 , v1 , infix , n2, v2 , postfix,"1","1","MULT4TEX"));
          tstack.push(map2tstack(t1,t2,INUMBER,INUMBER));
      } else if (f === '/') {
          
          prefix = "\\frac{";
          infix  = "}{";
          postfix= '}';
          vstack.push(map2vector(prefix , v1 , infix , v2 , postfix,"1","1","FRAC4TEX"));
          nstack.push(map2nstack(t1 ,t2 ,prefix , n1 , v1 , infix , n2, v2 , postfix,"1","1","FRAC4TEX"));
          tstack.push(map2tstack(t1,t2,INUMBER,INUMBER));
    } else if (f === '[') {
          
          prefix = " ";
          infix  = left + '(';
          postfix= right + ')';
          nstack.push(map2string(prefix, n1 , infix , n2 , postfix),"SIGNARR4TEX");
          vstack.push(map2vector(prefix , v1 , infix , v2 , postfix),"SIGNARR4TEX");
          tstack.push(IARRAY);
      } else {

        prefix = '{';
        infix  = ' '+f+' ';
        postfix= '}';
        nstack.push(map2string(prefix , n1 , infix , n2 , postfix,"STANDARD4TEX"));
        vstack.push(map2vector(prefix , v1 , infix , v2 , postfix,"STANDARD4TEX"));
        tstack.push(typecast4array([t1,t2]));
      }
    } else if (type === IOP3) {

      n3 = nstack.pop();
      n2 = nstack.pop();
      n1 = nstack.pop();
      t3 = tstack.pop();
      t2 = tstack.pop();
      t1 = tstack.pop();
      v3 = vstack.pop();
      v2 = vstack.pop();
      v1 = vstack.pop();
      f = item.value;
      if (f === '?') {

        prefix = '{';
        infix  = "} \\rightarrow {";
        infix2 = "} \\wedge { \\neg ";
        postfix= '}';
        nstack.push(map3string(prefix, n1 , infix , n2 ,  infix2, n1 + infix + n3 ,postfix));
        vstack.push(map3vector(prefix, v1 , infix , v2 ,  infix2, n1 + infix + n3 ,postfix));
        tstack.push(ICONDITIONAL);
        
      } else {
        throw new Error('invalid Expression');
      }
    } else if (type === IVAR || type === IVARNAME) {
      nstack.push(item.value);
      tstack.push(IVAR);
      vstack.push(item.value);
    } else if (type === IOP1) {

      n1 = nstack.pop();
      t1 = tstack.pop();
      v1 = vstack.pop();
      f = item.value;
      if (f === '-' || f === '+') {

        prefix = check4brackets(t1,left+'(');
        infix  = '';
        postfix= check4brackets(t1,right + ')');
        nstack.push(map2string(prefix, f , infix , n1 , postfix,"SIGNED4TEX"));
        vstack.push(map2vector(prefix, f , infix , v1 , postfix,"SIGNED4TEX"));
        tstack.push(ISIGN);
        
      } else if (f === 'not') {

        prefix = left+'(';
        infix  = " \\neg ";
        postfix= right + ')';
        nstack.push(map2string(prefix, " " , infix , n1 , postfix,"NEG4TEX"));
        vstack.push(map2vector(prefix, " " , infix , v1 , postfix,"NEG4TEX"));
        
        tstack.push(IBOOLEAN);
      } else if (f === '!') {
          
          prefix = '';
          infix  = '';
          postfix= '! ';
          nstack.push(map2string(prefix, n1 , infix , f , postfix,"FACULTY4TEX"));
          vstack.push(map2vector(prefix, v1 , infix , f , postfix,"FACULTY4TEX"));
          tstack.push(INUMBER);
          
      } else {
        
        prefix = ' ';
        infix  = left+'(';
        postfix= right + ')';
        nstack.push(map2string(prefix, f , infix , n1 , postfix,"PREFIX4TEX"));
        vstack.push(map2vector(prefix, f , infix , v1 , postfix,"PREFIX4TEX"));
        
        tstack.push(IEXPRESSION);
        
      }
    } else if (type === IFUNCALL) {

      argCount = item.value;
      args = [];
      targs = [];
      vargs = [];
      while (argCount-- > 0) {
        args.unshift(nstack.pop());
        targs.unshift(tstack.pop());
        vargs.unshift(vstack.pop());
        
      }
      f = nstack.pop();
      ft = tstack.pop();
      fv = vstack.pop();
      if (f == "cases") {
        
        prefix = "\n\\left\\{\n \\begin{array}{lcl}";
        infix  = ' ';
        postfix= "\n  \\end{array}\n\right. ";
        /*\left\{
            \begin{array}{lcl}
                1 & , &  x > 0\\
                -1 & , &  x < 0\\
                 0 & , &
            \end{array}
        \right.
        */

        var max = Math.round(args.length/2 - 0.01);
        var closebrackets = "";
        for (var i = 0; i < max; i++) {
          argstr += "\n  "+args[2*i]+" & , & "+args[2*i+1] + " \\\\ ";
        }
        if (2*max < args.length) {

          argstr += "\n  "+args[2*max]+" & , &   \\\\ ";
        }
        argstr += closebrackets;
        nstack.push(map2string(prefix, f , infix , argstr , postfix));
        vstack.push(map2vector(prefix, f , infix , argstr , postfix));
        tstack.push(ICONDITIONAL);

      } else {
        prefix = ' ';
        infix  = left+'(';
        postfix= right + ')';
        var argstr = args.join(', ');
        nstack.push(map2string(prefix, f , infix , argstr , postfix,"FUNCTION4TEX"));
        vstack.push(map2vector(prefix, f , infix , argstr , postfix,"FUNCTION4TEX"));
        tstack.push(IEXPRESSION);
      }
    } else if (type === IFUNDEF) {

      n2 = nstack.pop();
      argCount = item.value;
      args = [];
      targs = []; 
      vargs = []; 
      while (argCount-- > 0) {
        args.unshift(nstack.pop());
        targs.unshift(tstack.pop());
        vargs.unshift(vstack.pop());
        
      }
      n1 = nstack.pop();
      t1 = tstack.pop();
      v1 = vstack.pop();
      prefix = ' ';
      infix  = left+'(';
      postfix= right + ')';
      var argstr = args.join(', ');
      nstack.push(map2string(prefix, f , infix , argstr , postfix,"FUNCTION4TEX"));
      vstack.push(map2vector(prefix, f , infix , argstr , postfix,"FUNCTION4TEX"));
      tstack.push(IEXPRESSION);

    } else if (type === IMEMBER) {
      n1 = nstack.pop();
      t1 = tstack.pop();
      nstack.push(n1 + '.' + item.value);
      tstack.push(type);
    } else if (type === IARRAY) {
      argCount = item.value;
      args = [];
      targs = []; 
      vargs = []; 
      while (argCount-- > 0) {
        args.unshift(nstack.pop());
        targs.unshift(tstack.pop());
        vargs.unshift(vstack.pop());
      }
      var type4arr = typecast4array(targs);
      var vlength = 1
      if (type4arr == IARRAY) {
        out = begin4matrix(targs.length,"c");
        out += end4matrix(targs.length,vargs);
        tstack.push(IMATRIX);
      } else {
        out = begin4matrix(1,"c");
        out += end4matrix(1,args);
        tstack.push(IARRAY);
      }
      nstack.push(out);
      vstack.push(vargs);
    } else if (type === IEXPR) {
      nstack.push(left+'(' + expressionToLatex(item.value, toBracket) + right+')');
      tstack.push(type);
      vstack.push(IEXPRESSION);
    } else if (type === IENDSTATEMENT) {
      
    } else {
      throw new Error('invalid Expression');
    }
  }
  
  if (nstack.length > 1) {
    if (toBracket) {
      nstack = [ nstack.join(' , ') ];
    } else {
      nstack = [ nstack.join(' ; ') ];
    }
    tstack.push(IARRAY);
    vstack =  [nstack];
  }

  return String(nstack[0]);
}

function escapeValue(v) {
  if (typeof v === 'string') {
    return JSON.stringify(v).replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
  }
  return v;
}

function check4brackets(nt,leftright,bracket) {
  var ret = " ";
  if ((nt != INUMBER) || (nt != IVAR)) {
    ret = leftright + bracket;
  }
  return ret;
}

function map2nstack4latex(t1 ,t2 ,prefix , n1, v1 , infix , n2, v2 , postfix, n1default, n2default,label) {
  var nt = "NONTERM"
  var out;
  if ((t1 === IARRAY) || (t2 === IARRAY)) {
    var vec = map2vector(prefix , v1 , infix , v2 , postfix, n1default, n2default, label);
    
    nt = begin4matrix(1,"c");
    nt += end4matrix(1,vec);
  } else if ((t1 === IMATRIX) || (t2 === IMATRIX)) {
    var mat = map2vector(prefix , v1 , infix , v2 , postfix, n1default, n2default, label);
    if (mat && mat.length > 0) {
      nt = begin4matrix(mat[0].length,"c");
      nt += end4matrix(1,vec);
    } else {
      nt = begin4matrix(1,"c");
      nt += end4matrix(1,[["undefinedmatrix"]]);
    }
  
  } else {
    nt = map2string(prefix, n1 , infix , n2 , postfix);
  }
  return nt;
}

/*
if (type4arr == IARRAY) {
  out = begin4matrix(targs.length,"c");
  out += end4matrix(targs.length,vargs);
  tstack.push(IMATRIX);
} else {
  out = begin4matrix(1,"c");
  out += end4matrix(1,args);
  tstack.push(IARRAY);
}
if (type === IARRAY) {
  
  array_level++;
  if (hasMatrixElements(item.value) > 0) {
    var cols = hasMatrixElements(item.value);
    var coldef = getMatrixColDef(cols,"c");
    var arr = item.value;
    var out = left+"("+"\n\\begin{array}{"+coldef+"}";
    for (var i = 0; i < arr.length; i++) {
      
      if (Array.isArray(arr[i])) {
        out += '  \n' + (arr[i]).map(escapeValue).join(' & ') + '\\\\';
      } else {
        out += escapeValue(arr[i]);
      }
    }
    out += "\n\\end{array} \\right)";
    nstack.push(out);
    tstack.push(IMATRIX);
  } else if (Array.isArray(item.value)) {
    var out = "\\left( \n\\begin{array}{"+coldef+"}";
    var coldef = getMatrixColDef(item.value.length,"c");
    out += item.value.map(escapeValue).join(' & ') + "\\\\";
    out += "\n\\end{array} \\right)";
    
    nstack.push(out);
    tstack.push();
  } else {
    nstack.push(escapeValue(item.value));
    tstack.push(type);
  }
} else
*/

function add(a, b) {
  return Number(a) + Number(b);
}

function sub(a, b) {
  return a - b;
}

function mul(a, b) {
  return a * b;
}

function div(a, b) {
  return a / b;
}

function mod(a, b) {
  return a % b;
}

function concat(a, b) {
  if (Array.isArray(a) && Array.isArray(b)) {
    return a.concat(b);
  }
  return '' + a + b;
}

function equal(a, b) {
  return a === b;
}

function notEqual(a, b) {
  return a !== b;
}

function greaterThan(a, b) {
  return a > b;
}

function lessThan(a, b) {
  return a < b;
}

function greaterThanEqual(a, b) {
  return a >= b;
}

function lessThanEqual(a, b) {
  return a <= b;
}

function andOperator(a, b) {
  return Boolean(a && b);
}

function orOperator(a, b) {
  return Boolean(a || b);
}

function inOperator(a, b) {
  return contains(b, a);
}

function sinh(a) {
  return ((Math.exp(a) - Math.exp(-a)) / 2);
}

function cosh(a) {
  return ((Math.exp(a) + Math.exp(-a)) / 2);
}

function tanh(a) {
  if (a === Infinity) return 1;
  if (a === -Infinity) return -1;
  return (Math.exp(a) - Math.exp(-a)) / (Math.exp(a) + Math.exp(-a));
}

function asinh(a) {
  if (a === -Infinity) return a;
  return Math.log(a + Math.sqrt((a * a) + 1));
}

function acosh(a) {
  return Math.log(a + Math.sqrt((a * a) - 1));
}

function atanh(a) {
  return (Math.log((1 + a) / (1 - a)) / 2);
}

function log10(a) {
  return Math.log(a) * Math.LOG10E;
}

function neg(a) {
  return -a;
}

function not(a) {
  return !a;
}

function trunc(a) {
  return a < 0 ? Math.ceil(a) : Math.floor(a);
}

function random(a) {
  return Math.random() * (a || 1);
}

function factorial(a) { 
  return gamma(a + 1);
}

function isInteger(value) {
  return isFinite(value) && (value === Math.round(value));
}

var GAMMA_G = 4.7421875;
var GAMMA_P = [
  0.99999999999999709182,
  57.156235665862923517, -59.597960355475491248,
  14.136097974741747174, -0.49191381609762019978,
  0.33994649984811888699e-4,
  0.46523628927048575665e-4, -0.98374475304879564677e-4,
  0.15808870322491248884e-3, -0.21026444172410488319e-3,
  0.21743961811521264320e-3, -0.16431810653676389022e-3,
  0.84418223983852743293e-4, -0.26190838401581408670e-4,
  0.36899182659531622704e-5
];

function gamma(n) {
  var t, x;

  if (isInteger(n)) {
    if (n <= 0) {
      return isFinite(n) ? Infinity : NaN;
    }

    if (n > 171) {
      return Infinity; 
    }

    var value = n - 2;
    var res = n - 1;
    while (value > 1) {
      res *= value;
      value--;
    }

    if (res === 0) {
      res = 1; 
    }

    return res;
  }

  if (n < 0.5) {
    return Math.PI / (Math.sin(Math.PI * n) * gamma(1 - n));
  }

  if (n >= 171.35) {
    return Infinity; 
  }

  if (n > 85.0) { 
    var twoN = n * n;
    var threeN = twoN * n;
    var fourN = threeN * n;
    var fiveN = fourN * n;
    return Math.sqrt(2 * Math.PI / n) * Math.pow((n / Math.E), n) *
      (1 + (1 / (12 * n)) + (1 / (288 * twoN)) - (139 / (51840 * threeN)) -
      (571 / (2488320 * fourN)) + (163879 / (209018880 * fiveN)) +
      (5246819 / (75246796800 * fiveN * n)));
  }

  --n;
  x = GAMMA_P[0];
  for (var i = 1; i < GAMMA_P.length; ++i) {
    x += GAMMA_P[i] / (n + i);
  }

  t = n + GAMMA_G + 0.5;
  return Math.sqrt(2 * Math.PI) * Math.pow(t, n + 0.5) * Math.exp(-t) * x;
}

function stringOrArrayLength(s) {
  if (Array.isArray(s)) {
    return s.length;
  }
  return String(s).length;
}

function hypot() {
  var sum = 0;
  var larg = 0;
  for (var i = 0; i < arguments.length; i++) {
    var arg = Math.abs(arguments[i]);
    var div;
    if (larg < arg) {
      div = larg / arg;
      sum = (sum * div * div) + 1;
      larg = arg;
    } else if (arg > 0) {
      div = arg / larg;
      sum += div * div;
    } else {
      sum += arg;
    }
  }
  return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
}

function condition(cond, yep, nope) {
  return cond ? yep : nope;
}

/**
* Decimal adjustment of a number.
* From @escopecz.
*
* @param {Number} value The number.
* @param {Integer} exp  The exponent (the 10 logarithm of the adjustment base).
* @return {Number} The adjusted value.
*/
function roundTo(value, exp) {
  
  if (typeof exp === 'undefined' || +exp === 0) {
    return Math.round(value);
  }
  value = +value;
  exp = -(+exp);
  
  if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
    return NaN;
  }
  
  value = value.toString().split('e');
  value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
  
  value = value.toString().split('e');
  return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
}

function setVar(name, value, variables) {
  if (variables) variables[name] = value;
  return value;
}

function arrayIndex(array, index) {
  return array[index | 0];
}

function max(array) {
  if (arguments.length === 1 && Array.isArray(array)) {
    return Math.max.apply(Math, array);
  } else {
    return Math.max.apply(Math, arguments);
  }
}

function min(array) {
  if (arguments.length === 1 && Array.isArray(array)) {
    return Math.min.apply(Math, array);
  } else {
    return Math.min.apply(Math, arguments);
  }
}

function arrayMap(f, a) {
  if (typeof f !== 'function') {
    throw new Error('First argument to map is not a function');
  }
  if (!Array.isArray(a)) {
    throw new Error('Second argument to map is not an array');
  }
  return a.map(function (x, i) {
    return f(x, i);
  });
}

function arrayFold(f, init, a) {
  if (typeof f !== 'function') {
    throw new Error('First argument to fold is not a function');
  }
  if (!Array.isArray(a)) {
    throw new Error('Second argument to fold is not an array');
  }
  return a.reduce(function (acc, x, i) {
    return f(acc, x, i);
  }, init);
}

function arrayFilter(f, a) {
  if (typeof f !== 'function') {
    throw new Error('First argument to filter is not a function');
  }
  if (!Array.isArray(a)) {
    throw new Error('Second argument to filter is not an array');
  }
  return a.filter(function (x, i) {
    return f(x, i);
  });
}

function stringOrArrayIndexOf(target, s) {
  if (!(Array.isArray(s) || typeof s === 'string')) {
    throw new Error('Second argument to indexOf is not a string or array');
  }

  return s.indexOf(target);
}

function arrayJoin(sep, a) {
  if (!Array.isArray(a)) {
    throw new Error('Second argument to join is not an array');
  }

  return a.join(sep);
}

function sign(x) {
  return ((x > 0) - (x < 0)) || +x;
}

var ONE_THIRD = 1/3;
function cbrt(x) {
  return x < 0 ? -Math.pow(-x, ONE_THIRD) : Math.pow(x, ONE_THIRD);
}

function expm1(x) {
  return Math.exp(x) - 1;
}

function log1p(x) {
  return Math.log(1 + x);
}

function log2(x) {
  return Math.log(x) / Math.LN2;
}

function sum(array) {
  if (!Array.isArray(array)) {
    throw new Error('Sum argument is not an array');
  }

  return array.reduce(function (total, value) {
    return total + Number(value);
  }, 0);
}

function getSymbols(tokens, symbols, options) {
  options = options || {};
  var withMembers = !!options.withMembers;
  var prevVar = null;

  for (var i = 0; i < tokens.length; i++) {
    var item = tokens[i];
    if (item.type === IVAR || item.type === IVARNAME) {
      if (!withMembers && !contains(symbols, item.value)) {
        symbols.push(item.value);
      } else if (prevVar !== null) {
        if (!contains(symbols, prevVar)) {
          symbols.push(prevVar);
        }
        prevVar = item.value;
      } else {
        prevVar = item.value;
      }
    } else if (item.type === IMEMBER && withMembers && prevVar !== null) {
      prevVar += '.' + item.value;
    } else if (item.type === IEXPR) {
      getSymbols(item.value, symbols, options);
    } else if (prevVar !== null) {
      if (!contains(symbols, prevVar)) {
        symbols.push(prevVar);
      }
      prevVar = null;
    }
  }

  if (prevVar !== null && !contains(symbols, prevVar)) {
    symbols.push(prevVar);
  }
}

var INUMBER = 'INUMBER';
var IOP1 = 'IOP1';
var IOP2 = 'IOP2';
var IOP3 = 'IOP3';
var IVAR = 'IVAR';
var IVARNAME = 'IVARNAME';
var IFUNCALL = 'IFUNCALL';
var IFUNDEF = 'IFUNDEF';
var ICONDIF = 'ICONDIF';
var ISIGN = 'ISIGN';
var IEXPR = 'IEXPR';
var IRETURN = 'IRETURN';
var IDEFINITION = 'IDEFINITION';
var IEXPRESSION = 'IEXPRESSION';
var IEXPREVAL = 'IEXPREVAL';
var IMEMBER = 'IMEMBER';
var IMEMBERPATH = 'IMEMBERPATH';
var IENDSTATEMENT = 'IENDSTATEMENT';
var IARRAY = 'IARRAY';
var IMATRIX = 'IMATRIX';
var IBOOLEAN = 'IBOOLEAN';
var ISTRING = 'ISTRING';
var IMIXEDTYPE = 'IMIXEDTYPE';
var IUNDEFINED = 'IUNDEFINED';
var ICONDITIONAL = 'ICONDITIONAL';
var ICASES = 'ICASES';

var STRUE = "true";
var SFALSE = "false";

function Instruction4MathJS(type, value) {
  this.type = type;
  this.value = (value !== undefined && value !== null) ? value : 0;
}

Instruction4MathJS.prototype.setBooleanString = function (pTrue,pFalse) {
  STRUE  = pTrue;
  SFALSE = pFalse;
}

Instruction4MathJS.prototype.toString = function () {
  switch (this.type) {
    case INUMBER:
    case IOP1:
    case IOP2:
    case IOP3:
    case IVAR:
    case IVARNAME:
    case IENDSTATEMENT:
      return this.value;
    case IFUNCALL:
      return 'CALL ' + this.value;
    case IFUNDEF:
      return 'DEF ' + this.value;
    case IARRAY:
      return 'ARRAY ' + this.value;
    case IMATRIX:
      return 'MATRIX ' + this.value;
    case IMEMBER:
      return '.' + this.value;
    default:
      return 'Invalid Instruction';
  }
};

function unaryInstruction(value) {
  return new Instruction4MathJS(IOP1, value);
}

function binaryInstruction(value) {
  return new Instruction4MathJS(IOP2, value);
}

function ternaryInstruction(value) {
  return new Instruction4MathJS(IOP3, value);
}

  this.Parser = Parser4MathJS;

}; 
