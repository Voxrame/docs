---
layout: doc
title: 辅助函数
---

# 辅助函数

辅助函数是一套用于在项目中舒适工作的 Lua 辅助函数集合。

这些辅助函数显著扩展了标准 Lua 功能并简化了开发。

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
- [`string:title()`/`:to_headline()`](#string-title-to-headline)
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

**Luanti 提供的方法：**

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

将字符串转换为小写，支持西里尔字母。

```lua
print(('ПРИВЕТ МИР'):lower())  -- 'привет мир'
```

### `string:upper()`

将字符串转换为大写，支持西里尔字母。

```lua
print(string.upper('привет мир'))  -- 'ПРИВЕТ МИР'
```

### `string:is_one_of(table)`

检查字符串是否是传递数组中的值之一。  
（[`table.contains`](#table-contains-table-value) 的语义类似物，它检查字符串是否包含在传递的数组中。）

```lua
local text = 'hello'
local options = { 'hello', 'world', 'lua' }
print(text:is_one_of(options))  -- true
```

### `string:first_to_upper()`

将首字母转换为大写。

```lua
local text = 'hello world'
print(text:first_to_upper())  -- 'Hello world'
```

### `string` `:title()`/`:to_headline()`

将每个单词的首字母转换为首字母大写。  
替代名称：`string:to_headline()`

```lua
local text = 'hello world from lua'
print(text:title())           -- 'Hello World From Lua'
print(text:to_headline())     -- 'Hello World From Lua'
```

### `string:starts_with(prefix)`

检查字符串是否以指定前缀开始。

```lua
local filename = 'config.json'
print(filename:starts_with('config'))    -- true
print(filename:starts_with('settings'))  -- false
```

### `string:ends_with(suffix)`

检查字符串是否以指定后缀结束。

```lua
local filename = 'config.json'
print(filename:ends_with('.json'))    -- true
print(filename:ends_with('.conf'))    -- false
```

### `string:contains(sub_string)`

检查子字符串的存在。

```lua
local text = 'Hello, World !!!'
print(text:contains('World'))   -- true
print(text:contains('world'))   -- false (区分大小写)
```

### `string:replace(pattern, replacement, n?)`

替换子字符串（gsub 的类似物，但只返回字符串而不返回替换次数）。  
参见 [`string.gsub`](https://www.lua.org/manual/5.4/manual.html#pdf-string.gsub) 和 [Patterns](https://www.lua.org/manual/5.4/manual.html#6.4.1) 的文档
```lua
local text = 'Hello, World, World!'
local result = text:replace('World', 'Lua')
print(result)  -- 'Hello, Lua, Lua!'

-- 只替换第一次出现
local result2 = text:replace('World', 'Lua', 1)
print(result2)  -- 'Hello, Lua, World!'
```

### `string:remove(pattern, n?)`

删除子字符串。  
参见 [`string.gsub`](https://www.lua.org/manual/5.4/manual.html#pdf-string.gsub) 和 [Patterns](https://www.lua.org/manual/5.4/manual.html#6.4.1) 的文档

```lua
local text = 'Hello, World!'
print(text:remove(', '))        -- 'HelloWorld!'
print(text:remove('o', 1))      -- 'Hell, Wrld!' (只删除第一个 'o')
```

### `string:reg_escape()`

转义正则表达式的特殊字符。  
参见 [Patterns](https://www.lua.org/manual/5.4/manual.html#6.4.1)

```lua
local pattern = 'file.txt'
print(pattern:reg_escape())      -- 'file%.txt'

local pattern2 = '^$()%.[]*+-?)'
print(pattern2:reg_escape())     -- '%^%$()%.%[%]%*%+\-%?)'
```

### `string:vxr_split(delimiter?, processor?)`

按指定的 `delimiter` 分割字符串，具有处理部分的能力。

Luanti 有自己的 `string.split` 方法，但它不支持处理部分。  
此方法添加了处理字符串部分的能力。

```lua
-- 不处理
('hello world'):vxr_split()             -- { 'hello', 'world' }
('apple,banana,cherry'):vxr_split(',')  -- { 'apple', 'banana', 'cherry' }

-- 带处理
local numbers = '1,2,3,4,5'
local squared = numbers:vxr_split(',', function(x)
    return tonumber(x)^2 
end)
print(squared[1], squared[2], squared[3], squared[4], squared[5])
-- 1 4 9 16 25
```


### `string.or_nil(value)`

转换为字符串或返回 nil。

```lua
print(string.or_nil('hello'))     -- 'hello'
print(string.or_nil(42))          -- '42'
print(string.or_nil(nil))         -- nil
print(tostring(nil))              -- 'nil' (比较)
```

---

#### Luanti 提供的方法：

### Luanti `string.split()`

另见：[`string.vxr_split(delimiter?, processor?)`](#string-vxr_split-delimiter-processor)

按指定的分隔符将字符串分割为部分。返回字符串数组。
参数：
- `separator?`      分隔符，默认：`","`
- `include_empty?`  默认：`false`
- `max_splits?`     如果为负，分割无限制，默认：`-1`
- `sep_is_pattern?` 分隔符是普通字符串还是模式（regex），默认：`false`


```lua
local text = 'apple,banana,cherry'
local parts = text.split(',')
print(parts[1], parts[2], parts[3])  -- 'apple', 'banana', 'cherry'

-- 按空格分割
local words = 'hello world lua'.split(' ')
print(words[1], words[2], words[3])  -- 'hello', 'world', 'lua'
```

### Luanti `string.trim()`

从字符串的开头和结尾删除空白字符。

```lua
print(("\n \t\tfoo bar\t "):trim())  -- 'foo bar'
```

### Luanti `string.pack()`

根据格式将值打包为二进制字符串。  
[从 Lua 5.4 移植](https://www.lua.org/manual/5.4/manual.html#pdf-string.pack)。

```lua
-- 打包整数
local packed = string.pack('i4', 42)
print(#packed)  -- 4 (字节大小)

-- 打包多个值
local data = string.pack('i4f8', 100, 3.14)
print(#data)  -- 12 (4 + 8 字节)
```

### Luanti `string.unpack()`

根据格式将二进制字符串解包为值。  
[从 Lua 5.4 移植](https://www.lua.org/manual/5.4/manual.html#pdf-string.unpack)。

```lua
local packed = string.pack('i4f8', 100, 3.14)
local num, float, next_pos = string.unpack('i4f8', packed)
print(num, float)      -- 100, 3.14
print(next_pos)        -- 13 (解包后的位置)

-- 从指定位置解包
local value = string.unpack('i4', packed, 5)
print(value)            -- 3.14 (作为 float)
```

### Luanti `string.packsize()`

返回将由 `string.pack` 创建的字符串的大小。  
[从 Lua 5.4 移植](https://www.lua.org/manual/5.4/manual.html#pdf-string.packsize)。

```lua
local size = string.packsize('i4f8')
print(size)  -- 12 (4 + 8 字节)

-- 对于复杂格式
local complex_size = string.packsize('i4c10f8')
print(complex_size)  -- 22 (4 + 10 + 8 字节)
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

**方法，[由 Luanti 提供](https://api.luanti.org/helper-functions/)：**

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

返回表键的数组。

```lua
local data = { name = 'Alek', age = 25, city = 'Vladivostok' }

local keys = table.keys(data)
-- `keys` 包含 `{ 'name', 'age', 'city' }` (顺序可能不同)
```

### `table.values(table)`

返回表值的数组。

```lua
local data = { name = 'Alek', age = 25, city = 'Vladivostok' }

local values = table.values(data)
-- `values` 包含 { 'Alek', 25, 'Vladivostok' }
```

### `table.has_key(table, key)`

检查键是否存在于表中。

```lua
local data = { name = 'Alek', age = 25 }
print(table.has_key(data, 'name'))   -- true
print(table.has_key(data, 'city'))   -- false
```

### `table` `.contains`/`has_value(table, value)`

检查值是否存在于表中。

```lua
local fruits = { 'apple', 'banana', 'cherry' }
print(table.contains(fruits, 'banana'))  -- true
print(table.contains(fruits, 'orange'))  -- false
```
您也可以使用 [`string:is_one_of()`](#string-is_one_of-string)：
```lua
print('banana':is_one_of(fruits))  -- true
print('orange':is_one_of(fruits))  -- false
```
替代名称：`table.has_value`
```lua
local data = { x = 10, y = 20 }
print(table.has_value(data, 10))     -- true
print(table.has_value(data, 30))     -- false
```

### `table.keys_of(table, value)`

返回一个表，其中包含指定表中具有指定值的键。

```lua
local data = { a = 10, b = 20, c = 10, d = 30 }
local keys = table.keys_of(data, 10)
print(dump(keys))  -- { 'a', 'c' }

local keys2 = table.keys_of(data, 99)
print(keys2)  -- nil (没有这样的键)
```

### `table.has_any_key(table, find_keys)`

检查表键是否包含指定数组中的至少一个值。

```lua
local data = { name = 'test', age = 25, active = true }
local find_keys = { 'name', 'email', 'phone' }

print(table.has_any_key(data, find_keys))   -- true (键 'name' 在 find_keys 中)

local find_keys2 = { 'email', 'phone', 'address' }
print(table.has_any_key(data, find_keys2))  -- false
```

### `table.equals(table1, table2)`

递归比较两个表是否完全相等。

```lua
local table1 = { a = 1, b = { c = 2, d = 3 } }
local table2 = { a = 1, b = { c = 2, d = 3 } }
local table3 = { a = 1, b = { c = 2, d = 4 } }

print(table.equals(table1, table2))  -- true
print(table.equals(table1, table3))  -- false
```

### `table.is_empty(table)`

检查表是否为空。

```lua
print(table.is_empty({}))           -- true
print(table.is_empty({ a = 1 }))    -- false
```

### `table.is_position(table)`

检查表是否表示坐标。

```lua
print(table.is_position({ x = 10, y = 20, z = 30 }))  -- true
print(table.is_position({ x = 10, y = 20 }))          -- false
print(table.is_position({ a = 1, b = 2, c = 3 }))     -- false
```

### `table.each_value_is(table, value)`

检查表的所有元素是否等于指定值。默认检查 `true`。

```lua
local data1 = { true, true, true }
print(table.each_value_is(data1))  -- true

local data2 = { 5, 5, 5, 5 }
print(table.each_value_is(data2, 5))  -- true

local data3 = { 1, 2, 3 }
print(table.each_value_is(data3, 1))  -- false
```

### `table.count(table)`

计算表中元素的数量。
> [!NOTE]
> 对于具有整数键的表，使用 `#table`。  
> 因为 `#` 操作符不适用于具有非整数键的表，所以对它们使用 `table.count`。

```lua
local data = { a = 1, b = 2, c = 3 }
print(table.count(data))  -- 3
print(#data)              -- 0，因为 `#` 操作符不适用于非整数键。

local array = { 1, 2, 3, 4, 5 }
print(#array) -- 5
```

### `table.generate_sequence(max, start_from?, step?)`

生成数字序列。

```lua
local seq1 = table.generate_sequence(5)
print(dump(seq1))  -- { 1, 2, 3, 4, 5 }

local seq2 = table.generate_sequence(10, 2, 2)
print(dump(seq2))  -- { 2, 4, 6, 8, 10 }

local seq3 = table.generate_sequence(1, 5, -1)
print(dump(seq3))  -- { 5, 4, 3, 2, 1 }
```

### `table.only(table, only)`

返回一个新表，其中包含***仅***具有指定键的数据。

```lua
local data = { name = 'Alek', age = 25, city = 'Vladivostok', country = 'Russia' }
local filtered = table.only(data, { 'name', 'age' })
-- `filtered` 包含 `{ name = 'Alek', age = 25 }`
print(filtered.name, filtered.age)    -- 'Alek', 25
print(filtered.city)                  -- nil
```

### `table.except(table, keys)`

返回一个新表，其中包含***不包含***指定键的数据。  
（复制表，***排除***指定键）

```lua
local data = { name = 'Alek', age = 25, city = 'Vladivostok', country = 'Russia' }
local filtered = table.except(data, { 'age', 'country' })
-- `filtered` 包含 `{ name = 'Alek', city = 'Vladivostok' }`
print(filtered.name, filtered.city)      -- 'Alek', 'Vladivostok'
print(filtered.age,  filtered.country)   -- nil, nil
```

### `table.merge(table1, table2, overwrite?)`

递归合并表。

默认情况下，第一个表不会被覆盖，会创建一个新表。
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
覆盖第一个表：
```lua
table.merge(defaults, user_config, true)
```
> [!TIP]
> 为了更好的可读性，最好使用 [`table.overwrite()`](#table-overwrite-table1-table2)。

### `table.join(table1, table2, recursively?)`

将 `table2` 中缺少的键添加到 `table1`。  
作为表的值使用 `table.copy()` 复制。

```lua
local base     = { a = 1, b =  2        }
local addition = {        b = 10, c = 3 }

table.join(base, addition)
print(dump(base))  -- { a = 1, b = 2, c = 3 }
```
如果 `recursively` 为 `true`，函数将仅对在 `table1` 和 `table2` 中都是表的值
递归应用。
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

用 `table2` 的值完全覆盖 `table1`。

[`table.merge(table1, table2, true)`](#table-merge-table1-table2-overwrite) 的语义变体。

### `table.merge_values(table1, table2)`

将两个表的值合并为一个，删除重复项。  
顺序被保留 - 先是 `table1` 的值，然后是 `table2` 中不在 `table1` 中的值。

```lua
local table1 = { 'apple', 'banana', 'cherry' }
local table2 = { 'banana', 'date', 'apple', 'elderberry' }

local merged = table.merge_values(table1, table2)
print(dump(merged))  -- { 'apple', 'banana', 'cherry', 'date', 'elderberry' }
```

### `table.map(table, callback, overwrite?)`

将函数应用于表的每个元素。  
`callback: fun(value: any, key: any): any` - 接受值和键，返回新值。

默认返回一个新表。

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

如果 `overwrite` 为 `true`，则函数修改原始表。
```lua
local data = { a = 10, b = 20 }
table.map(data, function(value, key) return value * 2 end, true)
print(dump(data))  -- { a = 20, b = 40 }
```

### `table` `.walk`/`.each(table, callback)`

遍历表应用函数（不修改表）。  
`callback: fun(value: any, key: any): void` - 接受值和键；不返回任何内容。
```lua
local data = { a = 10, b = 20, c = 30 }
table.walk(data, function(value, key)
    print(key, value)
end)
-- a       10
-- c       30
-- b       20
```
替代名称：`table.each()`
```lua
local data = { a = 10, b = 20, c = 30 }
table.each(data, function(value, key)
    data[key] = value * 2
    -- 没有什么阻止访问 upvalue `data`。现在 `data` 被覆盖了。
end)
print(dump(data))  -- { a = 20, b = 40, c = 60 }
```

### `table.multiply_each_value(table, multiplier_table)`

将表的每个值乘以 multiplier_table 中按键对应的相应值。

```lua
local data = { a = 10, b = 20, c = 30 }
local multipliers = { a = 2, b = 0.5, c = 3 }

local result = table.multiply_each_value(data, multipliers)
print(dump(result))  -- { a = 20, b = 10, c = 90 }
-- 没有乘数的键保持不变
```

### `table.add_values(table1, table2, empty_value?, overwrite?)`

将两个表中具有相同键的值相加。

```lua
local table1 = { a = 10, b = 20 }
local table2 = { b = 5, c = 15 }

local result = table.add_values(table1, table2)
print(dump(result))  -- { a = 10, b = 25, c = 15 }

-- 为缺失键指定空值
local result2 = table.add_values(table1, table2, 0)
print(dump(result2))  -- { a = 10, b = 25, c = 15 }
```

### `table.sub_values(table1, table2, empty_value?, overwrite?)`

对于相同键，从 table1 中减去 table2 的值。

```lua
local table1 = { a = 10, b = 20, c = 30 }
local table2 = { b = 5, c = 10, d = 5 }

local result = table.sub_values(table1, table2)
print(dump(result))  -- { a = 10, b = 15, c = 20, d = -5 }
```

### `table.mul_values(table1, table2, empty_value?, overwrite?)`

将两个表中具有相同键的值相乘。

```lua
local table1 = { a = 2, b = 3 }
local table2 = { b = 4, c = 5 }

local result = table.mul_values(table1, table2)
print(dump(result))  -- { a = 2, b = 12, c = 5 }
```

### `table.div_values(table1, table2, empty_value?, overwrite?)`

对于相同键，将 table1 的值除以 table2 的值。

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

将值限制在指定范围内。  
替代名称：`math.clamp()`。

```lua
local health = 150
local max_health = 100
local clamped_health = math.limit(health, 0, max_health)
print(clamped_health)  -- 100
```

### `math.is_within(value, min, max)`

检查值是否严格在范围内 (`min < value < max`)。

```lua
print(math.is_within(5, 1, 10))   -- true
print(math.is_within(1, 1, 10))   -- false (不包括边界)
print(math.is_within(10, 1, 10))  -- false
```

### `math.is_among(value, min, max)`

检查值是否在范围内，包括边界 (`min <= value <= max`)。

```lua
print(math.is_among(5, 1, 10))   -- true
print(math.is_among(1, 1, 10))   -- true
print(math.is_among(10, 1, 10))  -- true
```

### `math.is_in_range(value, min, max)`

检查值是否在半开区间 `(min, max]` 内 (`min < value <= max`)。

```lua
print(math.is_in_range(5, 1, 10))   -- true
print(math.is_in_range(1, 1, 10))   -- false (等于最小值)
print(math.is_in_range(10, 1, 10))  -- true (等于最大值)
```

### `math.is_near(value, near, gap?)`

检查值是否接近指定值 (`|value - near| <= gap`)。

```lua
print(math.is_near(10, 12))        -- false (gap 默认为 1)
print(math.is_near(11, 12))        -- true
print(math.is_near(10, 12, 3))     -- true (gap = 3)
```

### `math.quadratic_equation_roots(a, b, c)`

求解形式为 `y = a*x^2 + b*x + c` 的二次方程。

```lua
local root1, root2 = math.quadratic_equation_roots(1, -5, 6)
print(root1, root2)  -- 3, 2

-- 没有实根
local r1, r2 = math.quadratic_equation_roots(1, 0, 1)
print(r1, r2)  -- nil, nil
```

### `math.point_on_circle(radius, angle)`

计算圆上的点。

```lua
local x, z = math.point_on_circle(5, math.pi/4)
print(x, z)  -- 半径为 5、角度为 45° 的圆上点的坐标
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
根据堆栈深度返回当前文件或调用函数文件的名称。
- `depth?` - 调用堆栈深度（默认 `0`）
- `full?` - 显示完整路径（默认 `false`）
```lua
-- 获取相对文件路径
print(__FILE__())  -- 'mods/Voxrame/helpers/src/lua_ext/debug.lua'

-- 获取完整文件路径
print(__FILE__(0, true))  -- '/home/alek13/projects/my-game/mods/Voxrame/helpers/src/lua_ext/debug.lua'

-- 获取调用堆栈向上 2 级的文件
print(__FILE__(2))  -- 调用调用函数的函数的文件
```

### `__LINE__(depth?)`
根据堆栈深度返回当前行号或调用函数的行号。
```lua
print(__LINE__())  -- 57

-- 获取调用函数的行号
print(__LINE__(1))  -- 调用文件中的行号
```

### `__FILE_LINE__(depth?, full?)`

以格式 "relative/path/to/file:line" 返回文件和行。

```lua
print(__FILE_LINE__())  -- 'mods/Voxrame/helpers/src/lua_ext/debug.lua:65'

-- 带完整路径
print(__FILE_LINE__(0, true))  -- '/home/alek13/projects/my-game/mods/Voxrame/helpers/src/lua_ext/debug.lua:65'
```

### `__DIR__(depth?)`

根据堆栈深度返回当前文件或调用函数文件的目录。

```lua
print(__DIR__())  -- 'mods/Voxrame/helpers/src/lua_ext/'
```

### `__FUNC__(depth?)`

返回当前函数的名称。

```lua
function my_function()
    print(__FUNC__())  -- 'my_function'
end
```

### `print_dump(depth, with_trace, ...)`

输出所有传递参数 `...` 的内容。  
在输出之前，添加文件名和行 `@ <file>:<line>`。

如果 `with_trace` 为 `true`，则额外输出堆栈跟踪。

> [!NOTE]
> 如果您的[终端支持链接](https://github.com/Alhadis/OSC8-Adoption)，每个 `@ <file>:<line` 将链接到打开 IDE，请参阅 `readme.md` 进行设置。

> [!TIP]
> 使用 `pd()` 和 `pdt()` 获得更简洁的语法。请参阅下面的示例。


### `pd(...)`

`print_dump` 的缩写。调用 `print_dump` 并设置 `with_trace == false`。

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

`print_dump traced` 的缩写。调用 `print_dump` 并设置 `with_trace == true`。

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

测量函数执行时间。

```lua
local function heavy_calculation()
    local sum = 0
    for i = 1, 2000000 do
        sum = sum + math.random(1, 100) + math.sin(i)
    end
end

-- 带结果输出测量
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


-- 无输出测量
local time, avg, count = debug.measure('calculation', heavy_calculation)
print(time, avg, count)
local time, avg, count = debug.measure('calculation', heavy_calculation)
print(time, avg, count)
-- output:
-- 33.075  43.170833333333 6
-- 33.135  41.737142857143 7
```

### `debug.mesure_print(name)`

输出通过调用 [`debug.measure(name, ....)`](#debug-measure-name-callback-print_result) 获得的先前测量 `name` 的统计信息。

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

类似于 [Lua 中的 `error()`](https://www.lua.org/manual/5.1/manual.html#pdf-error)，但 `message` 可以是带有指定参数的模板字符串，类似于 [`string.format()`](https://www.lua.org/manual/5.1/manual.html#pdf-string.format)。

```lua
local player_name = nil
errorf('Player `%s` not found', player_name)
-- Error: Player `nil` not found
```

<small style="color: var(--vp-c-text-2)">output（当启用 `debug` 时）：</small>

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

###### Luanti 中的错误处理 {#error-handling-warning}
> [!WARNING]
> 堆栈跟踪将包含额外的行，因为 Luanti [不将指定的 `level` 传递](https://github.com/luanti-org/luanti/blob/3b67e73bc3402291bd3790dc2b8f3932be1b42b4/src/script/common/c_internal.cpp#L52) 给 `core.error_handler()`。

### `errorlf(message, level, ...)`

像在 [`errorf()`](#errorf-message) 中一样，您可以传递格式字符串和参数，还可以指定跟踪级别。

```lua
errorlf('数据中的错误', 3, '值: %d', 42)
-- 向上 3 级跟踪的错误
```
参见 [Luanti 中的错误处理](#error-handling-warning)

### `assertf(condition, message, ...)`

类似于 [Lua 中的 `assert()`](https://www.lua.org/manual/5.1/manual.html#pdf-assert)，但作为 `message`，您可以指定带有参数的格式字符串，类似于 [`string.format()`](https://www.lua.org/manual/5.1/manual.html#5.4.1)。  
> 如果条件 `condition` 不满足，则调用 `errorf()`。

```lua
-- 如果 player 存在则继续执行，否则错误
local player = nil
assertf(player, '玩家 `%s` 未找到', player)
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

检查文件是否存在。

```lua
if io.file_exists('config.txt') then
    print('找到配置文件')
else
    print('缺少配置文件')
end
```

### `io.dirname(path)`

从路径返回目录。

```lua
print(io.dirname('/home/user/project/file.txt'))  -- '/home/user/project'
print(io.dirname('relative/path/file.txt'))       -- 'relative/path'
print(io.dirname('file.txt'))                     -- '.'
```

### `io.write_to_file(filepath, content, mode?)`

将内容写入文件。

```lua
local success, error_code, error_message = io.write_to_file('data.txt', 'Hello, World!')

if success then
    print('数据成功写入')
else
    print('写入错误：', error_code, error_message)
end

-- 追加到文件末尾
io.write_to_file('log.txt', '新条目\n', 'a')
```

### `io.read_from_file(filepath, mode?)`

从文件读取所有内容。  
成功时返回包含文件内容的字符串，错误时返回 `false, error_code, error_message`。

```lua
local content = io.read_from_file('config.json')
if content then
    print('文件内容：', content)
else
    print('文件读取错误')
end
```
错误处理
```lua
local success, error_code, error_message = io.read_from_file('nonexistent.txt')
if not success then
    print('错误：', error_code, error_message)
end
-- 错误：2       nonexistent.txt: No such file or directory
```
<small>或：</small>

```lua
local success = io.read_from_file('nonexistent.txt')
if not success then
    local error_code, error_message = io.get_file_error()
    print('错误：', error_code, error_message)
end
-- 错误：2       nonexistent.txt: No such file or directory
```
二进制模式读取
```lua
local binary_content = io.read_from_file('image.png', 'rb')
if binary_content then
    print('文件大小：', #binary_content, '字节')
end
```

### `io.get_file_error()`

返回 `io.read_from_file()` 或 `io.write_to_file()` 函数的最后一个错误的代码和消息。

```lua
local success = io.read_from_file('nonexistent.txt')
if not success then
    local error_code, error_message = io.get_file_error()
    print('错误：', error_code, error_message)
end
-- 输出：错误：2       nonexistent.txt: No such file or directory
```
```lua
local success = io.write_to_file('/readonly/file.txt', 'data')
if not success then
    local error_code, error_message = io.get_file_error()
    print('写入错误：', error_code, error_message)
end
-- 输出：写入错误：13       /readonly/file.txt: Permission denied
```



## OS

### `os.DIRECTORY_SEPARATOR`

当前操作系统的目录分隔符。

```lua
local DS = os.DIRECTORY_SEPARATOR

print(DS)  -- Linux/Mac 上为 '/'，Windows 上为 '\'
print('folder' .. DS .. 'file.txt')
-- Linux/Mac 上：'folder/file.txt'
-- Windows 上：'folder\file.txt'
```
