---
layout: doc
title: Helpery
---

# Helpery

Helpery to zestaw funkcji pomocniczych Lua do wygodnej pracy w projekcie.

Te funkcje pomocnicze znacząco rozszerzają standardowe możliwości Lua i upraszczają rozwój.

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

**Metody dostarczone przez Luanti:**

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

Konwertuje string na małe litery z obsługą cyrylicy.

```lua
print(('ПРИВЕТ МИР'):lower())  -- 'привет мир'
```

### `string:upper()`

Konwertuje string na wielkie litery z obsługą cyrylicy.

```lua
print(string.upper('привет мир'))  -- 'ПРИВЕТ МИР'
```

### `string:is_one_of(table)`

Sprawdza, czy string jest jedną z wartości w przekazanej tablicy.  
(Semantyczny odpowiednik [`table.contains`](#table-contains-table-value), który sprawdza, czy string jest zawarty w przekazanej tablicy.)

```lua
local text = 'hello'
local options = { 'hello', 'world', 'lua' }
print(text:is_one_of(options))  -- true
```

### `string:first_to_upper()`

Konwertuje pierwszą literę na wielką.

```lua
local text = 'hello world'
print(text:first_to_upper())  -- 'Hello world'
```

### `string` `:title()`/`:to_headline()`

Konwertuje pierwszą literę każdego słowa na title case.  
Nazwa alternatywna: `string:to_headline()`

```lua
local text = 'hello world from lua'
print(text:title())           -- 'Hello World From Lua'
print(text:to_headline())     -- 'Hello World From Lua'
```

### `string:starts_with(prefix)`

Sprawdza, czy string zaczyna się od określonego prefiksu.

```lua
local filename = 'config.json'
print(filename:starts_with('config'))    -- true
print(filename:starts_with('settings'))  -- false
```

### `string:ends_with(suffix)`

Sprawdza, czy string kończy się na określonym sufiksie.

```lua
local filename = 'config.json'
print(filename:ends_with('.json'))    -- true
print(filename:ends_with('.conf'))    -- false
```

### `string:contains(sub_string)`

Sprawdza obecność podstringu.

```lua
local text = 'Hello, World !!!'
print(text:contains('World'))   -- true
print(text:contains('world'))   -- false (wrażliwe na wielkość liter)
```

### `string:replace(pattern, replacement, n?)`

Zastępuje podstring (odpowiednik gsub, ale zwraca tylko string bez liczby zastąpień).  
Zobacz dokumentację dla [`string.gsub`](https://www.lua.org/manual/5.4/manual.html#pdf-string.gsub) i [Patterns](https://www.lua.org/manual/5.4/manual.html#6.4.1)
```lua
local text = 'Hello, World, World!'
local result = text:replace('World', 'Lua')
print(result)  -- 'Hello, Lua, Lua!'

-- Zastąp tylko pierwsze wystąpienie
local result2 = text:replace('World', 'Lua', 1)
print(result2)  -- 'Hello, Lua, World!'
```

### `string:remove(pattern, n?)`

Usuwa podstring.  
Zobacz dokumentację dla [`string.gsub`](https://www.lua.org/manual/5.4/manual.html#pdf-string.gsub) i [Patterns](https://www.lua.org/manual/5.4/manual.html#6.4.1)

```lua
local text = 'Hello, World!'
print(text:remove(', '))        -- 'HelloWorld!'
print(text:remove('o', 1))      -- 'Hell, Wrld!' (usuń tylko pierwsze 'o')
```

### `string:reg_escape()`

Zamienia znaki specjalne dla wyrażeń regularnych.  
Zobacz [Patterns](https://www.lua.org/manual/5.4/manual.html#6.4.1)

```lua
local pattern = 'file.txt'
print(pattern:reg_escape())      -- 'file%.txt'

local pattern2 = '^$()%.[]*+-?)'
print(pattern2:reg_escape())     -- '%^%$()%.%[%]%*%+\-%?)'
```

### `string:vxr_split(delimiter?, processor?)`

Dzieli string według określonego `delimiter` z możliwością przetwarzania części.

Luanti ma swoją własną metodę `string.split`, ale nie obsługuje przetwarzania części.  
Ta metoda dodaje możliwość przetwarzania części stringu.

```lua
-- Bez przetwarzania
('hello world'):vxr_split()             -- { 'hello', 'world' }
('apple,banana,cherry'):vxr_split(',')  -- { 'apple', 'banana', 'cherry' }

-- Z przetwarzaniem
local numbers = '1,2,3,4,5'
local squared = numbers:vxr_split(',', function(x)
    return tonumber(x)^2 
end)
print(squared[1], squared[2], squared[3], squared[4], squared[5])
-- 1 4 9 16 25
```


### `string.or_nil(value)`

Konwertuje na string lub zwraca nil.

```lua
print(string.or_nil('hello'))     -- 'hello'
print(string.or_nil(42))          -- '42'
print(string.or_nil(nil))         -- nil
print(tostring(nil))              -- 'nil' (porównanie)
```

---

#### Metody dostarczone przez Luanti :

### Luanti `string.split()`

Zobacz też: [`string.vxr_split(delimiter?, processor?)`](#string-vxr_split-delimiter-processor)

Dzieli string na części według określonego separatora. Zwraca tablicę stringów.
Argumenty:
- `separator?`      separator, domyślnie: `","`
- `include_empty?`  domyślnie: `false`
- `max_splits?`     jeśli ujemne, podziały nielimitowane, domyślnie: `-1`
- `sep_is_pattern?` czy separator jest zwykłym stringiem czy patternem (regex), domyślnie: `false`


```lua
local text = 'apple,banana,cherry'
local parts = text.split(',')
print(parts[1], parts[2], parts[3])  -- 'apple', 'banana', 'cherry'

-- Dziel według spacji
local words = 'hello world lua'.split(' ')
print(words[1], words[2], words[3])  -- 'hello', 'world', 'lua'
```

### Luanti `string.trim()`

Usuwa znaki białe na początku i końcu stringu.

```lua
print(("\n \t\tfoo bar\t "):trim())  -- 'foo bar'
```

### Luanti `string.pack()`

Pakuje wartości w string binarny zgodnie z formatem.  
Backport [z Lua 5.4](https://www.lua.org/manual/5.4/manual.html#pdf-string.pack).

```lua
-- Pakuj liczby całkowite
local packed = string.pack('i4', 42)
print(#packed)  -- 4 (rozmiar w bajtach)

-- Pakuj wiele wartości
local data = string.pack('i4f8', 100, 3.14)
print(#data)  -- 12 (4 + 8 bajtów)
```

### Luanti `string.unpack()`

Rozpakowuje string binarny na wartości zgodnie z formatem.  
Backport [z Lua 5.4](https://www.lua.org/manual/5.4/manual.html#pdf-string.unpack).

```lua
local packed = string.pack('i4f8', 100, 3.14)
local num, float, next_pos = string.unpack('i4f8', packed)
print(num, float)      -- 100, 3.14
print(next_pos)        -- 13 (pozycja po rozpakowaniu)

-- Rozpakuj od określonej pozycji
local value = string.unpack('i4', packed, 5)
print(value)            -- 3.14 (jako float)
```

### Luanti `string.packsize()`

Zwraca rozmiar stringu, który zostanie utworzony przez `string.pack`.  
Backport [z Lua 5.4](https://www.lua.org/manual/5.4/manual.html#pdf-string.packsize).

```lua
local size = string.packsize('i4f8')
print(size)  -- 12 (4 + 8 bajtów)

-- Dla złożonych formatów
local complex_size = string.packsize('i4c10f8')
print(complex_size)  -- 22 (4 + 10 + 8 bajtów)
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

**Metody, [dostarczone przez Luanti](https://api.luanti.org/helper-functions/) :**

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

Zwraca tablicę kluczy z tabeli.

```lua
local data = { name = 'Alek', age = 25, city = 'Vladivostok' }

local keys = table.keys(data)
-- `keys` zawiera `{ 'name', 'age', 'city' }` (kolejność może się różnić)
```

### `table.values(table)`

Zwraca tablicę wartości z tabeli.

```lua
local data = { name = 'Alek', age = 25, city = 'Vladivostok' }

local values = table.values(data)
-- `values` zawiera { 'Alek', 25, 'Vladivostok' }
```

### `table.has_key(table, key)`

Sprawdza, czy klucz istnieje w tabeli.

```lua
local data = { name = 'Alek', age = 25 }
print(table.has_key(data, 'name'))   -- true
print(table.has_key(data, 'city'))   -- false
```

### `table` `.contains`/`has_value(table, value)`

Sprawdza, czy wartość istnieje w tabeli.

```lua
local fruits = { 'apple', 'banana', 'cherry' }
print(table.contains(fruits, 'banana'))  -- true
print(table.contains(fruits, 'orange'))  -- false
```
Możesz też użyć [`string:is_one_of()`](#string-is_one_of-string):
```lua
print('banana':is_one_of(fruits))  -- true
print('orange':is_one_of(fruits))  -- false
```
Nazwa alternatywna: `table.has_value`
```lua
local data = { x = 10, y = 20 }
print(table.has_value(data, 10))     -- true
print(table.has_value(data, 30))     -- false
```

### `table.keys_of(table, value)`

Zwraca tabelę z kluczami z określonej tabeli, które mają określoną wartość.

```lua
local data = { a = 10, b = 20, c = 10, d = 30 }
local keys = table.keys_of(data, 10)
print(dump(keys))  -- { 'a', 'c' }

local keys2 = table.keys_of(data, 99)
print(keys2)  -- nil (żadnych takich kluczy)
```

### `table.has_any_key(table, find_keys)`

Sprawdza, czy klucze tabeli zawierają co najmniej jedną wartość z określonej tablicy.

```lua
local data = { name = 'test', age = 25, active = true }
local find_keys = { 'name', 'email', 'phone' }

print(table.has_any_key(data, find_keys))   -- true (klucz 'name' jest w find_keys)

local find_keys2 = { 'email', 'phone', 'address' }
print(table.has_any_key(data, find_keys2))  -- false
```

### `table.equals(table1, table2)`

Rekurencyjnie porównuje dwie tabele pod kątem pełnej równości.

```lua
local table1 = { a = 1, b = { c = 2, d = 3 } }
local table2 = { a = 1, b = { c = 2, d = 3 } }
local table3 = { a = 1, b = { c = 2, d = 4 } }

print(table.equals(table1, table2))  -- true
print(table.equals(table1, table3))  -- false
```

### `table.is_empty(table)`

Sprawdza, czy tabela jest pusta.

```lua
print(table.is_empty({}))           -- true
print(table.is_empty({ a = 1 }))    -- false
```

### `table.is_position(table)`

Sprawdza, czy tabela reprezentuje współrzędne.

```lua
print(table.is_position({ x = 10, y = 20, z = 30 }))  -- true
print(table.is_position({ x = 10, y = 20 }))          -- false
print(table.is_position({ a = 1, b = 2, c = 3 }))     -- false
```

### `table.each_value_is(table, value)`

Sprawdza, że wszystkie elementy tabeli są równe określonej wartości. Domyślnie sprawdza dla `true`.

```lua
local data1 = { true, true, true }
print(table.each_value_is(data1))  -- true

local data2 = { 5, 5, 5, 5 }
print(table.each_value_is(data2, 5))  -- true

local data3 = { 1, 2, 3 }
print(table.each_value_is(data3, 1))  -- false
```

### `table.count(table)`

Liczy liczbę elementów w tabeli.
> [!NOTE]
> Dla tabel z kluczami całkowitymi, użyj `#table`.  
> Ponieważ operator `#` nie działa na tabelach z kluczami nie-całkowitymi, użyj `table.count` dla nich.

```lua
local data = { a = 1, b = 2, c = 3 }
print(table.count(data))  -- 3
print(#data)              -- 0, ponieważ operator `#` nie działa z kluczami nie-całkowitymi.

local array = { 1, 2, 3, 4, 5 }
print(#array) -- 5
```

### `table.generate_sequence(max, start_from?, step?)`

Generuje sekwencję liczb.

```lua
local seq1 = table.generate_sequence(5)
print(dump(seq1))  -- { 1, 2, 3, 4, 5 }

local seq2 = table.generate_sequence(10, 2, 2)
print(dump(seq2))  -- { 2, 4, 6, 8, 10 }

local seq3 = table.generate_sequence(1, 5, -1)
print(dump(seq3))  -- { 5, 4, 3, 2, 1 }
```

### `table.only(table, only)`

Zwraca nową tabelę zawierającą dane ***tylko*** z określonymi kluczami.

```lua
local data = { name = 'Alek', age = 25, city = 'Vladivostok', country = 'Russia' }
local filtered = table.only(data, { 'name', 'age' })
-- `filtered` zawiera `{ name = 'Alek', age = 25 }`
print(filtered.name, filtered.age)    -- 'Alek', 25
print(filtered.city)                  -- nil
```

### `table.except(table, keys)`

Zwraca nową tabelę zawierającą dane ***bez*** określonych kluczy.  
(kopiuje tabelę, ***wykluczając*** określone klucze)

```lua
local data = { name = 'Alek', age = 25, city = 'Vladivostok', country = 'Russia' }
local filtered = table.except(data, { 'age', 'country' })
-- `filtered` zawiera `{ name = 'Alek', city = 'Vladivostok' }`
print(filtered.name, filtered.city)      -- 'Alek', 'Vladivostok'
print(filtered.age,  filtered.country)   -- nil, nil
```

### `table.merge(table1, table2, overwrite?)`

Rekurencyjnie scala tabele.

Domyślnie pierwsza tabela nie jest nadpisywana, tworzona jest nowa.
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
Nadpisz pierwszą tabelę:
```lua
table.merge(defaults, user_config, true)
```
> [!TIP]
> Lepiej użyć [`table.overwrite()`](#table-overwrite-table1-table2) dla lepszej czytelności.

### `table.join(table1, table2, recursively?)`

Dodaje brakujące klucze z `table2` do `table1`.  
Wartości, które są tabelami są kopiowane używając `table.copy()`.

```lua
local base     = { a = 1, b =  2        }
local addition = {        b = 10, c = 3 }

table.join(base, addition)
print(dump(base))  -- { a = 1, b = 2, c = 3 }
```
Jeśli `recursively` jest `true`, funkcja zostanie zastosowana rekurencyjnie tylko dla wartości
które są tabelami w obu `table1` i `table2`.
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

Całkowicie nadpisuje `table1` wartościami z `table2`.

Wariant semantyczny dla [`table.merge(table1, table2, true)`](#table-merge-table1-table2-overwrite).

### `table.merge_values(table1, table2)`

Scala wartości z dwóch tabel w jedną, usuwając duplikaty.  
Kolejność jest zachowana - najpierw wartości z `table1`, potem z `table2`, które nie były w `table1`.

```lua
local table1 = { 'apple', 'banana', 'cherry' }
local table2 = { 'banana', 'date', 'apple', 'elderberry' }

local merged = table.merge_values(table1, table2)
print(dump(merged))  -- { 'apple', 'banana', 'cherry', 'date', 'elderberry' }
```

### `table.map(table, callback, overwrite?)`

Stosuje funkcję do każdego elementu tabeli.  
`callback: fun(value: any, key: any): any` - akceptuje wartość i klucz, zwraca nową wartość.

Domyślnie zwraca nową tabelę.

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

Jeśli `overwrite` jest `true`, to funkcja modyfikuje oryginalną tabelę.
```lua
local data = { a = 10, b = 20 }
table.map(data, function(value, key) return value * 2 end, true)
print(dump(data))  -- { a = 20, b = 40 }
```

### `table` `.walk`/`.each(table, callback)`

Iteruje po tabeli stosując funkcję (nie modyfikuje tabeli).  
`callback: fun(value: any, key: any): void` - akceptuje wartość i klucz; nie zwraca nic.
```lua
local data = { a = 10, b = 20, c = 30 }
table.walk(data, function(value, key)
    print(key, value)
end)
-- a       10
-- c       30
-- b       20
```
Nazwa alternatywna: `table.each()`
```lua
local data = { a = 10, b = 20, c = 30 }
table.each(data, function(value, key)
    data[key] = value * 2
    -- Nic nie przeszkadza dostępowi do upvalue `data`. Teraz `data` zostało nadpisane.
end)
print(dump(data))  -- { a = 20, b = 40, c = 60 }
```

### `table.multiply_each_value(table, multiplier_table)`

Mnoży każdą wartość tabeli przez odpowiadającą wartość z multiplier_table według klucza.

```lua
local data = { a = 10, b = 20, c = 30 }
local multipliers = { a = 2, b = 0.5, c = 3 }

local result = table.multiply_each_value(data, multipliers)
print(dump(result))  -- { a = 20, b = 10, c = 90 }
-- Klucze bez mnożnika pozostają niezmienione
```

### `table.add_values(table1, table2, empty_value?, overwrite?)`

Dodaje wartości z tymi samymi kluczami z dwóch tabel.

```lua
local table1 = { a = 10, b = 20 }
local table2 = { b = 5, c = 15 }

local result = table.add_values(table1, table2)
print(dump(result))  -- { a = 10, b = 25, c = 15 }

-- Z pustą wartością dla brakujących kluczy
local result2 = table.add_values(table1, table2, 0)
print(dump(result2))  -- { a = 10, b = 25, c = 15 }
```

### `table.sub_values(table1, table2, empty_value?, overwrite?)`

Odejmuje wartości table2 od table1 dla tych samych kluczy.

```lua
local table1 = { a = 10, b = 20, c = 30 }
local table2 = { b = 5, c = 10, d = 5 }

local result = table.sub_values(table1, table2)
print(dump(result))  -- { a = 10, b = 15, c = 20, d = -5 }
```

### `table.mul_values(table1, table2, empty_value?, overwrite?)`

Mnoży wartości z tymi samymi kluczami z dwóch tabel.

```lua
local table1 = { a = 2, b = 3 }
local table2 = { b = 4, c = 5 }

local result = table.mul_values(table1, table2)
print(dump(result))  -- { a = 2, b = 12, c = 5 }
```

### `table.div_values(table1, table2, empty_value?, overwrite?)`

Dzieli wartości table1 przez wartości table2 dla tych samych kluczy.

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

Ogranicza wartość do określonego zakresu.  
Nazwa alternatywna: `math.clamp()`.

```lua
local health = 150
local max_health = 100
local clamped_health = math.limit(health, 0, max_health)
print(clamped_health)  -- 100
```

### `math.is_within(value, min, max)`

Sprawdza, że wartość jest ściśle w zakresie (`min < value < max`).

```lua
print(math.is_within(5, 1, 10))   -- true
print(math.is_within(1, 1, 10))   -- false (granice nie włączone)
print(math.is_within(10, 1, 10))  -- false
```

### `math.is_among(value, min, max)`

Sprawdza, że wartość jest w zakresie, włączając granice (`min <= value <= max`).

```lua
print(math.is_among(5, 1, 10))   -- true
print(math.is_among(1, 1, 10))   -- true
print(math.is_among(10, 1, 10))  -- true
```

### `math.is_in_range(value, min, max)`

Sprawdza, że wartość jest w zakresie półotwartym `(min, max]` (`min < value <= max`).

```lua
print(math.is_in_range(5, 1, 10))   -- true
print(math.is_in_range(1, 1, 10))   -- false (równy minimum)
print(math.is_in_range(10, 1, 10))  -- true (równy maksimum)
```

### `math.is_near(value, near, gap?)`

Sprawdza, że wartość jest blisko określonej (`|value - near| <= gap`).

```lua
print(math.is_near(10, 12))        -- false (gap = 1 domyślnie)
print(math.is_near(11, 12))        -- true
print(math.is_near(10, 12, 3))     -- true (gap = 3)
```

### `math.quadratic_equation_roots(a, b, c)`

Rozwiązuje równanie kwadratowe postaci `y = a*x^2 + b*x + c`.

```lua
local root1, root2 = math.quadratic_equation_roots(1, -5, 6)
print(root1, root2)  -- 3, 2

-- Brak rzeczywistych pierwiastków
local r1, r2 = math.quadratic_equation_roots(1, 0, 1)
print(r1, r2)  -- nil, nil
```

### `math.point_on_circle(radius, angle)`

Oblicza punkt na okręgu.

```lua
local x, z = math.point_on_circle(5, math.pi/4)
print(x, z)  -- współrzędne punktu na okręgu o promieniu 5 pod kątem 45°
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
Zwraca nazwę bieżącego pliku lub pliku funkcji wywołującej w zależności od głębokości stosu.
- `depth?` - głębokość stosu wywołań (domyślnie `0`)
- `full?` - pokaż pełną ścieżkę (domyślnie `false`)
```lua
-- Uzyskaj względną ścieżkę pliku
print(__FILE__())  -- 'mods/Voxrame/helpers/src/lua_ext/debug.lua'

-- Uzyskaj pełną ścieżkę pliku
print(__FILE__(0, true))  -- '/home/alek13/projects/my-game/mods/Voxrame/helpers/src/lua_ext/debug.lua'

-- Uzyskaj plik 2 poziomy wyżej w stosie wywołań
print(__FILE__(2))  -- plik funkcji, która wywołała funkcję wywołującą
```

### `__LINE__(depth?)`
Zwraca numer bieżącej linii lub linii funkcji wywołującej w zależności od głębokości stosu.
```lua
print(__LINE__())  -- 57

-- Uzyskaj numer linii funkcji wywołującej
print(__LINE__(1))  -- numer linii w pliku wywołania
```

### `__FILE_LINE__(depth?, full?)`

Zwraca plik i linię w formacie "względna/ścieżka/do/pliku:linia".

```lua
print(__FILE_LINE__())  -- 'mods/Voxrame/helpers/src/lua_ext/debug.lua:65'

-- Z pełną ścieżką
print(__FILE_LINE__(0, true))  -- '/home/alek13/projects/my-game/mods/Voxrame/helpers/src/lua_ext/debug.lua:65'
```

### `__DIR__(depth?)`

Zwraca katalog bieżącego pliku lub pliku funkcji wywołującej w zależności od głębokości stosu.

```lua
print(__DIR__())  -- 'mods/Voxrame/helpers/src/lua_ext/'
```

### `__FUNC__(depth?)`

Zwraca nazwę bieżącej funkcji.

```lua
function my_function()
    print(__FUNC__())  -- 'my_function'
end
```

### `print_dump(depth, with_trace, ...)`

Wyświetla zawartość wszystkich przekazanych parametrów `...`.  
Przed wyświetleniem, dodaje nazwę pliku i linię `@ <file>:<line>`.

Jeśli `with_trace` jest `true`, dodatkowo wyświetla stos wywołań.

> [!NOTE]
> Jeśli twój [terminal obsługuje linki](https://github.com/Alhadis/OSC8-Adoption), każdy `@ <file>:<line>` będzie połączony z otwarciem IDE, zobacz `readme.md` dla konfiguracji.

> [!TIP]
> Użyj `pd()` i `pdt()` dla bardziej zwięzłej składni. Zobacz przykłady poniżej.


### `pd(...)`

Skrót dla `print_dump`. Wywołuje `print_dump` z `with_trace == false`.

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

Skrót dla `print_dump traced`. Wywołuje `print_dump` z `with_trace == true`.

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

Mierzy czas wykonania funkcji.

```lua
local function heavy_calculation()
    local sum = 0
    for i = 1, 2000000 do
        sum = sum + math.random(1, 100) + math.sin(i)
    end
end

-- Mierz z wynikiem
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


-- Mierz bez wyniku
local time, avg, count = debug.measure('calculation', heavy_calculation)
print(time, avg, count)
local time, avg, count = debug.measure('calculation', heavy_calculation)
print(time, avg, count)
-- output:
-- 33.075  43.170833333333 6
-- 33.135  41.737142857143 7
```

### `debug.mesure_print(name)`

Wyświetla statystyki poprzednich pomiarów `name` uzyskanych przez wywołania do [`debug.measure(name, ....)`](#debug-measure-name-callback-print_result).

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

Podobne do [`error()` w Lua](https://www.lua.org/manual/5.1/manual.html#pdf-error), ale `message` może być szablonem string z określonymi parametrami, podobnie do [`string.format()`](https://www.lua.org/manual/5.1/manual.html#pdf-string.format).

```lua
local player_name = nil
errorf('Player `%s` not found', player_name)
-- Error: Player `nil` not found
```

<small style="color: var(--vp-c-text-2)">output (gdy `debug` jest włączony):</small>

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

###### Obsługa błędów w Luanti {#error-handling-warning}
> [!WARNING]
> Stos wywołań będzie zawierał dodatkowe linie, ponieważ Luanti [nie przekazuje określony `level`](https://github.com/luanti-org/luanti/blob/3b67e73bc3402291bd3790dc2b8f3932be1b42b4/src/script/common/c_internal.cpp#L52) do `core.error_handler()`.

### `errorlf(message, level, ...)`

Jak w [`errorf()`](#errorf-message) możesz przekazać string formatu i parametry, a także określić poziom śledzenia.

```lua
errorlf('Błąd w danych', 3, 'wartość: %d', 42)
-- Błąd ze śledzeniem 3 poziomów wyżej
```
zobacz [obsługę błędów w Luanti](#error-handling-warning)

### `assertf(condition, message, ...)`

Podobne do [`assert()` w Lua](https://www.lua.org/manual/5.1/manual.html#pdf-assert), ale jako `message` możesz określić string formatu z parametrami, podobnie do [`string.format()`](https://www.lua.org/manual/5.1/manual.html#5.4.1).  
> Wywołuje `errorf()` jeśli warunek `condition` nie jest spełniony.

```lua
-- Kontynuuj wykonanie jeśli player istnieje, w przeciwnym razie błąd
local player = nil
assertf(player, 'Gracz `%s` nie znaleziony', player)
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

Sprawdza, czy plik istnieje.

```lua
if io.file_exists('config.txt') then
    print('Plik konfiguracyjny znaleziony')
else
    print('Brak pliku konfiguracyjnego')
end
```

### `io.dirname(path)`

Zwraca katalog ze ścieżki.

```lua
print(io.dirname('/home/user/project/file.txt'))  -- '/home/user/project'
print(io.dirname('relative/path/file.txt'))       -- 'relative/path'
print(io.dirname('file.txt'))                     -- '.'
```

### `io.write_to_file(filepath, content, mode?)`

Zapisuje zawartość do pliku.

```lua
local success, error_code, error_message = io.write_to_file('data.txt', 'Hello, World!')

if success then
    print('Dane zapisane pomyślnie')
else
    print('Błąd zapisu:', error_code, error_message)
end

-- Dodaj na końcu pliku
io.write_to_file('log.txt', 'Nowy wpis\n', 'a')
```

### `io.read_from_file(filepath, mode?)`

Czyta całą zawartość z pliku.  
Zwraca string z zawartością pliku w przypadku sukcesu lub `false, error_code, error_message` w przypadku błędu.

```lua
local content = io.read_from_file('config.json')
if content then
    print('Zawartość pliku:', content)
else
    print('Błąd odczytu pliku')
end
```
Obsługa błędów
```lua
local success, error_code, error_message = io.read_from_file('nonexistent.txt')
if not success then
    print('Błąd:', error_code, error_message)
end
-- Błąd: 2       nonexistent.txt: No such file or directory
```
<small>lub:</small>

```lua
local success = io.read_from_file('nonexistent.txt')
if not success then
    local error_code, error_message = io.get_file_error()
    print('Błąd:', error_code, error_message)
end
-- Błąd: 2       nonexistent.txt: No such file or directory
```
Odczyt w trybie binarnym
```lua
local binary_content = io.read_from_file('image.png', 'rb')
if binary_content then
    print('Rozmiar pliku:', #binary_content, 'bajtów')
end
```

### `io.get_file_error()`

Zwraca kod i komunikat ostatniego błędu z funkcji `io.read_from_file()` lub `io.write_to_file()`.

```lua
local success = io.read_from_file('nonexistent.txt')
if not success then
    local error_code, error_message = io.get_file_error()
    print('Błąd:', error_code, error_message)
end
-- Output: Błąd: 2       nonexistent.txt: No such file or directory
```
```lua
local success = io.write_to_file('/readonly/file.txt', 'data')
if not success then
    local error_code, error_message = io.get_file_error()
    print('Błąd zapisu:', error_code, error_message)
end
-- Output: Błąd zapisu: 13       /readonly/file.txt: Permission denied
```



## OS

### `os.DIRECTORY_SEPARATOR`

Separator katalogu dla bieżącego systemu operacyjnego.

```lua
local DS = os.DIRECTORY_SEPARATOR

print(DS)  -- '/' na Linux/Mac, '\' na Windows
print('folder' .. DS .. 'file.txt')
-- na Linux/Mac: 'folder/file.txt'
-- na Windows:   'folder\file.txt'
```
