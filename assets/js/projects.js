(function () {
  "use strict";

  const projects = [
    {
      title: "RF Car Fob Security",
      description: "Relay-attack mitigation prototype built for the SPACE Hackathon.",
      image: "https://img.youtube.com/vi/zuF2TPQXC8U/hqdefault.jpg",
      imageAlt: "RF car fob security system demonstration",
      highlights: [
        "<b>Tools:</b> C/C++, RF systems, embedded security",
        "Designed a custom antenna and RF chain with embedded transmission control.",
        "Validated frequency response, range, and relay-attack mitigation through controlled tests."
      ],
      links: [
        {
          url: "https://youtu.be/zuF2TPQXC8U",
          label: "Watch the RF car fob security demo",
          tooltip: "Watch Demo",
          icon: "fa-youtube-play"
        }
      ]
    },
    {
      title: "Thermal Tracker",
      description: "Real-time multi-object thermal tracking on an STM32 microcontroller.",
      image: "/assets/img/project-thermal-tracker.svg",
      imageAlt: "Embedded thermal tracking system architecture",
      imageClass: "project-image-contain",
      highlights: [
        "<b>Tools:</b> C, STM32, I2C, SPI, DMA, Kalman filtering",
        "Won 1st place in a 120-team Microchip-sponsored embedded systems competition.",
        "Built an 8×8 to 32×32 to 128×128 sensing, tracking, and display pipeline."
      ],
      links: [
        {
          url: "https://github.com/AliAlya/thermal-tracker",
          label: "View the Thermal Tracker source",
          tooltip: "View Source",
          icon: "fa-github"
        },
        {
          url: "https://www.youtube.com/watch?v=gJ-tZUtf6Qk",
          label: "Watch the Thermal Tracker demo",
          tooltip: "Watch Demo",
          icon: "fa-youtube-play"
        }
      ]
    },
    {
      title: "Field Hive",
      description: "Secure distributed vital and motion monitoring for rescue scenarios.",
      image: "/assets/img/project-field-hive.png",
      imageAlt: "Field Hive secure vital monitoring system",
      highlights: [
        "<b>Tools:</b> ESP32, Arduino Uno Q, Raspberry Pi, C/C++, AES, edge ML",
        "Won 2nd Place for Qualcomm Uno Q and Best Use of Presage Heart Webcam at MakeUofT 2026.",
        "Combined encrypted sensor telemetry with camera-derived heart and respiratory rates."
      ],
      links: [
        {
          url: "https://github.com/AliAlya/Field-Hive",
          label: "View the Field Hive source",
          tooltip: "View Source",
          icon: "fa-github"
        }
      ]
    },
    {
      title: "SMILE",
      description: "Machine-learning system for cavity detection in panoramic dental X-rays.",
      image: "/assets/img/project-smile.png",
      imageAlt: "Dental X-ray cavity detection project",
      highlights: [
        "<b>Tools:</b> Python, PyTorch, YOLOv8, OpenCV",
        "Standardized heterogeneous annotations and added CBAM attention and data augmentation.",
        "Reached 0.84 precision, 0.73 recall, and 0.79 mAP@0.5 on unseen test data."
      ],
      links: [
        {
          url: "https://github.com/Ali-Alyaseri/APS360-Dental-Divot-Detection",
          label: "View the SMILE source",
          tooltip: "View Source",
          icon: "fa-github"
        }
      ]
    },
    {
      title: "Computer Graphics",
      description: "GPU rendering work spanning transformations, lighting, and programmable shaders.",
      image: "/assets/img/futuristic-wallpaper.jpg",
      imageAlt: "GPU computer graphics rendering",
      highlights: [
        "<b>Tools:</b> C++, OpenGL, GLSL",
        "Built a rendering pipeline covering vertex processing, transformations, lighting, and fragment shading.",
        "Analyzed shader branching, data layout, texture access, memory hierarchy, and parallel execution."
      ],
      links: []
    },
    {
      title: "FPGA Tank Trouble",
      description: "Real-time cooperative game built around an Intel FPGA and Nios II.",
      image: "/assets/img/project-fpga-tank-trouble-menu.png",
      imageAlt: "FPGA Tank Trouble game main menu",
      highlights: [
        "<b>Tools:</b> C, Verilog, Intel FPGA, Nios II, Quartus",
        "Integrated VGA graphics, PS/2 input, interrupts, timers, and memory-mapped I/O.",
        "Combined C game logic with custom Verilog hardware components."
      ],
      links: [
        {
          url: "https://github.com/AliAlya/FPGA-Game-TankTrouble",
          label: "View the FPGA Tank Trouble source",
          tooltip: "View Source",
          icon: "fa-github"
        },
        {
          url: "https://youtu.be/89nw6IAS6OY",
          label: "Watch the FPGA Tank Trouble demo",
          tooltip: "Watch Demo",
          icon: "fa-youtube-play"
        }
      ]
    }
  ];

  const initiallyVisible = 2;

  function createProjectLinks(links) {
    if (!links.length) {
      return "";
    }

    return `
      <div class="card-action">
        ${links.map(function (link) {
          return `
            <a aria-label="${link.label}" href="${link.url}" target="_blank" rel="noopener"
              data-position="top" data-tooltip="${link.tooltip}"
              class="btn-floating btn-large waves-effect waves-light blue-grey tooltipped">
              <i class="fa ${link.icon}"></i>
            </a>`;
        }).join("")}
      </div>`;
  }

  function createProjectCard(project, index) {
    const isHidden = index >= initiallyVisible;
    const imageClass = project.imageClass ? ` ${project.imageClass}` : "";

    return `
      <div class="col s12 m6 l4 project-item"${isHidden ? " hidden" : ""}>
        <div class="card medium">
          <div class="card-image waves-effect waves-block waves-light">
            <img class="activator${imageClass}" src="${project.image}" alt="${project.imageAlt}" loading="lazy">
          </div>
          <div class="card-content">
            <span class="card-title activator teal-text hoverline">${project.title}<i
              class="mdi-navigation-more-vert right"></i></span>
            <p>${project.description}</p>
          </div>
          <div class="card-reveal">
            <span class="card-title grey-text"><small>Highlights</small><i
              class="mdi-navigation-close right"></i></span>
            <ul>${project.highlights.map(function (highlight) {
              return `<li>${highlight}</li>`;
            }).join("")}</ul>
            ${createProjectLinks(project.links)}
          </div>
        </div>
      </div>`;
  }

  function renderProjects() {
    const container = document.getElementById("projects-container");
    const loadMoreButton = document.getElementById("load-more-projects");

    if (!container || !loadMoreButton) {
      return;
    }

    container.innerHTML = projects.map(createProjectCard).join("");
    loadMoreButton.hidden = projects.length <= initiallyVisible;

    loadMoreButton.addEventListener("click", function () {
      container.querySelectorAll(".project-item[hidden]").forEach(function (projectCard) {
        projectCard.hidden = false;
      });

      loadMoreButton.setAttribute("aria-expanded", "true");
      loadMoreButton.hidden = true;
    });
  }

  renderProjects();
}());
