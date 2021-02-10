---
title: java-source-base
createdAt: 2021-02-08
categories: 
- java
- javase
tags: 
- java source
---

java 源码剖析，最近抽空去面试一家公司，然后面试官问及spring的beanfactory的源码流程，直接卡壳了，被鄙视一波，直接被定义为curd的程序员。

平时一般就遇到问题才会debug看源码调试，确实这方面比较薄弱，所以这里简单做个记录，部分文字来自互联网，最下面会列出相关链接，

**Tips: 这里jdk的版本是1.8**

<!--more-->

## Lang

### Integer

包装类，

```java
    private final int value;
```

##### 构造方法

```java
//构造一个新分配的 Integer 对象，它表示指定的 int 值。
public Integer(int value) {
    this.value = value;
}

//构造一个新分配的 Integer 对象，它表示 String 参数所指示的 int 值。
public Integer(String s) throws NumberFormatException {
    this.value = parseInt(s, 10);
}
```

##### valueOf(int i)方法

前面说到Integer中私有属性value的时候提到

```java
Integer i = new Integer(10);
i = 5;
```

其中`i=5`操作时，编译器会转成`i = Integer.valueOf(5);`执行。那么这里就解释一下valueOf(int i)方法是如何给变量赋值的。

```java
public static Integer valueOf(int i) {
    if (i >= IntegerCache.low && i <= IntegerCache.high)
        return IntegerCache.cache[i + (-IntegerCache.low)];
    return new Integer(i);
}
```

以上是valueOf方法的实现细节。通常情况下，IntegerCache.low=-128，IntegerCache.high=127（除非显示声明java.lang.Integer.IntegerCache.high的值），Integer中有一段动态代码块，该部分内容会在Integer类被加载的时候就执行。

```java
static {
        // high value may be configured by property
        int h = 127;
        String integerCacheHighPropValue =
            sun.misc.VM.getSavedProperty("java.lang.Integer.IntegerCache.high");
        if (integerCacheHighPropValue != null) {
            try {
                int i = parseInt(integerCacheHighPropValue);
                i = Math.max(i, 127);
                // Maximum array size is Integer.MAX_VALUE
                h = Math.min(i, Integer.MAX_VALUE - (-low) -1);
            } catch( NumberFormatException nfe) {
                // If the property cannot be parsed into an int, ignore it.
            }
        }
        high = h;

        cache = new Integer[(high - low) + 1];
        int j = low;
        for(int k = 0; k < cache.length; k++)
            cache[k] = new Integer(j++);

        // range [-128, 127] must be interned (JLS7 5.1.7)
        assert IntegerCache.high >= 127;
    }

```

也就是说，当Integer被加载时，就新建了-128到127的所有数字并存放在Integer数组cache中。

再回到valueOf代码，可以得出结论。**当调用valueOf方法（包括后面会提到的重载的参数类型包含String的valueOf方法）时，如果参数的值在-127到128之间，则直接从缓存中返回一个已经存在的对象。如果参数的值不在这个范围内，则new一个Integer对象返回。**

所以，当把一个int变量转成Integer的时候（或者新建一个Integer的时候），建议使用valueOf方法来代替构造函数。或者直接使用`Integer i = 100;`编译器会转成`Integer s = Integer.valueOf(100);`

### String

底层`final char[]`实现，jdk9之后使用`byte[]`提升性能，这也说明了string为何是不可变的，

```java
/** The value is used for character storage. */
private final char value[];

/** Cache the hash code for the string */
private int hash; // Default to 0
```

#### 构造方法

##### 参数为string类型

```java

    /**
     * Initializes a newly created {@code String} object so that it represents
     * the same sequence of characters as the argument; in other words, the
     * newly created string is a copy of the argument string. Unless an
     * explicit copy of {@code original} is needed, use of this constructor is
     * unnecessary since Strings are immutable.
     *
     * @param  original
     *         A {@code String}
     */
    public String(String original) {
        this.value = original.value;
        this.hash = original.hash;
    }
```

