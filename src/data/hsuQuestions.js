import { federalStates } from './federalStates.js'

export const hsuTopics = [
  { id: 'directions', name: 'Himmelsrichtungen', icon: '🧭' },
  { id: 'maps', name: 'Karten und Zeichen', icon: '🗺️' },
  { id: 'heights', name: 'Berge und Höhenlinien', icon: '⛰️' },
  { id: 'germany', name: 'Deutschland und Hauptstädte', icon: '🇩🇪' },
  { id: 'elections', name: 'Demokratische Wahlen', icon: '🗳️' },
]
const choice = (id, topic, prompt, answer, others, explanation, visual = null) =>
  ({ id, topic, type: 'choice', prompt, answer, options: [answer, ...others], explanation, visual })
const written = (id, topic, prompt, answer, aliases, explanation, visual = null) =>
  ({ id, topic, type: 'written', prompt, answer, aliases, explanation, visual })

export const hsuQuestions = [
  choice('north', 'directions', 'Welche Himmelsrichtung zeigt der hervorgehobene Pfeil?', 'Norden', ['Süden', 'Osten', 'Westen'], 'Auf der Windrose liegt Norden oben.', { kind: 'compass', direction: 'N' }),
  choice('east', 'directions', 'Welche Himmelsrichtung zeigt der hervorgehobene Pfeil?', 'Osten', ['Süden', 'Norden', 'Westen'], 'Auf der Windrose liegt Osten rechts.', { kind: 'compass', direction: 'O' }),
  choice('southwest', 'directions', 'Welche Himmelsrichtung liegt zwischen Süden und Westen?', 'Südwesten', ['Südosten', 'Nordwesten', 'Nordosten'], 'Die Zwischenrichtung heißt Südwesten, kurz SW.'),
  choice('northeast', 'directions', 'Welche Himmelsrichtung zeigt der hervorgehobene Pfeil?', 'Nordosten', ['Nordwesten', 'Südosten', 'Südwesten'], 'Zwischen Norden und Osten liegt Nordosten.', { kind: 'compass', direction: 'NO' }),
  choice('northwest', 'directions', 'Welche Himmelsrichtung zeigt der hervorgehobene Pfeil?', 'Nordwesten', ['Südwesten', 'Nordosten', 'Südosten'], 'Zwischen Norden und Westen liegt Nordwesten.', { kind: 'compass', direction: 'NW' }),
  choice('southeast', 'directions', 'Welche Himmelsrichtung liegt zwischen Süden und Osten?', 'Südosten', ['Südwesten', 'Nordosten', 'Nordwesten'], 'Die Zwischenrichtung heißt Südosten, kurz SO.'),
  written('sunrise', 'directions', 'In welcher Himmelsrichtung geht die Sonne auf?', 'Osten', ['O', 'im Osten'], 'Merksatz: Im Osten geht die Sonne auf, im Süden nimmt sie ihren Lauf, im Westen wird sie untergehen.'),
  written('noon', 'directions', 'In welcher Himmelsrichtung steht die Sonne bei uns mittags?', 'Süden', ['S', 'im Süden'], 'Für die Orientierung bei uns in Deutschland gilt: Mittags steht die Sonne im Süden.'),
  written('sunset', 'directions', 'In welcher Himmelsrichtung geht die Sonne unter?', 'Westen', ['W', 'im Westen'], 'Im Westen wird die Sonne untergehen.'),
  choice('turn', 'directions', 'Du blickst nach Norden. Welche Himmelsrichtung liegt rechts von dir?', 'Osten', ['Westen', 'Süden', 'Nordwesten'], 'Die Reihenfolge im Uhrzeigersinn ist Norden, Osten, Süden, Westen.'),

  choice('bird', 'maps', 'Wie heißt die Ansicht senkrecht von oben?', 'Vogelperspektive', ['Seitenansicht', 'Schrägsicht', 'Ansicht von unten'], 'Karten zeigen Landschaften aus der Vogelperspektive, also senkrecht von oben.'),
  choice('map-reality', 'maps', 'Wie wird die Wirklichkeit auf einer Karte dargestellt?', 'Verkleinert und vereinfacht', ['Vergrößert und vereinfacht', 'In Originalgröße und mit allen Einzelheiten', 'Verkleinert, aber ohne Vereinfachung'], 'Für die Karte verkleinert man die Landschaft und verwendet einfache Zeichen.'),
  choice('legend', 'maps', 'Was erklärt die Legende einer Karte?', 'Die Bedeutung der Kartenzeichen', ['Nur die Namen der Berge', 'Das Alter der Karte', 'Die Wettervorhersage'], 'Die Legende erklärt, was die Zeichen und gegebenenfalls Farben auf dieser Karte bedeuten.'),
  choice('church', 'maps', 'Was bedeutet dieses Kartenzeichen?', 'Kirche', ['Turm', 'Burg oder Schloss', 'Parkplatz'], 'Das Zeichen mit dem Kreuz steht im Merkheft für eine Kirche.', { kind: 'symbol', symbol: 'church' }),
  choice('parking', 'maps', 'Was bedeutet dieses Kartenzeichen?', 'Parkplatz', ['Post', 'Polizei', 'Picknickplatz'], 'Das P im Quadrat steht für einen Parkplatz.', { kind: 'symbol', symbol: 'parking' }),
  choice('conifer', 'maps', 'Welcher Wald wird durch diese Kartenzeichen dargestellt?', 'Nadelwald', ['Laubwald', 'Mischwald', 'Wiese'], 'Die spitzen Baumzeichen stehen im Merkheft für Nadelwald.', { kind: 'symbol', symbol: 'conifer' }),
  choice('mixed', 'maps', 'Was bedeutet eine Mischung aus Nadelbaum- und Laubbaumzeichen?', 'Mischwald', ['Nur Nadelwald', 'Nur Laubwald', 'Wiese'], 'In einem Mischwald wachsen Nadelbäume und Laubbäume.'),
  choice('cemetery', 'maps', 'Was bedeuten diese Kartenzeichen?', 'Friedhof', ['Kirche', 'Krankenhaus', 'Bahnhof'], 'Mehrere kleine Kreuze kennzeichnen im Merkheft einen Friedhof.', { kind: 'symbol', symbol: 'cemetery' }),

  choice('steep', 'heights', 'Welche Seite des Berges ist steiler? Norden ist oben.', 'Die Ostseite', ['Die Westseite', 'Beide Seiten sind gleich steil', 'Das kann man an Höhenlinien nie erkennen'], 'Im Osten liegen die Höhenlinien enger zusammen. Je enger die Linien, desto steiler der Hang.', { kind: 'hill' }),
  choice('flat', 'heights', 'Was bedeutet es, wenn Höhenlinien weit auseinanderliegen?', 'Der Hang ist flach.', ['Der Hang ist steil.', 'Dort muss ein See liegen.', 'Der Berg ist immer besonders hoch.'], 'Bei einem flachen Hang braucht man eine längere Strecke für den gleichen Höhenunterschied.'),
  choice('layer', 'heights', 'Wie heißt die Fläche zwischen zwei benachbarten Höhenlinien?', 'Höhenschicht', ['Gipfel', 'Legende', 'Schrägsicht'], 'Die Fläche zwischen zwei Höhenlinien nennt man Höhenschicht.'),
  choice('summit-symbol', 'heights', 'Wofür steht das × am höchsten Punkt in der Höhenlinienkarte?', 'Für den Gipfel', ['Für eine Kirche', 'Für einen Parkplatz', 'Für den Fuß des Berges'], 'In der Karte des Merkhefts kennzeichnet × den Gipfel, also die höchste Stelle.'),
  written('height-interval', 'heights', 'Wie viele Meter Höhenunterschied liegen zwischen zwei benachbarten Linien dieser Karte?', '100', ['100 m', '100 Meter'], 'Die Linien sind mit 100 m, 200 m, 300 m und 400 m beschriftet. Der Abstand in der Höhe beträgt jeweils 100 m.', { kind: 'hill' }),
  written('summit-height', 'heights', 'Wie hoch ist der Gipfel auf dieser Karte? Antworte in Metern.', '450', ['450 m', '450 Meter'], 'Die Zahl am Gipfelzeichen gibt die Höhe an: 450 m.', { kind: 'hill' }),
  choice('profile', 'heights', 'Welcher Punkt liegt in dieser Seitenansicht am höchsten?', 'D', ['B', 'C', 'F'], 'Punkt D liegt bei 300 m und ist damit der höchste Punkt des gezeichneten Profils.', { kind: 'profile' }),

  written('capital', 'germany', 'Wie heißt die Hauptstadt Deutschlands?', 'Berlin', [], 'Berlin ist die Hauptstadt der Bundesrepublik Deutschland.'),
  written('founded', 'germany', 'In welchem Jahr wurde die Bundesrepublik Deutschland gegründet?', '1949', [], 'Die Bundesrepublik Deutschland wurde 1949 gegründet.'),
  written('reunification', 'germany', 'In welchem Jahr war die deutsche Wiedervereinigung?', '1990', [], 'Die deutsche Wiedervereinigung war 1990.'),
  written('state-count', 'germany', 'Wie viele Bundesländer hat Deutschland?', '16', ['sechzehn', '16 Bundesländer'], 'Deutschland besteht aus 16 Bundesländern.'),
  written('neighbours', 'germany', 'An wie viele Länder grenzt Deutschland?', '9', ['neun', '9 Länder', '9 Nachbarländer'], 'Deutschland hat neun Nachbarländer.'),
  written('highest-mountain', 'germany', 'Wie heißt der höchste Berg Deutschlands?', 'Zugspitze', ['die Zugspitze'], 'Die Zugspitze ist Deutschlands höchster Berg.'),
  choice('lake', 'germany', 'Welcher See wird im Merkheft als größter See Deutschlands genannt?', 'Bodensee', ['Chiemsee', 'Starnberger See', 'Tegernsee'], 'Im Merkheft ist der Bodensee gemeint. Er liegt auch in Österreich und der Schweiz. Die Müritz ist der größte See, der vollständig in Deutschland liegt.'),
  choice('flag-colours', 'germany', 'Wie lauten die Farben der deutschen Flagge von oben nach unten?', 'Schwarz – Rot – Gold', ['Rot – Schwarz – Gold', 'Gold – Rot – Schwarz', 'Schwarz – Gold – Rot'], 'Oben ist Schwarz, in der Mitte Rot und unten Gold.'),
  written('eagle', 'germany', 'Welches Tier zeigt das Wappen Deutschlands?', 'Adler', ['ein Adler', 'Bundesadler', 'der Adler', 'ein einköpfiger Adler'], 'Das Wappen zeigt einen schwarzen Adler auf goldfarbenem Grund. Schnabel und Krallen sind rot.'),
  choice('eagle-meaning', 'germany', 'Wofür steht der Adler laut Merkheft?', 'Mut, Freiheit und Stärke', ['Reichtum, Ruhe und Glück', 'Wasser, Wald und Wiesen', 'Frieden, Sport und Handel'], 'Der Adler steht im Merkheft für Mut, Freiheit und Stärke.'),
  ...federalStates.map(state => written(`capital-${state.id}`, 'germany', `Wie heißt die Landeshauptstadt von ${state.name}?`, state.capital, [], `Die Landeshauptstadt von ${state.name} ist ${state.capital}.`)),

  choice('secret', 'elections', 'Welcher Wahlgrundsatz bedeutet: Niemand darf sehen, wen du wählst?', 'Geheim', ['Gleich', 'Allgemein', 'Unmittelbar'], 'Geheim bedeutet, dass du unbeobachtet wählst und deine Wahlentscheidung für dich behalten darfst.'),
  choice('equal', 'elections', 'Welcher Wahlgrundsatz bedeutet: Jede Stimme zählt gleich viel?', 'Gleich', ['Frei', 'Geheim', 'Allgemein'], 'Gleich bedeutet: Die Stimmen haben den gleichen Wert.'),
  choice('free', 'elections', 'Du entscheidest ohne Druck selbst, wen du wählst. Wie heißt dieser Wahlgrundsatz?', 'Frei', ['Geheim', 'Gleich', 'Unmittelbar'], 'Frei bedeutet, dass dich niemand zu einer bestimmten Wahlentscheidung zwingen darf.'),
  choice('general', 'elections', 'Was bedeutet der Wahlgrundsatz „allgemein“?', 'Alle Wahlberechtigten dürfen teilnehmen.', ['Jeder Mensch darf unabhängig vom Alter wählen.', 'Nur wohlhabende Menschen dürfen wählen.', 'Nur Menschen mit einem bestimmten Beruf dürfen wählen.'], 'Alle, die die Voraussetzungen für die jeweilige Wahl erfüllen, sind wahlberechtigt und dürfen teilnehmen.'),
  choice('direct', 'elections', 'Was bedeutet „unmittelbar“ bei einer Wahl?', 'Die Wahl erfolgt direkt, ohne Wahlpersonen dazwischen.', ['Das Ergebnis muss nach einer Minute feststehen.', 'Alle müssen gleichzeitig wählen.', 'Die Wahl muss im Freien stattfinden.'], 'Unmittelbar bedeutet eine direkte Wahl ohne zwischengeschaltete Wahlpersonen.'),
  choice('two-votes', 'elections', 'Bei einer Klassenwahl bekommt ein Kind zwei Stimmen, alle anderen nur eine. Welcher Wahlgrundsatz wird verletzt?', 'Gleich', ['Geheim', 'Unmittelbar', 'Allgemein'], 'Die Kinder hätten unterschiedlich viele Stimmen. Bei einer gleichen Wahl haben ihre Stimmen den gleichen Wert.'),
  choice('show-ballot', 'elections', 'Alle müssen ihren ausgefüllten Stimmzettel vorzeigen. Welcher Wahlgrundsatz wird verletzt?', 'Geheim', ['Gleich', 'Allgemein', 'Unmittelbar'], 'Beim Vorzeigen können andere die Wahlentscheidung sehen. Das verletzt die geheime Wahl.'),
  choice('pressure', 'elections', 'Ein Kind droht: „Wenn du mich nicht wählst, darfst du nicht mitspielen!“ Welcher Wahlgrundsatz wird verletzt?', 'Frei', ['Gleich', 'Geheim', 'Unmittelbar'], 'Mit einer Drohung wird Druck ausgeübt. Die Wahlentscheidung muss frei sein.'),
]
