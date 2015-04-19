# rpgit-characters
rpgit characters generator and architecture

- [seed](http://davidbau.com/archives/2010/01/30/random_seeds_coded_hints_and_quintillions.html#more)
- [json linter](https://www.jsoneditoronline.org/)
- [handlebars](http://handlebarsjs.com/)
- [handlebars helpers](https://github.com/diy/handlebars-helpers/tree/master/lib)(http://jsfiddle.net/mpetrovich/wMmHS/)
- [getResponseHeader method](http://help.dottoro.com/ljxsrgqe.php)
- [rawgit](https://rawgit.com/)

## Handlebars helper

```liquid
{{{link "See more..." story.url}}}
```

```javascript
Handlebars.registerHelper('link', function(text, url) {
  url = Handlebars.escapeExpression(url);
  text = Handlebars.escapeExpression(text);

  return new Handlebars.SafeString(
    "<a href='" + url + "'>" + text + "</a>"
  );
});
```

## Permalink to a file in a specific commit
For a permanent link to the specific version of a file that you see, instead of using a branch name in the URL (i.e. the master part in the example above), put a commit id. This will permanently link to the exact version of the file in that commit.

Instead of  
[github/hubot/blob/master/README.md](https://github.com/github/hubot/blob/master/README.md)

Use  
[github/hubot/blob/ed25584f5ac2520a6c28547ffd0961c7abd7ea49/README.md](https://github.com/github/hubot/blob/ed25584f5ac2520a6c28547ffd0961c7abd7ea49/README.md)


# Character
All characters begin the game the same way: untrained, inexperienced, and about 18 years of age.

1. fork this repository: online terminal on gh-pages + personal data

2. edit character/name.log, enter character name (commit#n) and you get 16 profiles to choose from, approved from imperium (and you enable gh-pages).

  - your character/name.log content (suffix: upp) is the seed for characteristics rolls and in this moment are determined: you have 16 profiles 0-F (6 characteristics times 16 profiles = 96 random math calls).


3. enter site (active only after commit#1) and (if you have a name != '') you see 16 profiles
  - you can choose from 16 profiles (upp is comit#1's name + profile choosen) and try Enlistment in a Service with chances of succeed and survive and profile/bonus.


5. To start a career your character may choose one of the six services: Navy ,Marines, Army, Scouts, Merchants, Other; and check for survive 4 years.

  - Only one enlistment attempt is permitted per character
  - Enlistment or draft is not allowed after age 18.
  - if Enlistment fail, submit to the draft (random 1d6)
  - character embarks in a term of service lasting four years (age)
  - If die a new character must be generated (point 2, try another profile or change character_name.log for other profiles approved).

6. Finished first term save your career, you can start
  - edit career/term1.log, enter the string (commit#n) and you get new terms with imperium or other service or adventure.
  - Example `1 Retired Scout 99397A Pilot-1, Vacc-2, Navigation-2, Shotgun-2 Age 38 5terms Cr2.000 Shotgun, Scout Ship`

# Gender and Race
Any character is potentially of any race and of either sex.

# UPP Universal Personality Profile
expresses the basic characteristics in a specific sequence using hexadecimal (base 16) numbers, 0 to  15 (F).

- Strength is both a general evaluation of the character's physical ability, and a specific measure of force which may be applied.

- Dexterity measures physical coordination.

- Endurance measures physical determination and stamina.

- Intelligence corresponds to IQ.

- Education indicates the highest level of schooling attained.

- Social Standing notes the social class and level of society from which the character (and his or her family) come.

## Titles (Social Standing)

- B Knight, Knightess, Dame
- C Baron, Baronet, Baroness
- D Marquis, Marquesa, Marchioness
- E Count, Countess
- F Duke, Duchess

# Career

## Service, Enlistment, Commission, Promotion

- choose Service and try enlist (seed is username suffix: firstenlist)
- if enlisted try survive
- if survive (and not draftee in first term) get first term 2 skills (choose type between 3 or 4) and ask commission for rank 1 (1 per term)
- if commissioned as an officier (rank service name), take 1 skill (choose type between 3 or 4) and ask promotion (1 per term)
- if promoted rank +1 and take another skill (choose type between 3 or 4)
- skill maturato: check RANK AND SERVICE SKILLS for additional skill

## Reenlistment

Look reenlistment chances (no DM), try
- if denied, must leave and check mustering
- if 12, must stay

## MUSTERING OUT BENEFITS
Choose mustering out table: benefit (travel, education and material) or Cash (severance pay) with your final rank.
No one may consult the cash table more than three times during the mustering out process

* 1 roll is allowed for each term served.
* 1 extra roll for rank 1 or 2
* 2 extra rolls for rank 3 or 4
* 3 extra rolls for rank 5 or 6 and +1DM on skill and benefit tabel

## Retirement

after min 5 term, max 7 terms (except the forced 12) and get annual retirement pay.

## Aging
When a character reaches 34 years of age (the end of the fourth term of service) aging begins to take its roll at four year intervals.
year-term
* 34-4, 38-5, 42-6, 46-7 years: -1st8+, -1de7+, -1en8+
* 50-8, 54-9, 58-10, 60-11 years: -1st9+, -1de8+, -1en9+
* 66-12, 70-13, 74+ 14+ years: -2st9+, -2de9+, -2en9+, -1in9+

## Skills
1d6 on one acquired skills table choosen from 4: 3 normal and one for only ed8+

## Enlist
Prior Service Table

> `( ±Dchx, ... )` Cumulative: ±D=DM ch=characteristic x=minimum value

- Navy: Enlist 8+ (+1in8+, +2ed9+)
  - Members of the interstellar space navy which patrols space between the stars
- Marines: Enlist 9+ (+1in8, +2st8)
  - Members of the armed fighting forces carried aboard starships
- Army: Enlist 5+ (+1de6, +2en5)
  - Members of the planetary armed fighting forces. Soldiers deal with planetary surface actions, battles, and campaigns.
- Scouts: Enlist 7+ (+1in6, +2st8)
  - Members of the exploratory service. Scouts explore new areas, map and survey known or newly discovered areas
- Merchants: Enlist 7+ (+1st7, +2in6)
  - Merchants of the commercial enterprises. Merchants crew the ships of trading corporations or work for independent traders
- Other: Enlist 3+ ()
  - the shady realm of the underworld
