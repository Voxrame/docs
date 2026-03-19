---
layout: doc
title: Trợ giúp
---

# Trợ giúp

Trợ giúp là một tập hợp các chức năng trợ giúp Lua để làm việc thoải mái trong dự án.

Các chức năng trợ giúp này mở rộng đáng kể khả năng tiêu chuẩn của Lua và đơn giản hóa việc phát triển.

---

<div class="toc-grid toc-main">
<div class="toc-column">

- [string](#string)
- [table](#table)
- [math](#math)

</div>
<div class="toc-column">

- [debug](#debug)
- [global](#global)

</div>
<div class="toc-column">

- [io](#io)
- [os](#os)

</div>
</div>


## String

<div class="toc-grid">
<div class="toc-column">

- [`string:lower()`](#string-lower)
- [`string:upper()`](#string-upper)
- [`string:is_one_of()`](#string-is_one_of-table)
- [`string:first_to_upper()`](#string-first_to_upper)
- [`string:title()`/`:to_headline()`](#string-title-to_headline)
- [`string:starts_with()`](#string-starts_with-prefix)
- [`string:ends_with()`](#string-ends_with-suffix)

</div>
<div class="toc-column">

- [`string:contains()`](#string-contains-sub_string)
- [`string:replace()`](#string-replace-pattern-replacement-n)
- [`string:remove()`](#string-remove-pattern-n)
- [`string:reg_escape()`](#string-reg_escape)
- [`string:vxr_split()`](#string-vxr_split-delimiter-processor)
- [`string.or_nil()`](#string-or_nil-value)

</div>
</div>

**Phương thức được cung cấp bởi Luanti:**

<div class="toc-grid">
<div class="toc-column">

- [`string.split()`](#luanti-string-split)
- [`string.trim()`](#luanti-string-trim)

</div>
<div class="toc-column">

- [`string.pack()`](#luanti-string-pack)
- [`string.unpack()`](#luanti-string-unpack)
- [`string.packsize()`](#luanti-string-packsize)

</div>
</div>

### `string:lower()`

Chuyển đổi chuỗi thành chữ thường với hỗ trợ tiếng Cyrillic.

```lua
print(('ПРИВЕТ МИР'):lower())  -- 'привет мир'
```

### `string:upper()`

Chuyển đổi chuỗi thành chữ hoa với hỗ trợ tiếng Cyrillic.

```lua
print(string.upper('привет мир'))  -- 'ПРИВЕТ МИР'
```

### `string:is_one_of(table)`

Kiểm tra xem chuỗi có phải là một trong các giá trị trong mảng được truyền hay không.  
(Tương tự ngữ nghĩa của [`table.contains`](#table-contains-table-value), kiểm tra xem chuỗi có được chứa trong mảng được truyền hay không.)

```lua
local text = 'hello'
local options = { 'hello', 'world', 'lua' }
print(text:is_one_of(options))  -- true
```

### `string:first_to_upper()`

Chuyển đổi chữ cái đầu tiên thành chữ hoa.

```lua
local text = 'hello world'
print(text:first_to_upper())  -- 'Hello world'
```

### `string` `:title()`/`:to_headline()`

Chuyển đổi chữ cái đầu tiên của mỗi từ thành title case.  
Tên thay thế: `string:to_headline()`

```lua
local text = 'hello world from lua'
print(text:title())           -- 'Hello World From Lua'
print(text:to_headline())     -- 'Hello World From Lua'
```

### `string:starts_with(prefix)`

Kiểm tra xem chuỗi có bắt đầu bằng tiền tố được chỉ định hay không.

```lua
local filename = 'config.json'
print(filename:starts_with('config'))    -- true
print(filename:starts_with('settings'))  -- false
```

### `string:ends_with(suffix)`

Kiểm tra xem chuỗi có kết thúc bằng hậu tố được chỉ định hay không.

```lua
local filename = 'config.json'
print(filename:ends_with('.json'))    -- true
print(filename:ends_with('.conf'))    -- false
```

### `string:contains(sub_string)`

Kiểm tra sự hiện diện của chuỗi con.

```lua
local text = 'Hello, World !!!'
print(text:contains('World'))   -- true
print(text:contains('world'))   -- false (phân biệt chữ hoa/thường)
```

### `string:replace(pattern, replacement, n?)`

Thay thế chuỗi con (tương tự của gsub, nhưng chỉ trả về chuỗi không có số lần thay thế).  
Xem tài liệu cho [`string.gsub`](https://www.lua.org/manual/5.4/manual.html#pdf-string.gsub) và [Patterns](https://www.lua.org/manual/5.4/manual.html#6.4.1)
```lua
local text = 'Hello, World, World!'
local result = text:replace('World', 'Lua')
print(result)  -- 'Hello, Lua, Lua!'

-- Chỉ thay thế lần xuất hiện đầu tiên
local result2 = text:replace('World', 'Lua', 1)
print(result2)  -- 'Hello, Lua, World!'
```

### `string:remove(pattern, n?)`

Xóa chuỗi con.  
Xem tài liệu cho [`string.gsub`](https://www.lua.org/manual/5.4/manual.html#pdf-string.gsub) và [Patterns](https://www.lua.org/manual/5.4/manual.html#6.4.1)

```lua
local text = 'Hello, World!'
print(text:remove(', '))        -- 'HelloWorld!'
print(text:remove('o', 1))      -- 'Hell, Wrld!' (chỉ xóa 'o' đầu tiên)
```

### `string:reg_escape()`

Thoát các ký tự đặc biệt cho biểu thức chính quy.  
Xem [Patterns](https://www.lua.org/manual/5.4/manual.html#6.4.1)

```lua
local pattern = 'file.txt'
print(pattern:reg_escape())      -- 'file%.txt'

local pattern2 = '^$()%.[]*+-?)'
print(pattern2:reg_escape())     -- '%^%$()%.%[%]%*%+\-%?)'
```

### `string:vxr_split(delimiter?, processor?)`

Chia chuỗi theo `delimiter` được chỉ định với khả năng xử lý các phần.

Luanti có phương thức `string.split` riêng, nhưng không hỗ trợ xử lý các phần.  
Phương thức này thêm khả năng xử lý các phần của chuỗi.

```lua
-- Không xử lý
('hello world'):vxr_split()             -- { 'hello', 'world' }
('apple,banana,cherry'):vxr_split(',')  -- { 'apple', 'banana', 'cherry' }

-- Với xử lý
local numbers = '1,2,3,4,5'
local squared = numbers:vxr_split(',', function(x)
    return tonumber(x)^2 
end)
print(squared[1], squared[2], squared[3], squared[4], squared[5])
-- 1 4 9 16 25
```


### `string.or_nil(value)`

Chuyển đổi thành chuỗi hoặc trả về nil.

```lua
print(string.or_nil('hello'))     -- 'hello'
print(string.or_nil(42))          -- '42'
print(string.or_nil(nil))         -- nil
print(tostring(nil))              -- 'nil' (so sánh)
```

---

#### Phương thức được cung cấp bởi Luanti :

### Luanti `string.split()`

Xem thêm: [`string.vxr_split(delimiter?, processor?)`](#string-vxr_split-delimiter-processor)

Chia chuỗi thành các phần theo dấu phân cách được chỉ định. Trả về mảng chuỗi.
Tham số:
- `separator?`      dấu phân cách, mặc định: `","`
- `include_empty?`  mặc định: `false`
- `max_splits?`     nếu âm, chia không giới hạn, mặc định: `-1`
- `sep_is_pattern?` nếu dấu phân cách là chuỗi thông thường hay pattern (regex), mặc định: `false`


```lua
local text = 'apple,banana,cherry'
local parts = text.split(',')
print(parts[1], parts[2], parts[3])  -- 'apple', 'banana', 'cherry'

-- Chia theo khoảng trắng
local words = 'hello world lua'.split(' ')
print(words[1], words[2], words[3])  -- 'hello', 'world', 'lua'
```

### Luanti `string.trim()`

Xóa các ký tự khoảng trắng ở đầu và cuối chuỗi.

```lua
print(("\n \t\tfoo bar\t "):trim())  -- 'foo bar'
```

### Luanti `string.pack()`

Đóng gói các giá trị vào chuỗi nhị phân theo định dạng.  
Backport [từ Lua 5.4](https://www.lua.org/manual/5.4/manual.html#pdf-string.pack).

```lua
-- Đóng gói số nguyên
local packed = string.pack('i4', 42)
print(#packed)  -- 4 (kích thước byte)

-- Đóng gói nhiều giá trị
local data = string.pack('i4f8', 100, 3.14)
print(#data)  -- 12 (4 + 8 byte)
```

### Luanti `string.unpack()`

Giải nén chuỗi nhị phân thành các giá trị theo định dạng.  
Backport [từ Lua 5.4](https://www.lua.org/manual/5.4/manual.html#pdf-string.unpack).

```lua
local packed = string.pack('i4f8', 100, 3.14)
local num, float, next_pos = string.unpack('i4f8', packed)
print(num, float)      -- 100, 3.14
print(next_pos)        -- 13 (vị trí sau giải nén)

-- Giải nén từ vị trí được chỉ định
local value = string.unpack('i4', packed, 5)
print(value)            -- 3.14 (như float)
```

### Luanti `string.packsize()`

Trả về kích thước của chuỗi sẽ được tạo bởi `string.pack`.  
Backport [từ Lua 5.4](https://www.lua.org/manual/5.4/manual.html#pdf-string.packsize).

```lua
local size = string.packsize('i4f8')
print(size)  -- 12 (4 + 8 byte)

-- Cho định dạng phức tạp
local complex_size = string.packsize('i4c10f8')
print(complex_size)  -- 22 (4 + 10 + 8 byte)
```



## Table

<div class="toc-grid">
<div class="toc-column">

- [`table.keys()`](#table-keys-table)
- [`table.values()`](#table-values-table)
- [`table.has_key()`](#table-has_key-table-key)
- [`table.contains`/`.has_value()`](#table-contains-has-value-table-value)
- [`table.keys_of()`](#table-keys_of-table-value)
- [`table.has_any_key()`](#table-has_any_key-table-find_keys)
---
- [`table.equals()`](#table-equals-table1-table2)
- [`table.is_empty()`](#table-is_empty-table)
- [`table.is_position()`](#table-is_position-table)
- [`table.each_value_is()`](#table-each_value_is-table-value)
---
- [`table.count()`](#table-count-table)
- [`table.generate_sequence()`](#table-generate_sequence-max-start_from-step)

</div>
<div class="toc-column">

- [`table.only()`](#table-only-table-only)
- [`table.except()`](#table-except-table-keys)
- [`table.merge()`](#table-merge-table1-table2-overwrite)
- [`table.join()`](#table-join-table1-table2-recursively)
- [`table.overwrite()`](#table-overwrite-table1-table2)
- [`table.merge_values()`](#table-merge_values-table1-table2)
---
- [`table.map()`](#table-map-table-callback-overwrite)
- [`table.walk()`/`.each()`](#table-walk-each-table-callback)
---
- [`table.multiply_each_value()`](#table-multiply_each_value-table-multiplier_table)
- [`table.add_values()`](#table-add_values-table1-table2-empty_value-overwrite)
- [`table.sub_values()`](#table-sub_values-table1-table2-empty_value-overwrite)
- [`table.mul_values()`](#table-mul_values-table1-table2-empty_value-overwrite)
- [`table.div_values()`](#table-div_values-table1-table2-empty_value-overwrite)

</div>
</div>

**Phương thức, [được cung cấp bởi Luanti](https://api.luanti.org/helper-functions/) :**

<div class="toc-grid">
<div class="toc-column">

- `table.copy()`
- `table.copy_with_metatables()`
- `table.insert_all()`

</div>
<div class="toc-column">

- `table.indexof()`
- `table.keyof()`
- `table.key_value_swap()`
- `table.shuffle()`

</div>
</div>


### `table.keys(table)`

Trả về một mảng các khóa của bảng.

```lua
local data = { name = 'Alek', age = 25, city = 'Vladivostok' }

local keys = table.keys(data)
-- `keys` chứa `{ 'name', 'age', 'city' }` (thứ tự có thể thay đổi)
```

### `table.values(table)`

Trả về một mảng các giá trị của bảng.

```lua
local data = { name = 'Alek', age = 25, city = 'Vladivostok' }

local values = table.values(data)
-- `values` chứa { 'Alek', 25, 'Vladivostok' }
```

### `table.has_key(table, key)`

Kiểm tra xem một khóa có tồn tại trong bảng hay không.

```lua
local data = { name = 'Alek', age = 25 }
print(table.has_key(data, 'name'))   -- true
print(table.has_key(data, 'city'))   -- false
```

### `table` `.contains`/`has_value(table, value)`

Kiểm tra xem một giá trị có tồn tại trong bảng hay không.

```lua
local fruits = { 'apple', 'banana', 'cherry' }
print(table.contains(fruits, 'banana'))  -- true
print(table.contains(fruits, 'orange'))  -- false
```
Bạn cũng có thể sử dụng [`string:is_one_of()`](#string-is_one_of-string):
```lua
print('banana':is_one_of(fruits))  -- true
print('orange':is_one_of(fruits))  -- false
```
Tên thay thế: `table.has_value`
```lua
local data = { x = 10, y = 20 }
print(table.has_value(data, 10))     -- true
print(table.has_value(data, 30))     -- false
```

### `table.keys_of(table, value)`

Trả về một bảng với các khóa của bảng được chỉ định có giá trị được chỉ định.

```lua
local data = { a = 10, b = 20, c = 10, d = 30 }
local keys = table.keys_of(data, 10)
print(dump(keys))  -- { 'a', 'c' }

local keys2 = table.keys_of(data, 99)
print(keys2)  -- nil (không có khóa nào như vậy)
```

### `table.has_any_key(table, find_keys)`

Kiểm tra xem các khóa của bảng có chứa ít nhất một giá trị từ mảng được chỉ định hay không.

```lua
local data = { name = 'test', age = 25, active = true }
local find_keys = { 'name', 'email', 'phone' }

print(table.has_any_key(data, find_keys))   -- true (khóa 'name' có trong find_keys)

local find_keys2 = { 'email', 'phone', 'address' }
print(table.has_any_key(data, find_keys2))  -- false
```

### `table.equals(table1, table2)`

So sánh đệ quy hai bảng để kiểm tra sự bằng nhau hoàn toàn.

```lua
local table1 = { a = 1, b = { c = 2, d = 3 } }
local table2 = { a = 1, b = { c = 2, d = 3 } }
local table3 = { a = 1, b = { c = 2, d = 4 } }

print(table.equals(table1, table2))  -- true
print(table.equals(table1, table3))  -- false
```

### `table.is_empty(table)`

Kiểm tra xem bảng có rỗng hay không.

```lua
print(table.is_empty({}))           -- true
print(table.is_empty({ a = 1 }))    -- false
```

### `table.is_position(table)`

Kiểm tra xem bảng có đại diện cho tọa độ hay không.

```lua
print(table.is_position({ x = 10, y = 20, z = 30 }))  -- true
print(table.is_position({ x = 10, y = 20 }))          -- false
print(table.is_position({ a = 1, b = 2, c = 3 }))     -- false
```

### `table.each_value_is(table, value)`

Kiểm tra rằng tất cả các phần tử của bảng bằng với giá trị được chỉ định. Mặc định kiểm tra cho `true`.

```lua
local data1 = { true, true, true }
print(table.each_value_is(data1))  -- true

local data2 = { 5, 5, 5, 5 }
print(table.each_value_is(data2, 5))  -- true

local data3 = { 1, 2, 3 }
print(table.each_value_is(data3, 1))  -- false
```

### `table.count(table)`

Đếm số lượng phần tử trong bảng.
> [!NOTE]
> Đối với bảng có khóa nguyên, sử dụng `#table`.  
> Vì toán tử `#` không hoạt động trên bảng có khóa không nguyên, sử dụng `table.count` cho chúng.

```lua
local data = { a = 1, b = 2, c = 3 }
print(table.count(data))  -- 3
print(#data)              -- 0, vì toán tử `#` không hoạt động với khóa không nguyên.

local array = { 1, 2, 3, 4, 5 }
print(#array) -- 5
```

### `table.generate_sequence(max, start_from?, step?)`

Tạo chuỗi số.

```lua
local seq1 = table.generate_sequence(5)
print(dump(seq1))  -- { 1, 2, 3, 4, 5 }

local seq2 = table.generate_sequence(10, 2, 2)
print(dump(seq2))  -- { 2, 4, 6, 8, 10 }

local seq3 = table.generate_sequence(1, 5, -1)
print(dump(seq3))  -- { 5, 4, 3, 2, 1 }
```

### `table.only(table, only)`

Trả về một bảng mới chứa dữ liệu ***chỉ*** với các khóa được chỉ định.

```lua
local data = { name = 'Alek', age = 25, city = 'Vladivostok', country = 'Russia' }
local filtered = table.only(data, { 'name', 'age' })
-- `filtered` chứa `{ name = 'Alek', age = 25 }`
print(filtered.name, filtered.age)    -- 'Alek', 25
print(filtered.city)                  -- nil
```

### `table.except(table, keys)`

Trả về một bảng mới chứa dữ liệu ***không*** có các khóa được chỉ định.  
(sao chép bảng, ***loại trừ*** các khóa được chỉ định)

```lua
local data = { name = 'Alek', age = 25, city = 'Vladivostok', country = 'Russia' }
local filtered = table.except(data, { 'age', 'country' })
-- `filtered` chứa `{ name = 'Alek', city = 'Vladivostok' }`
print(filtered.name, filtered.city)      -- 'Alek', 'Vladivostok'
print(filtered.age,  filtered.country)   -- nil, nil
```

### `table.merge(table1, table2, overwrite?)`

Hợp nhất các bảng một cách đệ quy.

Mặc định, bảng đầu tiên không bị ghi đè, bảng mới được tạo.
```lua
local defaults = { theme = 'dark', font = { size = 12, family = 'Arial' } }
local user_config = { font = { size = 16 }, language = 'en' }

local merged = table.merge(defaults, user_config)
print(dump(merged))
-- {
--     theme = "dark",
--     font = {
--         size = 16,
--         family = "Arial",
--     },
--     language = "en",
-- }
```
Ghi đè lên bảng đầu tiên:
```lua
table.merge(defaults, user_config, true)
```
> [!TIP]
> Nên sử dụng [`table.overwrite()`](#table-overwrite-table1-table2) để dễ đọc hơn.

### `table.join(table1, table2, recursively?)`

Thêm các khóa bị thiếu từ `table2` vào `table1`.  
Các giá trị là bảng được sao chép bằng `table.copy()`.

```lua
local base     = { a = 1, b =  2        }
local addition = {        b = 10, c = 3 }

table.join(base, addition)
print(dump(base))  -- { a = 1, b = 2, c = 3 }
```
Nếu `recursively` là `true`, hàm sẽ được áp dụng đệ quy chỉ cho các giá trị
là bảng trong cả `table1` và `table2`.
```lua
local base     = { a = 1, b = { c = 2          } }
local addition = {        b = { c = 10, d = 20 } }

table.join(base, addition, true)
print(dump(base))
-- {
--     a = 1,
--     b = {
--         c = 2,
--         d = 20,
--     },
-- }
```

### `table.overwrite(table1, table2)`

Ghi đè hoàn toàn `table1` bằng các giá trị từ `table2`.

Biến thể ngữ nghĩa cho [`table.merge(table1, table2, true)`](#table-merge-table1-table2-overwrite).

### `table.merge_values(table1, table2)`

Hợp nhất các giá trị của hai bảng thành một, loại bỏ trùng lặp.  
Thứ tự được bảo tồn - đầu tiên các giá trị từ `table1`, sau đó từ `table2` không có trong `table1`.

```lua
local table1 = { 'apple', 'banana', 'cherry' }
local table2 = { 'banana', 'date', 'apple', 'elderberry' }

local merged = table.merge_values(table1, table2)
print(dump(merged))  -- { 'apple', 'banana', 'cherry', 'date', 'elderberry' }
```

### `table.map(table, callback, overwrite?)`

Áp dụng hàm cho mỗi phần tử của bảng.  
`callback: fun(value: any, key: any): any` - chấp nhận giá trị và khóa, trả về giá trị mới.

Mặc định trả về một bảng mới.

```lua
local numbers = { 1, 2, 3, 4, 5 }
local squared = table.map(numbers, function(x) return x * x end)
print(dump(squared))
-- { 1, 4, 9, 16, 25 }

local data = { a = 10, b = 20 }
local doubled = table.map(data, function(value, key)
	print(key, value)
	return value * 2
end)
-- a       10
-- b       20
print(dump(doubled))
-- { a = 20, b = 40 }
```

Nếu `overwrite` là `true`, thì hàm sửa đổi bảng gốc.
```lua
local data = { a = 10, b = 20 }
table.map(data, function(value, key) return value * 2 end, true)
print(dump(data))  -- { a = 20, b = 40 }
```

### `table` `.walk`/`.each(table, callback)`

Lặp qua bảng áp dụng hàm (không sửa đổi bảng).  
`callback: fun(value: any, key: any): void` - chấp nhận giá trị và khóa; không trả về gì cả.
```lua
local data = { a = 10, b = 20, c = 30 }
table.walk(data, function(value, key)
    print(key, value)
end)
-- a       10
-- c       30
-- b       20
```
Tên thay thế: `table.each()`
```lua
local data = { a = 10, b = 20, c = 30 }
table.each(data, function(value, key)
    data[key] = value * 2
    -- Không có gì ngăn cản truy cập vào upvalue `data`. Bây giờ `data` đã bị ghi đè.
end)
print(dump(data))  -- { a = 20, b = 40, c = 60 }
```

### `table.multiply_each_value(table, multiplier_table)`

Nhân mỗi giá trị của bảng với giá trị tương ứng từ multiplier_table theo khóa.

```lua
local data = { a = 10, b = 20, c = 30 }
local multipliers = { a = 2, b = 0.5, c = 3 }

local result = table.multiply_each_value(data, multipliers)
print(dump(result))  -- { a = 20, b = 10, c = 90 }
-- Các khóa không có nhân tử giữ nguyên
```

### `table.add_values(table1, table2, empty_value?, overwrite?)`

Thêm các giá trị có cùng khóa từ hai bảng.

```lua
local table1 = { a = 10, b = 20 }
local table2 = { b = 5, c = 15 }

local result = table.add_values(table1, table2)
print(dump(result))  -- { a = 10, b = 25, c = 15 }

-- Với giá trị rỗng cho các khóa bị thiếu
local result2 = table.add_values(table1, table2, 0)
print(dump(result2))  -- { a = 10, b = 25, c = 15 }
```

### `table.sub_values(table1, table2, empty_value?, overwrite?)`

Trừ các giá trị table2 từ table1 cho các khóa giống nhau.

```lua
local table1 = { a = 10, b = 20, c = 30 }
local table2 = { b = 5, c = 10, d = 5 }

local result = table.sub_values(table1, table2)
print(dump(result))  -- { a = 10, b = 15, c = 20, d = -5 }
```

### `table.mul_values(table1, table2, empty_value?, overwrite?)`

Nhân các giá trị có cùng khóa từ hai bảng.

```lua
local table1 = { a = 2, b = 3 }
local table2 = { b = 4, c = 5 }

local result = table.mul_values(table1, table2)
print(dump(result))  -- { a = 2, b = 12, c = 5 }
```

### `table.div_values(table1, table2, empty_value?, overwrite?)`

Chia các giá trị table1 bằng các giá trị table2 cho các khóa giống nhau.

```lua
local table1 = { a = 10, b = 20, c = 30 }
local table2 = { b = 5, c = 10, d = 2 }

local result = table.div_values(table1, table2)
print(dump(result))  -- { a = 10, b = 4, c = 3, d = 0.5 }
```



## Math

<div class="toc-grid">
<div class="toc-column">

- [`math.limit`/`clamp()`](#math-limit-clamp-value-min-max)
- [`math.is_within()`](#math-is_within-value-min-max)
- [`math.is_among()`](#math-is_among-value-min-max)
- [`math.is_in_range()`](#math-is_in_range-value-min-max)
- [`math.is_near()`](#math-is_near-value-near-gap)

</div>
<div class="toc-column">

- [`math.quadratic_equation_roots()`](#math-quadratic_equation_roots-a-b-c)
- [`math.point_on_circle()`](#math-point_on_circle-radius-angle)

</div>
</div>

### `math` `.limit`/`.clamp(value, min, max)`

Giới hạn giá trị đến khoảng được chỉ định.  
Tên thay thế: `math.clamp()`.

```lua
local health = 150
local max_health = 100
local clamped_health = math.limit(health, 0, max_health)
print(clamped_health)  -- 100
```

### `math.is_within(value, min, max)`

Kiểm tra rằng giá trị nằm trong khoảng một cách nghiêm ngặt (`min < value < max`).

```lua
print(math.is_within(5, 1, 10))   -- true
print(math.is_within(1, 1, 10))   -- false (giới hạn không bao gồm)
print(math.is_within(10, 1, 10))  -- false
```

### `math.is_among(value, min, max)`

Kiểm tra rằng giá trị nằm trong khoảng, bao gồm giới hạn (`min <= value <= max`).

```lua
print(math.is_among(5, 1, 10))   -- true
print(math.is_among(1, 1, 10))   -- true
print(math.is_among(10, 1, 10))  -- true
```

### `math.is_in_range(value, min, max)`

Kiểm tra rằng giá trị nằm trong khoảng bán mở `(min, max]` (`min < value <= max`).

```lua
print(math.is_in_range(5, 1, 10))   -- true
print(math.is_in_range(1, 1, 10))   -- false (bằng giá trị tối thiểu)
print(math.is_in_range(10, 1, 10))  -- true (bằng giá trị tối đa)
```

### `math.is_near(value, near, gap?)`

Kiểm tra rằng giá trị gần với giá trị được chỉ định (`|value - near| <= gap`).

```lua
print(math.is_near(10, 12))        -- false (gap = 1 mặc định)
print(math.is_near(11, 12))        -- true
print(math.is_near(10, 12, 3))     -- true (gap = 3)
```

### `math.quadratic_equation_roots(a, b, c)`

Giải phương trình bậc hai của dạng `y = a*x^2 + b*x + c`.

```lua
local root1, root2 = math.quadratic_equation_roots(1, -5, 6)
print(root1, root2)  -- 3, 2

-- Không có nghiệm thực
local r1, r2 = math.quadratic_equation_roots(1, 0, 1)
print(r1, r2)  -- nil, nil
```

### `math.point_on_circle(radius, angle)`

Tính toán một điểm trên vòng tròn.

```lua
local x, z = math.point_on_circle(5, math.pi/4)
print(x, z)  -- tọa độ của một điểm trên vòng tròn bán kính 5 tại góc 45°
```



## Debug

<div class="toc-grid">
<div class="toc-column">

- [`__FILE__()`](#__file__-depth-full)
- [`__LINE__()`](#__line__-depth)
- [`__FILE_LINE__()`](#__file_line__-depth-full)
- [`__DIR__()`](#__dir__-depth)
- [`__FUNC__()`](#__func__-depth)

</div>
<div class="toc-column">

- [`print_dump()`](#print_dump-depth-with_trace) / [`pd()`](#pd) / [`pdt()`](#pdt)
- [`debug.measure()`](#debug-measure-name-callback-print_result)
- [`debug.mesure_print()`](#debug-mesure_print-name)

</div>
</div>

### `__FILE__(depth?, full?)`
Trả về tên tệp hiện tại hoặc tệp của hàm gọi tùy thuộc vào độ sâu stack.
- `depth?` - độ sâu stack gọi (mặc định `0`)
- `full?` - hiển thị đường dẫn đầy đủ (mặc định `false`)
```lua
-- Lấy đường dẫn tương đối của tệp
print(__FILE__())  -- 'mods/Voxrame/helpers/src/lua_ext/debug.lua'

-- Lấy đường dẫn đầy đủ của tệp
print(__FILE__(0, true))  -- '/home/alek13/projects/my-game/mods/Voxrame/helpers/src/lua_ext/debug.lua'

-- Lấy tệp 2 cấp trên trong stack gọi
print(__FILE__(2))  -- tệp của hàm đã gọi hàm gọi
```

### `__LINE__(depth?)`
Trả về số dòng hiện tại hoặc số dòng của hàm gọi tùy thuộc vào độ sâu stack.
```lua
print(__LINE__())  -- 57

-- Lấy số dòng của hàm gọi
print(__LINE__(1))  -- số dòng trong tệp gọi
```

### `__FILE_LINE__(depth?, full?)`

Trả về tệp và dòng theo định dạng "đường/dẫn/tương/đối/tệp:dòng".

```lua
print(__FILE_LINE__())  -- 'mods/Voxrame/helpers/src/lua_ext/debug.lua:65'

-- Với đường dẫn đầy đủ
print(__FILE_LINE__(0, true))  -- '/home/alek13/projects/my-game/mods/Voxrame/helpers/src/lua_ext/debug.lua:65'
```

### `__DIR__(depth?)`

Trả về thư mục của tệp hiện tại hoặc tệp của hàm gọi tùy thuộc vào độ sâu stack.

```lua
print(__DIR__())  -- 'mods/Voxrame/helpers/src/lua_ext/'
```

### `__FUNC__(depth?)`

Trả về tên của hàm hiện tại.

```lua
function my_function()
    print(__FUNC__())  -- 'my_function'
end
```

### `print_dump(depth, with_trace, ...)`

In nội dung của tất cả các tham số được truyền `...`.  
Trước khi in, thêm tên tệp và dòng `@ <file>:<line>`.

Nếu `with_trace` là `true`, thêm in stack trace.

> [!NOTE]
> Nếu [terminal của bạn hỗ trợ liên kết](https://github.com/Alhadis/OSC8-Adoption), mỗi `@ <file>:<line>` sẽ được liên kết đến mở IDE, xem `readme.md` để cấu hình.

> [!TIP]
> Sử dụng `pd()` và `pdt()` để cú pháp ngắn gọn hơn. Xem ví dụ dưới đây.


### `pd(...)`

Viết tắt cho `print_dump`. Gọi `print_dump` với `with_trace == false`.

```lua
local player_name = 'test_player'
local position = { x = 10, y = 20, z = 30 }

pd(player_name, position)
```
<small style="color: var(--vp-c-text-2)">output:</small>
```ansi
\27]8;;vscode://file//full-path-to-project/mods/Voxrame/map/src/map/Corridor.lua:14\27\\\27[93m@ \27[0m\27[33mlord/mods/Voxrame/map/src/map/Corridor.lua\27[0m\27[97m:\27[0m\27[32m14\27[0m\27]8;;\27\\
\27[36mplayer_name:\27[0m "test_player"
\27[36m   position:\27[0m {
    x = 10,
    y = 20,
    z = 30,
}
```

### `pdt(...)`

Viết tắt cho `print_dump traced`. Gọi `print_dump` với `with_trace == true`.

```lua
local player_name = 'test_player'
local position = { x = 10, y = 20, z = 30 }

pdt(player_name, position)
```
<small style="color: var(--vp-c-text-2)">output:</small>
```ansi
\27]8;;vscode://file//full-path-to-project/mods/Voxrame/map/src/map/Corridor.lua:14\27\\\27[93m@ \27[0m\27[33mlord/mods/Voxrame/map/src/map/Corridor.lua\27[0m\27[97m:\27[0m\27[32m14\27[0m\27]8;;\27\\
\27[3m\27[2m   1   \27[0m\27[93m@\27[0m [C]\27[36m: in dofile\27[0m
\27[3m\27[2m   2   \27[0m\27]8;;vscode://file//full-path-to-project/mods/Voxrame/builtin_ext/src/mod/require.lua:29\27\\\27[93m@ \27[0m\27[33mlord/mods/Voxrame/builtin_ext/src/mod/require.lua\27[0m\27[97m:\27[0m\27[32m29\27[0m\27]8;;\27\\\27[36m: in require\27[0m
\27[3m\27[2m   3   \27[0m\27]8;;vscode://file//full-path-to-project/mods/Voxrame/map/src/map.lua:9\27\\\27[93m@ \27[0m\27[33mlord/mods/Voxrame/map/src/map.lua\27[0m\27[97m:\27[0m\27[32m9\27[0m\27]8;;\27\\\27[36m: in main\27[0m
\27[3m\27[2m   4   \27[0m\27[93m@\27[0m [C]\27[36m: in dofile\27[0m
\27[3m\27[2m   5   \27[0m\27]8;;vscode://file//full-path-to-project/mods/Voxrame/builtin_ext/src/mod/require.lua:29\27\\\27[93m@ \27[0m\27[33mlord/mods/Voxrame/builtin_ext/src/mod/require.lua\27[0m\27[97m:\27[0m\27[32m29\27[0m\27]8;;\27\\\27[36m: in require\27[0m
\27[3m\27[2m   6   \27[0m\27]8;;vscode://file//full-path-to-project/mods/Voxrame/map/init.lua:4\27\\\27[93m@ \27[0m\27[33mlord/mods/Voxrame/map/init.lua\27[0m\27[97m:\27[0m\27[32m4\27[0m\27]8;;\27\\\27[36m: in mod_init_function\27[0m
\27[3m\27[2m   7   \27[0m\27]8;;vscode://file//full-path-to-project/mods/Voxrame/builtin_ext/src/mod.lua:80\27\\\27[93m@ \27[0m\27[33mlord/mods/Voxrame/builtin_ext/src/mod.lua\27[0m\27[97m:\27[0m\27[32m80\27[0m\27]8;;\27\\\27[36m: in mod\27[0m
\27[3m\27[2m   8   \27[0m\27]8;;vscode://file//full-path-to-project/mods/Voxrame/map/init.lua:3\27\\\27[93m@ \27[0m\27[33mlord/mods/Voxrame/map/init.lua\27[0m\27[97m:\27[0m\27[32m3\27[0m\27]8;;\27\\\27[36m: in main\27[0m
\27[36mplayer_name:\27[0m "test_player"
\27[36m   position:\27[0m {
    x = 10,
    y = 20,
    z = 30,
}
```

### `debug.measure(name, callback, print_result?)`

Đo thời gian thực thi của hàm.

```lua
local function heavy_calculation()
    local sum = 0
    for i = 1, 2000000 do
        sum = sum + math.random(1, 100) + math.sin(i)
    end
end

-- Đo với kết quả in
debug.measure('calculation', heavy_calculation, true)
debug.measure('calculation', heavy_calculation, true)
debug.measure('calculation', heavy_calculation, true)
debug.measure('calculation', heavy_calculation, true)
debug.measure('calculation', heavy_calculation, true)
-- output:
-- Measure of [calculation]:  Time:    42 ms ;  Average:    42 ms
-- Measure of [calculation]:  Time:    58 ms ;  Average:    50 ms
-- Measure of [calculation]:  Time:    58 ms ;  Average:    53 ms
-- Measure of [calculation]:  Time:    35 ms ;  Average:    48 ms
-- Measure of [calculation]:  Time:    33 ms ;  Average:    45 ms


-- Đo không có kết quả
local time, avg, count = debug.measure('calculation', heavy_calculation)
print(time, avg, count)
local time, avg, count = debug.measure('calculation', heavy_calculation)
print(time, avg, count)
-- output:
-- 33.075  43.170833333333 6
-- 33.135  41.737142857143 7
```

### `debug.mesure_print(name)`

In thống kê của các phép đo trước đó `name` được thu được từ các lệnh gọi đến [`debug.measure(name, ....)`](#debug-measure-name-callback-print_result).

```lua
debug.mesure_print('calculation')
-- output:
-- Measure of [calculation]: Average time:    42 ms ; Last time:    33 ms ; Count of mesures:     7
```



## Global

<div class="toc-grid">
<div class="toc-column">

- [`errorf(message, ...)`](#errorf-message)
- [`errorlf(message, level, ...)`](#errorlf-message-level)
- [`assertf(condition, message, ...)`](#assertf-condition-message)

</div>
</div>

### `errorf(message, ...)`

Tương tự như [`error()` trong Lua](https://www.lua.org/manual/5.1/manual.html#pdf-error), nhưng `message` có thể là một chuỗi mẫu với các tham số được chỉ định, tương tự như [`string.format()`](https://www.lua.org/manual/5.1/manual.html#pdf-string.format).

```lua
local player_name = nil
errorf('Player `%s` not found', player_name)
-- Error: Player `nil` not found
```

<small style="color: var(--vp-c-text-2)">output (khi `debug` được kích hoạt):</small>

```ansi
\27[32m++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++\27[0m
\27[1m\27[91mERROR:\27[0m
\27[91m  Player `nil` not found\27[0m

\27[1m\27[91mStack trace:\27[0m
\27[3m\27[2m   1   \27[0m\27[93m@\27[0m [C]\27[36m: in error\27[0m
\27[3m\27[2m   2   \27[0m\27]8;;vscode://file//full-path-to-project/mods/Voxrame/helpers/src/lua_ext/global.lua:9\27\\\27[93m@ \27[0m\27[33mlord/mods/Voxrame/helpers/src/lua_ext/global.lua\27[0m\27[97m:\27[0m\27[32m9\27[0m\27]8;;\27\\\27[36m: in errorf\27[0m
\27[3m\27[2m   3   \27[0m\27]8;;vscode://file//full-path-to-project/mods/Voxrame/map/src/map/Corridor.lua:14\27\\\27[93m@ \27[0m\27[33mlord/mods/Voxrame/map/src/map/Corridor.lua\27[0m\27[97m:\27[0m\27[32m14\27[0m\27]8;;\27\\\27[36m: in main\27[0m
\27[3m\27[2m   4   \27[0m\27[93m@\27[0m [C]\27[36m: in dofile\27[0m
\27[3m\27[2m   5   \27[0m\27]8;;vscode://file//full-path-to-project/mods/Voxrame/builtin_ext/src/mod/require.lua:29\27\\\27[93m@ \27[0m\27[33mlord/mods/Voxrame/builtin_ext/src/mod/require.lua\27[0m\27[97m:\27[0m\27[32m29\27[0m\27]8;;\27\\\27[36m: in require\27[0m
\27[3m\27[2m   6   \27[0m\27]8;;vscode://file//full-path-to-project/mods/Voxrame/map/src/map.lua:9\27\\\27[93m@ \27[0m\27[33mlord/mods/Voxrame/map/src/map.lua\27[0m\27[97m:\27[0m\27[32m9\27[0m\27]8;;\27\\\27[36m: in main\27[0m
\27[3m\27[2m   7   \27[0m\27[93m@\27[0m [C]\27[36m: in dofile\27[0m
\27[3m\27[2m   8   \27[0m\27]8;;vscode://file//full-path-to-project/mods/Voxrame/builtin_ext/src/mod/require.lua:29\27\\\27[93m@ \27[0m\27[33mlord/mods/Voxrame/builtin_ext/src/mod/require.lua\27[0m\27[97m:\27[0m\27[32m29\27[0m\27]8;;\27\\\27[36m: in require\27[0m
\27[3m\27[2m   9   \27[0m\27]8;;vscode://file//full-path-to-project/mods/Voxrame/map/init.lua:4\27\\\27[93m@ \27[0m\27[33mlord/mods/Voxrame/map/init.lua\27[0m\27[97m:\27[0m\27[32m4\27[0m\27]8;;\27\\\27[36m: in mod_init_function\27[0m
\27[3m\27[2m  10   \27[0m\27]8;;vscode://file//full-path-to-project/mods/Voxrame/builtin_ext/src/mod.lua:80\27\\\27[93m@ \27[0m\27[33mlord/mods/Voxrame/builtin_ext/src/mod.lua\27[0m\27[97m:\27[0m\27[32m80\27[0m\27]8;;\27\\\27[36m: in mod\27[0m
\27[3m\27[2m  11   \27[0m\27]8;;vscode://file//full-path-to-project/mods/Voxrame/map/init.lua:3\27\\\27[93m@ \27[0m\27[33mlord/mods/Voxrame/map/init.lua\27[0m\27[97m:\27[0m\27[32m3\27[0m\27]8;;\27\\\27[36m: in main\27[0m

\27[32m++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++\27[0m
```

###### Xử lý lỗi trong Luanti {#error-handling-warning}
> [!WARNING]
> Stack trace sẽ chứa các dòng bổ sung, vì Luanti [không chuyển `level` được chỉ định](https://github.com/luanti-org/luanti/blob/3b67e73bc3402291bd3790dc2b8f3932be1b42b4/src/script/common/c_internal.cpp#L52) đến `core.error_handler()`.

### `errorlf(message, level, ...)`

Như trong [`errorf()`](#errorf-message) bạn có thể truyền chuỗi định dạng và tham số, và cũng chỉ định mức trace.

```lua
errorlf('Lỗi trong dữ liệu', 3, 'giá trị: %d', 42)
-- Lỗi với trace 3 cấp trên
```
xem [xử lý lỗi trong Luanti](#error-handling-warning)

### `assertf(condition, message, ...)`

Tương tự như [`assert()` trong Lua](https://www.lua.org/manual/5.1/manual.html#pdf-assert), nhưng làm `message` bạn có thể chỉ định chuỗi định dạng với tham số, tương tự như [`string.format()`](https://www.lua.org/manual/5.1/manual.html#5.4.1).  
> Gọi `errorf()` nếu điều kiện `condition` không được thỏa mãn.

```lua
-- Tiếp tục thực thi nếu player tồn tại, nếu không thì lỗi
local player = nil
assertf(player, 'Người chơi `%s` không tìm thấy', player)
```



## IO

<div class="toc-grid">
<div class="toc-column">

- [`io.file_exists()`](#io-file_exists-name)
- [`io.dirname()`](#io-dirname-path)

</div>
<div class="toc-column">

- [`io.write_to_file()`](#io-write_to_file-filepath-content-mode)
- [`io.read_from_file()`](#io-read_from_file-filepath-mode)
- [`io.get_file_error()`](#io-get_file_error)

</div>
</div>

### `io.file_exists(name)`

Kiểm tra xem tệp có tồn tại hay không.

```lua
if io.file_exists('config.txt') then
    print('Tệp cấu hình được tìm thấy')
else
    print('Thiếu tệp cấu hình')
end
```

### `io.dirname(path)`

Trả về thư mục từ đường dẫn.

```lua
print(io.dirname('/home/user/project/file.txt'))  -- '/home/user/project'
print(io.dirname('relative/path/file.txt'))       -- 'relative/path'
print(io.dirname('file.txt'))                     -- '.'
```

### `io.write_to_file(filepath, content, mode?)`

Ghi nội dung vào tệp.

```lua
local success, error_code, error_message = io.write_to_file('data.txt', 'Hello, World!')

if success then
    print('Dữ liệu được ghi thành công')
else
    print('Lỗi ghi:', error_code, error_message)
end

-- Thêm vào cuối tệp
io.write_to_file('log.txt', 'Mục mới\n', 'a')
```

### `io.read_from_file(filepath, mode?)`

Đọc toàn bộ nội dung từ tệp.  
Trả về chuỗi với nội dung tệp nếu thành công hoặc `false, error_code, error_message` nếu lỗi.

```lua
local content = io.read_from_file('config.json')
if content then
    print('Nội dung tệp:', content)
else
    print('Lỗi đọc tệp')
end
```
Xử lý lỗi
```lua
local success, error_code, error_message = io.read_from_file('nonexistent.txt')
if not success then
    print('Lỗi:', error_code, error_message)
end
-- Lỗi: 2       nonexistent.txt: No such file or directory
```
<small>hoặc:</small>

```lua
local success = io.read_from_file('nonexistent.txt')
if not success then
    local error_code, error_message = io.get_file_error()
    print('Lỗi:', error_code, error_message)
end
-- Lỗi: 2       nonexistent.txt: No such file or directory
```
Đọc ở chế độ nhị phân
```lua
local binary_content = io.read_from_file('image.png', 'rb')
if binary_content then
    print('Kích thước tệp:', #binary_content, 'byte')
end
```

### `io.get_file_error()`

Trả về mã và thông báo lỗi cuối cùng từ các hàm `io.read_from_file()` hoặc `io.write_to_file()`.

```lua
local success = io.read_from_file('nonexistent.txt')
if not success then
    local error_code, error_message = io.get_file_error()
    print('Lỗi:', error_code, error_message)
end
-- Output: Lỗi: 2       nonexistent.txt: No such file or directory
```
```lua
local success = io.write_to_file('/readonly/file.txt', 'data')
if not success then
    local error_code, error_message = io.get_file_error()
    print('Lỗi ghi:', error_code, error_message)
end
-- Output: Lỗi ghi: 13       /readonly/file.txt: Permission denied
```



## OS

### `os.DIRECTORY_SEPARATOR`

Dấu phân cách thư mục cho hệ điều hành hiện tại.

```lua
local DS = os.DIRECTORY_SEPARATOR

print(DS)  -- '/' trên Linux/Mac, '\' trên Windows
print('folder' .. DS .. 'file.txt')
-- trên Linux/Mac: 'folder/file.txt'
-- trên Windows:   'folder\file.txt'
```
