---
title: MySQL Note
pathsuffix: mysql-note
comments: false
date: 2021-02-11 08:01:04
tags: mysql
category: 技术
---

# (1) 基本命令

+ 登录
```
// -h 指定连接的主机
// -P 指定端口
// -u 指定用户
// -p 指定密码
mysql -h localhost -P 3306 -u root -p root1234
```
![](img1.png)

+ 退出
```
exit
```
![](img2.png)

+ 查看所有数据库
```
show databases;
```
![](img3.png)

+ 打开某个数据库
```
use sys;
```
![](img4.png)

+ 显示数据库内的表
```
show tables;
```
![](img5.png)

+ 显示指定数据库内的表
```
show tables from mysql;
```
![](img6.png)

+ 查看当前所在数据库
```
select database();
```
![](img7.png)

+ 创建数据库
```
create database test;
```
![](img8.png)

+ 创建表
```
create table user_info(id int, name varchar(20));
```
![](img9.png)

+ 查看表结构
```
desc user_info;
```
![](img10.png)

+ 插入数据
```
insert into user_info(id,name) value(1,'Kavan');
```

+ 查看表中的数据
```
select * from user_info;
```
![](img11.png)

+ 修改表内的数据
```
update user_info set name='KavanLiu' where id=1;
```
![](img12.png)

+ 删除数据
```
delete from user_info where id=1;
```
![](img13.png)

+ 查看数据库版本
```
select version();
```
![](img14.png)

+ 命令行查看版本
```
mysql --version
mysql -V
```
![](img15.png)

# (2) 查询

## 表结构
+ departments
![departments](departments.png)

+ employees
![employees](employees.png)

+ jobs
![jobs](jobs.png)

+ locations
![locations](locations.png)

+ job_grades
![job_grades](job_grades.png)

## 基础查询

```
USE myemployees;
/*
语法：SELECT 查询的东西 FROM 表名;

特点：
1、可以查询表中的字段、常量值、表达式、函数
2、查询结果是虚拟表格
*/

# 1、查询单个字段
SELECT last_name FROM employees;

# 2、查询多个字短
SELECT last_name,salary,email FROM employees;

# 3、查询所有字段
SELECT * FROM employees;

# 4、查询常量值（字符型和日期型必须用引号引起来）
SELECT 100;
SELECT 'jhon';

# 5、查询表达式
SELECT 100*98;
SELECT 100%98;

# 6、查询函数
SELECT VERSION();

# 7、为字段起别名
SELECT 100%98 AS Result;
SELECT last_name AS 姓,first_name AS 名 FROM employees;
SELECT last_name 姓,first_name 名 FROM employees;
SELECT last_name AS "姓 名" FROM employees;

# 8、去重（只能针对单个字段去重，多个字段不支持。假如支持，第一个字段去重后，第二个字段查询出来可能不完整）
SELECT DISTINCT department_id FROM employees;

# 9、+ 的作用（只能当作运算符，不能当作字符串的连接符）
SELECT '100'+6; # 会试图将字符转换成数值型进行运算，
SELECT 'jhon'+6; # 转换失败，字符取值为0
SELECT null+6; # 只要存在null，结果就为null
# 连接多个字段使用concat函数
SELECT CONCAT(last_name,first_name) AS 姓名 FROM employees;

# 10、IFNULL(expr1,expr2) 如果值为null，使用第二个参数代替
SELECT IFNULL(commission_pct,0) FROM employees;

# 11、ISNULL() 判断字段或表达式是否为null，是返回1，否则返回0
SELECT ISNULL(commission_pct),commission_pct FROM employees;
```

## 条件查询
```
USE myemployees;
/*
语法：SELECT 查询的东西 FROM 表名 WHERE 筛选条件;

分类：
1、按条件表达式('>', '<', '=', '!=', '<>', '>=', '<='>)筛选
2、按逻辑表达式('&&', '||', '!', 'AND', 'OR', 'NOT')筛选
3、模糊('LIKE', 'BETWEEN AND', 'IN', 'IS NULL', 'IS NOT NULL')筛选
*/

# 按条件表达式
SELECT * FROM employees WHERE salary>12000;
SELECT last_name,department_id FROM employees WHERE department_id<>90;

# 按逻辑表达式
SELECT last_name,salary,commission_pct FROM employees WHERE salary>=10000 AND salary<=10000;
SELECT * FROM employees WHERE department_id<90 OR department_id>100 OR salary>15000;
SELECT * FROM employees WHERE NOT(department_id>=90 AND department_id<=100) OR salary>15000);

# 模糊查询(一般和通配符搭配使用)
# 通配符：
# % 任意多个字符，包含0个字符
# _ 任意单个字符

# 名字中包含字符'a'的员工信息
SELECT * FROM employees WHERE last_name LIKE '%a%';

# 名字中第三个字符为e，第五个字符为a的员工名字和工资
SELECT last_name,salary FROM employees WHERE last_name LIKE '___e_a%';

# 名字中第二个字符为下划线的员工
SELECT * FROM employees WHERE last_name LIKE '_\_%';
# 指定转移字符
SELECT * FROM employees WHERE last_name LIKE '_$_%' ESCAPE '$';

# between and (包含临界值)
SELECT * FROM employees WHERE department_id BETWEEN 90 AND 100;

# IN 列表内不能使用通配符
SELECT last_name,job_id FROM employees WHERE job_id IN('IT_PROT', 'AD_VP', 'AD_PRES');

# IS NULL / IS NOT NULL （IS 不能代替'='使用）
# 没奖金的员工
SELECT last_name,commission_pct FROM employees WHERE commission_pct IS NULL;
# 有奖金的员工
SELECT last_name,commission_pct FROM employees WHERE commission_pct IS NOT NULL;

# 安全等于 <=>
# 没奖金的员工
SELECT last_name,commission_pct FROM employees WHERE commission_pct <=> NULL;
SELECT last_name,salary FROM employees WHERE salary <=> 12000;
```

