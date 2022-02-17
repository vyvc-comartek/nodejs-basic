import BigNumber from 'bignumber.js';
import _ from 'lodash';
import memoizee from 'memoizee';
import moment from 'moment';
import momentz from 'moment-timezone';
const memoProfile = require('memoizee/profile');

//===========================================================================//

/**
 * Tìm hiểu package.json
 */

const packageJSON = {
	/** Các trường phục vụ cho việc public package */
	name: 'comartek05', //Tên của project
	version: '1.0.0', //Phiên bản hiện tại
	description: '', //Mô tả, hữu ích cho "npm search"
	keywords: ['', ''], //Các từ khóa, hữu ích cho "npm search"
	homepage: '', //Trang chủ của project
	bugs: {
		url: '', //URL để báo cáo bugs/issues
		email: '', //Email để báo cáo bugs/issues
	}, //Hữu ích cho "npm bugs"
	author: {
		name: '',
		email: '',
		URL: '',
	}, // Thông tin tác giả
	contributors: [
		{
			name: '',
			email: '',
			URL: '',
		},
	],
	license: {
		type: 'ISC',
		url: '',
	}, // Giấy phép
	/**
	 * Tệp chính để chạy project.
	 * Trong cmd, khi dùng "node ." thì sẽ được hiểu là "node index.js"
	 */
	main: 'index.js',
	scripts: {
		test: 'echo "Error: no test specified" && exit 1', // npm test
		start: 'nodemon --inspect . 80', // npm start
	}, // Các script giúp thực hiện nhiều công việc trong một lệnh
	dependencies: {
		lodash: '^4.17.21',
	}, // Danh sách các thư viện, được dùng trong cả môi trường sản phẩm và phát triển
	devDependencies: {
		nodemon: '^2.0.15',
	}, //Danh sách các thư viện, chỉ sử dụng cho môi trường phát triển
};

//===========================================================================//

/**
 * Tìm hiểu npm, npx, yarn
 * - Npm là trình quản lý các gói trong nodejs. Các thư viện có thể được cài vào
 * Project Scope (Phạm vi project) hoặc Global Scope (Phạm vi global, thư mục user
 * trong hệ điều hành)
 * - Npx được dùng cho các thư viện cung cấp tệp thực thi (VD: create-react-app), nó
 * sẽ tự động tìm kiếm thư viện đó trên npm để cài đặt nếu thư viện chưa tồn tại trong
 * dự án
 * - Yarn giống với npm nhưng
 *  + Yarn được cải thiện hơn về performance, trong khi npm sẽ cài tuần tự từng
 * dependences con thì yarn sẽ thực thi song song
 *  + Yarn sử dụng cơ chế cache khi cài đặt thư viện
 */

//===========================================================================//

/**
 * Tìm hiểu về lodash
 * Các phương thức thao tác với mảng
 */

/**
 * chunk: Chia mảng nhiều khúc có kích thước length, độ dài khúc cuối <= length
 * Hữu ích trong việc chuyển đổi thành mảng các entries
 * return: new Array
 */
const arrayChunk = _.chunk([1, 2, 3, 4, 5], 2); //[[1, 2], [3, 4], [5]]

/**
 * compact: Lọc bỏ giá trị falsey (false, null, 0, "", undefined, NaN)
 * return: new Array
 */
const arrayCompact = _.compact([false, null, 5, '', undefined, NaN, 0]); //[5]

/**
 * concat: Nối mảng
 * return: new Array
 */
type concatType = number | concatType[]; //Cho phép mảng lồng nhau
const arrayConcat = _.concat<concatType>(1, [2], [[3]], [4]); //[1, 2, [3], 4]

/**
 * difference: Loại bỏ phần tử trong mảng 1 bị trùng với các mảng 2, 3, 4, ...
 * return: new Array
 */
const arrayDifference = _.difference([2, 1, 3, 5], [2, 2, 4], [1]); //[3, 5]

/**
 * differenceBy: Loại bỏ phần tử trong mảng 1 bị trùng với các mảng 2, 3, 4, ... sau bước tiền xử lý
 * return: new Array
 */
