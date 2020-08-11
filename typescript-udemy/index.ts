type User =
  | {
      name: string;
      age: number;
      id: string;
    }
  | {
      name: string;
      age: number;
      gender: string;
    };

const user = {} as User;
/** 推論結果 */
// 互換性のあるプロパティのみにしかアクセスできない
// const User = {
//   name: string;
//   age: number;
// }

const user1: User = {
  name: "",
  age: 0,
  gender: "",
};

type DeclaredUser = typeof user;
/** 推論結果 */
// const DeclaredUser: {
//   name: string
//   age: number
//   gender: string
// }

interface User2 {
  tag: "other";
  id: string;
}
interface AppUser {
  tag: "app";
  appID: string;
}
interface ServiceUser {
  tag: "service";
  serviceID: string;
}
// tagでの絞り込み
function getUserByIdSwitch(user: AppUser | ServiceUser | User2) {
  switch (user.tag) {
    case "app":
      return user.appID;
    case "service":
      return user.serviceID;
    default:
      return user.id;
  }
}

// inで絞り込む
interface User3 {
  id: string;
}
interface AppUser2 {
  appName: "appName";
  appId: string;
}
function getUserId(user: AppUser2 | User3) {
  if ("appName" in user) {
    return user.appId;
  }
  if ("id" in user) {
    return user.id;
  }
}

// Generics

// 変数Annotation の Generics
interface SampleGenerics<T> {
  value: T;
}
const numberSample: SampleGenerics<number> = {
  value: 10,
};

// 引数Annotation の Generics
function toPayloadObject<T>(props: T) {
  return { payload: props };
}
const hasAmount = toPayloadObject({ amount: 10 });
const hasUser = toPayloadObject({ name: "Taro", age: 10 });

// Genericsの制約
interface StringGenerics<T extends string> {
  value: T;
}
const hasNumber: StringGenerics<number> = { value: 10 };
const hasString: StringGenerics<string> = {
  value: "20",
};

interface Input {
  value: number;
  amount: number;
}
function compute<T extends Input>(props: T) {
  return {
    value: props.value,
    amount: props.amount,
    computed: props.value ** props.amount,
  };
}
const computed = compute({ value: 10, amount: 2 });

// Generics複数指定
function merge<T, U>(inputA: T, inputB: U) {
  return Object.assign({}, inputA, inputB)
}
const merged = merge({foo: 'foo'}, {bar: 10})

// 推論・抽出
let asString = 'string'
let asNumber = 0
type PrimitiveUnion = typeof asString | typeof asNumber

function getSomething() {
  return { foo: 'foo', bar: 1, baz: false}
}
const something = getSomething()

const target: typeof something = {
  foo: 'FOO',
  bar: 0,
  baz: true
}

// json型を抽出
import json
type Banana = (typeof json)['banana']

const a = 'a'
let b = a


// TupleToUnion型
// 配列にある値の型を全て抽出する
type TupleToUnion<T> = T extends (infer I)[] ? I : never
type FruitTuple = ["banana", "apple", "orange"]
type FruitsUnionTuple = TupleToUnion<FruitTuple>

// MapToUnion型
type MapToUnion<T> = T extends {[k: string]: infer I} ? I : never
type FruitsMap = {
  banana: 'banana',
  apple: 'apple',
  orange: 'orange'
}
type FruitsUnionMap = MapToUnion<FruitsMap>

// 任意型と互換性のある型を抽出
type FruitsMap1 = {
  banana: { name: "banana", price: number }
  apple: { name: "apple", price: number }
  orange: { name: "orange" }
}
type Filter<T> = T extends {price: number} ? T : never
type Banana = Filter<{ name: "banana", price: number }> // 推論　{name: "banana", price: "number"}
type Orange = Filter<{ name: "orange"}> // 推論 never

// 変換・定義
type UserDefinition = {
  id: string;
  name: string;
  age?: number;
}
// Diff型
type Diff<T,U> = T extends U ? never : T
// readonly型
type ReadOnlyUser = Readonly<UserDefinition>
// required型
type RequireUser = Required<UserDefinition>
// partial型 | undefined
type PartialUser = Partial<UserDefinition>
// nullable
type Nullable<T> = {[ K in keyof T]?: T[K] | null}
type NullableUser = Nullable<User>
// non nullable
type NonNullableUser = NonNullable<User>

