---
layout: doc
title: Helpers
---

# Helpers

Helpers - набор вспомогательных Lua-функций для комфортной работы в проекте.

Эти helper-функции значительно расширяют стандартные возможности Lua и упрощают разработку.

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

**Методы, поставляемые Luanti:**

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

Преобразование строки в нижний регистр с поддержкой кириллицы.

```lua
print(('ПРИВЕТ МИР'):lower())  -- 'привет мир'
```

### `string:upper()`

Преобразование строки в верхний регистр с поддержкой кириллицы.

```lua
print(string.upper('привет мир'))  -- 'ПРИВЕТ МИР'
```

### `string:is_one_of(table)`

Проверяет, является ли строка одним из значений в переданном массиве.  
(семантический аналог [`table.contains`](#table-contains-table-value), который проверяет содержится ли строка в переданном массиве.)

```lua
local text = 'hello'
local options = { 'hello', 'world', 'lua' }
print(text:is_one_of(options))  -- true
```

### `string:first_to_upper()`

Преобразует первую букву в верхний регистр.

```lua
local text = 'hello world'
print(text:first_to_upper())  -- 'Hello world'
```

### `string` `:title()`/`:to_headline()`

Преобразует первую букву каждого слова в заглавный регистр.  
Альтернативное название: `string:to_headline()`

```lua
local text = 'hello world from lua'
print(text:title())           -- 'Hello World From Lua'
print(text:to_headline())     -- 'Hello World From Lua'
```

### `string:starts_with(prefix)`

Проверяет, начинается ли строка с указанного префикса.

```lua
local filename = 'config.json'
print(filename:starts_with('config'))    -- true
print(filename:starts_with('settings'))  -- false
```

### `string:ends_with(suffix)`

Проверяет, заканчивается ли строка на указанный суффикс.

```lua
local filename = 'config.json'
print(filename:ends_with('.json'))    -- true
print(filename:ends_with('.conf'))    -- false
```

### `string:contains(sub_string)`

Проверяет наличие подстроки.

```lua
local text = 'Hello, World !!!'
print(text:contains('World'))   -- true
print(text:contains('world'))   -- false (учитывается регистр)
```

### `string:replace(pattern, replacement, n?)`

Замена подстроки (аналог gsub, но возвращает только строку без количества замен).  
См. документацию [`string.gsub`](https://www.lua.org/manual/5.4/manual.html#pdf-string.gsub) и [Patterns](https://www.lua.org/manual/5.4/manual.html#6.4.1)
```lua
local text = 'Hello, World, World!'
local result = text:replace('World', 'Lua')
print(result)  -- 'Hello, Lua, Lua!'

-- Замена только первого вхождения
local result2 = text:replace('World', 'Lua', 1)
print(result2)  -- 'Hello, Lua, World!'
```

### `string:remove(pattern, n?)`

Удаление подстроки.  
См. документацию [`string.gsub`](https://www.lua.org/manual/5.4/manual.html#pdf-string.gsub) и [Patterns](https://www.lua.org/manual/5.4/manual.html#6.4.1)

```lua
local text = 'Hello, World!'
print(text:remove(', '))        -- 'HelloWorld!'
print(text:remove('o', 1))      -- 'Hell, Wrld!' (удалить только первую 'o')
```

### `string:reg_escape()`

Экранирует спецсимволы для регулярных выражений.  
См. [Patterns](https://www.lua.org/manual/5.4/manual.html#6.4.1)

```lua
local pattern = 'file.txt'
print(pattern:reg_escape())      -- 'file%.txt'

local pattern2 = '^$()%.[]*+-?)'
print(pattern2:reg_escape())     -- '%^%$()%.%[%]%*%+%-%?)'
```

### `string:vxr_split(delimiter?, processor?)`

Разделение строки по указанному `delimiter` с возможностью обработки частей.

Luanti имеет свой метод `string.split`, но он не поддерживает обработку частей.  
Этот метод добавляет возможность обрабатывать части строки.

```lua
-- Без обработки
('hello world'):vxr_split()             -- { 'hello', 'world' }
('apple,banana,cherry'):vxr_split(',')  -- { 'apple', 'banana', 'cherry' }

-- С обработкой
local numbers = '1,2,3,4,5'
local squared = numbers:vxr_split(',', function(x)
    return tonumber(x)^2 
end)
print(squared[1], squared[2], squared[3], squared[4], squared[5])
-- 1 4 9 16 25
```


### `string.or_nil(value)`

Преобразует в строку или возвращает nil.

```lua
print(string.or_nil('hello'))     -- 'hello'
print(string.or_nil(42))          -- '42'
print(string.or_nil(nil))         -- nil
print(tostring(nil))              -- 'nil' (сравнение)
```

---

#### Методы, поставляемые Luanti:

### Luanti `string.split()`

Также см.: [`string.vxr_split(delimiter?, processor?)`](#string-vxr_split-delimiter-processor)

Разделяет строку на части по указанному разделителю. Возвращает массив строк.
Аргументы:
- `separator?`      разделитель, по умолчанию: `","`
- `include_empty?`  по умолчанию: `false`
- `max_splits?`     если отрицательное, разделений не ограничено, по умолчанию: `-1`
- `sep_is_pattern?` является ли разделитель обычной строкой или паттерном (regex), по умолчанию: `false`


```lua
local text = 'apple,banana,cherry'
local parts = text.split(',')
print(parts[1], parts[2], parts[3])  -- 'apple', 'banana', 'cherry'

-- Разделение по пробелам
local words = 'hello world lua'.split(' ')
print(words[1], words[2], words[3])  -- 'hello', 'world', 'lua'
```

### Luanti `string.trim()`

Удаляет пробельные символы в начале и конце строки.

```lua
print(("\n \t\tfoo bar\t "):trim())  -- 'foo bar'
```

### Luanti `string.pack()`

Упаковывает значения в бинарную строку согласно формату.  
Backport [из Lua 5.4](https://www.lua.org/manual/5.4/manual.html#pdf-string.pack).

```lua
-- Упаковка целых чисел
local packed = string.pack('i4', 42)
print(#packed)  -- 4 (размер в байтах)

-- Упаковка нескольких значений
local data = string.pack('i4f8', 100, 3.14)
print(#data)  -- 12 (4 + 8 байт)
```

### Luanti `string.unpack()`

Распаковывает бинарную строку в значения согласно формату.  
Backport [из Lua 5.4](https://www.lua.org/manual/5.4/manual.html#pdf-string.unpack).

```lua
local packed = string.pack('i4f8', 100, 3.14)
local num, float, next_pos = string.unpack('i4f8', packed)
print(num, float)      -- 100, 3.14
print(next_pos)        -- 13 (позиция после распаковки)

-- Распаковка с указанной позиции
local value = string.unpack('i4', packed, 5)
print(value)            -- 3.14 (как float)
```

### Luanti `string.packsize()`

Возвращает размер строки, которая будет создана `string.pack`.  
Backport [из Lua 5.4](https://www.lua.org/manual/5.4/manual.html#pdf-string.packsize).

```lua
local size = string.packsize('i4f8')
print(size)  -- 12 (4 + 8 байт)

-- Для сложных форматов
local complex_size = string.packsize('i4c10f8')
print(complex_size)  -- 22 (4 + 10 + 8 байт)
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

**Методы, [поставляемые Luanti](https://api.luanti.org/helper-functions/):**

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

Возвращает массив ключей таблицы.

```lua
local data = { name = 'Alek', age = 25, city = 'Владивосток' }

local keys = table.keys(data)
-- `keys` содержит `{ 'name', 'age', 'city' }` (порядок может отличаться)
```

### `table.values(table)`

Возвращает массив значений таблицы.

```lua
local data = { name = 'Alek', age = 25, city = 'Владивосток' }

local values = table.values(data)
-- `values` содержит { 'Alek', 25, 'Владивосток' }
```

### `table.has_key(table, key)`

Проверяет наличие ключа в таблице.

```lua
local data = { name = 'Alek', age = 25 }
print(table.has_key(data, 'name'))   -- true
print(table.has_key(data, 'city'))   -- false
```

### `table` `.contains`/`has_value(table, value)`

Проверяет наличие значения в таблице.

```lua
local fruits = { 'apple', 'banana', 'cherry' }
print(table.contains(fruits, 'banana'))  -- true
print(table.contains(fruits, 'orange'))  -- false
```
Также можно использовать [`string:is_one_of()`](#string-is_one_of-string):
```lua
print('banana':is_one_of(fruits))  -- true
print('orange':is_one_of(fruits))  -- false
```
Альтернативное называние: `table.has_value`
```lua
local data = { x = 10, y = 20 }
print(table.has_value(data, 10))     -- true
print(table.has_value(data, 30))     -- false
```

### `table.keys_of(table, value)`

Возвращает таблицу с ключами из указанной таблицы, которые имеют указанное значение.

```lua
local data = { a = 10, b = 20, c = 10, d = 30 }
local keys = table.keys_of(data, 10)
print(dump(keys))  -- { 'a', 'c' }

local keys2 = table.keys_of(data, 99)
print(keys2)  -- nil (нет таких ключей)
```

### `table.has_any_key(table, find_keys)`

Проверяет, есть ли в ключах таблицы хотя бы одно значение из указанного массива.

```lua
local data = { name = 'test', age = 25, active = true }
local find_keys = { 'name', 'email', 'phone' }

print(table.has_any_key(data, find_keys))   -- true (ключ 'name' есть в find_keys)

local find_keys2 = { 'email', 'phone', 'address' }
print(table.has_any_key(data, find_keys2))  -- false
```

### `table.equals(table1, table2)`

Рекурсивно сравнивает две таблицы на полное равенство.

```lua
local table1 = { a = 1, b = { c = 2, d = 3 } }
local table2 = { a = 1, b = { c = 2, d = 3 } }
local table3 = { a = 1, b = { c = 2, d = 4 } }

print(table.equals(table1, table2))  -- true
print(table.equals(table1, table3))  -- false
```

### `table.is_empty(table)`

Проверяет, пуста ли таблица.

```lua
print(table.is_empty({}))           -- true
print(table.is_empty({ a = 1 }))    -- false
```

### `table.is_position(table)`

Проверяет, является ли таблица координатами.

```lua
print(table.is_position({ x = 10, y = 20, z = 30 }))  -- true
print(table.is_position({ x = 10, y = 20 }))          -- false
print(table.is_position({ a = 1, b = 2, c = 3 }))     -- false
```

### `table.each_value_is(table, value)`

Проверяет, что все элементы таблицы равны указанному значению. По умолчанию проверяет на `true`.

```lua
local data1 = { true, true, true }
print(table.each_value_is(data1))  -- true

local data2 = { 5, 5, 5, 5 }
print(table.each_value_is(data2, 5))  -- true

local data3 = { 1, 2, 3 }
print(table.each_value_is(data3, 1))  -- false
```

### `table.count(table)`

Подсчитывает количество элементов в таблице.
> [!NOTE]
> Для таблиц с целочисленными ключами используйте `#table`.  
> Т.к. оператор `#` не работает на таблицах с не-целочисленными ключами, для них используйте `table.count`.

```lua
local data = { a = 1, b = 2, c = 3 }
print(table.count(data))  -- 3
print(#data)              -- 0, т.к. оператор `#` не работает с не-целочисленными ключами.

local array = { 1, 2, 3, 4, 5 }
print(#array) -- 5
```

### `table.generate_sequence(max, start_from?, step?)`

Генерирует последовательность чисел.

```lua
local seq1 = table.generate_sequence(5)
print(dump(seq1))  -- { 1, 2, 3, 4, 5 }

local seq2 = table.generate_sequence(10, 2, 2)
print(dump(seq2))  -- { 2, 4, 6, 8, 10 }

local seq3 = table.generate_sequence(1, 5, -1)
print(dump(seq3))  -- { 5, 4, 3, 2, 1 }
```

### `table.only(table, only)`

Возвращает новую таблицу, содержащую данные ***только*** с указанными ключами.

```lua
local data = { name = 'Alek', age = 25, city = 'Владивосток', country = 'Russia' }
local filtered = table.only(data, { 'name', 'age' })
-- `filtered` содержит `{ name = 'Alek', age = 25 }`
print(filtered.name, filtered.age)    -- 'Alek', 25
print(filtered.city)                  -- nil
```

### `table.except(table, keys)`

Возвращает новую таблицу, содержащую данные ***без*** указанных ключей.  
(копирует таблицу, ***исключая*** указанные ключи)

```lua
local data = { name = 'Alek', age = 25, city = 'Владивосток', country = 'Russia' }
local filtered = table.except(data, { 'age', 'country' })
-- `filtered` содержит `{ name = 'Alek', city = 'Владивосток' }`
print(filtered.name, filtered.city)      -- 'Alek', 'Владивосток'
print(filtered.age,  filtered.country)   -- nil, nil
```

### `table.merge(table1, table2, overwrite?)`

Рекурсивно объединяет таблицы.

По умолчанию первая таблица не перезаписывается, а создается новая.
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
Перезаписать первую таблицу:
```lua
table.merge(defaults, user_config, true)
```
> [!TIP]
> Лучше использовать [`table.overwrite()`](#table-overwrite-table1-table2) для лучшей читаемости.

### `table.join(table1, table2, recursively?)`

Добавляет отсутствующие ключи из `table2` в `table1`.  
Значения, которые являются таблицами, копируются с помощью `table.copy()`.

```lua
local base     = { a = 1, b =  2        }
local addition = {        b = 10, c = 3 }

table.join(base, addition)
print(dump(base))  -- { a = 1, b = 2, c = 3 }
```
Если `recursively` равен `true`, функция будет применяться рекурсивно только для тех значений,
которые являются таблицами в обоих `table1` и `table2`.
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

Полностью перезаписывает `table1` значениями из `table2`.

Семантичный вариант для [`table.merge(table1, table2, true)`](#table-merge-table1-table2-overwrite).

### `table.merge_values(table1, table2)`

Объединяет значения из двух таблиц в одну, удаляя дубликаты.  
Порядок сохраняется — сначала значения из `table1`, затем из `table2`, которых не было в `table1`.

```lua
local table1 = { 'apple', 'banana', 'cherry' }
local table2 = { 'banana', 'date', 'apple', 'elderberry' }

local merged = table.merge_values(table1, table2)
print(dump(merged))  -- { 'apple', 'banana', 'cherry', 'date', 'elderberry' }
```

### `table.map(table, callback, overwrite?)`

Применяет функцию к каждому элементу таблицы.  
`callback: fun(value: any, key: any): any` - принимает значение и ключ, возвращает новое значение.

По умолчанию возвращает новую таблицу.

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

Если `overwrite` равен `true`, то функция изменяет исходную таблицу.
```lua
local data = { a = 10, b = 20 }
table.map(data, function(value, key) return value * 2 end, true)
print(dump(data))  -- { a = 20, b = 40 }
```

### `table` `.walk`/`.each(table, callback)`

Итерируется по таблице с применением функции (не изменяет таблицу).  
`callback: fun(value: any, key: any): void` - принимает значение и ключ; не возвращает ничего.
```lua
local data = { a = 10, b = 20, c = 30 }
table.walk(data, function(value, key)
    print(key, value)
end)
-- a       10
-- c       30
-- b       20
```
Альтернативное называние: `table.each()`
```lua
local data = { a = 10, b = 20, c = 30 }
table.each(data, function(value, key)
    data[key] = value * 2
    -- Никто не отменял обращение к upvalue `data`. Теперь `data` перезаписан.
end)
print(dump(data))  -- { a = 20, b = 40, c = 60 }
```

### `table.multiply_each_value(table, multiplier_table)`

Умножает каждое значение таблицы на соответствующее значение из multiplier_table по ключу.

```lua
local data = { a = 10, b = 20, c = 30 }
local multipliers = { a = 2, b = 0.5, c = 3 }

local result = table.multiply_each_value(data, multipliers)
print(dump(result))  -- { a = 20, b = 10, c = 90 }
-- Ключи без множителя остаются без изменений
```

### `table.add_values(table1, table2, empty_value?, overwrite?)`

Складывает значения с одинаковыми ключами из двух таблиц.

```lua
local table1 = { a = 10, b = 20 }
local table2 = { b = 5, c = 15 }

local result = table.add_values(table1, table2)
print(dump(result))  -- { a = 10, b = 25, c = 15 }

-- С указанием пустого значения для отсутствующих ключей
local result2 = table.add_values(table1, table2, 0)
print(dump(result2))  -- { a = 10, b = 25, c = 15 }
```

### `table.sub_values(table1, table2, empty_value?, overwrite?)`

Вычитает значения table2 из table1 для одинаковых ключей.

```lua
local table1 = { a = 10, b = 20, c = 30 }
local table2 = { b = 5, c = 10, d = 5 }

local result = table.sub_values(table1, table2)
print(dump(result))  -- { a = 10, b = 15, c = 20, d = -5 }
```

### `table.mul_values(table1, table2, empty_value?, overwrite?)`

Перемножает значения с одинаковыми ключами из двух таблиц.

```lua
local table1 = { a = 2, b = 3 }
local table2 = { b = 4, c = 5 }

local result = table.mul_values(table1, table2)
print(dump(result))  -- { a = 2, b = 12, c = 5 }
```

### `table.div_values(table1, table2, empty_value?, overwrite?)`

Делит значения table1 на значения table2 для одинаковых ключей.

```lua
local table1 = { a = 10, b = 20, c = 30 }
local table2 = { b = 5, c = 10, d = 2 }

local result = table.div_values(table1, table2)
print(dump(result))  -- { a = 10, b = 4, c = 3, d = 0.5 }
```