const arrayDifferenceBy = _.differenceBy(
	[2.1, 1.3, 3.6, 5.5],
	[2.2, 2.8, 4.2],
	[1.4],
	Math.floor
); //[3.6, 5.5]
const arrayDifferenceBy2 = _.differenceBy(
	[2.1, 1.3, '3.6', 5.5],
	[2.1, 2.8, 4.2],
	[1.3],
	(v) => +v
); //['3.6', 5.5]
const arrayDifferenceBy3 = _.differenceBy(
	[{ x: 1 }, { x: 3 }, { x: 2 }],
	[{ x: 3 }],
	'x'
); //[{x: 1}, {x: 2}]

/**
 * differenceWith: Loại bỏ phần tử trong mảng 1 bị trùng với các mảng 2, 3, 4, ... với hàm so sánh tùy chỉnh
 * return: new Array
 */
const arrayDifferenceWith = _.differenceWith(
	[
		{ x: 1, y: 10 },
		{ x: 10, y: 1 },
	],
	[{ x: 3, y: 1 }],
	(a1, a2) => a1.y === a2.y
); //[{ x: 1, y: 10 }]

/**
 * drop: Loại bỏ n phần tử đầu tiên trong mảng
 * return: a slice Array (shallow copy)
 */
const arrayDrop = _.drop([1, 2, 3]); //[2, 3]
const arrayDrop2 = _.drop([1, 2, 3], 2); //[3]
const arrayDrop3 = _.drop([1, 2, 3], 0); //[1, 2, 3]
const arrayDrop4 = _.drop([1, 2, 3], 4); //[]

/**
 * dropRight: Loại bỏ n phần tử cuối trong mảng
 * return: a slice Array (shallow copy)
 */

/**
 * dropWhile: Loại bỏ n phần tử đầu tiên trong mảng khi thỏa mãn điều kiện
 * return: a slice Array (shallow copy)
 */
const dropWhileUsers = [
	{ user: 'a', active: false },
	{ user: 'b', active: false },
	{ user: 'c', active: true },
];

const arrayDropWhile = _.dropWhile(dropWhileUsers, (v) => !v.active); //[ { user: 'c', active: true } ]
const arrayDropWhile2 = _.dropWhile(dropWhileUsers, ['active', false]); //[ { user: 'c', active: true } ]

/**
 * fill: Gán giá trị cho các phần tử trong mảng
 * return: mutable Array
 */
const arrayFill = _.fill(
	[4, 6, 8, 10], // Mảng cần fill
	'*', // Giá trị cần fill
	1, // Vị trí bắt đầu
	3 // Điểm dừng
); // [ 4, '*', '*', 10 ]

/**
 * findIndex: Tìm index của phần tử trong mảng
 * return: number
 */
const arrayFindIndex = _.findIndex(dropWhileUsers, 'active'); //2

/**
 * findLastIndex: Tìm index của phần tử cuối cùng trong mảng thỏa mãn
 * return: number
 */

/**
 * head: Lấy ra phần tử đầu tiên trong mảng
 * return: *
 */
const arrayHead = _.head([1, 2, 3]); // 1
const arrayHead2 = _.head([]); // undefined

/**
 * flatten: Làm phẳng array 1 lần
 * return: new Array
 */
const arrayFlatten = _.flatten([1, [2, [3, [4]], 5]]); //[ 1, 2, [ 3, [ 4 ] ], 5 ]

/**
 * flattenDeep: Làm phẳng array hoàn toàn
 * return: new Array
 */
const arrayFlattenDeep = _.flattenDeep([1, [2, [3, [4]], 5]]); //[ 1, 2, 3, 4, 5 ]

/**
 * flattenDepth: Làm phẳng array n lần
 * return: new Array
 */
const arrayFlattenDepth = _.flattenDepth([1, [2, [3, [4]], 5]], 2); //[ 1, 2, 3, [ 4 ], 5 ]

/**
 * fromPairs: Chuyển đổi array (có depth=2) thành object
 * Giống Object.fromEntries()
 * return: new Object
 */

/**
 * indexOf: Tìm phần tử trong mảng
 * return: number
 */
