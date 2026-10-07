import random
b= input("what is your choise : ")

choise = ["stone" , "paper", "scissors"]
a= random.choice(choise)
print(f"my choise is {a}")

if a==b :
    print ("draw")
elif a=="scissors" and b=="paper":
    print("you lose")
elif a=="scissors" and b=="stone":
    print("you win")
elif a=="paper" and b=="stone":
     print("you lose")
elif a=="paper" and b=="scissors":
    print("you win")
elif a=="stone" and b=="scissors":
    print("you lose")
elif a=="stone" and b=="paper":
    print("you win")

print("thanks for playing \n come again")
