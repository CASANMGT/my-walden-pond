"""Generate chapters.ts with original reflection content for all 50 chapters."""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from chapter_extended_content import EXTENDED

CHAPTERS = [
    (1, "Blue Angels", "nature-medicine"),
    (2, "Fluttering", "living-deliberately"),
    (3, "Etherealized by a Mountain", "imagination-sacred"),
    (4, "Inorganic and Lumpish", "simplicity-soul"),
    (5, "The Sound of the Rooster", "living-deliberately"),
    (6, "The Sacred Swamp", "nature-medicine"),
    (7, "A Dose of Myself", "authenticity-selfhood"),
    (8, "Accidents", "friendship-time"),
    (9, "Consult Your Genius", "imagination-sacred"),
    (10, "Dipped Toast", "authenticity-selfhood"),
    (11, "The Civilized Apple Tree", "nature-medicine"),
    (12, "A Broad Margin to My Life", "simplicity-soul"),
    (13, "The Sacred Art of Farming", "simplicity-soul"),
    (14, "Walden in Eden", "nature-medicine"),
    (15, "Be Cold and Hungry", "living-deliberately"),
    (16, "The Cold Blood of the Gods", "nature-medicine"),
    (17, "Clodhopper that I Am", "authenticity-selfhood"),
    (18, "The Fern Scriptures", "nature-medicine"),
    (19, "The Apple Tree Building", "work-society"),
    (20, "The Eyelids of the Day", "imagination-sacred"),
    (21, "The Hoary Bloom", "friendship-time"),
    (22, "The Heavens Withdraw", "friendship-time"),
    (23, "I Am Stone", "friendship-time"),
    (24, "Lapse of Time", "friendship-time"),
    (25, "Imported Woods", "work-society"),
    (26, "The Brows of the Earth", "imagination-sacred"),
    (27, "The Music of the World", "friendship-time"),
    (28, "Dried Fungus", "imagination-sacred"),
    (29, "Organic Earth", "simplicity-soul"),
    (30, "Filibustering Toward Heaven", "work-society"),
    (31, "A Respectable Distance", "imagination-sacred"),
    (32, "Our Cousins the Cats", "nature-medicine"),
    (33, "Every Town Needs a Park", "nature-medicine"),
    (34, "My Own Sacraments", "living-deliberately"),
    (35, "My Inner Eastward Mountain", "imagination-sacred"),
    (36, "The Philosophy of Wood", "work-society"),
    (37, "The Mouth of a Reptile", "work-society"),
    (38, "The Poetry of Fish", "nature-medicine"),
    (39, "Room for Thought", "authenticity-selfhood"),
    (40, "Not Spiritual, But Natural", "authenticity-selfhood"),
    (41, "A Rich and Fertile Mystery", "nature-medicine"),
    (42, "Soul Sculpting", "simplicity-soul"),
    (43, "Slight Impulses", "living-deliberately"),
    (44, "On Tiptoe", "living-deliberately"),
    (45, "A Village a University", "work-society"),
    (46, "The Walden Pond Society", "living-deliberately"),
    (47, "What Makes Me Rich", "simplicity-soul"),
    (48, "The Beasts Spoke", "work-society"),
    (49, "Somewhere Between Me and Them", "imagination-sacred"),
    (50, "A Fine Effluence", "nature-medicine"),
]

THEME_NAMES = {
    "nature-medicine": "Nature as Medicine",
    "simplicity-soul": "Simplicity and Soul",
    "living-deliberately": "Living Deliberately",
    "authenticity-selfhood": "Authenticity and Selfhood",
    "imagination-sacred": "Imagination and the Sacred",
    "work-society": "Work, Society, and Resistance",
    "friendship-time": "Friendship, Time, and Inner Weather",
}

