import Vector from '../src/vector';
import * as Chance from 'chance';
import Big from 'big.js';

const chance = new Chance();

/* ----------------------------------------------------
    点积（内积）
----------------------------------------------------- */
describe('[Big Operator] 向量乘积相关 - dot()', () => {
  let a, b, int1, int2, int3, int4;
  beforeEach(() => {
    int1 = chance.floating({ min: 0, max: 100, fixed: 8 });
    int2 = chance.floating({ min: 0, max: 100, fixed: 8 });
    int3 = chance.floating({ min: 0, max: 100, fixed: 8 });
    int4 = chance.floating({ min: 0, max: 100, fixed: 8 });
    a = new Vector(int1, int2);
    b = new Vector(int3, int4);
  });

  test('两向量内积是数值', () => {
    const result = a.dot(b);
    expect(result).toBe(
      new Big(int1)
        .times(int3)
        .plus(new Big(int2).times(int4))
        .toString()
    );
  });

  test('该操作不影响原来向量的数值', () => {
    a.divideY(b);
    expect(a.x).toBe(int1.toString());
    expect(a.y).toBe(int2.toString());
    expect(b.x).toBe(int3.toString());
    expect(b.y).toBe(int4.toString());
  });
  test('使用 JS 内置大数算术体系', () => {
    expect(a.operatorSystem.name).toBe('BigOperatorSystem');
    expect(b.operatorSystem.name).toBe('BigOperatorSystem');
  });
});

/* ----------------------------------------------------
    外积（叉积）
----------------------------------------------------- */
describe('[Big Operator] 向量乘积相关 - cross()', () => {
  let a, b, int1, int2, int3, int4;
  beforeEach(() => {
    int1 = chance.floating({ min: 0, max: 100, fixed: 8 });
    int2 = chance.floating({ min: 0, max: 100, fixed: 8 });
    int3 = chance.floating({ min: 0, max: 100, fixed: 8 });
    int4 = chance.floating({ min: 0, max: 100, fixed: 8 });
    a = new Vector(int1, int2);
    b = new Vector(int3, int4);
  });

  test('两向量外积也是数值', () => {
    const result = a.cross(b);
    expect(result).toBe(
      new Big(int1)
        .times(int4)
        .minus(new Big(int2).times(int3))
        .toString()
    );
  });

  test('该操作不影响原来向量的数值', () => {
    a.divideY(b);
    expect(a.x).toBe(int1.toString());
    expect(a.y).toBe(int2.toString());
    expect(b.x).toBe(int3.toString());
    expect(b.y).toBe(int4.toString());
  });
  test('使用 JS 内置大数算术体系', () => {
    expect(a.operatorSystem.name).toBe('BigOperatorSystem');
    expect(b.operatorSystem.name).toBe('BigOperatorSystem');
  });
});

/* ----------------------------------------------------
    外积（叉积）
----------------------------------------------------- */
describe('[Big Operator] 向量乘积相关 - projectOnto()', () => {
  let a, b;
  beforeEach(() => {
    a = new Vector(100, 0);
    b = new Vector(20, 20);
  });

  test('从 (100, 100) 投影到 (20, 20) 上为 (50, 50)', () => {
    const result = a.projectOnto(b);
    expect(result.x).toBe('50');
    expect(result.y).toBe('50');
  });

  test('该操作不影响原来向量的数值', () => {
    a.divideY(b);
    expect(a.x).toBe('100');
    expect(a.y).toBe('0');
    expect(b.x).toBe('20');
    expect(b.y).toBe('20');
  });

  test('使用 JS 内置大数算术体系', () => {
    expect(a.operatorSystem.name).toBe('BigOperatorSystem');
    expect(b.operatorSystem.name).toBe('BigOperatorSystem');
  });
});

/* ----------------------------------------------------
    两向量的夹角 cos 值
----------------------------------------------------- */
describe('[Big Operator] 向量乘积相关 - cosAngleBetween()', () => {
  let a, b;
  beforeEach(() => {
    a = new Vector(3, 4);
    b = new Vector(4, 3);
  });

  test(' (4, 3) 和 (3, 4) 两向量之间的夹角 cos 值为 0.96', () => {
    const result = a.cosAngleBetween(b);
    expect(result).toBe('0.96');
  });

  test('该操作不影响原来向量的数值', () => {
    a.divideY(b);
    expect(a.x).toBe('3');
    expect(a.y).toBe('4');
    expect(b.x).toBe('4');
    expect(b.y).toBe('3');
  });

  test('使用 JS 内置大数算术体系', () => {
    expect(a.operatorSystem.name).toBe('BigOperatorSystem');
    expect(b.operatorSystem.name).toBe('BigOperatorSystem');
  });
});