这里将直接将源 String 中的 value 和 hash 两个属性直接赋值给目标 String。因为 String 一旦定义之后是不可以改变的，所以也就不用担心改变源 String 的值会影响到目标 String 的值。

##### 参数为字符数组

```java

    /**
     * Allocates a new {@code String} so that it represents the sequence of
     * characters currently contained in the character array argument. The
     * contents of the character array are copied; subsequent modification of
     * the character array does not affect the newly created string.
     *
     * @param  value
     *         The initial value of the string
     */
    public String(char value[]) {
        this.value = Arrays.copyOf(value, value.length);
    }
```

当我们使用字符数组创建 String 的时候，会用到 Arrays.copyOf 方法或 Arrays.copyOfRange 方法。这两个方法是将原有的字符数组中的内容逐一的复制到 String 中的字符数组中。会创建一个新的字符串对象，随后修改的字符数组不影响新创建的字符串

##### 参数为字节数组

```java

    /**
     * Constructs a new {@code String} by decoding the specified array of
     * bytes using the specified {@linkplain java.nio.charset.Charset charset}.
     * The length of the new {@code String} is a function of the charset, and
     * hence may not be equal to the length of the byte array.
     *
     * <p> This method always replaces malformed-input and unmappable-character
     * sequences with this charset's default replacement string.  The {@link
     * java.nio.charset.CharsetDecoder} class should be used when more control
     * over the decoding process is required.
     *
     * @param  bytes
     *         The bytes to be decoded into characters
     *
     * @param  charset
     *         The {@linkplain java.nio.charset.Charset charset} to be used to
     *         decode the {@code bytes}
     *
     * @since  1.6
     */
    public String(byte bytes[], Charset charset) {
        this(bytes, 0, bytes.length, charset);
    }
```

char[] 字符数组是以 unicode 码来存储的，String 和 char 为内存形式。

byte 是网络传输或存储的序列化形式，所以在很多传输和存储的过程中需要将 byte[] 数组和 String 进行相互转化。

所以 String 提供了一系列重载的构造方法来将一个字符数组转化成 String，提到 byte[] 和 String 之间的相互转换就不得不关注编码问题，

我们在使用 byte[] 构造 String 的时候，如果没有指明解码使用的字符集的话，那么 StringCoding 的 decode 方法首先调用系统的默认编码格式，如果没有指定编码格式则默认使用 ISO-8859-1 编码格式进行编码操作

```java
        String csn = (charsetName == null) ? "ISO-8859-1" : charsetName;
```

##### 参数为StringBuffer，StringBuilder

```java

    /**
     * Allocates a new string that contains the sequence of characters
     * currently contained in the string buffer argument. The contents of the
     * string buffer are copied; subsequent modification of the string buffer
     * does not affect the newly created string.
     *
     * @param  buffer
     *         A {@code StringBuffer}
     */
    public String(StringBuffer buffer) {
        synchronized(buffer) {
            this.value = Arrays.copyOf(buffer.getValue(), buffer.length());
        }
    }

```

```java

    /**
     * Allocates a new string that contains the sequence of characters
     * currently contained in the string builder argument. The contents of the
     * string builder are copied; subsequent modification of the string builder
     * does not affect the newly created string.
     *
     * <p> This constructor is provided to ease migration to {@code
     * StringBuilder}. Obtaining a string from a string builder via the {@code
     * toString} method is likely to run faster and is generally preferred.
     *
     * @param   builder
     *          A {@code StringBuilder}
     *
     * @since  1.5
     */
    public String(StringBuilder builder) {
        this.value = Arrays.copyOf(builder.getValue(), builder.length());
    }
```

这个比较少使用，主要使用`StringBuffer.toString`方法

##### 特殊的protected构造方法

```java
   /*
    * Package private constructor which shares value array for speed.
    * this constructor is always expected to be called with share==true.
    * a separate constructor is needed because we already have a public
    * String(char[]) constructor that makes a copy of the given char[].
    */
    String(char[] value, boolean share) {
        // assert share : "unshared not supported";
        this.value = value;
    }
```

