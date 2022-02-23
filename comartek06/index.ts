//===========================================================================//

import axios from 'axios';

//Typescript ngầm suy luận kiểu của biến dựa trên giá trị
let hello = 'Hello Typescript'; // let hello: string
typeof hello; //string

//Mô tả một đối tượng
interface User {
	userName: string;
	age: number;
	(words: string): number; //anonymous function
	//new (phone: string): void;
}

//Làm sao để tạo đối tượng theo interface User?
/**
 * Cách 1: Ưu điểm là dễ hiểu, code liền mạch.
 * Nhược điểm là không nhắc code, tham số words vẫn phải được chỉ định là string
 * Hơn nữa kiểu trả về của anonymous không được bảo toàn
 */
const user1: User = Object.assign(
	function (words: string) {
		console.log(words);
		//function (words: string): 1, khác với function trong interface đã định nghĩa (words: string): void
		return 1;
	},
	{
		userName: 'Mr.Type',
		age: 24,
	}
);

user1; //[Function (anonymous)] { userName: 'Mr.Type', age: 24 }

//Tùy chỉnh kiểu dữ liệu bằng union
type DoorState = 'closed' | 'opened';
const door: DoorState = 'closed';

function getLength(obj: string | string[]) {
	return obj.length;
}

//Tùy chỉnh kiểu dữ liệu bằng generic
type StringArray = Array<string>;
type NumberArray = Array<number>;

const stringArr: StringArray = ['string'];
const numberArr: NumberArray = [1, 2, 3];
const objectArr: ObjectArray = [{ name: 'Karen' }];
type ObjectArray = Array<{ name: string }>;

//anonymous
interface Backpack<Type extends ObjectArray> {
	values: Type;
	add: (items: Type) => void;
	get: () => Type;
}
//Kết hợp các interface trong mảng {name: string}[] + {amount: number}[] = {name: string, amount: number}[]
const backpack: Backpack<ObjectArray & { amount: number }[]> = {
	values: [],
	add: function (items: ObjectArray & { amount: number }[]) {
		this.values = items;
	},
	get: function () {
		return this.values;
	},
};
backpack.add([
	{ name: 'hat', amount: 10 },
	{ name: 'hat', amount: 10 },
]);

backpack.values; //[ { name: 'hat', amount: 10 }, { name: 'hat', amount: 10 } ]

//===========================================================================//

/**
 * interface vs type
 * Chọn interface hay type?
 * Nếu muốn triển khai một cách chuyên nghiệp thì chọn interface
 * Nếu muốn sử dụng các tính năng của type thì chọn type
 */

//Kế thừa trong interface
interface IAnimal {
	name: string;
}
interface IBear extends IAnimal {
	honey: boolean;
}
const iBear: IBear = {
	name: 'Bear', //required
	honey: false, //required
	run: () => {
		console.log('running...');
	}, //required
};

iBear.name; // Bear
iBear.honey; // false

//Kế thừa trong type
type TAnimal = {
	name: string;
};
type TBear = TAnimal & {
	honey: boolean;
};
const tBear: TBear = {
	name: 'Bear', //required
	honey: true, //required
};

tBear.name; //Bear
tBear.honey; //true

/**
 * type không cho phép hợp nhất khai báo, interface thì có thể
 */

//Thêm thuộc tính vào interface hiện có
interface IBear {
	run: () => void;
}

//Thêm thuộc tính vào type hiện có
//type TBear = { run: () => void; }; //Error: Duplicate identifier 'TBear'.

/**
 * type được dùng để đổi tên các kiểu nguyên thủy, interface thì không thể làm điều đó
 */

type TMoney = number;
//interface IMoney extends number {}; //'number' only refers to a type, but is being used as a value here

//===========================================================================//

/**
 * Ép kiểu dữ liệu
 */

const fIBear = {
	name: 'Bear', //required
	honey: false, //required
	run: () => {
		console.log('running...');
	}, //required
} as IAnimal;

fIBear.name; //Bear
//fIBear.honey; //Property 'honey' does not exist on type 'IAnimal'.