/* ----------------------------------------------------
    两向量的夹角
----------------------------------------------------- */
describe('[Big Operator] 向量乘积相关 - angleBetween()', () => {
  let a, b;
  let precision = 7;
  beforeEach(() => {
    a = new Vector(1, 0);
    b = new Vector(1, 1);
  });

  test(' (1, 0) 和 (0, 1) 两向量之间的夹角为 PI / 4', () => {
    const result = a.angleBetween(b);
    expect(result.slice(0, precision)).toBe(
      new Big(Math.PI / 4).toString().slice(0, precision)
    );
  });

  test('该操作不影响原来向量的数值', () => {
    a.divideY(b);
    expect(a.x).toBe('1');
    expect(a.y).toBe('0');
    expect(b.x).toBe('1');
    expect(b.y).toBe('1');
  });

  test('使用 JS 内置大数算术体系', () => {
    expect(a.operatorSystem.name).toBe('BigOperatorSystem');
    expect(b.operatorSystem.name).toBe('BigOperatorSystem');
  });
});

/* ----------------------------------------------------
    距离
----------------------------------------------------- */
describe('[Big Operator] 向量距离 - distanceX()', () => {
  let a, b, int1, int2, int3, int4;
  beforeEach(() => {
    int1 = chance.floating({ min: 0, max: 100, fixed: 8 });
    int2 = chance.floating({ min: 0, max: 100, fixed: 8 });
    int3 = chance.floating({ min: 0, max: 100, fixed: 8 });
    int4 = chance.floating({ min: 0, max: 100, fixed: 8 });
    a = new Vector(int1, int2);
    b = new Vector(int3, int4);
  });

  test('两向量 X 轴量相减', () => {
    const result = a.distanceX(b);
    expect(result).toBe(new Big(int1).minus(int3).toString());
    expect(a.absDistanceX(b)).toBe(
      new Big(int1)
        .minus(int3)
        .abs()
        .toString()
    );
  });

  test('该操作不影响原来向量的数值', () => {
    a.divideY(b);
    expect(a.x).toBe(int1.toString());
    expect(a.y).toBe(int2.toString());
    expect(b.x).toBe(int3.toString());
    expect(b.y).toBe(int4.toString());
  });

  test('使用 JS 内置大数算术体系', () => {
    expect(a.operatorSystem.name).toBe('BigOperatorSystem');
    expect(b.operatorSystem.name).toBe('BigOperatorSystem');
  });
});

describe('[Big Operator] 向量距离 - distanceY()', () => {
  let a, b, int1, int2, int3, int4;
  beforeEach(() => {
    int1 = chance.floating({ min: 0, max: 100, fixed: 8 });
    int2 = chance.floating({ min: 0, max: 100, fixed: 8 });
    int3 = chance.floating({ min: 0, max: 100, fixed: 8 });
    int4 = chance.floating({ min: 0, max: 100, fixed: 8 });
    a = new Vector(int1, int2);
    b = new Vector(int3, int4);
  });

  test('两向量 Y 轴量相减', () => {
    const result = a.distanceY(b);
    expect(result).toBe(new Big(int2).minus(int4).toString());
    expect(a.absDistanceY(b)).toBe(
      new Big(int2)
        .minus(int4)
        .abs()
        .toString()
    );
  });

  test('该操作不影响原来向量的数值', () => {
    a.divideY(b);
    expect(a.x).toBe(int1.toString());
    expect(a.y).toBe(int2.toString());
    expect(b.x).toBe(int3.toString());
    expect(b.y).toBe(int4.toString());
  });

  test('使用 JS 内置大数算术体系', () => {
    expect(a.operatorSystem.name).toBe('BigOperatorSystem');
    expect(b.operatorSystem.name).toBe('BigOperatorSystem');
  });
});

describe('[Big Operator] 向量距离 - distance()', () => {
  let a, b;
  beforeEach(() => {
    a = new Vector(100, 50);
    b = new Vector(200, 60);
  });

  test('两向量(100, 50)、(200, 60)距离的平方是 10100', () => {
    const result = a.distanceSq(b);
    expect(result).toBe('10100');
    expect(a.distance(b)).toBe(new Big('10100').sqrt().toString());
  });

  test('该操作不影响原来向量的数值', () => {
    a.divideY(b);
    expect(a.x).toBe('100');
    expect(a.y).toBe('50');
    expect(b.x).toBe('200');
    expect(b.y).toBe('60');
  });

  test('使用 JS 内置大数算术体系', () => {
    expect(a.operatorSystem.name).toBe('BigOperatorSystem');
    expect(b.operatorSystem.name).toBe('BigOperatorSystem');
  });
});
