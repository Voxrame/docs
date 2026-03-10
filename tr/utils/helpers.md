---
layout: doc
title: Yardımcılar
---

# Yardımcılar

Yardımcılar, projede rahat çalışmak için bir dizi Lua yardımcı fonksiyonudur.

Bu yardımcı fonksiyonlar, Lua'nın standart yeteneklerini önemli ölçüde genişletir ve geliştirmeyi basitleştirir.

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

**Luanti tarafından sağlanan yöntemler:**

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

String'i Kiril desteği ile küçük harfe çevirir.

```lua
print(('ПРИВЕТ МИР'):lower())  -- 'привет мир'
```

### `string:upper()`

String'i Kiril desteği ile büyük harfe çevirir.

```lua
print(string.upper('привет мир'))  -- 'ПРИВЕТ МИР'
```

### `string:is_one_of(table)`

String'in geçirilen dizideki değerlerden biri olup olmadığını kontrol eder.  
([`table.contains`](#table-contains-table-value) fonksiyonunun semantik analoğu, string'in geçirilen dizide içerilip içerilmediğini kontrol eder.)

```lua
local text = 'hello'
local options = { 'hello', 'world', 'lua' }
print(text:is_one_of(options))  -- true
```

### `string:first_to_upper()`

İlk harfi büyük harfe çevirir.

```lua
local text = 'hello world'
print(text:first_to_upper())  -- 'Hello world'
```

### `string` `:title()`/`:to_headline()`

Her kelimenin ilk harfini title case'e çevirir.  
Alternatif isim: `string:to_headline()`

```lua
local text = 'hello world from lua'
print(text:title())           -- 'Hello World From Lua'
print(text:to_headline())     -- 'Hello World From Lua'
```

### `string:starts_with(prefix)`

String'in belirtilen önekle başlayıp başlamadığını kontrol eder.

```lua
local filename = 'config.json'
print(filename:starts_with('config'))    -- true
print(filename:starts_with('settings'))  -- false
```

### `string:ends_with(suffix)`

String'in belirtilen sonekle bitip bitmediğini kontrol eder.

```lua
local filename = 'config.json'
print(filename:ends_with('.json'))    -- true
print(filename:ends_with('.conf'))    -- false
```

### `string:contains(sub_string)`

Alt string varlığını kontrol eder.

```lua
local text = 'Hello, World !!!'
print(text:contains('World'))   -- true
print(text:contains('world'))   -- false (büyük/küçük harf duyarlı)
```

### `string:replace(pattern, replacement, n?)`

Alt string'i değiştirir (gsub'un analoğu, ancak sadece değiştirme sayısı olmadan string döndürür).  
[`string.gsub`](https://www.lua.org/manual/5.4/manual.html#pdf-string.gsub) ve [Patterns](https://www.lua.org/manual/5.4/manual.html#6.4.1) için belgelere bakın
```lua
local text = 'Hello, World, World!'
local result = text:replace('World', 'Lua')
print(result)  -- 'Hello, Lua, Lua!'

-- Sadece ilk geçişi değiştir
local result2 = text:replace('World', 'Lua', 1)
print(result2)  -- 'Hello, Lua, World!'
```

### `string:remove(pattern, n?)`

Alt string'i kaldırır.  
[`string.gsub`](https://www.lua.org/manual/5.4/manual.html#pdf-string.gsub) ve [Patterns](https://www.lua.org/manual/5.4/manual.html#6.4.1) için belgelere bakın

```lua
local text = 'Hello, World!'
print(text:remove(', '))        -- 'HelloWorld!'
print(text:remove('o', 1))      -- 'Hell, Wrld!' (sadece ilk 'o'yu kaldır)
```

### `string:reg_escape()`

Düzenli ifadeler için özel karakterleri kaçış yapar.  
[Patterns](https://www.lua.org/manual/5.4/manual.html#6.4.1) bakın

```lua
local pattern = 'file.txt'
print(pattern:reg_escape())      -- 'file%.txt'

local pattern2 = '^$()%.[]*+-?)'
print(pattern2:reg_escape())     -- '%^%$()%.%[%]%*%+\-%?)'
```

### `string:vxr_split(delimiter?, processor?)`

String'i belirtilen `delimiter` ile böler ve parçaları işleme yeteneği vardır.

Luanti'nin kendi `string.split` yöntemi vardır, ancak parça işlemini desteklemez.  
Bu yöntem, string parçalarını işleme yeteneği ekler.

```lua
-- İşleme olmadan
('hello world'):vxr_split()             -- { 'hello', 'world' }
('apple,banana,cherry'):vxr_split(',')  -- { 'apple', 'banana', 'cherry' }

-- İşleme ile
local numbers = '1,2,3,4,5'
local squared = numbers:vxr_split(',', function(x)
    return tonumber(x)^2 
end)
print(squared[1], squared[2], squared[3], squared[4], squared[5])
-- 1 4 9 16 25
```


### `string.or_nil(value)`

String'e dönüştürür veya nil döndürür.

```lua
print(string.or_nil('hello'))     -- 'hello'
print(string.or_nil(42))          -- '42'
print(string.or_nil(nil))         -- nil
print(tostring(nil))              -- 'nil' (karşılaştırma)
```

---

#### Luanti tarafından sağlanan yöntemler :

### Luanti `string.split()`

Ayrıca bakın: [`string.vxr_split(delimiter?, processor?)`](#string-vxr_split-delimiter-processor)

String'i belirtilen ayırıcıya göre parçalara böler. String dizisi döndürür.
Argümanlar:
- `separator?`      ayırıcı, varsayılan: `","`
- `include_empty?`  varsayılan: `false`
- `max_splits?`     negatif ise, sınırsız bölmeler, varsayılan: `-1`
- `sep_is_pattern?` ayırıcının normal string mi yoksa pattern (regex) mi olduğu, varsayılan: `false`


```lua
local text = 'apple,banana,cherry'
local parts = text.split(',')
print(parts[1], parts[2], parts[3])  -- 'apple', 'banana', 'cherry'

-- Boşluklara göre böl
local words = 'hello world lua'.split(' ')
print(words[1], words[2], words[3])  -- 'hello', 'world', 'lua'
```

### Luanti `string.trim()`

String'in başındaki ve sonundaki boşluk karakterlerini kaldırır.

```lua
print(("\n \t\tfoo bar\t "):trim())  -- 'foo bar'
```

### Luanti `string.pack()`

Değerleri formata göre ikili string'e paketler.  
[Lua 5.4'ten](https://www.lua.org/manual/5.4/manual.html#pdf-string.pack) backport.

```lua
-- Tamsayıları paketle
local packed = string.pack('i4', 42)
print(#packed)  -- 4 (byte olarak boyut)

-- Birden fazla değeri paketle
local data = string.pack('i4f8', 100, 3.14)
print(#data)  -- 12 (4 + 8 byte)
```

### Luanti `string.unpack()`

İkili string'i formata göre değerlere açar.  
[Lua 5.4'ten](https://www.lua.org/manual/5.4/manual.html#pdf-string.unpack) backport.

```lua
local packed = string.pack('i4f8', 100, 3.14)
local num, float, next_pos = string.unpack('i4f8', packed)
print(num, float)      -- 100, 3.14
print(next_pos)        -- 13 (açmadan sonraki pozisyon)

-- Belirtilen pozisyondan aç
local value = string.unpack('i4', packed, 5)
print(value)            -- 3.14 (float olarak)
```

### Luanti `string.packsize()`

`string.pack` tarafından oluşturulacak string'in boyutunu döndürür.  
[Lua 5.4'ten](https://www.lua.org/manual/5.4/manual.html#pdf-string.packsize) backport.

```lua
local size = string.packsize('i4f8')
print(size)  -- 12 (4 + 8 byte)

-- Karmaşık formatlar için
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

**Yöntemler, [Luanti tarafından sağlanan](https://api.luanti.org/helper-functions/) :**

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

Tablonun anahtarlarından oluşan bir dizi döndürür.

```lua
local data = { name = 'Alek', age = 25, city = 'Vladivostok' }

local keys = table.keys(data)
-- `keys` `{ 'name', 'age', 'city' }` içerir (sıralama değişebilir)
```

### `table.values(table)`

Tablonun değerlerinden oluşan bir dizi döndürür.

```lua
local data = { name = 'Alek', age = 25, city = 'Vladivostok' }

local values = table.values(data)
-- `values` { 'Alek', 25, 'Vladivostok' } içerir
```

### `table.has_key(table, key)`

Bir anahtarın tabloda olup olmadığını kontrol eder.

```lua
local data = { name = 'Alek', age = 25 }
print(table.has_key(data, 'name'))   -- true
print(table.has_key(data, 'city'))   -- false
```

### `table` `.contains`/`has_value(table, value)`

Bir değerin tabloda olup olmadığını kontrol eder.

```lua
local fruits = { 'apple', 'banana', 'cherry' }
print(table.contains(fruits, 'banana'))  -- true
print(table.contains(fruits, 'orange'))  -- false
```
Ayrıca [`string:is_one_of()`](#string-is_one_of-string) kullanabilirsiniz:
```lua
print('banana':is_one_of(fruits))  -- true
print('orange':is_one_of(fruits))  -- false
```
Alternatif isim: `table.has_value`
```lua
local data = { x = 10, y = 20 }
print(table.has_value(data, 10))     -- true
print(table.has_value(data, 30))     -- false
```

### `table.keys_of(table, value)`

Belirtilen değere sahip belirtilen tablonun anahtarlarından oluşan bir tablo döndürür.

```lua
local data = { a = 10, b = 20, c = 10, d = 30 }
local keys = table.keys_of(data, 10)
print(dump(keys))  -- { 'a', 'c' }

local keys2 = table.keys_of(data, 99)
print(keys2)  -- nil (böyle bir anahtar yok)
```

### `table.has_any_key(table, find_keys)`

Tablo anahtarlarının belirtilen diziden en az bir değer içerip içermediğini kontrol eder.

```lua
local data = { name = 'test', age = 25, active = true }
local find_keys = { 'name', 'email', 'phone' }

print(table.has_any_key(data, find_keys))   -- true ('name' anahtarı find_keys'te var)

local find_keys2 = { 'email', 'phone', 'address' }
print(table.has_any_key(data, find_keys2))  -- false
```

### `table.equals(table1, table2)`

Tam eşitlik için iki tabloyu rekursif olarak karşılaştırır.

```lua
local table1 = { a = 1, b = { c = 2, d = 3 } }
local table2 = { a = 1, b = { c = 2, d = 3 } }
local table3 = { a = 1, b = { c = 2, d = 4 } }

print(table.equals(table1, table2))  -- true
print(table.equals(table1, table3))  -- false
```

### `table.is_empty(table)`

Tablonun boş olup olmadığını kontrol eder.

```lua
print(table.is_empty({}))           -- true
print(table.is_empty({ a = 1 }))    -- false
```

### `table.is_position(table)`

Tablonun koordinatları temsil edip etmediğini kontrol eder.

```lua
print(table.is_position({ x = 10, y = 20, z = 30 }))  -- true
print(table.is_position({ x = 10, y = 20 }))          -- false
print(table.is_position({ a = 1, b = 2, c = 3 }))     -- false
```

### `table.each_value_is(table, value)`

Tablodaki tüm elemanların belirtilen değere eşit olduğunu kontrol eder. Varsayılan olarak `true` için kontrol eder.

```lua
local data1 = { true, true, true }
print(table.each_value_is(data1))  -- true

local data2 = { 5, 5, 5, 5 }
print(table.each_value_is(data2, 5))  -- true

local data3 = { 1, 2, 3 }
print(table.each_value_is(data3, 1))  -- false
```

### `table.count(table)`

Tablodaki eleman sayısını sayar.
> [!NOTE]
> Tamsayı anahtarlı tablolar için `#table` kullanın.  
> `#` operatörü tamsayı olmayan anahtarlı tablolarda çalışmadığından, onlar için `table.count` kullanın.

```lua
local data = { a = 1, b = 2, c = 3 }
print(table.count(data))  -- 3
print(#data)              -- 0, çünkü `#` operatörü tamsayı olmayan anahtarlarla çalışmaz.

local array = { 1, 2, 3, 4, 5 }
print(#array) -- 5
```

### `table.generate_sequence(max, start_from?, step?)`

Sayı dizisi oluşturur.

```lua
local seq1 = table.generate_sequence(5)
print(dump(seq1))  -- { 1, 2, 3, 4, 5 }

local seq2 = table.generate_sequence(10, 2, 2)
print(dump(seq2))  -- { 2, 4, 6, 8, 10 }

local seq3 = table.generate_sequence(1, 5, -1)
print(dump(seq3))  -- { 5, 4, 3, 2, 1 }
```

### `table.only(table, only)`

Belirtilen anahtarlarla ***sadece*** veri içeren yeni bir tablo döndürür.

```lua
local data = { name = 'Alek', age = 25, city = 'Vladivostok', country = 'Russia' }
local filtered = table.only(data, { 'name', 'age' })
-- `filtered` `{ name = 'Alek', age = 25 }` içerir
print(filtered.name, filtered.age)    -- 'Alek', 25
print(filtered.city)                  -- nil
```

### `table.except(table, keys)`

Belirtilen anahtarlar ***olmadan*** veri içeren yeni bir tablo döndürür.  
(tabloyu kopyalar, belirtilen anahtarları ***hariç tutar***)

```lua
local data = { name = 'Alek', age = 25, city = 'Vladivostok', country = 'Russia' }
local filtered = table.except(data, { 'age', 'country' })
-- `filtered` `{ name = 'Alek', city = 'Vladivostok' }` içerir
print(filtered.name, filtered.city)      -- 'Alek', 'Vladivostok'
print(filtered.age,  filtered.country)   -- nil, nil
```

### `table.merge(table1, table2, overwrite?)`

Tabloları rekursif olarak birleştirir.

Varsayılan olarak, ilk tablo üzerine yazılmaz, yeni tablo oluşturulur.
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
İlk tabloyu üzerine yaz:
```lua
table.merge(defaults, user_config, true)
```
> [!TIP]
> Daha iyi okunabilirlik için [`table.overwrite()`](#table-overwrite-table1-table2) kullanın.

### `table.join(table1, table2, recursively?)`

`table2`'den eksik anahtarları `table1`'e ekler.  
Tablo olan değerler `table.copy()` kullanılarak kopyalanır.

```lua
local base     = { a = 1, b =  2        }
local addition = {        b = 10, c = 3 }

table.join(base, addition)
print(dump(base))  -- { a = 1, b = 2, c = 3 }
```
Eğer `recursively` `true` ise, fonksiyon sadece hem `table1` hem de `table2`'de olan değerler
için rekursif olarak uygulanır.
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

`table1`'i `table2`'den gelen değerlerle tamamen üzerine yazar.

[`table.merge(table1, table2, true)`](#table-merge-table1-table2-overwrite) için semantik varyant.

### `table.merge_values(table1, table2)`

İki tablonun değerlerini bir tabloda birleştirir, duplikatları kaldırır.  
Sıra korunur - önce `table1`'den değerler, sonra `table1`'de olmayan `table2`'den değerler.

```lua
local table1 = { 'apple', 'banana', 'cherry' }
local table2 = { 'banana', 'date', 'apple', 'elderberry' }

local merged = table.merge_values(table1, table2)
print(dump(merged))  -- { 'apple', 'banana', 'cherry', 'date', 'elderberry' }
```

### `table.map(table, callback, overwrite?)`

Fonksiyonu tablodaki her elemana uygular.  
`callback: fun(value: any, key: any): any` - değer ve anahtarı kabul eder, yeni değer döndürür.

Varsayılan olarak yeni bir tablo döndürür.

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

Eğer `overwrite` `true` ise, fonksiyon orijinal tabloyu değiştirir.
```lua
local data = { a = 10, b = 20 }
table.map(data, function(value, key) return value * 2 end, true)
print(dump(data))  -- { a = 20, b = 40 }
```

### `table` `.walk`/`.each(table, callback)`

Tablo üzerinde fonksiyonu uygulayarak iterasyon yapar (tabloyu değiştirmez).  
`callback: fun(value: any, key: any): void` - değer ve anahtarı kabul eder; hiçbir şey döndürmez.
```lua
local data = { a = 10, b = 20, c = 30 }
table.walk(data, function(value, key)
    print(key, value)
end)
-- a       10
-- c       30
-- b       20
```
Alternatif isim: `table.each()`
```lua
local data = { a = 10, b = 20, c = 30 }
table.each(data, function(value, key)
    data[key] = value * 2
    -- `data` upvalue'ına erişimi engelleyen bir şey yok. Şimdi `data` üzerine yazıldı.
end)
print(dump(data))  -- { a = 20, b = 40, c = 60 }
```

### `table.multiply_each_value(table, multiplier_table)`

Tablodaki her değeri, anahtara göre multiplier_table'dan karşılık gelen değerle çarpar.

```lua
local data = { a = 10, b = 20, c = 30 }
local multipliers = { a = 2, b = 0.5, c = 3 }

local result = table.multiply_each_value(data, multipliers)
print(dump(result))  -- { a = 20, b = 10, c = 90 }
-- Çarpanı olmayan anahtarlar değişmeden kalır
```

### `table.add_values(table1, table2, empty_value?, overwrite?)`

İki tablodan aynı anahtara sahip değerleri ekler.

```lua
local table1 = { a = 10, b = 20 }
local table2 = { b = 5, c = 15 }

local result = table.add_values(table1, table2)
print(dump(result))  -- { a = 10, b = 25, c = 15 }

-- Eksik anahtarlar için boş değerle
local result2 = table.add_values(table1, table2, 0)
print(dump(result2))  -- { a = 10, b = 25, c = 15 }
```

### `table.sub_values(table1, table2, empty_value?, overwrite?)`

Aynı anahtarlar için table2 değerlerini table1'den çıkarır.

```lua
local table1 = { a = 10, b = 20, c = 30 }
local table2 = { b = 5, c = 10, d = 5 }

local result = table.sub_values(table1, table2)
print(dump(result))  -- { a = 10, b = 15, c = 20, d = -5 }
```

### `table.mul_values(table1, table2, empty_value?, overwrite?)`

İki tablodan aynı anahtara sahip değerleri çarpar.

```lua
local table1 = { a = 2, b = 3 }
local table2 = { b = 4, c = 5 }

local result = table.mul_values(table1, table2)
print(dump(result))  -- { a = 2, b = 12, c = 5 }
```

### `table.div_values(table1, table2, empty_value?, overwrite?)`

Aynı anahtarlar için table1 değerlerini table2 değerlerine böler.

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

Değeri belirtilen aralığa sınırlar.  
Alternatif isim: `math.clamp()`.

```lua
local health = 150
local max_health = 100
local clamped_health = math.limit(health, 0, max_health)
print(clamped_health)  -- 100
```

### `math.is_within(value, min, max)`

Değerin aralıkta olduğunu kontrol eder (`min < value < max`).

```lua
print(math.is_within(5, 1, 10))   -- true
print(math.is_within(1, 1, 10))   -- false (sınırlar dahil değil)
print(math.is_within(10, 1, 10))  -- false
```

### `math.is_among(value, min, max)`

Değerin aralıkta olduğunu kontrol eder, sınırları dahil (`min <= value <= max`).

```lua
print(math.is_among(5, 1, 10))   -- true
print(math.is_among(1, 1, 10))   -- true
print(math.is_among(10, 1, 10))  -- true
```

### `math.is_in_range(value, min, max)`

Değerin yarı-açık aralıkta olduğunu kontrol eder `(min, max]` (`min < value <= max`).

```lua
print(math.is_in_range(5, 1, 10))   -- true
print(math.is_in_range(1, 1, 10))   -- false (minimuma eşit)
print(math.is_in_range(10, 1, 10))  -- true (maksimuma eşit)
```

### `math.is_near(value, near, gap?)`

Değerin belirtilen değere yakın olduğunu kontrol eder (`|value - near| <= gap`).

```lua
print(math.is_near(10, 12))        -- false (gap = 1 varsayılan)
print(math.is_near(11, 12))        -- true
print(math.is_near(10, 12, 3))     -- true (gap = 3)
```

### `math.quadratic_equation_roots(a, b, c)`

`y = a*x^2 + b*x + c` formundaki ikinci dereceden denklemi çözer.

```lua
local root1, root2 = math.quadratic_equation_roots(1, -5, 6)
print(root1, root2)  -- 3, 2

-- Gerçek kök yok
local r1, r2 = math.quadratic_equation_roots(1, 0, 1)
print(r1, r2)  -- nil, nil
```

### `math.point_on_circle(radius, angle)`

Daire üzerinde bir nokta hesaplar.

```lua
local x, z = math.point_on_circle(5, math.pi/4)
print(x, z)  -- 5 yarıçaplı dairede 45° açıda bir noktanın koordinatları
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
Mevcut dosyanın veya çağrı fonksiyonun dosyasının adını yığın derinliğine göre döndürür.
- `depth?` - çağrı yığınının derinliği (varsayılan `0`)
- `full?` - tam yolu göster (varsayılan `false`)
```lua
-- Dosyanın göreli yolunu al
print(__FILE__())  -- 'mods/Voxrame/helpers/src/lua_ext/debug.lua'

-- Dosyanın tam yolunu al
print(__FILE__(0, true))  -- '/home/alek13/projects/my-game/mods/Voxrame/helpers/src/lua_ext/debug.lua'

-- Çağrı yığınının 2 seviye üstündeki dosyayı al
print(__FILE__(2))  -- çağrı fonksiyonunu çağıran fonksiyonun dosyası
```

### `__LINE__(depth?)`
Mevcut satır numarasını veya çağrı fonksiyonun satır numarasını yığın derinliğine göre döndürür.
```lua
print(__LINE__())  -- 57

-- Çağrı fonksiyonunun satır numarasını al
print(__LINE__(1))  -- çağrı dosyasındaki satır numarası
```

### `__FILE_LINE__(depth?, full?)`

"Dosya:satır" formatında dosya ve satır döndürür.

```lua
print(__FILE_LINE__())  -- 'mods/Voxrame/helpers/src/lua_ext/debug.lua:65'

-- Tam yolla
print(__FILE_LINE__(0, true))  -- '/home/alek13/projects/my-game/mods/Voxrame/helpers/src/lua_ext/debug.lua:65'
```

### `__DIR__(depth?)`

Mevcut dosyanın veya çağrı fonksiyonun dosyasının dizinini yığın derinliğine göre döndürür.

```lua
print(__DIR__())  -- 'mods/Voxrame/helpers/src/lua_ext/'
```

### `__FUNC__(depth?)`

Mevcut fonksiyonun adını döndürür.

```lua
function my_function()
    print(__FUNC__())  -- 'my_function'
end
```

### `print_dump(depth, with_trace, ...)`

Geçirilen tüm parametrelerin `...` içeriğini yazdırır.  
Çıktıdan önce, dosya adı ve satır `@ <file>:<line>` ekler.

Eğer `with_trace` `true` ise, ek olarak yığın izi yazdırır.

> [!NOTE]
> Eğer [terminaliniz linkleri destekliyorsa](https://github.com/Alhadis/OSC8-Adoption), her `@ <file>:<line>` IDE açılışına bağlanacaktır, yapılandırma için `readme.md` bakın.

> [!TIP]
- Daha kısa sözdizimi için `pd()` ve `pdt()` kullanın. Aşağıdaki örnekler bakın.


### `pd(...)`

`print_dump` için kısaltma. `with_trace == false` ile `print_dump` çağırır.

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

`print_dump traced` için kısaltma. `with_trace == true` ile `print_dump` çağırır.

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

Fonksiyonun yürütme süresini ölçer.

```lua
local function heavy_calculation()
    local sum = 0
    for i = 1, 2000000 do
        sum = sum + math.random(1, 100) + math.sin(i)
    end
end

-- Sonuç çıktısı ile ölç
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


-- Çıktı olmadan ölç
local time, avg, count = debug.measure('calculation', heavy_calculation)
print(time, avg, count)
local time, avg, count = debug.measure('calculation', heavy_calculation)
print(time, avg, count)
-- output:
-- 33.075  43.170833333333 6
-- 33.135  41.737142857143 7
```

### `debug.mesure_print(name)`

Önceki ölçümlerin istatistiklerini `name` yazdırır, [`debug.measure(name, ....)`](#debug-measure-name-callback-print_result) çağrılarından elde edilir.

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

[Lua'daki `error()`](https://www.lua.org/manual/5.1/manual.html#pdf-error) ile benzer, ancak `message` belirtilen parametrelerle şablon string olabilir, [`string.format()`](https://www.lua.org/manual/5.1/manual.html#pdf-string.format) ile benzer.

```lua
local player_name = nil
errorf('Oyuncu '%s' bulunamadı', player_name)
-- Hata: Oyuncu 'nil' bulunamadı
```

<small style="color: var(--vp-c-text-2)">output (`debug` etkin olduğunda):</small>

```ansi
[93m@ [0m[33mmods/lord/Core/map/src/map/Corridor.lua[0m[97m:[0m[32m9[0m
[32m++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++[0m
[1m[91mERROR:[0m
[91m  Oyuncu `nil` bulunamadı[0m

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

###### Luanti'da Hata Yönetimi {#error-handling-warning}
> [!WARNING]
> Yığın izi ekstra satırlar içerecektir, çünkü Luanti belirtilen `level`'i [`core.error_handler()`](https://github.com/luanti-org/luanti/blob/3b67e73bc3402291bd3790dc2b8f3932be1b42b4/src/script/common/c_internal.cpp#L52) geçmez.

### `errorlf(message, level, ...)`

[`errorf()`](#errorf-message) gibi format stringi ve parametre geçebilir, ayrıca izleme seviyesi belirtebilirsiniz.

```lua
errorlf('Verilerde hata', 3, 'değer: %d', 42)
-- 3 seviye üstünde izleme ile hata
```
[Luanti'da hata yönetimi](#error-handling-warning) bakın

### `assertf(condition, message, ...)`

[Lua'daki `assert()`](https://www.lua.org/manual/5.1/manual.html#pdf-assert) ile benzer, ancak `message` olarak belirtilen parametrelerle format string belirtebilirsiniz, [`string.format()`](https://www.lua.org/manual/5.1/manual.html#5.4.1) ile benzer.  
> `condition` koşulu sağlanmazsa `errorf()` çağırır.

```lua
-- Player varsa yürütmeye devam et, yoksa hata
local player = nil
assertf(player, 'Oyuncu `%s` bulunamadı', player)
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

Dosyanın var olup olmadığını kontrol eder.

```lua
if io.file_exists('config.txt') then
    print('Yapılandırma dosyası bulundu')
else
    print('Yapılandırma dosyası eksik')
end
```

### `io.dirname(path)`

Yolun dizinini döndürür.

```lua
print(io.dirname('/home/user/project/file.txt'))  -- '/home/user/project'
print(io.dirname('relative/path/file.txt'))       -- 'relative/path'
print(io.dirname('file.txt'))                     -- '.'
```

### `io.write_to_file(filepath, content, mode?)`

İçeriği dosyaya yazar.

```lua
local success, error_code, error_message = io.write_to_file('data.txt', 'Hello, World!')

if success then
    print('Veri başarıyla yazıldı')
else
    print('Yazma hatası:', error_code, error_message)
end

-- Dosyanın sonuna ekle
io.write_to_file('log.txt', 'Yeni giriş\n', 'a')
```

### `io.read_from_file(filepath, mode?)`

Dosyadan tüm içeriği okur.  
Başarılı olursa dosya içeriği string ile veya hata durumunda `false, error_code, error_message` döndürür.

```lua
local content = io.read_from_file('config.json')
if content then
    print('Dosya içeriği:', content)
else
    print('Dosya okuma hatası')
end
```
Hata yönetimi
```lua
local success, error_code, error_message = io.read_from_file('nonexistent.txt')
if not success then
    print('Hata:', error_code, error_message)
end
-- Hata: 2       nonexistent.txt: No such file or directory
```
<small>veya:</small>

```lua
local success = io.read_from_file('nonexistent.txt')
if not success then
    local error_code, error_message = io.get_file_error()
    print('Hata:', error_code, error_message)
end
-- Hata: 2       nonexistent.txt: No such file or directory
```
İkili modda okuma
```lua
local binary_content = io.read_from_file('image.png', 'rb')
if binary_content then
    print('Dosya boyutu:', #binary_content, 'byte')
end
```

### `io.get_file_error()`

`io.read_from_file()` veya `io.write_to_file()` fonksiyonlarından son hata kodunu ve mesajını döndürür.

```lua
local success = io.read_from_file('nonexistent.txt')
if not success then
    local error_code, error_message = io.get_file_error()
    print('Hata:', error_code, error_message)
end
-- Output: Hata: 2       nonexistent.txt: No such file or directory
```
```lua
local success = io.write_to_file('/readonly/file.txt', 'data')
if not success then
    local error_code, error_message = io.get_file_error()
    print('Yazma hatası:', error_code, error_message)
end
-- Output: Yazma hatası: 13       /readonly/file.txt: Permission denied
```



## OS

### `os.DIRECTORY_SEPARATOR`

Mevcut işletim sistemi için dizin ayırıcı.

```lua
local DS = os.DIRECTORY_SEPARATOR

print(DS)  -- Linux/Mac'ta '/', Windows'ta '\'
print('folder' .. DS .. 'file.txt')
-- Linux/Mac'ta: 'folder/file.txt'
-- Windows'ta:   'folder\file.txt'
```