// ts errorHandling
// ● 何かが失敗したことを単に知らせることを望むのか(null、Option)、それとも、なぜ失敗した のかについてより多くの情報を与えることを望むのか(例外をスローする、例外を返す)。
// ● 起こり得るすべての例外を明示的に処理するよう利用者に強制することを望むのか(例外を返 す)、それとも、エラー処理のボイラープレート(定型的なコード)をより少なく記述させることを 望むのか(例外をスローする)。
// ● エラーを組み立てる方法を必要とするのか(Option)、それとも、エラーが発生したときにそれら を単に処理するのか(null、例外)。

// 非同期プログラミング
// javascriptのイベントループ
// コールバックの処理
  //  promiseの概念を説明する。非同期の作業を抽象化してそれらを組み立てたり直列に並べたりすることを可能にする

/**
 * Tuple
 * 配列の要素数が固定になっている(typescript独自の型)
 * pushはできてしまう(そこまで確認はtypescriiptはできない)
 */
const tupleSample: { role: [number, string] } = {
  role: [1, "first"],
};

/**
 * Enum　列挙型
 * 定数の集合に名前をつけて管理する(typescript独自の型)
 */
enum Role {
  ADMIN,
  READ_ONLY,
  AUTHOR,
}

const enumSample = {
  role: Role.ADMIN,
};

/**
 * Union型
 * 型を複数指定できる
 *
 * リテラル型
 * 変数がその方しか許容しなくなっている状態
 * const hoge: 'hoge' = 'hoge'
 */
const combine = (a: number | string, b: number | string) => {
  let r: string | number;
  if (typeof a === "number" && typeof b === "number") {
    r = a + b;
  } else {
    r = a.toString() + b.toString();
  }
  return r;
};

const combinedAges = combine(30, 26);
console.log(combinedAges);

const combinedNames = combine("katsuta", "keito");
console.log(combinedNames);

/**
 * エイリアス型
 * 型を集約することでどこでも再利用することができる
 */
type Sample = number | string;
type SampleLiteral = "sample" | "sample1";

/**
 * function
 * typescriptのvoid関数の戻り値はundefinedになる
 * 値を返さないなら、undefinedを関数の戻り値はおかしい。基本的にvoid
 */
// コールバック関数型付け
const callBackSample = (a: number, b: number, c: (num: number) => void) => {
  const result = a + b;
  c(result);
};

callBackSample(10, 20, (result) => {
  console.log(result);
});

/**
 * unknown型
 * 最終的になるどのような型になるかがわからない
 * anyよりは型の恩恵を受けれるのでunknown使ったほうがいいかも
 */
let user: unknown;
let userName: string;

user = 5;
userName = "Sample";

/**
 * never型
 * 関数の戻り値の方として利用される.
 * こいつは値を絶対返さないという目印にする
 * よくエラーをまとめるところで明示的に使うらしい
 * - Void型は関数が正常に終了した結果何も返さない時です。
 * - Never型は、そもそも関数が正常に終了して値が帰ってくるわけないという場合です
 */
const neverSample = (message: string, code: number): never => {
  throw { message, errorCode: code };
};

const result = neverSample("Error", 500);
console.log(result);

/**
 * コンパイラやtypescriptの設定
 */
// tscコマンドでのコンパイルを都度せず watchモードを使う
// tsc hoge.ts -w (特定のファイルをコンパイルする場合)

// 複数ファイルをコンパイルする場合
// tsc --init (projectフォルダを指定するため。typescriptのprojectとだよということ)
// tsconfig.jsonが作られる。これでproject内のtsファイルを全てコンパイルしてくれるようになる
// tscコマンドで全てコンパイル可能。watchも可能

// tsconfigでコンパイル対象を除外する(tsconfigにexclude:[]を追加する)
// node_modulesは除外はdefaultでしてあるけどexcludeを使う場合は明示的に書く必要がある

// compilerOption詳細
// target →　どのバージョンのJavaScriptでコンパイルするか（古いブラウザで使いたい場合はふるいバージョンにする）
// module →
// lib →　設置されていない場合はデフォルトの設定値がされている
// allowJs → trueにするとts以外のjsもコンパイル対象になる
// checkJs → trueにするとts以外のjsのコードのチェックはしてくれる
// jsx →　react使うときに設定する
// declartion　→　何か外部にライブラリとして公開したい場合に設定する
// sourceMap　→ デバッグで役に立つ。trueにするとchromeのsourceでtsを確認できたりデバッグができる
// outDir → js出力先(フォルダ構成も引き継がれる)
// rootDir → ソースが入ってるルートディレクトリを設定する(明示的に指定したディレクトリは以下のものしかコンパイルしないということになる)
// removeComments → コンパイル時のコメントを排除する(ファイル小さくできる)
// noEmit → JSを出力しないようにする
// noEmitOnError → コンパイルエラーがある場合はJSを出力しない
// strict → 型チェックを厳格する

