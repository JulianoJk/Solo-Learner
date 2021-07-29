import json



# Save the json file to a variable
data = json.load(open('questions.json'))

#Create an empty list to save the all the answers
allAnswers = []

#Save the correct answer to a variable
right =  data["question_1"][0]["answer"]["correct_answer"]

#Save the question to a variable
question = data["question_1"][0]["object"]

#Create and initialize a counter to display in front of each answer the number( e.g. 1. {answer1}, 2. {answer2})
count = 1

#Append each element from the json object to the list
for i in data["question_1"][0]["answer"]["wrong_answers"]:
    #Append the number with the wrong answer to the list
    allAnswers.append(i)
    #Increase the counter
    count+=1

#Append the correct answer to the allAnswers list 
allAnswers.append(right)

out = '\n'.join(allAnswers)


print(question)
print(out)

userAnswer = int()

while(True):
    try:
        # Take user's input and substract one in order to compare the answer later( the user will not enter 0, 1, but 1, 2..)
        userAnswer = int(input("Type the number of your answer: ")) -1
        #if the answer is not greater or less than the count, stop the loop
        if userAnswer < len(allAnswers) and userAnswer>=0:
            break
        else:
            #Inform the user 
            print("\nPlease type only the number from the displayed numbers!")
            continue
    except ValueError:
        print("\nPlease type only the number from the displayed numbers, not anything else!")
        continue


try:
    # if the index of the list, of the user's input, is the right answer, display the message
    if allAnswers[userAnswer] == right:
        print("It is right, you picked: " + allAnswers[userAnswer])
    else:
        print("Not Worked cuz you picked " + allAnswers[userAnswer])
except IndexError:
    print("Wrong")