## 排序查询
```
/*
语法：SELECT 查询的东西 FROM 表名 WHERE 筛选条件 ORDER BY 排序的列表 ASC|DESC;

ASC 代表升序
DESC 代表降序
默认不写代表升序
*/

# 公司从高到低排序
SELECT * FROM employees ORDER BY salary DESC;

# 按年薪排序
SELECT *,salary*12*(1+IFNULL(commission_pct,0)) AS 年薪 FROM employees ORDER BY salary*12*(1+IFNULL(commission_pct,0)) ASC;
# 支持别名
SELECT *,salary*12*(1+IFNULL(commission_pct,0)) AS 年薪 FROM employees ORDER BY 年薪 ASC;

# 按名字长度排序
SELECT LENGTH(last_name) AS 名字长度,last_name FROM employees ORDER BY 名字长度 DESC;

# 先按工资排序，再按员工编号排序
SELECT * FROM employees ORDER BY salary ASC,employee_id DESC;
```

# (3) 单行函数

> 语法：SELECT 函数名(实参列表) FROM 表名;

1. 字符函数
```
# LENGTH() 返回字节长度
SELECT LENGTH('jhon'); # 返回4
SELECT LENGTH('张三'); # 返回6
SELECT LENGTH(last_name) FROM employees;

# CONCAT()
SELECT CONCAT(last_name,first_name) FROM employees;

# UPPER() LOWER()
SELECT UPPER('jhon');
SELECT CONCAT(UPPER(last_name),first_name) FROM employees;

# SUBSTR() SUBSTRING()
SELECT SUBSTR('王二麻子',2); #返回 二麻子，索引从1开始
# 第三个参数指字符长度
SELECT SUBSTR('大河弯弯向东流',3，2); # 返回 弯弯

# INSTR()
SELECT INSTR('abcdefg',bcd); #返回2，返回起始索引，第一次出现的索引，找不到返回0

#TRIM()
SELECT TRIM('    张三 ');
SELECT TRIM('a' FROM 'aaaaa张a三aaa'); # 返回 张a三

#LPAD() RPAD() # 左填充，右填充，用指定字符填充到指定长度
SELECT LPAD('李二狗子',10,'*'); # 最后总字符为10，
SELECT LPAD('李二狗子',2,'*'); # 返回 李二

#REPLACE()
SELECT REPLACE('李二狗子','二'，'三'); #返回 李三狗子
```
2. 数学函数
```
# ROUND() 四舍五入
SELECT ROUND(1.45); #返回1
SELECT ROUND(1.65); #返回2
SELECT ROUND(-1.65); #返回-2
SELECT ROUND(1.567，2); #返回1.57

 #CEIL() 向上取整，返回>=该参数的最小整数
SELECT CEIL(1.02); #返回2
SELECT CEIL(-1.02); #返回-1

#FLOOR() 向下取整，返回<=该参数的最大整数
SELECT FLOOR(1.02); #返回1
SELECT FLOOR(-1.02); #返回-2

#TRUNCATE() 截断
SELECT TRUNCATE(1.65，1); #小数点后保留1位，返回1.6

#MOD() 取余 MOD(a,b) => a-a/b*b
SELECT MOD(10,3); # 返回1
```
3. 日期函数
```
# NOW() 返回系统时间
SELECT NOW(); #返回 2021-01-31 12:02:29

# CURDARE();
SELECT CURDARE(); #返回 2021-01-31

# CURTIME();
SELECT CURTIME(); #返回 12:04:24

# 获取日期指定部分
# YEAR()  MONTH()  MONTHNAME() DAY()  HOUR() .....
SELECT YEAR(NOW());
SELECT YEAR('2021-1-31');
SELECT YEAR(hiredate) FROM employees;

# STR_TO_DATE() 将日期格式的字符转化成日期类型
SELECT STR_TO_DATE('9-13-2021','%m-%d-%Y'); # 返回 2021-09-13
```
![](img16.png)

```
# 通过日期查询
SELECT * FROM employees WHERE hiredate = '2021-1-31'
SELECT * FROM employees WHERE hiredate = STR_TO_DATE('1-31 2021','%m-%d %Y');

# DATE_FORMAT()
DATE_FORMAT('2021.1.31','%Y年%m月%d日')
```
4. 其他函数
```
SELECT VERSION();
SELECT DATABASE();
SELECT USER();
```

+ 流程控制函数
```
# IF(expr1,expr2,expr3); 表达式expr1成立返回expe2否则返回expr3

# CASE 表达式
CASE 要判断的字段或表达式
WHEN 常量1 THEN 要显示的语句1或值1（语句后需要带分号 ;）
WHEN 常量2 THEN 要显示的语句2或值2（语句后需要带分号 ;）
WHEN 常量3 THEN 要显示的语句3或值3（语句后需要带分号 ;）
ELSE 默认要显示的语句或值
END

SELECT salary AS 原始工资,department_id,
CASE department_id
WHEN 30 THEN salary*1.1
WHEN 40 THEN salary*1.2
WHEN 40 THEN salary*1.3
ELSE salary
END AS 新工资 FROM employees;

CASE
WHEN 条件1 THEN 要显示的语句1或值1（语句后需要带分号 ;）
WHEN 条件2 THEN 要显示的语句2或值2（语句后需要带分号 ;）
WHEN 条件3 THEN 要显示的语句3或值3（语句后需要带分号 ;）
ELSE 默认要显示的语句或值
END

SELECT salary,
CASE
WHEN salary>20000 THEN 'A'
WHEN salary>15000 THEN 'B'
WHEN salary>10000 THEN 'C'
ELSE 'D'
END AS 工资级别 FROM employees;
```

# (4) 分组函数

```
SELECT SUM(salary) FROM employees;
SELECT AVG(salary) FROM employees;
SELECT MAX(salary) FROM employees;
SELECT MIN(salary) FROM employees;
SELECT COUNT(salary) FROM employees; #非空值个数

SELECT SUM(DISTINCT salary) FROM employees;

SELECT COUNT(*) FROM employees; # 统计行数
SELECT COUNT(1) FROM employees; # 统计行数

SELECT DATEDIFF('2021-2-11','2021-1-31'); # 日期之间相差天数
```

# (5) 分组查询

> 语法：
SELECT column_name, function(column_name)
FROM table_name
WHERE column_name operator value
GROUP BY column_name;