//===========================================================================//

/**
 * Literal Type
 */

//Bởi vì biến let có thể thay đổi thành bất kỳ chuỗi nào khác nên kiểu của nó là string
let changingString = 'Hello World';
changingString; // let changingString: string

//Bởi vì biến const không thể thay đổi thành bất kỳ chuỗi nào khác nên kiểu của nó là 'Hello World'
const constantString = 'Hello World';
constantString; //constantString: 'Hello World'

//Trường hợp sử dụng biến let dưới đây không mang lại giá trị gì cả
let changingString2: 'hello' = 'hello';
changingString2 = 'hello';
//changingString2 = 'hi'; //Type '"hi"' is not assignable to type '"hello"'

//Tham số chỉ chấp nhận các giá trị cố định
function textOutput(s: string, alignment: 'left' | 'right' | 'center') {
	return alignment + ': ' + s;
}

textOutput('Hello, world', 'left'); //left: Hello, world

//Giá trị trả về của hàm là các giá trị cố định
function compare(a: string, b: string): -1 | 0 | 1 {
	return a === b ? 0 : a > b ? 1 : -1;
}

compare('de', 'ab'); //1

//===========================================================================//

/**
 * Literal Inference
 * Khi khởi tạo một object, Typescript mặc định rằng các thuộc tính của object đó có thể thay đổi được
 */
const obj = { counter: 0 }; // const obj: { counter: number; }

if (true) {
	obj.counter = 1;
}

function handleRequest(url: string, method: 'GET' | 'POST', toJSON?: boolean) {
	return { url, method, toJSON };
}
const req = {
	url: 'https://example.com',
	method: 'GET',
}; //const req: { url: string; method: string; }

//handleRequest(req.url, req.method); //Error: Argument of type 'string' is not assignable to parameter of type '"GET" | "POST"'.

//Xử lý lỗi trên bằng cách ép kiểu
const req2 = {
	url: 'https://example.com',
	method: 'GET' as 'GET',
}; //const req: { url: string; method: 'GET'; }
handleRequest(req2.url, req2.method);

//hoặc
handleRequest(req.url, req.method as 'GET');

//hoặc
const req3 = {
	url: 'https://example.com',
	method: 'GET' as 'GET',
} as const; //const req3: { readonly url: "https://example.com"; readonly method: "GET";}
handleRequest(req3.url, req3.method);

//===========================================================================//

/**
 * Một số kiểu nguyên thủy khác
 */
const oneHundred: bigint = BigInt(100);

//const anotherHundred: bigint = 100n; //Error: BigInt literals are not available when targeting lower than ES2020

//Tạo biến tham chiếu duy nhất tại global
const firstName = Symbol('name');
const secondName = Symbol('name');

/*

if (firstName === secondName) {
	//Luôn trả về false
}

*/

//===========================================================================//

/**
 * Narrowing: Thu hẹp
 * Đôi khi một tham số có thể nhận vào nhiều kiểu dữ liệu khác nhau
 * do đó, trong thân hàm, ta phải thực hiện thu hẹp kiểu dữ liệu để xử lý
 * Enum: Được sử dụng để liệt kê các giá trị thuộc một nhóm nào đó
 */
enum FORMATS {
	JSON,
	XML,
}
function formatObj(obj: object, type: string | number) {
	let result;
	//Nếu type là string
	if (typeof type === 'string') {
		switch (type) {
			case 'json':
				result = JSON.stringify(obj);
				break;
			case 'xml':
				result = obj;
				break;
			default:
				break;
		}
	}
	//Nếu type là number
	if (typeof type === 'number') {
		switch (type) {
			case FORMATS.JSON:
				result = JSON.stringify(obj);
				break;
			case FORMATS.XML:
				result = obj;
				break;
			default:
				break;
		}
	}
	return result;
}

formatObj(iBear, 'xml'); //{ name: 'Bear', honey: false, run: [Function: run] }
formatObj(iBear, FORMATS.JSON); //{"name":"Bear","honey":false}

