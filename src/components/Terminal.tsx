import { useEffect, useRef } from 'react';
import './Terminal.css';
import portfolioData from '../assets/portfolio-data.json'

function Terminal() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // date init
    const dateElement = document.getElementById('date');
    if (dateElement) {
      dateElement.innerText = new Date().toDateString();
    }

    // Focus inicial
    inputRef.current?.focus();

    const handleClick = () => inputRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && inputRef.current) {
        executeCommand(inputRef.current.value);
        inputRef.current.value = '';
      }
    };

    const terminalWindow = document.getElementById('terminalWindow');
    terminalWindow?.addEventListener('click', handleClick);
    inputRef.current?.addEventListener('keydown', handleKeyDown);

    return () => {
      terminalWindow?.removeEventListener('click', handleClick);
      inputRef.current?.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const executeCommand = (command: string) => {
    if (!terminalRef.current || !command.trim()) return;

    // Crear elemento de comando
    const commandElement = document.createElement('div');
    commandElement.className = 'space-bottom';
    commandElement.innerHTML = `
      <span class="title-console color1">${portfolioData.personalInfo.name}@LAPTOP-I40Y123W</span>
      <span class="title-console color2">${portfolioData.personalInfo.userName}</span>
      <span class="title-console color3">~</span>
      <span class="title-console color4">(main)</span>
      <span class="command space-right">$</span>
      <span>${command}</span>
    `;

    // Agregar respuesta del comando
    const responseElement = getCommandResponse(command.toLowerCase());
    commandElement.appendChild(responseElement);

    terminalRef.current.appendChild(commandElement);
    inputRef.current?.scrollIntoView({ block: 'start' });
  };

  const getCommandResponse = (command: string): HTMLElement => {
    switch (command) {
      case 'help': return createHelpResponse();
      case 'about': return createAboutResponse();
      case 'social': return createSocialResponse();
      case 'skills': return createSkillsResponse();
      case 'education': return createEducationResponse();
      case 'experience': return createExperienceResponse();
      case 'projects': return createProjectsResponse();
      case 'cv': return createCvResponse();
      case 'clear': return clearTerminal();
      default: return createErrorResponse(command);
    }
  };

  const createElement = (tag: string, className?: string, content?: string): HTMLElement => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (content) element.innerHTML = content;
    return element;
  };

  const createHelpResponse = (): HTMLElement => {
    const container = createElement('div');
    container.appendChild(createElement('div', 'sectionTitle', 'You can enter any of these commands:'));
    
    const helpContent = createElement('div', 'indent content-help');
    portfolioData.terminalCommands.forEach(cmd => {
      const row = createElement('div', 'row-flex');
      row.innerHTML = `<span class="command">${cmd.command}</span>: <span class="indent">${cmd.description}</span>`;
      helpContent.appendChild(row);
    });
    
    container.appendChild(helpContent);
    return container;
  };

  const createAboutResponse = (): HTMLElement => {
    const container = createElement('div');
    container.appendChild(createElement('div', 'sectionTitle', 'About me:'));
    container.appendChild(createElement('div', 'indent', portfolioData.about.description));
    
    const asciiArt = createElement('pre');
    asciiArt.textContent = `
              __ _.--..--._ _
          .-' _/   _/\\_   \\_'-.
          |__ /   _/\\__/\\_   \\__|
            |___/\\_\\__/  \\___|
                    \\__/
                    \\__/
                    \\__/
                      \\__/
                  ____\\__/___
            . - '             ' -.
            /                      \\
            
     ~~~~~~~  ~~~~~ ~~~~~  ~~~ ~~~  ~~~~~`;
    container.appendChild(asciiArt);
    return container;
  };

  const createSocialResponse = (): HTMLElement => {
    const container = createElement('div');
    container.appendChild(createElement('div', 'sectionTitle', 'Social Media:'));
    
    const orderDiv = createElement('div', 'order');
    const robotArt = createElement('pre');
    robotArt.textContent = `
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
     """`;

    const socialLinks = createElement('div');
    const { personalInfo } = portfolioData;
    
    socialLinks.innerHTML = `
      <div class="indent space-social">
        <span class="title">Github</span> - 
        <span class="command up">
          <a href="${personalInfo.github}" target="_blank">${personalInfo.github}</a>
        </span>
      </div>
      <div class="indent space-social">
        <span class="title">Gmail</span> - 
        <span class="command">${personalInfo.email}</span>
      </div>
      <div class="indent space-social">
        <span class="title">Linkedin</span> - 
        <span class="command up">
          <a href="${personalInfo.linkedin}" target="_blank">${personalInfo.linkedin}</a>
        </span>
      </div>
    `;

    orderDiv.appendChild(robotArt);
    orderDiv.appendChild(socialLinks);
    container.appendChild(orderDiv);
    return container;
  };

  const createSkillsResponse = (): HTMLElement => {
    const container = createElement('div');
    container.appendChild(createElement('div', 'sectionTitle', 'Skills:'));
    
    const skillsContent = createElement('div', 'indent');
    Object.entries(portfolioData.skills).forEach(([category, items]) => {
      const skillSection = createElement('div', 'space-skill');
      const categoryName = category.replace(/([A-Z])/g, ' $1').toLowerCase();
      skillSection.innerHTML = `<span class="command">${categoryName}</span>:`;
      
      const itemsDiv = createElement('div', 'indentB');
      items.forEach(item => {
        itemsDiv.innerHTML += `<span class="title border">${item}</span>`;
      });
      
      skillSection.appendChild(itemsDiv);
      skillsContent.appendChild(skillSection);
    });
    
    container.appendChild(skillsContent);
    return container;
  };

  const createEducationResponse = (): HTMLElement => {
    const container = createElement('div');
    container.appendChild(createElement('div', 'sectionTitle', 'Education:'));
    
    portfolioData.education.forEach(edu => {
      const eduDiv = createElement('div', 'indentB');
      eduDiv.innerHTML = `
        <span class="title border">${edu.title}</span> 
        <span class="command">${edu.institution}</span>
        <div class="indent space-stud">${edu.description}</div>
      `;
      container.appendChild(eduDiv);
    });
    
    return container;
  };

  const createExperienceResponse = (): HTMLElement => {
    const container = createElement('div');
    container.appendChild(createElement('div', 'sectionTitle', 'Experience:'));
    
    portfolioData.experience.forEach(exp => {
      const expDiv = createElement('div', 'indent space-job');
      expDiv.innerHTML = `
        <span class="title">${exp.position} - ${exp.type} - ${exp.company}</span> - 
        <span class="command">${exp.period}</span>
        <div class="indent">${exp.description}</div>
      `;
      container.appendChild(expDiv);
    });
    
    return container;
  };

  const createProjectsResponse = (): HTMLElement => {
    const container = createElement('div');
    container.appendChild(createElement('div', 'sectionTitle', 'Projects:'));
    
    portfolioData.projects.forEach(project => {
      const projectDiv = createElement('div', 'indent space-stud');
      const linkContent = project.link 
        ? `<a href="${project.link}"><span>${project.status === 'public' ? project.link : project.status}</span></a>`
        : `<span>${project.status}</span>`;
      
      projectDiv.innerHTML = `
        <span class="title">${project.title}</span>:
        <span class="command"> - ${linkContent}</span>
      `;
      container.appendChild(projectDiv);
    });
    
    return container;
  };

  const createCvResponse = (): HTMLElement => {
    const container = createElement('div');
    container.innerHTML = `
      <div class="progress-container">
        <div class="flex-bar">
          [<div class="progress"><div class="progress-bar"></div></div>]
        </div>
        <div class="progress-message"></div>
        <span class="check"></span>
      </div>
    `;

    // Simular progreso
    setTimeout(() => simulateProgress(container), 100);
    return container;
  };

  const simulateProgress = (container: HTMLElement) => {
    const progressBar = container.querySelector('.progress-bar') as HTMLDivElement;
    const progressMessage = container.querySelector('.progress-message') as HTMLDivElement;
    const checkSpan = container.querySelector('.check') as HTMLSpanElement;
    
    let progress = 0;
    const interval = setInterval(() => {
      if (progress <= 100) {
        progressBar.textContent = '#'.repeat(Math.floor(progress / 2));
        progressBar.style.width = `${progress}%`;
        progressMessage.textContent = `Downloading... ${progress}%`;
        progress += 1;
      } else {
        clearInterval(interval);
        progressMessage.textContent = 'Complete download!';
        checkSpan.textContent = 'Please check your Downloads folder! :D';
        downloadCv();
      }
    }, 29);
  };

  const downloadCv = () => {
    const link = document.createElement('a');
    link.href = '/Jayro_Guerrero_CV.pdf';
    link.download = portfolioData.personalInfo.cvFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearTerminal = (): HTMLElement => {
    if (terminalRef.current) {
      terminalRef.current.innerHTML = '';
    }
    return document.createElement('span');
  };

  const createErrorResponse = (command: string): HTMLElement => {
    const element = createElement('div', 'error', `-bash: ${command}: command not found`);
    return element;
  };

  return (
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
        <span>MYPORTFOLIOW64:/c/Users/{portfolioData.personalInfo.userName}</span>
      </div>

      <div className="terminal" id="terminalWindow">
        <section id="terminal" ref={terminalRef}>
          <div className="space-bottom">
            <div className="command">Successful login - <span className="error" id="date"></span></div>
            <div>
              <pre>{`
                    _\\|/_
 __^__              (o o)                                     __^__
( ___ )----------oOO-{_}-OOo---------------------------------( ___ )
 | / |                                                        | / |
 | / |                                                        | / |
 | / |         Hello, welcome to ${portfolioData.personalInfo.name}'s portfolio            | / |
 |___|                                                        |___|
 |___|                                                        |___|
(_____)------------------------------------------------------(_____)
              `}</pre>
              <h4>
                Feel free to use the <span className="command">help</span> to see the commands.
              </h4>
            </div>
          </div>
        </section>
        
        <div className="prompt">
          <span className="title-console color1">{portfolioData.personalInfo.name}@LAPTOP-I40Y123W</span>
          <span className="title-console color2">{portfolioData.personalInfo.userName}</span>
          <span className="title-console color3">~</span>
          <span className="title-console color4">(main)</span>
          <span className="command space-right">$</span>
          <input ref={inputRef} id="promtInput" />
        </div>
      </div>
    </main>
  );
}

export default Terminal;