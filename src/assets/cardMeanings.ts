type Entry = {
  meaning: string;
  meaningR: string;
};

type CardMeaning = {
  [name: string]: Entry;
};

export const cardMeanings: CardMeaning = {
  "major0_fool": {
    meaning: "Beginnings, Spontaneity, Being Carefree, Embracing Folly",
    meaningR: "Hubris, Recklessness, Need for planning ahead",
  },
  "major1_magician": {
    meaning: "Free-thinking, Brilliant Ideas, Initiative, Resourcefulness",
    meaningR: "Poor planning, Manipulation, Being out of touch, Uncertainty",
  },
  "major2_priestess": {
    meaning: "Intuition, Balance, Mystery, Knowledge",
    meaningR: "Disregarding your intuition, Repressed feelings, Superficiality",
  },
  "major3_empress": {
    meaning: "Abundance, Parenthood, Nature, Nourishment",
    meaningR: "Dependence, Strained relationships, Neglecting needs",
  },
  "major4_emperor": {
    meaning: "Stability, power, protection, authority",
    meaningR: "Abuse of power, Lack of self control, possessiveness",
  },
  "major5_hierophant": {
    meaning: "Spiritual Guidance, Compassion, Tradition, Conformity",
    meaningR: "Restriction, Rebellion, Challenging Status Quo",
  },
  "major6_lovers": {
    meaning: "Beginning of a relationship, Choice, Encounters, Union",
    meaningR: "Poor decisions, Discord, Imbalance",
  },
  "major7_chariot": {
    meaning: "Victory, Acknowledgement, Radical behavior, Resolution",
    meaningR: "Loss of control, Misplaced aggression, Buckling under pressure",
  },
  "major8_strength": {
    meaning: "Courage, Power, Idealism, Moral triumph",
    meaningR: "Weakness, Self-doubt, lack of self-control",
  },
  "major9_hermit": {
    meaning: "Introspection, Separation from material, Solitude, Guidance",
    meaningR: "Isolation, Abandonment, Withdrawal",
  },
  "major10_wheel": {
    meaning: "Cycles, Passage of time, Luck, Precariousness",
    meaningR: "Bad luck, external influence, loss of control",
  },
  "major11_justice": {
    meaning: "Balance, Equity, Consequences, Punishment or Reward",
    meaningR: "Unfairness, dishonesty, corruption",
  },
  "major12_hanged": {
    meaning: "Ordeals, Change in perception, Transition",
    meaningR: "Indecision, martyrdom, delay",
  },
  "major13_death": {
    meaning: "Change, Beginnings and Ends, Fear, Impossibility of changing the past",
    meaningR: "Resisting change, unable to move on",
  },
  "major14_temperance": {
    meaning: "Moderation, Patience, Harmony, Rest",
    meaningR: "Imbalance, excess, shortsightedness",
  },
  "major15_devil": {
    meaning: "Excess, Passion, Questionable Morality, Turmoil",
    meaningR: "Breaking free, regaining control, detachment",
  },
  "major16_tower": {
    meaning: "Arrogance, Destruction, Sudden imbalance, Confinement",
    meaningR: "Fear of change, avoiding disaster",
  },
  "major17_star": {
    meaning: "Hope, Good omens, Motivation, Grace",
    meaningR: "Discouragement, Despair, Bad omens",
  },
  "major18_moon": {
    meaning: "Visions, The Unknown, Superficiality, Illusion",
    meaningR: "Unhappiness, Confusion, Overcoming fear",
  },
  "major19_sun": {
    meaning: "Pride, Satisfaction, Clarity, Happiness",
    meaningR: "Depression, Temporary setbacks, The darkness before the dawn",
  },
  "major20_judgement": {
    meaning: "Culmination, Test, Moral awakening, Consequences",
    meaningR: "Self-doubt, Caution, Impeding Action, Difficulty",
  },
  "major21_world": {
    meaning: "Perfection, Completeness, Success",
    meaningR: "Incomplete, Lack of closure, Losing focus before reaching your goal",
  },
  "wands1": {
    meaning: "Creation, Inspiration, Initiative",
    meaningR: "Lack of motivation, Hindrances",
  },
  "wands2": {
    meaning: "Planning, Discovery, Progress",
    meaningR: "Lack of planning, Being unprepared, Fear of the unknown",
  },
  "wands3": {
    meaning: "Rapid Growth, Foresight, Expansion",
    meaningR: "Delays, Obstacles before your goals",
  },
  "wands4": {
    meaning: "Peace, Refuge, Community, Celebration",
    meaningR: "Miscommunication, Family or social troubles,",
  },
  "wands5": {
    meaning: "Conflict, Tension, Competition",
    meaningR: "Avoiding conflict, Diversity, Meeting in the middle",
  },
  "wands6": {
    meaning: "Progress, Victory, Being recognized for your merits",
    meaningR: "Fall from grace, Egotism, Losing confidence",
  },
  "wands7": {
    meaning: "Challenge, Perseverance, Struggle",
    meaningR: "Becoming overwhelmed, Giving up",
  },
  "wands8": {
    meaning: "Travel, Speed, Swift change",
    meaningR: "Waiting, Delays, Frustration",
  },
  "wands9": {
    meaning: "Persistence, Resilience, Defense",
    meaningR: "Hesitation, Paranoia, Overly Defensive",
  },
  "wands10": {
    meaning: "Burdens, Stress, Responsibility, Hard work",
    meaningR: "Over-doing it, Biting off more than you can chew, avoiding responsibility",
  },
  "wandsP": {
    meaning: "Exploration, Free spirit, Enthusiasm",
    meaningR: "Pessimism, New ideas cowed by setbacks, Being directionless",
  },
  "wandsKn": {
    meaning: "Energy, Impulsiveness, Adventure",
    meaningR: "Being unfocused, Frustration, Rushing in to a situation",
  },
  "wandsQ": {
    meaning: "Warmth, Determination, Magnetism, Friendliness",
    meaningR: "Shyness or aloofness, Being too demanding, Aggressiveness",
  },
  "wandsK": {
    meaning: "Vision, Honor, Natural leadership",
    meaningR: "Ruthlessness, High expectations, Impulsiveness",
  },
  "cups1": {
    meaning: "Abundance, Overflowing emotion",
    meaningR: "Repressed emotion, Expressing emotion in unhelpful ways",
  },
  "cups2": {
    meaning: "Marriage, Partnership",
    meaningR: "A breakup, disharmony in relationships",
  },
  "cups3": {
    meaning: "Celebration, community, friendship",
    meaningR: "An affair, stifled creativity, social troubles",
  },
  "cups4": {
    meaning: "Apathy, Contemplation, Saturation, Lack of motivation",
    meaningR: "Aloofness, Missing an opportunity, The danger of complacency",
  },
  "cups5": {
    meaning: "Loss, Regret, Despair",
    meaningR: "Acceptance, Moving on, Forgiveness",
  },
  "cups6": {
    meaning: "Nostalgia, Innocence, Childhood",
    meaningR: "Naivety, Being stuck in the past",
  },
  "cups7": {
    meaning: "Choices, Wishful Thinking, Imagination",
    meaningR: "Temptation, Illusions, Distraction",
  },
  "cups8": {
    meaning: "Abandonment, Retreat, Escapism",
    meaningR: "Hopelessness, Aimless drifting",
  },
  "cups9": {
    meaning: "Fulfillment, Comfort, Satisfaction",
    meaningR: "Materialism, Greed, Dissatisfaction",
  },
  "cups10": {
    meaning: "Harmony, Happiness, Family",
    meaningR: "Broken home, Misaligned values",
  },
  "cupsP": {
    meaning: "A messenger, Creative ventures, Heeding intuition",
    meaningR: "Creative Block, emotional immaturity",
  },
  "cupsKn": {
    meaning: "Romanticism, Imagination, A knight in shining armor",
    meaningR: "Overindulging in fantasy, Emotions running rampant, Becoming disillusioned",
  },
  "cupsQ": {
    meaning: "Compassion, Emotional security, Intuition",
    meaningR: "Insecurity, co-dependency, Emotion separating from sense",
  },
  "cupsK": {
    meaning: "Emotional balance and control",
    meaningR: "Emotional manipulation, moodiness",
  },
  "pentacles1": {
    meaning: "Prosperity, Financial opportunity, Acquisition",
    meaningR: "Missed opportunity, Impediments, Exploitation",
  },
  "pentacles2": {
    meaning: "Balance, Adapting, Sorting priorities",
    meaningR: "Disorganization, Financial chaos",
  },
  "pentacles3": {
    meaning: "Masterful skill, Collaboration, Learning",
    meaningR: "Lack of teamwork, Under-utilizing or misusing skills",
  },
  "pentacles4": {
    meaning: "Security, Being conservative, Control, Thriftiness",
    meaningR: "Greed, Materialism, Self interest",
  },
  "pentacles5": {
    meaning: "Insecurity, Poverty, Shortage",
    meaningR: "Recovery from financial or material loss, Moral or Spiritual poverty",
  },
  "pentacles6": {
    meaning: "Charity, Sharing wealth, Prosperity",
    meaningR: "Selfishness, Kindness being taken for granted or exploited, False kindness",
  },
  "pentacles7": {
    meaning: "Investment, Reward, Results of hard work",
    meaningR: "Shortsightedness, Limited success",
  },
  "pentacles8": {
    meaning: "Education, Quality, Dedication",
    meaningR: "Low ambition, Poor work ethic, Perfectionism",
  },
  "pentacles9": {
    meaning: "Prudence, Luxury, Material security, Self-sufficiency",
    meaningR: "Financial setbacks, Overworking, Unsustainable lifestyle",
  },
  "pentacles10": {
    meaning: "Family prosperity, Inheritance, retirement",
    meaningR: "Financial failure, Loneliness, Loss",
  },
  "pentaclesP": {
    meaning: "Studying, Applying knowledge, Acquiring a new job",
    meaningR: "Lack of progress, Focusing on the short term",
  },
  "pentaclesKn": {
    meaning: "Professionalism, Responsibility, Efficiency",
    meaningR: "Laziness, Irresponsibility, Boredom",
  },
  "pentaclesQ": {
    meaning: "Security, practicality, Nurturing",
    meaningR:
      "Imbalance of work and leisure, Either smothering or being too isolated from loved ones",
  },
  "pentaclesK": {
    meaning: "Control, Power, Discipline, Abundance",
    meaningR: "Domineering, over-controlling",
  },
  "swords1": {
    meaning: "Triumph, Conquest, Raw Power, A Breakthrough",
    meaningR: "Chaos, Confusion, Lack of Clarity",
  },
  "swords2": {
    meaning: "Balance, Adjustment, Stalemate, Choice",
    meaningR: "Indecision, Overwhelming information, Being at a crossroads",
  },
  "swords3": {
    meaning: "Heartbreak, Turbulence, Rejection, Removal",
    meaningR: "Recovering from pain, Forgiving, Optimism",
  },
  "swords4": {
    meaning: "Rest, Vigil, Solitude, Contemplation",
    meaningR: "Over-exertion, Burn-out, Restlessness",
  },
  "swords5": {
    meaning: "Defeat, Infamy, Disgrace, Betrayal",
    meaningR: "Moving past a grudge or conflict, Moving on, Old wounds reopening",
  },
  "swords6": {
    meaning: "Necessary change or transition, Rite of passage, moving forward despite regrets",
    meaningR: "Emotional baggage, being unable to move on, being held back mentally",
  },
  "swords7": {
    meaning: "Betrayal, Deceit, Guile",
    meaningR: "Getting caught, Breaking habits, Accepting challenge",
  },
  "swords8": {
    meaning: "Being trapped, Blindness, Obstacles",
    meaningR: "Self-acceptance, Freedom, Opportunity",
  },
  "swords9": {
    meaning: "Despair, Nightmares, Remorse, Anxiety",
    meaningR: "Getting perspective, Resolving anxieties, Reassurance",
  },
  "swords10": {
    meaning: "Betrayal, Endings, Inevitability, Emptiness",
    meaningR: "New beginnings, Release from pain, Light at the end of the tunnel",
  },
  "swordsP": {
    meaning: "Attention, Circumspection, Curiousity, Energy",
    meaningR: "Gumption, Haste, Bravado, Undelivered promises",
  },
  "swordsKn": {
    meaning: "Courage, Righteous Anger, Hostility, Action",
    meaningR: "Recklessness, Thoughtless action, Scattered thoughts",
  },
  "swordsQ": {
    meaning: "Independence, Perception, Quick Thinking",
    meaningR: "Cold-heartednesss, Being over emotional, Cruelty",
  },
  "swordsK": {
    meaning: "Charisma, Judiciousness, Intellectual power",
    meaningR: "Tyranny, Abuse, Manipulation",
  },
};

export default cardMeanings;
