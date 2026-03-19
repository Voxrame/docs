---
layout: doc
title: Helper
---

# Helper

Gli helper sono un insieme di funzioni ausiliarie Lua per un lavoro confortevole nel progetto.

Queste funzioni helper estendono significativamente le capacità standard di Lua e semplificano lo sviluppo.

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

**Metodi forniti da Luanti:**

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

Converte la stringa in minuscolo con supporto per il cirillico.

```lua
print(('ПРИВЕТ МИР'):lower())  -- 'привет мир'
```

### `string:upper()`

Converte la stringa in maiuscolo con supporto per il cirillico.

```lua
print(string.upper('привет мир'))  -- 'ПРИВЕТ МИР'
```

### `string:is_one_of(table)`

Verifica se la stringa è uno dei valori nell'array passato.  
(Analogo semantico di [`table.contains`](#table-contains-table-value), che verifica se la stringa è contenuta nell'array passato.)

```lua
local text = 'hello'
local options = { 'hello', 'world', 'lua' }
print(text:is_one_of(options))  -- true
```

### `string:first_to_upper()`

Converte la prima lettera in maiuscolo.

```lua
local text = 'hello world'
print(text:first_to_upper())  -- 'Hello world'
```

### `string` `:title()`/`:to_headline()`

Converte la prima lettera di ogni parola in title case.  
Nome alternativo: `string:to_headline()`

```lua
local text = 'hello world from lua'
print(text:title())           -- 'Hello World From Lua'
print(text:to_headline())     -- 'Hello World From Lua'
```

### `string:starts_with(prefix)`

Verifica se la stringa inizia con il prefisso specificato.

```lua
local filename = 'config.json'
print(filename:starts_with('config'))    -- true
print(filename:starts_with('settings'))  -- false
```

### `string:ends_with(suffix)`

Verifica se la stringa finisce con il suffisso specificato.

```lua
local filename = 'config.json'
print(filename:ends_with('.json'))    -- true
print(filename:ends_with('.conf'))    -- false
```

### `string:contains(sub_string)`

Verifica la presenza di una sottostringa.

```lua
local text = 'Hello, World !!!'
print(text:contains('World'))   -- true
print(text:contains('world'))   -- false (sensibile alle maiuscole/minuscole)
```

### `string:replace(pattern, replacement, n?)`

Sostituisce la sottostringa (analogo di gsub, ma restituisce solo la stringa senza il numero di sostituzioni).  
Vedi la documentazione per [`string.gsub`](https://www.lua.org/manual/5.4/manual.html#pdf-string.gsub) e [Patterns](https://www.lua.org/manual/5.4/manual.html#6.4.1)
```lua
local text = 'Hello, World, World!'
local result = text:replace('World', 'Lua')
print(result)  -- 'Hello, Lua, Lua!'

-- Sostituisci solo la prima occorrenza
local result2 = text:replace('World', 'Lua', 1)
print(result2)  -- 'Hello, Lua, World!'
```

### `string:remove(pattern, n?)`

Rimuove la sottostringa.  
Vedi la documentazione per [`string.gsub`](https://www.lua.org/manual/5.4/manual.html#pdf-string.gsub) e [Patterns](https://www.lua.org/manual/5.4/manual.html#6.4.1)

```lua
local text = 'Hello, World!'
print(text:remove(', '))        -- 'HelloWorld!'
print(text:remove('o', 1))      -- 'Hell, Wrld!' (rimuovi solo il primo 'o')
```

### `string:reg_escape()`

Escape i caratteri speciali per le espressioni regolari.  
Vedi [Patterns](https://www.lua.org/manual/5.4/manual.html#6.4.1)

```lua
local pattern = 'file.txt'
print(pattern:reg_escape())      -- 'file%.txt'

local pattern2 = '^$()%.[]*+-?)'
print(pattern2:reg_escape())     -- '%^%$()%.%[%]%*%+\-%?)'
```

### `string:vxr_split(delimiter?, processor?)`

Divide la stringa per il `delimiter` specificato con la capacità di elaborare le parti.

Luanti ha il suo proprio metodo `string.split`, ma non supporta l'elaborazione delle parti.  
Questo metodo aggiunge la capacità di elaborare le parti della stringa.

```lua
-- Senza elaborazione
('hello world'):vxr_split()             -- { 'hello', 'world' }
('apple,banana,cherry'):vxr_split(',')  -- { 'apple', 'banana', 'cherry' }

-- Con elaborazione
local numbers = '1,2,3,4,5'
local squared = numbers:vxr_split(',', function(x)
    return tonumber(x)^2 
end)
print(squared[1], squared[2], squared[3], squared[4], squared[5])
-- 1 4 9 16 25
```


### `string.or_nil(value)`

Converte in stringa o restituisce nil.

```lua
print(string.or_nil('hello'))     -- 'hello'
print(string.or_nil(42))          -- '42'
print(string.or_nil(nil))         -- nil
print(tostring(nil))              -- 'nil' (confronto)
```

---

#### Metodi forniti da Luanti :

### Luanti `string.split()`

Vedi anche: [`string.vxr_split(delimiter?, processor?)`](#string-vxr_split-delimiter-processor)

Divide la stringa in parti per il separatore specificato. Restituisce un array di stringhe.
Argomenti:
- `separator?`      separatore, predefinito: `","`
- `include_empty?`  predefinito: `false`
- `max_splits?`     se negativo, divisioni illimitate, predefinito: `-1`
- `sep_is_pattern?` se il separatore è una stringa normale o un pattern (regex), predefinito: `false`


```lua
local text = 'apple,banana,cherry'
local parts = text.split(',')
print(parts[1], parts[2], parts[3])  -- 'apple', 'banana', 'cherry'

-- Dividi per spazi
local words = 'hello world lua'.split(' ')
print(words[1], words[2], words[3])  -- 'hello', 'world', 'lua'
```

### Luanti `string.trim()`

Rimuove i caratteri di spazio all'inizio e alla fine della stringa.

```lua
print(("\n \t\tfoo bar\t "):trim())  -- 'foo bar'
```

### Luanti `string.pack()`

Impacchetta i valori in una stringa binaria secondo il formato.  
Backport [da Lua 5.4](https://www.lua.org/manual/5.4/manual.html#pdf-string.pack).

```lua
-- Impacchettare interi
local packed = string.pack('i4', 42)
print(#packed)  -- 4 (dimensione in byte)

-- Impacchettare più valori
local data = string.pack('i4f8', 100, 3.14)
print(#data)  -- 12 (4 + 8 byte)
```

### Luanti `string.unpack()`

Disimpacchetta la stringa binaria in valori secondo il formato.  
Backport [da Lua 5.4](https://www.lua.org/manual/5.4/manual.html#pdf-string.unpack).

```lua
local packed = string.pack('i4f8', 100, 3.14)
local num, float, next_pos = string.unpack('i4f8', packed)
print(num, float)      -- 100, 3.14
print(next_pos)        -- 13 (posizione dopo il disimpacchettamento)

-- Disimpacchetta dalla posizione specificata
local value = string.unpack('i4', packed, 5)
print(value)            -- 3.14 (come float)
```

### Luanti `string.packsize()`

Restituisce la dimensione della stringa che sarà creata da `string.pack`.  
Backport [da Lua 5.4](https://www.lua.org/manual/5.4/manual.html#pdf-string.packsize).

```lua
local size = string.packsize('i4f8')
print(size)  -- 12 (4 + 8 byte)

-- Per formati complessi
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

**Metodi, [forniti da Luanti](https://api.luanti.org/helper-functions/) :**

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

Restituisce un array di chiavi della tabella.

```lua
local data = { name = 'Alek', age = 25, city = 'Vladivostok' }

local keys = table.keys(data)
-- `keys` contiene `{ 'name', 'age', 'city' }` (l'ordine può variare)
```

### `table.values(table)`

Restituisce un array di valori della tabella.

```lua
local data = { name = 'Alek', age = 25, city = 'Vladivostok' }

local values = table.values(data)
-- `values` contiene { 'Alek', 25, 'Vladivostok' }
```

### `table.has_key(table, key)`

Verifica se una chiave esiste nella tabella.

```lua
local data = { name = 'Alek', age = 25 }
print(table.has_key(data, 'name'))   -- true
print(table.has_key(data, 'city'))   -- false
```

### `table` `.contains`/`has_value(table, value)`

Verifica se un valore esiste nella tabella.

```lua
local fruits = { 'apple', 'banana', 'cherry' }
print(table.contains(fruits, 'banana'))  -- true
print(table.contains(fruits, 'orange'))  -- false
```
Puoi anche usare [`string:is_one_of()`](#string-is_one_of-string):
```lua
print('banana':is_one_of(fruits))  -- true
print('orange':is_one_of(fruits))  -- false
```
Nome alternativo: `table.has_value`
```lua
local data = { x = 10, y = 20 }
print(table.has_value(data, 10))     -- true
print(table.has_value(data, 30))     -- false
```

### `table.keys_of(table, value)`

Restituisce una tabella con le chiavi della tabella specificata che hanno il valore specificato.

```lua
local data = { a = 10, b = 20, c = 10, d = 30 }
local keys = table.keys_of(data, 10)
print(dump(keys))  -- { 'a', 'c' }

local keys2 = table.keys_of(data, 99)
print(keys2)  -- nil (nessuna chiave così)
```

### `table.has_any_key(table, find_keys)`

Verifica se le chiavi della tabella contengono almeno un valore dell'array specificato.

```lua
local data = { name = 'test', age = 25, active = true }
local find_keys = { 'name', 'email', 'phone' }

print(table.has_any_key(data, find_keys))   -- true (chiave 'name' è in find_keys)

local find_keys2 = { 'email', 'phone', 'address' }
print(table.has_any_key(data, find_keys2))  -- false
```

### `table.equals(table1, table2)`

Confronta ricorsivamente due tabelle per uguaglianza completa.

```lua
local table1 = { a = 1, b = { c = 2, d = 3 } }
local table2 = { a = 1, b = { c = 2, d = 3 } }
local table3 = { a = 1, b = { c = 2, d = 4 } }

print(table.equals(table1, table2))  -- true
print(table.equals(table1, table3))  -- false
```

### `table.is_empty(table)`

Verifica se la tabella è vuota.

```lua
print(table.is_empty({}))           -- true
print(table.is_empty({ a = 1 }))    -- false
```

### `table.is_position(table)`

Verifica se la tabella rappresenta coordinate.

```lua
print(table.is_position({ x = 10, y = 20, z = 30 }))  -- true
print(table.is_position({ x = 10, y = 20 }))          -- false
print(table.is_position({ a = 1, b = 2, c = 3 }))     -- false
```

### `table.each_value_is(table, value)`

Verifica che tutti gli elementi della tabella sono uguali al valore specificato. Per impostazione predefinita verifica per `true`.

```lua
local data1 = { true, true, true }
print(table.each_value_is(data1))  -- true

local data2 = { 5, 5, 5, 5 }
print(table.each_value_is(data2, 5))  -- true

local data3 = { 1, 2, 3 }
print(table.each_value_is(data3, 1))  -- false
```

### `table.count(table)`

Conta il numero di elementi nella tabella.
> [!NOTE]
> Per le tabelle con chiavi intere, usa `#table`.  
> Poiché l'operatore `#` non funziona sulle tabelle con chiavi non-interne, usa `table.count` per esse.

```lua
local data = { a = 1, b = 2, c = 3 }
print(table.count(data))  -- 3
print(#data)              -- 0, perché l'operatore `#` non funziona con chiavi non-interne.

local array = { 1, 2, 3, 4, 5 }
print(#array) -- 5
```

### `table.generate_sequence(max, start_from?, step?)`

Genera una sequenza di numeri.

```lua
local seq1 = table.generate_sequence(5)
print(dump(seq1))  -- { 1, 2, 3, 4, 5 }

local seq2 = table.generate_sequence(10, 2, 2)
print(dump(seq2))  -- { 2, 4, 6, 8, 10 }

local seq3 = table.generate_sequence(1, 5, -1)
print(dump(seq3))  -- { 5, 4, 3, 2, 1 }
```

### `table.only(table, only)`

Restituisce una nuova tabella contenente dati ***solo*** con le chiavi specificate.

```lua
local data = { name = 'Alek', age = 25, city = 'Vladivostok', country = 'Russia' }
local filtered = table.only(data, { 'name', 'age' })
-- `filtered` contiene `{ name = 'Alek', age = 25 }`
print(filtered.name, filtered.age)    -- 'Alek', 25
print(filtered.city)                  -- nil
```

### `table.except(table, keys)`

Restituisce una nuova tabella contenente dati ***senza*** le chiavi specificate.  
(copia la tabella, ***escludendo*** le chiavi specificate)

```lua
local data = { name = 'Alek', age = 25, city = 'Vladivostok', country = 'Russia' }
local filtered = table.except(data, { 'age', 'country' })
-- `filtered` contiene `{ name = 'Alek', city = 'Vladivostok' }`
print(filtered.name, filtered.city)      -- 'Alek', 'Vladivostok'
print(filtered.age,  filtered.country)   -- nil, nil
```

### `table.merge(table1, table2, overwrite?)`

Unisce le tabelle ricorsivamente.

Per impostazione predefinita, la prima tabella non viene sovrascritta, ne viene creata una nuova.
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
Sovrascrivi la prima tabella:
```lua
table.merge(defaults, user_config, true)
```
> [!TIP]
> È meglio usare [`table.overwrite()`](#table-overwrite-table1-table2) per una migliore leggibilità.

### `table.join(table1, table2, recursively?)`

Aggiunge le chiavi mancanti di `table2` a `table1`.  
I valori che sono tabelle vengono copiati usando `table.copy()`.

```lua
local base     = { a = 1, b =  2        }
local addition = {        b = 10, c = 3 }

table.join(base, addition)
print(dump(base))  -- { a = 1, b = 2, c = 3 }
```
Se `recursively` è `true`, la funzione verrà applicata ricorsivamente solo per i valori
che sono tabelle in entrambe `table1` e `table2`.
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

Sovrascrive completamente `table1` con i valori di `table2`.

Variante semantica per [`table.merge(table1, table2, true)`](#table-merge-table1-table2-overwrite).

### `table.merge_values(table1, table2)`

Unisce i valori di due tabelle in una, rimuovendo i duplicati.  
L'ordine è preservato - prima i valori di `table1`, poi di `table2` che non erano in `table1`.

```lua
local table1 = { 'apple', 'banana', 'cherry' }
local table2 = { 'banana', 'date', 'apple', 'elderberry' }

local merged = table.merge_values(table1, table2)
print(dump(merged))  -- { 'apple', 'banana', 'cherry', 'date', 'elderberry' }
```

### `table.map(table, callback, overwrite?)`

Applica la funzione a ogni elemento della tabella.  
`callback: fun(value: any, key: any): any` - accetta valore e chiave, restituisce nuovo valore.

Per impostazione predefinita restituisce una nuova tabella.

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

Se `overwrite` è `true`, allora la funzione modifica la tabella originale.
```lua
local data = { a = 10, b = 20 }
table.map(data, function(value, key) return value * 2 end, true)
print(dump(data))  -- { a = 20, b = 40 }
```

### `table` `.walk`/`.each(table, callback)`

Itera sulla tabella applicando la funzione (non modifica la tabella).  
`callback: fun(value: any, key: any): void` - accetta valore e chiave; non restituisce nulla.
```lua
local data = { a = 10, b = 20, c = 30 }
table.walk(data, function(value, key)
    print(key, value)
end)
-- a       10
-- c       30
-- b       20
```
Nome alternativo: `table.each()`
```lua
local data = { a = 10, b = 20, c = 30 }
table.each(data, function(value, key)
    data[key] = value * 2
    -- Niente impedisce l'accesso all'upvalue `data`. Ora `data` è stato sovrascritto.
end)
print(dump(data))  -- { a = 20, b = 40, c = 60 }
```

### `table.multiply_each_value(table, multiplier_table)`

Moltiplica ogni valore della tabella per il valore corrispondente di multiplier_table per chiave.

```lua
local data = { a = 10, b = 20, c = 30 }
local multipliers = { a = 2, b = 0.5, c = 3 }

local result = table.multiply_each_value(data, multipliers)
print(dump(result))  -- { a = 20, b = 10, c = 90 }
-- Le chiavi senza moltiplicatore rimangono invariate
```

### `table.add_values(table1, table2, empty_value?, overwrite?)`

Aggiunge valori con le stesse chiavi di due tabelle.

```lua
local table1 = { a = 10, b = 20 }
local table2 = { b = 5, c = 15 }

local result = table.add_values(table1, table2)
print(dump(result))  -- { a = 10, b = 25, c = 15 }

-- Con valore vuoto per le chiavi mancanti
local result2 = table.add_values(table1, table2, 0)
print(dump(result2))  -- { a = 10, b = 25, c = 15 }
```

### `table.sub_values(table1, table2, empty_value?, overwrite?)`

Sottrae i valori table2 da table1 per chiavi uguali.

```lua
local table1 = { a = 10, b = 20, c = 30 }
local table2 = { b = 5, c = 10, d = 5 }

local result = table.sub_values(table1, table2)
print(dump(result))  -- { a = 10, b = 15, c = 20, d = -5 }
```

### `table.mul_values(table1, table2, empty_value?, overwrite?)`

Moltiplica i valori con le stesse chiavi di due tabelle.

```lua
local table1 = { a = 2, b = 3 }
local table2 = { b = 4, c = 5 }

local result = table.mul_values(table1, table2)
print(dump(result))  -- { a = 2, b = 12, c = 5 }
```

### `table.div_values(table1, table2, empty_value?, overwrite?)`

Divide i valori table1 per i valori table2 per chiavi uguali.

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

Limita il valore all'intervallo specificato.  
Nome alternativo: `math.clamp()`.

```lua
local health = 150
local max_health = 100
local clamped_health = math.limit(health, 0, max_health)
print(clamped_health)  -- 100
```

### `math.is_within(value, min, max)`

Verifica che il valore è strettamente nell'intervallo (`min < value < max`).

```lua
print(math.is_within(5, 1, 10))   -- true
print(math.is_within(1, 1, 10))   -- false (limiti non inclusi)
print(math.is_within(10, 1, 10))  -- false
```

### `math.is_among(value, min, max)`

Verifica che il valore è nell'intervallo, includendo i limiti (`min <= value <= max`).

```lua
print(math.is_among(5, 1, 10))   -- true
print(math.is_among(1, 1, 10))   -- true
print(math.is_among(10, 1, 10))  -- true
```

### `math.is_in_range(value, min, max)`

Verifica che il valore è nell'intervallo semiaperto `(min, max]` (`min < value <= max`).

```lua
print(math.is_in_range(5, 1, 10))   -- true
print(math.is_in_range(1, 1, 10))   -- false (uguale al minimo)
print(math.is_in_range(10, 1, 10))  -- true (uguale al massimo)
```

### `math.is_near(value, near, gap?)`

Verifica che il valore è vicino a quello specificato (`|value - near| <= gap`).

```lua
print(math.is_near(10, 12))        -- false (gap = 1 per impostazione predefinita)
print(math.is_near(11, 12))        -- true
print(math.is_near(10, 12, 3))     -- true (gap = 3)
```

### `math.quadratic_equation_roots(a, b, c)`

Risolve l'equazione quadratica della forma `y = a*x^2 + b*x + c`.

```lua
local root1, root2 = math.quadratic_equation_roots(1, -5, 6)
print(root1, root2)  -- 3, 2

-- Nessuna radice reale
local r1, r2 = math.quadratic_equation_roots(1, 0, 1)
print(r1, r2)  -- nil, nil
```

### `math.point_on_circle(radius, angle)`

Calcola un punto su un cerchio.

```lua
local x, z = math.point_on_circle(5, math.pi/4)
print(x, z)  -- coordinate di un punto su un cerchio di raggio 5 all'angolo 45°
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
Restituisce il nome del file corrente o del file della funzione chiamante a seconda della profondità dello stack.
- `depth?` - profondità dello stack di chiamate (predefinito `0`)
- `full?` - mostra percorso completo (predefinito `false`)
```lua
-- Ottieni percorso relativo del file
print(__FILE__())  -- 'mods/Voxrame/helpers/src/lua_ext/debug.lua'

-- Ottieni percorso completo del file
print(__FILE__(0, true))  -- '/home/alek13/projects/my-game/mods/Voxrame/helpers/src/lua_ext/debug.lua'

-- Ottieni file 2 livelli sopra nello stack di chiamate
print(__FILE__(2))  -- file della funzione che ha chiamato la funzione chiamante
```

### `__LINE__(depth?)`
Restituisce il numero di riga corrente o della riga della funzione chiamante a seconda della profondità dello stack.
```lua
print(__LINE__())  -- 57

-- Ottieni numero di riga della funzione chiamante
print(__LINE__(1))  -- numero di riga nel file di chiamata
```

### `__FILE_LINE__(depth?, full?)`

Restituisce file e riga nel formato "percorso/relativo/verso/file:riga".

```lua
print(__FILE_LINE__())  -- 'mods/Voxrame/helpers/src/lua_ext/debug.lua:65'

-- Con percorso completo
print(__FILE_LINE__(0, true))  -- '/home/alek13/projects/my-game/mods/Voxrame/helpers/src/lua_ext/debug.lua:65'
```

### `__DIR__(depth?)`

Restituisce la directory del file corrente o del file della funzione chiamante a seconda della profondità dello stack.

```lua
print(__DIR__())  -- 'mods/Voxrame/helpers/src/lua_ext/'
```

### `__FUNC__(depth?)`

Restituisce il nome della funzione corrente.

```lua
function my_function()
    print(__FUNC__())  -- 'my_function'
end
```

### `print_dump(depth, with_trace, ...)`

Stampa il contenuto di tutti i parametri passati `...`.  
Prima dell'output, aggiunge nome file e riga `@ <file>:<line>`.

Se `with_trace` è `true`, stampa anche lo stack trace.

> [!NOTE]
> Se il tuo [terminal supporta i link](https://github.com/Alhadis/OSC8-Adoption), ogni `@ <file>:<line>` sarà collegato all'apertura dell'IDE, vedi `readme.md` per la configurazione.

> [!TIP]
> Usa `pd()` e `pdt()` per una sintassi più concisa. Vedi gli esempi sotto.


### `pd(...)`

Abbreviazione per `print_dump`. Chiama `print_dump` con `with_trace == false`.

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

Abbreviazione per `print_dump traced`. Chiama `print_dump` con `with_trace == true`.

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

Misura il tempo di esecuzione della funzione.

```lua
local function heavy_calculation()
    local sum = 0
    for i = 1, 2000000 do
        sum = sum + math.random(1, 100) + math.sin(i)
    end
end

-- Misura con output del risultato
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


-- Misura senza output
local time, avg, count = debug.measure('calculation', heavy_calculation)
print(time, avg, count)
local time, avg, count = debug.measure('calculation', heavy_calculation)
print(time, avg, count)
-- output:
-- 33.075  43.170833333333 6
-- 33.135  41.737142857143 7
```

### `debug.mesure_print(name)`

Stampa le statistiche delle misure precedenti `name` ottenute dalle chiamate a [`debug.measure(name, ....)`](#debug-measure-name-callback-print_result).

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

Simile a [`error()` in Lua](https://www.lua.org/manual/5.1/manual.html#pdf-error), ma `message` può essere un string template con parametri specificati, simile a [`string.format()`](https://www.lua.org/manual/5.1/manual.html#pdf-string.format).

```lua
local player_name = nil
errorf('Player `%s` not found', player_name)
-- Error: Player `nil` not found
```

<small style="color: var(--vp-c-text-2)">output (quando `debug` è abilitato):</small>

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

###### Gestione errori in Luanti {#error-handling-warning}
> [!WARNING]
> Lo stack trace conterrà righe aggiuntive, perché Luanti [non passa il `level` specificato](https://github.com/luanti-org/luanti/blob/3b67e73bc3402291bd3790dc2b8f3932be1b42b4/src/script/common/c_internal.cpp#L52) a `core.error_handler()`.

### `errorlf(message, level, ...)`

Come in [`errorf()`](#errorf-message) puoi passare un string di formato e parametri, e anche specificare il livello di trace.

```lua
errorlf('Errore nei dati', 3, 'valore: %d', 42)
-- Errore con trace 3 livelli sopra
```
vedi [gestione errori in Luanti](#error-handling-warning)

### `assertf(condition, message, ...)`

Simile a [`assert()` in Lua](https://www.lua.org/manual/5.1/manual.html#pdf-assert), ma come `message` puoi specificare un string di formato con parametri, simile a [`string.format()`](https://www.lua.org/manual/5.1/manual.html#5.4.1).  
> Chiama `errorf()` se la condizione `condition` non è soddisfatta.

```lua
-- Continua l'esecuzione se player esiste, altrimenti errore
local player = nil
assertf(player, 'Giocatore `%s` non trovato', player)
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

Verifica se un file esiste.

```lua
if io.file_exists('config.txt') then
    print('File di configurazione trovato')
else
    print('File di configurazione mancante')
end
```

### `io.dirname(path)`

Restituisce la directory del percorso.

```lua
print(io.dirname('/home/user/project/file.txt'))  -- '/home/user/project'
print(io.dirname('relative/path/file.txt'))       -- 'relative/path'
print(io.dirname('file.txt'))                     -- '.'
```

### `io.write_to_file(filepath, content, mode?)`

Scrive il contenuto in un file.

```lua
local success, error_code, error_message = io.write_to_file('data.txt', 'Hello, World!')

if success then
    print('Dati scritti con successo')
else
    print('Errore di scrittura:', error_code, error_message)
end

-- Aggiungi alla fine del file
io.write_to_file('log.txt', 'Nuova voce\n', 'a')
```

### `io.read_from_file(filepath, mode?)`

Legge tutto il contenuto di un file.  
Restituisce una stringa con il contenuto del file in caso di successo o `false, error_code, error_message` in caso di errore.

```lua
local content = io.read_from_file('config.json')
if content then
    print('Contenuto del file:', content)
else
    print('Errore di lettura del file')
end
```
Gestione errori
```lua
local success, error_code, error_message = io.read_from_file('nonexistent.txt')
if not success then
    print('Errore:', error_code, error_message)
end
-- Errore: 2       nonexistent.txt: No such file or directory
```
<small>o:</small>

```lua
local success = io.read_from_file('nonexistent.txt')
if not success then
    local error_code, error_message = io.get_file_error()
    print('Errore:', error_code, error_message)
end
-- Errore: 2       nonexistent.txt: No such file or directory
```
Lettura in modalità binaria
```lua
local binary_content = io.read_from_file('image.png', 'rb')
if binary_content then
    print('Dimensione del file:', #binary_content, 'byte')
end
```

### `io.get_file_error()`

Restituisce il codice e il messaggio dell'ultimo errore delle funzioni `io.read_from_file()` o `io.write_to_file()`.

```lua
local success = io.read_from_file('nonexistent.txt')
if not success then
    local error_code, error_message = io.get_file_error()
    print('Errore:', error_code, error_message)
end
-- Output: Errore: 2       nonexistent.txt: No such file or directory
```
```lua
local success = io.write_to_file('/readonly/file.txt', 'data')
if not success then
    local error_code, error_message = io.get_file_error()
    print('Errore di scrittura:', error_code, error_message)
end
-- Output: Errore di scrittura: 13       /readonly/file.txt: Permission denied
```



## OS

### `os.DIRECTORY_SEPARATOR`

Separatore di directory per il sistema operativo corrente.

```lua
local DS = os.DIRECTORY_SEPARATOR

print(DS)  -- '/' su Linux/Mac, '\' su Windows
print('folder' .. DS .. 'file.txt')
-- su Linux/Mac: 'folder/file.txt'
-- su Windows:   'folder\file.txt'
```
