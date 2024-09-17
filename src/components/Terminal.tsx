import { useEffect } from 'react';
import './Terminal.css';

function Terminal() {

  useEffect(() => {
    const promtInput = document.getElementById('promtInput') as HTMLInputElement | null;
    // const terminal = document.getElementById('terminal') as HTMLDivElement | null;
    const terminalWindow = document.getElementById('terminalWindow') as HTMLDivElement | null;
    const dateElement = document.getElementById('date') as HTMLSpanElement | null;
    if (dateElement) {
      dateElement.innerText = new Date().toDateString();
    }
    else {
    }

    if (promtInput) {
      promtInput.focus();
    }

    const handleClick = () => {
      if (promtInput) promtInput.focus();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        enterCommand(event);
      }
    };

    if (terminalWindow) {
      terminalWindow.addEventListener('click', handleClick);
    }

    if (promtInput) {
      promtInput.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (terminalWindow) {
        terminalWindow.removeEventListener('click', handleClick);
      }
      if (promtInput) {
        promtInput.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, []);
  const enterCommand = (event: KeyboardEvent) => {
    const terminal = document.getElementById('terminal') as HTMLDivElement;
    const promtInput = document.getElementById('promtInput') as HTMLInputElement;

    if (terminal) {
      const promtElement = document.getElementById('promptClone')!.cloneNode(true) as HTMLElement;
      promtElement.classList.remove('hidden');
      (promtElement.getElementsByClassName('promtCloneInput')[0] as HTMLElement).innerText = (event.target as HTMLInputElement).value;
      promtElement.removeAttribute('id');
      promtElement.getElementsByClassName('promtCloneContent')[0].appendChild(selectCommandBlock((event.target as HTMLInputElement).value));
      terminal.appendChild(promtElement);
      if (promtInput) {
        promtInput.value = '';
        promtInput.scrollIntoView({ block: 'start' });
      }
    }
  }

  const selectCommandBlock = (command: string): HTMLElement => {
    const lowerCommand = command.toLowerCase();
    switch (lowerCommand) {
      case 'help':
      case 'about':
      case 'social':
      case 'skills':
      case 'education':
      case 'experience':
      case 'projects':
      case 'cv':
        if (lowerCommand === 'cv') {
          return createProgressElement();
        }
        return getCommandTemplate(lowerCommand);
      case 'clear':
        return clearCommand();
      default:
        return notFoundCommand(command);
    }
  }

  const createProgressElement = (): HTMLElement => {
    const template = document.getElementById('cv');
    if (!template) {
      return document.createElement('div');
    }

    const clonedTemplate = template.cloneNode(true) as HTMLElement;
    clonedTemplate.classList.remove('hidden');
    clonedTemplate.removeAttribute('id');

    const progressBar = clonedTemplate.querySelector('.progress-bar') as HTMLDivElement | null;
    const checkAd = clonedTemplate.querySelector('.check') as HTMLSpanElement | null;
    const progressMessage = clonedTemplate.querySelector('.progress-message') as HTMLDivElement | null;

    if (progressBar && checkAd && progressMessage) {
      simulateProgress(progressBar, progressMessage, checkAd);
    } else {
    }


    return clonedTemplate;
  };


  const getCommandTemplate = (command: string): HTMLElement => {
    const element = document.getElementById(command);

    if (element) {
      const clonedElement = element.cloneNode(true) as HTMLElement;
      clonedElement.classList.remove('hidden');
      clonedElement.removeAttribute('id');
      return clonedElement;
    } else {
      return notFoundCommand(command);
    }
  }

  const clearCommand = (): HTMLElement => {
    const element = document.createElement('span');
    const terminal = document.getElementById('terminal') as HTMLDivElement | null;
    if (terminal) {
      terminal.innerHTML = '';
    }
    return element;
  }

  const notFoundCommand = (command: string): HTMLElement => {
    const element = document.createElement('div');
    element.innerText = `-bash: ${command}: command not found`;
    element.classList.add('error');
    return element;
  }

  function simulateProgress(progressBar: HTMLDivElement, progressMessage: HTMLDivElement, checkAd: HTMLSpanElement): void {
    let progress = 0;

    const progressInterval = setInterval(() => {
      if (progress <= 100) {
        progressBar.textContent = '#'.repeat(Math.floor(progress / 2));
        progressBar.style.width = `${progress}%`;
        progressMessage.textContent = `Downloading... ${progress}%`;
        progress += 1;
      } else {
        clearInterval(progressInterval);
        progressMessage.textContent = 'Complete download!';
        checkAd.textContent = 'Please check your Downloads folder! :D';
        downloadCv();
      }
    }, 29);
  }


  function downloadCv(): void {
    const enlace = document.createElement('a');
    enlace.href = '/Jayro_Guerrero_CV.pdf';
    enlace.download = 'Jayro_Guerrero_cv.pdf';
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
  }


  return (
    <>
      <main>
        <div className="header">
          <div className="test">
            <svg xmlns="http://www.w3.org/2000/svg" height="20px"
              viewBox="31.98258924 32.28452272 135.54499681 136.49547728">
              <path
                d="m95.72 81.45v12.55l-30.11-30.1 10-10 15.19 15.2a9.75 9.75 0 0 0 -.61 3.43 9.91 9.91 0 0 0 5.53 8.92zm9.23 1.81 4.68 4.68-4.68 4.69zm28.64-19.26-18.09 18.07-6.09-6.07a9.83 9.83 0 0 0 .54-4.67 10 10 0 0 0 -9.39-8.68 9.64 9.64 0 0 0 -3.89.6l-15.2-15.25 12.88-12.84a7.36 7.36 0 0 1 10.42 0z"
                fill="#ff8080" />
              <path
                d="m89.74 105.53-27.36 27.36-27.15-26.89a8.49 8.49 0 0 1 .09-11.86l28-28 26.42 26.51a9.12 9.12 0 0 1 0 12.88z"
                fill="#80b3ff" />
              <path
                d="m105 108.79v11.49a9.46 9.46 0 0 1 4.46 9.88 9.32 9.32 0 0 1 -7.42 7.53 9.47 9.47 0 0 1 -6.32-17.69v-12.7a1 1 0 0 0 -1.63-.68l-28.67 28.66 29.5 29.5a7.33 7.33 0 0 0 10.36 0l27.83-27.78z"
                fill="#ffe680" />
              <path
                d="m163.54 107.45-26.54 26.55-28.58-28.58a8.56 8.56 0 0 1 0-12.1l3.29-3.32 7.29 7.27a9.92 9.92 0 1 0 5.88-5.88l-7.25-7.24 18.54-18.53 27.37 27.38a10.19 10.19 0 0 1 0 14.45z"
                fill="#8dd35f" />
            </svg>
          </div>
          <span>MYPORTFOLIOW64:/c/Users/JayroGT</span>
        </div>

        <div className="terminal" id="terminalWindow">
          <section id="terminal">
            <div className="space-bottom">




              <div className="command">Successful login - <span className="error" id="date"></span></div>
              <div>
                <pre>{
                  `
                    _\\|/_
 __^__              (o o)                                     __^__
( ___ )----------oOO-{_}-OOo---------------------------------( ___ )
 | / |                                                        | / |
 | / |                                                        | / |
 | / |         Hello, welcome to Jayro's portfolio            | / |
 |___|                                                        |___|
 |___|                                                        |___|
(_____)------------------------------------------------------(_____)
    `}
                </pre>
                <h4>

                  Feel free to use the <span className="command">help</span> to see the commands.
                </h4>
              </div>

            </div>
          </section>
          <div className="prompt">
            <span className="title-console color1">Jayro@LAPTOP-I40Y123W</span>
            <span className="title-console color2">JayroGT</span>
            <span className="title-console color3">~</span>
            <span className="title-console color4">(main)</span>
            <span className="command space-right">$</span>
            <input id="promtInput" />
          </div>
        </div>
      </main>

      {/* <!-- CUERPO INTERACTIVO --> */}
      <div className="hidden space-bottom" id="promptClone">
        <span className="title-console color1">Jayro@LAPTOP-I40Y123W</span>
        <span className="title-console color2">JayroGT</span>
        <span className="title-console color3">~</span>
        <span className="title-console color4">(main)</span>
        <span className="command space-right">$</span>
        <span className="promtCloneInput"></span>
        <div className="promtCloneContent"></div>
      </div>

      {/* <!-- HELP --> */}
      <div className="hidden space-bottom" id="help">
        {/* <!-- <div> --> */}
        <div className="sectionTitle">You can enter any of these commands: </div>
        <div className="indent content-help">
          <div className="row-flex">
            <span className="command">About</span>:
            <div className="indent">You will find a brief introduction about me</div>
          </div>
          <div className="row-flex">
            <span className="command">Social</span>:
            <span className="indent">List of my social media</span>
          </div>
          <div className="row-flex">
            <span className="command">Skills</span>:
            <span className="indent">The tools I work with</span>
          </div>
          <div className="row-flex">
            <span className="command">Education</span>:
            <span className="indent">Everything about my education</span>
          </div>
          <div className="row-flex">
            <span className="command">Experience</span>:
            <span className="indent">Where I've worked so far</span>
          </div>
          <div className="row-flex">
            <span className="command">Projects</span>:
            <span className="indent">A list of my projects</span>
          </div>
          <div className="row-flex">
            <span className="command">Clear</span>:
            <span className="indent">Clear the terminal history</span>
          </div>
          <div className="row-flex">
            <span className="command">Cv</span>:
            <span className="indent plus">Command to download CV</span>
          </div>
        </div>
      </div>
      {/* <!-- **************************************************************** --> */}


      {/* <!-- PROJECTS --> */}
      <div className="hidden space-bottom" id="projects">
        <div className="sectionTitle">Projects: </div>
        <div className="indent space-stud">
          <span className="title">Attendance control for JAJ 2024</span> - <a href="https://github.com/Johguxo/assistance-control" target="_blank"><span
            className="command">Link a github</span> </a>
        </div>
        <div className="indent space-stud">
          <span className="title">CountriesApi </span> - <a href="https://github.com/JayroGT/CountriesAPIJG" target="_blank">
            <span className="command">Link a github</span> </a>
        </div>
      </div>

      {/* <!-- SKILLS --> */}
      <div className="hidden space-bottom" id="skills">
        <div className="sectionTitle">Skills: </div>
        <div className="indent">
          <div className="space-skill">
            <span className="command">programming languages</span>:
            <div className="indentB">
              <span className="title border">Javascript</span>
              <span className="title border">Typescript</span>
              <span className="title border">Python</span>
              <span className="title border">HTML</span>
              <span className="title border">CSS</span>
            </div>
          </div>
          <div className="space-skill">
            <span className="command">Styles</span>:
            <div className="indentB">
              <span className="title border">Bootstrap</span>
              <span className="title border">Tailwind</span>
              <span className="title border">Chart.js</span>
              <span className="title border">Mui</span>
            </div>
          </div>
          <div className="space-skill">
            <span className="command">Frontend</span>:
            <div className="indentB">
              <span className="title border">React</span>
              <span className="title border">NextJs</span>
              <span className="title border">Angular</span>
            </div>
          </div>
          <div className="space-skill">
            <span className="command">Backend</span>:
            <div className="indentB">
              <span className="title border">NodeJs</span>
              <span className="title border">ExpressJs</span>
              <span className="title border">Django</span>
            </div>
          </div>
          <div className="space-skill">
            <span className="command">Data Base</span>:
            <div className="indentB">
              <span className="title border">PostgreSQL</span>
              <span className="title border">MySQL</span>
              <span className="title border">MongoDB</span>
            </div>
          </div>
          <div className="space-skill">
            <span className="command">languages</span>:
            <div className="indentB">
              <span className="title border">Spanish</span>
              <span className="title border">English</span>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- ABOUT --> */}
      <div className="hidden" id="about">
        <div className="sectionTitle">About me: </div>
        <div className="indent">
          Hello, my name is <span className="command">Jayro Guerrero</span>. I am a Full Stack Developer with experience in audiovisual communication and customer service, which has provided me with a user-focused approach. I specialize in Front-end development and have solid knowledge of agile methodologies, GIT, data structures, algorithms, and frameworks. I excel in working under pressure, have strong problem-solving skills, and possess excellent communication abilities.
        </div>
        <pre>{`
              __ _.--..--._ _
          .-' _/   _/\_   \_'-.
          |__ /   _/\__/\_   \__|
            |___/\_\__/  \___|
                    \__/
                    \__/
                    \__/
                      \__/
                  ____\__/___
            . - '             ' -.
            /                      \
            
     ~~~~~~~  ~~~~~ ~~~~~  ~~~ ~~~  ~~~~~
  `}</pre>
      </div>

      {/* <!-- EXPERIENCE --> */}
      <div className="hidden" id="experience">
        <div className="sectionTitle">Experience: </div>
        <div className="indent space-job">
          <span className="title">FullStack DEV - freelance - Kiwilex</span> - <span className="command">Feb 2024 - Today</span>
          <div className="indent">
            In my role as a Frontend Developer, I have utilized Angular, jQuery, HTML, CSS, Bootstrap, Chart.js, and Typescript to develop and maintain an educational application for school and university students. Working collaboratively with a team, I have been responsible for implementing new features and ensuring the application's quality and usability. My commitment to delivering high-quality solutions has been demonstrated throughout the project.
          </div>
        </div>
        <div className="indent space-job">
          <span className="title">FullStack DEV - Attendance control for JAJ 2024</span> - <span className="command">May 2024 - July 2024</span>
          <div className="indent">
            A web application was developed as a technological solution to manage attendance control and authorization status for each participant in the massive JAJ 2024 event of the Vicaria de Lima. The application encompasses the frontend, backend, and database, utilizing modern technologies to ensure efficiency and reliability. Additionally, it offers an intuitive interface that facilitates the administration and tracking of participants.
          </div>
        </div>
        <div className="indent space-job">
          <span className="title">Support Frontend DEV - freelancer</span> - <span className="command">Dec 2023 - May 2024</span>
          <div className="indent">
            During my experience as a freelance developer, I have specialized in support and creating components according to client specifications. I have worked on projects using technologies such as React with TypeScript, Tailwind, Bootstrap, and UI libraries, focusing primarily on frontend development. I have been responsible for developing and deploying web applications, ensuring their quality and performance. Additionally, I have demonstrated proactivity and enthusiasm in each project, meeting deadlines and exceeding client expectations. My technical skills and attention to detail have been supported by excellent references from the projects Ive participated in.
          </div>
        </div>
      </div>

      {/* <!-- SOCIAL MEDIA --> */}
      <div className="hidden" id="social">
        <div className="sectionTitle">Social Media: </div>
        <div className='order'>
          <div>
            <pre>{`
      _
     ( )
      H
      H
     _H_
  .-'-.-'-.
 /         \\
|           |
|   .-------'._
|  / /  '.' '. \\
|  \\ \\ @   @ / /
|   '---------'
|    _______|
|  .'-+-+-+|
|  '.-+-+-+|
|    """""" |
'-.__   __.-'
     """
  `}</pre>

          </div>
          <div>
            <div className="indent space-social">
              <span className="title">Github</span> - <span className="command up"> <a href="https://github.com/jayrogt" target="_blank" >https://github.com/jayrogt</a></span>
            </div>
            <div className="indent space-social">
              <span className="title">Gmail</span> - <span className="command">jayro.esp.sg@gmail.com</span>
            </div>
            <div className="indent space-social">
              <span className="title">Linkedin</span> - <span className="command up"> <a href="https://www.linkedin.com/in/jayrogt/" target="_blank">https://www.linkedin.com/in/jayrogt/</a></span>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- STUDIES --> */}
      <div className="education hidden" id="education">
        <div className="sectionTitle">Education: </div>
        <div className="indentB">
          <span className="title border">Full Stack Web Developer</span> <span className="command">Henry Bootcamp</span>
          <div className="indent space-stud">
            Completed 800 hours of theoretical and practical coursework in Full Stack Development, covering front-end and
            back-end technologies including HTML, CSS, JavaScript, React, Node.js, and databases. Gained hands-on experience
            in building and deploying web applications.
          </div>
        </div>
        <div className="indentB">
          <span className="title border">Audiovisual Communication Multimedia</span> <span className="command">Toulouse Lautrec</span>
          <div className="indent space-stud">
            Academic background in film and marketing, with a specialization in video editing, scriptwriting, production of
            advertising spots, and branding creation. I acquired skills to develop visual identities and strategic campaigns
            that effectively connect with the target audience.
          </div>
        </div>
        <div className="indentB">
          <span className="title border">Business administration</span> <span className="command">CERTUS</span>
          <div className="indent space-stud">
            Studies in Administration covering resource management, strategic planning, recruitment analysis, and leadership development. The program includes training in decision-making, process optimization, and techniques to enhance efficiency and productivity in organizational environments.
          </div>
        </div>
      </div>


      {/* <!-- CV DOWNLOAD --> */}
      <div className="hidden" id="cv">
        <div className="progress-container">
          <div className="flex-bar ">
            [
            <div className="progress">
              <div className="progress-bar"></div>
            </div>
            ]
          </div>
          <div className="progress-message"></div>
          <span className="check"></span>
        </div>
      </div>
    </>
  );
}

export default Terminal;