```
SELECT job_id, MAX(salary)
FROM employees
GROUP BY job_id;

SELECT COUNT(*),location_id
FROM departments
GROUP BY location_id;

# 分组前筛选
SELECT department_id,AVG(salary)
FROM employees
WHERE email LIKE '%a%'
GROUP BY department_id;

SELECT MAX(salary),manager_id
FROM employees
WHERE commission_pct IS NOT NULL
GROUP BY manager_id;

# Q:哪个部门员工数>2
# 查询每个部门员工数
SELECT COUNT(*),department_id
FROM employees
GROUP BY department_id;

# 分组之后再筛选
SELECT COUNT(*),department_id
FROM employees
GROUP BY department_id
HAVING COUNT(*) > 2;

# 查询每个工种有奖金的员工且最高工资>12000的工种编号和最高工资
SELECT MAX(salary),job_id
FROM employees
WHERE commission_pct IS NOT NULL
GRPOP BY job_id
HAVING MAX(salary) > 12000;

# 查询领导编号>102的每个领导手下员工最低工资>5000的领导编号,以及其最低工资
SELECT manager_id,MIN(salary)
FROM employees
WHERE manager_id > 102
GROUP BY manager_id; 
HAVING MIN(salary) > 5000;

# 按函数分组
SELECT COUNT(*) count,LENGTH(last_name) name
FROM employees
GROUP BY name
HAVING count > 5;

# 按多个字段分组
# 每个部门每个工种的平均工资 (部门和工种相同的为一组)
SELECT AVG(salary),department_id,job_id
FROM employees
GROUP BY department_id,job_id;
```

# (6) 多表查询（连接查询/多表连接）

+ 年代：
        sql92标准：仅支持内连接
        sql99标准：支持 内连接+外连接（左外、右外）+全外连接
+ 功能：
    1、内连接
        等值连接
        非等值连接
        自连接
    2、外连接
        左外连接
        右外连接
        全外连接
    3、交叉连接

## sql92
+ 等值连接
```
# 查询男女对应的名字
SELECT `name`,boyName
FROM boys,beauty
WHERE beauty.boyfriend_id = boys.id;

# 查询员工名和对应的部门名
SELECT last_name,department_name
FROM employees,departments
WHERE employees.department_id = departments.department_id;

# 查询员工名，工种号，工种名(起别名，起别名后，原来的表名失效)
SELECT last_name,e.job_id,job_title
FROM employees AS e,jobs AS j
WHERE e.job_id = j.job_id;

# 加入筛选
SELECT last_name,department_name
FROM employees AS e,departments AS d
WHERE e.department_id = d.department_id
AND e.department_id ID NOT NULL;

# 三表查询
SELECT last_name,department_name,city
FROM employees AS e,departments AS d,locations AS l
WHERE e.department_id = d.department_id
AND d.location_id = l.location_id;
```

+ 非等值连接
```
# 查询员工工资和工资级别
SELECT salary,grade_level
FROM employees e,job_grades g
WHERE salary BETWEEN g.lowest_sal AND g.highest_sal;
```

+ 自连接
```
# 查询员工名以及他上级名称
SELECT e.employee_id,e.last_name,m.employee_id,m.last_name
FROM employees e,employees m,
WHERE e.manager_id = m.employee_id;
```

## sql99
+ 语法：
```
SELECT 查询列表
FROM 表1 别名 [连接类型] 表2 别名
ON 连接条件
[WHERE 筛选条件]
[GROUP BY 分组]
[HAVING 筛选条件]
[ORDER BY 排序列表]
```

#### 内连接
> INNER JOIN（内连接,或等值连接）：获取两个表中字段匹配关系的记录。
+ 等值连接
```
# 查询员工名和部门名
SELECT last_name,department_name
FROM employees AS e
INNER JOIN departments AS d
ON e.department_id = d.department_id;

# 名字中包含e的员工名和工种名
SELECT last_name,job_name
FROM employees AS e
INNER JOIN jobs AS j
ON e.job_id = j.job_id
WHERE e.last_name LIKE '%e%';

# 部门个数>3的城市名和部门个数
SELECT city,COUNT(*)
FROM locations AS l
INNER JOIN departments AS d
ON l.location_id = d.location_id
GROUP BY city
HAVING COUNT(*) > 3;

# 查询哪个部门的员工个数>3的部门名和员工个数，并按个数降序
SELECT department_name,COUNT(*)
FROM departments AS d
INNER JOIN employees AS e
ON e.department_id = d.department_id
GROUP BY department_name
HAVING COUNT(*) > 3
ORDER BY COUNT(*) DESC;

# 查询员工名、部门名、工种名，并按照部门名降序
SELECT last_name,department_name,job_title
FROM employees AS e
INNER JOIN departments AS d ON d.department_id = e.department_id
INNER JOIN jobs AS j ON j.job_id = e.job_id
ORDER BY department_name DESC;
```

+ 非等值连接
```
SELECT salary,grade_level
FROM employees AS e
INNER JOIN job_grades AS g
ON e.salary BETWEEN g.lowest_sal AND g.highest_sal;
```

+ 自连接
```
# 查询员工名字和上级名字
SELECT e.last_name,m.last_name
FROM employees AS e
INNER JOIN employees AS m
ON e.manager_id = m.employee_id;
```

#### 外连接
> LEFT [OUTER] JOIN（左连接）：获取左表所有记录，即使右表没有对应匹配的记录。
> RIGHT [OUTER] JOIN（右连接）： 与 LEFT JOIN 相反，用于获取右表所有记录，即使左表没有对应匹配的记录。
> FULL [OUTER] JOIN

```
# 左连接
# 查询没男朋友的女生
SELECT b.*,bo.id
FROM beauty AS b
LEFT OUTER JOIN boys AS bo
ON b.boyfriend_id = bo.id
WHERE  bo.id IS NULL;

# 左连接
# 查询哪个部门没有员工
SELECT d.*,e.employee_id
FROM departments AS d
LEFT OUTER JOIN employees AS e
ON e.department_id = d.department_id
WHERE d.employee_id IS NULL;

# 右连接
# 查询哪个部门没有员工
SELECT d.*,e.employee_id
FROM employees AS e
RIGHT OUTER JOIN departments AS d
ON e.department_id = d.department_id
WHERE d.employee_id IS NULL;

# 交叉连接
SELECT b.*,bo.*
FROM boys AS bo
CROSS OUTER JOIN beauty AS b;

eg.
# 查询编号>3的女生所对应男生信息
SELECT b.*,bo,id
FROM beauty AS b
LEFT OUTER JOIN boys AS bo
ON b.boyfrienf_id = b.id
WHERE b.id > 3;

# 查询哪个城市没有部门
SELECT city,d.department_id
FROM locations AS l
LEFT OUTER JOIN departments AS d
ON l.location_id = d.location_id
WHERE d.department_id IS NULL;

# 查询[部门名]为SAL和IT的员工信息
SELECT e.*,department_name
FROM employees AS e
RIGHT JOIN departments AS d
ON e.department_id = d.department_id
WHERE department_name IN('SAL','IT');
```

