---
layout: doc
title: Helpers
---

# Helpers

Helpers are a set of auxiliary Lua functions for comfortable work in the project.

These helper functions significantly extend the standard Lua capabilities and simplify development.

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

**Methods provided by Luanti:**

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

Converts string to lowercase with Cyrillic support.

```lua
print(('ПРИВЕТ МИР'):lower())  -- 'привет мир'
```

### `string:upper()`

Converts string to uppercase with Cyrillic support.

```lua
print(string.upper('привет мир'))  -- 'ПРИВЕТ МИР'
```

### `string:is_one_of(table)`

Checks if the string is one of the values in the passed array.  
(Semantic analogue of [`table.contains`](#table-contains-table-value), which checks if the string is contained in the passed array.)

```lua
local text = 'hello'
local options = { 'hello', 'world', 'lua' }
print(text:is_one_of(options))  -- true
```

### `string:first_to_upper()`

Converts the first letter to uppercase.

```lua
local text = 'hello world'
print(text:first_to_upper())  -- 'Hello world'
```

### `string` `:title()`/`:to_headline()`

Converts the first letter of each word to title case.  
Alternative name: `string:to_headline()`

```lua
local text = 'hello world from lua'
print(text:title())           -- 'Hello World From Lua'
print(text:to_headline())     -- 'Hello World From Lua'
```

### `string:starts_with(prefix)`

Checks if the string starts with the specified prefix.

```lua
local filename = 'config.json'
print(filename:starts_with('config'))    -- true
print(filename:starts_with('settings'))  -- false
```

### `string:ends_with(suffix)`

Checks if the string ends with the specified suffix.

```lua
local filename = 'config.json'
print(filename:ends_with('.json'))    -- true
print(filename:ends_with('.conf'))    -- false
```

### `string:contains(sub_string)`

Checks for the presence of a substring.

```lua
local text = 'Hello, World !!!'
print(text:contains('World'))   -- true
print(text:contains('world'))   -- false (case sensitive)
```

### `string:replace(pattern, replacement, n?)`

Replaces substring (analogue of gsub, but returns only the string without the number of replacements).  
See documentation for [`string.gsub`](https://www.lua.org/manual/5.4/manual.html#pdf-string.gsub) and [Patterns](https://www.lua.org/manual/5.4/manual.html#6.4.1)
```lua
local text = 'Hello, World, World!'
local result = text:replace('World', 'Lua')
print(result)  -- 'Hello, Lua, Lua!'

-- Replace only the first occurrence
local result2 = text:replace('World', 'Lua', 1)
print(result2)  -- 'Hello, Lua, World!'
```

### `string:remove(pattern, n?)`

Removes substring.  
See documentation for [`string.gsub`](https://www.lua.org/manual/5.4/manual.html#pdf-string.gsub) and [Patterns](https://www.lua.org/manual/5.4/manual.html#6.4.1)

```lua
local text = 'Hello, World!'
print(text:remove(', '))        -- 'HelloWorld!'
print(text:remove('o', 1))      -- 'Hell, Wrld!' (remove only the first 'o')
```

### `string:reg_escape()`

Escapes special characters for regular expressions.  
See [Patterns](https://www.lua.org/manual/5.4/manual.html#6.4.1)

```lua
local pattern = 'file.txt'
print(pattern:reg_escape())      -- 'file%.txt'

local pattern2 = '^$()%.[]*+-?)'
print(pattern2:reg_escape())     -- '%^%$()%.%[%]%*%+\-%?)'
```

### `string:vxr_split(delimiter?, processor?)`

Splits string by specified `delimiter` with the ability to process parts.

Luanti has its own `string.split` method, but it doesn't support processing parts.  
This method adds the ability to process string parts.

```lua
-- Without processing
('hello world'):vxr_split()             -- { 'hello', 'world' }
('apple,banana,cherry'):vxr_split(',')  -- { 'apple', 'banana', 'cherry' }

-- With processing
local numbers = '1,2,3,4,5'
local squared = numbers:vxr_split(',', function(x)
    return tonumber(x)^2 
end)
print(squared[1], squared[2], squared[3], squared[4], squared[5])
-- 1 4 9 16 25
```


### `string.or_nil(value)`

Converts to string or returns nil.

```lua
print(string.or_nil('hello'))     -- 'hello'
print(string.or_nil(42))          -- '42'
print(string.or_nil(nil))         -- nil
print(tostring(nil))              -- 'nil' (comparison)
```

---

#### Methods provided by Luanti:

### Luanti `string.split()`

Also see: [`string.vxr_split(delimiter?, processor?)`](#string-vxr_split-delimiter-processor)

Splits string into parts by specified separator. Returns array of strings.
Arguments:
- `separator?`      separator, default: `","`
- `include_empty?`  default: `false`
- `max_splits?`     if negative, splits are unlimited, default: `-1`
- `sep_is_pattern?` whether separator is a regular string or a pattern (regex), default: `false`


```lua
local text = 'apple,banana,cherry'
local parts = text.split(',')
print(parts[1], parts[2], parts[3])  -- 'apple', 'banana', 'cherry'

-- Split by spaces
local words = 'hello world lua'.split(' ')
print(words[1], words[2], words[3])  -- 'hello', 'world', 'lua'
```

### Luanti `string.trim()`

Removes whitespace characters from the beginning and end of the string.

```lua
print(("\n \t\tfoo bar\t "):trim())  -- 'foo bar'
```

### Luanti `string.pack()`

Packs values into a binary string according to format.  
Backport [from Lua 5.4](https://www.lua.org/manual/5.4/manual.html#pdf-string.pack).

```lua
-- Pack integers
local packed = string.pack('i4', 42)
print(#packed)  -- 4 (size in bytes)

-- Pack multiple values
local data = string.pack('i4f8', 100, 3.14)
print(#data)  -- 12 (4 + 8 bytes)
```

### Luanti `string.unpack()`

Unpacks binary string into values according to format.  
Backport [from Lua 5.4](https://www.lua.org/manual/5.4/manual.html#pdf-string.unpack).

```lua
local packed = string.pack('i4f8', 100, 3.14)
local num, float, next_pos = string.unpack('i4f8', packed)
print(num, float)      -- 100, 3.14
print(next_pos)        -- 13 (position after unpacking)

-- Unpack from specified position
local value = string.unpack('i4', packed, 5)
print(value)            -- 3.14 (as float)
```

### Luanti `string.packsize()`

Returns the size of the string that will be created by `string.pack`.  
Backport [from Lua 5.4](https://www.lua.org/manual/5.4/manual.html#pdf-string.packsize).

```lua
local size = string.packsize('i4f8')
print(size)  -- 12 (4 + 8 bytes)

-- For complex formats
local complex_size = string.packsize('i4c10f8')
print(complex_size)  -- 22 (4 + 10 + 8 bytes)
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

**Methods, [provided by Luanti](https://api.luanti.org/helper-functions/):**

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

Returns an array of table keys.

```lua
local data = { name = 'Alek', age = 25, city = 'Vladivostok' }

local keys = table.keys(data)
-- `keys` contains `{ 'name', 'age', 'city' }` (order may vary)
```

### `table.values(table)`

Returns an array of table values.

```lua
local data = { name = 'Alek', age = 25, city = 'Vladivostok' }

local values = table.values(data)
-- `values` contains { 'Alek', 25, 'Vladivostok' }
```

### `table.has_key(table, key)`

Checks if a key exists in the table.

```lua
local data = { name = 'Alek', age = 25 }
print(table.has_key(data, 'name'))   -- true
print(table.has_key(data, 'city'))   -- false
```

### `table` `.contains`/`has_value(table, value)`

Checks if a value exists in the table.

```lua
local fruits = { 'apple', 'banana', 'cherry' }
print(table.contains(fruits, 'banana'))  -- true
print(table.contains(fruits, 'orange'))  -- false
```
You can also use [`string:is_one_of()`](#string-is_one_of-string):
```lua
print('banana':is_one_of(fruits))  -- true
print('orange':is_one_of(fruits))  -- false
```
Alternative name: `table.has_value`
```lua
local data = { x = 10, y = 20 }
print(table.has_value(data, 10))     -- true
print(table.has_value(data, 30))     -- false
```

### `table.keys_of(table, value)`

Returns a table with keys from the specified table that have the specified value.

```lua
local data = { a = 10, b = 20, c = 10, d = 30 }
local keys = table.keys_of(data, 10)
print(dump(keys))  -- { 'a', 'c' }

local keys2 = table.keys_of(data, 99)
print(keys2)  -- nil (no such keys)
```

### `table.has_any_key(table, find_keys)`

Checks if the table keys contain at least one value from the specified array.

```lua
local data = { name = 'test', age = 25, active = true }
local find_keys = { 'name', 'email', 'phone' }

print(table.has_any_key(data, find_keys))   -- true (key 'name' is in find_keys)

local find_keys2 = { 'email', 'phone', 'address' }
print(table.has_any_key(data, find_keys2))  -- false
```

### `table.equals(table1, table2)`

Recursively compares two tables for complete equality.

```lua
local table1 = { a = 1, b = { c = 2, d = 3 } }
local table2 = { a = 1, b = { c = 2, d = 3 } }
local table3 = { a = 1, b = { c = 2, d = 4 } }

print(table.equals(table1, table2))  -- true
print(table.equals(table1, table3))  -- false
```

### `table.is_empty(table)`

Checks if the table is empty.

```lua
print(table.is_empty({}))           -- true
print(table.is_empty({ a = 1 }))    -- false
```

### `table.is_position(table)`

Checks if the table represents coordinates.

```lua
print(table.is_position({ x = 10, y = 20, z = 30 }))  -- true
print(table.is_position({ x = 10, y = 20 }))          -- false
print(table.is_position({ a = 1, b = 2, c = 3 }))     -- false
```

### `table.each_value_is(table, value)`

Checks that all elements of the table are equal to the specified value. By default checks for `true`.

```lua
local data1 = { true, true, true }
print(table.each_value_is(data1))  -- true

local data2 = { 5, 5, 5, 5 }
print(table.each_value_is(data2, 5))  -- true

local data3 = { 1, 2, 3 }
print(table.each_value_is(data3, 1))  -- false
```

### `table.count(table)`

Counts the number of elements in the table.
> [!NOTE]
> For tables with integer keys, use `#table`.  
> Since the `#` operator doesn't work on tables with non-integer keys, use `table.count` for them.

```lua
local data = { a = 1, b = 2, c = 3 }
print(table.count(data))  -- 3
print(#data)              -- 0, because the `#` operator doesn't work with non-integer keys.

local array = { 1, 2, 3, 4, 5 }
print(#array) -- 5
```

### `table.generate_sequence(max, start_from?, step?)`

Generates a sequence of numbers.

```lua
local seq1 = table.generate_sequence(5)
print(dump(seq1))  -- { 1, 2, 3, 4, 5 }

local seq2 = table.generate_sequence(10, 2, 2)
print(dump(seq2))  -- { 2, 4, 6, 8, 10 }

local seq3 = table.generate_sequence(1, 5, -1)
print(dump(seq3))  -- { 5, 4, 3, 2, 1 }
```

### `table.only(table, only)`

Returns a new table containing data ***only*** with the specified keys.

```lua
local data = { name = 'Alek', age = 25, city = 'Vladivostok', country = 'Russia' }
local filtered = table.only(data, { 'name', 'age' })
-- `filtered` contains `{ name = 'Alek', age = 25 }`
print(filtered.name, filtered.age)    -- 'Alek', 25
print(filtered.city)                  -- nil
```

### `table.except(table, keys)`

Returns a new table containing data ***without*** the specified keys.  
(copies the table, ***excluding*** the specified keys)

```lua
local data = { name = 'Alek', age = 25, city = 'Vladivostok', country = 'Russia' }
local filtered = table.except(data, { 'age', 'country' })
-- `filtered` contains `{ name = 'Alek', city = 'Vladivostok' }`
print(filtered.name, filtered.city)      -- 'Alek', 'Vladivostok'
print(filtered.age,  filtered.country)   -- nil, nil
```

### `table.merge(table1, table2, overwrite?)`

Recursively merges tables.

By default, the first table is not overwritten, a new one is created.
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
Overwrite the first table:
```lua
table.merge(defaults, user_config, true)
```
> [!TIP]
> It's better to use [`table.overwrite()`](#table-overwrite-table1-table2) for better readability.

### `table.join(table1, table2, recursively?)`

Adds missing keys from `table2` to `table1`.  
Values that are tables are copied using `table.copy()`.

```lua
local base     = { a = 1, b =  2        }
local addition = {        b = 10, c = 3 }

table.join(base, addition)
print(dump(base))  -- { a = 1, b = 2, c = 3 }
```
If `recursively` is `true`, the function will be applied recursively only for values
that are tables in both `table1` and `table2`.
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

Completely overwrites `table1` with values from `table2`.

Semantic variant for [`table.merge(table1, table2, true)`](#table-merge-table1-table2-overwrite).

### `table.merge_values(table1, table2)`

Merges values from two tables into one, removing duplicates.  
Order is preserved - first values from `table1`, then from `table2` that weren't in `table1`.

```lua
local table1 = { 'apple', 'banana', 'cherry' }
local table2 = { 'banana', 'date', 'apple', 'elderberry' }

local merged = table.merge_values(table1, table2)
print(dump(merged))  -- { 'apple', 'banana', 'cherry', 'date', 'elderberry' }
```

### `table.map(table, callback, overwrite?)`

Applies function to each element of the table.  
`callback: fun(value: any, key: any): any` - accepts value and key, returns new value.

By default returns a new table.

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

If `overwrite` is `true`, then the function modifies the original table.
```lua
local data = { a = 10, b = 20 }
table.map(data, function(value, key) return value * 2 end, true)
print(dump(data))  -- { a = 20, b = 40 }
```

### `table` `.walk`/`.each(table, callback)`

Iterates over the table applying function (does not modify the table).  
`callback: fun(value: any, key: any): void` - accepts value and key; returns nothing.
```lua
local data = { a = 10, b = 20, c = 30 }
table.walk(data, function(value, key)
    print(key, value)
end)
-- a       10
-- c       30
-- b       20
```
Alternative name: `table.each()`
```lua
local data = { a = 10, b = 20, c = 30 }
table.each(data, function(value, key)
    data[key] = value * 2
    -- Nothing prevents accessing upvalue `data`. Now `data` is overwritten.
end)
print(dump(data))  -- { a = 20, b = 40, c = 60 }
```

### `table.multiply_each_value(table, multiplier_table)`

Multiplies each value of the table by the corresponding value from multiplier_table by key.

```lua
local data = { a = 10, b = 20, c = 30 }
local multipliers = { a = 2, b = 0.5, c = 3 }

local result = table.multiply_each_value(data, multipliers)
print(dump(result))  -- { a = 20, b = 10, c = 90 }
-- Keys without a multiplier remain unchanged
```

### `table.add_values(table1, table2, empty_value?, overwrite?)`

Adds values with the same keys from two tables.

```lua
local table1 = { a = 10, b = 20 }
local table2 = { b = 5, c = 15 }

local result = table.add_values(table1, table2)
print(dump(result))  -- { a = 10, b = 25, c = 15 }

-- With empty value for missing keys
local result2 = table.add_values(table1, table2, 0)
print(dump(result2))  -- { a = 10, b = 25, c = 15 }
```

### `table.sub_values(table1, table2, empty_value?, overwrite?)`

Subtracts table2 values from table1 for the same keys.

```lua
local table1 = { a = 10, b = 20, c = 30 }
local table2 = { b = 5, c = 10, d = 5 }

local result = table.sub_values(table1, table2)
print(dump(result))  -- { a = 10, b = 15, c = 20, d = -5 }
```

### `table.mul_values(table1, table2, empty_value?, overwrite?)`

Multiplies values with the same keys from two tables.

```lua
local table1 = { a = 2, b = 3 }
local table2 = { b = 4, c = 5 }

local result = table.mul_values(table1, table2)
print(dump(result))  -- { a = 2, b = 12, c = 5 }
```

### `table.div_values(table1, table2, empty_value?, overwrite?)`

Divides table1 values by table2 values for the same keys.

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

Limits value to the specified range.  
Alternative name: `math.clamp()`.

```lua
local health = 150
local max_health = 100
local clamped_health = math.limit(health, 0, max_health)
print(clamped_health)  -- 100
```

### `math.is_within(value, min, max)`

Checks that the value is strictly inside the range (`min < value < max`).

```lua
print(math.is_within(5, 1, 10))   -- true
print(math.is_within(1, 1, 10))   -- false (boundaries not included)
print(math.is_within(10, 1, 10))  -- false
```

### `math.is_among(value, min, max)`

Checks that the value is inside the range, including boundaries (`min <= value <= max`).

```lua
print(math.is_among(5, 1, 10))   -- true
print(math.is_among(1, 1, 10))   -- true
print(math.is_among(10, 1, 10))  -- true
```

### `math.is_in_range(value, min, max)`

Checks that the value is inside the half-open interval `(min, max]` (`min < value <= max`).

```lua
print(math.is_in_range(5, 1, 10))   -- true
print(math.is_in_range(1, 1, 10))   -- false (equals minimum)
print(math.is_in_range(10, 1, 10))  -- true (equals maximum)
```

### `math.is_near(value, near, gap?)`

Checks that the value is close to the specified one (`|value - near| <= gap`).

```lua
print(math.is_near(10, 12))        -- false (gap = 1 by default)
print(math.is_near(11, 12))        -- true
print(math.is_near(10, 12, 3))     -- true (gap = 3)
```

### `math.quadratic_equation_roots(a, b, c)`

Solves quadratic equation of the form `y = a*x^2 + b*x + c`.

```lua
local root1, root2 = math.quadratic_equation_roots(1, -5, 6)
print(root1, root2)  -- 3, 2

-- No real roots
local r1, r2 = math.quadratic_equation_roots(1, 0, 1)
print(r1, r2)  -- nil, nil
```

### `math.point_on_circle(radius, angle)`

Calculates a point on a circle.

```lua
local x, z = math.point_on_circle(5, math.pi/4)
print(x, z)  -- coordinates of a point on a circle with radius 5 at angle 45°
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
Returns the name of the current file or the calling function's file depending on the stack depth.
- `depth?` - call stack depth (default `0`)
- `full?` - show full path (default `false`)
```lua
-- Get relative file path
print(__FILE__())  -- 'mods/Voxrame/helpers/src/lua_ext/debug.lua'

-- Get full file path
print(__FILE__(0, true))  -- '/home/alek13/projects/my-game/mods/Voxrame/helpers/src/lua_ext/debug.lua'

-- Get file 2 levels up the call stack
print(__FILE__(2))  -- file of the function that called the calling function
```

### `__LINE__(depth?)`
Returns the current line number or the calling function's line number depending on the stack depth.
```lua
print(__LINE__())  -- 57

-- Get calling function's line number
print(__LINE__(1))  -- line number in the calling file
```

### `__FILE_LINE__(depth?, full?)`

Returns file and line in format "relative/path/to/file:line".

```lua
print(__FILE_LINE__())  -- 'mods/Voxrame/helpers/src/lua_ext/debug.lua:65'

-- With full path
print(__FILE_LINE__(0, true))  -- '/home/alek13/projects/my-game/mods/Voxrame/helpers/src/lua_ext/debug.lua:65'
```

### `__DIR__(depth?)`

Returns the directory of the current file or the calling function's file depending on the stack depth.

```lua
print(__DIR__())  -- 'mods/Voxrame/helpers/src/lua_ext/'
```

### `__FUNC__(depth?)`

Returns the name of the current function.

```lua
function my_function()
    print(__FUNC__())  -- 'my_function'
end
```

### `print_dump(depth, with_trace, ...)`

Outputs the contents of all passed parameters `...`.  
Before output, adds file name and line `@ <file>:<line>`.

If `with_trace` is `true`, additionally outputs stack trace.

> [!NOTE]
> If your [terminal supports links](https://github.com/Alhadis/OSC8-Adoption), each `@ <file>:<line>` will be linked to open IDE, see `readme.md` for setup.

> [!TIP]
> Use `pd()` and `pdt()` for more concise syntax. See examples below.


### `pd(...)`

Abbreviation for `print_dump`. Calls `print_dump` with `with_trace == false`.

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

Abbreviation for `print_dump traced`. Calls `print_dump` with `with_trace == true`.

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

Measures function execution time.

```lua
local function heavy_calculation()
    local sum = 0
    for i = 1, 2000000 do
        sum = sum + math.random(1, 100) + math.sin(i)
    end
end

-- Measure with result output
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


-- Measure without output
local time, avg, count = debug.measure('calculation', heavy_calculation)
print(time, avg, count)
local time, avg, count = debug.measure('calculation', heavy_calculation)
print(time, avg, count)
-- output:
-- 33.075  43.170833333333 6
-- 33.135  41.737142857143 7
```

### `debug.mesure_print(name)`

Outputs statistics of previous measurements `name` obtained by calls to [`debug.measure(name, ....)`](#debug-measure-name-callback-print-result).

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

Similar to [`error()` in Lua](https://www.lua.org/manual/5.1/manual.html#pdf-error), but `message` can be a template string with specified parameters, similar to [`string.format()`](https://www.lua.org/manual/5.1/manual.html#pdf-string.format).

```lua
local player_name = nil
errorf('Player `%s` not found', player_name)
-- Error: Player `nil` not found
```

<small style="color: var(--vp-c-text-2)">output (when `debug` is enabled):</small>

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

###### Error handling in Luanti {#error-handling-warning}
> [!WARNING]
> The stack trace will contain extra lines, because Luanti [doesn't pass the specified `level`](https://github.com/luanti-org/luanti/blob/3b67e73bc3402291bd3790dc2b8f3932be1b42b4/src/script/common/c_internal.cpp#L52) to `core.error_handler()`.

### `errorlf(message, level, ...)`

Like in [`errorf()`](#errorf-message) you can pass a format string and parameters, and also specify the trace level.

```lua
errorlf('Error in data', 3, 'value: %d', 42)
-- Error with trace 3 levels up
```
see [error handling in Luanti](#error-handling-warning)

### `assertf(condition, message, ...)`

Similar to [`assert()` in Lua](https://www.lua.org/manual/5.1/manual.html#pdf-assert), but as `message` you can specify a format string with parameters, similar to [`string.format()`](https://www.lua.org/manual/5.1/manual.html#5.4.1).  
> Calls `errorf()` if the condition `condition` is not met.

```lua
-- Continues execution if player exists, otherwise error
local player = nil
assertf(player, 'Player `%s` not found', player)
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

Checks if a file exists.

```lua
if io.file_exists('config.txt') then
    print('Configuration file found')
else
    print('Configuration file missing')
end
```

### `io.dirname(path)`

Returns the directory from the path.

```lua
print(io.dirname('/home/user/project/file.txt'))  -- '/home/user/project'
print(io.dirname('relative/path/file.txt'))       -- 'relative/path'
print(io.dirname('file.txt'))                     -- '.'
```

### `io.write_to_file(filepath, content, mode?)`

Writes content to a file.

```lua
local success, error_code, error_message = io.write_to_file('data.txt', 'Hello, World!')

if success then
    print('Data successfully written')
else
    print('Write error:', error_code, error_message)
end

-- Append to end of file
io.write_to_file('log.txt', 'New entry\n', 'a')
```

### `io.read_from_file(filepath, mode?)`

Reads all content from a file.  
Returns a string with file content on success or `false, error_code, error_message` on error.

```lua
local content = io.read_from_file('config.json')
if content then
    print('File content:', content)
else
    print('File read error')
end
```
Error handling
```lua
local success, error_code, error_message = io.read_from_file('nonexistent.txt')
if not success then
    print('Error:', error_code, error_message)
end
-- Error: 2       nonexistent.txt: No such file or directory
```
<small>or:</small>

```lua
local success = io.read_from_file('nonexistent.txt')
if not success then
    local error_code, error_message = io.get_file_error()
    print('Error:', error_code, error_message)
end
-- Error: 2       nonexistent.txt: No such file or directory
```
Reading in binary mode
```lua
local binary_content = io.read_from_file('image.png', 'rb')
if binary_content then
    print('File size:', #binary_content, 'bytes')
end
```

### `io.get_file_error()`

Returns the code and message of the last error from `io.read_from_file()` or `io.write_to_file()` functions.

```lua
local success = io.read_from_file('nonexistent.txt')
if not success then
    local error_code, error_message = io.get_file_error()
    print('Error:', error_code, error_message)
end
-- Output: Error: 2       nonexistent.txt: No such file or directory
```
```lua
local success = io.write_to_file('/readonly/file.txt', 'data')
if not success then
    local error_code, error_message = io.get_file_error()
    print('Write error:', error_code, error_message)
end
-- Output: Write error: 13       /readonly/file.txt: Permission denied
```



## OS

### `os.DIRECTORY_SEPARATOR`

Directory separator for the current OS.

```lua
local DS = os.DIRECTORY_SEPARATOR

print(DS)  -- '/' on Linux/Mac, '\' on Windows
print('folder' .. DS .. 'file.txt')
-- on Linux/Mac: 'folder/file.txt'
-- on Windows:   'folder\file.txt'
```