const arrayIndexOf = _.indexOf([3, 2, 3, 2], 2); // 1
const arrayIndexOf2 = _.indexOf([3, 2, 3, 2], 3, 1); // 2

/**
 * initial: Lấy tất cả phần tử trong mảng trừ phần tử cuối
 * return: a slice Array (shallow copy)
 */

//console.log(arrayIndexOf2);

//===========================================================================//

/**
 * Tìm hiểu về bignumber.js
 * Là thư viện hỗ trợ làm việc với các số thập phân
 */

/**
 * Hàm khởi tạo với tham số đầu tiên là số cần lưu, tham số thứ hai là hệ cơ số (base)
 */
new BigNumber(123.45679); //'123.4567'
new BigNumber(43210); //'43210'
new BigNumber('4.321e+4'); //'43210'
new BigNumber('-735.0918e-430'); //'-7.350918e-428'
new BigNumber('123412421.234324', 5); //'607236.557696'
new BigNumber('.5'); // '0.5'
new BigNumber('+2'); // '2'

//Các giá trị falsey
new BigNumber('-Infinity'); // '-Infinity'
new BigNumber(NaN); // 'NaN'
new BigNumber(-0); // '0'

//Các số được biểu diễn dưới hệ cơ số 2 và 16
new BigNumber(-10110100.1, 2); // '-180.5'
new BigNumber('-0b10110100.1'); // '-180.5'
new BigNumber('ff.8', 16); // '255.5'
new BigNumber('0xff.8'); // '255.5'

/**
 * Đối tượng BigNumber bao gồm 3 tham số:
 *  - c[]: Phần tử 1 là số n trong hệ cơ số 10, phần tử 2 là 14 chữ số phần thập phân
 *  - e: Số mũ
 *  - s: Dấu phân số âm số dương
 */
new BigNumber('ff.8', 16); // BigNumber { s: 1, e: 2, c: [ 255, 50000000000000 ] }

//Cài đặt chế độ debug
BigNumber.DEBUG = false;

new BigNumber('ab.2', 2).toNumber(); // NaN

BigNumber.DEBUG = true;

//console.log(new BigNumber('ab.2', 2).toNumber()); // Error: Not a base 2 number: ab.2

/**
 * Clone lớp BigNumber + tùy chỉnh cấu hình
 */
BigNumber.config({ DECIMAL_PLACES: 5 });
let BN = BigNumber.clone({ DECIMAL_PLACES: 9 });

const bn1 = new BigNumber(1);
const bn2 = new BN(1);

bn1.div(3); // 0.33333
bn2.div(3); // 0.333333333

BN = BigNumber.clone(); // Giống với BN.config({ DECIMAL_PLACES: 9 });

/**
 * Các config của BigNumber
 * - DECIMAL_PLACES: Số lượng số thập phân sau dấu phẩy (default: 20)
 * - ROUNDING_MODE: Kiểu làm tròn (range: BigNumber.ROUND_<MODE>, default: BigNumber.ROUND_HALF_UP)
 * - EXPONENTIAL_AT: Giá trị của số mũ e (default: [-7, 20])
 * - MODULO_MODE: Kiểu modulo (range:  BigNumber.ROUND_<MODE> && BigNumber.EUCLID , default: BigNumber.ROUND_DOWN)
 * - ...
 */

/**
 * Tìm max, min trong BigNumber
 */
BigNumber.maximum(4e9, new BigNumber('3257869345.0378653'), '123456789.9'); // '4000000000'
BigNumber.minimum(4e9, new BigNumber('3257869345.0378653'), '123456789.9'); // '123456789.9'

/**
 * Sinh số BigNumber ngẫu nhiên
 */

BigNumber.config({ DECIMAL_PLACES: 10 });
BigNumber.random(); // '0.4117936847'
BigNumber.random(20); // '0.78193327636914089009'

/**
 * Một số phương thức instance của đối tượng BigNumber
 */

const bigNumber1 = new BigNumber(-53.23);
const bigNumber2 = new BigNumber(24.88);
const bigNumber3 = new BigNumber(30.70243656, 8);
const bigNumber4 = new BigNumber(30923.23947097);

