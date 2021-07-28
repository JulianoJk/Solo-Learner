import json
import question_1 from /home/noxseras/Desktop/duolingo_clone/questions.json


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
    allAnswers.append(str(count) +'. ' + i)
    #Increase the counter
    count+=1

#Append the correct answer to the allAnswers list 
allAnswers.append(str(count) +'. ' + right)

out = '\n'.join(allAnswers)


print(question)
print(out)

def answerInput(userAnswer):
    while(True):
        try:
            userAnswer = int(input("Type the number of your answer: "))
            #if the answer is not greater or less than the count, stop the loop
            if userAnswer <= count and userAnswer>0:
                break
            else:
                print("\nPlease type only the number from the displayed numbers!")
                continue
        except ValueError:
            print("\nPlease type only the number from the displayed numbers, not anything else!")
            continue

answerInput(None)
