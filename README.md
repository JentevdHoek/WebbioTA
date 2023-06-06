Keuzes voor de opdracht
=======================
HTML + CSS + JS
Gevraagd is een web-based applicatie dus HTML + CSS + JS is een logische keuze. Daarnaast heb ik er ervaring mee. 
Applicatie is niet complex dus geen framework nodig.
---------------

DB: IndexedDB.
Simpele browser DB gekozen voor een kleine applicatie. Data die opgeslagen wordt is niet complex.

-----------
Denkwijze
===========

Applicatie heeft in mijn ogen 2 onderdelen
- Het spel
- Gespeeld spel opslaan in DB

Deze stukken opgesplitst in 2 JS modules voor overzicht.

Eerst het spelbord gemaakt. Deze gegenereerd met JS omdat ik verwacht wat manipulatie te moeten doen.

Het maken van een zet wordt gedaan met een event listener op de cellen, om en om X en O.

Winnaar bepalen kan gedaan worden met aan algoritme of vergelijken met set van winnende combinaties. Ik heb voor het laatste gekozen omdat het een klein veld is. Wanneer het bord vol is en er geen winnaar uit is gekomen wordt gelijkspel verklaard.

Nu dat een winnaar bepaald kan worden is het tijd om de info in de DB op te slaan.

Voor DB opslag vooral standaard code. Data die wordt opgeslagen is de winnaar en de moves in volgorde van plaatsing met de bijbehorende speler. Ik verwacht hiermee genoeg data op te slaan om het algoritme te trainen. IndexedDB had ik nog niet eerder gebruikt, dus de javascript.info pagina gebruikt om het snel in elkaar te zetten.

Om wat makkelijk inzicht te geven in de opslag worden de opgeslagen spellen onder het spelbord getoond.