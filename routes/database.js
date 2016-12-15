// DB Object

const db = { }

// Setup SQL
const sequelize = require( 'sequelize' )

// db.sequelize = sequelize
db.conn = new sequelize('bookrec', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
	host: 'localhost',
	dialect: 'postgres'
})

//>>>>>>>>>>> MODELS

db.book = db.conn.define('book', {
	title: sequelize.STRING,
	author: sequelize.STRING,
	genre: sequelize.ARRAY(sequelize.STRING),
	pages: sequelize.INTEGER,
	linkid: sequelize.INTEGER,
	series: sequelize.BOOLEAN,
	published: sequelize.INTEGER,
	language: sequelize.STRING,
	rating: sequelize.FLOAT,
	summary: sequelize.TEXT
})


// Define relationships between tables


// Create test User
db.conn.sync({force: true}).then( database => {
	db.book.create({
		title: "Harry Potter and the Sorcerer's Stone(Harry Potter #1)",
		author: "J.K. Rowling",
		genre: ["Fantasy", "Young Adult", "Fiction"],
		pages: 320,
		linkid: 3,
		series: true,
		published: 1997,
		language: "English",
		rating: 4.43,
		summary: "Harry Potter's life is miserable. His parents are dead and he's stuck with his heartless relatives, who force him to live in a tiny closet under the stairs. But his fortune changes when he receives a letter that tells him the truth about himself: he's a wizard. A mysterious visitor rescues him from his relatives and takes him to his new home, Hogwarts School of Witchcraft and Wizardry."
	})
	db.book.create({
		title: "The Hitchhiker's Guide to the Galaxy",
		author: "Adam Douglas",
		genre: ["Science Fiction", "Humor", "Fiction"],
		pages: 216,
		linkid: 11,
		series: true,
		published: 1995,
		language: "English",
		rating: 4.2,
		summary: "Seconds before the Earth is demolished to make way for a galactic freeway, Arthur Dent is plucked off the planet by his friend Ford Prefect, a researcher for the revised edition of The Hitchhiker's Guide to the Galaxy who, for the last fifteen years, has been posing as an out-of-work actor."
	})
	db.book.create({
		title: "Mansfield Park",
		author: "Jane Austen",
		genre: ["Classics", "Romance", "Fiction"],
		pages: 560,
		linkid: 45032,
		series: false,
		published: 2003,
		language: "English",
		rating: 3.82,
		summary: "Taken from the poverty of her parents' home, Fanny Price is brought up with her rich cousins at Mansfield Park, acutely aware of her humble rank and with only her cousin Edmund as an ally. When Fanny's uncle is absent in Antigua, Mary Crawford and her brother Henry arrive in the neighbourhood, bringing with them London glamour and a reckless taste for flirtation. As her female cousins vie for Henry's attention, and even Edmund falls for Mary's dazzling charms, only Fanny remains doubtful about the Crawfords' influence and finds herself more isolated than ever."
	})
	db.book.create({
		title: "The Magician's Guild(The Black Magician Trilogy #1)",
		author: "Trudi Canavan",
		genre: ["Fantasy", "Young Adult", "Fiction"],
		pages: 467,
		linkid: 28249,
		series: true,
		published: 2004,
		language: "English",
		rating: 3.96,
		summary: "This year, like every other, the magicians of Imardin gather to purge the city of undesirables. Cloaked in the protection of their sorcery, they move with no fear of the vagrants and miscreants who despise them and their work-—until one enraged girl, barely more than a child, hurls a stone at the hated invaders...and effortlessly penetrates their magical shield."
	})
	db.book.create({
		title: "Murder at the Vicarage(Miss Marple #1)",
		author: "Agatha Christie",
		genre: ["Mystery", "Classics", "Fiction"],
		pages: 288,
		linkid: 16331,
		series: true,
		published: 2006,
		language: "English",
		rating: 4.02,
		summary: "Murder at the Vicarage marks the debut of Agatha Christie’s unflappable and much beloved female detective, Miss Jane Marple. With her gift for sniffing out the malevolent side of human nature, Miss Marple is led on her first case to a crime scene at the local vicarage. Colonel Protheroe, the magistrate whom everyone in town hates, has been shot through the head. No one heard the shot. There are no leads. Yet, everyone surrounding the vicarage seems to have a reason to want the Colonel dead."
	})
	db.book.create({
		title: "A Tale of Two Cities",
		author: "Charles Dickens",
		genre: ["Classics", "Literature", "Fiction"],
		pages: 489,
		linkid: 1953,
		series: false,
		published: 2003,
		language: "English",
		rating: 3.80,
		summary: "After eighteen years as a political prisoner in the Bastille, the ageing Doctor Manette is finally released and reunited with his daughter in England. There the lives of two very different men, Charles Darnay, an exiled French aristocrat, and Sydney Carton, a disreputable but brilliant English lawyer, become enmeshed through their love for Lucie Manette. From the tranquil roads of London, they are drawn against their will to the vengeful, bloodstained streets of Paris at the height of the Reign of Terror, and they soon fall under the lethal shadow of La Guillotine."
	})
	db.book.create({
		title: "Gone Girl",
		author: "Gillian Flynn",
		genre: ["Mystery", "Thriller", "Fiction"],
		pages: 555,
		linkid: 19288043,
		series: false,
		published: 2014,
		language: "English",
		rating: 4.02,
		summary: "On a warm summer morning in North Carthage, Missouri, it is Nick and Amy Dunne’s fifth wedding anniversary. Presents are being wrapped and reservations are being made when Nick’s clever and beautiful wife disappears. Husband-of-the-Year Nick isn’t doing himself any favors with cringe-worthy daydreams about the slope and shape of his wife’s head, but passages from Amy's diary reveal the alpha-girl perfectionist could have put anyone dangerously on edge. Under mounting pressure from the police and the media—as well as Amy’s fiercely doting parents—the town golden boy parades an endless series of lies, deceits, and inappropriate behavior. Nick is oddly evasive, and he’s definitely bitter—but is he really a killer?"
	})
	db.book.create({
		title: "Outlander(Outlander #1)",
		author: "Diana Gabaldon",
		genre: ["Romance", "Historical Fiction", "Fantasy"],
		pages: 896,
		linkid: 10964,
		series: true,
		published: 2005,
		language: "English",
		rating: 4.20,
		summary: "The year is 1945. Claire Randall, a former combat nurse, is just back from the war and reunited with her husband on a second honeymoon when she walks through a standing stone in one of the ancient circles that dot the British Isles. Suddenly she is a Sassenach—an “outlander”—in a Scotland torn by war and raiding border clans in the year of Our Lord...1743."
	})
	db.book.create({
		title: "The Silence of the Lambs(Hannibal Lecter #2)",
		author: "Thomas Harris",
		genre: ["Horror", "Thriller", "Fiction"],
		pages: 338,
		linkid: 23807,
		series: true,
		published: 2002,
		language: "English",
		rating: 4.12,
		summary: "There's a killer on the loose who knows that beauty is only skin deep, and a trainee investigator who's trying to save her own hide. The only man that can help is locked in an asylum. But he's willing to put a brave face on - if it will help him escape."
	})
	db.book.create({
		title: "The Kite Runner",
		author: "Khaled Hosseini",
		genre: ["Contemporary", "Historical Fiction", "Fiction"],
		pages: 371,
		linkid: 77203,
		series: false,
		published: 2004,
		language: "English",
		rating: 4.24,
		summary: "Amir is the son of a wealthy Kabul merchant, a member of the ruling caste of Pashtuns. Hassan, his servant and constant companion, is a Hazara, a despised and impoverished caste. Their uncommon bond is torn by Amir's choice to abandon his friend amidst the increasing ethnic, religious, and political tensions of the dying years of the Afghan monarchy, wrenching them far apart. But so strong is the bond between the two boys that Amir journeys back to a distant world, to try to right past wrongs against the only true friend he ever had."
	})
	db.book.create({
		title: "Les Miserables",
		author: "Victor Hugo",
		genre: ["Classics", "Literature", "Fiction"],
		pages: 1463,
		linkid: 24280,
		series: false,
		published: 1987,
		language: "English",
		rating: 4.13,
		summary: "Introducing one of the most famous characters in literature, Jean Valjean—the noble peasant imprisoned for stealing a loaf of bread—Les Misérables ranks among the greatest novels of all time. In it, Victor Hugo takes readers deep into the Parisian underworld, immerses them in a battle between good and evil, and carries them to the barricades during the uprising of 1832 with a breathtaking realism that is unsurpassed in modern prose. Within his dramatic story are themes that capture the intellect and the emotions: crime and punishment, the relentless persecution of Valjean by Inspector Javert, the desperation of the prostitute Fantine, the amorality of the rogue Thénardier, and the universal desire to escape the prisons of our own minds."
	})
	db.book.create({
		title: "It",
		author: "Stephen King",
		genre: ["Horror", "Fantasy", "Fiction"],
		pages: 1116,
		linkid: 830502,
		series: false,
		published: 1987,
		language: "English",
		rating: 4.16,
		summary: "To the children, the town was their whole world. To the adults, knowing better, Derry, Maine was just their home town: familiar, well-ordered for the most part. A good place to live. It was the children who saw - and felt - what made Derry so horribly different. In the storm drains, in the sewers, IT lurked, taking on the shape of every nightmare, each one's deepest dread. Sometimes IT reached up, seizing, tearing, killing . . . The adults, knowing better, knew nothing."
	})
	db.book.create({
		title: "Air Awakens(Air Awakens #1)",
		author: "Elisa Kova",
		genre: ["Fantasy", "Young Adult", "Magic"],
		pages: 377,
		linkid: 23127048,
		series: true,
		published: 2015,
		language: "English",
		rating: 4.02,
		summary: "Vhalla has always been taught to fear the Tower of Sorcerers, a mysterious magic society, and has been happy in her quiet world of books. But after she unknowingly saves the life of one of the most powerful sorcerers of them all—the Crown Prince Aldrik—she finds herself enticed into his world. Now she must decide her future: Embrace her sorcery and leave the life she’s known, or eradicate her magic and remain as she’s always been. And with powerful forces lurking in the shadows, Vhalla’s indecision could cost her more than she ever imagined."
	})
	db.book.create({
		title: "Prince of Thorns(The Broken Empire #1)",
		author: "Mark Lawrence",
		genre: ["Fantasy", "Dark Fantasy", "Fiction"],
		pages: 384,
		linkid: 9579634,
		series: true,
		published: 2011,
		language: "English",
		rating: 3.87,
		summary: "Before the thorns taught me their sharp lessons and bled weakness from me I had but one brother, and I loved him well. But those days are gone and what is left of them lies in my mother's tomb. Now I have many brothers, quick with knife and sword, and as evil as you please. We ride this broken empire and loot its corpse. They say these are violent times, the end of days when the dead roam and monsters haunt the night. All that's true enough, but there's something worse out there, in the dark. Much worse."
	})
	db.book.create({
		title: "To Kill a Mockingbird(To Kill a Mockingbird #1)",
		author: "Harper Lee",
		genre: ["Classics", "Historical Fiction", "Fiction"],
		pages: 324,
		linkid: 2657,
		series: true,
		published: 2006,
		language: "English",
		rating: 4.25,
		summary: "The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it, To Kill A Mockingbird became both an instant bestseller and a critical success when it was first published in 1960. It went on to win the Pulitzer Prize in 1961 and was later made into an Academy Award-winning film, also a classic."
	})
	db.book.create({
		title: "I Am Number Four(Lorien Legacies #1)",
		author: "Pittacus Lore",
		genre: ["Fantasy", "Young Adult", "Science Fiction"],
		pages: 452,
		linkid: 7747374,
		series: true,
		published: 2010,
		language: "English",
		rating: 3.94,
		summary: "Nine of us came here. We look like you. We talk like you. We live among you. But we are not you. We can do things you dream of doing. We have powers you dream of having. We are stronger and faster than anything you have ever seen. We are the superheroes you worship in movies and comic books--but we are real."
	})
	db.book.create({
		title: "Life of Pi",
		author: "Yann Martel",
		genre: ["Fantasy", "Adventure", "Fiction"],
		pages: 460,
		linkid: 4214,
		series: false,
		published: 2006,
		language: "English",
		rating: 3.88,
		summary: "Life of Pi is a fantasy adventure novel by Yann Martel published in 2001. The protagonist, Piscine Molitor 'Pi' Patel, a Tamil boy from Pondicherry, explores issues of spirituality and practicality from an early age. He survives 227 days after a shipwreck while stranded on a boat in the Pacific Ocean with a Bengal tiger named Richard Parker."
	})
	db.book.create({
		title: "The World of Ice & Fire: The Untold History of Westeros and the Game of Thrones(A Song of Ice and Fire)",
		author: "George R.R. Martin",
		genre: ["Fantasy", "Epic Fantasy", "Fiction"],
		pages: 326,
		linkid: 17345242,
		series: true,
		published: 2014,
		language: "English",
		rating: 4.23,
		summary: "This lavishly illustrated volume is a comprehensive history of the Seven Kingdoms, providing vividly constructed accounts of the epic battles, bitter rivalries, and daring rebellions that lead to the events of A Song of Ice and Fire and HBO’s Game of Thrones."
	})
	db.book.create({
		title: "Cinder(The Lunar Chronicles #1)",
		author: "Marissa Meyer",
		genre: ["Fantasy", "Young Adult", "Science Fiction"],
		pages: 395,
		linkid: 11235712,
		series: true,
		published: 2012,
		language: "English",
		rating: 4.15,
		summary: "Cinder, a gifted mechanic, is a cyborg. She’s a second-class citizen with a mysterious past, reviled by her stepmother and blamed for her stepsister’s illness. But when her life becomes intertwined with the handsome Prince Kai’s, she suddenly finds herself at the center of an intergalactic struggle, and a forbidden attraction. Caught between duty and freedom, loyalty and betrayal, she must uncover secrets about her past in order to protect her world’s future."
	})
	db.book.create({
		title: "Gone with the Wind",
		author: "Margaret Mitchell",
		genre: ["Classics", "Historical Fiction", "Fiction"],
		pages: 1037,
		linkid: 18405,
		series: false,
		published: 1999,
		language: "English",
		rating: 4.27,
		summary: "Gone with the Wind is a novel written by Margaret Mitchell, first published in 1936. The story is set in Clayton County, Georgia, and Atlanta during the American Civil War and Reconstruction era. It depicts the struggles of young Scarlett O'Hara, the spoiled daughter of a well-to-do plantation owner, who must use every means at her disposal to claw her way out of the poverty she finds herself in after Sherman's March to the Sea."
	})
	db.book.create({
		title: "The Night Circus",
		author: "Erin Morgenstern",
		genre: ["Fantasy", "Romance", "Fiction"],
		pages: 400,
		linkid: 9361589,
		series: false,
		published: 2011,
		language: "English",
		rating: 4.03,
		summary: "The circus arrives without warning. No announcements precede it, no paper notices plastered on lampposts and billboards. It is simply there, when yesterday it was not. Within these nocturnal black-and-white striped tents awaits an utterly unique, a feast for the senses, where one can get lost in a maze of clouds, meander through a lush garden made of ice, stare in wonderment as the tattooed contortionist folds herself into a small glass box, and become deliciously tipsy from the scents of caramel and cinnamon that waft through the air. "
	})
	db.book.create({
		title: "Summer, Fireworks, and My Corpse",
		author: "Otsuichi",
		genre: ["Horror", "Asian Literature", "Short Stories"],
		pages: 350,
		linkid: 7326853,
		series: false,
		published: 2010,
		language: "English",
		rating: 3.99,
		summary: "Summer is a simple story of a nine-year-old girl who dies while on summer vacation. While her youthful killers try to hide the her body, she tells us the story--from the point of view of her dead body--of the childrens' attempt to get away with murder. Black Fairy Tale is classic J-horror: a young girl loses an eye in an accident, but receives a transplant. Now she can see again, but what she sees out of her new left eye is the experiences and memories of its previous owner. Its previous deceased owner."
	})
	db.book.create({
		title: "The Casual Vacancy",
		author: "J.K. Rowling",
		genre: ["Fiction", "Contemporary", "Mystery"],
		pages: 503,
		linkid: 13497818,
		series: false,
		published: 2012,
		language: "English",
		rating: 3.27,
		summary: "Pagford is, seemingly, an English idyll, with a cobbled market square and an ancient abbey, but what lies behind the pretty façade is a town at war. Rich at war with poor, teenagers at war with their parents, wives at war with their husbands, teachers at war with their pupils ... Pagford is not what it first seems."
	})
	db.book.create({
		title: "The Dream of the Red Chamber",
		author: "Cao Xueqin",
		genre: ["Classics", "Fiction", "Asian Literature"],
		pages: 352,
		linkid: 535739,
		series: false,
		published: 1958,
		language: "Chinese",
		rating: 4.11,
		summary: "For more than a century and a half, Dream of the Red Chamber has been recognized in China as the greatest of its novels, a Chinese Romeo-and-Juliet love story and a portrait of one of the world's great civilizations. Chi-chen Wang's translation is skillful, accurate and fascinating."
	})
	db.book.create({
		title: "Angel's Awakening(Awakening #1)",
		author: "Akaria Gale",
		genre: ["Paranormal", "Urban Fantasy", "Angels"],
		pages: 182,
		linkid: 23460246,
		series: true,
		published: 2014,
		language: "English",
		rating: 3.58,
		summary: "After a disgraceful two thousand year demotion, Charouth is a heartbeat away from regaining her status as one of Heaven's Elite angels. Her final mission: to retrieve five rare artifacts and prevent Satan's escape from Hell. A formidable task that becomes nearly impossible when Azazel, Satan’s top relic hunter and her ex-lover, joins the quest."
	})
})


module.exports = db

