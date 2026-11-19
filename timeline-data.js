// Edit the text here. Each entry = one step in the timeline.
// "image" is the file name inside the images folder.
const ERAS = [
  {
    short: "Early music",
    years: "Beginnings to 1600",
    title: "Early music",
    image: "timeline-early.jpg",
    alt: "Placeholder picture for early music",
    text: "Music is older than writing. Bone flutes found in caves in Germany are about 40,000 years old, which makes them some of the oldest instruments ever found. For thousands of years songs were passed on by ear as folk music. In the Middle Ages, monks developed ways of writing music down, and by the 1500s people were playing lutes, viols and early keyboards at home and at court.",
    fact: "Most early songs were never written down, so we only know them because people kept singing them."
  },
  {
    short: "Baroque",
    years: "About 1600 to 1750",
    title: "Baroque",
    image: "timeline-1.jpg",
    alt: "Musicians playing a lute, violin, viol and harpsichord in an old painting",
    text: "Opera was born in Italy around 1600, and the orchestra began to take shape, led by the violin family. Baroque music is rich and decorated, with many melodies woven together. Johann Sebastian Bach, George Frideric Handel and Antonio Vivaldi were its stars. Vivaldi's The Four Seasons was published in 1725, and Handel's Messiah was first performed in 1742.",
    fact: "Bach wrote so much music that his works are catalogued by number, and the list goes past 1,000."
  },
  {
    short: "Classical",
    years: "About 1750 to 1830",
    title: "Classical",
    image: "timeline-2.jpg",
    alt: "A conductor leading an orchestra and choir on stage",
    text: "Composers such as Haydn, Mozart and Beethoven shaped the modern orchestra, with strings, woodwinds, brass and percussion playing together from written scores. Symphonies, concertos and sonatas became the main forms. Beethoven's Ninth Symphony, first performed in 1824, was the first major symphony to add a choir.",
    fact: "A conductor doesn't make a sound. Their job is to keep the whole orchestra together."
  },
  {
    short: "Jazz and blues",
    years: "1890s to 1940s",
    title: "Jazz and blues",
    image: "timeline-3.jpg",
    alt: "A black and white photo of an early jazz band with tuba, drums and banjo",
    text: "The blues grew out of African American communities in the American South. Jazz followed in New Orleans in the early 1900s, mixing blues, ragtime and brass band music. Its big idea was improvisation: players make up parts on the spot. Louis Armstrong and Duke Ellington helped turn jazz into a worldwide sound.",
    fact: "The first jazz record was released in 1917, so jazz was one of the first styles people could hear on a recording."
  },
  {
    short: "Rock and roll",
    years: "1950s",
    title: "Rock and roll",
    image: "timeline-4.jpg",
    alt: "A 1950s band in plaid jackets with a Rock Around the Clock record",
    text: "In the 1950s, rhythm and blues, country and gospel came together with the electric guitar and a strong backbeat. Bill Haley and His Comets recorded \"Rock Around the Clock\" in 1954, and it became a huge hit in 1955. Elvis Presley and Chuck Berry soon made rock and roll the music of a new young audience.",
    fact: "Many teenagers in the 1950s had their own record players for the first time, which helped rock and roll spread."
  },
  {
    short: "Pop, disco, funk",
    years: "1960s to 1990s",
    title: "Pop, disco and funk",
    image: "timeline-5.jpg",
    alt: "A funk band with horns playing on a stage with red lights",
    text: "Funk, led by James Brown, put the rhythm and the groove first. Disco filled dance floors in the 1970s with a steady four-beat pulse, and pop became truly global as music videos arrived in the 1980s. Michael Jackson's album Thriller, from 1982, is one of the best-selling albums ever.",
    fact: "Funk bands often used horn sections, which is why brass instruments are still a big part of the sound today."
  },
  {
    short: "Hip-hop",
    years: "1970s to today",
    title: "Hip-hop",
    image: "timeline-6.jpg",
    alt: "A breakdancer balancing on one hand while a crowd watches",
    text: "Hip-hop began in the Bronx, New York, in the early 1970s. It has four main elements: DJing, rapping (or MCing), breaking and graffiti art. DJs looped the best parts of records so people could dance longer, and MCs added rhymes on top. \"Rapper's Delight\" in 1979 brought hip-hop to a much bigger audience.",
    fact: "Breakdancing is part of hip-hop, so a dancer on the street is just as much a part of the music's story as a rapper."
  },
  {
    short: "Electronic",
    years: "1960s to 2000s",
    title: "Electronic and digital",
    image: "timeline-7.jpg",
    alt: "A music producer using a keyboard and computer in a studio",
    text: "Synthesizers and drum machines let musicians make sounds no instrument had made before. In 1983, a standard called MIDI let keyboards, synthesizers and computers talk to each other. Soon anyone with a computer and some software could record, edit and mix a whole song at home.",
    fact: "MIDI doesn't send sound. It sends instructions, like which note to play and how hard, so it uses very little data."
  },
  {
    short: "Streaming",
    years: "2000s to today",
    title: "The streaming era",
    image: "timeline-8.jpg",
    alt: "Logos of music streaming apps on a blue background",
    text: "Napster showed in 1999 that music could travel over the internet, and Apple's iTunes Store made legal downloads popular in 2003. Spotify launched in 2008, and today streaming services put millions of songs in your pocket. Computers now recommend what to play next by learning from what people like.",
    fact: "Streaming changed how we listen. We now choose from millions of songs instead of owning a few albums."
  }
];