// Giá trị tuyệt đối
bigNumber1.abs(); //BigNumber { s: 1, e: 1, c: [ 53, 23000000000000 ] }
bigNumber1.abs().toNumber(); //53.23

_.isEqual(bigNumber1.abs(), bigNumber1.absoluteValue()); //true

//So sánh
bigNumber2.comparedTo(bigNumber3); //1
bigNumber1.comparedTo(bigNumber2); //-1

//Lũy thừa
bigNumber2.pow(bigNumber3.integerValue()).toString(); // 7.875160259969247492496195126684540057968267444199717110507135215455352017970494701568e+34

//Độ chính xác
bigNumber1.precision(6).toString(); //-53.23
bigNumber1.precision(2).toString(); //-53
bigNumber1.precision(2, BigNumber.ROUND_UP).toString(); //-54
bigNumber1.precision(1).toString(); //-50

//Dịch dấu phẩy
bigNumber1.shiftedBy(3); //-53230
bigNumber1.shiftedBy(-3); //-0.05323

//Format số
const fmt = {
	prefix: '[prefix]', //Tiền tố
	decimalSeparator: '.', //Dấu ngăn cách phần thập phân
	groupSeparator: ',', //Dấu nhóm
	groupSize: 3, //Kích thước nhóm
	suffix: '[suffix]', //Hậu tố
};

//Thay đổi format trong config
BN.config({ FORMAT: fmt });

//Thay đổi format cho đối tượng cụ thể
bigNumber4.toFormat(fmt); //[prefix]30,923.23947097[suffix]

//Chuyển thành phân số
bigNumber1.toFraction().map((v) => v.toNumber()); //[ -5323, 100 ]

//===========================================================================//

/**
 * Memoizee là thư viện giúp ghi nhớ kết quả của một công việc
 * Một công việc có dạng Input -> Process -> Output
 * Với các Input giống nhau, không cần phải thực hiện Process
 * mà phản hồi luôn Output
 */

//Hàm tính toán mất nhiều thời gian
function needMemo() {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(undefined);
		}, 5000);
	});
}

let start = Date.now(),
	end = 0;
//Trường hợp thông thường
//Thực hiện needMemo lần 1
needMemo()
	.then(() => {
		//Sau khi thực hiện needMemo lần 1
		end = Date.now();
		console.log('Thông thường lần 1: Tổng thời gian chờ ' + (end - start)); //5016
		//Thực hiện needMemo lần 2
		return needMemo();
	})
	.then(() => {
		//Sau khi thực hiện needMemo lần 2
		end = Date.now();
		console.log('Thông thường lần 2: Tổng thời gian chờ ' + (end - start)); //10013
	});

//Thực hiện ghi nhớ
const memo = memoizee(needMemo);

//Trường hợp dùng memoizee
//Thực hiện needMemo lần 1
memo()
	.then(() => {
		//Sau khi thực hiện needMemo lần 1
		end = Date.now();
		console.log(
			'Cached needMemo lần 1: Tổng thời gian chờ ' + (end - start)
		); //5010
		//Thực hiện needMemo lần 2
		return memo();
	})
	.then(() => {
		//Sau khi thực hiện needMemo lần 2
		end = Date.now();
		console.log(
			'Cached needMemo lần 2: Tổng thời gian chờ ' + (end - start)
		); //5011
	});

/**
 * Cấu hình memoizee
 */
// Tùy chỉnh số lượng tham số muốn cache
function addNumbers<ElementType>(...numbers: ElementType[]) {
	return numbers.reduce((res, num) => res + Number(num), 0);
}
const memoAddNumbers = memoizee(addNumbers, { length: 3 });

memoAddNumbers(1, 2, 3); // 6
memoAddNumbers(1, 2, 3, 4); // 6

memoAddNumbers(2, 3, 4, 1); //10
memoAddNumbers(2, 3, 4); //10
memoAddNumbers(2, 3); //5