CONTENT = {
    1: ("Wonder is a daily medicine.", "Moore invites us to notice the living world as teacher, not backdrop.", "We treat nature as scenery instead of relationship.", "Where did the living world speak to me today?", ["Notice small beauty", "Let wonder return", "Slow down outside", "Receive without agenda"], "Take a three-minute pause outdoors and name one living thing.", "The world is speaking."),
    2: ("Small movements can change a life.", "Fluttering suggests life begins in delicate, almost invisible choices.", "We wait for dramatic change and miss small openings.", "What slight movement am I ignoring?", ["Trust small steps", "Begin gently", "Let life flutter", "Act before certainty"], "Do one small deliberate act you have been postponing.", "Begin with a flutter."),
    3: ("Distance can elevate the soul.", "A mountain seen through morning air lifts thought beyond the trivial.", "We stay trapped in low horizons and urgent noise.", "What in my life needs an azure veil?", ["Look farther", "Seek elevation", "Let beauty lift me", "Gaze once daily"], "Look at the farthest horizon you can find for one minute.", "See through azure."),
    4: ("Life needs organic rhythm.", "Inorganic hurry makes the soul lumpish and dull.", "We live by schedules that ignore inner seasons.", "Where am I living mechanically instead of organically?", ["Slow down", "Make room for silence", "Stop proving myself", "Let rest become sacred"], "Sit for ten minutes without phone, book, or agenda.", "Empty space is not empty."),
    5: ("Awakening is a daily call.", "The rooster's sound is a summons to be fully present.", "We sleepwalk through mornings on autopilot.", "What is calling me to wake up today?", ["Rise with intention", "Answer the call", "Begin awake", "Honor the morning"], "Wake tomorrow without checking your phone for fifteen minutes.", "Answer the rooster."),
    6: ("Sacred places hide in the ordinary.", "A swamp holds mystery, not just mud — the soul's uncivilized depth.", "We sanitize experience and fear what is wild.", "Where is the sacred hiding in plain sight?", ["Honor the wild", "Enter mystery", "Respect the swamp", "Stay curious"], "Visit a place you usually overlook and stay five minutes.", "Sacred is near."),
    7: ("You need a dose of yourself.", "Authentic living requires tasting your own nature, not another's recipe.", "We perform versions of ourselves for approval.", "Where am I imitating instead of inhabiting?", ["Return to myself", "Stop performing", "Take my own measure", "Be honestly me"], "Write one sentence: who am I when no one is watching?", "I am enough."),
    8: ("Accidents can be teachers.", "Unplanned moments reveal what plans conceal.", "We over-control life and miss its gifts.", "What accident might be trying to teach me?", ["Stay open", "Receive surprise", "Loosen control", "Trust interruption"], "Recall one unplanned moment this week and what it showed you.", "Life surprises kindly."),
    9: ("Your genius knows the way.", "Inner genius is not IQ — it is the quiet guide beneath noise.", "We outsource direction to metrics and crowds.", "What is my genius whispering today?", ["Listen inward", "Trust intuition", "Consult silence", "Follow the quiet"], "Sit quietly and ask: what one thing wants my attention?", "Genius is near."),
    10: ("Ordinary life can be sacramental.", "A simple meal dipped in meaning becomes communion.", "We rush through daily rituals without presence.", "What ordinary moment could become sacred today?", ["Slow at meals", "Bless the ordinary", "Taste presence", "Make ritual"], "Eat one meal today without screens and with full attention.", "Ordinary is holy."),
    11: ("Civilization and wildness can coexist.", "The apple tree is both tended and untamed — a model for the soul.", "We split nature from culture and lose both.", "Where can I let wildness live inside my daily life?", ["Tend and trust", "Let life grow", "Honor both", "Cultivate wonder"], "Tend one plant or tree and notice what it teaches.", "Grow with wildness."),
    12: ("Rest is not wasted time.", "Moore reflects on Thoreau's broad margin as sacred leisure where the soul grows.", "We confuse busyness with meaning and worth.", "Where am I confusing busyness with meaning?", ["Slow down", "Make room for silence", "Stop proving myself", "Let rest become sacred"], "Sit for ten minutes without phone, book, or agenda.", "Empty space is not empty."),
    13: ("Farming the soul takes patience.", "Sacred farming is tending inner soil season after season.", "We want instant harvests in a slow world.", "What inner crop needs tending, not forcing?", ["Tend patiently", "Honor seasons", "Work the soil", "Trust growth"], "Name one habit you will tend this week like a garden.", "Tend what grows."),
    14: ("Paradise is nearer than we think.", "Walden as Eden reminds us paradise is presence, not escape.", "We defer joy until conditions are perfect.", "Where is my Eden right now?", ["See paradise near", "Stop deferring joy", "Be here", "Receive now"], "Find one Edenic detail in your ordinary surroundings.", "Eden is here."),
    15: ("Discomfort can clarify desire.", "Cold and hunger strip away what is unnecessary.", "We numb ourselves to avoid honest wanting.", "What discomfort might clarify what I truly need?", ["Welcome clarity", "Simplify wants", "Endure honestly", "Choose deliberately"], "Skip one comfort today and notice what remains.", "Less reveals more."),
    16: ("The gods live in cold blood too.", "Life's cool mysteries — reptile, fish, deep water — expand the sacred.", "We only honor what feels warm and familiar.", "What cold mystery am I dismissing?", ["Expand reverence", "Honor all life", "Stay humble", "Wonder widely"], "Observe a creature or element you usually ignore.", "All life teaches."),
    17: ("Rough authenticity beats polished pretense.", "Clodhopper honesty grounds the soul in real earth.", "We polish ourselves until we disappear.", "Where am I too polished to be real?", ["Be rough and real", "Stand on earth", "Drop pretense", "Own my ground"], "Say one honest thing you have been smoothing over.", "Earth holds me."),
    18: ("Nature writes its own scripture.", "Ferns and moss carry wisdom older than any page.", "We read only human words and miss the world's text.", "What is nature writing that I have not read?", ["Read the wild", "Learn from ferns", "Study silence", "Receive scripture"], "Spend five minutes reading one natural pattern closely.", "The wild teaches."),
    19: ("Buildings can imprison or shelter.", "The apple tree building asks whether structures serve soul or ego.", "We build lives that look impressive but feel hollow.", "What structure in my life needs reimagining?", ["Build for soul", "Question design", "Choose shelter", "Resist hollow"], "Name one structure — literal or metaphorical — that no longer fits.", "Build for living."),
    20: ("Dawn and dusk are eyelids of the day.", "Threshold hours open imagination between waking and dream.", "We rush through transitions without reverence.", "What threshold am I crossing too quickly?", ["Honor dawn", "Pause at dusk", "Mark transitions", "See the veil"], "Watch light change for five minutes at sunrise or sunset.", "Thresholds are holy."),
    21: ("Age has its own bloom.", "Hoary bloom — frost-touched beauty — honors what time ripens.", "We fear aging and miss late beauty.", "What is ripening in me that I have not honored?", ["Honor ripening", "Welcome age", "See late bloom", "Trust time"], "Notice something aged or weathered that is beautiful.", "Time blooms too."),
    22: ("Heavens withdraw to be sought.", "Sacred distance invites longing rather than possession.", "We demand immediate answers and miss mystery.", "Where must I stop grasping and start seeking?", ["Seek don't grasp", "Honor distance", "Stay longing", "Wait reverently"], "Sit with one unanswered question without fixing it.", "Mystery remains."),
    23: ("Stone patience steadies the soul.", "To be stone is to endure without losing center.", "We fracture under pressure and call it progress.", "Where do I need stone steadiness today?", ["Stay centered", "Endure kindly", "Be still", "Hold ground"], "Stand or sit still for three minutes like stone.", "Stillness holds."),
    24: ("Time lapses — and returns us to presence.", "Memory and forgetting teach that only now is truly lived.", "We live in regret or hurry and miss the present.", "What is time teaching me today?", ["Return to now", "Release hurry", "Honor memory", "Live today"], "Name one moment from today you want to fully inhabit.", "Now is enough."),
    25: ("Imported ideals can uproot the local soul.", "Woods from afar may dazzle while nearby trees teach truer.", "We chase distant models and neglect our own ground.", "What local wisdom am I overlooking?", ["Honor the local", "Root here", "Question imports", "Know my woods"], "Learn one thing from your actual surroundings today.", "Home has wisdom."),
    26: ("Earth has brows that lift the mind.", "Mountains as natural temples elevate thought beyond the trivial.", "We stay at ground level in body and spirit.", "What elevation does my soul need today?", ["Gaze upward", "Seek temples", "Lift thought", "Honor mountains"], "Look at the highest point you can see for one minute.", "Earth elevates."),
    27: ("The world is already musical.", "Bird, wind, and water compose a symphony we rarely hear.", "We substitute recorded sound for living music.", "What music of the world am I missing?", ["Listen deeply", "Hear the world", "Pause for sound", "Receive music"], "Close your eyes and identify three natural sounds.", "Listen outward."),
    28: ("Old growth holds new wisdom.", "Dried fungus and driftwood shelves remind us beauty persists in decay.", "We discard what is aged and miss its teaching.", "What old thing still has life to offer?", ["Honor decay", "Keep driftwood", "Value age", "Find beauty"], "Notice something weathered that still carries beauty.", "Age carries gift."),
    29: ("Earth is alive beneath our feet.", "Organic earth thinks in roots, seasons, and slow growth.", "We treat the planet as resource, not kin.", "How can I feel the earth as living today?", ["Feel the living ground", "Walk barefoot if able", "Honor soil", "Think organically"], "Touch soil, grass, or bark and stay with the sensation.", "Earth breathes."),
    30: ("Not all progress moves upward.", "Filibustering toward heaven confuses motion with meaning.", "We chase expansion while the soul starves.", "Where am I moving west when I need to move up?", ["Question progress", "Choose depth", "Resist hollow motion", "Aim upward"], "Name one activity that moves you upward, not just forward.", "Depth over distance."),
    31: ("God keeps a respectful distance.", "Sacred reticence invites reverence rather than possession.", "We demand certainty from what should remain mystery.", "Where do I need more respectful distance?", ["Let mystery be", "Stop grasping", "Honor silence", "Keep distance"], "Spend five minutes without asking anything of the sacred.", "Mystery is gift."),
    32: ("Animals are near philosophers.", "Cats and companions teach intimacy across difference.", "We treat animals as accessories, not teachers.", "What animal wisdom reached me today?", ["Learn from animals", "Receive companionship", "Honor difference", "Stay curious"], "Observe a pet or wild creature with full attention.", "Cousins teach."),
    33: ("Every town needs wild margin.", "Parks and primitive forests are commons for soul and body.", "We pave over refuge and wonder why we feel trapped.", "Where is my park — inner or outer?", ["Seek wild margin", "Protect refuge", "Claim commons", "Rest in green"], "Visit or imagine a wild space and stay ten minutes.", "Wild margin heals."),
    34: ("Invent your own sacraments.", "Rising early, restrained eating, cold water — rituals of attention.", "We inherit rituals that no longer nourish.", "What sacrament could I practice tomorrow?", ["Create ritual", "Rise with care", "Eat with attention", "Swim in meaning"], "Design one small daily sacrament and practice it tomorrow.", "Ritual restores."),
    35: ("Inner mountains guide without moving.", "The eastward mountain exists in imagination yet steers real life.", "We dismiss inner images as fantasy.", "What inner mountain is guiding me?", ["Trust imagination", "Follow inner peak", "Honor vision", "Walk inward"], "Picture a mountain that guides you and name its quality.", "Imagination guides."),
    36: ("Wood teaches honest craft.", "The philosophy of wood is patience, grain, and working with nature.", "We force life against its grain.", "Where am I working against my grain?", ["Work with grain", "Practice craft", "Be patient", "Honor material"], "Do one task slowly, with the patience of wood.", "Grain knows."),
    37: ("Beware the mouth of the reptile.", "Some systems swallow the soul with smiling efficiency.", "We accept dehumanizing structures as normal.", "What reptile mouth am I too close to?", ["Step back", "Question systems", "Protect soul", "Resist swallowing"], "Name one system that diminishes you and one boundary.", "Guard the soul."),
    38: ("Fish poetry swims beneath the surface.", "Water creatures invite metaphor, wonder, and hidden depth.", "We see only the surface of things.", "What depth am I not seeing?", ["Look beneath", "Read poetry", "Wonder deeply", "Honor water"], "Watch water — pond, rain, or cup — for three minutes.", "Depth speaks."),
    39: ("Thought needs room to breathe.", "Inner space is not emptiness but hospitality for mind.", "We fill every gap and wonder why we cannot think.", "Where can I make room for thought?", ["Clear space", "Host thought", "Reduce noise", "Welcome silence"], "Create ten minutes with no input — no screen, no podcast.", "Room invites thought."),
    40: ("Natural is deeper than spiritual performance.", "Being natural beats performing spirituality.", "We spiritualize to avoid being simply human.", "Where am I performing instead of being natural?", ["Be natural", "Drop performance", "Simplify faith", "Stay human"], "Do one thing today without making it meaningful — just be.", "Natural suffices."),
    41: ("Mystery is fertile, not empty.", "Rich mystery invites wonder rather than explanation.", "We explain away what should remain fertile unknown.", "What mystery am I trying to solve too soon?", ["Stay fertile", "Welcome mystery", "Resist explaining", "Wonder on"], "Hold one question open without researching an answer.", "Mystery feeds."),
    42: ("The soul is sculpted slowly.", "Soul sculpting is daily shaping by attention and choice.", "We want instant transformation.", "What is being sculpted in me right now?", ["Sculpt patiently", "Choose daily", "Shape with care", "Trust process"], "Name one habit that is sculpting your soul.", "Sculpt slowly."),
    43: ("Slight impulses matter.", "Small inner nudges often carry the true direction.", "We override subtle knowing with loud obligation.", "What slight impulse am I overriding?", ["Follow slightness", "Trust nudges", "Act small", "Listen low"], "Act on one small impulse you would normally ignore.", "Small leads."),
    44: ("Live on tiptoe — alert and gentle.", "Tiptoe attention is awake without aggression.", "We stomp through life or sleep through it.", "Where can I be more gently alert?", ["Walk on tiptoe", "Stay awake", "Move gently", "Notice more"], "Move through one hour today with extra gentleness and notice.", "Gentle alertness."),
    45: ("A village can be a university.", "Every neighbor and street corner can teach if we attend.", "We seek experts far away and miss local wisdom.", "Who in my village could teach me today?", ["Learn locally", "Honor neighbors", "Study nearby", "Stay teachable"], "Ask one person or observe one local scene with student eyes.", "Nearby teaches."),
    46: ("Society begins at the pond.", "Walden Pond society is soulful community, not crowd.", "We confuse connection with communion.", "What society truly nourishes my soul?", ["Choose soulful society", "Seek depth", "Resist crowd", "Find pond"], "Reach out to one person for real conversation.", "Depth over crowd."),
    47: ("Richness is not what we accumulate.", "What makes me rich is presence, relation, and inner margin.", "We measure wealth by what depletes us.", "What actually makes me rich today?", ["Count real wealth", "Simplify desire", "Honor enough", "Name richness"], "List three things that make you rich without money.", "Enough is rich."),
    48: ("The beasts spoke — and still do.", "Animal voices carry truth when human language fails.", "We silence non-human wisdom.", "What might beasts be saying that I ignore?", ["Listen to beasts", "Honor voice", "Stay humble", "Receive message"], "Spend time with an animal or imagine one speaking truth.", "Beasts speak."),
    49: ("Between me and them is sacred ground.", "The space between self and other holds mystery and relation.", "We collapse distance or flee it entirely.", "What lives in the space between me and another?", ["Honor between", "Stay in relation", "Hold mystery", "Bridge gently"], "Reflect on one relationship and what lives between you.", "Between is holy."),
    50: ("Life effluences — it overflows generously.", "A fine effluence is the soul's generous overflow into the world.", "We hoard inner life and wonder why we feel dry.", "What wants to overflow from me today?", ["Let life overflow", "Give generously", "Share beauty", "Effluence outward"], "Offer one small generosity without expecting return.", "Overflow blesses."),
}

