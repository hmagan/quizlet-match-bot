# quizlet-match-bot
Bot designed to complete the match minigame in record time. Quizlet hack/cheat B)

Note: configured it to only work with sets that have text. If a term is only composed of an image, this will not work (as of now at least).

Steps:

1. Go to a set and scroll down to the "Terms in this set" section. Make sure all terms are loaded.
2. Copy and paste answers.js into the browser console and copy the returned array
3. Paste the array into bot.js
4. Go to match and be sure to be on micromatch, NOT regular match. By default, you will see regular match, so be sure to change the URL by inserting "micro" in front of match.
ex: https://quizlet.com/46182376/micromatch
5. Before clicking "Start game", paste bot.js with your array pasted into it into the browser console. Make sure to press enter, and then click "Start game".

That's it. If your script is running too quickly and Quizlet is rejecting your score, increase the delay in the code. If a term has double quotes in it somewhere, make sure to add a backslash \ in front of the double quotes so the string can be read properly. Since the speed of the algorithm varies a bit, you might have to run it a few times in order to get Quizlet to accept it. If that doesn't work, just increase the delay in the code like I said.