/**
 * Typescriptとモダンなjavascript
 * 対応ブラウザの表(https://kangax.github.io/compat-table/es6/)
 */
// polifillはブラウザがサポートしていない機能を提供する
// varとletの違い(varはグローバルスコープと関数内スコープしかない。　letはブロックスコープ)
// スプレッド構文
// 配列
const h = ["sports", "cooking"];
const ah = ["Hiking", ...h]; // hを展開して代入
ah.push(...h); // 上記同様
// オブジェクト
const p = {
  name: "Keito",
  age: 20,
};
const copiedPerson = {
  ...p, // pの値をコピー
};

// 残余引数(restパラメタ)タプルの場合も可能
const add = (...numbers: number[]) => {
  return numbers.reduce((result, value) => {
    return result + value;
  }, 0);
};
const addNumbers = add(5, 12, 10, 2, 4);
console.log(addNumbers);

// 分割代入
// 配列
const hobbies = ["a", "b", "c", "d"];
const [h1, h2, ...h3] = hobbies;

// オブジェクト
const s = {
  title: "hoge",
  price: 2,
};
const { title, price } = s;

/**
 * クラス＆インターフェース
 */
// abstract(抽象) classは継承することしかできない(インスタンス化できない)
abstract class Department {
  // class field
  // name: string;
  // 外部からのアクセスを禁止する(javascriptにはpublic, privateのような概念がない)
  protected employees: string[] = [];

  static fiscalYear = 2020;

  static createEmployee(name: string) {
    return { name: name };
  }

  // fieldの定義初期化の短縮
  // 初期化時以外はreadonlyなのでidは変更できない
  constructor(public readonly id: string, private name: string) {}

  describe(this: Department) {
    console.log(this.name);
  }

  addEmployees(employee: string) {
    this.employees.push(employee);
  }

  // 継承することを強制する(abstract)
  abstract printEmployeeInformation(): void;
}

// 継承するとサブクラスから継承もとのメソッドなどもアクセス可能
class ITDepartment extends Department {
  admins: string[];
  private age: number;
  // シングルトン用インスタンス保持用のプロパティ
  private static instance: ITDepartment;
  private constructor(id: string, admins: string[]) {
    // 他のクラスを継承したクラスにコンストラクタを追加する時に
    // superを使ってbaseクラスのコンストラクタを呼び出す
    // thisを呼び出す前にsuperを呼ぶ
    // 正楽的な書き方する際は不要
    super(id, "IT");
    this.admins = admins;
  }

  // シングルトン用のインスタンス取得メソッド
  static getInstance() {
    if (ITDepartment.instance) {
      return this.instance;
    }
    this.instance = new ITDepartment("d3", []);
    return this.instance;
  }

  // getter fieldアクセス
  get getAge() {
    return this.age;
  }

  // setter fieldアクセス
  set setAge(age: number) {
    this.age = age;
  }

  // メソッドのオーバーライド
  addEmployees(name: string) {
    this.age = 10;
    if (name === "Max") {
      return;
    }
    this.employees.push(name);
  }

  printEmployeeInformation() {
    console.log("IT");
  }
}

// オブジェクト
const it = ITDepartment.getInstance();
it.addEmployees("Max");
// staticメソッドを呼び出す(staticはインスタンスと切り離されている)
const create = Department.createEmployee("Bob");
const year = Department.fiscalYear;
console.log(create);
console.log(year);
// thisはdotの前を参照している(クラスをもとに作成されたインスタンスを指す)
it.describe();
it.printEmployeeInformation();
console.log(it.getAge);
console.log((it.setAge = 2));

// シングルトンパターンインスタンスを常に一つだけ存在するようにしておく
// コンストラクタをprivateにする

// interface(objectの型のみと特定できる)
// objectがどんな形であるか定義
interface Named {
  readonly name: string; //初期化時以降は値変更できない(readonly)
  outputName?: string;
}
interface Another {
  age: number;
}

// extends 複数指定
interface Person extends Named, Another {
  greet: () => void;
}

let user1: Person;
user1 = {
  name: "hoge",
  age: 20,
  greet() {
    console.log("greet");
  },
};

/**
 * 高度な型
 */
// 交差型
type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: "Max",
  privileges: ["create-server"],
  startDate: new Date(),
};

// interface Admin {
//   name: string;
//   privileges: string[]
// }

// interface Employee {
//   name: string;
//   startDate: Date
// }