/**
 * Chế độ Primitive
 * Thông thường memoizee sẽ thực hiện cache vào một mảng, tuy nhiên tốc độ truy cập cache
 * sẽ không nhanh trong trường hợp dữ liệu lớn
 * Để tăng tốc độ truy cập, với chế độ Primitive, cache sẽ được lưu trong hàm băm
 * với hashId là kết quả của các đối số khi chuyển sang dạng chuỗi
 * Chế độ này bắt buộc các đối số khi chuyển sang dạng chuỗi kết hợp tạo thành chuỗi duy nhất
 */

const memoPrimitiveAddNumbers = memoizee(addNumbers, { primitive: true });

/**
 * Resolvers
 * Khi không ở chế độ Primitive, có thể ép kiểu của tham số trước khi cache
 *
 */

const memoResolverAddNumbers = memoizee(addNumbers, {
	resolvers: [Number, Number],
});

memoResolverAddNumbers<number | string>('1', 2);
memoResolverAddNumbers(1, 2); //Truy cập cache

/**
 * Ghi nhớ hàm bất đồng bộ
 */

function addNumberAsync(a: number, b: number) {
	return new Promise((resolve) => {
		setTimeout(() => {
			console.log(a + b);
			resolve(undefined);
		}, 1000);
	});
}

const memoAddNumberAsync = memoizee(addNumberAsync, { async: true });

(async function () {
	await memoAddNumberAsync(6, 4);
	memoAddNumberAsync(6, 4); //Truy cập cache
})();
memoAddNumberAsync(6, 4); //Truy cập cache

/**
 * Hết hạn cache sau một khoảng thời gian
 */
//Thời gian hết hạn của cache là 1s
const memoAge = memoizee(addNumbers, { maxAge: 1000 });

memoAge(1, 2); // Init
memoAge(1, 2); // Truy cập cache
setTimeout(function () {
	memoAge(1, 2); // Sau 2s, cache đã hết hạn, thực hiện Init
	memoAge(1, 2); // Truy cập cache
}, 2000);

/**
 * Tự gia hạn thời gian tồn tại của cache nếu nó gần hết hạn
 */
const memoAgePreFetch = memoizee(addNumbers, { maxAge: 1000, preFetch: 0.6 });

memoAgePreFetch(3, 4); // Init
memoAgePreFetch(3, 4); // Truy cập cache

setTimeout(function () {
	memoAgePreFetch(3, 4); // Truy cập cache, kiểm tra thấy rằng cache sắp hết hạn, đặt lại thời gian hết hạn
}, 500);

setTimeout(function () {
	memoAgePreFetch(3, 4); // Vẫn truy cập cache do thời gian hết hạn đã được làm mới
}, 1300);

/**
 * Giới hạn kích thước cache, dựa trên thuật toán LRU (Least recently use)
 */
const memoLimitSize = memoizee(addNumbers, { max: 2 });
addNumbers(1, 2); // Init, cache: [(1, 2)]
addNumbers(3, 4); // Init, cache: [(1, 2), (3, 4)]
addNumbers(1, 2); // Truy cập cache, cache: [(1, 2), (3, 4)]
addNumbers(4, 5); // Init, cache: [(1, 2), (4, 5)]
addNumbers(5, 7); // Init, cache: [(5, 7), (4, 5)]
addNumbers(4, 5); // Truy cập cache, cache: [(5, 7), (4, 5)]
addNumbers(1, 2); // Init, cache: [(1, 2), (4, 5)]

/**
 * Thống kê cache
 * - Init: Số lần khởi tạo
 * - Cache: Số lần truy cập vào cache
 * - %Cache: Cache*100/(Init + Cache)
 */
memoProfile.statistics;
memoProfile.log(); /**
Init  Cache  %Cache  Source location
   9      5   35.71  (all)
   9      5   35.71  at module.exports (E:\vyvu\comartek-training\nodejs-basic\comartek05\node_modules\memoizee\index.js:33:9)
*/

//===========================================================================//

/**
 * MomentJS là thư viện nổi tiếng được dùng để xử lý date, time trong js
 */

/**
 * Hàm khởi tạo moment();
 * Phân tích Moment<2022-02-16T09:33:48+07:00>
 * - Năm: 2022
 * - Tháng: 02
 * - Ngày: 16
 * - T: Viết tắt của Time
 * - Giờ: 09
 * - Phút: 33
 * - Giây: 48
 * - Múi giờ: +07:00
 */
