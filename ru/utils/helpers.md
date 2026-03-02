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

**Методы, поставляемве Luanti:**

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
