import createSpace, { BigOperatorSystem } from '../src/vector';
import * as Chance from 'chance';
const chance = new Chance();

describe('[Big Operator] 工厂函数 - 调用工厂返回具体类', () => {
  let spaceNum;
  beforeEach(() => {
    spaceNum = chance.integer({ min: 2, max: 50 });
  });

  test('调用工厂函数创建具体向量类，可以直接实例化', () => {
    const VectorN = createSpace(spaceNum);
    expect(VectorN.SYSTEM).toBe(BigOperatorSystem);
    const a = VectorN({});
    const index = chance.integer({ min: 1, max: spaceNum });
    expect(a.x(index)).toBe('0');
  });
});

describe('[Big Operator] 构造函数 - 具体类的实例化', () => {
  let num1, num2, num3, num4;
  beforeEach(() => {
    num1 = chance.floating({ min: 0, max: 100, fixed: 8 });
    num2 = chance.floating({ min: 0, max: 100, fixed: 8 });
    num3 = chance.floating({ min: 0, max: 100, fixed: 8 });
    num4 = chance.floating({ min: 0, max: 100, fixed: 8 });
  });

  test('可以直接以函数方式实例化', () => {
    const Vector3 = createSpace(3);
    const a = Vector3([num1, num2, num3]);
    expect(a.operatorSystem.name).toBe('BigOperatorSystem');
    expect(a.dim).toBe(3);
    expect(a.x(1)).toBe('' + num1);
    expect(a.x2).toBe('' + num2);
  });

  test('可以使用 new 关键字实例化', () => {
    const Vector4 = createSpace(4);
    const a = new Vector4([num1, num2, num3, num4]);
    expect(a.operatorSystem.name).toBe('BigOperatorSystem');
    expect(a.dim).toBe(4);
    expect(a.x(1)).toBe('' + num1);
    expect(a.x4).toBe('' + num4);
  });

  test('具体类可接受对象生成向量', () => {
    const Vector4 = createSpace(4);
    const a = Vector4({ 1: num1, 2: num2, 3: num3, 4: num4 });
    expect(a.operatorSystem.name).toBe('BigOperatorSystem');
    expect(a.dim).toBe(4);
    expect(a.x(1)).toBe('' + num1);
    expect(a.x4).toBe('' + num4);
  });

  test('具体类可接受对象生成稀疏向量', () => {
    const Vector4 = createSpace(4);
    const a = Vector4({ 1: num1, 4: num4 });
    expect(a.operatorSystem.name).toBe('BigOperatorSystem');
    expect(a.dim).toBe(4);
    expect(a.x(1)).toBe('' + num1);
    expect(a.x(2)).toBe('0');
    expect(a.x3).toBe('0');
    expect(a.x4).toBe('' + num4);
  });
});

describe('[Big Operator] 构造函数 - 具体类的特殊属性', () => {
  let num1, num2, num3, num4;
  beforeEach(() => {
    num1 = chance.floating({ min: 0, max: 100, fixed: 8 });
    num2 = chance.floating({ min: 0, max: 100, fixed: 8 });
    num3 = chance.floating({ min: 0, max: 100, fixed: 8 });
    num4 = chance.floating({ min: 0, max: 100, fixed: 8 });
  });

  test('编号从 1 ~ N 开始而不是 0 ~ N-1', () => {
    const Vector3 = createSpace(3);
    const a = Vector3([num1, num2, num3]);
    expect(a.operatorSystem.name).toBe('BigOperatorSystem');
    expect(() => a.x(0)).toThrow(); // 访问 0 则报错
    expect(() => a.x(4)).toThrow(); // 访问超过范围则报错
    expect(a.x(1)).toBe('' + num1);
    expect(a.x2).toBe('' + num2);
    expect(a.x3).toBe('' + num3);
  });
});

describe('[Big Operator] 静态方法 - fromArray()', () => {
  let a;
  const arr = [chance.floating(), chance.floating(), chance.floating()];
  const Vector3 = createSpace(3);
  beforeEach(() => {
    a = Vector3.fromArray(arr);
  });
  test('该方法应当返回 Vector 实例', () => {
    expect(a).toBeInstanceOf(Vector3);
  });
  test('该方法所生成的向量数值来源于数组', () => {
    expect(a.x(1)).toBe('' + arr[0]);
    expect(a.x2).toBe('' + arr[1]);
    expect(a.x(3)).toBe('' + arr[2]);
  });

  test('使用 JS 内置大数算术体系', () => {
    expect(a.operatorSystem.name).toBe('BigOperatorSystem');
  });
});

// describe('[Big Operator] 静态方法 - fromObject()', () => {
//   var a;
//   const obj = {
//     x: chance.floating(),
//     y: chance.floating(),
//     z: chance.floating()
//   };
//   beforeEach(() => {
//     a = Vector.fromObject(obj);
//   });
//   test('该方法应当返回 Vector 实例', () => {
//     expect(a).toBeInstanceOf(Vector);
//   });
//   test('该方法所生成的向量数值来源于对象', () => {
//     expect(a.x).toBe(obj.x.toString());
//     expect(a.y).toBe(obj.y.toString());
//   });

//   test('兼容空对象的情况', () => {
//     a = Vector.fromArray({});
//     expect(a.x).toBe('0');
//     expect(a.y).toBe('0');
//   });
//   test('使用 JS 内置大数算术体系', () => {
//     expect(a.operatorSystem.name).toBe('BigOperatorSystem');
//   });
// });