moment(); //Moment<2022-02-16T09:33:48+07:00>
moment(undefined); //Moment<2022-02-16T09:33:48+07:00>
moment([]); //Moment<2022-02-16T09:33:48+07:00>
moment({}); //Moment<2022-02-16T09:33:48+07:00>
moment(new Date()); //Moment<2022-02-16T09:33:48+07:00>

/**
 * Tạo một mốc thời gian với String
 * Ban đầu Moment sẽ thực hiện kiểm tra xem chuỗi input có khớp các
 * định dạng ISO 8601, Datetime RFC 2822 hay không
 * Cuối cùng nó mới thực hiện new Date(string)
 *
 * Một số chuỗi ISO 8601: https://www.progress.com/blogs/understanding-iso-8601-date-and-time-format#:~:text=ISO%208601%20Formats&text=ISO%208601%20represents%20date%20and,%E2%80%94more%20on%20that%20below).
 */
moment('1995-12-25'); //Moment<1995-12-25T00:00:00+07:00>
moment('1990-13-25').isValid(); // false

/**
 * Tạo mốc thời gian với String + Format
 * - YYYY: Chỉ định năm với 4 hoặc 2 ký tự. 2014
 * - YY: Chỉ định năm với 2 ký tự. 14
 * - Y: Chỉ định năm với bất kỳ số hoặc dấu nào. -25
 * - Q: Quý của năm. Giá trị: 1..4
 * - M hoặc MM: Tháng trong năm. Giá trị: 1..12
 * - MMM hoặc MMMM: Tháng trong năm. Giá trị: Jan..December
 * - D hoặc DD: Ngày trong tháng. Giá trị: 1..31
 * - Do: Ngày trong tháng với thứ tự. Giá trị 1st..31st
 * - DDD hoặc DDDD: Ngày trong năm. 1..365
 * - X: Unix second timestamp. 1410715640.579
 * - x: Unix mili second timestamp. 1410715640579
 * - ddd hoặc dddd: Tên ngày ở locale. Giá trị: Mon...Sunday
 * - L: Định dạng locale. 04/09/1986
 * - LL: Tên tháng, ngày, năm. September 4 1986
 * - LLL: Tên tháng, ngày, năm, thời gian. September 4 1986 8:30 PM
 * - LLLL: Ngày trong tuần, tên tháng, ngày trong tháng, năm, thời gian. Thursday, September 4 1986 8:30 PM
 * - LT: Thời gian (không có giây). 08:30 PM
 * - LTS: Thời gian. 08:30:23 PM
 * - H hoặc HH: Giờ (Định dạng 24). Giá trị: 0..23
 * - h hoặc hh: Giờ (Định dạng 12). Giá trị: 0..12
 * - k hoặc kk: Giờ (Định dạng 24). Giá trị: 1..24
 * - a hoặc A: am pm
 * - m hoặc mm: Phút. Giá trị: 0..59
 * - s hoặc ss: Giây. Giá trị: 0..59
 * - Z hoặc ZZ: UTC. +7:00
 */
moment('12-25-1995', 'MM-DD-YYYY');

//Moment sẽ không quan tâm đến các ký tự đặc biệt
moment('12/25/1995', 'MM-DD-YYYY');

//Moment tự chuyển đổi về thời gian ở locale
moment('2010-10-20 4:30 +0000', 'YYYY-MM-DD HH:mm Z').utc(); // Moment<2010-10-20T11:30:00+07:00>

moment('123', 'hmm').format('HH:mm'); //01:23
moment('1234', 'hmm').format('HH:mm'); //12:34

/**
 * Tạo mốc thời gian với String + Formats
 * Giải quyết trường hợp không biết rõ chuỗi đầu vào
 * Tuy nhiên nếu đã biết trước định dạng thì không nên sử dụng cách dưới đây
 * vì việc này cho kết quả chậm hơn
 */
moment('12-25-1995', ['YYYY-MM-DD', 'MM-DD-YYYY']);

