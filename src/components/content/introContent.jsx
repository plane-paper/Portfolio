const IntroContent = () => (
  <div className="pb-7">
    <h2 className="text-2xl font-semibold uppercase tracking-wide mb-6 text-white border-b border-white pb-2">
      Intro
    </h2>
    <div className="space-y-4 text-white/90 leading-relaxed">
      <p>I am a passionate full-stack and software developer with ample work experience entering the world of Electrical & Computer Engineering at the University of Waterloo.</p>
      <p>I have completed various projects in the past, as big as single-handedly building a core product for Lynkr Inc. (an AI startup) that fetched over 100,000 CAD in revenue and over 3,000 waitlist customers, and as small as designing and building a 3D printed AI cat feeder with integrated machine imaging, or a brainrot translator that helps parents understand their kids.</p> 
      <p>I speak English, Mandarin, and French fluently, and I have a multicultural background, being raised in two countries in my childhood. I am also fluent with most developer tools, most major languages, many modules, and many frameworks.</p>
      <p>I also love to play chess, enjoy various video games, write, or read a nice book. I am decent at cooking, and terrible at giving myself haircuts despite my love for doing it.</p>
      <p>For professional contact, please reach me at my university email: <a href="mailto:r38su@uwaterloo.ca" className="text-blue-300 hover:text-blue-200 underline">r38su@uwaterloo.ca</a>, or my personal email: <a href="mailto:suruiquan10@163.com" className="text-blue-300 hover:text-blue-200 underline">suruiquan8@gmail.com</a>.</p>

      <figure className="mt-6 flex flex-col items-center">
        <img
          src="images/pic01.jpg"
          alt="Me going to the barber for the first time"
          className="w-[90%] md:w-[400px] h-auto rounded"
        />
        <figcaption className="text-sm text-white/60 mt-2 italic">
          The only time that I didn't cut my own hair and went to the barber in my whole life.
        </figcaption>
      </figure>
    </div>
  </div>
);
export default IntroContent;