第一个区别：该方法多了一个参数：boolean share，其实这个参数在方法体中根本没被使用。注释说目前不支持 false，只使用 true。那可以断定，加入这个 share 的只是为了区分于 String(char[] value) 方法，不加这个参数就没办法定义这个函数，只有参数是不同才能进行重载。

第二个区别：具体的方法实现不同。我们前面提到过 String(char[] value) 方法在创建 String 的时候会用到 Arrays 的 copyOf 方法将 value 中的内容逐一复制到 String 当中，而这个 String(char[] value, boolean share) 方法则是直接将 value 的引用赋值给 String 的 value。那么也就是说，这个方法构造出来的 String 和参数传过来的 char[] value 共享同一个数组。

这个特殊的方法因为共享数组，所以性能比较好，

不过可能产生内存泄露，所以现在用的地方也不是很多，以我现在的版本，jdk1.8来看，下面有使用这个构造方法，

```java
Integer

​	toString

Long

​	toString

String

​	concat

​	replace

​	valueOf

StringBuffer

​	toString
```

#### 其他方法

##### getBytes

```java

    /**
     * Encodes this {@code String} into a sequence of bytes using the given
     * {@linkplain java.nio.charset.Charset charset}, storing the result into a
     * new byte array.
     *
     * <p> This method always replaces malformed-input and unmappable-character
     * sequences with this charset's default replacement byte array.  The
     * {@link java.nio.charset.CharsetEncoder} class should be used when more
     * control over the encoding process is required.
     *
     * @param  charset
     *         The {@linkplain java.nio.charset.Charset} to be used to encode
     *         the {@code String}
     *
     * @return  The resultant byte array
     *
     * @since  1.6
     */
    public byte[] getBytes(Charset charset) {
        if (charset == null) throw new NullPointerException();
        return StringCoding.encode(charset, value, 0, value.length);
    }
```

这个最好指定编码，不然不同系统的操作结果会不一致

##### equals

```java

    /**
     * Compares this string to the specified object.  The result is {@code
     * true} if and only if the argument is not {@code null} and is a {@code
     * String} object that represents the same sequence of characters as this
     * object.
     *
     * @param  anObject
     *         The object to compare this {@code String} against
     *
     * @return  {@code true} if the given object represents a {@code String}
     *          equivalent to this string, {@code false} otherwise
     *
     * @see  #compareTo(String)
     * @see  #equalsIgnoreCase(String)
     */
    public boolean equals(Object anObject) {
        if (this == anObject) {
            return true;
        }
        if (anObject instanceof String) {
            String anotherString = (String)anObject;
            int n = value.length;
            if (n == anotherString.value.length) {
                char v1[] = value;
                char v2[] = anotherString.value;
                int i = 0;
                while (n-- != 0) {
                    if (v1[i] != v2[i])
                        return false;
                    i++;
                }
                return true;
            }
        }
        return false;
    }
```

通过源码的代码，我们可以了解它比较的流程：字符串相同：地址相同；地址不同，但是内容相同 这是一种提高效率的方法，也就是将比较快速的部分（地址，比较对象类型）放在前面比较，速度慢的部分（比较字符数组）放在后面执行。

##### contentEquals

```java

    /**
     * Compares this string to the specified {@code CharSequence}.  The
     * result is {@code true} if and only if this {@code String} represents the
     * same sequence of char values as the specified sequence. Note that if the
     * {@code CharSequence} is a {@code StringBuffer} then the method
     * synchronizes on it.
     *
     * @param  cs
     *         The sequence to compare this {@code String} against
     *
     * @return  {@code true} if this {@code String} represents the same
     *          sequence of char values as the specified sequence, {@code
     *          false} otherwise
     *
     * @since  1.5
     */
    public boolean contentEquals(CharSequence cs) {
        // Argument is a StringBuffer, StringBuilder
        if (cs instanceof AbstractStringBuilder) {
            if (cs instanceof StringBuffer) {
                synchronized(cs) {
                   return nonSyncContentEquals((AbstractStringBuilder)cs);
                }
            } else {
                return nonSyncContentEquals((AbstractStringBuilder)cs);
            }
        }
        // Argument is a String
        if (cs instanceof String) {
            return equals(cs);
        }
        // Argument is a generic CharSequence
        char v1[] = value;
        int n = v1.length;
        if (n != cs.length()) {
            return false;
        }
        for (int i = 0; i < n; i++) {
            if (v1[i] != cs.charAt(i)) {
                return false;
            }
        }
        return true;
    }
```