//Sử dụng strict hoặc language code giống như một trường hợp format
moment('29-06-1995', ['MM-DD-YYYY', 'DD-MM-YYYY'], 'fr'); // Dùng 'fr'
moment('29-06-1995', ['MM-DD-YYYY', 'DD-MM-YYYY'], true); // Dùng strict
moment('05-06-1995', ['MM-DD-YYYY', 'DD-MM-YYYY'], 'fr', true); // Sử dụng cả 2

/**
 * Tạo mốc thời gian với định dạng đặc biệt
 * - moment.HTML5_FMT.DATETIME_LOCAL: YYYY-MM-DDTHH:mm
 * - moment.HTML5_FMT.DATETIME_LOCAL_SECONDS: YYYY-MM-DDTHH:mm:ss
 * - moment.HTML5_FMT.DATETIME_LOCAL_MS: YYYY-MM-DDTHH:mm:ss.SSS
 * - moment.HTML5_FMT.DATE: YYYY-MM-DD
 * - moment.HTML5_FMT.TIME: HH:mm
 * - moment.HTML5_FMT.TIME_SECONDS: HH:mm:ss
 * - moment.HTML5_FMT.TIME_MS: HH:mm:ss.SSS
 * - moment.HTML5_FMT.WEEK: YYYY-[W]WW
 * - moment.HTML5_FMT.MONTH: YYYY-MM
 */
moment('2010-01-01T05:06:07', moment.ISO_8601);

/**
 * Tạo mốc thời gian bằng object
 */
moment({ hour: 15, minute: 10 });
moment({ y: 2010, M: 3, d: 5, h: 15, m: 10, s: 3, ms: 123 });
moment({
	year: 2010,
	month: 3,
	day: 5,
	hour: 15,
	minute: 10,
	second: 3,
	millisecond: 123,
});
moment({
	years: 2010,
	months: 3,
	days: 5,
	hours: 15,
	minutes: 10,
	seconds: 3,
	milliseconds: 123,
});
moment({
	years: 2010,
	months: 3,
	date: 5,
	hours: 15,
	minutes: 10,
	seconds: 3,
	milliseconds: 123,
});

/**
 * Tạo mốc thời gian bằng timestamp
 */
moment(1318781876406);
moment.unix(1318781876).utc();

/**
 * Moment TZ là thư viện giúp thao tác, xử lý với timezone
 * Hàm khởi tạo momentz.tz() giống với hàm khởi tạo moment() nhưng tham
 * số cuối cùng là định danh múi giờ
 */

momentz.tz('2022-11-18 11:55', 'Asia/Taipei'); //Moment<2022-11-18T11:55:00+08:00>
momentz.tz('2022-11-18 11:55', 'America/Toronto').format(); //2022-11-18T11:55:00-05:00
momentz.tz('2022-11-18 11:55', 'America/Toronto').utc(); //Moment<2022-11-18T16:55:00Z>

/**
 * Hàm khởi tạo momentz.tz() thuộc dạng DST (Daylight Saving Time)
 * nó sẽ sử dụng phần bù chính xác khi phân tích
 */
momentz.tz('2013-12-01', 'America/Los_Angeles').format(); // 2013-12-01T00:00:00-08:00
momentz.tz('2013-06-01', 'America/Los_Angeles').format(); // 2013-06-01T00:00:00-07:00
momentz.tz('May 12th 2014 8PM', 'MMM Do YYYY hA', 'America/Toronto'); //Moment<2014-05-12T20:00:00-04:00>

/**
 * Chế độ nghiêm ngặt
 */
momentz.tz('It is 2012-05-25', 'YYYY-MM-DD', 'America/Toronto').isValid(); // true
momentz.tz('It is 2012-05-25', 'YYYY-MM-DD', true, 'America/Toronto').isValid(); // false

/**
 * Chuyển đổi về timezone
 */
momentz('2013-11-18').tz('America/Toronto').format('Z'); // -05:00
momentz('2013-11-18').tz('Europe/Berlin').format('Z'); // +01:00

/**
 * Các kiểu timezone
 */
