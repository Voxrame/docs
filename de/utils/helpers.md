---
layout: doc
title: Helfer
---

# Helfer

Helfer sind eine Reihe von Hilfsfunktionen in Lua für komfortables Arbeiten im Projekt.

Diese Helferfunktionen erweitern erheblich die Standard-Lua-Fähigkeiten und vereinfachen die Entwicklung.

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

**Von Luanti bereitgestellte Methoden:**

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

Konvertiert Zeichenkette in Kleinbuchstaben mit Kyrillisch-Unterstützung.

```lua
print(('ПРИВЕТ МИР'):lower())  -- 'привет мир'
```

### `string:upper()`

Konvertiert Zeichenkette in Großbuchstaben mit Kyrillisch-Unterstützung.

```lua
print(string.upper('привет мир'))  -- 'ПРИВЕТ МИР'
```

### `string:is_one_of(table)`

Prüft, ob die Zeichenkette einer der Werte im übergebenen Array ist.  
(Semantisches Analogon von [`table.contains`](#table-contains-table-value), das prüft, ob die Zeichenkette im übergebenen Array enthalten ist.)

```lua
local text = 'hello'
local options = { 'hello', 'world', 'lua' }
print(text:is_one_of(options))  -- true
```

### `string:first_to_upper()`

Konvertiert den ersten Buchstaben in Großbuchstaben.

```lua
local text = 'hello world'
print(text:first_to_upper())  -- 'Hello world'
```

### `string` `:title()`/`:to_headline()`

Konvertiert den ersten Buchstaben jedes Wortes in Title Case.  
Alternativer Name: `string:to_headline()`

```lua
local text = 'hello world from lua'
print(text:title())           -- 'Hello World From Lua'
print(text:to_headline())     -- 'Hello World From Lua'
```

### `string:starts_with(prefix)`

Prüft, ob die Zeichenkette mit dem angegebenen Präfix beginnt.

```lua
local filename = 'config.json'
print(filename:starts_with('config'))    -- true
print(filename:starts_with('settings'))  -- false
```

### `string:ends_with(suffix)`

Prüft, ob die Zeichenkette mit dem angegebenen Suffix endet.

```lua
local filename = 'config.json'
print(filename:ends_with('.json'))    -- true
print(filename:ends_with('.conf'))    -- false
```

### `string:contains(sub_string)`

Prüft auf Vorhandensein einer Teilzeichenkette.

```lua
local text = 'Hello, World !!!'
print(text:contains('World'))   -- true
print(text:contains('world'))   -- false (Groß-/Kleinschreibung beachtet)
```

### `string:replace(pattern, replacement, n?)`

Ersetzt Teilzeichenkette (Analogon von gsub, gibt aber nur die Zeichenkette ohne Anzahl der Ersetzungen zurück).  
Siehe Dokumentation für [`string.gsub`](https://www.lua.org/manual/5.4/manual.html#pdf-string.gsub) und [Patterns](https://www.lua.org/manual/5.4/manual.html#6.4.1)
```lua
local text = 'Hello, World, World!'
local result = text:replace('World', 'Lua')
print(result)  -- 'Hello, Lua, Lua!'

-- Nur erstes Vorkommen ersetzen
local result2 = text:replace('World', 'Lua', 1)
print(result2)  -- 'Hello, Lua, World!'
```

### `string:remove(pattern, n?)`

Entfernt Teilzeichenkette.  
Siehe Dokumentation für [`string.gsub`](https://www.lua.org/manual/5.4/manual.html#pdf-string.gsub) und [Patterns](https://www.lua.org/manual/5.4/manual.html#6.4.1)

```lua
local text = 'Hello, World!'
print(text:remove(', '))        -- 'HelloWorld!'
print(text:remove('o', 1))      -- 'Hell, Wrld!' (nur das erste 'o' entfernen)
```

### `string:reg_escape()`

Maskiert Sonderzeichen für reguläre Ausdrücke.  
Siehe [Patterns](https://www.lua.org/manual/5.4/manual.html#6.4.1)

```lua
local pattern = 'file.txt'
print(pattern:reg_escape())      -- 'file%.txt'

local pattern2 = '^$()%.[]*+-?)'
print(pattern2:reg_escape())     -- '%^%$()%.%[%]%*%+\-%?)'
```

### `string:vxr_split(delimiter?, processor?)`

Teilt Zeichenkette nach angegebenem `delimiter` mit Möglichkeit zur Verarbeitung der Teile.

Luanti hat seine eigene `string.split` Methode, aber sie unterstützt keine Verarbeitung von Teilen.  
Diese Methode fügt die Möglichkeit hinzu, Zeichenkettenteile zu verarbeiten.

```lua
-- Ohne Verarbeitung
('hello world'):vxr_split()             -- { 'hello', 'world' }
('apple,banana,cherry'):vxr_split(',')  -- { 'apple', 'banana', 'cherry' }

-- Mit Verarbeitung
local numbers = '1,2,3,4,5'
local squared = numbers:vxr_split(',', function(x)
    return tonumber(x)^2 
end)
print(squared[1], squared[2], squared[3], squared[4], squared[5])
-- 1 4 9 16 25
```


### `string.or_nil(value)`

Konvertiert zu Zeichenkette oder gibt nil zurück.

```lua
print(string.or_nil('hello'))     -- 'hello'
print(string.or_nil(42))          -- '42'
print(string.or_nil(nil))         -- nil
print(tostring(nil))              -- 'nil' (Vergleich)
```

---

#### Von Luanti bereitgestellte Methoden:

### Luanti `string.split()`

Siehe auch: [`string.vxr_split(delimiter?, processor?)`](#string-vxr_split-delimiter-processor)

Teilt Zeichenkette in Teile nach angegebenem Trennzeichen. Gibt Array von Zeichenketten zurück.
Argumente:
- `separator?`      Trennzeichen, Standard: `","`
- `include_empty?`  Standard: `false`
- `max_splits?`     wenn negativ, Teilungen unbegrenzt, Standard: `-1`
- `sep_is_pattern?` ob Trennzeichen normale Zeichenkette oder Pattern (regex) ist, Standard: `false`


```lua
local text = 'apple,banana,cherry'
local parts = text.split(',')
print(parts[1], parts[2], parts[3])  -- 'apple', 'banana', 'cherry'

-- Nach Leerzeichen teilen
local words = 'hello world lua'.split(' ')
print(words[1], words[2], words[3])  -- 'hello', 'world', 'lua'
```

### Luanti `string.trim()`

Entfernt Leerzeichen am Anfang und Ende der Zeichenkette.

```lua
print(("\n \t\tfoo bar\t "):trim())  -- 'foo bar'
```

### Luanti `string.pack()`

Packt Werte in eine binäre Zeichenkette entsprechend dem Format.  
Backport [von Lua 5.4](https://www.lua.org/manual/5.4/manual.html#pdf-string.pack).

```lua
-- Ganzzahlen packen
local packed = string.pack('i4', 42)
print(#packed)  -- 4 (Größe in Bytes)

-- Mehrere Werte packen
local data = string.pack('i4f8', 100, 3.14)
print(#data)  -- 12 (4 + 8 Bytes)
```

### Luanti `string.unpack()`

Entpackt binäre Zeichenkette in Werte entsprechend dem Format.  
Backport [von Lua 5.4](https://www.lua.org/manual/5.4/manual.html#pdf-string.unpack).

```lua
local packed = string.pack('i4f8', 100, 3.14)
local num, float, next_pos = string.unpack('i4f8', packed)
print(num, float)      -- 100, 3.14
print(next_pos)        -- 13 (Position nach dem Entpacken)

-- Von angegebener Position entpacken
local value = string.unpack('i4', packed, 5)
print(value)            -- 3.14 (als float)
```

### Luanti `string.packsize()`

Gibt die Größe der Zeichenkette zurück, die von `string.pack` erstellt wird.  
Backport [von Lua 5.4](https://www.lua.org/manual/5.4/manual.html#pdf-string.packsize).

```lua
local size = string.packsize('i4f8')
print(size)  -- 12 (4 + 8 Bytes)

-- Für komplexe Formate
local complex_size = string.packsize('i4c10f8')
print(complex_size)  -- 22 (4 + 10 + 8 Bytes)
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

**Methoden, [von Luanti bereitgestellt](https://api.luanti.org/helper-functions/):**

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

Gibt ein Array von Tabellenschlüsseln zurück.

```lua
local data = { name = 'Alek', age = 25, city = 'Vladivostok' }

local keys = table.keys(data)
-- `keys` enthält `{ 'name', 'age', 'city' }` (Reihenfolge kann variieren)
```

### `table.values(table)`

Gibt ein Array von Tabellenwerten zurück.

```lua
local data = { name = 'Alek', age = 25, city = 'Vladivostok' }

local values = table.values(data)
-- `values` enthält { 'Alek', 25, 'Vladivostok' }
```

### `table.has_key(table, key)`

Prüft, ob ein Schlüssel in der Tabelle existiert.

```lua
local data = { name = 'Alek', age = 25 }
print(table.has_key(data, 'name'))   -- true
print(table.has_key(data, 'city'))   -- false
```

### `table` `.contains`/`has_value(table, value)`

Prüft, ob ein Wert in der Tabelle existiert.

```lua
local fruits = { 'apple', 'banana', 'cherry' }
print(table.contains(fruits, 'banana'))  -- true
print(table.contains(fruits, 'orange'))  -- false
```
Sie können auch [`string:is_one_of()`](#string-is_one_of-string) verwenden:
```lua
print('banana':is_one_of(fruits))  -- true
print('orange':is_one_of(fruits))  -- false
```
Alternativer Name: `table.has_value`
```lua
local data = { x = 10, y = 20 }
print(table.has_value(data, 10))     -- true
print(table.has_value(data, 30))     -- false
```

### `table.keys_of(table, value)`

Gibt eine Tabelle mit Schlüsseln aus der angegebenen Tabelle zurück, die den angegebenen Wert haben.

```lua
local data = { a = 10, b = 20, c = 10, d = 30 }
local keys = table.keys_of(data, 10)
print(dump(keys))  -- { 'a', 'c' }

local keys2 = table.keys_of(data, 99)
print(keys2)  -- nil (keine solchen Schlüssel)
```

### `table.has_any_key(table, find_keys)`

Prüft, ob die Tabellenschlüssel mindestens einen Wert aus dem angegebenen Array enthalten.

```lua
local data = { name = 'test', age = 25, active = true }
local find_keys = { 'name', 'email', 'phone' }

print(table.has_any_key(data, find_keys))   -- true (Schlüssel 'name' ist in find_keys)

local find_keys2 = { 'email', 'phone', 'address' }
print(table.has_any_key(data, find_keys2))  -- false
```

### `table.equals(table1, table2)`

Vergleicht zwei Tabellen rekursiv auf vollständige Gleichheit.

```lua
local table1 = { a = 1, b = { c = 2, d = 3 } }
local table2 = { a = 1, b = { c = 2, d = 3 } }
local table3 = { a = 1, b = { c = 2, d = 4 } }

print(table.equals(table1, table2))  -- true
print(table.equals(table1, table3))  -- false
```

### `table.is_empty(table)`

Prüft, ob die Tabelle leer ist.

```lua
print(table.is_empty({}))           -- true
print(table.is_empty({ a = 1 }))    -- false
```

### `table.is_position(table)`

Prüft, ob die Tabelle Koordinaten darstellt.

```lua
print(table.is_position({ x = 10, y = 20, z = 30 }))  -- true
print(table.is_position({ x = 10, y = 20 }))          -- false
print(table.is_position({ a = 1, b = 2, c = 3 }))     -- false
```

### `table.each_value_is(table, value)`

Prüft, dass alle Elemente der Tabelle dem angegebenen Wert entsprechen. Standardmäßig prüft auf `true`.

```lua
local data1 = { true, true, true }
print(table.each_value_is(data1))  -- true

local data2 = { 5, 5, 5, 5 }
print(table.each_value_is(data2, 5))  -- true

local data3 = { 1, 2, 3 }
print(table.each_value_is(data3, 1))  -- false
```

### `table.count(table)`

Zählt die Anzahl der Elemente in der Tabelle.
> [!NOTE]
> Für Tabellen mit Ganzzahlschlüsseln verwenden Sie `#table`.  
> Da der `#` Operator nicht auf Tabellen mit nicht-Ganzzahlschlüsseln funktioniert, verwenden Sie `table.count` für sie.

```lua
local data = { a = 1, b = 2, c = 3 }
print(table.count(data))  -- 3
print(#data)              -- 0, weil der `#` Operator nicht mit nicht-Ganzzahlschlüsseln funktioniert.

local array = { 1, 2, 3, 4, 5 }
print(#array) -- 5
```

### `table.generate_sequence(max, start_from?, step?)`

Generiert eine Zahlenfolge.

```lua
local seq1 = table.generate_sequence(5)
print(dump(seq1))  -- { 1, 2, 3, 4, 5 }

local seq2 = table.generate_sequence(10, 2, 2)
print(dump(seq2))  -- { 2, 4, 6, 8, 10 }

local seq3 = table.generate_sequence(1, 5, -1)
print(dump(seq3))  -- { 5, 4, 3, 2, 1 }
```

### `table.only(table, only)`

Gibt eine neue Tabelle zurück, die Daten ***nur*** mit den angegebenen Schlüsseln enthält.

```lua
local data = { name = 'Alek', age = 25, city = 'Vladivostok', country = 'Russia' }
local filtered = table.only(data, { 'name', 'age' })
-- `filtered` enthält `{ name = 'Alek', age = 25 }`
print(filtered.name, filtered.age)    -- 'Alek', 25
print(filtered.city)                  -- nil
```

### `table.except(table, keys)`

Gibt eine neue Tabelle zurück, die Daten ***ohne*** die angegebenen Schlüssel enthält.  
(kopiert die Tabelle, ***ausschließend*** die angegebenen Schlüssel)

```lua
local data = { name = 'Alek', age = 25, city = 'Vladivostok', country = 'Russia' }
local filtered = table.except(data, { 'age', 'country' })
-- `filtered` enthält `{ name = 'Alek', city = 'Vladivostok' }`
print(filtered.name, filtered.city)      -- 'Alek', 'Vladivostok'
print(filtered.age,  filtered.country)   -- nil, nil
```

### `table.merge(table1, table2, overwrite?)`

Führt Tabellen rekursiv zusammen.

Standardmäßig wird die erste Tabelle nicht überschrieben, eine neue wird erstellt.
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
Erste Tabelle überschreiben:
```lua
table.merge(defaults, user_config, true)
```
> [!TIP]
> Es ist besser, [`table.overwrite()`](#table-overwrite-table1-table2) für bessere Lesbarkeit zu verwenden.

### `table.join(table1, table2, recursively?)`

Fügt fehlende Schlüssel aus `table2` zu `table1` hinzu.  
Werte, die Tabellen sind, werden mit `table.copy()` kopiert.

```lua
local base     = { a = 1, b =  2        }
local addition = {        b = 10, c = 3 }

table.join(base, addition)
print(dump(base))  -- { a = 1, b = 2, c = 3 }
```
Wenn `recursively` `true` ist, wird die Funktion nur für Werte
rekursiv angewendet, die in beiden `table1` und `table2` Tabellen sind.
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

Überschreibt `table1` vollständig mit Werten aus `table2`.

Semantische Variante für [`table.merge(table1, table2, true)`](#table-merge-table1-table2-overwrite).

### `table.merge_values(table1, table2)`

Führt Werte aus zwei Tabellen in einer zusammen, entfernt Duplikate.  
Reihenfolge wird beibehalten - zuerst Werte aus `table1`, dann aus `table2`, die nicht in `table1` waren.

```lua
local table1 = { 'apple', 'banana', 'cherry' }
local table2 = { 'banana', 'date', 'apple', 'elderberry' }

local merged = table.merge_values(table1, table2)
print(dump(merged))  -- { 'apple', 'banana', 'cherry', 'date', 'elderberry' }
```

### `table.map(table, callback, overwrite?)`

Wendet Funktion auf jedes Element der Tabelle an.  
`callback: fun(value: any, key: any): any` - akzeptiert Wert und Schlüssel, gibt neuen Wert zurück.

Standardmäßig wird eine neue Tabelle zurückgegeben.

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

Wenn `overwrite` `true` ist, modifiziert die Funktion die ursprüngliche Tabelle.
```lua
local data = { a = 10, b = 20 }
table.map(data, function(value, key) return value * 2 end, true)
print(dump(data))  -- { a = 20, b = 40 }
```

### `table` `.walk`/`.each(table, callback)`

Iteriert über die Tabelle und wendet Funktion an (modifiziert die Tabelle nicht).  
`callback: fun(value: any, key: any): void` - akzeptiert Wert und Schlüssel; gibt nichts zurück.
```lua
local data = { a = 10, b = 20, c = 30 }
table.walk(data, function(value, key)
    print(key, value)
end)
-- a       10
-- c       30
-- b       20
```
Alternativer Name: `table.each()`
```lua
local data = { a = 10, b = 20, c = 30 }
table.each(data, function(value, key)
    data[key] = value * 2
    -- Nichts hindert am Zugriff auf upvalue `data`. Jetzt ist `data` überschrieben.
end)
print(dump(data))  -- { a = 20, b = 40, c = 60 }
```

### `table.multiply_each_value(table, multiplier_table)`

Multipliziert jeden Wert der Tabelle mit dem entsprechenden Wert aus multiplier_table nach Schlüssel.

```lua
local data = { a = 10, b = 20, c = 30 }
local multipliers = { a = 2, b = 0.5, c = 3 }

local result = table.multiply_each_value(data, multipliers)
print(dump(result))  -- { a = 20, b = 10, c = 90 }
-- Schlüssel ohne Multiplikator bleiben unverändert
```

### `table.add_values(table1, table2, empty_value?, overwrite?)`

Addiert Werte mit gleichen Schlüsseln aus zwei Tabellen.

```lua
local table1 = { a = 10, b = 20 }
local table2 = { b = 5, c = 15 }

local result = table.add_values(table1, table2)
print(dump(result))  -- { a = 10, b = 25, c = 15 }

-- Mit leeren Wert für fehlende Schlüssel
local result2 = table.add_values(table1, table2, 0)
print(dump(result2))  -- { a = 10, b = 25, c = 15 }
```

### `table.sub_values(table1, table2, empty_value?, overwrite?)`

Subtrahiert table2 Werte von table1 für gleiche Schlüssel.

```lua
local table1 = { a = 10, b = 20, c = 30 }
local table2 = { b = 5, c = 10, d = 5 }

local result = table.sub_values(table1, table2)
print(dump(result))  -- { a = 10, b = 15, c = 20, d = -5 }
```

### `table.mul_values(table1, table2, empty_value?, overwrite?)`

Multipliziert Werte mit gleichen Schlüsseln aus zwei Tabellen.

```lua
local table1 = { a = 2, b = 3 }
local table2 = { b = 4, c = 5 }

local result = table.mul_values(table1, table2)
print(dump(result))  -- { a = 2, b = 12, c = 5 }
```

### `table.div_values(table1, table2, empty_value?, overwrite?)`

Dividiert table1 Werte durch table2 Werte für gleiche Schlüssel.

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

Begrenzt Wert auf den angegebenen Bereich.  
Alternativer Name: `math.clamp()`.

```lua
local health = 150
local max_health = 100
local clamped_health = math.limit(health, 0, max_health)
print(clamped_health)  -- 100
```

### `math.is_within(value, min, max)`

Prüft, dass der Wert streng innerhalb des Bereichs liegt (`min < value < max`).

```lua
print(math.is_within(5, 1, 10))   -- true
print(math.is_within(1, 1, 10))   -- false (Grenzen nicht eingeschlossen)
print(math.is_within(10, 1, 10))  -- false
```

### `math.is_among(value, min, max)`

Prüft, dass der Wert innerhalb des Bereichs liegt, einschließlich Grenzen (`min <= value <= max`).

```lua
print(math.is_among(5, 1, 10))   -- true
print(math.is_among(1, 1, 10))   -- true
print(math.is_among(10, 1, 10))  -- true
```

### `math.is_in_range(value, min, max)`

Prüft, dass der Wert innerhalb des halboffenen Intervalls liegt `(min, max]` (`min < value <= max`).

```lua
print(math.is_in_range(5, 1, 10))   -- true
print(math.is_in_range(1, 1, 10))   -- false (gleich Minimum)
print(math.is_in_range(10, 1, 10))  -- true (gleich Maximum)
```

### `math.is_near(value, near, gap?)`

Prüft, dass der Wert nahe am angegebenen liegt (`|value - near| <= gap`).

```lua
print(math.is_near(10, 12))        -- false (gap = 1 standardmäßig)
print(math.is_near(11, 12))        -- true
print(math.is_near(10, 12, 3))     -- true (gap = 3)
```

### `math.quadratic_equation_roots(a, b, c)`

Löst quadratische Gleichung der Form `y = a*x^2 + b*x + c`.

```lua
local root1, root2 = math.quadratic_equation_roots(1, -5, 6)
print(root1, root2)  -- 3, 2

-- Keine reellen Wurzeln
local r1, r2 = math.quadratic_equation_roots(1, 0, 1)
print(r1, r2)  -- nil, nil
```

### `math.point_on_circle(radius, angle)`

Berechnet einen Punkt auf einem Kreis.

```lua
local x, z = math.point_on_circle(5, math.pi/4)
print(x, z)  -- Koordinaten eines Punktes auf einem Kreis mit Radius 5 bei Winkel 45°
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
Gibt den Namen der aktuellen Datei oder der Datei der aufrufenden Funktion je nach Stack-Tiefe zurück.
- `depth?` - Aufruf-Stack-Tiefe (Standard `0`)
- `full?` - vollständigen Pfad anzeigen (Standard `false`)
```lua
-- Relativen Dateipfad erhalten
print(__FILE__())  -- 'mods/Voxrame/helpers/src/lua_ext/debug.lua'

-- Vollständigen Dateipfad erhalten
print(__FILE__(0, true))  -- '/home/alek13/projects/my-game/mods/Voxrame/helpers/src/lua_ext/debug.lua'

-- Datei 2 Ebenen im Stack nach oben erhalten
print(__FILE__(2))  -- Datei der Funktion, die die aufrufende Funktion aufgerufen hat
```

### `__LINE__(depth?)`
Gibt die aktuelle Zeilennummer oder die Zeilennummer der aufrufenden Funktion je nach Stack-Tiefe zurück.
```lua
print(__LINE__())  -- 57

-- Zeilennummer der aufrufenden Funktion erhalten
print(__LINE__(1))  -- Zeilennummer in der aufrufenden Datei
```

### `__FILE_LINE__(depth?, full?)`

Gibt Datei und Zeile im Format "relativer/pfad/zur/datei:zeile" zurück.

```lua
print(__FILE_LINE__())  -- 'mods/Voxrame/helpers/src/lua_ext/debug.lua:65'

-- Mit vollem Pfad
print(__FILE_LINE__(0, true))  -- '/home/alek13/projects/my-game/mods/Voxrame/helpers/src/lua_ext/debug.lua:65'
```

### `__DIR__(depth?)`

Gibt das Verzeichnis der aktuellen Datei oder der Datei der aufrufenden Funktion je nach Stack-Tiefe zurück.

```lua
print(__DIR__())  -- 'mods/Voxrame/helpers/src/lua_ext/'
```

### `__FUNC__(depth?)`

Gibt den Namen der aktuellen Funktion zurück.

```lua
function my_function()
    print(__FUNC__())  -- 'my_function'
end
```

### `print_dump(depth, with_trace, ...)`

Gibt den Inhalt aller übergebenen Parameter `...` aus.  
Fügt vor der Ausgabe Dateiname und Zeile `@ <file>:<line>` hinzu.

Wenn `with_trace` `true` ist, wird zusätzlich Stack-Trace ausgegeben.

> [!NOTE]
> Wenn Ihr [Terminal Links unterstützt](https://github.com/Alhadis/OSC8-Adoption), wird jedes `@ <file>:<line>` mit dem Öffnen der IDE verknüpft, siehe `readme.md` für Einrichtung.

> [!TIP]
> Verwenden Sie `pd()` und `pdt()` für prägnantere Syntax. Siehe Beispiele unten.


### `pd(...)`

Abkürzung für `print_dump`. Ruft `print_dump` mit `with_trace == false` auf.

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

Abkürzung für `print_dump traced`. Ruft `print_dump` mit `with_trace == true` auf.

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

Misst Funktionsausführungszeit.

```lua
local function heavy_calculation()
    local sum = 0
    for i = 1, 2000000 do
        sum = sum + math.random(1, 100) + math.sin(i)
    end
end

-- Mit Ergebnisausgabe messen
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


-- Ohne Ausgabe messen
local time, avg, count = debug.measure('calculation', heavy_calculation)
print(time, avg, count)
local time, avg, count = debug.measure('calculation', heavy_calculation)
print(time, avg, count)
-- output:
-- 33.075  43.170833333333 6
-- 33.135  41.737142857143 7
```

### `debug.mesure_print(name)`

Gibt Statistiken vorheriger Messungen `name` aus, erhalten durch Aufrufe von [`debug.measure(name, ....)`](#debug-measure-name-callback-print_result).

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

Ähnlich wie [`error()` in Lua](https://www.lua.org/manual/5.1/manual.html#pdf-error), aber `message` kann eine Vorlagenzeichenkette mit angegebenen Parametern sein, ähnlich wie [`string.format()`](https://www.lua.org/manual/5.1/manual.html#pdf-string.format).

```lua
local player_name = nil
errorf('Player `%s` not found', player_name)
-- Error: Player `nil` not found
```

<small style="color: var(--vp-c-text-2)">output (wenn `debug` aktiviert ist):</small>

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

###### Fehlerbehandlung in Luanti {#error-handling-warning}
> [!WARNING]
> Der Stack-Trace wird zusätzliche Zeilen enthalten, weil Luanti [den angegebenen `level` nicht weitergibt](https://github.com/luanti-org/luanti/blob/3b67e73bc3402291bd3790dc2b8f3932be1b42b4/src/script/common/c_internal.cpp#L52) an `core.error_handler()`.

### `errorlf(message, level, ...)`

Wie bei [`errorf()`](#errorf-message) können Sie eine Formatzeichenkette und Parameter übergeben und auch das Trace-Level angeben.

```lua
errorlf('Fehler in Daten', 3, 'Wert: %d', 42)
-- Fehler mit Trace 3 Ebenen nach oben
```
siehe [Fehlerbehandlung in Luanti](#error-handling-warning)

### `assertf(condition, message, ...)`

Ähnlich wie [`assert()` in Lua](https://www.lua.org/manual/5.1/manual.html#pdf-assert), aber als `message` können Sie eine Formatzeichenkette mit Parametern angeben, ähnlich wie [`string.format()`](https://www.lua.org/manual/5.1/manual.html#5.4.1).  
> Ruft `errorf()` auf, wenn die Bedingung `condition` nicht erfüllt ist.

```lua
-- Setzt Ausführung fort, wenn Spieler existiert, sonst Fehler
local player = nil
assertf(player, 'Spieler `%s` nicht gefunden', player)
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

Prüft, ob eine Datei existiert.

```lua
if io.file_exists('config.txt') then
    print('Konfigurationsdatei gefunden')
else
    print('Konfigurationsdatei fehlt')
end
```

### `io.dirname(path)`

Gibt das Verzeichnis aus dem Pfad zurück.

```lua
print(io.dirname('/home/user/project/file.txt'))  -- '/home/user/project'
print(io.dirname('relative/path/file.txt'))       -- 'relative/path'
print(io.dirname('file.txt'))                     -- '.'
```

### `io.write_to_file(filepath, content, mode?)`

Schreibt Inhalt in eine Datei.

```lua
local success, error_code, error_message = io.write_to_file('data.txt', 'Hello, World!')

if success then
    print('Daten erfolgreich geschrieben')
else
    print('Schreibfehler:', error_code, error_message)
end

-- An Ende der Datei anhängen
io.write_to_file('log.txt', 'Neuer Eintrag\n', 'a')
```

### `io.read_from_file(filepath, mode?)`

Liest gesamten Inhalt aus einer Datei.  
Gibt Zeichenkette mit Dateiinhalt bei Erfolg oder `false, error_code, error_message` bei Fehler zurück.

```lua
local content = io.read_from_file('config.json')
if content then
    print('Dateiinhalt:', content)
else
    print('Dateilesefehler')
end
```
Fehlerbehandlung
```lua
local success, error_code, error_message = io.read_from_file('nonexistent.txt')
if not success then
    print('Fehler:', error_code, error_message)
end
-- Fehler: 2       nonexistent.txt: No such file or directory
```
<small>oder:</small>

```lua
local success = io.read_from_file('nonexistent.txt')
if not success then
    local error_code, error_message = io.get_file_error()
    print('Fehler:', error_code, error_message)
end
-- Fehler: 2       nonexistent.txt: No such file or directory
```
Lesen im Binärmodus
```lua
local binary_content = io.read_from_file('image.png', 'rb')
if binary_content then
    print('Dateigröße:', #binary_content, 'Bytes')
end
```

### `io.get_file_error()`

Gibt den Code und die Nachricht des letzten Fehlers von `io.read_from_file()` oder `io.write_to_file()` Funktionen zurück.

```lua
local success = io.read_from_file('nonexistent.txt')
if not success then
    local error_code, error_message = io.get_file_error()
    print('Fehler:', error_code, error_message)
end
-- Output: Fehler: 2       nonexistent.txt: No such file or directory
```
```lua
local success = io.write_to_file('/readonly/file.txt', 'data')
if not success then
    local error_code, error_message = io.get_file_error()
    print('Schreibfehler:', error_code, error_message)
end
-- Output: Schreibfehler: 13       /readonly/file.txt: Permission denied
```



## OS

### `os.DIRECTORY_SEPARATOR`

Verzeichnis-Trennzeichen für das aktuelle Betriebssystem.

```lua
local DS = os.DIRECTORY_SEPARATOR

print(DS)  -- '/' auf Linux/Mac, '\' auf Windows
print('folder' .. DS .. 'file.txt')
-- auf Linux/Mac: 'folder/file.txt'
-- auf Windows:   'folder\file.txt'
```