**StringBuffer 需要考虑线程安全问题，加锁之后再调用**

##### hashCode

```java

    /**
     * Returns a hash code for this string. The hash code for a
     * {@code String} object is computed as
     * <blockquote><pre>
     * s[0]*31^(n-1) + s[1]*31^(n-2) + ... + s[n-1]
     * </pre></blockquote>
     * using {@code int} arithmetic, where {@code s[i]} is the
     * <i>i</i>th character of the string, {@code n} is the length of
     * the string, and {@code ^} indicates exponentiation.
     * (The hash value of the empty string is zero.)
     *
     * @return  a hash code value for this object.
     */
    public int hashCode() {
        int h = hash;
        if (h == 0 && value.length > 0) {
            char val[] = value;

            for (int i = 0; i < value.length; i++) {
                h = 31 * h + val[i];
            }
            hash = h;
        }
        return h;
    }
```

hashCode 的实现其实就是使用数学公式:

` s[0]*31^(n-1) + s[1]*31^(n-2) + ... + s[n-1]`

> 为什么要使用这个公式，就是在存储数据计算 hash 地址的时候，我们希望尽量减少有同样的 hash 地址。如果使用相同 hash 地址的数据过多，那么这些数据所组成的 hash 链就更长，从而降低了查询效率。 所以在选择系数的时候要选择尽量长的系数并且让乘法尽量不要溢出的系数，因为如果计算出来的 hash 地址越大，所谓的“冲突”就越少，查找起来效率也会提高。

