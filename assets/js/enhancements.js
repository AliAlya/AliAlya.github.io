(function () {
  "use strict";

  const root = document.documentElement;
  const themeToggle = document.getElementById("theme-toggle");
  const themeColor = document.querySelector('meta[name="theme-color"]');

  function getSavedTheme() {
    try {
      return localStorage.getItem("portfolio-theme");
    } catch (error) {
      return null;
    }
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem("portfolio-theme", theme);
    } catch (error) {
      // The selected theme still applies when storage is unavailable.
    }
  }

  function applyTheme(theme) {
    const isDark = theme === "dark";
    root.setAttribute("data-theme", isDark ? "dark" : "light");

    if (themeToggle) {
      const nextTheme = isDark ? "light" : "dark";
      const label = `Switch to ${nextTheme} mode`;
      const icon = themeToggle.querySelector("i");

      themeToggle.setAttribute("aria-label", label);
      themeToggle.setAttribute("title", label);
      icon.className = isDark ? "fa fa-sun-o" : "fa fa-moon-o";
    }

    if (themeColor) {
      themeColor.setAttribute("content", isDark ? "#071426" : "#0b1f3a");
    }
  }

  const savedTheme = getSavedTheme();
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(savedTheme || (prefersDark ? "dark" : "light"));

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(nextTheme);
      saveTheme(nextTheme);
    });
  }

  function initializeCollapsibleSections() {
    document.querySelectorAll("main section[id]:not(#intro)").forEach(function (section) {
      const heading = section.querySelector(":scope > .page-title");
      const content = section.querySelector(":scope > .container");

      if (!heading || !content) {
        return;
      }

      const sectionName = heading.textContent.trim();
      const contentId = `${section.id}-content`;
      const toggle = document.createElement("button");
      const accessibleLabel = document.createElement("span");
      const icon = document.createElement("i");

      content.id = contentId;
      content.classList.add("section-collapsible-content");
      section.classList.add("collapsible-section");
      toggle.className = "section-collapse-toggle";
      toggle.type = "button";
      toggle.setAttribute("aria-controls", contentId);
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("title", `Collapse ${sectionName}`);
      accessibleLabel.className = "sr-only";
      accessibleLabel.textContent = `Collapse ${sectionName}`;
      icon.className = "fa fa-chevron-up";
      icon.setAttribute("aria-hidden", "true");
      toggle.appendChild(accessibleLabel);
      toggle.appendChild(icon);
      heading.appendChild(toggle);

      toggle.addEventListener("click", function () {
        const isExpanded = toggle.getAttribute("aria-expanded") === "true";
        const nextAction = isExpanded ? "Expand" : "Collapse";

        if (isExpanded) {
          content.style.maxHeight = `${content.scrollHeight}px`;
          content.offsetHeight;
          section.classList.add("is-collapsed");
          content.setAttribute("aria-hidden", "true");
          content.inert = true;
          window.requestAnimationFrame(function () {
            content.style.maxHeight = "0px";
          });
        } else {
          section.classList.remove("is-collapsed");
          content.removeAttribute("aria-hidden");
          content.inert = false;
          content.style.maxHeight = `${content.scrollHeight}px`;
        }

        toggle.setAttribute("aria-expanded", String(!isExpanded));
        toggle.setAttribute("title", `${nextAction} ${sectionName}`);
        accessibleLabel.textContent = `${nextAction} ${sectionName}`;
      });

      content.addEventListener("transitionend", function (event) {
        if (event.propertyName === "max-height" && toggle.getAttribute("aria-expanded") === "true") {
          content.style.maxHeight = "none";
        }
      });
    });
  }

  initializeCollapsibleSections();

  document.querySelectorAll('nav a[href^="#"]').forEach(function (navigationLink) {
    navigationLink.addEventListener("click", function () {
      const targetId = navigationLink.getAttribute("href").slice(1);
      const targetSection = targetId ? document.getElementById(targetId) : null;

      if (targetSection && targetSection.classList.contains("is-collapsed")) {
        const sectionToggle = targetSection.querySelector(".section-collapse-toggle");

        if (sectionToggle) {
          sectionToggle.click();
        }
      }
    });
  });

  const portfolioAnswers = [
    {
      patterns: [/memory/, /pointer/, /allocation/, /low[- ]level/, /memory[- ]mapped/],
      answer: "Yes—with an important distinction. At Quanta Technology, Ali refactored C++ and C# data structures and memory-access patterns while optimizing simulation performance. His embedded work also uses DMA and memory-mapped I/O on STM32, FPGA, and Nios II systems. The portfolio does not claim that he built a custom allocator or kernel memory manager."
    },
    {
      patterns: [/automat/, /pipeline/, /workflow/, /manual process/],
      answer: "Ali built Python automation pipelines at Quanta for simulation execution, validation, and output analysis, saving an estimated 8–10 hours per week. At TinyHorse, he also built serverless workflows and GPT API content pipelines, reducing processing time by 40%."
    },
    {
      patterns: [/performance/, /optim/, /latency/, /multithread/, /profil/],
      answer: "Performance work is a recurring theme in Ali's experience. He improved large electrical-network simulations by 28% through C++/C# optimization, data-structure and memory-access changes, and multithreading. At TinyHorse, he reduced backend latency by 25% and content-pipeline processing time by 40% through profiling and targeted optimization."
    },
    {
      patterns: [/protocol/, /\bi2c\b/, /\bspi\b/, /ps\/?2/, /communication bus/, /interface/],
      answer: "Ali has worked with several hardware and software communication interfaces. His embedded projects use I2C, SPI, PS/2 input, memory-mapped I/O, interrupts, and RF communication. His software experience also includes API gateways, third-party APIs, cloud functions, and AES-protected telemetry."
    },
    {
      patterns: [/embedded/, /hardware/, /stm32/, /fpga/, /nios/, /verilog/, /microcontroller/],
      answer: "Ali has hands-on embedded and hardware experience with STM32, ESP32, FPGA development, Nios II, Verilog, ARM Assembly, I2C, SPI, DMA, interrupts, VGA, and memory-mapped I/O. His Thermal Tracker won first place in a 120-team embedded-systems competition, and FPGA Tank Trouble combines C game logic with custom Verilog hardware."
    },
    {
      patterns: [/cloud/, /aws/, /lambda/, /serverless/, /api/, /full[- ]stack/, /react/, /next\.?js/, /web/],
      answer: "Ali has built full-stack and cloud systems with React, Next.js, Python, JavaScript/TypeScript, SQL, Docker, AWS Lambda, API gateways, and third-party APIs. His work includes a real-time license tracking system, serverless workflows, and optimized backend services."
    },
    {
      patterns: [/machine learning/, /\bai\b/, /computer vision/, /pytorch/, /opencv/, /yolo/, /gpt/],
      answer: "Ali's AI work includes PyTorch, OpenCV, YOLOv8, edge ML, and GPT APIs. The SMILE project detects cavities in panoramic dental X-rays and reached 0.84 precision, 0.73 recall, and 0.79 mAP@0.5 on unseen data. Field Hive combines encrypted sensor telemetry with camera-derived heart and respiratory rates."
    },
    {
      patterns: [/security/, /cyber/, /encryption/, /\baes\b/, /car fob/, /\brf\b/],
      answer: "Ali's security experience includes an RF car-fob relay-attack mitigation prototype, AES-protected sensor telemetry in Field Hive, and a University of Toronto certificate in Cybersecurity. His work connects embedded systems, communications, and practical threat mitigation."
    },
    {
      patterns: [/thermal tracker/, /thermal/, /kalman/],
      answer: "Thermal Tracker is a real-time multi-object tracking system built on an STM32 using C, I2C, SPI, DMA, and Kalman filtering. It expands an 8×8 thermal sensor stream through a 32×32 and 128×128 sensing, tracking, and display pipeline, and won first place in a 120-team Microchip-sponsored competition."
    },
    {
      patterns: [/field hive/, /rescue/, /vital/, /respiratory/],
      answer: "Field Hive is a secure distributed vital and motion monitoring system for rescue scenarios. It combines ESP32, Arduino Uno Q, Raspberry Pi, C/C++, AES, edge ML, encrypted telemetry, and camera-derived heart and respiratory rates. It earned two awards at MakeUofT 2026."
    },
    {
      patterns: [/smile/, /dental/, /cavit/, /x[- ]?ray/],
      answer: "SMILE is a machine-learning system for cavity detection in panoramic dental X-rays. Ali worked with Python, PyTorch, YOLOv8, OpenCV, attention mechanisms, data augmentation, and heterogeneous annotation formats."
    },
    {
      patterns: [/tank trouble/, /tank game/, /cooperative game/],
      answer: "FPGA Tank Trouble is a real-time cooperative game built with C and Verilog around an Intel FPGA and Nios II. It integrates VGA graphics, PS/2 input, interrupts, timers, custom hardware, and memory-mapped I/O."
    },
    {
      patterns: [/graphics/, /opengl/, /shader/, /glsl/, /render/],
      answer: "Ali's computer-graphics work uses C++, OpenGL, and GLSL across vertex processing, transformations, lighting, texturing, and fragment shading, with attention to branching, memory hierarchy, data layout, and parallel GPU execution."
    },
    {
      patterns: [/project/, /portfolio/, /built/, /award/, /hackathon/],
      answer: "Featured projects include RF Car Fob Security, the award-winning Thermal Tracker, Field Hive, SMILE dental X-ray detection, an OpenGL computer-graphics pipeline, and FPGA Tank Trouble. Open the Projects section for demos, source links, tools, and technical highlights."
    },
    {
      patterns: [/experience/, /employment/, /work history/, /company/, /quanta/, /tinyhorse/, /professional/],
      answer: "Ali has software-engineering experience at Quanta Technology and TinyHorse. At Quanta, he worked on power-systems simulation, C++/C# performance, Python automation, and a full-stack license platform. At TinyHorse, he built and optimized Python serverless services, APIs, Next.js tools, and GPT content pipelines."
    },
    {
      patterns: [/education/, /university/, /degree/, /graduat/, /student/, /dean/, /minor/, /certificate/],
      answer: "Ali is an Electrical and Computer Engineering student at the University of Toronto, expecting to graduate in 2027. He is pursuing a minor in Engineering Business and AI plus a certificate in Cybersecurity, is a Dean's List student, and received the Jeffrey Skoll Scholarship."
    },
    {
      patterns: [/software/, /tools?/, /technolog/, /tech stack/, /programming/, /languages?/, /skills?/],
      answer: "Ali has worked with C, C++, C#, Python, Verilog, ARM Assembly, SQL, and JavaScript/TypeScript. His broader toolkit includes React, Next.js, AWS Lambda, APIs, PyTorch, OpenCV, Docker, Git, Linux, STM32, ESP32, FPGA/Nios II, ModelSim, Quartus, MATLAB, LTSpice, and CAPE."
    },
    {
      patterns: [/contact/, /email/, /linkedin/, /github/, /resume/, /hire/, /reach/],
      answer: "You can reach Ali at ali.alyaseri@mail.utoronto.ca. His GitHub, LinkedIn, and downloadable resume are linked in the Contact section and navigation menu."
    },
    {
      patterns: [/travel/, /tobermory/, /new york/, /paris/, /beirut/],
      answer: "The Places Travelled section highlights Tobermory, New York City, Paris, and Beirut with interactive maps."
    },
    {
      patterns: [/hello/, /\bhi\b/, /hey/, /who is ali/, /tell me about ali/],
      answer: "Ali Alyaseri is a University of Toronto Electrical and Computer Engineering student and software engineer focused on reliable software, embedded systems, cybersecurity, performance optimization, cloud services, and applied AI."
    }
  ];

  const topicKeywords = [
    ["memory", "memory management", "memory mapped", "pointer", "allocation", "allocator", "heap", "low level", "data structure", "dma"],
    ["automation", "automate", "pipeline", "workflow", "scripting", "script", "manual process", "productivity"],
    ["performance", "optimization", "optimizing", "latency", "multithreading", "profiling", "throughput", "speed", "faster", "efficient"],
    ["protocol", "protocols", "i2c", "spi", "ps2", "communication", "interface", "bus", "telemetry", "networking"],
    ["embedded", "hardware", "stm32", "esp32", "fpga", "nios", "verilog", "microcontroller", "arm assembly", "digital logic"],
    ["cloud", "aws", "lambda", "serverless", "api", "backend", "full stack", "react", "nextjs", "web", "docker"],
    ["machine learning", "artificial intelligence", "ai", "computer vision", "pytorch", "opencv", "yolo", "gpt", "model", "deep learning"],
    ["security", "cybersecurity", "encryption", "aes", "car fob", "rf", "attack", "secure", "threat"],
    ["thermal tracker", "thermal", "kalman", "heat sensor", "satellite protection"],
    ["field hive", "rescue", "vital", "respiratory", "heart rate", "makeuoft"],
    ["smile", "dental", "cavity", "xray", "teeth"],
    ["tank trouble", "tank game", "cooperative game", "vga game"],
    ["graphics", "opengl", "shader", "glsl", "rendering", "gpu"],
    ["project", "portfolio", "built", "award", "hackathon", "demo", "source code"],
    ["experience", "employment", "work history", "company", "professional", "role", "quanta", "tinyhorse", "internship"],
    ["education", "university", "degree", "graduation", "student", "deans list", "minor", "certificate", "scholarship", "school"],
    ["software", "tool", "technology", "tech stack", "programming", "language", "framework", "skill", "strength", "capability", "c++", "c#", "python", "javascript", "typescript", "sql", "linux", "operating system", "git", "matlab", "ltspice", "cape", "modelsim", "quartus", "database"],
    ["contact", "email", "linkedin", "github", "resume", "hire", "reach", "connect", "touch"],
    ["travel", "tobermory", "new york", "paris", "beirut", "places"],
    ["hello", "hi", "hey", "who is ali", "about ali", "introduce", "background"]
  ];

  function normalizeText(value) {
    return value
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[^a-z0-9+#\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function editDistance(first, second) {
    const previous = Array.from({ length: second.length + 1 }, function (_, index) {
      return index;
    });

    for (let firstIndex = 1; firstIndex <= first.length; firstIndex += 1) {
      let diagonal = previous[0];
      previous[0] = firstIndex;

      for (let secondIndex = 1; secondIndex <= second.length; secondIndex += 1) {
        const above = previous[secondIndex];
        const substitutionCost = first[firstIndex - 1] === second[secondIndex - 1] ? 0 : 1;
        previous[secondIndex] = Math.min(
          previous[secondIndex] + 1,
          previous[secondIndex - 1] + 1,
          diagonal + substitutionCost
        );
        diagonal = above;
      }
    }

    return previous[second.length];
  }

  function wordsMatch(questionWord, keywordWord) {
    if (questionWord === keywordWord) {
      return true;
    }

    if (questionWord.length >= 4 && keywordWord.length >= 4 &&
      (questionWord.startsWith(keywordWord) || keywordWord.startsWith(questionWord))) {
      return true;
    }

    if (questionWord.length < 5 || keywordWord.length < 5) {
      return false;
    }

    const allowedDistance = Math.max(questionWord.length, keywordWord.length) >= 9 ? 2 : 1;
    return Math.abs(questionWord.length - keywordWord.length) <= allowedDistance &&
      editDistance(questionWord, keywordWord) <= allowedDistance;
  }

  function scoreKeyword(normalizedQuestion, questionWords, keyword) {
    const normalizedKeyword = normalizeText(keyword);
    const isPhrase = normalizedKeyword.includes(" ");

    if ((isPhrase && normalizedQuestion.includes(normalizedKeyword)) ||
      (!isPhrase && questionWords.includes(normalizedKeyword))) {
      return isPhrase ? 8 : 5;
    }

    const keywordWords = normalizedKeyword.split(" ");
    const allWordsMatch = keywordWords.every(function (keywordWord) {
      return questionWords.some(function (questionWord) {
        return wordsMatch(questionWord, keywordWord);
      });
    });

    return allWordsMatch ? keywordWords.length * 3 : 0;
  }

  function findPortfolioAnswer(question) {
    const normalizedQuestion = normalizeText(question);
    const questionWords = normalizedQuestion.split(" ").filter(Boolean);
    let bestMatch = null;
    let bestScore = 0;

    portfolioAnswers.forEach(function (entry, index) {
      const regexScore = entry.patterns.reduce(function (score, pattern) {
        pattern.lastIndex = 0;
        return score + (pattern.test(normalizedQuestion) ? 6 : 0);
      }, 0);
      const keywordScore = topicKeywords[index].reduce(function (score, keyword) {
        return score + scoreKeyword(normalizedQuestion, questionWords, keyword);
      }, 0);
      const totalScore = regexScore + keywordScore;

      if (totalScore > bestScore) {
        bestMatch = entry;
        bestScore = totalScore;
      }
    });

    return bestMatch && bestScore >= 3 ? bestMatch.answer : "That detail is not included in Ali's published portfolio. I can answer questions about his tools, protocols, automation, memory and performance work, embedded systems, cloud experience, AI, education, or specific projects. For anything else, contact Ali at ali.alyaseri@mail.utoronto.ca.";
  }

  const assistantPanel = document.getElementById("assistant-panel");
  const assistantToggle = document.getElementById("assistant-toggle");
  const assistantClose = document.getElementById("assistant-close");
  const assistantMessages = document.getElementById("assistant-messages");
  const assistantForm = document.getElementById("assistant-form");
  const assistantInput = document.getElementById("assistant-input");

  function openAssistant() {
    assistantPanel.hidden = false;
    assistantToggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("assistant-open");
    assistantInput.focus();
  }

  function closeAssistant() {
    assistantPanel.hidden = true;
    assistantToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("assistant-open");
    assistantToggle.focus();
  }

  function appendMessage(text, sender) {
    const message = document.createElement("div");
    message.className = `assistant-message assistant-message-${sender}`;
    message.textContent = text;
    assistantMessages.appendChild(message);
    assistantMessages.scrollTop = assistantMessages.scrollHeight;
  }

  function askPortfolioQuestion(question) {
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion) {
      return;
    }

    appendMessage(trimmedQuestion, "user");
    appendMessage(findPortfolioAnswer(trimmedQuestion), "bot");
  }

  if (assistantPanel && assistantToggle && assistantClose && assistantMessages && assistantForm && assistantInput) {
    assistantToggle.addEventListener("click", function () {
      if (assistantPanel.hidden) {
        openAssistant();
      } else {
        closeAssistant();
      }
    });

    assistantClose.addEventListener("click", closeAssistant);

    assistantForm.addEventListener("submit", function (event) {
      event.preventDefault();
      askPortfolioQuestion(assistantInput.value);
      assistantInput.value = "";
      assistantInput.focus();
    });

    assistantMessages.addEventListener("click", function (event) {
      const suggestion = event.target.closest("[data-question]");

      if (suggestion) {
        askPortfolioQuestion(suggestion.getAttribute("data-question"));
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !assistantPanel.hidden) {
        closeAssistant();
      }
    });
  }
}());