const abbrs: { [key: string]: string } = {
	EST: 'Eastern Standard Time',
	EDT: 'Eastern Daylight Time',
	CST: 'Central Standard Time',
	CDT: 'Central Daylight Time',
	MST: 'Mountain Standard Time',
	MDT: 'Mountain Daylight Time',
	PST: 'Pacific Standard Time',
	PDT: 'Pacific Daylight Time',
};

//Ghi đè phương thức zoneName
momentz.fn.zoneName = function () {
	const abbr = this.zoneAbbr();
	return abbrs[abbr] || abbr;
};

momentz.tz([2012, 5], 'America/New_York').format('zz'); // Eastern Daylight Time
momentz.tz([2012, 0], 'America/Los_Angeles').format('zz'); // Pacific Standard Time

/**
 * Đoán timezone của người dùng
 * Mặc định kết quả dự đoán sẽ được cache lại
 * Để thực hiện dự đoán kết quả mới, truyền true tại đối số đầu tiên
 */

momentz.tz.guess(); // Asia/Bangkok
momentz.tz.guess(); // Asia/Bangkok
momentz.tz.guess(true); // Asia/Bangkok
momentz.tz.guess(); // Asia/Bangkok

/**
 * Lấy tất cả các timezone
 */
console.log(moment.tz.names()); // ['Africa/Abidjan', 'Africa/Accra', 'Africa/Addis_Ababa', ...]

//===========================================================================//

/**
 * Problem: Máy chủ ở Việt Nam tổ chức sự kiện vào lúc 7h sáng giờ Việt Nam,
 * nhưng khách hàng muốn tại các đất nước khác, sự kiện đó vẫn phải được
 * bắt đầu vào lúc 7h sáng theo giờ của quốc gia đó
 */

//Hàm tạo đối tượng moment ở một quốc gia <timezone>
function getTime(time: string, format: string, timezone: string) {
	return momentz.tz(time, format, timezone);
}
//Thời gian bắt đầu sự kiện
const eventStartTime = '16/02/2022 17';
//Định dạng thời gian
const formatEventStartTime = 'DD/MM/YYYY HH';
//Hàm tạo mốc timestamp bắt đầu sự kiện cho một quốc gia
function countryTimestamp(timezone: string) {
	//Thời gian bắt đầu sự kiện tại quốc gia <timezone>
	const localeTime = getTime(eventStartTime, formatEventStartTime, timezone);
	//Timestamp bắt đầu sự kiện
	const timestamp = localeTime.format('x');
	//Thời gian ở Việt Nam khi sự kiện bắt đầu ở quốc gia <timezone>
	const vietNamTime = momentz.tz(+timestamp, 'Asia/Ho_Chi_Minh');

	return {
		[timezone]: { localeTime, timestamp, vietNamTime },
	};
}
//Các quốc gia tham gia sự kiện
const countriesJoinedEvent = [
	'Asia/Ho_Chi_Minh',
	'Singapore',
	'America/Panama',
];

const eventTimestamps = countriesJoinedEvent.map(countryTimestamp); /**
[
  {
    'Asia/Ho_Chi_Minh': {
      localeTime: Moment<2022-02-16T17:00:00+07:00>,
      timestamp: '1645005600000',
      vietNamTime: Moment<2022-02-16T17:00:00+07:00>
    }
  },
  {
    Singapore: {
      localeTime: Moment<2022-02-16T17:00:00+08:00>,
      timestamp: '1645002000000',
      vietNamTime: Moment<2022-02-16T16:00:00+07:00>
    }
  },
  {
    'America/Panama': {
      localeTime: Moment<2022-02-16T17:00:00-05:00>,
      timestamp: '1645048800000',
      vietNamTime: Moment<2022-02-17T05:00:00+07:00>
    }
  }
]

Thời gian diễn ra sự kiện tại Singapore 17h, lúc đó ở Việt Nam đang là 16h
==> Nếu Server đặt tại Việt Nam, khi kiểm tra timestamp = 1645002000000, thì start event ở Singapore

Thời gian diễn ra sự kiện tại Panama 17h, lúc đó ở Việt Nam đang là 5h
==> Nếu Server đặt tại Việt Nam, khi kiểm tra timestamp = 1645048800000, thì start event ở Panama
*/