WALDEN = ["Quiet walk", "Balcony", "Tree", "Morning light", "Reading chair", "Park bench", "Cup of tea", "Moment of silence"]
MECH = ["Work", "Phone", "Business metrics", "Sleep worry", "Money", "Health worry", "News", "Relationship"]
NATURE = ["Tree", "Rain", "Bird", "Water", "Wind", "Sky", "Sunlight", "Soil", "Flower", "Pet"]

def esc(s):
    return s.replace("\\", "\\\\").replace('"', '\\"')

def main():
    lines = ['import type { ChapterModule } from "@/types";', '', 'export const chapters: ChapterModule[] = [']
    for num, title, theme_id in CHAPTERS:
        core, insight, problem, question, learning, practice, mantra = CONTENT[num]
        explanation, life_impl, impl_steps = EXTENDED[num]
        theme_name = THEME_NAMES[theme_id]
        tags = [t.strip() for t in problem.lower().replace("?", "").split() if len(t) > 4][:3]
        lines.append('  {')
        lines.append(f'    chapterNumber: {num},')
        lines.append(f'    chapterTitle: "{esc(title)}",')
        lines.append(f'    themeId: "{theme_id}",')
        lines.append(f'    themeName: "{theme_name}",')
        lines.append(f'    coreLesson: "{esc(core)}",')
        lines.append(f'    bookInsight: "{esc(insight)}",')
        lines.append(f'    modernProblem: "{esc(problem)}",')
        lines.append(f'    dailyQuestion: "{esc(question)}",')
        lines.append(f'    learningOptions: {json_list(learning)},')
        lines.append(f'    waldenOptions: {json_list(WALDEN[:6])},')
        lines.append(f'    mechanicalOptions: {json_list(MECH[:5])},')
        lines.append(f'    natureOptions: {json_list(NATURE[:5])},')
        lines.append(f'    practice: "{esc(practice)}",')
        lines.append(f'    mantra: "{esc(mantra)}",')
        lines.append(f'    rescueTags: {json_list(tags or ["rest", "nature", "presence"])},')
        lines.append(f'    explanation: "{esc(explanation)}",')
        lines.append(f'    lifeImplementation: "{esc(life_impl)}",')
        lines.append(f'    implementationSteps: {json_list(impl_steps)},')
        lines.append('  },')
    lines.append('];')
    lines.append('')
    lines.append('export function getChapterByNumber(n: number): ChapterModule | undefined {')
    lines.append('  return chapters.find((c) => c.chapterNumber === n);')
    lines.append('}')
    lines.append('')
    lines.append('export function getChaptersByTheme(themeId: string): ChapterModule[] {')
    lines.append('  return chapters.filter((c) => c.themeId === themeId);')
    lines.append('}')
    out = "\n".join(lines)
    path = r"c:\Users\claux\OneDrive\Documents\Casan\Walden Pond\src\data\chapters.ts"
    import os
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(out)
    print(f"Wrote {path}")

def json_list(items):
    return "[" + ", ".join(f'"{esc(i)}"' for i in items) + "]"

if __name__ == "__main__":
    main()
