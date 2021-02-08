# quizlet-match-bot
Bot designed to complete the match minigame in record time. Quizlet hack/cheat B)

Note: configured it to only work with sets that have text. If a term is only composed of an image, this will not work (as of now at least). Sets with repeat terms/definitions will likely mess things up.

Steps:

1. Go to a set and scroll down to the "Terms in this set" section. Make sure all terms are loaded.
2. Copy and paste answers.js into the browser console and copy the returned array. Save this array somewhere or simply copy and paste it on step 5.
3. Go to match and be sure to be on micromatch, NOT regular match. By default, you will see regular match, so be sure to change the URL by inserting "micro" in front of match.
ex: https://quizlet.com/46182376/micromatch
4. Copy and paste bot.js into the browser console and DO NOT press enter (yet).
5. Paste the array from answers.js at the very top of the script into the variable named flashcards. The comment above it should make it easy to find. Now you may hit enter and enjoy :)

That's it. If your script is running too quickly and Quizlet is rejecting your score, increase the delay. <ins>Also, you do not necessarily have to go in the order stated above. Just make sure when you paste your script into micromatch that the array flashcards is filled in properly</ins>.

2/3/2021: Now works with terms that have extra formatting and automatically escapes double quote characters
2/4/2021: Added UI. Don't spam too quickly through it or it might glitch out
2/8/2021: Fixed bugs regarding if you hadn't completed match before on the set or if there were line breaks in the terms + cleaned up the UI.