// interface ElevatedEmployee extends Admin, Employee{}
type Combinable = string | number;
type Numeric = number | boolean;
// number(unionだと共通の型が適用される)
type Universal = Combinable & Numeric;

// 型ガード
//(typeof)
const addType = (a: Combinable, b: Combinable) => {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
};

type UnknownEmployee = Employee | Admin;

// 型でのガード(in)
const printEmployee = (emp: UnknownEmployee) => {
  if ("privileges" in emp) {
    console.log(emp.privileges);
  }
  if ("startDate" in emp) {
    console.log(emp.startDate);
  }
};
// classでの型ガードは(instanceof)を使う

// 判別可能なUnion型
// 共通のプロパティを持たせることで判別可能になる
// 型ガードできる
interface Bird {
  type: "bird";
  flyingSpeed: number;
}
interface Dog {
  type: "dog";
  runningSpeed: number;
}
type Animal = Bird | Dog;
const movingAnimal = (animal: Animal) => {
  let speed;
  switch (animal.type) {
    case "bird":
      animal.flyingSpeed;
      break;
    case "dog":
      speed = animal.runningSpeed;
    default:
      break;
  }
  console.log(speed);
};

// 型キャスト
// その値が特定の型であることをtypescriptに伝えたい場合
// 二つの方法がある
// reactなどは二つ目だとreactのコンポーネントで似たようか形があるのでasの方がいい
// 同時にnullではないということも宣言してしまうので、nullの場合はnullチェックは必要
const paragraph = document.getElementById("hoge") as HTMLInputElement;
const input = <HTMLInputElement>document.getElementById("input");

// インデックス型
interface ErrorContaiiner {
  // インデックス型
  [prop: string]: string;
}
const error: ErrorContaiiner = {
  email: "正しいメールアドレスではありません",
  userName: "ユーザー名に記号を含めることができません",
};

// 関数オーバーロード
type Overload = number | string;

// typescriptに受け取る型を知らせる
function addNumeric(a: number, b: number): number;
function addNumeric(a: string, b: string): string;
function addNumeric(a: Overload, b: Overload) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}
addNumeric("q", "1").split("");

// オプショナルチェーン
// 現行のオプショナルチェンジングで解決されてる
const userOptional = {
  name: "Max",
  age: 23,
  job: {
    title: "Developer",
    description: "Typescript",
  },
};
console.log(userOptional.job && userOptional.job.title);
// typescript 3.7
console.log(userOptional?.job?.title);

// null合体演算子
const userInput = "";
// これだと空文字はfalseで扱われてHogeに行ってしまう
const storedFalse = userInput || "Hoge";
// 空文字でも保持したい場合はnull合体演算しを使う
//null or undefinedの場合は二つ目
const stored = userInput ?? "Hoge";

/** ジェネリック（ts特有） */
// ジェネリック型は「汎用型」とも呼ばれます
// 追加の方情報を提供できる(追加の型情報を知ることを助ける)
// 型の安全性を高めることができる
// 自動補完等の開発サポートを向上することができる

// promiseが何を返すか<T>
const promise = new Promise<string>((resolve, reject) => {
  setTimeout(() => {
    resolve("終わりました");
  }, 2000);
});
promise.then((data) => {
  console.log(data.length);
});

// 独自ジェネリック
// TとUが異なっているということと、関数を呼び出したた時に動的に値が決まる(tsが推論してくれる)
const merge = <T extends object, U extends object>(a: T, b: U) => {
  return Object.assign(a, b);
};
const mergeObject = merge({ name: "Max" }, { age: 30 });
console.log(mergeObject.name);

// lengthプロパティがあれば使えるような柔軟性あるジェネリティクス
interface Lengthy {
  length: number;
}
const countAndDescribe = <T extends Lengthy>(element: T): [T, string] => {
  let descriptionText = "値がありません";
  if (descriptionText.length) {
    descriptionText = "値は" + element.length + "値です";
  }
  return [element, descriptionText];
};
console.log(countAndDescribe("お疲れ様です。"));

const extractAndConvert = <T extends object, U extends keyof T>(obj: T, key: U) => {
  return obj[key];
};

extractAndConvert({name: 'hoge'}, "name");

// union型は関数やメソッドを呼び出すごとに型を選べるような柔軟性が必要な場合
// ジェネリティクス型は限定的な型に固定したい時に向いている

/**
 * デコレータ
 * (メタプログラミング)
 */

// デコレータとは
function Logger(target: Function) {
  console.log('ログ出力中...')
}

@Logger
class Person {
  name = 'Max';

  constructor() {
    console.log('初期化')
  }
}
