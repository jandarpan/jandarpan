### `Problem 1`: Write a program that will give you in hand monthly salary after deduction on CTC - HRA(10%), DA(5%), PF(3%) and taxes deduction as below:

#> Salary(Lakhs) : Tax(%)

#*   Below 5 : 0%
#*   5-10 : 10%
#   10-20 : 20%
#*   aboove 20 : 30%

salary = int(input("enter your salary : "))
a= 0.1*salary
b=0.05*salary
c=0.03*salary
if salary < 500000 :
    d=salary-a-b-c
elif salary <=1000000 :
    d=salary-a-b-c-0.1*salary
elif salary <=2000000 :
    d=salary-a-b-c-0.2*salary
else :
    d=salary-a-b-c-0.3*salary

print("your HRA" , a)
print("your DA" , b)
print("your PF" , c)
print("your salary is " , d)

