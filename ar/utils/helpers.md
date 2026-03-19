---
layout: doc
title: المساعدون
---

# المساعدون

المساعدون هم مجموعة من وظائف المساعدة في لوا للعمل المريح في المشروع.

هذه الوظائف المساعدة توسع بشكل كبير قدرات لوا القياسية وتبسط التطوير.

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

**طرق مقدمة من Luanti:**

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

يحول السلسلة إلى أحرف صغيرة مع دعم السيريليك.

```lua
print(('ПРИВЕТ МИР'):lower())  -- 'привет мир'
```

### `string:upper()`

يحول السلسلة إلى أحرف كبيرة مع دعم السيريليك.

```lua
print(string.upper('привет мир'))  -- 'ПРИВЕТ МИР'
```

### `string:is_one_of(table)`

يتحقق مما إذا كانت السلسلة هي إحدى القيم في المصفوفة الممررة.  
(تناظر دلالي لـ [`table.contains`](#table-contains-table-value)، الذي يتحقق مما إذا كانت السلسلة مضمنة في المصفوفة الممررة.)

```lua
local text = 'hello'
local options = { 'hello', 'world', 'lua' }
print(text:is_one_of(options))  -- true
```

### `string:first_to_upper()`

يحول الحرف الأول إلى حرف كبير.

```lua
local text = 'hello world'
print(text:first_to_upper())  -- 'Hello world'
```

### `string` `:title()`/`:to_headline()`

يحول الحرف الأول من كل كلمة إلى title case.  
اسم بديل: `string:to_headline()`

```lua
local text = 'hello world from lua'
print(text:title())           -- 'Hello World From Lua'
print(text:to_headline())     -- 'Hello World From Lua'
```

### `string:starts_with(prefix)`

يتحقق مما إذا كانت السلسلة تبدأ بالبادئة المحددة.

```lua
local filename = 'config.json'
print(filename:starts_with('config'))    -- true
print(filename:starts_with('settings'))  -- false
```

### `string:ends_with(suffix)`

يتحقق مما إذا كانت السلسلة تنتهي باللاحقة المحددة.

```lua
local filename = 'config.json'
print(filename:ends_with('.json'))    -- true
print(filename:ends_with('.conf'))    -- false
```

### `string:contains(sub_string)`

يتحقق من وجود سلسلة فرعية.

```lua
local text = 'Hello, World !!!'
print(text:contains('World'))   -- true
print(text:contains('world'))   -- false (حساس لحالة الأحرف)
```

### `string:replace(pattern, replacement, n?)`

يستبدل السلسلة الفرعية (تناظر gsub، لكن يعيد السلسلة فقط بدون عدد الاستبدالات).  
انظر الوثائق لـ [`string.gsub`](https://www.lua.org/manual/5.4/manual.html#pdf-string.gsub) و [Patterns](https://www.lua.org/manual/5.4/manual.html#6.4.1)
```lua
local text = 'Hello, World, World!'
local result = text:replace('World', 'Lua')
print(result)  -- 'Hello, Lua, Lua!'

-- استبدل التكرار الأول فقط
local result2 = text:replace('World', 'Lua', 1)
print(result2)  -- 'Hello, Lua, World!'
```

### `string:remove(pattern, n?)`

يزيل السلسلة الفرعية.  
انظر الوثائق لـ [`string.gsub`](https://www.lua.org/manual/5.4/manual.html#pdf-string.gsub) و [Patterns](https://www.lua.org/manual/5.4/manual.html#6.4.1)

```lua
local text = 'Hello, World!'
print(text:remove(', '))        -- 'HelloWorld!'
print(text:remove('o', 1))      -- 'Hell, Wrld!' (احذف 'o' الأول فقط)
```

### `string:reg_escape()`

يهرب من الأحرف الخاصة للتعبيرات النمطية.  
انظر [Patterns](https://www.lua.org/manual/5.4/manual.html#6.4.1)

```lua
local pattern = 'file.txt'
print(pattern:reg_escape())      -- 'file%.txt'

local pattern2 = '^$()%.[]*+-?)'
print(pattern2:reg_escape())     -- '%^%$()%.%[%]%*%+\-%?)'
```

### `string:vxr_split(delimiter?, processor?)`

يقسم السلسلة حسب `delimiter` المحدد مع القدرة على معالجة الأجزاء.

Luanti لديه طريقة `string.split` الخاصة به، لكنها لا تدعم معالجة الأجزاء.  
هذه الطريقة تضيف القدرة على معالجة أجزاء السلسلة.

```lua
-- بدون معالجة
('hello world'):vxr_split()             -- { 'hello', 'world' }
('apple,banana,cherry'):vxr_split(',')  -- { 'apple', 'banana', 'cherry' }

-- مع المعالجة
local numbers = '1,2,3,4,5'
local squared = numbers:vxr_split(',', function(x)
    return tonumber(x)^2 
end)
print(squared[1], squared[2], squared[3], squared[4], squared[5])
-- 1 4 9 16 25
```


### `string.or_nil(value)`

يحول إلى سلسلة أو يعيد nil.

```lua
print(string.or_nil('hello'))     -- 'hello'
print(string.or_nil(42))          -- '42'
print(string.or_nil(nil))         -- nil
print(tostring(nil))              -- 'nil' (مقارنة)
```

---

#### طرق مقدمة من Luanti :

### Luanti `string.split()`

انظر أيضاً: [`string.vxr_split(delimiter?, processor?)`](#string-vxr_split-delimiter-processor)

يقسم السلسلة إلى أجزاء حسب الفاصل المحدد. يعيد مصفوفة من السلاسل.
الوسائط:
- `separator?`      الفاصل، افتراضي: `","`
- `include_empty?`  افتراضي: `false`
- `max_splits?`     إذا كان سالبًا، تقسيمات غير محدودة، افتراضي: `-1`
- `sep_is_pattern?` إذا كان الفاصل سلسلة عادية أو نمط (regex)، افتراضي: `false`


```lua
local text = 'apple,banana,cherry'
local parts = text.split(',')
print(parts[1], parts[2], parts[3])  -- 'apple', 'banana', 'cherry'

-- قسم حسب المسافات
local words = 'hello world lua'.split(' ')
print(words[1], words[2], words[3])  -- 'hello', 'world', 'lua'
```

### Luanti `string.trim()`

يزيل أحرف المسافة في بداية ونهاية السلسلة.

```lua
print(("\n \t\tfoo bar\t "):trim())  -- 'foo bar'
```

### Luanti `string.pack()`

يحزم القيم في سلسلة ثنائية حسب التنسيق.  
Backport [من Lua 5.4](https://www.lua.org/manual/5.4/manual.html#pdf-string.pack).

```lua
-- حزم الأعداد الصحيحة
local packed = string.pack('i4', 42)
print(#packed)  -- 4 (الحجم بالبايت)

-- حزم قيم متعددة
local data = string.pack('i4f8', 100, 3.14)
print(#data)  -- 12 (4 + 8 بايت)
```

### Luanti `string.unpack()`

يفك حزم السلسلة الثنائية إلى قيم حسب التنسيق.  
Backport [من Lua 5.4](https://www.lua.org/manual/5.4/manual.html#pdf-string.unpack).

```lua
local packed = string.pack('i4f8', 100, 3.14)
local num, float, next_pos = string.unpack('i4f8', packed)
print(num, float)      -- 100, 3.14
print(next_pos)        -- 13 (الموضع بعد فك الحزم)

-- فك حزم من الموضع المحدد
local value = string.unpack('i4', packed, 5)
print(value)            -- 3.14 (كـ float)
```

### Luanti `string.packsize()`

يعيد حجم السلسلة التي سيتم إنشاؤها بواسطة `string.pack`.  
Backport [من Lua 5.4](https://www.lua.org/manual/5.4/manual.html#pdf-string.packsize).

```lua
local size = string.packsize('i4f8')
print(size)  -- 12 (4 + 8 بايت)

-- للتنسيقات المعقدة
local complex_size = string.packsize('i4c10f8')
print(complex_size)  -- 22 (4 + 10 + 8 بايت)
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

**طرق، [المقدمة من Luanti](https://api.luanti.org/helper-functions/) :**

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

يعيد مصفوفة من مفاتيح الجدول.

```lua
local data = { name = 'Alek', age = 25, city = 'Vladivostok' }

local keys = table.keys(data)
-- `keys` يحتوي `{ 'name', 'age', 'city' }` (الترتيب قد يختلف)
```

### `table.values(table)`

يعيد مصفوفة من قيم الجدول.

```lua
local data = { name = 'Alek', age = 25, city = 'Vladivostok' }

local values = table.values(data)
-- `values` يحتوي { 'Alek', 25, 'Vladivostok' }
```

### `table.has_key(table, key)`

يتحقق مما إذا كان المفتاح موجودًا في الجدول.

```lua
local data = { name = 'Alek', age = 25 }
print(table.has_key(data, 'name'))   -- true
print(table.has_key(data, 'city'))   -- false
```

### `table` `.contains`/`has_value(table, value)`

يتحقق مما إذا كانت القيمة موجودة في الجدول.

```lua
local fruits = { 'apple', 'banana', 'cherry' }
print(table.contains(fruits, 'banana'))  -- true
print(table.contains(fruits, 'orange'))  -- false
```
يمكنك أيضًا استخدام [`string:is_one_of()`](#string-is_one_of-string):
```lua
print('banana':is_one_of(fruits))  -- true
print('orange':is_one_of(fruits))  -- false
```
اسم بديل: `table.has_value`
```lua
local data = { x = 10, y = 20 }
print(table.has_value(data, 10))     -- true
print(table.has_value(data, 30))     -- false
```

### `table.keys_of(table, value)`

يعيد جدولًا بالمفاتيح من الجدول المحدد التي لها القيمة المحددة.

```lua
local data = { a = 10, b = 20, c = 10, d = 30 }
local keys = table.keys_of(data, 10)
print(dump(keys))  -- { 'a', 'c' }

local keys2 = table.keys_of(data, 99)
print(keys2)  -- nil (لا يوجد مفاتيح كهذه)
```

### `table.has_any_key(table, find_keys)`

يتحقق مما إذا كانت مفاتيح الجدول تحتوي على قيمة واحدة على الأقل من المصفوفة المحددة.

```lua
local data = { name = 'test', age = 25, active = true }
local find_keys = { 'name', 'email', 'phone' }

print(table.has_any_key(data, find_keys))   -- true (المفتاح 'name' في find_keys)

local find_keys2 = { 'email', 'phone', 'address' }
print(table.has_any_key(data, find_keys2))  -- false
```

### `table.equals(table1, table2)`

يقارن بشكل متكرر جدولين من أجل المساواة الكاملة.

```lua
local table1 = { a = 1, b = { c = 2, d = 3 } }
local table2 = { a = 1, b = { c = 2, d = 3 } }
local table3 = { a = 1, b = { c = 2, d = 4 } }

print(table.equals(table1, table2))  -- true
print(table.equals(table1, table3))  -- false
```

### `table.is_empty(table)`

يتحقق مما إذا كان الجدول فارغًا.

```lua
print(table.is_empty({}))           -- true
print(table.is_empty({ a = 1 }))    -- false
```

### `table.is_position(table)`

يتحقق مما إذا كان الجدول يمثل إحداثيات.

```lua
print(table.is_position({ x = 10, y = 20, z = 30 }))  -- true
print(table.is_position({ x = 10, y = 20 }))          -- false
print(table.is_position({ a = 1, b = 2, c = 3 }))     -- false
```

### `table.each_value_is(table, value)`

يتحقق من أن جميع عناصر الجدول تساوي القيمة المحددة. افتراضيًا يتحقق لـ `true`.

```lua
local data1 = { true, true, true }
print(table.each_value_is(data1))  -- true

local data2 = { 5, 5, 5, 5 }
print(table.each_value_is(data2, 5))  -- true

local data3 = { 1, 2, 3 }
print(table.each_value_is(data3, 1))  -- false
```

### `table.count(table)`

يعد عدد العناصر في الجدول.
> [!NOTE]
> للجداول ذات المفاتيح الصحيحة، استخدم `#table`.  
> بما أن عامل التشغيل `#` لا يعمل على الجداول ذات المفاتيح غير الصحيحة، استخدم `table.count` لها.

```lua
local data = { a = 1, b = 2, c = 3 }
print(table.count(data))  -- 3
print(#data)              -- 0، لأن عامل التشغيل `#` لا يعمل مع المفاتيح غير الصحيحة.

local array = { 1, 2, 3, 4, 5 }
print(#array) -- 5
```

### `table.generate_sequence(max, start_from?, step?)`

ينشئ تسلسل أرقام.

```lua
local seq1 = table.generate_sequence(5)
print(dump(seq1))  -- { 1, 2, 3, 4, 5 }

local seq2 = table.generate_sequence(10, 2, 2)
print(dump(seq2))  -- { 2, 4, 6, 8, 10 }

local seq3 = table.generate_sequence(1, 5, -1)
print(dump(seq3))  -- { 5, 4, 3, 2, 1 }
```

### `table.only(table, only)`

يعيد جدولًا جديدًا يحتوي على بيانات ***فقط*** بالمفاتيح المحددة.

```lua
local data = { name = 'Alek', age = 25, city = 'Vladivostok', country = 'Russia' }
local filtered = table.only(data, { 'name', 'age' })
-- `filtered` يحتوي `{ name = 'Alek', age = 25 }`
print(filtered.name, filtered.age)    -- 'Alek', 25
print(filtered.city)                  -- nil
```

### `table.except(table, keys)`

يعيد جدولًا جديدًا يحتوي على بيانات ***بدون*** المفاتيح المحددة.  
(ينسخ الجدول، ***مستثنيًا*** المفاتيح المحددة)

```lua
local data = { name = 'Alek', age = 25, city = 'Vladivostok', country = 'Russia' }
local filtered = table.except(data, { 'age', 'country' })
-- `filtered` يحتوي `{ name = 'Alek', city = 'Vladivostok' }`
print(filtered.name, filtered.city)      -- 'Alek', 'Vladivostok'
print(filtered.age,  filtered.country)   -- nil, nil
```

### `table.merge(table1, table2, overwrite?)`

يدمج الجداول بشكل متكرر.

افتراضيًا، الجدول الأول لا يتم الكتابة عليه، يتم إنشاء جدول جديد.
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
اكتب على الجدول الأول:
```lua
table.merge(defaults, user_config, true)
```
> [!TIP]
- من الأفضل استخدام [`table.overwrite()`](#table-overwrite-table1-table2) لسهولة القراءة.

### `table.join(table1, table2, recursively?)`

يضيف المفاتيح المفقودة من `table2` إلى `table1`.  
القيم التي هي جداول يتم نسخها باستخدام `table.copy()`.

```lua
local base     = { a = 1, b =  2        }
local addition = {        b = 10, c = 3 }

table.join(base, addition)
print(dump(base))  -- { a = 1, b = 2, c = 3 }
```
إذا كان `recursively` هو `true`، فستُطبق الدالة بشكل متكرر فقط على القيم
التي هي جداول في كل من `table1` و `table2`.
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

يكتب بالكامل على `table1` بالقيم من `table2`.

متغير دلالي لـ [`table.merge(table1, table2, true)`](#table-merge-table1-table2-overwrite).

### `table.merge_values(table1, table2)`

يدمج قيم جدولين في واحد، يزيل التكرارات.  
الترتيب محفوظ - أولاً قيم من `table1`، ثم من `table2` التي لم تكن في `table1`.

```lua
local table1 = { 'apple', 'banana', 'cherry' }
local table2 = { 'banana', 'date', 'apple', 'elderberry' }

local merged = table.merge_values(table1, table2)
print(dump(merged))  -- { 'apple', 'banana', 'cherry', 'date', 'elderberry' }
```

### `table.map(table, callback, overwrite?)`

يطبق الدالة على كل عنصر في الجدول.  
`callback: fun(value: any, key: any): any` - يقبل القيمة والمفتاح، يعيد قيمة جديدة.

افتراضيًا يعيد جدولًا جديدًا.

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

إذا كان `overwrite` هو `true`، فالدالة تعدل الجدول الأصلي.
```lua
local data = { a = 10, b = 20 }
table.map(data, function(value, key) return value * 2 end, true)
print(dump(data))  -- { a = 20, b = 40 }
```

### `table` `.walk`/`.each(table, callback)`

يتكرر على الجدول مطبقًا الدالة (لا يعدل الجدول).  
`callback: fun(value: any, key: any): void` - يقبل القيمة والمفتاح؛ لا يعيد أي شيء.
```lua
local data = { a = 10, b = 20, c = 30 }
table.walk(data, function(value, key)
    print(key, value)
end)
-- a       10
-- c       30
-- b       20
```
اسم بديل: `table.each()`
```lua
local data = { a = 10, b = 20, c = 30 }
table.each(data, function(value, key)
    data[key] = value * 2
    -- لا شيء يمنع الوصول إلى upvalue `data`. الآن `data` تم الكتابة عليه.
end)
print(dump(data))  -- { a = 20, b = 40, c = 60 }
```

### `table.multiply_each_value(table, multiplier_table)`

يضرب كل قيمة في الجدول بالقيمة المقابلة من multiplier_table حسب المفتاح.

```lua
local data = { a = 10, b = 20, c = 30 }
local multipliers = { a = 2, b = 0.5, c = 3 }

local result = table.multiply_each_value(data, multipliers)
print(dump(result))  -- { a = 20, b = 10, c = 90 }
-- المفاتيح بدون مضاعب تبقى كما هي
```

### `table.add_values(table1, table2, empty_value?, overwrite?)`

يضيف قيم بنفس المفتاح من جدولين.

```lua
local table1 = { a = 10, b = 20 }
local table2 = { b = 5, c = 15 }

local result = table.add_values(table1, table2)
print(dump(result))  -- { a = 10, b = 25, c = 15 }

-- مع قيمة فارغة للمفاتيح المفقودة
local result2 = table.add_values(table1, table2, 0)
print(dump(result2))  -- { a = 10, b = 25, c = 15 }
```

### `table.sub_values(table1, table2, empty_value?, overwrite?)`

يطرح قيم table2 من table1 لنفس المفاتيح.

```lua
local table1 = { a = 10, b = 20, c = 30 }
local table2 = { b = 5, c = 10, d = 5 }

local result = table.sub_values(table1, table2)
print(dump(result))  -- { a = 10, b = 15, c = 20, d = -5 }
```

### `table.mul_values(table1, table2, empty_value?, overwrite?)`

يضرب القيم بنفس المفتاح من جدولين.

```lua
local table1 = { a = 2, b = 3 }
local table2 = { b = 4, c = 5 }

local result = table.mul_values(table1, table2)
print(dump(result))  -- { a = 2, b = 12, c = 5 }
```

### `table.div_values(table1, table2, empty_value?, overwrite?)`

يقسم قيم table1 على قيم table2 لنفس المفاتيح.

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

يحدد القيمة إلى النطاق المحدد.  
اسم بديل: `math.clamp()`.

```lua
local health = 150
local max_health = 100
local clamped_health = math.limit(health, 0, max_health)
print(clamped_health)  -- 100
```

### `math.is_within(value, min, max)`

يتحقق من أن القيمة داخل النطاق بشكل صارم (`min < value < max`).

```lua
print(math.is_within(5, 1, 10))   -- true
print(math.is_within(1, 1, 10))   -- false (الحدود غير مشمولة)
print(math.is_within(10, 1, 10))  -- false
```

### `math.is_among(value, min, max)`

يتحقق من أن القيمة داخل النطاق، بما في ذلك الحدود (`min <= value <= max`).

```lua
print(math.is_among(5, 1, 10))   -- true
print(math.is_among(1, 1, 10))   -- true
print(math.is_among(10, 1, 10))  -- true
```

### `math.is_in_range(value, min, max)`

يتحقق من أن القيمة داخل النطاق شبه المفتوح `(min, max]` (`min < value <= max`).

```lua
print(math.is_in_range(5, 1, 10))   -- true
print(math.is_in_range(1, 1, 10))   -- false (يساوي الحد الأدنى)
print(math.is_in_range(10, 1, 10))  -- true (يساوي الحد الأقصى)
```

### `math.is_near(value, near, gap?)`

يتحقق من أن القيمة قريبة من المحدد (`|value - near| <= gap`).

```lua
print(math.is_near(10, 12))        -- false (gap = 1 افتراضي)
print(math.is_near(11, 12))        -- true
print(math.is_near(10, 12, 3))     -- true (gap = 3)
```

### `math.quadratic_equation_roots(a, b, c)`

يحل معادلة تربيعية من الشكل `y = a*x^2 + b*x + c`.

```lua
local root1, root2 = math.quadratic_equation_roots(1, -5, 6)
print(root1, root2)  -- 3, 2

-- لا توجد جذور حقيقية
local r1, r2 = math.quadratic_equation_roots(1, 0, 1)
print(r1, r2)  -- nil, nil
```

### `math.point_on_circle(radius, angle)`

يحسب نقطة على دائرة.

```lua
local x, z = math.point_on_circle(5, math.pi/4)
print(x, z)  -- إحداثيات نقطة على دائرة نصف قطرها 5 عند زاوية 45°
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
يعيد اسم الملف الحالي أو ملف الدالة المستدعية حسب عمق المكدسة.
- `depth?` - عمق مكدسة الاستدعاء (افتراضي `0`)
- `full?` - أظهر المسار الكامل (افتراضي `false`)
```lua
-- احصل على المسار النسبي للملف
print(__FILE__())  -- 'mods/Voxrame/helpers/src/lua_ext/debug.lua'

-- احصل على المسار الكامل للملف
print(__FILE__(0, true))  -- '/home/alek13/projects/my-game/mods/Voxrame/helpers/src/lua_ext/debug.lua'

-- احصل على الملف 2 مستوى أعلى في مكدسة الاستدعاء
print(__FILE__(2))  -- ملف الدالة التي استدعت الدالة المستدعية
```

### `__LINE__(depth?)`
يعيد رقم السطر الحالي أو رقم سطر الدالة المستدعية حسب عمق المكدسة.
```lua
print(__LINE__())  -- 57

-- احصل على رقم سطر الدالة المستدعية
print(__LINE__(1))  -- رقم السطر في ملف الاستدعاء
```

### `__FILE_LINE__(depth?, full?)`

يعيد الملف والسطر بتنسيق "مسار/نسبي/إلى/ملف:سطر".

```lua
print(__FILE_LINE__())  -- 'mods/Voxrame/helpers/src/lua_ext/debug.lua:65'

-- مع المسار الكامل
print(__FILE_LINE__(0, true))  -- '/home/alek13/projects/my-game/mods/Voxrame/helpers/src/lua_ext/debug.lua:65'
```

### `__DIR__(depth?)`

يعيد الدليل من الملف الحالي أو ملف الدالة المستدعية حسب عمق المكدسة.

```lua
print(__DIR__())  -- 'mods/Voxrame/helpers/src/lua_ext/'
```

### `__FUNC__(depth?)`

يعيد اسم الدالة الحالية.

```lua
function my_function()
    print(__FUNC__())  -- 'my_function'
end
```

### `print_dump(depth, with_trace, ...)`

يطبع محتوى جميع المعلمات الممررة `...`.  
قبل الإخراج، يضيف اسم الملف والسطر `@ <file>:<line>`.

إذا كان `with_trace` هو `true`، يطبع أيضًا مكدسة الاستدعاء.

> [!NOTE]
- إذا كان [الطرف الخاص بك يدعم الروابط](https://github.com/Alhadis/OSC8-Adoption)، كل `@ <file>:<line` سيتم ربطه بفتح IDE، انظر `readme.md` للتكوين.

> [!TIP]
- استخدم `pd()` و `pdt()` لصياغة أكثر إيجازًا. انظر الأمثلة أدناه.


### `pd(...)`

اختصار لـ `print_dump`. يستدعي `print_dump` مع `with_trace == false`.

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

اختصار لـ `print_dump traced`. يستدعي `print_dump` مع `with_trace == true`.

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

يقيس وقت تنفيذ الدالة.

```lua
local function heavy_calculation()
    local sum = 0
    for i = 1, 2000000 do
        sum = sum + math.random(1, 100) + math.sin(i)
    end
end

-- قس مع إخراج النتيجة
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


-- قس بدون إخراج
local time, avg, count = debug.measure('calculation', heavy_calculation)
print(time, avg, count)
local time, avg, count = debug.measure('calculation', heavy_calculation)
print(time, avg, count)
-- output:
-- 33.075  43.170833333333 6
-- 33.135  41.737142857143 7
```

### `debug.mesure_print(name)`

يطبع إحصاءات القياسات السابقة `name` التي تم الحصول عليها من استدعاءات [`debug.measure(name, ....)`](#debug-measure-name-callback-print_result).

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

مشابه لـ [`error()` في Lua](https://www.lua.org/manual/5.1/manual.html#pdf-error)، لكن `message` يمكن أن يكون قالب سلسلة معوسائط محددة، مشابه لـ [`string.format()`](https://www.lua.org/manual/5.1/manual.html#pdf-string.format).

```lua
local player_name = nil
errorf('Player `%s` not found', player_name)
-- Error: Player `nil` not found
```

<small style="color: var(--vp-c-text-2)">output (عندما يكون `debug` مفعلاً):</small>

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

###### معالجة الأخطاء في Luanti {#error-handling-warning}
> [!WARNING]
- ستحتوي مكدسة الاستدعاء على خطوط إضافية، لأن Luanti [لا يمرر `level` المحدد](https://github.com/luanti-org/luanti/blob/3b67e73bc3402291bd3790dc2b8f3932be1b42b4/src/script/common/c_internal.cpp#L52) إلى `core.error_handler()`.

### `errorlf(message, level, ...)`

مثل في [`errorf()`](#errorf-message) يمكنك تمرير سلسلة تنسيق ووسائط، وأيضًا تحديد مستوى التتبع.

```lua
errorlf('خطأ في البيانات', 3, 'قيمة: %d', 42)
-- خطأ مع تتبع 3 مستويات أعلى
```
انظر [معالجة الأخطاء في Luanti](#error-handling-warning)

### `assertf(condition, message, ...)`

مشابه لـ [`assert()` في Lua](https://www.lua.org/manual/5.1/manual.html#pdf-assert)، لكن كـ `message` يمكنك تحديد سلسلة تنسيق مع وسائط، مشابه لـ [`string.format()`](https://www.lua.org/manual/5.1/manual.html#5.4.1).  
> يستدعي `errorf()` إذا لم يتم تحقيق شرط `condition`.

```lua
-- استمر التنفيذ إذا كان player موجودًا، وإلا خطأ
local player = nil
assertf(player, 'اللاعب `%s` غير موجود', player)
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

يتحقق مما إذا كان الملف موجودًا.

```lua
if io.file_exists('config.txt') then
    print('ملف التكوين موجود')
else
    print('ملف التكوين مفقود')
end
```

### `io.dirname(path)`

يعيد الدليل من المسار.

```lua
print(io.dirname('/home/user/project/file.txt'))  -- '/home/user/project'
print(io.dirname('relative/path/file.txt'))       -- 'relative/path'
print(io.dirname('file.txt'))                     -- '.'
```

### `io.write_to_file(filepath, content, mode?)`

يكتب المحتوى إلى ملف.

```lua
local success, error_code, error_message = io.write_to_file('data.txt', 'Hello, World!')

if success then
    print('تم كتابة البيانات بنجاح')
else
    print('خطأ في الكتابة:', error_code, error_message)
end

-- أضف إلى نهاية الملف
io.write_to_file('log.txt', 'إدخال جديد\n', 'a')
```

### `io.read_from_file(filepath, mode?)`

يقرأ كل المحتوى من ملف.  
يعيد سلسلة مع محتوى الملف في حالة النجاح أو `false, error_code, error_message` في حالة الخطأ.

```lua
local content = io.read_from_file('config.json')
if content then
    print('محتوى الملف:', content)
else
    print('خطأ في قراءة الملف')
end
```
معالجة الأخطاء
```lua
local success, error_code, error_message = io.read_from_file('nonexistent.txt')
if not success then
    print('خطأ:', error_code, error_message)
end
-- خطأ: 2       nonexistent.txt: No such file or directory
```
<small>أو:</small>

```lua
local success = io.read_from_file('nonexistent.txt')
if not success then
    local error_code, error_message = io.get_file_error()
    print('خطأ:', error_code, error_message)
end
-- خطأ: 2       nonexistent.txt: No such file or directory
```
القراءة في الوضع الثنائي
```lua
local binary_content = io.read_from_file('image.png', 'rb')
if binary_content then
    print('حجم الملف:', #binary_content, 'بايت')
end
```

### `io.get_file_error()`

يعيد رمز ورسالة الخطأ الأخير من وظائف `io.read_from_file()` أو `io.write_to_file()`.

```lua
local success = io.read_from_file('nonexistent.txt')
if not success then
    local error_code, error_message = io.get_file_error()
    print('خطأ:', error_code, error_message)
end
-- Output: خطأ: 2       nonexistent.txt: No such file or directory
```
```lua
local success = io.write_to_file('/readonly/file.txt', 'data')
if not success then
    local error_code, error_message = io.get_file_error()
    print('خطأ في الكتابة:', error_code, error_message)
end
-- Output: خطأ في الكتابة: 13       /readonly/file.txt: Permission denied
```



## OS

### `os.DIRECTORY_SEPARATOR`

فاصل الدليل لنظام التشغيل الحالي.

```lua
local DS = os.DIRECTORY_SEPARATOR

print(DS)  -- '/' في Linux/Mac، '\' في Windows
print('folder' .. DS .. 'file.txt')
-- في Linux/Mac: 'folder/file.txt'
-- في Windows:   'folder\file.txt'
```
