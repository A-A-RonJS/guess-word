from datetime import date, timedelta
import random

with open("../src/resources/data/answers.txt", "r") as f:
  lines = f.readlines()

# Randomise word list
words = []
for line in lines:
  words.append(line.strip())
random.shuffle(words)

# Building word-date list
start_date = date.today()

word_date_pairs = []
i = 0
for word in words:
    word_date = start_date + timedelta(days=i)
    word_date_pairs.append((word, word_date))
    i += 1
    
# Write to new sql file
with open("seed.sql", "w") as file:
    file.write("INSERT INTO daily_words (word, date) \nVALUES\n")
    for i in range(len(word_date_pairs)):
      word, word_date = word_date_pairs[i]
      if i < len(word_date_pairs) - 1:
          file.write(f"  ('{word}', '{word_date.strftime('%Y-%m-%d')}'),\n")
      else:
          file.write(f"  ('{word}', '{word_date.strftime('%Y-%m-%d')}');")