# (7) 子查询（内查询）

> 出现在其他语句中的SELECT语句，叫做子查询或者内查询。
> 外部的查询叫做主查询或外查询。
> 子查询可以在使用表达式的任何地方使用，并且必须在括号中关闭。


#### WHERE子句中（1）
```
# 在位于美国(USA)的办公室工作的员工。
SELECT 
    lastName, firstName
FROM
    employees
WHERE
    officeCode IN (SELECT 
            officeCode
        FROM
            offices
        WHERE
            country = 'USA');

# 查询找到其付款大于平均付款的客户
SELECT 
    customerNumber, checkNumber, amount
FROM
    payments
WHERE
    amount > (SELECT 
            AVG(amount)
        FROM
            payments);


# 查找没有下过任何订单的客户
SELECT 
    customerName
FROM
    customers
WHERE
    customerNumber NOT IN (SELECT DISTINCT
            customerNumber
        FROM
            orders);
```

#### FROM子句中（1）
> 从子查询返回的结果集将用作临时表,该表称为派生表或物化子查询。
```
# 查询将查找订单表中的最大，最小和平均数
SELECT 
    MAX(items), MIN(items), FLOOR(AVG(items))
FROM
    (SELECT 
        orderNumber, COUNT(orderNumber) AS items
    FROM
        orderdetails
    GROUP BY orderNumber) AS lineitems;
```
以上sql语句来自[易百教程](https://www.yiibai.com/mysql/subquery.html)


#### WHERE子句中（2）
```
# 谁的工资比Abel高
SELECT  *
FROM employees
WHERE salary > (
    SELECT salary
    FROM employees AS e
    WHERE e.last_name = 'Abel'
);

# 返回job_id与141号员工相同，salary比143号员工多的员工姓名，job_id,和工资
SELECT last_name,job_id,salary
FROM employees
WHERE job_id = (
    SELECT job_id
    FROM employees
    WHERE employee_id = '141'
)
AND salary > (
    SELECT salary
    FROM employees
    WHERE employee_id = '143'
);

# 返回公司工资最少的员工的last_name，job_id，salary
SELECT last_name,job_id,salary
FROM employees
WHERE salary = (
    SELECT MIN(salary)
    FROM employees
);

# 最低工资大于50号部门最低工资的部门id和其最低工资

# 错误语句
SELECT department_id,MIN(salary)
FROM employees
WHERE MIN(salary) > (
    SELECT MIN(salary)
    FROM employees
    WHERE department_id = '50'
);
# 正确语句
SELECT department_id,MIN(salary)
FROM employees
GROUP BY department_id
HAVING MIN(salary) > (
    SELECT MIN(salary)
    FROM employees
    WHERE department_id = '50'
);
```

> where 子句的作用是对查询结果进行分组前，将不符合where条件的行去掉，即在分组之前过滤数据，where条件中不能包含聚组函数，使用where条件过滤出特定的行。
> having 子句的作用是筛选满足条件的组，即在分组之后过滤数据，条件中经常包含聚组函数，使用having 条件过滤出特定的组，也可以使用多个分组标准进行分组。


```
# 返回location_id是1400和1700部门中所有员工姓名
SELECT last_name
FROM employees
WHERE department_id IN(
    SELECT department_id
    FROM departments
    WHERE location_id = 1400
    OR location_id = 1700
);

# 返回其他工种中比job_id为'IT_PROG'的部门任意工资低的员工的工号，姓名，job_id，salary
SELECT last_name,job_id,salary,employee_id
FROM employees
WHERE salary < ANY(
    SELECT salary
    FROM employees
    WHERE job_id = 'IT_PROG'
)
AND job_id <> 'IT_PROG';
# 或者
SELECT last_name,job_id,salary,employee_id
FROM employees
WHERE salary < MAX(
    SELECT salary
    FROM employees
    WHERE job_id = 'IT_PROG'
)
AND job_id <> 'IT_PROG';

# 返回其他部门中比job_id为'IT_PORG'的部门所有工资都低的员工的工号，姓名，job_id，salary
SELECT last_name,job_id,salary,employee_id
FROM employees
WHERE salary < ALL(
    SELECT salary
    FROM employees
    WHERE job_id = 'IT_PROG'
)
AND job_id <> 'IT_PROG';
#或者
SELECT last_name,job_id,salary,employee_id
FROM employees
WHERE salary < (
    SELECT MIN(salary)
    FROM employees
    WHERE job_id = 'IT_PROG'
)
AND job_id <> 'IT_PROG';

# 查询员工编号最小而且工资最高的员工信息
SELECT *
FROM employees
WHERE employee_id = (
    SELECT MIN(employee_id)
    FROM employees
)
AND salary = (
    SELECT MAX(salary)
    FROM employees
);
# 或者
SELECT *
FROM employees
WHERE (employee_id,salary) = (
    SELECT MIN(employee_id),MAX(salary)
    FROM employees
);
```

#### SELECT子句中

```
# 查询每个部门员工个数
SELECT d.*,(
    SELECT COUNT(*)
    FROM employees AS e
    WHERE e.department_id = d.department_id
) AS 员工个数
FROM departments AS d;
```

#### FROM子句中（2）
```
# 每个部门平均工资的工资等级
SELECT *,g.level
FROM (
    SELECT AVG(salary) AS avg,department_id
    FROM employees AS e
    GROUP BY e.department_id
) AS ag_dep
INNER JOIN job_grades AS g
ON ag_dep.avg
BETWEEN g.lowest_sal
AND g.heigth_sal;

# 比较
SELECT *,g.level
FROM (
    SELECT AVG(salary) AS avg,department_id
    FROM employees AS e
    GROUP BY e.department_id
) AS ag_dep
LEFT OUTER JOIN job_grades AS g
ON ag_dep.avg
BETWEEN g.lowest_sal
AND g.heigth_sal;
```

#### EXISTS子句中（相关子查询）
> 判断子查询中有没有值
```
SELECT EXISTS(
    SELECT * FROM employees
);

# 查询有员工的部门名
SELECT department_name
FROM departments AS d
WHERE (
    SELECT *
    FROM employees AS e
    WHERE e.department_id = d.department_id
);
# 或者
SELECT department_name
FROM departments AS d
WHERE d.department_id IN(
    SELECT e.department_id
    FROM employees AS e
);
```

## 子查询景点场景
1. 查询工资最低的员工信息
```
SELECT *
FROM employees
WHERE salary = (
    SELECT MIN(salary)
    FROM employees
);
```
2. 查询平均工资最低的部门信息
```
SELECT d.*
FROM departments AS d
WHERE d.department_id = (
    SELECT department_id
    FROM employees
    GROUP BY department_id
    HAVING AVG(salary) = (
        SELECT MIN(ag)
        FROM (
            SELECT AVG(salary) AS ag,department_id
            FROM employees
            GROUP BY department_id
        ) AS ag_dep
    ) 
);
# 或者
SELECT *
FROM departments
WHERE department_id = (
    SELECT department_id
    FROM employees
    GROUP BY department_id
    ORDER BY AVG(salary) ASC
    LIMIT 0,1
);
```
3. 查询平均工资最低的部门信息和该部门平均工资
```
SELECT d.*,ag
FROM departments AS d
JOIN (
    SELECT AVG(salary) AS ag,department_id
    FROM employees
    GROUP BY department_id
    ORDER BY AVG(salary) ASC
    LIMIT 0,1
) AS ag_dep
ON d.department_id = ag_dep.department_id;
```
4. 查询平均工资最高的job信息 
```
SELECT *
FROM jobs
WHERE job_id = (
    SELECT  job_id
    FROM employees
    GROUP BY job_id
    ORDER BY AVG(salary) DESC
    LIMIT 0,1
);
```
5. 查询平均工资高于公司平均工资的部门
```
SELECT AVG(salary),department_id
FROM employees
GROUP BY department_id
HAVING AVG(salary) > (
    SELECT AVG(salary)
    FROM employees
);
```
6. 查询公司所有manager的详细信息
```
SELECT *
FROM employees
WHERE employee_id IN(
    SELECT DISTINCT manager_id
    FROM employees
);
```
7. 查询各部门中最高工资 中最低的那个部门，最低工资
```
select MIN(salary),department_id
FROM employees
WHERE department_id = (
    SELECT department_id
    FROM employees
    GROUP BY department_id
    ORDER BY MAX(salary) ASC
    LINIT 0,1
);
```
8. 查询平均工资最高的部门的manager详细信息
```
SELECT *
FROM employees AS e
INNER JOIN departments AS d
ON e.employee_id = d.manager_id
WHERE d.department_id = (
    SELECT department_id
    FROM employees
    GROUP BY department_id
    ORDER BY AVG(salary) DESC
    LIMIT 0,1
);
```

# (8) 分页查询

> SELECT * FROM 表 LIMIT (page - 1) * size, size;

```
# 查询前五条员工信息
SELECT * FROM employees LIMIT 0, 5;

# 查询11-25条员工信息
SELECT * FROM employees LIMIT 10, 15;

# 有奖金的员工信息，工资较高的前10名
SELECT *
FROM employees
WHERE commission_pct IS NOT NULL
ORDER BY salary DESC
LIMIT 0, 10; 
```

# (9) 联合查询

> 将多条语句的查询结果合并成一个结果，多用于多个表没有连接关系时使用
要求多条语句查询列数一样，顺序一样，会去掉重复项目，不去重使用`UNION ALL `

```
# 部门编号>90或者邮箱中包含a的员工信息
# 普通查询
SELECT *
FROM employees
WHERE email LIKE '%a%'
OR department_id > 90;

# 联合查询
SELECT *
FROM employees
WHERE email LIKE '%a%'
UNION
SELECT *
FROM employees
WHERE department_id > 90;
```

# (10) 插入语句

> 语法1：
INSERT INTO table_name ( field1, field2,...fieldN )
VALUES
( value1, value2,...valueN );

> 语法2：
INSERT INTO table_name
SET
field1 = value1, field2 = value2,... fieldN = valueN;

```
INSERT INTO boys
SET id=19,name='Kavan',phone='180xxxxxxxx';
```

> 语法1 支持插入多条数据
```
INSERT INTO beauty
VALUES(13,'小唐','女','1990-4-23','18888888888',NULL,2),
(14,'小张','女','1991-4-23','18988888888',NULL,2);
```

> 语法1 支持子查询
```
INSERT INTO beauty(id,name,phone)
SELECT 26,'小宋','15888888888';

INSERT INTO beauty(id,name,phone)
SELECT id,name,phone
FROM boys
WHERE id=26;
```

# (11) 更新语句

> 语法：
UPDATE table_name SET field1=new-value1, field2=new-value2
[WHERE Clause]

```
# 修改beauty表中姓唐的女生电话为15888888888
UPDATE beauty
SET phone='15888888888'
WHERE name LIKE '唐%'
```

> 多表更新
语法：
UPDATE table_1
INNER ｜ LEFT ｜ RIGHT JOIN  table_2
ON 连接条件
SET field1=new-value1, field2=new-value2
[WHERE Clause]
```
# 修改张无忌女友手机号18989898989
UPDATE boys AS b
INNER JOIN beauty AS bu
ON bu.boyfriend_id = b.id
SET bu.phone = '18989898989'
WHERE b.name = '张无忌';

# 修改没有男友的女生的男友编号为张飞
UPDATE boys AS b
RIGHT JOIN beauty AS bu
ON bo.boyfriend_id = b.id
SET bu.boyfriend_id = 2
WHERE b.id IS NULL;
```

# (12) 删除语句

> 语法1：
DELETE FROM table_name [WHERE Clause];

> 多表删除
语法：
DELETE 表一的别名，表二的别名
FROM 表一 AS 别名
INNER ｜ LEFT ｜ RIGHT JOIN 表二 AS 别名
ON 连接条件
WHERE 筛选条件;
```
# 删除张无忌女友信息
DELETE b
FROM boys AS b
INNER JOIN beauty AS bu
ON bu.boyfriend_id = b.id
WHERE b.boyName = '张无忌';

# 删除黄晓明以及其女友记录
DELETE b,bu
FROM boys AS b
INNER JOIN beauty AS bu
ON bu.boyfriend_id = b.id
WHERE b.boyName = '黄晓明';
```

> 语法2：(自增长列归位，相当于刚创建的空表，删除语句没有返回值，删除后不能回滚)
TRUNCATE TABLE table_name;

# (13) 表和库的管理

> 操作
创建：CREATE
修改：ALTER
删除：DROP

## 库
+ 创建
> CREATE DATABASE database_name;
创建之前加判断
CREATE DATABASE IF NOT EXISTS database_name;

+ 修改
一般不修改，之前有个RENAME关键字修改数据库名字，后来由于安全原因废弃了，可以直接到数据库存储文件位置修改文件夹名字

> 改数据库的字符集
ALTER DATABASE database_name CHARACTER SET gbk;

+ 删除
> DROP DATABASE database_name;
删除之前判断
DROP IF EXISTS database_name;

## 表
+ 创建
> CREATE TABLE table_name (column_name column_type []);
```
CREATE TABLE book(
    id INT,
    bname VARCHAR(20),
    price DOUBLE,
    authorId INT,
    publishDate DATETIME,
);
# 或者
CREATE TABLE IF NOT EXISTS book(
    id INT,
    bname VARCHAR(20),
    price DOUBLE,
    authorId INT,
    publishDate DATETIME,
);

CREATE TABLE author(
    id INT,
    au_name VARCHAR(20),
    nation VARCHAR(10)
);
```
+ 修改
> 可以修改列名，类型，约束，添加列，删除列，修改表名
```
# 修改列名
ALTER TABLE book CHANGE COLUMN publishDate pubDate DATETIME;

# 修改列的类型
ALTER TABLE book MODIFY COLUMN pubDate TIMESTAMP;

# 添加新列
ALTER TABLE author ADD COLUMN annual DOUBLE;
# 插入第一列
ALTER TABLE author ADD COLUMN annual DOUBLE FIRST;
# 在某一列后面插入
ALTER TABLE author ADD COLUMN annual DOUBLE AFTER au_name;

# 删除列
ALTER TABLE author DROP COLUMN annual;

# 修改表名
ALTER TABLE author RENAME TO book_author;
```
+ 删除
```
DROP TABLE book_author;

# 删除之前判断
DROP TABLE IF EXISTS book_author;
```
+ 复制
1. 仅复制表结构
```
CREATE TABLE copy_author LIKE author;
```
2. 复制结构和数据
```
CREATE TABLE copy_author2
SELECT * FROM author;
```
3. 复制结构和部分数据
```
CREATE TABLE copy_author3
SELECT id,au_name
FROM author
WHERE nation = '中国';
```
4. 仅复制部分结构
```
CREATE TABLE copy_author4
SELECT id,au_name
FROM author
WHERE 1=2;
# 或者
CREATE TABLE copy_author4
SELECT id,au_name
FROM author
WHERE 0;
```

# (14) 约束

> 约束是一种限制，为了保证表中数据准确可靠

## 六种约束
1. NOT NULL：非空，用于保证该字段值不能为空
2. DEFAULT：默认，用于保证该字段有默认值
3. PRIMARY KEY：主键，保证该字段的值唯一且非空
4. UNIQUE：唯一，用于保证该字段值唯一，可以为空
5. CHECK：检查约束，mysql不支持
6. FOREIGN KEY：外键，用于限制两个表的关系，保证该字段的值必须来自主表关联列的值，在从表添加外键约束，用于引用主表中某列的值

> 约束在创建表和修改表是可以使用

> 关于主键和唯一的比较：
![主键和唯一的比较](img17.png)

> 外键：
> 1. 须在从表设置外键关系
> 2. 从表外键列的类型和主表关联列类型一致或兼容
> 3. 主表中关联列必须是一个key（一般是主键或唯一）
> 4. 插入数据时，先插入主表再插入从表，删除数据时，先删除从表再删除主表

## 列级约束
```
CREATE DATABASE students;

CREATE TABLE stuinfo (
	id INT PRIMARY KEY,#主键
	stuName VARCHAR ( 20 ) NOT NULL,#非空
	gender CHAR ( 1 ) CHECK ( gender = '男' OR gender = '女' ),#检查
	seat INT UNIQUE,#唯一
	age INT DEFAULT 18,#默认约束
	majorId INT REFERENCES major ( id ) #外键，对列级约束没作用
	
);
CREATE TABLE major (
	id INT PRIMARY KEY,
    majorName VARCHAR ( 20 ) 
);

DESC stuinfo;
```

## 表级约束
```
DROP TABLE IF EXISTS stuinfo;
CREATE TABLE stuinfo (
	id INT,
	stuName VARCHAR ( 20 ),
	gender CHAR ( 1 ),
	seat INT,
	age INT,
	majorId INT,
	CONSTRAINT pk PRIMARY KEY ( id ),#主键
	CONSTRAINT uq UNIQUE ( seat ),#唯一键
	CONSTRAINT ck CHECK ( gender = '男' OR gender = '女' ),#检查
	CONSTRAINT fk_stuinfo_major FOREIGN KEY ( majorId ) REFERENCES major ( id ) #外键

);
SHOW INDEX FROM stuinfo;

# 或者
DROP TABLE IF EXISTS stuinfo;
CREATE TABLE stuinfo (
	id INT,
	stuName VARCHAR ( 20 ),
	gender CHAR ( 1 ),
	seat INT,
	age INT,
	majorId INT,
	PRIMARY KEY ( id ),#主键
	UNIQUE ( seat ),#唯一键
	CHECK ( gender = '男' OR gender = '女' ),#检查
	FOREIGN KEY ( majorId ) REFERENCES major ( id ) #外键

);
SHOW INDEX FROM stuinfo;

# 一般写法
CREATE TABLE IF NOT EXISTS stuinfo (
	id INT PRIMARY KEY,#主键
	stuName VARCHAR ( 20 ) NOT NULL,#非空
	gender CHAR ( 1 ) CHECK ( gender = '男' OR gender = '女' ),#检查
	seat INT UNIQUE,#唯一
	age INT DEFAULT 18,#默认约束
	majorId INT,
	CONSTRAINT fk_stuinfo_major FOREIGN KEY ( majorId ) REFERENCES major ( id ) #外键

);
```

## 修改表时添加约束
> 添加列级约束
ALTER TABLE 表名 MODIFY COLUMN 字段名 字段类型 新约束;
添加表级约束
ALTER TABLE 表名 ADD [CONSTRAINT 约束名] 约束类型(字段名);
```
DROP TABLE IF EXISTS stuinfo;
CREATE TABLE stuinfo (
	id INT,
	stuName VARCHAR ( 20 ),
	gender CHAR ( 1 ),
	seat INT,
	age INT 18,
	majorId INT
);

# 添加非空约束
ALTER TABLE stuinfo MODIFY COLUMN stuName VARCHAR(20) NOT NULL;

# 添加默认约束
ALTER TABLE stuinfo MODIFY COLUMN age INT DEFAULT 18;

# 添加主键
ALTER TABLE stuinfo MODIFY COLUMN id INT PRIMARY KEY;
ALTER TABLE stuinfo ADD PRIMARY KEY(id);

# 添加唯一键
ALTER TABLE stuinfo MODIFY COLUMN seat INT UNIQUE;
ALTER TABLE stuinfo ADD UNIQUE(seat);

# 添加外键
ALTER TABLE stuinfo ADD FOREIGN KEY ( majorId ) REFERENCES major ( id ) ;
```

## 修改表时删除约束
```
# 删除非空约束
ALTER TABLE stuinfo MODIFY COLUMN stuName VARCHAR(20) NULL;

# 删除默认约束
ALTER TABLE stuinfo MODIFY COLUMN age INT;

# 删除主键
ALTER TABLE stuinfo DROP PRIMARY KEY;

# 删除唯一键
ALTER TABLE stuinfo DROP INDEX seat;

# 删除外键
ALTER TABLE stuinfo DROP FOREIGN KEY majorId;
```

# (15) 标示列（自增长列）

> 可以不用手动插入值，系统提供默认值序列
标识列须是一个key
每个表最多能有一个自增长列
标识列类型只能是数值型
标示列可以通过`SET AUTO_INCREMENT_INCREMENT = 3`设置步长，也可以通过手动插入值，设置起始值
```
# 创建表时设置标示列
DROP TABLE IF EXISTS tab_identity; 
CREATE TABLE tab_identity(
    id INT PRIMARY KEY AUTO_INCREMENT,
);

# 修改表时设置标示列
ALTER TABLE tab_identity MODIFY COLUMN id PRIMARY KEY AUTO_INCREMENT;
# 修改表时删除标示列
ALTER TABLE tab_identity MODIFY COLUMN id;
```

# (16) 事物

> 一个或者一组sql语句组成一个执行单元，执行这个单元要么全部执行，要么全部不执行

+ 查看存储引擎
```
SHOW ENGINES;
```

### 事务的ACID属性
1. 原子性（Atomicity）
原子性是指事务是一个不可分割的单位，事物中的操作要么都发生，要么都不发生。
2. 一致性（Consistency）
事务必须使数据库从一个一致性状态变到另一个一致性状态。
3. 隔离性（Isolation）
一个事务的执行不能被其他事务干扰，即一个事务内部的操作及使用的数据对并发的其他事务是隔离的，并发执行的各个事务之间不能相互干扰。
4. 持久性（Durability） 
一个事务一旦被提交，它对数据库中数据的改变是永久性的，接下来的其他操作和数据库故障应该对其有任何影响。

## 事务的创建
+ 隐式的事务：没有明显的开启和关闭标记
    insert、update、delete语句都是隐式事务 
+ 显示事务：具有明显的开始和结束标记，使用前必须先设置自动提交功能关闭 `SET AUTOCOMMIT = 0;`

+ 步骤：
```
# 1. 开启事务
SET AUTOCOMMIT = 0;
START TRANSACTION; # 可选的
# 2. 编写事物中的sql语句
增删改查语句（select、insert、update、delete）
# 3. 结束事务
commit; # 提交
rollback; # 回滚
```

## 事务并发问题
1. 脏读：对于两个事务，T1、T2，T1读取了T2已经更改但是没有提交的字段之后，若T2回滚，T1读取的内容就是临时且无效的。
2. 不可重复读：对于两个事务，T1、T2，T1读取了一个字段，然后T2更新了这个字段之后，T1再读取这个字段，，值就不一样了。
3. 幻读：对于两个事务，T1、T2，T1从一个表中读取了一个字段，T2在这个表中插入了新的行之后，如果T1再读这个表，就会多处几行数据。

## 隔离级别
![隔离级别](img18.png)
mysql中默认第三种隔离级别
oracle默认第二种

+ 查看当前隔离级别
```
SELECT @@TX_ISOLATION
```
+ 设置隔离级别
```
# 当前sql语句
SET TRANSACTION ISOLATION LEVEL read committed;
# 数据库系统
SET GLOBAL TRANSACTION ISOLATION LEVEL read committed;
```

## 回滚点（savepoint）
```
SET AUTOCOMMIT = 0;
START TRANSACTION;
DELETE FROM account WHERE id=25;
SAVEPOINT a;
DELETE FROM account WHERE id=28;
ROLLBACK TO a;
```

# (17) 存储过程

> 一组预先编译好的SQL语句合集，类似批处理语句
适合做一些批量插入更新等操作

+ 创建存储过程
> CREATE PROCEDURE 存储过程名（参数列表）
BEGIN
    存储过程体（一组合法有效的SQL语句）
END

> Note
参数列表包含3部分（参数模式 参数名 参数类型）
如果存储过程体中只有一条SQL语句，那么 BEGIN 和 END 可以省略
存储过程体中每条语句必须加分号，结尾可以用 DELIMITER 重新设置

+ 参数模式
1. IN ：该参数可以作为输入（需要调用方传值进来）
2. OUT ： 该参数可以作为输出（参数可以作为返回值）
3. INOUT ： 该参数可以作为输入输出（既需要传入值，又能返回值）

+ 调用存储过程
> CALL 存储过程名（参数列表）;

+ 空参列表
```
# 插入admin中5条记录
DELIMITER $
CREATE PROCEDURE myp1()
BEGIN
    INSERT INTO admin(username,`password`) 
    VALUES('username1','password1'),
    VALUES('username2','password2'),
    VALUES('username3','password3'),
    VALUES('username4','password4'),
    VALUES('username5','password5');
END $

# 调用
CALL myp1()$
```

+ IN 模式参数存储过程
```
# 根据女生名查询对应的男生信息
DELIMITER $
CREATE PROCEDURE myp2(IN beautyName VARCHAR(20))
BEGIN
    SELECT bo.*
    FROM boys AS bo
    RIGHT JOIN beauty AS b
    ON bo.id = b.boyfirend_id
    WHERE b.name = beautyName;
END $

# 调用
CALL myp2('小昭')$


# 创建存储过程，验证用户登录是否成功
DELIMITER $
CREATE PROCEDURE myp3(IN username VARCHAR(20), IN password VARCHAR(20))
BEGIN
    DECLARE result INT DEFAULT 0;
    SELECT COUNT(*) INTO result
    FROM admin
    WHERE admin.username = username
    AND admin.password = password;

    SELECT if(result>0,'成功','失败');
END $

# 调用
CALL myp3('','')$
```

+ OUT 模式参数存储过程
```
# 根据女生名返回对应的男生名
DELIMITER $
CREATE PROCEDURE myp4(IN beautyName VARCHAR(20), OUT boyName VARCHAR(20))
BEGIN
    SELECT bo.boyName INTO boyName
    FROM boys AS bo
    INNER JOIN beauty AS b
    ON bo.id = b.boyfirend_id
    WHERE b.name = beautyName
END $

# 调用
SET @bName$
CALL myp5('小昭',@bName);
SELECT @bName$
```

+ INOUT 模式参数存储过程
```
# 传入a和b两个值，要求a和b都翻倍并返回
DELIMITER $
CREATE PROCEDURE myp5(INOUT a INT, INOUT b INT)
BEGIN
    SET a = a * 2;
    SET b = b * 2;
END $

# 调用
SET @m = 10$
SET @n = 20$
CALL myp5(@m,@n)$
SELECT @m,@n$
```

+ 存储过程删除
> DROP PROCEDURE 存储过程名;

+ 存储过程查看
> SHOW CREATE PROCEDURE 存储过程名;

# (18) 函数

> 类似存储过程，但更适合做一些处理数据结果后返回一个结果

+ 函数创建
> CREATE FUNCTION 函数名(参数列表) RETURNS 返回类型
BEAGIN
    函数体
END

> Note
参数列表包含2部分（参数名 参数类型）
函数体肯定会包含返回语句，不包含会报错，如果return不在最后也不会报错
函数体中只有一条语句则可以省略，结尾可以用 DELIMITER 重新设置

+ 调用函数
> SELECT 函数名（参数列表）;

+ 无参
```
# 返回公司员工个数
DELIMITER $
CREATE FUNCTION myf1() RETURNS INT
BEGIN
    DECLARE c INT DEFAULT 0;
    SELECT COUNT(*) INTO c
    FROM employees;
    RETURN c;
END $

# 调用
SELECT myf1()$
```

+ 有参有返回
```
# 根据员工名返回工资
DELIMITER $
CREATE FUNCTION myf2(empName VARCHAR(20)) RETURNS DOUBLE
BEGIN
    SET @sal = 0;
    SELECT salary INTO @sal
    FROM employees
    WHERE last_name = empName;

    RETURN @sal;
END $

# 调用
SELECT myf2('kochhar')$

# 根据部门名返回该部门的平均工资
DELIMITER $
CREATE FUNCTION myf3(deptName VARCHAR(20)) RETURNS DOUBLE
BEGIN
    DECLARE sal DOUBLE DEFAULT 0;
    SELECT AVG(salary) INTO sal
    FROM employees AS e
    INNER JOIN departments AS d
    ON e.department_id = d.department_id
    WHERE d.department_name = deptName;

    RETURN sal;
END $

# 调用
SELECT myf3('IT')$
```

+ 查看函数
> SHOW CREATE FUNCTION 函数名;

+ 删除函数
> DROP FUNCTION 函数名;

```
# 求和函数
DELIMITER $
CREATE FUNCTION test_fun_add(num1 FLOAT,num2 FLOAT) RETURNS FLOAT
BEGIN
    DECLARE sum FLOAT DEFAULT 0;
    SET sum = num1 + num2;
    RETURN sum;
END $

# 调用
SELECT test_fun_add(1,2)$
```

# (19) 流程控制

+ if else
```
# 根据传入成绩显示等级
DELIMITER $
CREATE FUNCTION test_if(score INT) RETURNS CHAR
BEGIN
    IF score >= 90 AND score <= 100 THEN RETURN 'A';
    ELSEIF score >= 80 THEN RETURN 'B';
    ELSEIF score >= 60 THEN RETURN 'C';
    ELSE RETURN 'D';
    END IF;
END $
```

## 循环
> while loop repeat
iterate 类似 continue
leave 类似 break

+ while
> [标签:] while 循环条件 do
    循环体;
end while [标签];
```
# 批量插入,没有循环控制
DELIMITER $
CREATE PROCEDURE while1(IN insertCount INT)
BEGIN
    DECLARE i INT DEFAULT 1;
    WHILE i < insertCount DO
        INSERT INTO admin(username,`password`) VALUES(CONCAT('rose', i),'666');
        SET i = i + 1; 
    END WHILE;
END $

# 调用
CALL while1(100)$


# 批量插入,有循环控制（如果次数 >20 就停止）
DELIMITER $
CREATE PROCEDURE while2(IN insertCount INT)
BEGIN
    DECLARE i INT DEFAULT 1;
    a:WHILE i < insertCount DO
        INSERT INTO admin(username,`password`) VALUES(CONCAT('rose', i),'666');
        IF i >= 20 THEN LEAVE a;
        END IF;
        SET i = i + 1; 
    END WHILE a;
END $

# 调用
CALL while2(100)$


# 批量插入,有循环控制（只插入偶数数据）
DELIMITER $
CREATE PROCEDURE while3(IN insertCount INT)
BEGIN
    DECLARE i INT DEFAULT 0;
    a:WHILE i < insertCount DO
        SET i = i + 1; 
        IF MOD(i,2) != 0 THEN ITERATE a;
        END IF;
        INSERT INTO admin(username,`password`) VALUES(CONCAT('rose', i),'666');
    END WHILE a;
END $

# 调用
CALL while3(100)$
```

+ loop
> [标签:] loop
    循环体;
end loop [标签];

+ repeat
> [标签:] repeat
    循环体;
until 结束条件
end repeat [标签];