function getFriendsStatus(numUsersOnline: number) {
	if (numUsersOnline) {
		return `There are ${numUsersOnline} online now!`;
	}
	return "Nobody's here. :(";
}

getFriendsStatus(0); //Nobody's here. :(
getFriendsStatus(2); //There are 2 online now!

//===========================================================================//

/**
 * Function trong ts
 */

//Chỉ định một callback
function passACallback(cb: (hello: string) => void) {
	return cb('Hello');
}
//passACallback(console.log); //Hello

//===========================================================================//

/**
 * Problem promise
 */

/**
 * Thông tin của user
 */
interface Geo {
	lat: string;
	lng: string;
}

interface Address {
	street: string;
	suite: string;
	city: string;
	zipcode: string;
	geo: Geo;
}

interface Company {
	name: string;
	catchPhrase: string;
	bs: string;
}

interface IUser {
	id: number;
	//name: string;
	//username: string;
	//email: string;
	//address: Address;
	//phone: string;
	//website: string;
	//company: Company;
}

/**
 * Kết hợp user và post
 */

class Info<UserType> {
	userId: string;
	user: Promise<UserType>;

	constructor(userId: string) {
		this.userId = userId;
		this.user = axios
			.get('https://jsonplaceholder.typicode.com/users/' + this.userId)
			.then((resp) => {
				return resp.data;
			});
	}

	friends: Info<UserType>[] = [];
}

const info1 = new Info<IUser>('1');
const info2 = new Info<IUser>('2');
const info3 = new Info<IUser>('3');

info1.friends.push(info2);
info1.friends.push(info3);

//Shallow solution
/*async function getData<Type>(info: Info<Type>) {
	const infoes = info.friends.map(async function (v) {
		return await v.user;
	});
	const myFriends = infoes.reduce((result, promise) => {
		return result.then((arr) => {
			return promise.then((data) => {
				arr.push(data);
				return Promise.resolve(arr);
			});
		});
	}, Promise.resolve([] as Type[]));
	return {
		...(await info.user),
		friends: await myFriends,
	};
}

getData<IUser>(info1).then((data) => {
	console.log(data);
});*/

//Deep solution
const info4 = new Info<IUser>('4');
const info5 = new Info<IUser>('5');
const info6 = new Info<IUser>('6');
const info7 = new Info<IUser>('7');
info2.friends.push(info4);
info2.friends.push(info6);
info2.friends.push(info7);
info4.friends.push(info5);

//Hàm thực thi các trường Promise
function getData2<Type>(info: Info<Type>): Promise<Type & { friends: Type[] }> {
	return (
		Promise.allSettled([
			//thực thi Promise info.user
			info.user,
			(
				Promise.allSettled(
					//thực thi getData2 cho từng friend
					info.friends.map((friend) => getData2(friend))
				) as Promise<PromiseFulfilledResult<Type>[]>
			).then((data) => data.map((v) => v.value)),
		]) as Promise<PromiseFulfilledResult<Type>[]>
	).then((data) => ({
		...data[0].value,
		friends: data.slice(1, data.length).map((v) => v.value),
	}));
}

//Hàm xử lý kết quả của getData2
function formatData<Type extends IUser & { friends: Type[] }>(
	data: Type
): Type {
	if (!data.friends.length)
		return {
			...data,
			friends: [],
		};
	return {
		...data,
		friends: data.friends
			.flat()
			.map((friend) => formatData(friend as Type)),
	};
}

type MyIUser = IUser & { friends: MyIUser[] };

getData2<IUser>(info1).then((data) => {
	console.log(JSON.stringify(formatData<MyIUser>(data as MyIUser)));
});

/*
{
  "id": 1,
  "friends": [
    {
      "id": 2,
      "friends": [
        {
          "id": 4,
          "friends": [
            {
              "id": 5,
            }
          ]
        }, 
		{
			"id": 6,
		}, 
		{
			"id": 7,
		}
      ]
    },
    {
      "id": 3,
	}
  ]
}
*/