选择31作为因子的原因: [why-does-javas-hashcode-in-string-use-31-as-a-multiplier](https://stackoverflow.com/questions/299304/why-does-javas-hashcode-in-string-use-31-as-a-multiplier)

排名第一答案引用 Joshua Bloch's [Effective Java](https://rads.stackoverflow.com/amzn/click/com/0321356683) 的原话

> The value 31 was chosen because it is an odd prime. If it were even and the multiplication overflowed, information would be lost, as multiplication by 2 is equivalent to shifting. The advantage of using a prime is less clear, but it is traditional. A nice property of 31 is that the multiplication can be replaced by a shift and a subtraction for better performance: `31 * i == (i << 5) - i`. Modern VMs do this sort of optimization automatically.

简单翻译一下：

> 选择数字31是因为它是一个奇质数，如果选择一个偶数会在乘法运算中产生溢出，导致数值信息丢失，因为乘二相当于移位运算。选择质数的优势并不是特别的明显，但这是一个传统。同时，数字31有一个很好的特性，即乘法运算可以被移位和减法运算取代，来获取更好的性能：`31 * i == (i << 5) - i`，现代的 Java 虚拟机可以自动的完成这个优化。

排名第二的答案设这样说的：

> As Goodrich and Tamassia point out, If you take over 50,000 English words (formed as the union of the word lists provided in two variants of Unix), using the constants 31, 33, 37, 39, and 41 will produce less than 7 collisions in each case. Knowing this, it should come as no surprise that many Java implementations choose one of these constants.

这段话也翻译一下：

> 正如 Goodrich 和 Tamassia 指出的那样，如果你对超过 50,000 个英文单词（由两个不同版本的 Unix 字典合并而成）进行 hash code 运算，并使用常数 31, 33, 37, 39 和 41 作为乘子，每个常数算出的哈希值冲突数都小于7个，所以在上面几个常数中，常数 31 被 Java 实现所选用也就不足为奇了。

上面的两个答案完美的解释了 Java 源码中选用数字 31 的原因。

对这个感兴趣的也可以看看大佬的博客[科普：为什么 String hashCode 方法选择数字31作为乘子](https://segmentfault.com/a/1190000010799123)

#### intern

```java

    /**
     * Returns a canonical representation for the string object.
     * <p>
     * A pool of strings, initially empty, is maintained privately by the
     * class {@code String}.
     * <p>
     * When the intern method is invoked, if the pool already contains a
     * string equal to this {@code String} object as determined by
     * the {@link #equals(Object)} method, then the string from the pool is
     * returned. Otherwise, this {@code String} object is added to the
     * pool and a reference to this {@code String} object is returned.
     * <p>
     * It follows that for any two strings {@code s} and {@code t},
     * {@code s.intern() == t.intern()} is {@code true}
     * if and only if {@code s.equals(t)} is {@code true}.
     * <p>
     * All literal strings and string-valued constant expressions are
     * interned. String literals are defined in section 3.10.5 of the
     * <cite>The Java&trade; Language Specification</cite>.
     *
     * @return  a string that has the same contents as this string, but is
     *          guaranteed to be from a pool of unique strings.
     */
    public native String intern();
```

intern方法是Native调用，它的作用是在方法区中的常量池里寻找等值的对象，如果没有找到则在常量池中存放当前字符串的引用并返回该引用，否则直接返回常量池中已存在的String对象引用

##### 字符串字面量

字符串字面量是在 Java™语言规范的[3.10.5. String 字面量](https://docs.oracle.com/javase/specs/jls/se8/html/jls-3.html#jls-3.10.5)中定义的 关于字面量通俗点解释就是，使用双引号`""`创建的字符串，在堆中创建了对象后其引用插入到字符串常量池中（jdk1.7后），可以全局使用，遇到相同内容的字面量，就不需要再次创建。举个例子：

```
//这就是创建了一个aaa字符串字面量
String a = "aaa";
//简单来说，这就是创建了一个Stirng对象和一个aaa字符串字面量，后面会详细讨论
String a = new String("aaa")
```

##### 字符常量池 String Table

这个字符串常量池的位置也是随着jdk版本的不同而位置不同。在jdk6中，常量池的位置在永久代（方法区）中，此时常量池中存储的是**对象**。在jdk7中，常量池的位置在堆中，此时，常量池存储的就是**引用**了。在jdk8中，永久代（方法区）被元空间取代了。

##### 字面量是何时进入常量池

详情参照 [new String(“字面量”) 中 “字面量” 是何时进入字符串常量池的?](https://www.zhihu.com/question/55994121)

简单来说：

- HotSpot VM的实现来说，加载类的时候，那些字符串字面量会进入到当前类的运行时常量池，不会进入全局的字符串常量池 ;

- 在字面量赋值的时候，会翻译成字节码ldc指令，ldc指令触发**lazy resolution**动作

  > - 到当前类的运行时常量池（runtime constant pool，HotSpot VM里是ConstantPool + ConstantPoolCache）去查找该index对应的项
  > - 如果该项尚未resolve则resolve之，并返回resolve后的内容。
  > - 在遇到String类型常量时，resolve的过程如果发现StringTable已经有了内容匹配的java.lang.String的引用，则直接返回这个引用;
  > - 如果StringTable里尚未有内容匹配的String实例的引用，则会在Java堆里创建一个对应内容的String对象，然后在StringTable记录下这个引用，并返回这个引用出去。

##### String“+”符号的实现

在我们使用中经常会用到+符号来拼接字符串，但是这个+符号在String中的实现还是有讲究的。如果是相加含有String对象，则底部是使用StringBuilder实现的拼接的

```
String str1 ="str1";
String str2 ="str2";
String str3 = str1 + str2;
复制代码
```

如果相加的参数只有字面量或者常量或基础类型变量，则会直接编译为拼接后的字符串。

```
String str1 =1+"str2"+"str3"；
复制代码
```

**这里有个小细节**
 如果使用字面量拼接的话，java常量池里是不会保存拼接的参数的，而是直接编译成拼接后的字符串保存，我们看看这段代码：

```
        String str1 = new String("aa"+"bb");
        //String str3 = "aa";
        String str2 = new StringBuilder("a").append("a").toString();
        System.out.println(str2==str2.intern());
复制代码
```

这段代码的输出是`true`。可以得知，在str1变量的创建中，虽然我们用了字面量“aa”，但是我们常量池里并没有aa，所以`str2==str.intern()`才会返回`true`。如果我们去掉str3的注释，重新运行，就会输出`false`。

### Enum

##### 反编译

```java
public enum Color {
    Red,
    Blue
}

```

```java
/usr/bin/javap -p todo.core.source.java.lang.enums.Color
Compiled from "Color.java"
public final class todo.core.source.java.lang.enums.Color extends java.lang.Enum<todo.core.source.java.lang.enums.Color> {
  public static final todo.core.source.java.lang.enums.Color Red;
  public static final todo.core.source.java.lang.enums.Color Blue;
  private static final todo.core.source.java.lang.enums.Color[] $VALUES;
  public static todo.core.source.java.lang.enums.Color[] values();
  public static todo.core.source.java.lang.enums.Color valueOf(java.lang.String);
  private todo.core.source.java.lang.enums.Color();
  static {};
}
```

可以看到枚举类反编译的结果是一个 `final class Color extend java.lang.Enum`

声明的枚举值反编译结果是一个`static final Color Red `

可以看出，enmu关键字是java提供给我们的一个语法糖，

编译器不让我们继承Enum，但是当我们使用enum关键字定义一个枚举的时候，他会帮我们在编译后默认继承java.lang.Enum类，而不像其他的类一样默认继承Object类。且采用enum声明后，该类会被编译器加上final声明，故该类是无法继承的。 

PS：由于JVM类初始化是线程安全的，所以可以采用枚举类实现一个线程安全的单例模式。

##### 变量

```java

/**
 * This is the common base class of all Java language enumeration types.
 *
 * More information about enums, including descriptions of the
 * implicitly declared methods synthesized by the compiler, can be
 * found in section 8.9 of
 * <cite>The Java&trade; Language Specification</cite>.
 *
 * <p> Note that when using an enumeration type as the type of a set
 * or as the type of the keys in a map, specialized and efficient
 * {@linkplain java.util.EnumSet set} and {@linkplain
 * java.util.EnumMap map} implementations are available.
 *
 * @param <E> The enum type subclass
 * @author  Josh Bloch
 * @author  Neal Gafter
 * @see     Class#getEnumConstants()
 * @see     java.util.EnumSet
 * @see     java.util.EnumMap
 * @since   1.5
 */
public abstract class Enum<E extends Enum<E>>
        implements Comparable<E>, Serializable {
```

```java
    /**
     * The name of this enum constant, as declared in the enum declaration.
     * Most programmers should use the {@link #toString} method rather than
     * accessing this field.
     */
    private final String name;


    /**
     * The ordinal of this enumeration constant (its position
     * in the enum declaration, where the initial constant is assigned
     * an ordinal of zero).
     *
     * Most programmers will have no use for this field.  It is designed
     * for use by sophisticated enum-based data structures, such as
     * {@link java.util.EnumSet} and {@link java.util.EnumMap}.
     */
    private final int ordinal;
```

在Enum中，有两个成员变量，一个是名字(name)，一个是序号(ordinal)。

 序号是一个枚举常量，表示在枚举中的位置，从0开始，依次递增。

##### 构造方法

```java

    /**
     * Sole constructor.  Programmers cannot invoke this constructor.
     * It is for use by code emitted by the compiler in response to
     * enum type declarations.
     *
     * @param name - The name of this enum constant, which is the identifier
     *               used to declare it.
     * @param ordinal - The ordinal of this enumeration constant (its position
     *         in the enum declaration, where the initial constant is assigned
     *         an ordinal of zero).
     */
    protected Enum(String name, int ordinal) {
        this.name = name;
        this.ordinal = ordinal;
    }
```

前面我们说过，Enum是一个抽象类，不能被实例化，但是他也有构造函数，从前面我们反编译出来的代码中，我们也发现了Enum的构造函数，在Enum中只有一个保护类型的构造函数

##### 单例模式

枚举很适合作为单例模式，主要有如下原因，

###### 代码简单

```java
public enum EasySingleton{
    INSTANCE;
}
```

###### 线程安全

当一个Java类第一次被真正使用到的时候静态资源被初始化、Java类的加载和初始化过程都是线程安全的。所以，**创建一个enum类型是线程安全的**。

###### 自己处理序列化

我们知道，以前的所有的单例模式都有一个比较大的问题，就是一旦实现了Serializable接口之后，就不再是单例得了，因为，每次调用 readObject()方法返回的都是一个新创建出来的对象，有一种解决办法就是使用readResolve()方法来避免此事发生。但是，**为了保证枚举类型像Java规范中所说的那样，每一个枚举类型极其定义的枚举变量在JVM中都是唯一的，在枚举类型的序列化和反序列化上，Java做了特殊的规定。**原文如下：

> Enum constants are serialized differently than ordinary serializable or externalizable objects. The serialized form of an enum constant consists solely of its name; field values of the constant are not present in the form. To serialize an enum constant, ObjectOutputStream writes the value returned by the enum constant’s name method. To deserialize an enum constant, ObjectInputStream reads the constant name from the stream; the deserialized constant is then obtained by calling the java.lang.Enum.valueOf method, passing the constant’s enum type along with the received constant name as arguments. Like other serializable or externalizable objects, enum constants can function as the targets of back references appearing subsequently in the serialization stream. The process by which enum constants are serialized cannot be customized: any class-specific writeObject, readObject, readObjectNoData, writeReplace, and readResolve methods defined by enum types are ignored during serialization and deserialization. Similarly, any serialPersistentFields or serialVersionUID field declarations are also ignored–all enum types have a fixedserialVersionUID of 0L. Documenting serializable fields and data for enum types is unnecessary, since there is no variation in the type of data sent.

大概意思就是说，在序列化的时候Java仅仅是将枚举对象的name属性输出到结果中，反序列化的时候则是通过java.lang.Enum的valueOf方法来根据名字查找枚举对象。同时，编译器是不允许任何对这种序列化机制的定制的，因此禁用了writeObject、readObject、readObjectNoData、writeReplace和readResolve等方法。 我们看一下这个`valueOf`方法：

```java

    /**
     * Returns the enum constant of the specified enum type with the
     * specified name.  The name must match exactly an identifier used
     * to declare an enum constant in this type.  (Extraneous whitespace
     * characters are not permitted.)
     *
     * <p>Note that for a particular enum type {@code T}, the
     * implicitly declared {@code public static T valueOf(String)}
     * method on that enum may be used instead of this method to map
     * from a name to the corresponding enum constant.  All the
     * constants of an enum type can be obtained by calling the
     * implicit {@code public static T[] values()} method of that
     * type.
     *
     * @param <T> The enum type whose constant is to be returned
     * @param enumType the {@code Class} object of the enum type from which
     *      to return a constant
     * @param name the name of the constant to return
     * @return the enum constant of the specified enum type with the
     *      specified name
     * @throws IllegalArgumentException if the specified enum type has
     *         no constant with the specified name, or the specified
     *         class object does not represent an enum type
     * @throws NullPointerException if {@code enumType} or {@code name}
     *         is null
     * @since 1.5
     */
    public static <T extends Enum<T>> T valueOf(Class<T> enumType,
                                                String name) {
        T result = enumType.enumConstantDirectory().get(name);
        if (result != null)
            return result;
        if (name == null)
            throw new NullPointerException("Name is null");
        throw new IllegalArgumentException(
            "No enum constant " + enumType.getCanonicalName() + "." + name);
    }
```

从代码中可以看到，代码会尝试从调用`enumType`这个`Class`对象的`enumConstantDirectory()`方法返回的`map`中获取名字为`name`的枚举对象，如果不存在就会抛出异常。再进一步跟到`enumConstantDirectory()`方法，就会发现到最后会以反射的方式调用`enumType`这个类型的`values()`静态方法，也就是上面我们看到的编译器为我们创建的那个方法，然后用返回结果填充`enumType`这个`Class`对象中的`enumConstantDirectory`属性。

所以，**JVM对序列化有保证。**

综上，建议使用枚举实现单例模式，

## Set







## 相关链接

[java学习笔记](https://juejin.cn/post/6844903740986621966)

