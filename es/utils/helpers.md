---
layout: doc
title: Helpers
---

# Helpers

Los helpers son un conjunto de funciones auxiliares en Lua para trabajo cómodo en el proyecto.

Estas funciones helper extienden significativamente las capacidades estándar de Lua y simplifican el desarrollo.

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

**Métodos proporcionados por Luanti:**

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

Convierte string a minúsculas con soporte para cirílico.

```lua
print(('ПРИВЕТ МИР'):lower())  -- 'привет мир'
```

### `string:upper()`

Convierte string a mayúsculas con soporte para cirílico.

```lua
print(string.upper('привет мир'))  -- 'ПРИВЕТ МИР'
```

### `string:is_one_of(table)`

Verifica si el string es uno de los valores en el array pasado.  
(Análogo semántico de [`table.contains`](#table-contains-table-value), que verifica si el string está contenido en el array pasado.)

```lua
local text = 'hello'
local options = { 'hello', 'world', 'lua' }
print(text:is_one_of(options))  -- true
```

### `string:first_to_upper()`

Convierte la primera letra a mayúscula.

```lua
local text = 'hello world'
print(text:first_to_upper())  -- 'Hello world'
```

### `string` `:title()`/`:to_headline()`

Convierte la primera letra de cada palabra a title case.  
Nombre alternativo: `string:to_headline()`

```lua
local text = 'hello world from lua'
print(text:title())           -- 'Hello World From Lua'
print(text:to_headline())     -- 'Hello World From Lua'
```

### `string:starts_with(prefix)`

Verifica si el string comienza con el prefijo especificado.

```lua
local filename = 'config.json'
print(filename:starts_with('config'))    -- true
print(filename:starts_with('settings'))  -- false
```

### `string:ends_with(suffix)`

Verifica si el string termina con el sufijo especificado.

```lua
local filename = 'config.json'
print(filename:ends_with('.json'))    -- true
print(filename:ends_with('.conf'))    -- false
```

### `string:contains(sub_string)`

Verifica la presencia de una substring.

```lua
local text = 'Hello, World !!!'
print(text:contains('World'))   -- true
print(text:contains('world'))   -- false (distingue mayúsculas/minúsculas)
```

### `string:replace(pattern, replacement, n?)`

Reemplaza substring (análogo de gsub, pero devuelve solo el string sin el número de reemplazos).  
Ver documentación para [`string.gsub`](https://www.lua.org/manual/5.4/manual.html#pdf-string.gsub) y [Patterns](https://www.lua.org/manual/5.4/manual.html#6.4.1)
```lua
local text = 'Hello, World, World!'
local result = text:replace('World', 'Lua')
print(result)  -- 'Hello, Lua, Lua!'

-- Reemplazar solo la primera ocurrencia
local result2 = text:replace('World', 'Lua', 1)
print(result2)  -- 'Hello, Lua, World!'
```

### `string:remove(pattern, n?)`

Elimina substring.  
Ver documentación para [`string.gsub`](https://www.lua.org/manual/5.4/manual.html#pdf-string.gsub) y [Patterns](https://www.lua.org/manual/5.4/manual.html#6.4.1)

```lua
local text = 'Hello, World!'
print(text:remove(', '))        -- 'HelloWorld!'
print(text:remove('o', 1))      -- 'Hell, Wrld!' (eliminar solo el primer 'o')
```

### `string:reg_escape()`

Escapa caracteres especiales para expresiones regulares.  
Ver [Patterns](https://www.lua.org/manual/5.4/manual.html#6.4.1)

```lua
local pattern = 'file.txt'
print(pattern:reg_escape())      -- 'file%.txt'

local pattern2 = '^$()%.[]*+-?)'
print(pattern2:reg_escape())     -- '%^%$()%.%[%]%*%+\-%?)'
```

### `string:vxr_split(delimiter?, processor?)`

Divide string por el `delimiter` especificado con capacidad de procesar partes.

Luanti tiene su propio método `string.split`, pero no soporta procesamiento de partes.  
Este método añade la capacidad de procesar partes del string.

```lua
-- Sin procesamiento
('hello world'):vxr_split()             -- { 'hello', 'world' }
('apple,banana,cherry'):vxr_split(',')  -- { 'apple', 'banana', 'cherry' }

-- Con procesamiento
local numbers = '1,2,3,4,5'
local squared = numbers:vxr_split(',', function(x)
    return tonumber(x)^2 
end)
print(squared[1], squared[2], squared[3], squared[4], squared[5])
-- 1 4 9 16 25
```


### `string.or_nil(value)`

Convierte a string o devuelve nil.

```lua
print(string.or_nil('hello'))     -- 'hello'
print(string.or_nil(42))          -- '42'
print(string.or_nil(nil))         -- nil
print(tostring(nil))              -- 'nil' (comparación)
```

---

#### Métodos proporcionados por Luanti:

### Luanti `string.split()`

Ver también: [`string.vxr_split(delimiter?, processor?)`](#string-vxr_split-delimiter-processor)

Divide string en partes por el separador especificado. Devuelve array de strings.
Argumentos:
- `separator?`      separador, por defecto: `","`
- `include_empty?`  por defecto: `false`
- `max_splits?`     si es negativo, divisiones ilimitadas, por defecto: `-1`
- `sep_is_pattern?` si separador es string regular o pattern (regex), por defecto: `false`


```lua
local text = 'apple,banana,cherry'
local parts = text.split(',')
print(parts[1], parts[2], parts[3])  -- 'apple', 'banana', 'cherry'

-- Dividir por espacios
local words = 'hello world lua'.split(' ')
print(words[1], words[2], words[3])  -- 'hello', 'world', 'lua'
```

### Luanti `string.trim()`

Elimina caracteres de espacio en blanco al inicio y fin del string.

```lua
print(("\n \t\tfoo bar\t "):trim())  -- 'foo bar'
```

### Luanti `string.pack()`

Empaqueta valores en string binario de acuerdo con el formato.  
Backport [de Lua 5.4](https://www.lua.org/manual/5.4/manual.html#pdf-string.pack).

```lua
-- Empaquetar enteros
local packed = string.pack('i4', 42)
print(#packed)  -- 4 (tamaño en bytes)

-- Empaquetar múltiples valores
local data = string.pack('i4f8', 100, 3.14)
print(#data)  -- 12 (4 + 8 bytes)
```

### Luanti `string.unpack()`

Desempaqueta string binario en valores de acuerdo con el formato.  
Backport [de Lua 5.4](https://www.lua.org/manual/5.4/manual.html#pdf-string.unpack).

```lua
local packed = string.pack('i4f8', 100, 3.14)
local num, float, next_pos = string.unpack('i4f8', packed)
print(num, float)      -- 100, 3.14
print(next_pos)        -- 13 (posición después de desempaquetar)

-- Desempaquetar desde la posición especificada
local value = string.unpack('i4', packed, 5)
print(value)            -- 3.14 (como float)
```

### Luanti `string.packsize()`

Devuelve el tamaño del string que será creado por `string.pack`.  
Backport [de Lua 5.4](https://www.lua.org/manual/5.4/manual.html#pdf-string.packsize).

```lua
local size = string.packsize('i4f8')
print(size)  -- 12 (4 + 8 bytes)

-- Para formatos complejos
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

**Métodos, [proporcionados por Luanti](https://api.luanti.org/helper-functions/):**

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

Devuelve un array de claves de la tabla.

```lua
local data = { name = 'Alek', age = 25, city = 'Vladivostok' }

local keys = table.keys(data)
-- `keys` contiene `{ 'name', 'age', 'city' }` (el orden puede variar)
```

### `table.values(table)`

Devuelve un array de valores de la tabla.

```lua
local data = { name = 'Alek', age = 25, city = 'Vladivostok' }

local values = table.values(data)
-- `values` contiene { 'Alek', 25, 'Vladivostok' }
```

### `table.has_key(table, key)`

Verifica si una clave existe en la tabla.

```lua
local data = { name = 'Alek', age = 25 }
print(table.has_key(data, 'name'))   -- true
print(table.has_key(data, 'city'))   -- false
```

### `table` `.contains`/`has_value(table, value)`

Verifica si un valor existe en la tabla.

```lua
local fruits = { 'apple', 'banana', 'cherry' }
print(table.contains(fruits, 'banana'))  -- true
print(table.contains(fruits, 'orange'))  -- false
```
También puedes usar [`string:is_one_of()`](#string-is_one_of-string):
```lua
print('banana':is_one_of(fruits))  -- true
print('orange':is_one_of(fruits))  -- false
```
Nombre alternativo: `table.has_value`
```lua
local data = { x = 10, y = 20 }
print(table.has_value(data, 10))     -- true
print(table.has_value(data, 30))     -- false
```

### `table.keys_of(table, value)`

Devuelve una tabla con claves de la tabla especificada que tienen el valor especificado.

```lua
local data = { a = 10, b = 20, c = 10, d = 30 }
local keys = table.keys_of(data, 10)
print(dump(keys))  -- { 'a', 'c' }

local keys2 = table.keys_of(data, 99)
print(keys2)  -- nil (ninguna clave así)
```

### `table.has_any_key(table, find_keys)`

Verifica si las claves de la tabla contienen al menos un valor del array especificado.

```lua
local data = { name = 'test', age = 25, active = true }
local find_keys = { 'name', 'email', 'phone' }

print(table.has_any_key(data, find_keys))   -- true (clave 'name' está en find_keys)

local find_keys2 = { 'email', 'phone', 'address' }
print(table.has_any_key(data, find_keys2))  -- false
```

### `table.equals(table1, table2)`

Compara recursivamente dos tablas para igualdad completa.

```lua
local table1 = { a = 1, b = { c = 2, d = 3 } }
local table2 = { a = 1, b = { c = 2, d = 3 } }
local table3 = { a = 1, b = { c = 2, d = 4 } }

print(table.equals(table1, table2))  -- true
print(table.equals(table1, table3))  -- false
```

### `table.is_empty(table)`

Verifica si la tabla está vacía.

```lua
print(table.is_empty({}))           -- true
print(table.is_empty({ a = 1 }))    -- false
```

### `table.is_position(table)`

Verifica si la tabla representa coordenadas.

```lua
print(table.is_position({ x = 10, y = 20, z = 30 }))  -- true
print(table.is_position({ x = 10, y = 20 }))          -- false
print(table.is_position({ a = 1, b = 2, c = 3 }))     -- false
```

### `table.each_value_is(table, value)`

Verifica que todos los elementos de la tabla son iguales al valor especificado. Por defecto verifica para `true`.

```lua
local data1 = { true, true, true }
print(table.each_value_is(data1))  -- true

local data2 = { 5, 5, 5, 5 }
print(table.each_value_is(data2, 5))  -- true

local data3 = { 1, 2, 3 }
print(table.each_value_is(data3, 1))  -- false
```

### `table.count(table)`

Cuenta el número de elementos en la tabla.
> [!NOTE]
> Para tablas con claves enteras, usa `#table`.  
> Como el operador `#` no funciona en tablas con claves no-enteras, usa `table.count` para ellas.

```lua
local data = { a = 1, b = 2, c = 3 }
print(table.count(data))  -- 3
print(#data)              -- 0, porque el operador `#` no funciona con claves no-enteras.

local array = { 1, 2, 3, 4, 5 }
print(#array) -- 5
```

### `table.generate_sequence(max, start_from?, step?)`

Genera una secuencia de números.

```lua
local seq1 = table.generate_sequence(5)
print(dump(seq1))  -- { 1, 2, 3, 4, 5 }

local seq2 = table.generate_sequence(10, 2, 2)
print(dump(seq2))  -- { 2, 4, 6, 8, 10 }

local seq3 = table.generate_sequence(1, 5, -1)
print(dump(seq3))  -- { 5, 4, 3, 2, 1 }
```

### `table.only(table, only)`

Devuelve una nueva tabla conteniendo datos ***solo*** con las claves especificadas.

```lua
local data = { name = 'Alek', age = 25, city = 'Vladivostok', country = 'Russia' }
local filtered = table.only(data, { 'name', 'age' })
-- `filtered` contiene `{ name = 'Alek', age = 25 }`
print(filtered.name, filtered.age)    -- 'Alek', 25
print(filtered.city)                  -- nil
```

### `table.except(table, keys)`

Devuelve una nueva tabla conteniendo datos ***sin*** las claves especificadas.  
(copia la tabla, ***excluyendo*** las claves especificadas)

```lua
local data = { name = 'Alek', age = 25, city = 'Vladivostok', country = 'Russia' }
local filtered = table.except(data, { 'age', 'country' })
-- `filtered` contiene `{ name = 'Alek', city = 'Vladivostok' }`
print(filtered.name, filtered.city)      -- 'Alek', 'Vladivostok'
print(filtered.age,  filtered.country)   -- nil, nil
```

### `table.merge(table1, table2, overwrite?)`

Fusiona tablas recursivamente.

Por defecto, la primera tabla no es sobrescrita, se crea una nueva.
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
Sobrescribir la primera tabla:
```lua
table.merge(defaults, user_config, true)
```
> [!TIP]
> Es mejor usar [`table.overwrite()`](#table-overwrite-table1-table2) para mejor legibilidad.

### `table.join(table1, table2, recursively?)`

Añade claves faltantes de `table2` a `table1`.  
Valores que son tablas son copiados usando `table.copy()`.

```lua
local base     = { a = 1, b =  2        }
local addition = {        b = 10, c = 3 }

table.join(base, addition)
print(dump(base))  -- { a = 1, b = 2, c = 3 }
```
Si `recursively` es `true`, la función será aplicada recursivamente solo para valores
que son tablas en ambos `table1` y `table2`.
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

Sobrescribe completamente `table1` con valores de `table2`.

Variante semántica para [`table.merge(table1, table2, true)`](#table-merge-table1-table2-overwrite).

### `table.merge_values(table1, table2)`

Fusiona valores de dos tablas en una, eliminando duplicados.  
Orden es preservado - primero valores de `table1`, luego de `table2` que no estaban en `table1`.

```lua
local table1 = { 'apple', 'banana', 'cherry' }
local table2 = { 'banana', 'date', 'apple', 'elderberry' }

local merged = table.merge_values(table1, table2)
print(dump(merged))  -- { 'apple', 'banana', 'cherry', 'date', 'elderberry' }
```

### `table.map(table, callback, overwrite?)`

Aplica función a cada elemento de la tabla.  
`callback: fun(value: any, key: any): any` - acepta valor y clave, devuelve nuevo valor.

Por defecto devuelve una nueva tabla.

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

Si `overwrite` es `true`, entonces la función modifica la tabla original.
```lua
local data = { a = 10, b = 20 }
table.map(data, function(value, key) return value * 2 end, true)
print(dump(data))  -- { a = 20, b = 40 }
```

### `table` `.walk`/`.each(table, callback)`

Itera sobre la tabla aplicando función (no modifica la tabla).  
`callback: fun(value: any, key: any): void` - acepta valor y clave; no devuelve nada.
```lua
local data = { a = 10, b = 20, c = 30 }
table.walk(data, function(value, key)
    print(key, value)
end)
-- a       10
-- c       30
-- b       20
```
Nombre alternativo: `table.each()`
```lua
local data = { a = 10, b = 20, c = 30 }
table.each(data, function(value, key)
    data[key] = value * 2
    -- Nada impide el acceso a upvalue `data`. Ahora `data` ha sido sobrescrito.
end)
print(dump(data))  -- { a = 20, b = 40, c = 60 }
```

### `table.multiply_each_value(table, multiplier_table)`

Multiplica cada valor de la tabla por el valor correspondiente de multiplier_table por clave.

```lua
local data = { a = 10, b = 20, c = 30 }
local multipliers = { a = 2, b = 0.5, c = 3 }

local result = table.multiply_each_value(data, multipliers)
print(dump(result))  -- { a = 20, b = 10, c = 90 }
-- Claves sin multiplicador permanecen inalteradas
```

### `table.add_values(table1, table2, empty_value?, overwrite?)`

Añade valores con las mismas claves de dos tablas.

```lua
local table1 = { a = 10, b = 20 }
local table2 = { b = 5, c = 15 }

local result = table.add_values(table1, table2)
print(dump(result))  -- { a = 10, b = 25, c = 15 }

-- Con valor vacío para claves faltantes
local result2 = table.add_values(table1, table2, 0)
print(dump(result2))  -- { a = 10, b = 25, c = 15 }
```

### `table.sub_values(table1, table2, empty_value?, overwrite?)`

Subtracta valores table2 de table1 para claves iguales.

```lua
local table1 = { a = 10, b = 20, c = 30 }
local table2 = { b = 5, c = 10, d = 5 }

local result = table.sub_values(table1, table2)
print(dump(result))  -- { a = 10, b = 15, c = 20, d = -5 }
```

### `table.mul_values(table1, table2, empty_value?, overwrite?)`

Multiplica valores con las mismas claves de dos tablas.

```lua
local table1 = { a = 2, b = 3 }
local table2 = { b = 4, c = 5 }

local result = table.mul_values(table1, table2)
print(dump(result))  -- { a = 2, b = 12, c = 5 }
```

### `table.div_values(table1, table2, empty_value?, overwrite?)`

Divide valores table1 por valores table2 para claves iguales.

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

Limita valor al intervalo especificado.  
Nombre alternativo: `math.clamp()`.

```lua
local health = 150
local max_health = 100
local clamped_health = math.limit(health, 0, max_health)
print(clamped_health)  -- 100
```

### `math.is_within(value, min, max)`

Verifica que el valor está estrictamente dentro del intervalo (`min < value < max`).

```lua
print(math.is_within(5, 1, 10))   -- true
print(math.is_within(1, 1, 10))   -- false (límites no incluidos)
print(math.is_within(10, 1, 10))  -- false
```

### `math.is_among(value, min, max)`

Verifica que el valor está dentro del intervalo, incluyendo límites (`min <= value <= max`).

```lua
print(math.is_among(5, 1, 10))   -- true
print(math.is_among(1, 1, 10))   -- true
print(math.is_among(10, 1, 10))  -- true
```

### `math.is_in_range(value, min, max)`

Verifica que el valor está dentro del intervalo semiabierto `(min, max]` (`min < value <= max`).

```lua
print(math.is_in_range(5, 1, 10))   -- true
print(math.is_in_range(1, 1, 10))   -- false (igual al mínimo)
print(math.is_in_range(10, 1, 10))  -- true (igual al máximo)
```

### `math.is_near(value, near, gap?)`

Verifica que el valor está cerca del especificado (`|value - near| <= gap`).

```lua
print(math.is_near(10, 12))        -- false (gap = 1 por defecto)
print(math.is_near(11, 12))        -- true
print(math.is_near(10, 12, 3))     -- true (gap = 3)
```

### `math.quadratic_equation_roots(a, b, c)`

Resuelve ecuación cuadrática de la forma `y = a*x^2 + b*x + c`.

```lua
local root1, root2 = math.quadratic_equation_roots(1, -5, 6)
print(root1, root2)  -- 3, 2

-- Sin raíces reales
local r1, r2 = math.quadratic_equation_roots(1, 0, 1)
print(r1, r2)  -- nil, nil
```

### `math.point_on_circle(radius, angle)`

Calcula un punto en un círculo.

```lua
local x, z = math.point_on_circle(5, math.pi/4)
print(x, z)  -- coordenadas de un punto en un círculo con radio 5 en ángulo 45°
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
Devuelve el nombre del archivo actual o del archivo de la función llamadora dependiendo de la profundidad de la pila.
- `depth?` - profundidad de la pila de llamadas (por defecto `0`)
- `full?` - mostrar ruta completa (por defecto `false`)
```lua
-- Obtener ruta relativa del archivo
print(__FILE__())  -- 'mods/Voxrame/helpers/src/lua_ext/debug.lua'

-- Obtener ruta completa del archivo
print(__FILE__(0, true))  -- '/home/alek13/projects/my-game/mods/Voxrame/helpers/src/lua_ext/debug.lua'

-- Obtener archivo 2 niveles arriba en la pila de llamadas
print(__FILE__(2))  -- archivo de la función que llamó a la función llamadora
```

### `__LINE__(depth?)`
Devuelve el número de línea actual o de la línea de la función llamadora dependiendo de la profundidad de la pila.
```lua
print(__LINE__())  -- 57

-- Obtener número de línea de la función llamadora
print(__LINE__(1))  -- número de línea en el archivo de llamada
```

### `__FILE_LINE__(depth?, full?)`

Devuelve archivo y línea en formato "ruta/relativa/para/archivo:línea".

```lua
print(__FILE_LINE__())  -- 'mods/Voxrame/helpers/src/lua_ext/debug.lua:65'

-- Con ruta completa
print(__FILE_LINE__(0, true))  -- '/home/alek13/projects/my-game/mods/Voxrame/helpers/src/lua_ext/debug.lua:65'
```

### `__DIR__(depth?)`

Devuelve el directorio del archivo actual o del archivo de la función llamadora dependiendo de la profundidad de la pila.

```lua
print(__DIR__())  -- 'mods/Voxrame/helpers/src/lua_ext/'
```

### `__FUNC__(depth?)`

Devuelve el nombre de la función actual.

```lua
function my_function()
    print(__FUNC__())  -- 'my_function'
end
```

### `print_dump(depth, with_trace, ...)`

Imprime el contenido de todos los parámetros pasados `...`.  
Antes de la salida, añade nombre de archivo y línea `@ <file>:<line>`.

Si `with_trace` es `true`, adicionalmente imprime stack trace.

> [!NOTE]
> Si tu [terminal soporta enlaces](https://github.com/Alhadis/OSC8-Adoption), cada `@ <file>:<line>` será enlazado a la apertura de IDE, ver `readme.md` para configuración.

> [!TIP]
> Usa `pd()` y `pdt()` para sintaxis más concisa. Ver ejemplos abajo.


### `pd(...)`

Abreviatura para `print_dump`. Llama `print_dump` con `with_trace == false`.

```lua
local player_name = 'test_player'
local position = { x = 10, y = 20, z = 30 }

pd(player_name, position)
```
<small style="color: var(--vp-c-text-2)">output:</small>
```ansi
[93m@ [0m[33mmods/lord/Core/map/src/map/Corridor.lua[0m[97m:[0m[32m14[0m
[36mplayer_name:[0m "test_player"
[36m   position:[0m {
    x = 10,
    y = 20,
    z = 30,
}
```

### `pdt(...)`

Abreviatura para `print_dump traced`. Llama `print_dump` con `with_trace == true`.

```lua
local player_name = 'test_player'
local position = { x = 10, y = 20, z = 30 }

pdt(player_name, position)
```
<small style="color: var(--vp-c-text-2)">output:</small>
```ansi
[93m@ [0m[33mmods/lord/Core/map/src/map/Corridor.lua[0m[97m:[0m[32m14[0m
[3m[2m   1   [0m[93m@[0m [C][36m: in dofile[0m
[3m[2m   2   [0m[93m@ [0m[33mmods/lord/Core/builtin_ext/src/mod/require.lua[0m[97m:[0m[32m29[0m[36m: in require[0m
[3m[2m   3   [0m[93m@ [0m[33mmods/lord/Core/map/src/map.lua[0m[97m:[0m[32m9[0m[36m: in main[0m
[3m[2m   4   [0m[93m@ [0m [C][36m: in dofile[0m
[3m[2m   5   [0m[93m@ [0m[33mmods/lord/Core/builtin_ext/src/mod/require.lua[0m[97m:[0m[32m29[0m[36m: in require[0m
[3m[2m   6   [0m[93m@ [0m[33mmods/lord/Core/map/init.lua[0m[97m:[0m[32m4[0m[36m: in mod_init_function[0m
[3m[2m   7   [0m[93m@ [0m[33mmods/lord/Core/builtin_ext/src/mod.lua[0m[97m:[0m[32m80[0m[36m: in mod[0m
[3m[2m   8   [0m[93m@ [0m[33mmods/lord/Core/map/init.lua[0m[97m:[0m[32m3[0m[36m: in main[0m
[36mplayer_name:[0m "test_player"
[36m   position:[0m {
    x = 10,
    y = 20,
    z = 30,
}
```

### `debug.measure(name, callback, print_result?)`

Mide el tiempo de ejecución de la función.

```lua
local function heavy_calculation()
    local sum = 0
    for i = 1, 2000000 do
        sum = sum + math.random(1, 100) + math.sin(i)
    end
end

-- Medir con salida de resultado
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


-- Medir sin salida
local time, avg, count = debug.measure('calculation', heavy_calculation)
print(time, avg, count)
local time, avg, count = debug.measure('calculation', heavy_calculation)
print(time, avg, count)
-- output:
-- 33.075  43.170833333333 6
-- 33.135  41.737142857143 7
```

### `debug.mesure_print(name)`

Imprime estadísticas de mediciones anteriores `name` obtenidas por llamadas a [`debug.measure(name, ....)`](#debug-measure-name-callback-print_result).

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

Similar al [`error()` en Lua](https://www.lua.org/manual/5.1/manual.html#pdf-error), pero `message` puede ser un string template con parámetros especificados, similar al [`string.format()`](https://www.lua.org/manual/5.1/manual.html#pdf-string.format).

```lua
local player_name = nil
errorf('Jugador '%s' no encontrado', player_name)
-- Error: Jugador 'nil' no encontrado
```

<small style="color: var(--vp-c-text-2)">output (cuando `debug` está habilitado):</small>

```ansi
[93m@ [0m[33mmods/lord/Core/map/src/map/Corridor.lua[0m[97m:[0m[32m9[0m
[32m++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++[0m
[1m[91mERROR:[0m
[91m  Jugador `nil` no encontrado[0m

[1m[91mStack trace:[0m
[3m[2m   1   [0m[93m@[0m [C][36m: in error[0m
[3m[2m   2   [0m[93m@ [0m[33mmods/lord/Core/helpers/src/lua_ext/global.lua[0m[97m:[0m[32m9[0m[36m: in errorf[0m
[3m[2m   3   [0m[93m@ [0m[33mmods/lord/Core/map/src/map/Corridor.lua[0m[97m:[0m[32m12[0m[36m: in main[0m
[3m[2m   4   [0m[93m@ [0m [C][36m: in dofile[0m
[3m[2m   5   [0m[93m@ [0m[33mmods/lord/Core/builtin_ext/src/mod/require.lua[0m[97m:[0m[32m29[0m[36m: in require[0m
[3m[2m   6   [0m[93m@ [0m[33mmods/lord/Core/map/src/map.lua[0m[97m:[0m[32m9[0m[36m: in main[0m
[3m[2m   7   [0m[93m@ [0m [C][36m: in dofile[0m
[3m[2m   8   [0m[93m@ [0m[33mmods/lord/Core/builtin_ext/src/mod/require.lua[0m[97m:[0m[32m29[0m[36m: in require[0m
[3m[2m   9   [0m[93m@ [0m[33mmods/lord/Core/map/init.lua[0m[97m:[0m[32m4[0m[36m: in mod_init_function[0m
[3m[2m  10   [0m[93m@ [0m[33mmods/lord/Core/builtin_ext/src/mod.lua[0m[97m:[0m[32m80[0m[36m: in mod[0m
[3m[2m  11   [0m[93m@ [0m[33mmods/lord/Core/map/init.lua[0m[97m:[0m[32m3[0m[36m: in main[0m

[32m++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++[0m
```

###### Manejo de errores en Luanti {#error-handling-warning}
> [!WARNING]
> El stack trace contendrá líneas extra, porque Luanti [no pasa el `level` especificado](https://github.com/luanti-org/luanti/blob/3b67e73bc3402291bd3790dc2b8f3932be1b42b4/src/script/common/c_internal.cpp#L52) a `core.error_handler()`.

### `errorlf(message, level, ...)`

Como en [`errorf()`](#errorf-message) puedes pasar un string de formato y parámetros, y también especificar el nivel de trace.

```lua
errorlf('Error en datos', 3, 'valor: %d', 42)
-- Error con trace 3 niveles arriba
```
ver [manejo de errores en Luanti](#error-handling-warning)

### `assertf(condition, message, ...)`

Similar al [`assert()` en Lua](https://www.lua.org/manual/5.1/manual.html#pdf-assert), pero como `message` puedes especificar un string de formato con parámetros, similar al [`string.format()`](https://www.lua.org/manual/5.1/manual.html#5.4.1).  
> Llama `errorf()` si la condición `condition` no es cumplida.

```lua
-- Continúa ejecución si player existe, si no error
local player = nil
assertf(player, 'Jugador `%s` no encontrado', player)
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

Verifica si un archivo existe.

```lua
if io.file_exists('config.txt') then
    print('Archivo de configuración encontrado')
else
    print('Archivo de configuración ausente')
end
```

### `io.dirname(path)`

Devuelve el directorio del path.

```lua
print(io.dirname('/home/user/project/file.txt'))  -- '/home/user/project'
print(io.dirname('relative/path/file.txt'))       -- 'relative/path'
print(io.dirname('file.txt'))                     -- '.'
```

### `io.write_to_file(filepath, content, mode?)`

Escribe contenido en un archivo.

```lua
local success, error_code, error_message = io.write_to_file('data.txt', 'Hello, World!')

if success then
    print('Datos escritos exitosamente')
else
    print('Error de escritura:', error_code, error_message)
end

-- Añadir al final del archivo
io.write_to_file('log.txt', 'Nueva entrada\n', 'a')
```

### `io.read_from_file(filepath, mode?)`

Lee todo el contenido de un archivo.  
Devuelve string con contenido del archivo en caso de éxito o `false, error_code, error_message` en caso de error.

```lua
local content = io.read_from_file('config.json')
if content then
    print('Contenido del archivo:', content)
else
    print('Error de lectura del archivo')
end
```
Manejo de errores
```lua
local success, error_code, error_message = io.read_from_file('nonexistent.txt')
if not success then
    print('Error:', error_code, error_message)
end
-- Error: 2       nonexistent.txt: No such file or directory
```
<small>o:</small>

```lua
local success = io.read_from_file('nonexistent.txt')
if not success then
    local error_code, error_message = io.get_file_error()
    print('Error:', error_code, error_message)
end
-- Error: 2       nonexistent.txt: No such file or directory
```
Lectura en modo binario
```lua
local binary_content = io.read_from_file('image.png', 'rb')
if binary_content then
    print('Tamaño del archivo:', #binary_content, 'bytes')
end
```

### `io.get_file_error()`

Devuelve el código y mensaje del último error de las funciones `io.read_from_file()` o `io.write_to_file()`.

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
    print('Error de escritura:', error_code, error_message)
end
-- Output: Error de escritura: 13       /readonly/file.txt: Permission denied
```



## OS

### `os.DIRECTORY_SEPARATOR`

Separador de directorio para el sistema operativo actual.

```lua
local DS = os.DIRECTORY_SEPARATOR

print(DS)  -- '/' en Linux/Mac, '\' en Windows
print('folder' .. DS .. 'file.txt')
-- en Linux/Mac: 'folder/file.txt'
-- en Windows:   'folder\file.txt'
```
